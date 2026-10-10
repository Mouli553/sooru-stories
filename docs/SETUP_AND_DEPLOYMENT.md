# Setup & deployment

1. Install Node.js 22+ and npm.
2. Copy `.env.example` to `.env.local`; never commit `.env.local`.
3. Create a Supabase project and apply `supabase/migrations/202610090001_initial_schema.sql` after a security review. Configure Auth redirect URLs.
4. Seed approved products/categories and real stock data. Do not import draft catalogue prices without owner sign-off.
5. Create Razorpay test credentials; configure a webhook endpoint only after the payment route is implemented and deployed. Test signatures and duplicate webhook delivery.
6. Configure a verified Resend sender domain and `EMAIL_FROM`; publish SPF/DKIM/DMARC records.
7. Create GA4 property and set `NEXT_PUBLIC_GA_MEASUREMENT_ID` only after consent and event deduplication are implemented.
8. Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS domain and configure Vercel environment variables.
9. Run `npm install`, `npm run typecheck`, `npm test`, `npm run lint`, and `npm run build`.
10. Verify domain ownership, sitemap, redirects, backups, monitoring, and rollback before launch.

No live provider integrations or deployment have been verified by this scaffold.
