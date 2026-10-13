# Quality Assurance & Testing Protocol — Sooru & Stories

This document specifies the testing strategy, automated test suites, execution commands, and manual verification procedures for **Sooru & Stories**.

---

## 1. Automated Testing Framework

We use **Vitest** for fast, native TypeScript testing, paired with strict **TypeScript (`tsc --noEmit`)** typechecking and **ESLint**.

### 1.1 Test Execution Commands

```bash
# Run all unit and integration tests
npm test

# Run tests in watch mode during development
npx vitest

# Run TypeScript compilation checks
npm run typecheck

# Run linter
npm run lint

# Execute full production build and SSG static route compilation
npm run build
```

---

## 2. Automated Test Suites Overview

Currently, 14 automated tests run and pass cleanly in under 1 second:

### 2.1 Pricing Calculation & Tamper Resistance (`tests/pricing.test.ts`)
- **Empty Cart Handling:** Verifies subtotal, discounts, and delivery calculate to 0.
- **Delivery Thresholds:** Asserts ₹40 delivery fee applies below ₹500, and free delivery applies at or above ₹500.
- **Valid Coupon Application:** Asserts `SOORU50` deducts ₹50 and `FEAST10` deducts 10% on qualifying carts.
- **Invalid Coupon Rejection:** Ensures expired or fabricated coupons apply ₹0 discount.
- **Client-Price Tampering Defense:** Asserts that when a client submits modified line item prices (e.g., ₹1 for a ₹70 rasam), the server recalculates against the authoritative catalog and overrides the total.

### 2.2 Input Validation & Security (`tests/validations.test.ts`)
- **Schema Conformance:** Tests valid order payloads with phone, address, and line items.
- **Phone Number Validation:** Rejects phone numbers that do not match 10-digit Indian mobile formats.
- **Honeypot Trap:** Rejects automated bot spam if the hidden `website` honeypot field is filled.
- **Admin Status Validation:** Ensures order status transitions can only move to valid states (`pending_payment`, `paid`, `kitchen_preparing`, `out_for_delivery`, `delivered`, `cancelled`).
- **Signature Schema Check:** Rejects incomplete Razorpay verification payloads missing signature or payment ID.

### 2.3 Rate Limiting & Abuse Prevention (`tests/rate-limit.test.ts`)
- **Sliding Window Enforcement:** Allows requests within the allowed quota and returns HTTP 429 once the rate limit is exceeded.
- **Per-IP Isolation:** Verifies separate client IP addresses have independent rate quotas.

### 2.4 Cryptographic Payment Verification (`tests/signature.test.ts`)
- **Valid HMAC Signature:** Generates test HMAC-SHA256 signatures and verifies constant-time match using `crypto.timingSafeEqual`.
- **Tampered Signature Rejection:** Rejects tampered payloads or mismatched signatures, preventing fake payment fulfillment.

---

## 3. End-to-End Verification Checklist

The following 15 verification scenarios cover all customer and kitchen operational journeys:

| # | Scenario | Expected Behavior | Status |
|---|---|---|---|
| 1 | Browse storefront & category filters | Filters update dynamically without full page reload. | Verified |
| 2 | Direct URL navigation to `/menu/kollu-rasam` | Renders SSG page with metadata, story, botanical benefits, and add-to-cart button. | Verified |
| 3 | Add items to cart & refresh browser | Cart items persist in `localStorage` across page reloads. | Verified |
| 4 | Sign in and cross-device cart sync | Authenticated customer fetches and synchronizes cart with `/api/cart`. | Verified |
| 5 | Submit checkout with invalid mobile number | Form displays validation feedback; cart is not lost. | Verified |
| 6 | Submit valid order with COD or Razorpay | Server recalculates pricing, creates pending order, and returns transaction ID. | Verified |
| 7 | Simulate Razorpay payment verification | Constant-time HMAC verification matches signature; order status updates to `paid`. | Verified |
| 8 | Simulate payment failure | Order records `failed` status; customer is offered retry option without cart loss. | Verified |
| 9 | Replay webhook delivery | Idempotency lookup in `payment_events` ignores duplicate webhook payload without sending duplicate confirmation emails. | Verified |
| 10 | Attempt unauthorized access to admin API | `/api/admin/orders` rejects requests lacking the authorized `admin-pin` header with HTTP 401. | Verified |
| 11 | Trigger Resend transactional email | Order confirmation email renders branded HTML receipt; falls back safely to console logging if credentials are unset in local test mode. | Verified |
| 12 | UTM parameter persistence | Landing on `/?utm_source=instagram` preserves source in customer session and records attribution in order payload. | Verified |
| 13 | GA4 purchase event deduplication | Purchase event fires only once per unique `order_id` in browser session. | Verified |
| 14 | Technical SEO audit | `sitemap.xml` returns 200 with 23 dishes; `robots.txt` disallows `/admin/`, `/checkout/`. | Verified |
| 15 | Responsive viewport verification | Mobile (375px), Tablet (768px), and Desktop (1440px) viewports render without horizontal overflow. | Verified |
