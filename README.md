# 🌾 Sooru & Stories — Production E-Commerce Platform

A production-ready, full-stack Next.js 15 (App Router) e-commerce platform for **Sooru & Stories**, an artisanal South Indian cloud kitchen and heritage restaurant brand in Tamil Nadu, India.

Built with verified end-to-end checkout, tamper-proof server price recalculation, Razorpay cryptographic signature verification, Supabase PostgreSQL data persistence, cross-device cart synchronization, Resend transactional emails, GA4 conversion telemetry, and a kitchen operations admin dashboard.

---

## 🚀 Key Features

* **Heritage Luxury Design System:** Deep emerald (`#071F13`) & temple gold (`#D4AF37`) aesthetic with floating spice particle physics, glassmorphic navigation, and micro-interactions.
* **Full Culinary Catalog (22 Dishes):** 6 curated categories, strictly preserving authentic owner pricing for all 8 medicinal rasams (₹70 to ₹90) with botanical health properties.
* **Tamper-Proof Checkout & Pricing:** Server-side price recalculation against catalog Single Source of Truth (`lib/menu.ts`), sliding window IP rate limiting, and invisible honeypots.
* **Dual Payment Architecture:**
  - **Online Payments (UPI / Cards):** Server-side Razorpay order generation (`POST /api/razorpay/create-order`), cryptographic HMAC-SHA256 signature verification with `crypto.timingSafeEqual` (`POST /api/razorpay/verify`), and asynchronous signed webhook handling (`POST /api/razorpay/webhook`) with idempotent event deduplication.
  - **Cash on Delivery (COD) / Takeaway:** Direct server-side order registration.
* **Conversational Commerce:** Automated post-checkout Unicode WhatsApp receipt generator connecting customers directly to kitchen dispatch.
* **Cross-Device Cart Synchronization:** Guest carts persist in browser `localStorage`; authenticated customers automatically sync cart items to Supabase PostgreSQL database across devices via `GET/POST /api/cart`.
* **Transactional Email System:** Server-side Resend integration with branded HTML templates for Order Confirmation, Payment Receipts, and Dispatch notifications.
* **Customer Account Hub (`/account`):** Order tracking, order status badges, address book, and profile management.
* **Kitchen Admin Dashboard (`/admin`):** Protected operations tower with live revenue & order KPIs (Gross Sales, Net Orders, AOV), status transition workflows (`Processing`, `Dispatched`, `Delivered`), and live daily stock toggles.
* **SEO & Analytics:** Google Analytics 4 e-commerce funnel tracking (`view_item_list`, `select_item`, `add_to_cart`, `begin_checkout`, `purchase`), UTM attribution, Schema.org `Restaurant` & `MenuItem` JSON-LD, dynamic XML sitemap (47 URLs), and enterprise HTTP security headers.

---

## 🛠️ Technology Stack

* **Framework:** Next.js 15.5 (App Router, Turbopack, SSG)
* **Frontend:** React 19, TypeScript, Vanilla CSS Design System v2
* **Database & Auth:** Supabase PostgreSQL with Row Level Security (RLS)
* **Payment Gateway:** Razorpay SDK (official Node.js SDK)
* **Transactional Emails:** Resend API
* **Analytics:** Google Analytics 4 (`G-SOORUSTORY`) & UTM tracking
* **Validation:** Zod 3 / 4
* **Testing:** Vitest (14 unit & integration tests)

---

## 🏃 Local Development Setup

1. **Clone repository & install dependencies:**
   ```bash
   git clone https://github.com/Mouli553/sooru-stories.git
   cd sooru-stories
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   *(Fill in your Supabase, Razorpay, Resend, and GA4 credentials. The app includes resilient sandbox fallbacks if keys are not yet configured).*

3. **Run test suite:**
   ```bash
   npm test
   ```

4. **Run TypeScript check & linter:**
   ```bash
   npm run typecheck
   npm run lint
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

6. **Production build:**
   ```bash
   npm run build
   ```

---

## 📂 Documentation

Detailed architectural and deployment guides are available in `/docs`:

* [Architecture & Data Flow](docs/ARCHITECTURE.md)
* [Security & Anti-Tampering](docs/SECURITY.md)
* [Setup & Deployment Guide](docs/SETUP_AND_DEPLOYMENT.md)
* [SEO & Analytics Measurement](docs/SEO_AND_ANALYTICS.md)
* [Testing & QA Protocols](docs/TESTING.md)
* [Master Project Memory Dossier](PROJECT_MEMORY_DOSSIER.md)
