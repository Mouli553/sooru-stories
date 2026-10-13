# Setup & Deployment Guide — Sooru & Stories

This guide documents the end-to-end setup, environment configuration, database migration, and deployment procedure for the **Sooru & Stories** e-commerce platform.

---

## 1. System Requirements

- **Runtime:** Node.js 20 LTS or Node.js 22 LTS
- **Package Manager:** npm (v10+)
- **Operating Systems:** macOS, Linux, Windows (PowerShell/WSL)
- **Deployment Platform:** Vercel (recommended for Next.js App Router) or containerized Node.js

---

## 2. Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mouli553/sooru-stories.git
   cd sooru-stories
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and fill in your development keys (see Section 3).

4. **Run the local test suite:**
   ```bash
   npm test
   ```
   *Runs all 14 Vitest unit and integration tests (pricing, validation, rate limiting, and timing-safe signature comparison).*

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` in your browser.

---

## 3. Database & Supabase Configuration

### 3.1 Create Supabase Project
1. Log in to [Supabase](https://supabase.com) and create a new project (Region: `ap-south-1` Mumbai recommended for lowest latency in India).
2. Copy the **Project URL**, **anon key**, and **service_role key** from *Settings -> API*.

### 3.2 Apply Database Schema
Execute the initial schema in the Supabase SQL Editor:
`supabase/migrations/202610090001_initial_schema.sql`

This creates:
- `orders`: Master order records with customer details, order status, payment status, and verification metadata.
- `order_items`: Line items with foreign keys to orders and locked historical unit prices.
- `carts` & `cart_items`: Cross-device customer cart synchronization.
- `payment_events`: Idempotency tracking table for Razorpay webhooks to prevent duplicate fulfillment.
- `admin_audit_logs`: Audit trail for kitchen status mutations and admin access.
- Row Level Security (RLS) policies enforcing tenant isolation so customers can only read their own records.

### 3.3 Supabase Authentication
1. In *Authentication -> URL Configuration*, set **Site URL** to your canonical domain (e.g., `https://soorustories.com`) and add `http://localhost:3000` to **Redirect URLs**.
2. Enable Email / Password auth provider.

---

## 4. Payment Gateway: Razorpay Integration

### 4.1 Dashboard Setup
1. Log in to the [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Navigate to *Settings -> API Keys* and generate a Key ID & Key Secret (start in **Test Mode**).
3. Set `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_ID`, and `RAZORPAY_KEY_SECRET` in `.env.local`.

### 4.2 Webhook Configuration
1. Navigate to *Settings -> Webhooks -> Add New Webhook*.
2. Webhook URL: `https://your-domain.com/api/razorpay/webhook`
3. Secret: Enter a strong random secret and copy it to `RAZORPAY_WEBHOOK_SECRET`.
4. Select active events:
   - `order.paid`
   - `payment.captured`
   - `payment.failed`
5. The application verifies the raw HMAC signature using `crypto.timingSafeEqual` and records the webhook event in `payment_events` to ensure idempotent deduplication.

---

## 5. Transactional Email: Resend Integration

1. Create an account at [Resend](https://resend.com) and obtain an API Key (`RESEND_API_KEY`).
2. Add and verify your custom sending domain (e.g., `soorustories.com`).
3. Configure the following DNS records with your registrar:
   - **SPF:** `v=spf1 include:amazonses.com ~all`
   - **DKIM:** TXT record provided by Resend
   - **DMARC:** `v=DMARC1; p=none; rua=mailto:dmarc@soorustories.com`
4. Set `EMAIL_FROM="Sooru & Stories <orders@soorustories.com>"` in your environment variables.

---

## 6. Vercel Production Deployment

### 6.1 Initial Deployment
1. Connect your GitHub repository to Vercel.
2. Framework Preset: **Next.js**
3. Build Command: `next build` (or `npm run build`)
4. Output Directory: `.next`

### 6.2 Production Environment Variables
Configure the following in the Vercel Project Settings (*Settings -> Environment Variables*):

| Variable Name | Environment | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical site URL (e.g. `https://soorustories.com`) |
| `NEXT_PUBLIC_BRAND_NAME` | All | Brand name string |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Production | Google Analytics 4 Property ID |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | All | Razorpay Public Key ID |
| `NEXT_PUBLIC_SUPABASE_URL` | All | Supabase API endpoint |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | All | Supabase Anonymous public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Production | Supabase Service Role secret key (Server-only) |
| `RAZORPAY_KEY_ID` | Production | Razorpay Live/Test Key ID |
| `RAZORPAY_KEY_SECRET` | Production | Razorpay Live/Test Secret |
| `RAZORPAY_WEBHOOK_SECRET` | Production | Razorpay Webhook HMAC secret |
| `RESEND_API_KEY` | Production | Resend transactional mail API key |
| `EMAIL_FROM` | Production | Verified sender address |
| `ADMIN_SECURITY_PIN` | Production | Kitchen operations security PIN |

### 6.3 Post-Deployment Verification Checklist
- [ ] Verify `https://your-domain.com/robots.txt` disallows `/admin`, `/account`, `/checkout`, `/cart`, `/api/`.
- [ ] Verify `https://your-domain.com/sitemap.xml` returns 200 OK with all 23 dish canonical URLs.
- [ ] Place a test order using Razorpay Test Mode card / UPI to verify payment capture.
- [ ] Check customer order confirmation email delivery in Resend logs.
- [ ] Log in to `/admin` with the configured PIN to confirm live order visibility and status transition.
- [ ] Trigger an intentional failed payment or replay a webhook to verify idempotency.
