"use client";

import React, { useState } from "react";
import { MenuItem, formatINR } from "@/lib/menu";
import { useCart } from "@/lib/cart";
import { trackAddToCart, trackLead } from "@/lib/analytics";

const RESTAURANT_WHATSAPP = "919384638754";

export default function DishAddToCart({ dish }: { dish: MenuItem }) {
  const { addToCart, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAdd = () => {
    addToCart(dish, quantity);
    trackAddToCart(dish, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2400);
  };

  const handleBuyNow = () => {
    addToCart(dish, quantity);
    trackAddToCart(dish, quantity);
    openCart();
  };

  const handleOrderWhatsApp = () => {
    trackLead("whatsapp_dish_order", { dishId: dish.id, quantity });
    const text = encodeURIComponent(
      `Vanakkam Sooru & Stories! 🙏\nI would like to order:\n• ${quantity}x ${dish.name} (${formatINR(dish.pricePaise * quantity)})\n\nPlease let me know the estimated delivery time to my location in Sathyamangalam / nearby.`
    );
    window.open(`https://wa.me/${RESTAURANT_WHATSAPP}?text=${text}`, "_blank");
  };

  return (
    <div className="dish-actions-box">
      {/* Price & Quantity Stepper */}
      <div className="dish-price-stepper-row">
        <div className="stepper" style={{ padding: "6px 14px", fontSize: 16 }}>
          <button
            type="button"
            className="stepper-btn"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            style={{ fontSize: 18 }}
            aria-label="Decrease quantity"
          >
            –
          </button>
          <span style={{ minWidth: 26, textAlign: "center", fontWeight: 700 }}>
            {quantity}
          </span>
          <button
            type="button"
            className="stepper-btn"
            onClick={() => setQuantity((q) => q + 1)}
            style={{ fontSize: 18 }}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div>
          <div className="dish-total-price">
            {formatINR(dish.pricePaise * quantity)}
          </div>
          <div style={{ fontSize: 12, color: "var(--cream-muted)" }}>
            {quantity > 1 ? `(${formatINR(dish.pricePaise)} each)` : "Taxes & packaging included"}
          </div>
        </div>
      </div>

      {/* Action Buttons: Add to Cart, Buy Now, Order via WhatsApp */}
      <div className="dish-cta-grid">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAdd}
          style={{ position: "relative" }}
        >
          {addedNotice ? "✓ Added to Feast!" : "🧺 Add to Cart"}
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleBuyNow}
        >
          ⚡ Instant Checkout
        </button>

        <button
          type="button"
          className="btn btn-whatsapp"
          onClick={handleOrderWhatsApp}
          title="Direct WhatsApp Order"
        >
          <span>💬</span> Order via WhatsApp
        </button>
      </div>

      {/* Trust & E-Commerce Highlights */}
      <div className="dish-trust-highlights">
        <div className="highlight-pill">
          <span>🏺</span> Clay Pot Cooked
        </div>
        <div className="highlight-pill">
          <span>🍃</span> Plantain Leaf Included
        </div>
        <div className="highlight-pill">
          <span>⏱️</span> Ready in 20–25 mins
        </div>
        <div className="highlight-pill">
          <span>👥</span> Serves 1–2
        </div>
      </div>
    </div>
  );
}
