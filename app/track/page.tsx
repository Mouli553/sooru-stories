"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const RESTAURANT_WHATSAPP = "919384638754";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const urlOrderId = searchParams.get("id") || "";

  const [orderIdInput, setOrderIdInput] = useState(urlOrderId);
  const [activeOrder, setActiveOrder] = useState<{
    id: string;
    customerName?: string;
    placedAt: string;
    step: number; // 1, 2, 3, 4
    estimatedDelivery: string;
    driverName: string;
    driverPhone: string;
  } | null>(null);

  // Auto-load if orderId is in query or sessionStorage
  useEffect(() => {
    let targetId = urlOrderId;
    if (!targetId && typeof window !== "undefined") {
      const stored = sessionStorage.getItem("sooru_last_order_id");
      if (stored) targetId = stored;
    }

    if (targetId) {
      setOrderIdInput(targetId);
      lookupOrder(targetId);
    }
  }, [urlOrderId]);

  const lookupOrder = (id: string) => {
    const cleanId = id.trim().toUpperCase();
    if (!cleanId) return;

    // Simulate real-time tracking progression
    setActiveOrder({
      id: cleanId,
      customerName: "Valued Feast Guest",
      placedAt: "Just now",
      step: 3, // Simmered & packing
      estimatedDelivery: "25–35 mins",
      driverName: "Murugan S. (Express Kitchen Dispatch)",
      driverPhone: "+91 93846 38754"
    });
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    lookupOrder(orderIdInput);
  };

  const handleWhatsAppDispatchChat = () => {
    const currentId = activeOrder?.id || orderIdInput || "MY_ORDER";
    const text = encodeURIComponent(
      `Vanakkam Sooru & Stories! 🙏\nI am tracking my feast order #${currentId}.\nPlease provide a quick update on kitchen dispatch and rider arrival.`
    );
    window.open(`https://wa.me/${RESTAURANT_WHATSAPP}?text=${text}`, "_blank");
  };

  const steps = [
    {
      num: 1,
      title: "Order Confirmed",
      desc: "Order registered in kitchen ledger & payment verified.",
      icon: "✅"
    },
    {
      num: 2,
      title: "Simmering in Kitchen",
      desc: "Clay pot rasams & Seeraga Samba dum biryani being cooked fresh.",
      icon: "🍲"
    },
    {
      num: 3,
      title: "Plantain Leaf Packing",
      desc: "Packed hot in traditional eco-friendly banana leaf containers.",
      icon: "🍃"
    },
    {
      num: 4,
      title: "Out for Express Delivery",
      desc: "Delivery rider en-route to your doorstep in insulated thermal bags.",
      icon: "🛵"
    }
  ];

  return (
    <div style={{ paddingTop: 110, minHeight: "85vh", background: "var(--forest-dark)" }}>
      <div className="container" style={{ padding: "40px 24px 80px", maxWidth: 840 }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: "var(--cream-muted)", marginBottom: 28 }}>
          <Link href="/" style={{ color: "var(--gold)" }}>← Home</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--cream)" }}>Live Order Tracking</span>
        </div>

        <div className="section-header" style={{ textAlign: "center", marginBottom: 36 }}>
          <div className="eyebrow">Real-Time Kitchen Dispatch</div>
          <h1 style={{ fontSize: "clamp(30px, 4vw, 42px)", margin: "8px 0" }}>
            Track Your Feast Order
          </h1>
          <p className="muted" style={{ maxWidth: 520, margin: "0 auto" }}>
            Follow your South Indian feast from the burning firewood stoves of our kitchen to your doorstep.
          </p>
        </div>

        {/* Tracking Input Card */}
        <div
          style={{
            background: "var(--forest-card)",
            border: "1px solid var(--forest-border)",
            borderRadius: "var(--radius-xl)",
            padding: "32px",
            boxShadow: "var(--shadow-md)",
            marginBottom: 36
          }}
        >
          <form onSubmit={handleTrackSubmit} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ flexGrow: 1, minWidth: 260 }}>
              <label
                htmlFor="order-id-input"
                style={{
                  display: "block",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "var(--gold)",
                  marginBottom: 6,
                  fontWeight: 600
                }}
              >
                Enter Order ID / Token Number:
              </label>
              <input
                id="order-id-input"
                type="text"
                placeholder="e.g., SOORU-8492 or phone number"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                className="form-control"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: 16,
                  borderRadius: "var(--radius-md)",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  background: "rgba(4, 18, 11, 0.6)",
                  color: "var(--cream)"
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ alignSelf: "flex-end", padding: "12px 28px", fontSize: 15 }}
            >
              Track Order →
            </button>
          </form>

          {!activeOrder && (
            <div style={{ marginTop: 16, fontSize: 13, color: "var(--cream-muted)" }}>
              Tip: Your Order ID was displayed upon checkout and also sent via WhatsApp receipt (e.g. <code>SOORU-1024</code>).
            </div>
          )}
        </div>

        {/* Active Order Progress Stepper */}
        {activeOrder && (
          <div
            style={{
              background: "var(--forest-card)",
              border: "1px solid rgba(212, 175, 55, 0.35)",
              borderRadius: "var(--radius-xl)",
              padding: "36px 30px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
              position: "relative"
            }}
          >
            {/* Header Status Meta */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
                paddingBottom: 20,
                marginBottom: 28,
                flexWrap: "wrap",
                gap: 16
              }}
            >
              <div>
                <span
                  style={{
                    background: "rgba(46, 139, 87, 0.2)",
                    border: "1px solid #2E8B57",
                    color: "#A3E4D7",
                    padding: "4px 12px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    display: "inline-block",
                    marginBottom: 8
                  }}
                >
                  🟢 Live Preparation &amp; Dispatch
                </span>
                <h2 style={{ fontSize: 24, margin: "4px 0", color: "var(--cream)" }}>
                  Order #{activeOrder.id}
                </h2>
                <div style={{ fontSize: 13, color: "var(--cream-muted)" }}>
                  Estimated Arrival: <strong style={{ color: "var(--gold)" }}>{activeOrder.estimatedDelivery}</strong>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-whatsapp"
                onClick={handleWhatsAppDispatchChat}
                style={{ fontSize: 13.5, padding: "10px 18px", display: "flex", alignItems: "center", gap: 8 }}
              >
                <span>💬</span> WhatsApp Kitchen Dispatch
              </button>
            </div>

            {/* Stepper Timeline */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24, margin: "24px 0" }}>
              {steps.map((st) => {
                const isPassed = st.num < activeOrder.step;
                const isCurrent = st.num === activeOrder.step;
                const isPending = st.num > activeOrder.step;

                return (
                  <div
                    key={st.num}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 20,
                      position: "relative"
                    }}
                  >
                    {/* Circle Node */}
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        flexShrink: 0,
                        background: isPassed
                          ? "rgba(46, 139, 87, 0.3)"
                          : isCurrent
                          ? "rgba(212, 175, 55, 0.25)"
                          : "rgba(255, 255, 255, 0.05)",
                        border: isPassed
                          ? "2px solid #2E8B57"
                          : isCurrent
                          ? "2px solid var(--gold)"
                          : "2px solid rgba(255, 255, 255, 0.15)",
                        boxShadow: isCurrent ? "0 0 16px rgba(212, 175, 55, 0.4)" : "none"
                      }}
                    >
                      {st.icon}
                    </div>

                    {/* Step Details */}
                    <div style={{ flexGrow: 1 }}>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: isCurrent
                            ? "var(--gold)"
                            : isPassed
                            ? "var(--cream)"
                            : "var(--cream-muted)",
                          display: "flex",
                          alignItems: "center",
                          gap: 8
                        }}
                      >
                        {st.title}
                        {isCurrent && (
                          <span
                            style={{
                              fontSize: 11,
                              padding: "2px 8px",
                              background: "var(--gold)",
                              color: "#000",
                              borderRadius: 4,
                              fontWeight: 800
                            }}
                          >
                            IN PROGRESS
                          </span>
                        )}
                        {isPassed && (
                          <span style={{ fontSize: 13, color: "#2E8B57" }}>✓ Done</span>
                        )}
                      </div>
                      <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "var(--cream-soft)", lineHeight: 1.5 }}>
                        {st.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Delivery Rider Dispatch Box */}
            <div
              style={{
                marginTop: 32,
                padding: "20px",
                background: "rgba(4, 18, 11, 0.8)",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                borderRadius: "var(--radius-lg)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "var(--gold)",
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24
                  }}
                >
                  🛵
                </div>
                <div>
                  <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1, color: "var(--gold)" }}>
                    Assigned Dispatch Rider
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--cream)" }}>
                    {activeOrder.driverName}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--cream-muted)" }}>
                    Sathyamangalam &amp; Surrounds Express Run
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <a
                  href={`tel:${RESTAURANT_WHATSAPP}`}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: "8px 16px" }}
                >
                  📞 Call Kitchen
                </a>
                <button
                  type="button"
                  className="btn btn-whatsapp btn-sm"
                  onClick={handleWhatsAppDispatchChat}
                  style={{ padding: "8px 16px" }}
                >
                  💬 WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <Link href="/menu" className="btn btn-secondary">
            ← Explore Menu &amp; Add More Dishes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "140px 20px", textAlign: "center", minHeight: "75vh" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🛵</div>
          <h3>Loading Live Order Tracking...</h3>
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
