# 🏛️ Sooru & Stories — Architecture & Data Flow

## 1. System Overview

Sooru & Stories is an end-to-end full-stack e-commerce platform designed for speed, resilience, and data integrity.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT / STOREFRONT (Next.js 15)                │
│   • Home (Hero, 8 Rasams, Showcase, Heritage Story, Testimonials)      │
│   • Interactive Menu & Search (/menu)                                  │
│   • Dynamic SSG Dish Pages (/menu/[slug])                              │
│   • Persistent Cart Drawer & Full Cart (/cart)                         │
│   • Omnichannel Checkout Modal (/checkout, OrderModal)                │
│   • Customer Portal (/account) & Kitchen Admin Dashboard (/admin)      │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                 ┌───────────────────┴───────────────────┐
                 ▼                                       ▼
    ┌───────────────────────────┐           ┌───────────────────────────┐
    │     REST API HANDLERS     │           │   EXTERNAL INTEGRATIONS   │
    │  • POST /api/order        │           │  • Razorpay Checkout &    │
    │  • POST /api/razorpay/*   │──────────►│    Webhooks               │
    │  • GET/POST /api/cart     │           │  • Resend Email API       │
    │  • GET/PATCH /api/admin/* │           │  • WhatsApp wa.me API     │
    └─────────────┬─────────────┘           │  • Google Analytics 4     │
                  │                         └───────────────────────────┘
                  ▼
    ┌───────────────────────────┐
    │    SUPABASE POSTGRESQL    │
    │  • orders & order_items   │
    │  • carts & cart_items     │
    │  • profiles & addresses   │
    │  • payment_events (Idem)  │
    │  • order_status_history   │
    └───────────────────────────┘
```

---

## 2. Order Lifecycle & State Machine

Every order moves through explicit, verifiable states:

1. **`pending_payment`**: Order draft initialized with unique `orderNumber` (`SS-XXXXXX-XXX`) and idempotency key.
2. **`payment_verification`**: Razorpay checkout opened on client; server awaiting verification.
3. **`paid`**: Server-verified cryptographic HMAC signature (`crypto.timingSafeEqual`) or verified webhook event. Payment marked as `captured`.
4. **`processing`**: Order accepted by kitchen dispatch; chef begins cooking.
5. **`ready_for_pickup`** / **`out_for_delivery`**: Insulated packaging dispatched with local delivery rider.
6. **`delivered`**: Handed over to customer at doorstep.
7. **`cancelled`** / **`refunded`**: Order cancelled within permitted window; refund recorded.

---

## 3. Server-Side Price Integrity & Security Boundary

* **Never Trust the Client:** The client submits dish IDs and requested quantities. The server looks up each item in `lib/menu.ts` (Single Source of Truth), verifies availability, and recalculates line items, coupon discounts, and delivery fees.
* **Timing-Safe Cryptography:** All Razorpay signatures are verified using `crypto.timingSafeEqual(expected, received)` to prevent timing side-channel attacks.
* **Idempotent Webhook Processing:** Razorpay webhook events are hashed and checked against `payment_events` table before processing, preventing duplicate customer emails or double order fulfillment.
