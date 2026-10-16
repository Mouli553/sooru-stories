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
import { trackAddToCart, trackSelectItem, trackLead } from "@/lib/analytics";

const RESTAURANT_WHATSAPP = "919384638754";

function MenuContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const { addToCart, openCart } = useCart();
  const [selectedCat, setSelectedCat] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [tagFilter, setTagFilter] = useState<"all" | "bestseller" | "under-150">("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "spice">("featured");

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
    setTagFilter("all");

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

  // Filtered and sorted varieties
  const filteredVarieties = useMemo(() => {
    let list = menuItems.filter((item) => {
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
      const matchesTag =
        tagFilter === "all" ||
        (tagFilter === "bestseller" && item.bestseller) ||
        (tagFilter === "under-150" && item.pricePaise <= 15000);

      return matchesCategory && matchesQuery && matchesDiet && matchesTag;
    });

    // Sorting
    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => a.pricePaise - b.pricePaise);
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => b.pricePaise - a.pricePaise);
    } else if (sortBy === "spice") {
      list = [...list].sort((a, b) => (b.spiceLevel || 0) - (a.spiceLevel || 0));
    }

    return list;
  }, [selectedCat, searchQuery, dietFilter, tagFilter, sortBy]);

  // Active dish collection details
  const activeCollection = useMemo(() => {
    return dishCollections.find((c) => c.category === selectedCat);
  }, [selectedCat]);

  const handleAdd = (item: MenuItem) => {
    addToCart(item);
    trackAddToCart(item);
  };

  const handleWhatsAppOrderDish = (item: MenuItem) => {
    trackLead("whatsapp_menu_dish", { dishId: item.id });
    const text = encodeURIComponent(
      `Vanakkam Sooru & Stories! 🙏\nI would like to order: 1x ${item.name} (${formatINR(item.pricePaise)}).\nPlease let me know preparation & delivery time.`
    );
    window.open(`https://wa.me/${RESTAURANT_WHATSAPP}?text=${text}`, "_blank");
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
              <span style={{ color: "var(--cream)" }}>
                {searchQuery ? `Search: "${searchQuery}"` : activeCollection?.title || selectedCat}
              </span>
            </>
          )}
        </div>

        {/* Page Header */}
        <div className="section-header" id="menu-header-top" style={{ textAlign: "center", marginBottom: 36 }}>
          <div className="eyebrow">
            {isBrowsingAll ? "South Indian Culinary Heritage" : "Varieties Inside"}
          </div>
          <h1 style={{ fontSize: "clamp(34px, 5vw, 48px)", margin: "8px 0" }}>
            {isBrowsingAll ? "Our Menu & Homestyle Prices" : activeCollection?.title || "Signature Varieties"}
          </h1>
          <p className="muted" style={{ maxWidth: 640, margin: "0 auto", fontSize: 15.5 }}>
            {isBrowsingAll
              ? "Select any signature dish family below to explore its traditional simmering varieties, heritage preparations, and honest pricing."
              : activeCollection?.description || "Simmered fresh to order in traditional clay pots."}
          </p>

          {/* Quick Search Bar */}
          <div style={{ maxWidth: 460, margin: "24px auto 0", position: "relative" }}>
            <input
              type="text"
              placeholder="Search dishes (e.g. Kozhi, Rasam, Biryani, Kola Urundai)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{
                width: "100%",
                padding: "12px 18px",
                borderRadius: "var(--radius-full)",
                border: "1px solid rgba(212, 175, 55, 0.3)",
                background: "rgba(4, 18, 11, 0.7)",
                color: "var(--cream)",
                fontSize: 14
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--cream-muted)",
                  cursor: "pointer",
                  fontSize: 16
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            STATE 1: MINIMAL DISH COLLECTIONS (1 Main Card per Dish Family)
            Shown when user is on "All" view and not currently searching
           ========================================================================= */}
        {isBrowsingAll && (
          <div id="menu-collections-overview">
            <div className="minimal-collections-grid">
              {dishCollections.map((col) => (
                <article
                  key={col.slug}
                  className="minimal-collection-card"
                  onClick={() => handleEnterCategory(col.category, col.slug)}
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
            Shows the exact varieties of the selected dish collection with rich e-commerce controls
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

              {/* Dietary Filter Buttons & E-Commerce Sort Dropdown */}
              <div className="variety-diet-filters" style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 6 }}>
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

                {/* E-Commerce Sorting Selector */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "featured" | "price-asc" | "price-desc" | "spice")}
                  className="menu-sort-select"
                  aria-label="Sort dishes"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="spice">Spiciness Level</option>
                </select>
              </div>
            </div>

            {/* Quick Tag Filter Chips (Bestsellers, Under ₹150) */}
            <div className="menu-sub-filters">
              <button
                type="button"
                className={`sub-filter-chip ${tagFilter === "all" ? "active" : ""}`}
                onClick={() => setTagFilter("all")}
              >
                All Varieties
              </button>
              <button
                type="button"
                className={`sub-filter-chip ${tagFilter === "bestseller" ? "active" : ""}`}
                onClick={() => setTagFilter("bestseller")}
              >
                🔥 Chef Bestsellers
              </button>
              <button
                type="button"
                className={`sub-filter-chip ${tagFilter === "under-150" ? "active" : ""}`}
                onClick={() => setTagFilter("under-150")}
              >
                🏷️ Under ₹150
              </button>
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
                    setTagFilter("all");
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
                      
                      {/* E-Commerce Spice Indicator */}
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

                      {/* E-Commerce Servings Badge */}
                      <span
                        style={{
                          position: "absolute",
                          bottom: 10,
                          left: 10,
                          background: "rgba(4, 18, 11, 0.8)",
                          borderRadius: 6,
                          padding: "2px 7px",
                          fontSize: 10.5,
                          color: "var(--cream)",
                          border: "1px solid rgba(255, 255, 255, 0.15)"
                        }}
                      >
                        👥 Serves 1–2
                      </span>
                    </div>

                    <div className="product-card-body">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span className="product-category-tag">{item.category}</span>
                        <span style={{ fontSize: 11.5, color: "var(--gold)", fontWeight: 600 }}>⭐ 4.9 (120+)</span>
                      </div>

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
                        <div>
                          <span className="card-price">{formatINR(item.pricePaise)}</span>
                          <div style={{ fontSize: 10.5, color: "var(--cream-muted)" }}>⏱️ 20–25m prep</div>
                        </div>

                        {/* Dual Action: WhatsApp 1-Click Order + Add to Cart */}
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <button
                            type="button"
                            className="card-wa-btn"
                            onClick={() => handleWhatsAppOrderDish(item)}
                            title="Order this dish on WhatsApp"
                            aria-label={`Order ${item.name} on WhatsApp`}
                          >
                            💬
                          </button>

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