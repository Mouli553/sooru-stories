"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { menuItems, categories, formatINR, MenuItem } from "@/lib/menu";
import { trackAddToCart, trackSelectItem } from "@/lib/analytics";

export default function ShowcaseSection() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "non-veg">("all");

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesDiet =
      dietFilter === "all" ||
      (dietFilter === "veg" && item.vegetarian) ||
      (dietFilter === "non-veg" && !item.vegetarian);
    return matchesCategory && matchesDiet;
  });

  const handleAdd = (item: MenuItem) => {
    addToCart(item);
    trackAddToCart(item);
  };

  return (
    <section className="section" id="menu-showcase">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">Handcrafted Menu</div>
          <h2>Regional Favourites, Honest Flavours</h2>
          <p className="muted">
            Cooked fresh each day with native cold-pressed sesame oil, homemade country ghee, 
            and slow-ground masalas. Every dish carries the warmth of home.
          </p>
        </div>

        {/* Category Belt */}
        <div className="category-belt">
          <button
            type="button"
            className={`cat-pill ${selectedCategory === "All" ? "active" : ""}`}
            onClick={() => setSelectedCategory("All")}
          >
            All Specialties ({menuItems.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cat-pill ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dietary Toggle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 36
          }}
        >
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            style={{
              borderColor: dietFilter === "all" ? "var(--gold)" : "transparent",
              color: dietFilter === "all" ? "var(--gold-light)" : "var(--cream-muted)"
            }}
            onClick={() => setDietFilter("all")}
          >
            Show All
          </button>
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            style={{
              borderColor: dietFilter === "veg" ? "var(--veg-green)" : "transparent",
              color: dietFilter === "veg" ? "var(--veg-green)" : "var(--cream-muted)"
            }}
            onClick={() => setDietFilter("veg")}
          >
            🌿 Pure Vegetarian Only
          </button>
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            style={{
              borderColor: dietFilter === "non-veg" ? "var(--coral)" : "transparent",
              color: dietFilter === "non-veg" ? "var(--coral)" : "var(--cream-muted)"
            }}
            onClick={() => setDietFilter("non-veg")}
          >
            🍗 Non-Vegetarian Only
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="product-grid">
          {filteredItems.map((item) => (
            <article key={item.id} className="product-card">
              <div className="product-card-media">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={360}
                  height={200}
                  className="product-card-img"
                />
                <span
                  className={`diet-badge ${item.vegetarian ? "diet-veg" : "diet-nonveg"}`}
                >
                  {item.vegetarian ? "🌿 Veg" : "🍗 Non-Veg"}
                </span>
                {item.bestseller && (
                  <span className="bestseller-badge">⭐ Bestseller</span>
                )}
              </div>

              <div className="product-card-body">
                <div className="product-category-tag">{item.category}</div>
                <h3 className="product-card-title">
                  <Link
                    href={`/menu/${item.slug}`}
                    onClick={() => trackSelectItem(item)}
                  >
                    {item.name}
                  </Link>
                </h3>
                <p className="product-card-desc">{item.description}</p>

                {item.healthBenefits && (
                  <div className="benefit-pill">
                    🌿 {item.healthBenefits}
                  </div>
                )}

                <div className="product-card-footer">
                  <span className="card-price">{formatINR(item.pricePaise)}</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Link
                      href={`/menu/${item.slug}`}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: "8px 12px", fontSize: 12 }}
                    >
                      Story →
                    </Link>
                    <button
                      type="button"
                      className="add-cart-btn"
                      onClick={() => handleAdd(item)}
                    >
                      <span>+</span> Cart
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
