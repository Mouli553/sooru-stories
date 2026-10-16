"use client";

import React, { useState, useMemo, Suspense, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart";
import {
  menuItems,
  categories,
  dishCollections,
  formatINR,
  MenuItem,
  MenuCategory,
  DishCollection
} from "@/lib/menu";
import { trackAddToCart, trackSelectItem } from "@/lib/analytics";

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const { addToCart } = useCart();
  const [selectedCat, setSelectedCat] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "non-veg">("all");

  // Keep state synchronized if URL category parameter changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && cat !== selectedCat) {
      setSelectedCat(cat);
    }
  }, [searchParams]);

  // Handle entering a specific dish family
  const handleEnterCategory = (cat: MenuCategory, slug: string) => {
    setSelectedCat(cat);
    setSearchQuery("");

    // Create and update proper UTM in browser URL bar
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("category", cat);
      url.searchParams.set("utm_source", "sooru_stories");
      url.searchParams.set("utm_medium", "main_dish_card");
      url.searchParams.set("utm_campaign", "menu_homestyle");
      url.searchParams.set("utm_content", slug.replace(/-/g, "_"));
      window.history.replaceState(null, "", url.toString());
    } catch {
      // safe fallback
    }

    const targetEl = document.getElementById("menu-active-view");
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Back to minimal collections view
  const handleBackToCollections = () => {
    setSelectedCat("All");
    setSearchQuery("");

    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("category");
      url.searchParams.set("utm_source", "sooru_stories");
      url.searchParams.set("utm_medium", "nav_back");
      url.searchParams.set("utm_campaign", "menu_homestyle");
      url.searchParams.set("utm_content", "all_dish_collections");
      window.history.replaceState(null, "", url.toString());
    } catch {
      // safe fallback
    }

    const targetEl = document.getElementById("menu-header-top");
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Filtered varieties when inside a category or performing a search
  const filteredVarieties = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = selectedCat === "All" || item.category === selectedCat;
      const matchesQuery =
        !searchQuery ||
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

  // Active dish collection details
  const activeCollection = useMemo(() => {
    return dishCollections.find((c) => c.category === selectedCat);
  }, [selectedCat]);

  const handleAdd = (item: MenuItem) => {
    addToCart(item);
    trackAddToCart(item);
  };

  const isBrowsingAll = selectedCat === "All" && !searchQuery.trim();

  return (
    <div style={{ paddingTop: 100, minHeight: "85vh" }}>
      <div className="container" style={{ padding: "40px 24px 80px" }}>
        
        {/* Breadcrumb Navigation */}
        <div style={{ fontSize: 13, color: "var(--cream-muted)", marginBottom: 20 }}>
          <Link
            href="/?utm_source=sooru_stories&utm_medium=breadcrumb&utm_campaign=home&utm_content=menu_return"
            style={{ color: "var(--gold)" }}
          >
            ← Home
          </Link>
          <span style={{ margin: "0 8px" }}>/</span>
          {isBrowsingAll ? (
            <span style={{ color: "var(--cream)" }}>Menu &amp; Homestyle Prices</span>
          ) : (
            <>
              <button
                type="button"
                onClick={handleBackToCollections}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--gold)",
                  cursor: "pointer",
                  fontSize: 13,
                  padding: 0
                }}
              >
                Menu Collections
              </button>
              <span style={{ margin: "0 8px" }}>/</span>
              <span style={{ color: "var(--cream)", fontWeight: 600 }}>
                {searchQuery ? `Search: "${searchQuery}"` : activeCollection?.title || selectedCat}
              </span>
            </>
          )}
        </div>

        {/* Section Header */}
        <div className="section-header" id="menu-header-top" style={{ marginBottom: 36 }}>
          <div className="eyebrow">The Complete Culinary Archive</div>
          <h1>Menu &amp; Homestyle Prices</h1>
          <p className="muted" style={{ maxWidth: 720, margin: "0 auto" }}>
            {isBrowsingAll
              ? "Select any signature dish collection below to explore its traditional regional varieties, homestyle prices, stone-ground preparations, and medicinal benefits."
              : "Slow-cooked to order with cold-pressed gingelly oil, pure country ghee, and freshly ground spices. Honest homestyle pricing with zero hidden packing charges."}
          </p>
        </div>

        {/* Search Bar with Live UTM Term Sync */}
        <div style={{ maxWidth: 640, margin: "0 auto 32px" }}>
          <input
            type="search"
            placeholder="🔍 Search across all 64 dishes (e.g. biryani, milagu rasam, bun parotta)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value.trim().length > 2) {
                try {
                  const url = new URL(window.location.href);
                  url.searchParams.set("utm_source", "sooru_stories");
                  url.searchParams.set("utm_medium", "search");
                  url.searchParams.set("utm_campaign", "menu_homestyle");
                  url.searchParams.set("utm_term", e.target.value.trim());
                  window.history.replaceState(null, "", url.toString());
                } catch {
                  // safe fallback
                }
              }
            }}
            className="form-control"
            style={{
              padding: "14px 22px",
              borderRadius: "var(--radius-full)",
              fontSize: 15,
              background: "#faf8f3",
              border: "1px solid #ded3c5",
              boxShadow: "0 4px 18px rgba(48,37,30,0.06)"
            }}
          />
        </div>

        {/* =========================================================================
            STATE 1: MINIMAL MAIN DISH CARDS (DEFAULT VIEW)
            One main card for each signature dish family
           ========================================================================= */}
        {isBrowsingAll && (
          <div id="menu-collections">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
                borderBottom: "1px solid var(--forest-border)",
                paddingBottom: 14
              }}
            >
              <div>
                <h3 style={{ fontSize: 20, color: "var(--cream)" }}>
                  8 Signature Dish Collections
                </h3>
                <p className="muted" style={{ fontSize: 13, margin: 0 }}>
                  Tap any dish card below to enter and reveal its handcrafted varieties
                </p>
              </div>
              <div
                style={{
                  fontSize: 12.5,
                  color: "var(--gold)",
                  fontWeight: 600,
                  background: "var(--gold-glow)",
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  border: "1px solid rgba(163, 78, 54, 0.2)"
                }}
              >
                64 Regional Dishes Total
              </div>
            </div>

            <div className="minimal-collection-grid">
              {dishCollections.map((col) => (
                <article
                  key={col.slug}
                  className="minimal-collection-card"
                  onClick={() => handleEnterCategory(col.category, col.slug)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleEnterCategory(col.category, col.slug);
                    }
                  }}
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
                      {col.itemCount} Varieties Inside
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

                      <button
                        type="button"
                        className="btn btn-primary minimal-enter-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnterCategory(col.category, col.slug);
                        }}
                      >
                        Explore {col.itemCount} Varieties →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            STATE 2: DISH VARIETIES INSIDE (OR ACTIVE SEARCH)
            Shows the exact varieties of the selected dish collection
           ========================================================================= */}
        {(!isBrowsingAll) && (
          <div id="menu-active-view">
            {/* Top Toolbar / Category Belt */}
            <div className="variety-view-header">
              <div className="variety-view-meta">
                <button
                  type="button"
                  className="btn btn-sm btn-secondary back-collections-btn"
                  onClick={handleBackToCollections}
                >
                  ← Back to All Dish Collections
                </button>
                <div style={{ marginTop: 12 }}>
                  <div className="eyebrow" style={{ marginBottom: 4 }}>
                    {searchQuery ? "Search Results" : activeCollection?.subtitle || "Culinary Varieties"}
                  </div>
                  <h2 style={{ fontSize: 26, margin: 0, color: "var(--cream)" }}>
                    {searchQuery
                      ? `Dishes matching "${searchQuery}"`
                      : activeCollection?.title || selectedCat}
                  </h2>
                </div>
              </div>

              {/* Dietary Filter Buttons */}
              <div className="variety-diet-filters">
                <button
                  type="button"
                  className={`diet-filter-btn ${dietFilter === "all" ? "active" : ""}`}
                  onClick={() => setDietFilter("all")}
                >
                  All ({filteredVarieties.length})
                </button>
                <button
                  type="button"
                  className={`diet-filter-btn veg ${dietFilter === "veg" ? "active" : ""}`}
                  onClick={() => setDietFilter("veg")}
                >
                  🌿 Pure Veg
                </button>
                <button
                  type="button"
                  className={`diet-filter-btn nonveg ${dietFilter === "non-veg" ? "active" : ""}`}
                  onClick={() => setDietFilter("non-veg")}
                >
                  🍗 Non-Veg
                </button>
              </div>
            </div>

            {/* Quick Switcher Between Categories */}
            <div className="category-belt" style={{ marginBottom: 30 }}>
              <button
                type="button"
                className={`cat-pill ${selectedCat === "All" ? "active" : ""}`}
                onClick={handleBackToCollections}
              >
                ← All Collections
              </button>
              {categories.map((c) => {
                const col = dishCollections.find((dc) => dc.category === c);
                return (
                  <button
                    key={c}
                    type="button"
                    className={`cat-pill ${selectedCat === c ? "active" : ""}`}
                    onClick={() => handleEnterCategory(c, col?.slug || "dish")}
                  >
                    {c} (8)
                  </button>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredVarieties.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ fontSize: 48, marginBottom: 14 }}>🔍</div>
                <h3>No dishes found matching your criteria</h3>
                <p className="muted" style={{ maxWidth: 450, margin: "0 auto 20px" }}>
                  Try switching your dietary filter or clear your search to explore all varieties.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setSearchQuery("");
                    setDietFilter("all");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="product-grid" id="menu-varieties">
                {filteredVarieties.map((item) => (
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
                      {item.spiceLevel && (
                        <span
                          style={{
                            position: "absolute",
                            bottom: 10,
                            right: 10,
                            background: "rgba(4, 18, 11, 0.75)",
                            borderRadius: 12,
                            padding: "3px 8px",
                            fontSize: 11,
                            color: "#fff"
                          }}
                        >
                          {"🌶️".repeat(item.spiceLevel)}
                        </span>
                      )}
                    </div>

                    <div className="product-card-body">
                      <div className="product-category-tag">{item.category}</div>
                      <h3 className="product-card-title">
                        <Link
                          href={`/menu/${item.slug}?utm_source=sooru_stories&utm_medium=variety_dish_card&utm_campaign=menu_homestyle&utm_content=${item.slug.replace(/-/g, "_")}`}
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
                            href={`/menu/${item.slug}?utm_source=sooru_stories&utm_medium=variety_dish_card&utm_campaign=menu_homestyle&utm_content=${item.slug.replace(/-/g, "_")}`}
                            className="btn btn-secondary btn-sm"
                            style={{ padding: "8px 12px", fontSize: 12 }}
                          >
                            Story →
                          </Link>
                          <button
                            type="button"
                            className="add-cart-btn"
                            onClick={() => handleAdd(item)}
                            aria-label={`Add ${item.name} to feast order`}
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
        )}

      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "140px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🥘</div>
          <h3>Loading Sooru &amp; Stories Menu...</h3>
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}