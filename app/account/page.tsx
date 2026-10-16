"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/menu";

interface OrderHistoryItem {
  orderNumber: string;
  date: string;
  status: string;
  totalPaise: number;
  items: Array<{ name: string; quantity: number }>;
}

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "address" | "profile">("orders");
  const [customerName, setCustomerName] = useState("Guest Foodie");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("638401");
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    // Load local profile draft
    try {
      const savedDraft = sessionStorage.getItem("sooru_checkout_draft");
      if (savedDraft) {
        const p = JSON.parse(savedDraft);
        if (p.name) setCustomerName(p.name);
        if (p.phone) setCustomerPhone(p.phone);
        if (p.address) setAddressLine(p.address);
        if (p.landmark) setLandmark(p.landmark);
      }

      // Sample or real past orders
      const sampleOrders: OrderHistoryItem[] = [
        {
          orderNumber: "SS-849201",
          date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
          status: "processing",
          totalPaise: 68000,
          items: [
            { name: "Ambur Royal Biryani", quantity: 2 },
            { name: "Thakkali Rasam", quantity: 2 }
          ]
        }
      ];
      setOrders(sampleOrders);
    } catch {
      // Ignore
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      sessionStorage.setItem(
        "sooru_checkout_draft",
        JSON.stringify({
          name: customerName,
          phone: customerPhone,
          address: addressLine,
          landmark: landmark
        })
      );
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch {
      // Ignore
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
      case "processing":
        return <span style={{ background: "rgba(212, 175, 55, 0.2)", color: "var(--gold-light)", padding: "3px 10px", borderRadius: "var(--radius-full)", fontSize: 12, fontWeight: 700 }}>👨‍🍳 In Kitchen</span>;
      case "out_for_delivery":
        return <span style={{ background: "rgba(46, 139, 87, 0.2)", color: "#8EE0A8", padding: "3px 10px", borderRadius: "var(--radius-full)", fontSize: 12, fontWeight: 700 }}>🛵 On the Way</span>;
      case "delivered":
        return <span style={{ background: "rgba(46, 139, 87, 0.25)", color: "#2E8B57", padding: "3px 10px", borderRadius: "var(--radius-full)", fontSize: 12, fontWeight: 700 }}>✓ Delivered</span>;
      default:
        return <span style={{ background: "rgba(255, 255, 255, 0.1)", color: "var(--cream-muted)", padding: "3px 10px", borderRadius: "var(--radius-full)", fontSize: 12 }}>Pending</span>;
    }
  };

  return (
    <div style={{ paddingTop: 110, minHeight: "85vh" }}>
      <div className="container" style={{ padding: "40px 24px 80px", maxWidth: 960 }}>
        <div style={{ fontSize: 13, color: "var(--cream-muted)", marginBottom: 20 }}>
          <Link href="/" style={{ color: "var(--gold-light)" }}>← Home</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--cream)" }}>Account</span>
        </div>

        <div className="section-header" style={{ textAlign: "left", marginBottom: 32 }}>
          <div className="eyebrow">Customer Account</div>
          <h1>Welcome, {customerName}</h1>
          <p className="muted">Manage your orders, saved addresses, and dining preferences.</p>
        </div>

        {/* Tab Selector */}
        <div style={{ display: "flex", gap: 12, borderBottom: "1px solid rgba(212, 175, 55, 0.2)", paddingBottom: 12, marginBottom: 32 }}>
          <button
            type="button"
            className={`cat-pill ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            📦 My Orders ({orders.length})
          </button>
          <button
            type="button"
            className={`cat-pill ${activeTab === "address" ? "active" : ""}`}
            onClick={() => setActiveTab("address")}
          >
            🏡 Delivery Addresses
          </button>
          <button
            type="button"
            className={`cat-pill ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            👤 Profile &amp; Contact
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === "orders" && (
          <div>
            {orders.length === 0 ? (
              <div style={{ background: "var(--forest-card)", border: "1px solid var(--forest-border)", borderRadius: "var(--radius-lg)", padding: "50px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 44, marginBottom: 12 }}>🍲</div>
                <h3>No previous orders found</h3>
                <p className="muted" style={{ marginBottom: 20 }}>Your past delicious feasts and live orders will appear right here.</p>
                <Link href="/menu" className="btn btn-primary">
                  Order Today&apos;s Special →
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {orders.map((ord) => (
                  <div
                    key={ord.orderNumber}
                    style={{
                      background: "var(--forest-card)",
                      border: "1px solid var(--forest-border)",
                      borderRadius: "var(--radius-lg)",
                      padding: "24px"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: 14, marginBottom: 14 }}>
                      <div>
                        <strong style={{ fontSize: 16, color: "var(--cream)" }}>Order #{ord.orderNumber}</strong>
                        <div style={{ fontSize: 12, color: "var(--cream-muted)" }}>Placed on {ord.date}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        {getStatusBadge(ord.status)}
                        <span style={{ fontSize: 18, fontWeight: 700, color: "var(--gold)" }}>
                          {formatINR(ord.totalPaise)}
                        </span>
                      </div>
                    </div>

                    <div style={{ fontSize: 14, color: "var(--cream-soft)", marginBottom: 16 }}>
                      {ord.items.map((i, idx) => (
                        <span key={idx}>
                          {i.quantity}x {i.name}
                          {idx < ord.items.length - 1 ? " · " : ""}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <a
                        href={`https://wa.me/919384638754?text=Vanakkam!%20Checking%20status%20for%20Order%20%23${ord.orderNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: 13, color: "var(--gold-light)", fontWeight: 600 }}
                      >
                        Track Status on WhatsApp 💬
                      </a>
                      <Link href="/menu" className="btn btn-secondary btn-sm">
                        Re-order Feast
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2 & 3: ADDRESS & PROFILE */}
        {(activeTab === "address" || activeTab === "profile") && (
          <div style={{ background: "var(--forest-card)", border: "1px solid var(--forest-border)", borderRadius: "var(--radius-lg)", padding: "32px", maxWidth: 640 }}>
            <h3 style={{ marginBottom: 20 }}>
              {activeTab === "address" ? "Delivery Address Information" : "Profile Details"}
            </h3>

            {savedSuccess && (
              <div style={{ padding: "12px 16px", background: "rgba(46, 139, 87, 0.2)", border: "1px solid #2E8B57", color: "#8EE0A8", borderRadius: "var(--radius-sm)", marginBottom: 20, fontSize: 13 }}>
                ✓ Profile details successfully updated!
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="booking-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="form-control"
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">WhatsApp Number</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="form-control"
                  placeholder="e.g. 9384638754"
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label">Email Address (Optional)</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="form-control"
                  placeholder="name@example.com"
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label">Door No, Street &amp; Area</label>
                <textarea
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="form-control"
                  placeholder="Address details for doorstep food delivery..."
                  style={{ minHeight: 70 }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Nearby Landmark</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="form-control"
                  placeholder="e.g. Near Bus Stand / Temple"
                />
              </div>

              <div className="form-group">
                <label className="form-label">PIN Code</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="form-control"
                  placeholder="638401"
                />
              </div>

              <div className="form-group full-width" style={{ marginTop: 12 }}>
                <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                  Save Account Information
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}