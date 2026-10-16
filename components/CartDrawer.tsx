"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatINR, menuItems, MenuItem } from "@/lib/menu";
import { trackBeginCheckout, trackAddToCart } from "@/lib/analytics";

const FREE_DELIVERY_THRESHOLD_PAISE = 50000; // ₹500

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotalPaise,
    totalItems,
    openOrderModal
  } = useCart();

  // Curated quick recommendations: popular items that aren't yet in the cart
  const upsellItems = useMemo(() => {
    const cartIds = new Set(items.map((i) => i.product.id));
    const recommendations = [
      menuItems.find((m) => m.id === "rasam-thakkali"),
      menuItems.find((m) => m.category === "Mocktails"),
      menuItems.find((m) => m.category === "Desserts"),
      menuItems.find((m) => m.bestseller && !cartIds.has(m.id)),
    ].filter((m): m is MenuItem => Boolean(m && !cartIds.has(m.id)));

    return recommendations.slice(0, 3);
  }, [items]);

  if (!isCartOpen) return null;

  const freeDeliveryRemaining = Math.max(0, FREE_DELIVERY_THRESHOLD_PAISE - subtotalPaise);
  const freeDeliveryPercent = Math.min(100, (subtotalPaise / FREE_DELIVERY_THRESHOLD_PAISE) * 100);
  const deliveryFee = freeDeliveryRemaining === 0 || items.length === 0 ? 0 : 4000;
  const grandTotal = subtotalPaise + deliveryFee;

  const handleCheckoutClick = () => {
    trackBeginCheckout(items, subtotalPaise);
    closeCart();
    openOrderModal();
  };

  const handleQuickAdd = (product: MenuItem) => {
    addToCart(product, 1);
    trackAddToCart(product, 1);
  };

  return (
    <div className="drawer-backdrop" onClick={closeCart}>
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Your Feast Cart"
      >
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title">
            <span style={{ fontSize: 22 }}>🧺</span>
            <h3>Your Feast Cart</h3>
            {totalItems > 0 && (
              <span className="drawer-count-badge">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            )}
          </div>
          <div className="drawer-actions-wrap">
            {items.length > 0 && (
              <button
                type="button"
                className="drawer-clear-btn"
                onClick={clearCart}
                title="Remove all dishes"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              className="drawer-close"
              onClick={closeCart}
              aria-label="Close cart drawer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Free Delivery Meter */}
        {items.length > 0 && (
          <div className="delivery-meter">
            <div className="meter-header">
              {freeDeliveryRemaining > 0 ? (
                <span>
                  Add <strong style={{ color: "#a34e36" }}>{formatINR(freeDeliveryRemaining)}</strong> more for <strong>FREE Doorstep Delivery</strong>
                </span>
              ) : (
                <span className="meter-unlocked">
                  <span>🎉</span> You unlocked <strong>FREE Doorstep Delivery!</strong>
                </span>
              )}
              <span style={{ fontSize: 11, color: "#8c7e71", fontWeight: 600 }}>
                {Math.round(freeDeliveryPercent)}%
              </span>
            </div>
            <div className="meter-bar">
              <div
                className="meter-fill"
                style={{ width: `${freeDeliveryPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items or Empty State */}
        {items.length === 0 ? (
          <div
            style={{
              padding: "54px 28px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              flexGrow: 1,
              justifyContent: "center"
            }}
          >
            <div style={{ fontSize: 56, marginBottom: 4 }}>🍲</div>
            <h4 style={{ fontSize: 22, color: "#30251e", fontFamily: "var(--font-display)", margin: 0 }}>
              Your banana leaf is empty
            </h4>
            <p className="muted" style={{ maxWidth: 300, fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
              Explore our simmering earthen rasams, slow-cooked Seeraga Samba biryanis, and homestyle village starters.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 8 }}>
              <Link
                href="/menu?category=Digest%20%26%20Eat"
                className="btn btn-secondary btn-sm"
                onClick={closeCart}
              >
                ✦ 8 Rasams
              </Link>
              <Link
                href="/menu?category=Biryani%20%26%20Rice"
                className="btn btn-secondary btn-sm"
                onClick={closeCart}
              >
                ✦ Dum Biryani
              </Link>
              <Link
                href="/menu?category=Signature%20Starters"
                className="btn btn-secondary btn-sm"
                onClick={closeCart}
              >
                ✦ Starters
              </Link>
            </div>

            <Link
              href="/menu"
              className="btn btn-primary"
              onClick={closeCart}
              style={{ marginTop: 16, width: "100%", maxWidth: 280 }}
            >
              Explore Full Menu →
            </Link>
          </div>
        ) : (
          <>
            {/* Scrollable list of items */}
            <div className="cart-items-scroll">
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
                      <Link href={`/menu/${product.slug}`} onClick={closeCart}>
                        {product.name}
                      </Link>
                    </div>

                    <div className="cart-item-unit-price">
                      {formatINR(product.pricePaise)} each
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
                      aria-label={`Remove ${product.name} from cart`}
                    >
                      ✕ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick-Add Pairings */}
            {upsellItems.length > 0 && (
              <div className="cart-upsell-section">
                <div className="cart-upsell-title">
                  <span>✦</span> Complete Your Meal
                </div>
                <div className="cart-upsell-list">
                  {upsellItems.map((rec) => (
                    <div key={rec.id} className="cart-upsell-card">
                      <Image
                        src={rec.image}
                        alt={rec.name}
                        width={36}
                        height={36}
                        className="cart-upsell-img"
                      />
                      <div className="cart-upsell-info">
                        <div className="cart-upsell-name" title={rec.name}>
                          {rec.name}
                        </div>
                        <div className="cart-upsell-price">
                          {formatINR(rec.pricePaise)}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="cart-upsell-add-btn"
                        onClick={() => handleQuickAdd(rec)}
                        title={`Add ${rec.name}`}
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer & Order Summary */}
            <div className="drawer-footer">
              <div
                style={{
                  padding: "8px 12px",
                  background: "#eadecf",
                  borderRadius: 6,
                  fontSize: 12,
                  color: "#544436",
                  marginBottom: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}
              >
                <span>🍃</span>
                <span>Freshly cut plantain leaf packaging included with every meal.</span>
              </div>

              <div className="summary-row">
                <span>Dishes Subtotal ({totalItems} items)</span>
                <span style={{ fontWeight: 600 }}>{formatINR(subtotalPaise)}</span>
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

              <div className="summary-row total">
                <span>Total Amount</span>
                <span>{formatINR(grandTotal)}</span>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "100%", fontSize: 15, padding: "14px 20px" }}
                onClick={handleCheckoutClick}
              >
                Proceed to Checkout ({formatINR(grandTotal)}) →
              </button>

              <div className="drawer-trust-strip">
                <span>🌿 100% Homestyle</span>
                <span>⏱️ 35–45 min Delivery</span>
                <span>🛡️ Safe &amp; Hygienic</span>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
