"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function HeroSection() {
  const { openBookingModal } = useCart();

  return (
    <section className="hero-section">
      <div className="hero-bg" />
      <div className="hero-content">
        <div className="hero-left">
          <div className="eyebrow">Sooru &amp; Stories · Tamil Nadu</div>
          <h1 className="hero-title">
            The warmth of home,
            <span>served on a leaf.</span>
          </h1>
          <p className="hero-subtitle">
            Slow-cooked clay pot feasts, fragrant Seeraga Samba biryani, and eight
            traditional rasams — made with the care of a kitchen that feels like home.
          </p>

          <div className="hero-ctas">
            <Link href="/menu" className="btn btn-primary">
              Explore the menu <span aria-hidden="true">↗</span>
            </Link>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={openBookingModal}
            >
              Reserve a table
            </button>
          </div>

          <div className="hero-badges">
            <div className="hero-badge-item">
              <span className="badge-stat">4.9 ★</span>
              <span className="badge-label">Loved by our guests</span>
            </div>
            <div className="hero-badge-item">
              <span className="badge-stat">8 Rasams</span>
              <span className="badge-label">A tradition worth keeping</span>
            </div>
            <div className="hero-badge-item">
              <span className="badge-stat">100% Pure</span>
              <span className="badge-label">Made with care, every day</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
