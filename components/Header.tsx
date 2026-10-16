"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function Header() {
  const { totalItems, openCart, openBookingModal } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header">
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
          <button
            type="button"
            className="nav-link nav-btn-link"
            onClick={() => {
              setMobileMenuOpen(false);
              openBookingModal();
            }}
          >
            Book a Table
          </button>
          <Link
            href="/track"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Track Order
          </Link>
          <Link
            href="/account"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Account
          </Link>
        </nav>

        <div className="nav-actions">
          {/* Improved Luxury Food E-Commerce Cart Button */}
          <button
            type="button"
            className="cart-btn"
            onClick={openCart}
            aria-label={`Feast cart with ${totalItems} dishes`}
            title="View Your Feast Cart"
          >
            <svg
              className="cart-icon-svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="cart-btn-label">Cart</span>
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
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