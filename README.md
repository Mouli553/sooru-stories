# Sooru & Stories commerce foundation

A new Next.js App Router + TypeScript application based on the restaurant brand and existing menu assets. This is an implementation foundation, **not yet a live ordering platform**. Real checkout, account persistence, email delivery, and admin mutations are disabled until business configuration and provider integration tests are complete.

## Current functionality
- Responsive restaurant storefront in forest green, cream and gold.
- Category browsing, menu listing, individual menu-item routes and metadata.
- Eight rasam products use the owner-provided prices. Other listed items/prices are provisional draft data and require approval.
- Supabase schema migration with profiles, products, carts, orders, payment/email event records, status history, constraints, indexes and baseline RLS policies.
- Health/config status endpoint at `/api/health`.
- Sitemap, robots rules, privacy/terms/delivery/refunds draft pages and implementation documentation.
- Server-side pricing helper and unit tests.

## Not enabled yet
- Real cart persistence, checkout and order creation.
- Razorpay payment order creation, signature verification and webhook processing.
- Supabase Auth customer account flow and protected admin workflows.
- Resend transactional email and idempotent delivery events.
- GA4 events, consent management and UTM attribution.
- Live deployment/domain.

These are intentionally not represented as working features. Do not take orders or payments until these flows are implemented, configured and tested.

## Local setup
1. Use Node.js 22+.
2. `cp .env.example .env.local` and fill only verified values.
3. `npm install`
4. `npm run dev`
5. `npm run typecheck && npm test && npm run lint && npm run build`

The current environment could not complete `npm install` during initial setup, so framework build and package-based tests have not been verified here.

## Before launch
Read `docs/SETUP_AND_DEPLOYMENT.md`, `docs/SECURITY.md`, `docs/ARCHITECTURE.md`, `docs/SEO_AND_ANALYTICS.md`, and `docs/TESTING.md`. Confirm actual business contact details, operating location, fulfilment mode and service area, opening hours, approved menu/prices, tax treatment, cancellation/refund rules, privacy/legal content, domain, and provider credentials.
