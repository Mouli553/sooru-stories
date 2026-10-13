import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery & Service Radius | Sooru & Stories",
  description: "Check delivery zones, packaging standards, and doorstep timing for Sooru & Stories."
};

export default function DeliveryPage() {
  return (
    <div style={{ paddingTop: 110, minHeight: "80vh" }}>
      <div className="container" style={{ padding: "40px 24px 80px", maxWidth: 860 }}>
        <div className="section-header" style={{ textAlign: "left", marginBottom: 36 }}>
          <div className="eyebrow">Service Guidelines</div>
          <h1>Delivery &amp; Pickup Policies</h1>
          <p className="muted">Transparent details on how we prepare, pack, and transport your orders.</p>
        </div>

        <div
          style={{
            background: "var(--forest-card)",
            border: "1px solid var(--forest-border)",
            borderRadius: "var(--radius-xl)",
            padding: "36px",
            display: "flex",
            flexDirection: "column",
            gap: 28
          }}
        >
          <div>
            <h3 style={{ color: "var(--gold)", marginBottom: 8 }}>1. Delivery Coverage &amp; Zones</h3>
            <p className="muted">
              We deliver piping-hot food across Sathyamangalam, Gobichettipalayam, and adjoining zones within a 15km radius. 
              Orders for Coimbatore &amp; Erode bulk catering are coordinated via prior reservation.
            </p>
          </div>

          <div>
            <h3 style={{ color: "var(--gold)", marginBottom: 8 }}>2. Delivery Timings</h3>
            <p className="muted">
              • <strong>Lunch Orders:</strong> 12:00 PM to 3:30 PM (Dispatched within 35–45 minutes)<br />
              • <strong>Dinner Orders:</strong> 7:00 PM to 10:30 PM (Dispatched within 35–45 minutes)
            </p>
          </div>

          <div>
            <h3 style={{ color: "var(--gold)", marginBottom: 8 }}>3. Delivery Charges &amp; Free Thresholds</h3>
            <p className="muted">
              • Orders of <strong>₹500 and above</strong> receive <strong>100% FREE Doorstep Delivery</strong>.<br />
              • For orders under ₹500, a standard local courier fee of ₹40 applies.
            </p>
          </div>

          <div>
            <h3 style={{ color: "var(--gold)", marginBottom: 8 }}>4. Eco-Friendly Thermal Packaging</h3>
            <p className="muted">
              All dishes are dispatched in tamper-evident food-grade containers lined with natural banana leaves. 
              Our rasams and broths are sealed in spill-proof containers that retain heat and aromatic essential oils.
            </p>
          </div>

          <div>
            <h3 style={{ color: "var(--gold)", marginBottom: 8 }}>5. Self-Pickup / Takeaway</h3>
            <p className="muted">
              Guests can choose &ldquo;Takeaway / Self-Pickup&rdquo; at checkout to collect their hot orders directly from our kitchen counter with zero delivery charges.
            </p>
          </div>

          <div style={{ paddingTop: 10 }}>
            <Link href="/menu" className="btn btn-primary">
              Browse Menu &amp; Order Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}