import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Sooru & Stories",
  description: "Our privacy commitments, user data protection, and transparent practices at Sooru & Stories."
};

export default function PrivacyPage() {
  return (
    <div style={{ paddingTop: 110, minHeight: "80vh" }}>
      <div className="container" style={{ padding: "40px 24px 80px", maxWidth: 860 }}>
        <div className="section-header" style={{ textAlign: "left", marginBottom: 36 }}>
          <div className="eyebrow">Customer Trust</div>
          <h1>Privacy Policy</h1>
          <p className="muted">Last updated: October 2026. We respect your personal data and privacy.</p>
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
            <h3 style={{ color: "var(--gold)", marginBottom: 8 }}>1. Data Collection</h3>
            <p className="muted">
              We collect your name, phone number, and delivery address solely for the purpose of fulfilling food delivery orders, table reservations, and catering inquiries. We do not sell or monetize personal contact information.
            </p>
          </div>

          <div>
            <h3 style={{ color: "var(--gold)", marginBottom: 8 }}>2. Payment Information</h3>
            <p className="muted">
              All online payments are processed through secure, PCI-DSS compliant third-party payment gateways (such as Razorpay or UPI). Sooru &amp; Stories does not store credit/debit card numbers or bank account PINs on our servers.
            </p>
          </div>

          <div>
            <h3 style={{ color: "var(--gold)", marginBottom: 8 }}>3. WhatsApp Communication</h3>
            <p className="muted">
              When placing an order or making a reservation via WhatsApp, communication is end-to-end encrypted under Meta&apos;s WhatsApp privacy standards. We use WhatsApp strictly for order confirmation, live delivery tracking, and customer service.
            </p>
          </div>

          <div>
            <h3 style={{ color: "var(--gold)", marginBottom: 8 }}>4. Analytics &amp; Cookies</h3>
            <p className="muted">
              We use aggregated, anonymized web analytics (such as Google Analytics 4) to monitor website traffic, conversion funnels, and improve menu discoverability. No personally identifiable information (PII) is transmitted to third-party ad networks.
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