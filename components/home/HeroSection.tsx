"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { menuItems, formatINR } from "@/lib/menu";

export default function HeroSection() {
  const { addToCart, openBookingModal } = useCart();
  const spotlightItem = menuItems.find((i) => i.id === "biryani-ambur-royal") || menuItems.find((i) => i.bestseller) || menuItems[0];

  return (
    <section className="hero-section">
      <div className="hero-bg" />
      <div className="hero-content">
        <div className="hero-left">
          <div className="eyebrow">A Table Full of Living Heritage</div>
          <h1 className="hero-title">
            Sooru &amp; Stories
            <span>Good Food, Great Stories, Beautiful Memories.</span>
          </h1>
          <p className="hero-subtitle">
            Relive the nostalgia of slow-cooked South Indian clay pot feasts, 
            fragrant Seeraga Samba biryanis, and our signature 8 medicinal herbal rasams 
            crafted with cold-pressed oils and stone-ground spices.
          </p>

          <div className="hero-ctas">
            <Link href="/menu" className="btn btn-primary">
              Explore Full Menu →
            </Link>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={openBookingModal}
            >
              Reserve a Table 🪑
            </button>
            <a href="#rasam" className="btn btn-secondary">
              The 8 Rasams 🍵
            </a>
          </div>

          <div className="hero-badges">
            <div className="hero-badge-item">
              <span className="badge-stat">4.9 ★</span>
              <span className="badge-label">500+ Google Reviews</span>
            </div>
            <div className="hero-badge-item">
              <span className="badge-stat">8 Rasams</span>
              <span className="badge-label">Time-Honored Elixirs</span>
            </div>
            <div className="hero-badge-item">
              <span className="badge-stat">100% Pure</span>
              <span className="badge-label">Native Country Ghee</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-feature-card">
            <span className="feature-tag">👑 Chef's Weekend Spotlight</span>
            <Image
              src={spotlightItem.image}
              alt={spotlightItem.name}
              width={380}
              height={200}
              className="feature-img"
              priority
            />
            <div className="eyebrow" style={{ fontSize: 11 }}>
              {spotlightItem.category}
            </div>
            <h3 className="feature-title">{spotlightItem.name}</h3>
            <p className="feature-desc">{spotlightItem.description}</p>
            <div className="feature-row">
              <span className="feature-price">{formatINR(spotlightItem.pricePaise)}</span>
              <button
                type="button"
                className="add-cart-btn"
                onClick={() => addToCart(spotlightItem)}
              >
                <span>+</span> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
