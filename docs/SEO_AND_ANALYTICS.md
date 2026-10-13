# SEO & Analytics Architecture — Sooru & Stories

This document specifies the technical SEO architecture, structured data implementation, Google Analytics 4 (GA4) e-commerce measurement plan, and UTM campaign attribution pipeline for **Sooru & Stories**.

---

## 1. Technical SEO & Indexing Architecture

### 1.1 Canonical URLs & Page Hierarchy
- Every public page generates a `<link rel="canonical" href="...">` tag based on `NEXT_PUBLIC_SITE_URL`.
- Campaign query parameters (e.g. `?utm_source=...`) and transient filters do not alter the canonical URL, preventing duplicate indexing.
- Private routes are strictly configured with `robots: { index: false, follow: false }`:
  - `/account`
  - `/admin`
  - `/cart`
  - `/checkout`
  - `/api/*`

### 1.2 Dynamic XML Sitemap & Robots.txt
- **Sitemap (`/sitemap.xml`):** Automatically indexes the homepage, main menu (`/menu`), story/contact/legal pages, and all 23 dynamic dish URLs (`/menu/[slug]`) generated from the catalog data.
- **Robots.txt (`/robots.txt`):** Allows crawling of public routes while disallowing `/admin/`, `/account/`, `/checkout/`, `/cart/`, and `/api/`. References the canonical `/sitemap.xml`.

### 1.3 Structured Data (Schema.org JSON-LD)
1. **Restaurant Entity (`Restaurant`):** Injected at root layout (`app/layout.tsx`):
   - `@type`: `Restaurant`
   - `name`: Sooru & Stories
   - `servesCuisine`: `["South Indian", "Chettinad", "Kongu", "Tamil Heritage"]`
   - `priceRange`: `₹₹`
   - `address`: Locality, Region, Country
2. **Product & MenuItem Entities (`MenuItem` / `Product`):** Injected dynamically on dish detail pages (`app/menu/[slug]/page.tsx`):
   - `@type`: `MenuItem`
   - `name`: Dish title (e.g. "Kollu Rasam (Horse Gram)")
   - `description`: Heritage cooking story & botanical notes
   - `offers`: Accurate server price in INR, in-stock status
   - `suitableForDiet`: Vegetarian / Non-vegetarian compliance

---

## 2. Google Analytics 4 (GA4) E-Commerce Measurement Plan

### 2.1 Core Implementation Rules
- GA4 initializes via `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- PII (Personally Identifiable Information) such as phone numbers, emails, customer addresses, and payment tokens are **strictly excluded** from analytics payloads.
- All monetary values are denominated in `INR`.

### 2.2 Supported E-Commerce Events

| Event Name | Trigger Point | Payload Parameters |
|---|---|---|
| `view_item_list` | Browsing `/menu` catalog | `item_list_name`, `items: [{ item_id, item_name, price, item_category }]` |
| `select_item` | Clicking a dish card | `item_list_name`, `items: [{ item_id, item_name, price }]` |
| `view_item` | Viewing `/menu/[slug]` page | `currency: 'INR'`, `value: price`, `items: [{ item_id, item_name, price }]` |
| `add_to_cart` | Clicking "+ Add" in drawer/card/detail | `currency: 'INR'`, `value`, `items: [{ item_id, item_name, price, quantity }]` |
| `remove_from_cart` | Decreasing quantity to 0 | `currency: 'INR'`, `value`, `items: [{ item_id, item_name, price, quantity }]` |
| `view_cart` | Opening Cart Drawer or `/cart` | `currency: 'INR'`, `value: subtotal`, `items` |
| `begin_checkout` | Opening checkout modal | `currency: 'INR'`, `value: total`, `coupon`, `items` |
| `add_payment_info` | Selecting Razorpay / COD | `currency: 'INR'`, `value: total`, `payment_type` |
| `purchase` | Payment signature verified by server | `transaction_id`, `value`, `tax`, `shipping`, `currency: 'INR'`, `items` |

### 2.3 Purchase Event Deduplication Strategy
To prevent double-counting purchases on page refreshes or webhook retries:
1. The `purchase` event is fired only after the server responds with `{ success: true, verified: true }`.
2. The `transaction_id` is tied to the unique order ID (`SOORU-XXXXXXXX`).
3. Local session storage caches the processed `transaction_id` so subsequent refreshes do not re-emit the GA4 tag.

---

## 3. UTM Campaign Tracking & Attribution Pipeline

### 3.1 Supported Parameters
- `utm_source` (e.g., `instagram`, `google`, `whatsapp_newsletter`)
- `utm_medium` (e.g., `cpc`, `bio`, `direct_message`)
- `utm_campaign` (e.g., `rasam_festival_2026`, `pongal_feast`)
- `utm_term` (optional search keyword)
- `utm_content` (creative variant, e.g., `reel_kollu_rasam`)

### 3.2 Attribution Pipeline Architecture
1. **Capture on Landing:** When a user lands with UTM parameters, the client extracts valid sanitized alphanumeric parameters.
2. **First-Touch & Last-Touch Storage:**
   - First-touch UTMs are stored in `sooru_utm_first` in `localStorage` (valid for 30 days).
   - Last-touch UTMs are stored in `sooru_utm_last` to capture the immediate conversion driver.
3. **Internal Navigation Safety:** UTM parameters are stripped from subsequent internal links to ensure clean canonical routing and prevent search crawl duplication.
4. **Order Association:** During order creation (`/api/order`), the active UTM payload is transmitted to the server and logged alongside the order record for conversion rate optimization.

---

## 4. Google Search Console Verification Checklist

1. **Verify Ownership:** Add the DNS TXT record or HTML verification tag provided by Search Console.
2. **Submit Sitemap:** Submit `https://your-domain.com/sitemap.xml`.
3. **Inspect URLs:** Test `https://your-domain.com/menu/kollu-rasam` using the URL Inspection Tool to ensure Rich Results (Product/MenuItem) are detected with 0 errors.
4. **Mobile Usability:** Verify touch targets, viewport scaling, and lack of horizontal scrolling on mobile viewports.
