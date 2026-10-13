# 🛡️ Sooru & Stories — Application Security Architecture

## 1. Threat Model & Mitigations

| Threat Vector | Attack Scenario | Implemented Mitigation |
|---|---|---|
| **Client-Side Price Tampering** | Attacker modifies cart total via browser DevTools to pay ₹1 for a ₹600 order | Server rejects client-submitted prices and recalculates total against `lib/menu.ts` in `/api/order` and `/api/razorpay/create-order`. |
| **Payment Signature Forgery** | Attacker crafts fake Razorpay signature to mark order as paid | Cryptographic HMAC-SHA256 signature calculated with `RAZORPAY_KEY_SECRET` and verified using constant-time `crypto.timingSafeEqual`. |
| **Replay & Webhook Duplication** | Retried webhook causes double order creation or duplicate emails | Idempotent event verification against `payment_events` table using unique event ID and payload hash. |
| **Brute Force & DDoS** | Bot spams order endpoint or checkout APIs | Sliding-window IP rate limiter (`checkRateLimit`) with proxy IP extraction (`x-forwarded-for`, `x-real-ip`). |
| **Spam & Automated Form Scraping** | Form bots submit fake orders | Invisible honeypot fields (`b_website`) on forms. Submissions with honeypot filled are dropped silently. |
| **XSS (Cross-Site Scripting)** | Malicious script injected via dish name, order notes, or search query | React automatic output encoding, sanitized text, and strict Content Security Policy (`CSP`) headers in `next.config.ts`. |
| **Clickjacking** | Storefront embedded in malicious iframe | `X-Frame-Options: DENY` and `frame-ancestors 'none'` in CSP headers. |
| **Data Leakage & Secrets Exposure** | Supabase service-role keys leaked to browser | Service role keys and payment secrets reside exclusively in server-side API handlers; zero exposure to client bundles. |

---

## 2. Row Level Security (RLS) Policies

All database tables have Row Level Security enabled in `supabase/migrations/202610090001_initial_schema.sql`:

* `products`: Read-only public access (`published = true`).
* `profiles`: Authenticated users can only read/update their own profile (`auth.uid() = id`).
* `addresses`: Authenticated users can only access their own addresses (`auth.uid() = user_id`).
* `carts` & `cart_items`: Restricted to the owning user (`auth.uid() = user_id`).
* `orders` & `order_items`: Customers can only read their own orders; mutations restricted to server-side `service_role`.
* `payment_events` & `email_events`: Zero client access; exclusively managed by trusted server backend.
