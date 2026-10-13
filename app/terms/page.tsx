import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Sooru & Stories",
  description: "Terms and conditions governing orders, reservations, and dining at Sooru & Stories."
};

export default function TermsPage() {
  return (
    <div style={{ paddingTop: 110, minHeight: "80vh" }}>
      <div className="container" style={{ padding: "40px 24px 80px", maxWidth: 860 }}>
        <div style={{ fontSize: 13, color: "var(--cream-muted)", marginBottom: 20 }}>
          <Link href="/" style={{ color: "var(--gold-light)" }}>← Home</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--cream)" }}>Terms &amp; Conditions</span>
        </div>

        <div className="section-header" style={{ textAlign: "left", marginBottom: 36 }}>
          <div className="eyebrow">Legal Framework</div>
          <h1>Terms &amp; Conditions</h1>
          <p className="muted">Please read these terms carefully before placing food orders or reservations.</p>
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
            <h3 style={{ color: "var(--gold)", marginBottom: 8 }}>1. Kitchen Preparation &amp; Freshness</h3>
            <p className="muted">
              All dishes at Sooru &amp; Stories are prepared fresh upon order placement. Because our recipes rely on natural ingredients and traditional earthen cookware, slight variations in natural color and seasonal aroma may occur.
            </p>
          </div>

          <div>
            <h3 style={{ color: "var(--gold)", marginBottom: 8 }}>2. Menu Pricing &amp; Currency</h3>
            <p className="muted">
              All menu prices are displayed in Indian Rupees (INR) and are inclusive of standard applicable taxes. We do not impose hidden service charges or packaging markups on direct orders.
            </p>
          </div>

          <div>
            <h3 style={{ color: "var(--gold)", marginBottom: 8 }}>3. Order Acceptance &amp; Availability</h3>
            <p className="muted">
              Due to daily fresh procurement, certain seasonal dishes (such as specific herbal rasams or Sunday biryanis) may sell out during peak weekend periods. In the rare event of unavailability, our dispatch coordinator will offer immediate substitutions or full refund.
            </p>
          </div>

          <div>
            <h3 style={{ color: "var(--gold)", marginBottom: 8 }}>4. Delivery Radius &amp; Delays</h3>
            <p className="muted">
              Estimated delivery times (35–45 minutes) are subject to weather, peak traffic, and remote location accessibility in the Sathyamangalam / Erode cluster.
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