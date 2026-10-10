# Security notes

- Never expose `SUPABASE_SERVICE_ROLE_KEY`, Razorpay secrets, or Resend API key to browser code.
- Keep checkout disabled until server-side pricing, stock locking, idempotency, payment signature verification, and webhook verification are implemented and tested.
- Do not allow client profile updates to elevate `role`; admin role assignment is an operator-only process.
- The migration enables RLS on customer and order data. Payment/email events intentionally have no customer policies. Review RLS in a real Supabase project with anon/customer/admin test identities before launch.
- Apply rate limiting at the edge/server for auth, checkout, coupons, contact, and webhook routes.
- Set CSP appropriate to actual third-party scripts before production; security headers in `next.config.ts` are a baseline, not a full threat-model substitute.
- The current UI has no order submission or payment path; no order/payment security claim should be inferred from the presence of schema alone.
