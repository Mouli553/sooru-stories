"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatINR, menuItems, MenuItem } from "@/lib/menu";
import { trackBeginCheckout, trackAddToCart } from "@/lib/analytics";

const FREE_DELIVERY_THRESHOLD_PAISE = 50000; // ₹500

export default function CartPage() {
  const {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotalPaise,
    totalItems,
    openOrderModal
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");

  const freeDeliveryRemaining = Math.max(0, FREE_DELIVERY_THRESHOLD_PAISE - subtotalPaise);
  const freeDeliveryPercent = Math.min(100, (subtotalPaise / FREE_DELIVERY_THRESHOLD_PAISE) * 100);
  const deliveryFee = freeDeliveryRemaining === 0 || items.length === 0 ? 0 : 4000;

  // Coupon discount calculation
  let discountPaise = 0;
  if (appliedCoupon === "FEAST50") {
    discountPaise = 5000; // ₹50 off
  } else if (appliedCoupon === "SOORU10") {
    discountPaise = Math.round(subtotalPaise * 0.1); // 10% off
  }

  const grandTotal = Math.max(0, subtotalPaise + deliveryFee - discountPaise);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "FEAST50" || code === "SOORU10") {
      setAppliedCoupon(code);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try 'FEAST50' or 'SOORU10'");
    }
  };

  const handleCheckout = () => {
    trackBeginCheckout(items, grandTotal);
    openOrderModal();
  };

  // Complementary recommendations for dishes not in cart
  const cartIds = new Set(items.map((i) => i.product.id));
  const suggestedItems = menuItems
    .filter((m) => !cartIds.has(m.id) && (m.bestseller || m.category === "Digest & Eat" || m.category === "Mocktails"))
    .slice(0, 4);

  return (
    <div style={{ paddingTop: 110, minHeight: "85vh", background: "#f8f4ee" }}>
      <div className="container" style={{ padding: "36px 24px 80px", maxWidth: 1120 }}>
        {/* Breadcrumb Navigation */}
        <div style={{ fontSize: 13, color: "#786d62", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/" style={{ color: "#a34e36", textDecoration: "none" }}>← Home</Link>
          <span>/</span>
          <Link href="/menu" style={{ color: "#a34e36", textDecoration: "none" }}>Menu</Link>
          <span>/</span>
          <span style={{ color: "#30251e", fontWeight: 600 }}>Order Cart</span>
        </div>

        {/* Section Header */}
        <div className="section-header" style={{ textAlign: "left", marginBottom: 32 }}>
          <div className="eyebrow">Your Fresh Selection</div>
          <h1 style={{ fontSize: "clamp(32px, 4vw, 44px)", margin: "8px 0" }}>Your Dining Cart</h1>
          <p className="muted" style={{ margin: 0, maxWidth: 560 }}>
            Every feast dish is simmered fresh with cold-pressed gingelly oil, fragrant Seeraga Samba rice, and traditional clay-pot techniques.
          </p>
        </div>

        {items.length === 0 ? (
          <div
            style={{
              background: "#faf8f3",
              border: "1px solid #e3d8ca",
              borderRadius: "12px",
              padding: "70px 24px",
              textAlign: "center",
              boxShadow: "0 6px 20px rgba(48, 37, 30, 0.04)"
            }}
          >
            <div style={{ fontSize: 64, marginBottom: 16 }}>🍲</div>
            <h2 style={{ fontSize: 26, color: "#30251e", fontFamily: "var(--font-display)", marginBottom: 10 }}>
              Your Feast Cart is Empty
            </h2>
            <p className="muted" style={{ maxWidth: 420, margin: "0 auto 28px", lineHeight: 1.6 }}>
              You haven&apos;t added any traditional rasams, dum biryanis, or starters to your cart yet. Take a tour of our heritage menu.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 28 }}>
              <Link href="/menu?category=Digest%20%26%20Eat" className="btn btn-secondary">
                ✦ 8 Healing Rasams
              </Link>
              <Link href="/menu?category=Biryani%20%26%20Rice" className="btn btn-secondary">
                ✦ Seeraga Samba Biryani
              </Link>
              <Link href="/menu?category=Signature%20Starters" className="btn btn-secondary">
                ✦ Signature Starters
              </Link>
            </div>

            <Link href="/menu" className="btn btn-primary" style={{ padding: "14px 32px", fontSize: 15 }}>
              Explore Full Menu Catalog →
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.35fr 0.85fr",
              gap: 32,
              alignItems: "start"
            }}
          >
            {/* Left Column: Cart Items & Pairings */}
            <div>
              {/* Delivery Progress Banner */}
              <div
                style={{
                  background: "#fffdfa",
                  border: "1px solid #e3d8ca",
                  borderRadius: "10px",
                  padding: "16px 20px",
                  marginBottom: 20,
                  boxShadow: "0 2px 10px rgba(48, 37, 30, 0.03)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, fontSize: 13.5 }}>
                  {freeDeliveryRemaining > 0 ? (
                    <div>
                      <span>🛵 Add </span>
                      <strong style={{ color: "#a34e36" }}>{formatINR(freeDeliveryRemaining)}</strong>
                      <span> more for </span>
                      <strong>FREE Doorstep Delivery!</strong>
                    </div>
                  ) : (
                    <div style={{ color: "#2e7d32", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                      <span>🎉</span> You qualify for FREE Doorstep Delivery!
                    </div>
                  )}
                  <span style={{ fontSize: 12, color: "#786d62", fontWeight: 600 }}>
                    {Math.round(freeDeliveryPercent)}%
                  </span>
                </div>
                <div className="meter-bar" style={{ height: 7, background: "#e5dbcf" }}>
                  <div className="meter-fill" style={{ width: `${freeDeliveryPercent}%` }} />
                </div>
              </div>

              {/* Items Card */}
              <div
                style={{
                  background: "#fffdfa",
                  border: "1px solid #e3d8ca",
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0 4px 16px rgba(48, 37, 30, 0.04)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "1px solid #eadecf", marginBottom: 18 }}>
                  <h3 style={{ margin: 0, fontSize: 18, color: "#30251e" }}>
                    Selected Dishes ({totalItems})
                  </h3>
                  <button
                    type="button"
                    onClick={clearCart}
                    style={{ background: "transparent", border: 0, color: "#a34e36", fontSize: 12.5, cursor: "pointer", textDecoration: "underline" }}
                  >
                    Clear Cart
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="cart-item-card">
                      <div className="cart-thumb-wrap">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="cart-thumb"
                        />
                      </div>

                      <div>
                        <div className="cart-item-title">
                          <span
                            className={`cart-veg-indicator ${product.vegetarian ? "" : "non-veg"}`}
                            title={product.vegetarian ? "Pure Vegetarian" : "Non-Vegetarian"}
                          >
                            <span className="cart-veg-dot" />
                          </span>
                          <Link href={`/menu/${product.slug}`}>
                            {product.name}
                          </Link>
                        </div>

                        <div className="cart-item-unit-price">
                          {formatINR(product.pricePaise)} each · <span style={{ color: "#a34e36" }}>{product.category}</span>
                        </div>

                        <div className="cart-item-total-price">
                          {formatINR(product.pricePaise * quantity)}
                        </div>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                        <div className="stepper">
                          <button
                            type="button"
                            className="stepper-btn"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            –
                          </button>
                          <span>{quantity}</span>
                          <button
                            type="button"
                            className="stepper-btn"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className="cart-remove-btn"
                          onClick={() => removeFromCart(product.id)}
                        >
                          ✕ Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 22, paddingTop: 16, borderTop: "1px dashed #e3d8ca", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Link href="/menu" style={{ fontSize: 13.5, color: "#a34e36", fontWeight: 600, textDecoration: "none" }}>
                    + Add more dishes from menu
                  </Link>
                  <span style={{ fontSize: 12.5, color: "#786d62" }}>
                    🍃 Includes authentic plantain leaf dining set
                  </span>
                </div>
              </div>

              {/* Complete Your Feast - Suggested Add-ons */}
              {suggestedItems.length > 0 && (
                <div style={{ marginTop: 32 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <span style={{ color: "#a34e36" }}>✦</span>
                    <h3 style={{ fontSize: 18, color: "#30251e", margin: 0 }}>
                      Complete Your Feast (Chef Recommendations)
                    </h3>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
                    {suggestedItems.map((sug) => (
                      <div
                        key={sug.id}
                        style={{
                          background: "#fffdfa",
                          border: "1px solid #e3d8ca",
                          borderRadius: "8px",
                          padding: "12px",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          boxShadow: "0 2px 8px rgba(48, 37, 30, 0.03)"
                        }}
                      >
                        <Image
                          src={sug.image}
                          alt={sug.name}
                          width={48}
                          height={48}
                          style={{ borderRadius: 6, objectFit: "cover", flexShrink: 0 }}
                        />
                        <div style={{ flexGrow: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#30251e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {sug.name}
                          </div>
                          <div style={{ fontSize: 12.5, color: "#853d2b", fontWeight: 700 }}>
                            {formatINR(sug.pricePaise)}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          style={{ padding: "5px 9px", fontSize: 11, flexShrink: 0 }}
                          onClick={() => {
                            addToCart(sug, 1);
                            trackAddToCart(sug, 1);
                          }}
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Order Summary & Checkout */}
            <div
              style={{
                background: "#fffdfa",
                border: "1px solid #e3d8ca",
                borderRadius: "12px",
                padding: "24px",
                position: "sticky",
                top: 120,
                boxShadow: "0 6px 24px rgba(48, 37, 30, 0.05)"
              }}
            >
              <h3 style={{ fontSize: 20, color: "#30251e", marginTop: 0, marginBottom: 18, borderBottom: "1px solid #eadecf", paddingBottom: 12 }}>
                Order Summary
              </h3>

              {/* Promo Coupon Form */}
              <form onSubmit={handleApplyCoupon} style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#786d62", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>
                  Promo / Coupon Code
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    placeholder="e.g. FEAST50"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="form-control"
                    style={{ fontSize: 13, padding: "8px 12px", textTransform: "uppercase" }}
                  />
                  <button type="submit" className="btn btn-secondary btn-sm" style={{ padding: "8px 14px", flexShrink: 0 }}>
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <div style={{ fontSize: 12, color: "#2e7d32", marginTop: 6, fontWeight: 600 }}>
                    ✓ Coupon &quot;{appliedCoupon}&quot; applied successfully!
                  </div>
                )}
                {couponError && (
                  <div style={{ fontSize: 12, color: "#a34e36", marginTop: 6 }}>
                    {couponError}
                  </div>
                )}
              </form>

              {/* Cost Rows */}
              <div className="summary-row">
                <span>Dishes Subtotal</span>
                <span>{formatINR(subtotalPaise)}</span>
              </div>

              <div className="summary-row">
                <span>Delivery Charge</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span style={{ color: "#2e7d32", fontWeight: 700 }}>
                      <span style={{ textDecoration: "line-through", color: "#8c7e71", marginRight: 5 }}>₹40</span>
                      FREE
                    </span>
                  ) : (
                    "₹40"
                  )}
                </span>
              </div>

              {discountPaise > 0 && (
                <div className="summary-row" style={{ color: "#2e7d32" }}>
                  <span>Coupon Discount ({appliedCoupon})</span>
                  <span>–{formatINR(discountPaise)}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Restaurant Packaging</span>
                <span style={{ color: "#2e7d32", fontWeight: 600 }}>FREE</span>
              </div>

              <div className="summary-row total" style={{ marginTop: 12, paddingTop: 14 }}>
                <span>Grand Total</span>
                <span>{formatINR(grandTotal)}</span>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "100%", fontSize: 15, padding: "14px 20px", marginTop: 8 }}
                onClick={handleCheckout}
              >
                Proceed to Checkout ({formatINR(grandTotal)}) →
              </button>

              <div style={{ marginTop: 22, padding: "14px", background: "#f8f4ee", borderRadius: 8, fontSize: 12.5, color: "#685b50", lineHeight: 1.6 }}>
                <div>🛡️ <strong>Zero Surprise Pricing:</strong> What you see is what you pay. Free cutlery &amp; banana leaf liner included.</div>
                <div style={{ marginTop: 6 }}>⏱️ <strong>Kitchen Dispatch:</strong> Prepared fresh upon order confirmation. Delivery in 35–45 mins.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}