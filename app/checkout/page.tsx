"use client";

import React, { useEffect } from "react";
import { useCart } from "@/lib/cart";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, openOrderModal } = useCart();

  useEffect(() => {
    if (items.length > 0) {
      openOrderModal();
    }
  }, [items, openOrderModal]);

  return (
    <div style={{ paddingTop: 120, minHeight: "75vh", padding: "120px 24px 80px" }}>
      <div className="container" style={{ maxWidth: 640 }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: "var(--cream-muted)", marginBottom: 28, textAlign: "left" }}>
          <Link href="/" style={{ color: "var(--gold-light)" }}>← Home</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <Link href="/cart" style={{ color: "var(--gold-light)" }}>Cart</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--cream)" }}>Checkout</span>
        </div>

        <div style={{ textAlign: "center", background: "var(--forest-card)", padding: "48px 32px", borderRadius: "var(--radius-xl)", border: "1px solid var(--forest-border)" }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🛍️</div>
          <h1 style={{ fontSize: "clamp(26px, 4vw, 36px)", marginBottom: 12 }}>Direct Kitchen Checkout</h1>
          {items.length === 0 ? (
            <div style={{ marginTop: 20 }}>
              <p className="muted" style={{ marginBottom: 28, fontSize: 15 }}>
                Your cart is currently empty. Please select dishes from our authentic menu before checking out.
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/menu" className="btn btn-primary">
                  View Menu &amp; Prices →
                </Link>
                <Link href="/" className="btn btn-secondary">
                  ← Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: 20 }}>
              <p className="muted" style={{ marginBottom: 28, fontSize: 15 }}>
                Opening your secure order checkout drawer. If it did not open automatically, click below:
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={openOrderModal}
                >
                  Open Checkout Form →
                </button>
                <Link href="/cart" className="btn btn-secondary">
                  ← Review Cart
                </Link>
                <Link href="/" className="btn btn-secondary">
                  ← Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}