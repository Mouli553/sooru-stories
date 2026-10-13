"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/menu";
import { trackPurchase } from "@/lib/analytics";

const RESTAURANT_WHATSAPP = "919876543210"; // Owner WhatsApp number

export default function OrderModal() {
  const {
    items,
    isOrderModalOpen,
    closeOrderModal,
    subtotalPaise,
    clearCart
  } = useCart();

  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [paymentMode, setPaymentMode] = useState<"online" | "cod">("online");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    totalAmount: string;
  } | null>(null);

  // Restore draft from sessionStorage
  useEffect(() => {
    try {
      const savedDraft = sessionStorage.getItem("sooru_checkout_draft");
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.name) setName(parsed.name);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.address) setAddress(parsed.address);
        if (parsed.landmark) setLandmark(parsed.landmark);
      }
    } catch {
      // Ignore
    }
  }, []);

  // Save draft
  useEffect(() => {
    try {
      sessionStorage.setItem(
        "sooru_checkout_draft",
        JSON.stringify({ name, phone, address, landmark })
      );
    } catch {
      // Ignore
    }
  }, [name, phone, address, landmark]);

  if (!isOrderModalOpen) return null;

  const deliveryFeePaise = orderType === "delivery" && subtotalPaise < 50000 ? 4000 : 0;
  const grandTotalPaise = subtotalPaise + deliveryFeePaise;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert("Please enter your name and phone number.");
      return;
    }
    if (orderType === "delivery" && !address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    setIsSubmitting(true);

    const orderId = `SS-${Math.floor(10000 + Math.random() * 90000)}`;

    // Build WhatsApp formatted receipt
    let receipt = `🌿 *SOORU & STORIES — ORDER CONFIRMATION* 🌿\n`;
    receipt += `━━━━━━━━━━━━━━━━━━━━━\n`;
    receipt += `🧾 *Order ID:* #${orderId}\n`;
    receipt += `👤 *Customer:* ${name}\n`;
    receipt += `📞 *Phone:* ${phone}\n`;
    receipt += `🛵 *Fulfilment:* ${orderType === "delivery" ? "Home Delivery" : "Self-Pickup / Takeaway"}\n`;
    if (orderType === "delivery") {
      receipt += `🏡 *Address:* ${address}${landmark ? ` (Near ${landmark})` : ""}\n`;
    }
    if (notes.trim()) {
      receipt += `📝 *Special Instructions:* ${notes}\n`;
    }
    receipt += `━━━━━━━━━━━━━━━━━━━━━\n`;
    receipt += `🍲 *ORDERED DISHES:*\n`;
    items.forEach((item) => {
      receipt += `• ${item.quantity}x ${item.product.name} (${formatINR(item.product.pricePaise * item.quantity)})\n`;
    });
    receipt += `━━━━━━━━━━━━━━━━━━━━━\n`;
    receipt += `💵 *Subtotal:* ${formatINR(subtotalPaise)}\n`;
    if (orderType === "delivery") {
      receipt += `🛵 *Delivery:* ${deliveryFeePaise === 0 ? "FREE" : formatINR(deliveryFeePaise)}\n`;
    }
    receipt += `💰 *GRAND TOTAL:* ${formatINR(grandTotalPaise)}\n`;
    receipt += `💳 *Payment Mode:* ${paymentMode === "online" ? "UPI / Online Payment" : "Cash on Delivery (COD)"}\n`;
    receipt += `━━━━━━━━━━━━━━━━━━━━━\n`;
    receipt += `🙏 _Please confirm availability and dispatch!_`;

    // Analytics conversion tracking
    trackPurchase(
      orderId,
      items,
      grandTotalPaise,
      paymentMode === "online" ? "UPI_Online" : "Cash_On_Delivery"
    );

    // Encode for WhatsApp URL
    const whatsappUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(receipt)}`;

    setCompletedOrder({
      orderId,
      totalAmount: formatINR(grandTotalPaise)
    });

    clearCart();
    setIsSubmitting(false);

    // Open WhatsApp in new tab
    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank");
    }
  };

  const handleClose = () => {
    setCompletedOrder(null);
    closeOrderModal();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
      >
        <div className="modal-header">
          <div>
            <div className="eyebrow">Direct Kitchen Order</div>
            <h3 id="checkout-modal-title">
              {completedOrder ? "Order Confirmed!" : "Complete Your Order"}
            </h3>
          </div>
          <button
            type="button"
            className="drawer-close"
            onClick={handleClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {completedOrder ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
            <h4 style={{ fontSize: 22, color: "var(--gold)", marginBottom: 8 }}>
              Thank You, {name}!
            </h4>
            <p style={{ color: "var(--cream-soft)", marginBottom: 12 }}>
              Your order <strong>#{completedOrder.orderId}</strong> for{" "}
              <strong>{completedOrder.totalAmount}</strong> has been created.
            </p>
            <p className="muted" style={{ fontSize: 13, marginBottom: 24 }}>
              We have launched WhatsApp with your pre-formatted order receipt.
              If it did not open automatically, tap below to notify the kitchen!
            </p>
            <a
              href={`https://wa.me/${RESTAURANT_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: "100%", marginBottom: 12 }}
            >
              Open WhatsApp Order Chat 💬
            </a>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: "100%" }}
              onClick={handleClose}
            >
              Back to Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder}>
            {/* Delivery vs Pickup Selector */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 20
              }}
            >
              <button
                type="button"
                className={`payment-card ${orderType === "delivery" ? "active" : ""}`}
                onClick={() => setOrderType("delivery")}
              >
                <strong>🛵 Home Delivery</strong>
                <small>Fresh to your doorstep</small>
              </button>
              <button
                type="button"
                className={`payment-card ${orderType === "pickup" ? "active" : ""}`}
                onClick={() => setOrderType("pickup")}
              >
                <strong>🥡 Takeaway / Pickup</strong>
                <small>Pick up hot at kitchen</small>
              </button>
            </div>

            <div className="booking-form" style={{ marginBottom: 20 }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                />
              </div>

              {orderType === "delivery" && (
                <>
                  <div className="form-group full-width">
                    <label className="form-label">Delivery Address *</label>
                    <textarea
                      required
                      placeholder="Street, door no, apartment / area..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                      style={{ minHeight: 65 }}
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Nearby Landmark</label>
                    <input
                      type="text"
                      placeholder="e.g. Opp. Bus Stand / Next to Bank"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </>
              )}

              <div className="form-group full-width">
                <label className="form-label">Cooking Instructions / Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Less spicy, extra salna, no disposable cutlery"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            {/* Payment Mode Selector */}
            <label className="form-label">Payment Preference *</label>
            <div className="payment-toggle">
              <div
                className={`payment-card ${paymentMode === "online" ? "active" : ""}`}
                onClick={() => setPaymentMode("online")}
              >
                <strong>⚡ Pay Online (UPI / Card)</strong>
                <small>GPay, PhonePe, Paytm &amp; Cards</small>
              </div>
              <div
                className={`payment-card ${paymentMode === "cod" ? "active" : ""}`}
                onClick={() => setPaymentMode("cod")}
              >
                <strong>💵 Cash on Delivery</strong>
                <small>Pay upon arrival / pickup</small>
              </div>
            </div>

            {/* Order Total Preview */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                padding: "16px",
                borderRadius: "var(--radius-md)",
                marginBottom: 20
              }}
            >
              <div className="summary-row">
                <span>Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                <span>{formatINR(subtotalPaise)}</span>
              </div>
              {orderType === "delivery" && (
                <div className="summary-row">
                  <span>Delivery</span>
                  <span>{deliveryFeePaise === 0 ? "FREE" : "₹40"}</span>
                </div>
              )}
              <div className="summary-row total" style={{ marginBottom: 0, paddingBottom: 0 }}>
                <span>Final Payable</span>
                <span>{formatINR(grandTotalPaise)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              {isSubmitting ? "Processing..." : `Confirm Order (${formatINR(grandTotalPaise)}) →`}
            </button>
            <p className="muted" style={{ textAlign: "center", fontSize: 12, marginTop: 10 }}>
              Generates instant order receipt &amp; connects you directly to the restaurant on WhatsApp.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
