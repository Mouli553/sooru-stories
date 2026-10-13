"use client";

import React from "react";
import { useCart } from "@/lib/cart";

export default function BookingSection() {
  const { openBookingModal } = useCart();

  return (
    <section className="section section-alt" id="booking">
      <div className="container">
        <div className="booking-container">
          <div>
            <div className="eyebrow">Your Table Awaits</div>
            <h2>Let&apos;s Make It an Unforgettable Story</h2>
            <p className="muted" style={{ margin: "16px 0 24px" }}>
              Whether it is an intimate family dinner, an auspicious birthday feast, or a weekend gathering 
              of lifelong friends, we prepare our dining tables with freshly cut plantain leaves, earthen water carafes, 
              and heartwarming hospitality.
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 30 }}>
              <li style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                <span style={{ color: "var(--gold)" }}>✓</span> Traditional Banana Leaf Feast Seating
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                <span style={{ color: "var(--gold)" }}>✓</span> Private Dining &amp; Family Booths Available
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                <span style={{ color: "var(--gold)" }}>✓</span> Customized Spice Levels &amp; Dietary Care
              </li>
            </ul>

            <button
              type="button"
              className="btn btn-primary"
              onClick={openBookingModal}
            >
              Reserve a Table Online 🪑
            </button>
          </div>

          <div
            style={{
              background: "rgba(4, 18, 11, 0.7)",
              border: "1px solid var(--forest-border)",
              borderRadius: "var(--radius-lg)",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: 16
            }}
          >
            <h3 style={{ color: "var(--gold)" }}>Direct Table Enquiry</h3>
            <p className="muted" style={{ fontSize: 13.5 }}>
              Need urgent weekend reservations or bulk corporate catering bookings? Chat directly with our host on WhatsApp for immediate confirmation.
            </p>

            <a
              href="https://wa.me/919876543210?text=Vanakkam%20Sooru%20%26%20Stories!%20I%20would%20like%20to%20reserve%20a%20table%20for%20dinner."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Quick WhatsApp Reservation 💬
            </a>

            <div style={{ padding: "16px", background: "rgba(212, 175, 55, 0.08)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--gold)", fontSize: 13, color: "var(--gold-shimmer)" }}>
              ⏱️ <strong>Kitchen Hours:</strong> Lunch: 12:00 PM – 3:30 PM | Dinner: 7:00 PM – 10:30 PM
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
