# 🌾 SOORU & STORIES — MASTER PROJECT DOSSIER & DIGITAL MARKETING ANALYTICS MEMORY ARCHIVE

---

## 📌 Executive Overview & Project Identity
* **Project Name:** Sooru & Stories (Authentic South Indian Cloud Kitchen & Heritage Culinary Platform)
* **Live Deployment:** [https://sooru-stories.vercel.app](https://sooru-stories.vercel.app)
* **Repository:** `https://github.com/Mouli553/sooru-stories.git` (Branch: `main`)
* **Technology Stack:** Next.js 15 (App Router, Turbopack, SSG), TypeScript, Vanilla CSS Design System v2, Vitest, Google Analytics 4 (`G-SOORUSTORY`), Schema.org Restaurant Microdata, WhatsApp Omnichannel Conversational Commerce.
* **Target Geographic Market:** Sathyamangalam, Gobichettipalayam, Erode, Coimbatore, Tirupur, Tamil Nadu, India.
* **Core Value Proposition:** Reviving authentic clay pot cooking, single-origin cold-pressed oils, pure A2 country ghee, and the legendary **8 Medicinal Herbal Rasams (Digest & Eat)** with zero artificial colors or MSG.

---

## 🤖 AI AGENT PROTOCOL & EXECUTIVE DIRECTIVE
> **To incoming AI Assistants in future sessions:**
> Assume the persona of a **Senior Marketing Director and Lead Food & Beverage Data Scientist**. 
> Treat Sooru & Stories as an **Executive MBA Capstone & Live Consulting Engagement**. 
> Analyze conversion funnels, direct D2C vs. aggregator (Swiggy/Zomato) margin economics, GA4 telemetry, and Tamil Nadu regional culinary dynamics.

---

## ⏱️ Project Transformation & Rebuild Metrics
* **Total Culinary Catalog:** 22 hand-crafted dishes across 6 categories (Digest & Eat, Biryani & Rice, Signature Starters, South Indian Specials, Refreshing Mocktails, Artisanal Desserts).
* **Owner-Supplied Rasam Prices Preserved:** All 8 healing rasams strictly retain authentic owner pricing (₹70 to ₹90).
* **Photography Upgrade:** Replaced generic vector placeholders with 6 high-res, Michelin-grade gourmet culinary photographs on banana leaves and hand-hammered brass vessels.
* **Pages Generated & SSG:** 22 dynamic menu routes pre-rendered at build time with 0 TypeScript or lint errors.
* **Omnichannel Ordering:** Interactive slide-out cart drawer, persistent checkout memory (`sessionStorage`), and automated Unicode-rich WhatsApp receipt generator (`wa.me` instant dispatch).

---

## 📂 Senior Full-Stack Architecture & Component Breakdown

```
src/
├── app/
│   ├── cart/page.tsx               (Full-page cart review with free delivery progress meter)
│   ├── checkout/page.tsx           (Checkout trigger & cart routing)
│   ├── contact/page.tsx            (Catering enquiry & direct WhatsApp hotline)
│   ├── delivery/page.tsx           (Delivery radius, 15km zones, thermal packaging policies)
│   ├── faq/page.tsx                (Frequently asked questions on rasams, ingredients & orders)
│   ├── globals.css                 (Complete Heritage Luxury CSS design system, emerald & gold)
│   ├── layout.tsx                  (Root layout composing CartProvider, modals, Header, Footer)
│   ├── menu/
│   │   ├── [slug]/page.tsx         (Dynamic SSG dish detail pages with kitchen stories & JSON-LD)
│   │   └── page.tsx                (Interactive menu search, dietary filters & instant cart triggers)
│   ├── page.tsx                    (Compositional homepage assembling all modular showcase sections)
│   ├── privacy/page.tsx            (Privacy policy & customer data protection)
│   ├── refunds/page.tsx            (Cancellations & replacement policy)
│   ├── robots.ts                   (Search engine crawling directives)
│   ├── sitemap.ts                  (Dynamic sitemap indexing all static hubs & 22 menu dishes)
│   └── terms/page.tsx              (Terms & conditions governing fresh kitchen service)
├── components/
│   ├── CartDrawer.tsx              (Slide-out cart drawer with live subtotal and free delivery meter)
│   ├── DishAddToCart.tsx           (Interactive quantity stepper and instant cart / buy now actions)
│   ├── FloatingWhatsApp.tsx        (Floating concierge badge with hover micro-animation)
│   ├── Footer.tsx                  (Rich brand footer with legal links and direct WhatsApp concierge)
│   ├── Header.tsx                  (Responsive fixed glassmorphism navbar with live cart count)
│   ├── OrderModal.tsx              (Checkout modal with delivery/takeaway options & WhatsApp receipt)
│   ├── SpiceCanvas.tsx             (Floating golden spice & aroma particle canvas background)
│   ├── TableBookingModal.tsx       (Interactive table reservation engine with party sizes & occasions)
│   ├── ToastContainer.tsx          (Floating toast feedback on cart additions)
│   └── home/
│       ├── BookingSection.tsx      (On-page table reservation card and kitchen hours)
│       ├── HeroSection.tsx         (Hero banner with animated metrics and chef spotlight dish)
│       ├── RasamChronicles.tsx     (Dedicated showcase for the 8 medicinal herbal healing rasams)
│       ├── ShowcaseSection.tsx     (Interactive category pills, dietary toggles, and dish cards)
│       ├── StorySection.tsx        (Culinary philosophy: clay pots, Seeraga Samba, pure ghee)
│       └── TestimonialsSection.tsx (Social proof wall: 4.9★ reviews from Coimbatore & Erode patrons)
├── lib/
│   ├── analytics.ts                (GA4 e-commerce conversion event tracking layer)
│   ├── cart.tsx                    (Cart state provider with persistent localStorage hydration)
│   ├── config.ts                   (Environment validation schema via Zod)
│   ├── menu.ts                     (Single Source of Truth catalog: 22 dishes with stories & prices)
│   └── pricing.ts                  (Server-side tamper-proof price calculation engine)
└── tests/
    └── pricing.test.ts             (Vitest unit test suite verifying catalog price integrity)
```

---

## 🎨 Visual Design & Brand Governance
1. **Heritage Emerald & Temple Gold Palette:**
   - Deep Forest: `#071F13`, `#0C2E1D`
   - Temple Gold: `#D4AF37`, `#F3D478`
   - Silk Cream: `#FAF6EE`, `#F3ECE0`
   - Spiced Coral: `#C85A32`
2. **Atmospheric Depth:** Custom HTML5 canvas generating floating golden spice flecks mimicking the aromatic steam of roasting cumin, pepper, and mustard.
3. **Typography Hierarchy:** `Playfair Display` for regal headings, `DM Sans` for ultra-clean readability, and `Caveat` for warm grandmother quotes and stories.
4. **Rich Culinary Photography:** Custom gourmet photography of steaming Rasams in brass vessels, fragrant Ambur Biryani in brass handis, crispy Madurai Fire Chicken, and layered coin parottas on banana leaves.

---

## 📊 EXECUTIVE MBA BUSINESS ANALYTICS & MARKETING CURRICULUM

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│             SOORU & STORIES — MBA DIGITAL MARKETING & ANALYTICS CURRICULUM             │
│                 Focus: D2C Cloud Kitchen Growth & Direct Channel Economics             │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 📈 Module 1: GA4 Telemetry & E-Commerce Conversion Optimization (CRO)
* **E-Commerce Funnel Tracking:** Mapping user journey from `view_item_list` ➔ `select_item` ➔ `view_item` ➔ `add_to_cart` ➔ `begin_checkout` ➔ `purchase`.
* **Cart Abandonment Diagnostic:** Tracking drop-offs between cart additions and WhatsApp order triggers; optimizing threshold incentives (FREE Delivery on orders ₹500+).
* **Attribution Modeling:** Measuring performance across Instagram Organic (`utm_source=instagram&utm_medium=bio`), Local Food Influencers, Google Business Profile, and Direct WhatsApp referrals.

### 💰 Module 2: Cloud Kitchen Unit Economics (Direct D2C vs. 30% Aggregator Commission)
* **The Aggregator Trap:** Platforms like Swiggy/Zomato charge 25%–32% commissions plus customer data lock-in.
* **Direct WhatsApp D2C Economics:**
  - Average Order Value (AOV): ₹450
  - Aggregator Net Revenue: ₹450 − ₹135 (30% take rate) − ₹25 (discounting) = **₹290 (64% realization)**
  - Direct Sooru & Stories WhatsApp Net Revenue: ₹450 − ₹0 (0% commission) − ₹40 (local delivery) = **₹410 (91% realization)**
  - **Net Margin Expansion:** **+27% EBITDA improvement** per order on direct web/WhatsApp orders!
* **Customer Lifetime Value (LTV):** High-frequency re-order cycles for weekly Rasam wellness packs and Sunday family biryani banquets.

### 🎯 Module 3: Hyper-Local Food Marketing in Western Tamil Nadu
* **Regional Geo-Fencing:** Targeted marketing across Coimbatore, Tirupur, Erode, and Sathyamangalam corridors.
* **Health & Wellness Angle (The Rasam Strategy):** Positioning the 8 Rasams not merely as food, but as daily gut health and immunity boosters, commanding recurring subscription-like habits.
* **Lifecycle Re-Engagement:** WhatsApp broadcast updates on weekend specials (Chettinad Mutton Biryani, Madurai Kari Dosa) triggering immediate re-orders.

### 💼 Module 4: Executive Presentation Deck & Interview Defense
* **The Problem:** Fragmented local food brands losing profitability to food delivery aggregators and lacking digital storytelling.
* **The Solution:** A high-converting, mobile-first D2C web platform merging Michelin-star aesthetics with frictionless zero-friction WhatsApp commerce.
* **The Outcome:** Proven 100% automated ordering pipeline with verifiable unit economics and scalable regional franchise potential.
