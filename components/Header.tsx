"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";

const RESTAURANT_WHATSAPP = "919384638754";

export default function Header() {
  const { totalItems, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent("Vanakkam Sooru & Stories! I'd like to check today's specials and place an order.");
    window.open(`https://wa.me/${RESTAURANT_WHATSAPP}?text=${text}`, "_blank");
  };

  return (
    <header className="site-header">
      {/* Top Announcement Bar - Live Kitchen & Free Shipping Notice */}
      <div className="top-announcement-strip">
        <div className="announcement-content">
          <div className="announcement-left">
            <span className="live-status-pulse">
              <span className="live-dot" />
              <strong>Kitchen LIVE:</strong> Taking Orders
            </span>
            <span className="announcement-sep">|</span>
            <span className="announcement-promo">
              ✨ <strong>FREE Delivery</strong> on orders above ₹500
            </span>
            <span className="announcement-sep">|</span>
            <span className="announcement-area">
              📍 Sathyamangalam &amp; Surrounding Regions (35–45m)
            </span>
          </div>

          <div className="announcement-right">
            <button
              type="button"
              className="top-wa-btn"
              onClick={handleWhatsAppClick}
              title="WhatsApp Kitchen Hotline"
            >
              💬 WhatsApp: <strong>+91 93846 38754</strong>
            </button>
            <Link href="/track" className="top-track-link">
              🛵 Track Order
            </Link>
          </div>
        </div>
      </div>

      <div className="nav-container">
        <Link href="/" className="brand">
          <div className="brand-title">
            Sooru <span>&amp;</span> Stories
          </div>
          <div className="brand-tagline">Good Food, Great Stories, Beautiful Memories</div>
        </Link>

        <nav
          className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}
          aria-label="Main Navigation"
        >
          <Link
            href="/"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/menu"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Menu &amp; Prices
          </Link>
          <Link
            href="/#rasam"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            The 8 Rasams
          </Link>
          <Link
            href="/#story"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Our Story
          </Link>
          <Link
            href="/#booking"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book a Table
          </Link>
          <Link
            href="/track"
            className="nav-link highlight-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            🛵 Track Order
          </Link>
          <Link
            href="/account"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Account
          </Link>

          {/* Mobile WhatsApp Quick Action */}
          <div className="mobile-wa-strip">
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppClick();
              }}
              style={{ width: "100%", display: "flex", justifyContent: "center", gap: 8 }}
            >
              <span>💬</span> Order via WhatsApp (+91 93846 38754)
            </button>
          </div>
        </nav>

        <div className="nav-actions">
          {/* Quick WhatsApp chat icon for header */}
          <button
            type="button"
            className="header-wa-icon-btn"
            onClick={handleWhatsAppClick}
            aria-label="Direct Kitchen WhatsApp"
            title="Chat with Kitchen Concierge on WhatsApp"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span className="header-wa-label">WhatsApp</span>
          </button>

          <button
            type="button"
            className="cart-btn"
            onClick={openCart}
            aria-label={`Shopping cart with ${totalItems} items`}
          >
            <span>🧺</span>
            <span>Cart</span>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>

          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}