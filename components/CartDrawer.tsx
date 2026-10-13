"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/menu";
import { trackBeginCheckout } from "@/lib/analytics";

const FREE_DELIVERY_THRESHOLD_PAISE = 50000; // ₹500

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotalPaise,
    openOrderModal
  } = useCart();

  if (!isCartOpen) return null;

  const freeDeliveryRemaining = Math.max(0, FREE_DELIVERY_THRESHOLD_PAISE - subtotalPaise);
  const freeDeliveryPercent = Math.min(100, (subtotalPaise / FREE_DELIVERY_THRESHOLD_PAISE) * 100);

  const handleCheckoutClick = () => {
    trackBeginCheckout(items, subtotalPaise);
    closeCart();
    openOrderModal();
  };

  return (
    <div className="drawer-backdrop" onClick={closeCart}>
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        aria-label="Your Order Cart"
      >
        <div className="drawer-header">
          <div className="drawer-title">
            <span>🧺</span>
            <h3>Your Order Cart</h3>
          </div>
          <button
            type="button"
            className="drawer-close"
            onClick={closeCart}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {items.length > 0 && (
          <div className="delivery-meter">
            {freeDeliveryRemaining > 0 ? (
              <div>
                Add <strong>{formatINR(freeDeliveryRemaining)}</strong> more for <strong>FREE Doorstep Delivery</strong>!
              </div>
            ) : (
              <div style={{ color: "var(--gold-light)", fontWeight: 700 }}>
                🎉 You unlocked FREE Doorstep Delivery!
              </div>
            )}
            <div className="meter-bar">
              <div
                className="meter-fill"
                style={{ width: `${freeDeliveryPercent}%` }}
              />
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div
            style={{
              padding: "60px 24px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16
            }}
          >
            <div style={{ fontSize: 54 }}>🍲</div>
            <h4 style={{ fontSize: 20, color: "var(--cream)" }}>Your cart is empty</h4>
            <p className="muted" style={{ maxWidth: 280 }}>
              Explore our traditional rasams, dum biryanis, and homestyle specials to begin.
            </p>
            <Link
              href="/menu"
              className="btn btn-primary"
              onClick={closeCart}
              style={{ marginTop: 12 }}
            >
              Explore Full Menu →
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items-scroll">
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
                      onClick={() => removeFromCart(product.id)}
                      style={{ fontSize: 11, color: "var(--coral)", padding: "2px 4px" }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="drawer-footer">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatINR(subtotalPaise)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Charge</span>
                <span>{freeDeliveryRemaining === 0 ? "FREE" : "₹40"}</span>
              </div>
              <div className="summary-row total">
                <span>Total Amount</span>
                <span>
                  {formatINR(subtotalPaise + (freeDeliveryRemaining === 0 ? 0 : 4000))}
                </span>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={handleCheckoutClick}
              >
                Proceed to Checkout →
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
