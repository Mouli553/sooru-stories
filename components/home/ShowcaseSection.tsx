"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { dishCollections, formatINR } from "@/lib/menu";

export default function ShowcaseSection() {
  return (
    <section className="section" id="menu-showcase">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">Handcrafted Menu</div>
          <h2>Regional Favourites, Honest Flavours</h2>
          <p className="muted">
            Cooked fresh each day with native cold-pressed sesame oil, homemade country ghee,
            and slow-ground masalas. Tap any dish collection to explore its traditional varieties.
          </p>
        </div>

        {/* Minimal Main Dish Cards — One Per Category */}
        <div className="minimal-collection-grid">
          {dishCollections.map((col) => (
            <Link
              key={col.slug}
              href={`/menu?category=${encodeURIComponent(col.category)}&utm_source=sooru_stories&utm_medium=home_dish_card&utm_campaign=home&utm_content=${col.slug.replace(/-/g, "_")}`}
              className="minimal-collection-card"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="minimal-collection-media">
                <Image
                  src={col.image}
                  alt={col.title}
                  width={480}
                  height={270}
                  className="minimal-collection-img"
                />
                <div className="minimal-collection-badge">
                  {col.heritageTag}
                </div>
                <div className="minimal-collection-count">
                  {col.itemCount} Varieties
                </div>
              </div>

              <div className="minimal-collection-body">
                <div className="minimal-collection-category">
                  {col.subtitle}
                </div>
                <h3 className="minimal-collection-title">
                  {col.title}
                </h3>
                <p className="minimal-collection-desc">
                  {col.description}
                </p>

                <div className="minimal-collection-samples">
                  <span className="sample-label">Varieties include:</span>
                  <div className="sample-chips">
                    {col.sampleHighlights.map((dish) => (
                      <span key={dish} className="sample-chip">
                        {dish}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="minimal-collection-footer">
                  <div>
                    <span className="price-from-label">Homestyle Price</span>
                    <div className="minimal-collection-price">
                      From {formatINR(col.startingPricePaise)}
                    </div>
                  </div>
                  <span className="btn btn-primary minimal-enter-btn">
                    Explore Varieties →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA to Full Menu */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link
            href="/menu?utm_source=sooru_stories&utm_medium=home_cta&utm_campaign=home&utm_content=view_full_menu"
            className="btn btn-primary"
            style={{ padding: "14px 36px", fontSize: 15 }}
          >
            View Full Menu &amp; All 64 Dishes ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
