"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart";
import { menuItems, categories, formatINR, MenuItem } from "@/lib/menu";
import { trackAddToCart, trackSelectItem } from "@/lib/analytics";

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const { addToCart } = useCart();
  const [selectedCat, setSelectedCat] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "non-veg">("all");

  const filtered = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = selectedCat === "All" || item.category === selectedCat;
      const matchesQuery =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      const matchesDiet =
        dietFilter === "all" ||
        (dietFilter === "veg" && item.vegetarian) ||
        (dietFilter === "non-veg" && !item.vegetarian);
      return matchesCategory && matchesQuery && matchesDiet;
    });
  }, [selectedCat, searchQuery, dietFilter]);

  const handleAdd = (item: MenuItem) => {
    addToCart(item);
    trackAddToCart(item);
  };

  return (
    <div style={{ paddingTop: 100, minHeight: "80vh" }}>
      <div className="container" style={{ padding: "40px 24px 80px" }}>
        <div className="section-header" style={{ marginBottom: 36 }}>
          <div className="eyebrow">The Complete Culinary Archive</div>
          <h1>Menu &amp; Homestyle Prices</h1>
          <p className="muted">
            All 22 dishes prepared to order with fresh stone-ground spices, cold-pressed oils, 
            and pure country ghee. Prices listed in INR with zero hidden packaging surcharges.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: 580, margin: "0 auto 30px" }}>
          <input
            type="search"
            placeholder="🔍 Search for rasam, biryani, starters, parotta..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control"
            style={{
              padding: "14px 20px",
              borderRadius: "var(--radius-full)",
              fontSize: 15,
              background: "rgba(4, 18, 11, 0.85)"
            }}
          />
        </div>

        {/* Category Belt */}
        <div className="category-belt">
          <button
            type="button"
            className={`cat-pill ${selectedCat === "All" ? "active" : ""}`}
            onClick={() => setSelectedCat("All")}
          >
            All Dishes ({menuItems.length})
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`cat-pill ${selectedCat === c ? "active" : ""}`}
              onClick={() => setSelectedCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Dietary Filters */}
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
            All
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
            🌿 Pure Veg
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
            🍗 Non-Veg
          </button>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>🔍</div>
            <h3>No dishes match &ldquo;{searchQuery}&rdquo;</h3>
            <p className="muted">Try searching for other authentic regional dishes or clear filters.</p>
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginTop: 16 }}
              onClick={() => {
                setSearchQuery("");
                setSelectedCat("All");
                setDietFilter("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map((item) => (
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
        )}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div style={{ padding: 120, textAlign: "center" }}>Loading menu...</div>}>
      <MenuContent />
    </Suspense>
  );
}