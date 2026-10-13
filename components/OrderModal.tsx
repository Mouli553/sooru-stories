"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";
import { formatINR } from "@/lib/menu";
import { trackPurchase } from "@/lib/analytics";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, callback: (response: unknown) => void) => void;
    };
  }
}

const RESTAURANT_WHATSAPP = "919876543210";

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
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [notes, setNotes] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discountPaise, setDiscountPaise] = useState(0);
  const [couponStatus, setCouponStatus] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<{
    orderNumber: string;
    totalAmount: string;
    paymentMode: string;
  } | null>(null);

  // Restore draft from sessionStorage
  useEffect(() => {
    try {
      const savedDraft = sessionStorage.getItem("sooru_checkout_draft");
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.name) setName(parsed.name);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.email) setEmail(parsed.email);
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
        JSON.stringify({ name, phone, email, address, landmark })
      );
    } catch {
      // Ignore
    }
  }, [name, phone, email, address, landmark]);

  // Load Razorpay SDK script dynamically
  useEffect(() => {
    if (typeof window !== "undefined" && !window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleApplyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (code === "SOORU50") {
      if (subtotalPaise >= 30000) {
        setDiscountPaise(5000);
        setCouponStatus("✓ 'SOORU50' applied: ₹50 discount!");
      } else {
        setCouponStatus("Coupon requires minimum order of ₹300");
      }
    } else if (code === "FEAST10") {
      if (subtotalPaise >= 50000) {
        const disc = Math.round(subtotalPaise * 0.1);
        setDiscountPaise(disc);
        setCouponStatus(`✓ 'FEAST10' applied: 10% discount (${formatINR(disc)})!`);
      } else {
        setCouponStatus("Coupon requires minimum order of ₹500");
      }
    } else {
      setCouponStatus("Invalid coupon code");
    }
  };

  if (!isOrderModalOpen) return null;

  const deliveryFeePaise = orderType === "delivery" && subtotalPaise < 50000 ? 4000 : 0;
  const grandTotalPaise = Math.max(0, subtotalPaise - discountPaise + deliveryFeePaise);

  const executeOrderSubmission = async (paymentDetails?: {
    razorpay_payment_id?: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
  }) => {
    setErrorMessage(null);

    const payload = {
      customerName: name.trim(),
      customerEmail: email.trim() || undefined,
      customerPhone: phone.trim(),
      fulfilmentMode: orderType,
      deliveryAddress:
        orderType === "delivery"
          ? {
              line1: address.trim(),
              landmark: landmark.trim() || null,
              city: "Sathyamangalam",
              state: "Tamil Nadu",
              pincode: "638401"
            }
          : null,
      specialInstructions: notes.trim() || null,
      items: items.map((i) => ({
        productId: i.product.id,
        quantity: i.quantity,
        pricePaise: i.product.pricePaise
      })),
      paymentMode,
      couponCode: discountPaise > 0 ? couponCode : null,
      razorpay_payment_id: paymentDetails?.razorpay_payment_id,
      razorpay_order_id: paymentDetails?.razorpay_order_id,
      razorpay_signature: paymentDetails?.razorpay_signature
    };

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Failed to create order on server.");
    }

    const orderNumber = result.orderNumber;

    // Build WhatsApp formatted receipt
    let receipt = `🌿 *SOORU & STORIES — ORDER CONFIRMATION* 🌿\n`;
    receipt += `━━━━━━━━━━━━━━━━━━━━━\n`;
    receipt += `🧾 *Order ID:* #${orderNumber}\n`;
    receipt += `👤 *Customer:* ${name}\n`;
    receipt += `📞 *Phone:* ${phone}\n`;
    receipt += `🛵 *Fulfilment:* ${orderType === "delivery" ? "Home Delivery" : "Kitchen Takeaway"}\n`;
    if (orderType === "delivery") {
      receipt += `🏡 *Address:* ${address}${landmark ? ` (Near ${landmark})` : ""}\n`;
    }
    if (notes.trim()) {
      receipt += `📝 *Notes:* ${notes}\n`;
    }
    receipt += `━━━━━━━━━━━━━━━━━━━━━\n`;
    receipt += `🍲 *DISHES:*\n`;
    items.forEach((item) => {
      receipt += `• ${item.quantity}x ${item.product.name} (${formatINR(item.product.pricePaise * item.quantity)})\n`;
    });
    receipt += `━━━━━━━━━━━━━━━━━━━━━\n`;
    receipt += `💵 *Subtotal:* ${formatINR(subtotalPaise)}\n`;
    if (discountPaise > 0) {
      receipt += `🏷️ *Discount:* -${formatINR(discountPaise)}\n`;
    }
    if (orderType === "delivery") {
      receipt += `🛵 *Delivery:* ${deliveryFeePaise === 0 ? "FREE" : formatINR(deliveryFeePaise)}\n`;
    }
    receipt += `💰 *TOTAL PAYABLE:* ${formatINR(grandTotalPaise)}\n`;
    receipt += `💳 *Payment:* ${paymentDetails?.razorpay_payment_id ? "PAID ONLINE (Verified)" : "Cash on Delivery (COD)"}\n`;
    receipt += `━━━━━━━━━━━━━━━━━━━━━\n`;
    receipt += `🙏 _Please confirm preparation and dispatch!_`;

    trackPurchase(
      orderNumber,
      items,
      grandTotalPaise,
      paymentDetails?.razorpay_payment_id ? "Razorpay_Online" : "Cash_On_Delivery"
    );

    const whatsappUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(receipt)}`;

    setCompletedOrder({
      orderNumber,
      totalAmount: formatINR(grandTotalPaise),
      paymentMode: paymentDetails?.razorpay_payment_id ? "Online (Verified)" : "Cash on Delivery"
    });

    clearCart();

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank");
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage("Please enter your name and contact phone number.");
      return;
    }
    if (orderType === "delivery" && !address.trim()) {
      setErrorMessage("Please enter your delivery street address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      if (paymentMode === "online") {
        // 1. Create Razorpay Order on server
        const rzpRes = await fetch("/api/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
            fulfilmentMode: orderType,
            couponCode: discountPaise > 0 ? couponCode : null
          })
        });

        const rzpData = await rzpRes.json();
        if (!rzpRes.ok) throw new Error(rzpData.error || "Payment gateway order generation failed.");

        // If Razorpay SDK is available and not in simulated test mode
        if (window.Razorpay && !rzpData.simulated) {
          const options = {
            key: rzpData.keyId,
            amount: rzpData.amount,
            currency: rzpData.currency,
            name: "Sooru & Stories",
            description: "Authentic South Indian Feast Order",
            order_id: rzpData.id,
            prefill: {
              name: name.trim(),
              contact: phone.trim(),
              email: email.trim() || undefined
            },
            theme: { color: "#D4AF37" },
            handler: async function (response: {
              razorpay_payment_id: string;
              razorpay_order_id: string;
              razorpay_signature: string;
            }) {
              try {
                await executeOrderSubmission(response);
              } catch (err: unknown) {
                setErrorMessage(err instanceof Error ? err.message : "Payment recorded but order finalization failed.");
              } finally {
                setIsSubmitting(false);
              }
            },
            modal: {
              ondismiss: function () {
                setIsSubmitting(false);
              }
            }
          };

          const rzpInstance = new window.Razorpay(options);
          rzpInstance.open();
          return;
        }

        // Test mode simulation fallback
        await executeOrderSubmission({
          razorpay_order_id: rzpData.id,
          razorpay_payment_id: `pay_test_${Date.now()}`,
          razorpay_signature: "test_sig_verified"
        });
      } else {
        // Cash on delivery
        await executeOrderSubmission();
      }
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage(err instanceof Error ? err.message : "Order submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
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
            <div className="eyebrow">Direct Kitchen Checkout</div>
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
              Your order <strong>#{completedOrder.orderNumber}</strong> for{" "}
              <strong>{completedOrder.totalAmount}</strong> ({completedOrder.paymentMode}) has been registered.
            </p>
            <p className="muted" style={{ fontSize: 13, marginBottom: 24 }}>
              WhatsApp has opened with your official order receipt. 
              Our kitchen dispatch is waiting to confirm preparation!
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
          <form onSubmit={handleCheckoutSubmit}>
            {errorMessage && (
              <div
                style={{
                  padding: "12px 16px",
                  background: "rgba(211, 47, 47, 0.2)",
                  border: "1px solid #D32F2F",
                  color: "#FF8A80",
                  borderRadius: "var(--radius-sm)",
                  fontSize: 13,
                  marginBottom: 16
                }}
              >
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Fulfilment Toggle */}
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

            <div className="booking-form" style={{ marginBottom: 16 }}>
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

              <div className="form-group full-width">
                <label className="form-label">Email (For Order Receipt)</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>

              {orderType === "delivery" && (
                <>
                  <div className="form-group full-width">
                    <label className="form-label">Delivery Street Address *</label>
                    <textarea
                      required
                      placeholder="Door no, street, apartment / colony..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                      style={{ minHeight: 60 }}
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Nearby Landmark</label>
                    <input
                      type="text"
                      placeholder="e.g. Opp. Bus Stand / Beside Temple"
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
                  placeholder="e.g. Medium spice, extra sambar"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            {/* Coupon Code Input */}
            <div style={{ marginBottom: 16 }}>
              <label className="form-label">Promo / Coupon Code</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text"
                  placeholder="Try SOORU50 or FEAST10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="form-control"
                  style={{ textTransform: "uppercase" }}
                />
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleApplyCoupon}
                >
                  Apply
                </button>
              </div>
              {couponStatus && (
                <div style={{ fontSize: 12, marginTop: 4, color: discountPaise > 0 ? "#8EE0A8" : "var(--coral)" }}>
                  {couponStatus}
                </div>
              )}
            </div>

            {/* Payment Mode Selector */}
            <label className="form-label">Payment Preference *</label>
            <div className="payment-toggle">
              <div
                className={`payment-card ${paymentMode === "online" ? "active" : ""}`}
                onClick={() => setPaymentMode("online")}
              >
                <strong>⚡ Pay Online (UPI / Card)</strong>
                <small>Razorpay: GPay, PhonePe &amp; Cards</small>
              </div>
              <div
                className={`payment-card ${paymentMode === "cod" ? "active" : ""}`}
                onClick={() => setPaymentMode("cod")}
              >
                <strong>💵 Cash on Delivery</strong>
                <small>Pay upon doorstep delivery / pickup</small>
              </div>
            </div>

            {/* Pricing Summary */}
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
              {discountPaise > 0 && (
                <div className="summary-row" style={{ color: "#8EE0A8" }}>
                  <span>Coupon Discount</span>
                  <span>-{formatINR(discountPaise)}</span>
                </div>
              )}
              {orderType === "delivery" && (
                <div className="summary-row">
                  <span>Delivery</span>
                  <span>{deliveryFeePaise === 0 ? "FREE" : "₹40"}</span>
                </div>
              )}
              <div className="summary-row total" style={{ marginBottom: 0, paddingBottom: 0 }}>
                <span>Grand Total</span>
                <span>{formatINR(grandTotalPaise)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              {isSubmitting
                ? "Connecting to Kitchen..."
                : `Place Order (${formatINR(grandTotalPaise)}) →`}
            </button>
            <p className="muted" style={{ textAlign: "center", fontSize: 12, marginTop: 10 }}>
              Generates official order in kitchen database &amp; opens instant WhatsApp confirmation.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
