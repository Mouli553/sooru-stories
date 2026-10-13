import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellations & Refunds | Sooru & Stories",
  description: "Our fair refund policy and order cancellation guidelines at Sooru & Stories."
};

export default function RefundsPage() {
  return (
    <div style={{ paddingTop: 110, minHeight: "80vh" }}>
      <div className="container" style={{ padding: "40px 24px 80px", maxWidth: 860 }}>
        <div className="section-header" style={{ textAlign: "left", marginBottom: 36 }}>
          <div className="eyebrow">Customer Protection</div>
          <h1>Cancellations &amp; Refund Policy</h1>
          <p className="muted">We stand behind the quality and freshness of every single dish we serve.</p>
        </div>

        <div
          style={{
            background: "var(--forest-card)",
            border: "1px solid var(--forest-border)",
            borderRadius: "var(--radius-xl)",
            padding: "36px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            fontSize: 14.5,
            lineHeight: 1.7
          }}
        >
          <div>
            <h3 style={{ color: "var(--gold)", marginBottom: 8 }}>1. Order Cancellation Window</h3>
            <p className="muted">
              Because all food is cooked freshly to order, cancellations can be accepted within <strong>5 minutes</strong> of order placement on WhatsApp. Once the chef begins simmering or roasting the dishes, orders cannot be cancelled.
            </p>
          </div>

          <div>
            <h3 style={{ color: "var(--gold)", marginBottom: 8 }}>2. Quality Assurance &amp; Replacements</h3>
            <p className="muted">
              If an order arrives compromised, spilled during transit, or missing an item, please share a quick photograph on WhatsApp within 30 minutes of delivery. We will immediately dispatch a fresh replacement free of charge or initiate a full refund.
            </p>
          </div>

          <div>
            <h3 style={{ color: "var(--gold)", marginBottom: 8 }}>3. Online Refund Processing</h3>
            <p className="muted">
              Refunds approved for online payments (UPI / Card) will be credited back to the customer&apos;s original payment method within 2 to 4 business days, per standard bank clearing cycles.
            </p>
          </div>

          <div>
            <h3 style={{ color: "var(--gold)", marginBottom: 8 }}>4. Table Booking Cancellations</h3>
            <p className="muted">
              Table reservations incur no cancellation penalty. We kindly request guests to message our host at least 2 hours prior to allow seating allocation for waiting guests.
            </p>
          </div>

          <div style={{ paddingTop: 10 }}>
            <Link href="/" className="btn btn-secondary">
              ← Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}