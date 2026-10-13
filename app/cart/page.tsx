"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/menu";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotalPaise,
    openOrderModal
  } = useCart();

  const freeDeliveryRemaining = Math.max(0, 50000 - subtotalPaise);
  const deliveryFee = freeDeliveryRemaining === 0 || items.length === 0 ? 0 : 4000;
  const grandTotal = subtotalPaise + deliveryFee;

  return (
    <div style={{ paddingTop: 110, minHeight: "80vh" }}>
      <div className="container" style={{ padding: "40px 24px 80px", maxWidth: 900 }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: "var(--cream-muted)", marginBottom: 20 }}>
          <Link href="/" style={{ color: "var(--gold-light)" }}>← Home</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <Link href="/menu" style={{ color: "var(--gold-light)" }}>Menu</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--cream)" }}>Cart</span>
        </div>

        <div className="section-header" style={{ textAlign: "left", marginBottom: 30 }}>
          <div className="eyebrow">Your Selection</div>
          <h1>Shopping Cart</h1>
          <p className="muted">Review your freshly prepared dishes before finalizing checkout.</p>
        </div>

        {items.length === 0 ? (
          <div
            style={{
              background: "var(--forest-card)",
              border: "1px solid var(--forest-border)",
              borderRadius: "var(--radius-xl)",
              padding: "70px 24px",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: 58, marginBottom: 16 }}>🍲</div>
            <h2 style={{ fontSize: 24, marginBottom: 8 }}>Your Feast is Waiting</h2>
            <p className="muted" style={{ maxWidth: 360, margin: "0 auto 24px" }}>
              You haven&apos;t added any traditional rasams, dum biryanis, or starters to your cart yet.
            </p>
            <Link href="/menu" className="btn btn-primary">
              Explore Our Menu →
            </Link>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.3fr 0.9fr",
              gap: 32,
              alignItems: "start"
            }}
          >
            {/* Cart Items Table */}
            <div
              style={{
                background: "var(--forest-card)",
                border: "1px solid var(--forest-border)",
                borderRadius: "var(--radius-lg)",
                padding: "24px"
              }}
            >
              {freeDeliveryRemaining > 0 ? (
                <div
                  style={{
                    padding: "12px 16px",
                    background: "rgba(212, 175, 55, 0.1)",
                    borderRadius: "var(--radius-sm)",
                    marginBottom: 20,
                    fontSize: 13,
                    color: "var(--gold-shimmer)"
                  }}
                >
                  Add <strong>{formatINR(freeDeliveryRemaining)}</strong> more for <strong>FREE Doorstep Delivery</strong>!
                </div>
              ) : (
                <div
                  style={{
                    padding: "12px 16px",
                    background: "rgba(46, 139, 87, 0.15)",
                    borderRadius: "var(--radius-sm)",
                    marginBottom: 20,
                    fontSize: 13,
                    color: "#A2E2B8",
                    fontWeight: 600
                  }}
                >
                  🎉 You qualify for FREE Doorstep Delivery!
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="cart-item-row">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={60}
                      height={60}
                      className="cart-thumb"
                    />
                    <div>
                      <div className="cart-item-title">{product.name}</div>
                      <div style={{ fontSize: 12, color: "var(--cream-muted)" }}>
                        {formatINR(product.pricePaise)} each
                      </div>
                      <div className="cart-item-price">
                        {formatINR(product.pricePaise * quantity)}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                      <div className="stepper">
                        <button
                          type="button"
                          className="stepper-btn"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                        >
                          –
                        </button>
                        <span>{quantity}</span>
                        <button
                          type="button"
                          className="stepper-btn"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        style={{ fontSize: 11, color: "var(--coral)", padding: "2px 4px" }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24, textAlign: "right" }}>
                <Link href="/menu" style={{ fontSize: 13, color: "var(--gold-light)" }}>
                  + Add more dishes from menu
                </Link>
              </div>
            </div>

            {/* Order Summary Card */}
            <div
              style={{
                background: "var(--forest-card)",
                border: "1px solid var(--forest-border)",
                borderRadius: "var(--radius-lg)",
                padding: "24px"
              }}
            >
              <h3 style={{ fontSize: 20, marginBottom: 18 }}>Order Summary</h3>

              <div className="summary-row">
                <span>Dishes Subtotal</span>
                <span>{formatINR(subtotalPaise)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Charge</span>
                <span>{deliveryFee === 0 ? "FREE" : formatINR(deliveryFee)}</span>
              </div>
              <div className="summary-row total">
                <span>Grand Total</span>
                <span>{formatINR(grandTotal)}</span>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "100%", marginTop: 10 }}
                onClick={openOrderModal}
              >
                Proceed to Checkout ({formatINR(grandTotal)}) →
              </button>

              <div style={{ marginTop: 20, fontSize: 12, color: "var(--cream-muted)", lineHeight: 1.6 }}>
                🛡️ Direct kitchen ordering via WhatsApp. Zero surge pricing. Delivery within 35–45 minutes.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}