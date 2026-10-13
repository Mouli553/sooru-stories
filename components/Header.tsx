"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function Header() {
  const { totalItems, openCart } = useCart();
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
          <Link
            href="/#booking"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book a Table
          </Link>
          <Link
            href="/#testimonials"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Reviews
          </Link>
        </nav>

        <div className="nav-actions">
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