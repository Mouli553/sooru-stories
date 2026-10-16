"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { menuItems, formatINR, MenuItem } from "@/lib/menu";
import { trackAddToCart } from "@/lib/analytics";

export default function RasamChronicles() {
  const { addToCart } = useCart();
  const rasams = menuItems.filter((i) => i.category === "Digest & Eat");

  const handleAdd = (rasam: MenuItem) => {
    addToCart(rasam, 1);
    trackAddToCart(rasam, 1);
  };

  return (
    <section className="section rasam-spotlight" id="rasam">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">The Rasam Chronicles · 8 Ancient Healing Elixirs</div>
          <h2>Digest &amp; Eat — 8 Ancient Herbal Healing Elixirs</h2>
          <p className="muted">
            In traditional South Indian dining, Rasam is never just a soup—it is the culinary climax 
            of a feast, engineered over millennia to restore gut flora, ignite agni (digestive fire), 
            and heal the senses with hand-ground herbs and Tellicherry pepper.
          </p>
        </div>

        {/* Heritage Craft Banner */}
        <div className="rasam-heritage-banner">
          <div className="rasam-heritage-media">
            <Image
              src="/images/rasam-chronicles.jpg"
              alt="Steaming Traditional South Indian Rasam in Heritage Brass Bowl"
              fill
              sizes="(max-width: 1024px) 100vw, 340px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="rasam-heritage-body">
            <div className="rasam-heritage-pill">
              🍵 The Ancient Earthenware Secret
            </div>
            <h3 className="rasam-heritage-title">
              Simmered in Authentic Eeya Chombu &amp; Country Clay Pots
            </h3>
            <p className="rasam-heritage-desc">
              Every elixir is brewed fresh with sun-ripened native tomatoes, Tellicherry black peppercorns, crushed shallots, 
              and organic moringa or balloon vine leaves. The traditional tin and earthenware vessels infuse velvety mineral depth 
              that cannot be replicated in modern cookware.
            </p>
            <div className="rasam-heritage-badges">
              <span className="rasam-heritage-badge-item">🌿 100% Native Tamil Botanicals</span>
              <span className="rasam-heritage-badge-item">🔥 Ignites Digestive Agni</span>
              <span className="rasam-heritage-badge-item">🥣 Zero Artificial Flavors</span>
              <span className="rasam-heritage-badge-item">🍃 Served Piping Warm</span>
            </div>
          </div>
        </div>

        {/* 8 Rasams Full-Width Grid */}
        <div className="rasam-grid-8">
          {rasams.map((r, index) => (
            <div key={r.id} className="rasam-card-v2">
              <div className="rasam-card-media-wrap">
                <Image
                  src={r.image}
                  alt={r.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
                />
                <span className="rasam-elixir-tag">
                  Elixir #{String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <span
                  className="cart-veg-indicator"
                  title="Pure Vegetarian Herbal Elixir"
                >
                  <span className="cart-veg-dot" />
                </span>
                <span style={{ fontSize: 11, color: "#9b4e39", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {r.tags?.[0] || "Digestive"}
                </span>
              </div>

              <h3 className="rasam-name">
                <Link href={`/menu/${r.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                  {r.name}
                </Link>
              </h3>

              <p className="rasam-desc">{r.description}</p>

              {r.healthBenefits && (
                <div className="rasam-benefit">
                  🌿 <strong>Benefit:</strong> {r.healthBenefits}
                </div>
              )}

              <div className="rasam-footer">
                <span className="card-price" style={{ fontSize: 18, fontWeight: 700 }}>
                  {formatINR(r.pricePaise)}
                </span>
                <button
                  type="button"
                  className="add-cart-btn"
                  onClick={() => handleAdd(r)}
                  aria-label={`Add ${r.name} to feast`}
                >
                  <span>+</span> Add to Feast
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
