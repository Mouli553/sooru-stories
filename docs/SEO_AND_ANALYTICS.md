# SEO & analytics

- Product-specific routes and metadata are generated from the catalogue. Sitemap and robots endpoints exist. Public pages are indexable in metadata. Keep account/admin/cart/checkout out of the sitemap and disallow them in robots rules; add `noindex` metadata to those private pages before launch.
- JSON-LD is rendered for product menu items only; validate schema against the restaurant’s final ordering model before production. Do not publish fabricated review/rating markup.
- GA4 ID is configurable but no events are sent yet. Implement consent-aware `view_item_list`, `select_item`, `view_item`, cart, checkout and verified `purchase` events with transaction deduplication before launch. Never send PII.
- UTM persistence and order attribution are not yet implemented. Keep campaign params out of canonical URLs.
- Submit sitemap to Search Console only after canonical domain and public indexing policy are confirmed.
