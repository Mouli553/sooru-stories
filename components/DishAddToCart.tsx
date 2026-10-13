"use client";

import React, { useState } from "react";
import { MenuItem, formatINR } from "@/lib/menu";
import { useCart } from "@/lib/cart";
import { trackAddToCart } from "@/lib/analytics";

export default function DishAddToCart({ dish }: { dish: MenuItem }) {
  const { addToCart, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart(dish, quantity);
    trackAddToCart(dish, quantity);
  };

  const handleBuyNow = () => {
    addToCart(dish, quantity);
    trackAddToCart(dish, quantity);
    openCart();
  };

  return (
    <div style={{ marginTop: 24, padding: "20px 0", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 20 }}>
        <div className="stepper" style={{ padding: "6px 14px", fontSize: 16 }}>
          <button
            type="button"
            className="stepper-btn"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            style={{ fontSize: 18 }}
          >
            –
          </button>
          <span style={{ minWidth: 24, textAlign: "center" }}>{quantity}</span>
          <button
            type="button"
            className="stepper-btn"
            onClick={() => setQuantity((q) => q + 1)}
            style={{ fontSize: 18 }}
          >
            +
          </button>
        </div>

        <div style={{ fontSize: 24, fontWeight: 700, color: "var(--gold)" }}>
          {formatINR(dish.pricePaise * quantity)}
        </div>
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAdd}
          style={{ flex: 1 }}
        >
          🧺 Add to Cart
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleBuyNow}
          style={{ flex: 1 }}
        >
          ⚡ Order Now
        </button>
      </div>
    </div>
  );
}
