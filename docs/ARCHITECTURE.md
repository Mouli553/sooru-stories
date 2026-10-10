# Architecture

## Current state
This repository was created from the available HTML-only Sooru & Stories assets. No pre-existing Next.js repository, database, or deployment configuration was present to preserve. The current app is a Next.js App Router / TypeScript foundation with a branded storefront, individual menu routes, menu data, configuration reporting, and a Supabase schema draft.

## Intended production flow
Browser → Next.js server routes/actions → Supabase PostgreSQL (RLS) → Razorpay server order + signature/webhook verification → idempotent order/payment state updates → Resend transactional email event. GA4 is browser analytics only and must never be a source of truth for payment/order records.

## Trust boundaries
- Browser input is untrusted; server recomputes all prices and availability.
- Supabase anon key is publishable; service-role key is server-only.
- Payment success requires server signature and webhook/status verification, not a client redirect.
- Webhook event IDs are unique to prevent duplicate processing.
- Admin routes require server-side role checks and audit history.

## Current blockers
Supabase, Razorpay, Resend, GA4, legal business details, menu confirmation, and fulfillment rules are not configured. Checkout/account/admin operations are intentionally disabled.
