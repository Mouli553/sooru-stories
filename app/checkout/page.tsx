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
    <div style={{ paddingTop: 120, minHeight: "75vh", textAlign: "center", padding: "120px 24px" }}>
      <div className="container" style={{ maxWidth: 600 }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>🛍️</div>
        <h1>Direct Kitchen Checkout</h1>
        {items.length === 0 ? (
          <div style={{ marginTop: 20 }}>
            <p className="muted" style={{ marginBottom: 24 }}>
              Your cart is currently empty. Please select dishes from our menu before checking out.
            </p>
            <Link href="/menu" className="btn btn-primary">
              View Menu &amp; Prices →
            </Link>
          </div>
        ) : (
          <div style={{ marginTop: 20 }}>
            <p className="muted" style={{ marginBottom: 24 }}>
              Opening your checkout drawer. If it did not open automatically, click below:
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={openOrderModal}
            >
              Open Checkout Form →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}