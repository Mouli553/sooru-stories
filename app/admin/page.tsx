"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatINR, menuItems } from "@/lib/menu";

interface OrderRecord {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  fulfilment_mode: string;
  status: string;
  payment_status: string;
  total_paise: number;
  created_at: string;
  order_items?: Array<{ name_snapshot: string; quantity: number }>;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    totalRevenuePaise: 0,
    totalOrders: 0,
    paidOrders: 0,
    deliveredOrders: 0,
    aovPaise: 0
  });

  const [activeTab, setActiveTab] = useState<"orders" | "catalog">("orders");
  const [itemStock, setItemStock] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Initialize stock states
    const stockMap: Record<string, boolean> = {};
    menuItems.forEach((m) => {
      stockMap[m.id] = m.available;
    });
    setItemStock(stockMap);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "8492" || pinInput === "admin123") {
      setIsAuthenticated(true);
      fetchOrders();
      fetchStats();
    } else {
      setPinError(true);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/admin/orders?status=${filterStatus}&search=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [filterStatus, searchQuery, isAuthenticated]);

  const updateStatus = async (orderNumber: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, newStatus })
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.order_number === orderNumber ? { ...o, status: newStatus } : o))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleStock = (dishId: string) => {
    setItemStock((prev) => ({
      ...prev,
      [dishId]: !prev[dishId]
    }));
  };

  if (!isAuthenticated) {
    return (
      <div style={{ paddingTop: 140, minHeight: "80vh", display: "grid", placeItems: "center", padding: "40px 24px" }}>
        <div
          style={{
            background: "var(--forest-card)",
            border: "1px solid var(--gold)",
            borderRadius: "var(--radius-xl)",
            padding: "40px",
            maxWidth: 420,
            width: "100%",
            textAlign: "center"
          }}
        >
          <div style={{ fontSize: 44, marginBottom: 12 }}>🛡️</div>
          <h2 style={{ fontSize: 24, marginBottom: 8, color: "var(--cream)" }}>Restaurant Administration</h2>
          <p className="muted" style={{ fontSize: 13.5, marginBottom: 24 }}>
            Enter your 4-digit Kitchen Manager Access PIN to enter the operations tower.
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter PIN (Default: 8492)"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setPinError(false);
              }}
              className="form-control"
              style={{ textAlign: "center", fontSize: 20, letterSpacing: 4, marginBottom: 16 }}
              required
            />
            {pinError && (
              <div style={{ color: "var(--coral)", fontSize: 12, marginBottom: 12 }}>
                Incorrect PIN. Please re-enter credentials.
              </div>
            )}
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
              Unlock Dashboard →
            </button>
          </form>

          <div style={{ marginTop: 24 }}>
            <Link href="/" style={{ color: "var(--gold-light)", fontSize: 13, textDecoration: "none" }}>
              ← Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 100, minHeight: "85vh" }}>
      <div className="container" style={{ padding: "30px 24px 80px" }}>
        {/* Breadcrumb Navigation */}
        <div style={{ fontSize: 13, color: "var(--cream-muted)", marginBottom: 20 }}>
          <Link href="/" style={{ color: "var(--gold-light)" }}>← Storefront</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--cream)" }}>Admin Control Tower</span>
        </div>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="eyebrow">Control Tower</div>
            <h1>Kitchen &amp; Order Operations</h1>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setIsAuthenticated(false)}
          >
            Lock Dashboard 🔒
          </button>
        </div>

        {/* KPI Analytics Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 18, marginBottom: 36 }}>
          <div style={{ background: "var(--forest-card)", border: "1px solid var(--forest-border)", borderRadius: "var(--radius-md)", padding: "20px" }}>
            <div style={{ fontSize: 12, color: "var(--cream-muted)", textTransform: "uppercase", letterSpacing: 1 }}>Gross Revenue</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--gold)", marginTop: 6 }}>
              {formatINR(stats.totalRevenuePaise)}
            </div>
          </div>
          <div style={{ background: "var(--forest-card)", border: "1px solid var(--forest-border)", borderRadius: "var(--radius-md)", padding: "20px" }}>
            <div style={{ fontSize: 12, color: "var(--cream-muted)", textTransform: "uppercase", letterSpacing: 1 }}>Total Orders</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--cream)", marginTop: 6 }}>
              {stats.totalOrders}
            </div>
          </div>
          <div style={{ background: "var(--forest-card)", border: "1px solid var(--forest-border)", borderRadius: "var(--radius-md)", padding: "20px" }}>
            <div style={{ fontSize: 12, color: "var(--cream-muted)", textTransform: "uppercase", letterSpacing: 1 }}>Paid / Captured</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#8EE0A8", marginTop: 6 }}>
              {stats.paidOrders}
            </div>
          </div>
          <div style={{ background: "var(--forest-card)", border: "1px solid var(--forest-border)", borderRadius: "var(--radius-md)", padding: "20px" }}>
            <div style={{ fontSize: 12, color: "var(--cream-muted)", textTransform: "uppercase", letterSpacing: 1 }}>Average Order Value</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--gold-light)", marginTop: 6 }}>
              {formatINR(stats.aovPaise)}
            </div>
          </div>
        </div>

        {/* Tab Toggle */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
          <button
            type="button"
            className={`cat-pill ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            📋 Live Orders ({orders.length})
          </button>
          <button
            type="button"
            className={`cat-pill ${activeTab === "catalog" ? "active" : ""}`}
            onClick={() => setActiveTab("catalog")}
          >
            🍲 Catalog &amp; Daily Stock Controls
          </button>
        </div>

        {activeTab === "orders" ? (
          <div>
            {/* Filters & Search */}
            <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
              <input
                type="search"
                placeholder="Search orders by customer or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control"
                style={{ maxWidth: 360 }}
              />
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["all", "processing", "paid", "out_for_delivery", "delivered", "cancelled"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    className={`btn btn-sm btn-secondary ${filterStatus === st ? "active" : ""}`}
                    style={{ borderColor: filterStatus === st ? "var(--gold)" : "transparent" }}
                    onClick={() => setFilterStatus(st)}
                  >
                    {st.replace(/_/g, " ").toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div style={{ background: "var(--forest-card)", border: "1px solid var(--forest-border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 14 }}>
                <thead style={{ background: "rgba(4, 18, 11, 0.9)", borderBottom: "1px solid rgba(212, 175, 55, 0.2)" }}>
                  <tr>
                    <th style={{ padding: "14px 20px", color: "var(--gold-light)" }}>Order ID</th>
                    <th style={{ padding: "14px 20px", color: "var(--gold-light)" }}>Customer</th>
                    <th style={{ padding: "14px 20px", color: "var(--gold-light)" }}>Dishes</th>
                    <th style={{ padding: "14px 20px", color: "var(--gold-light)" }}>Amount</th>
                    <th style={{ padding: "14px 20px", color: "var(--gold-light)" }}>Status</th>
                    <th style={{ padding: "14px 20px", color: "var(--gold-light)", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((ord) => (
                    <tr key={ord.id || ord.order_number} style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                      <td style={{ padding: "16px 20px", fontWeight: 700, color: "var(--cream)" }}>
                        #{ord.order_number}
                        <div style={{ fontSize: 11, color: "var(--cream-muted)" }}>{ord.fulfilment_mode.toUpperCase()}</div>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <div>{ord.customer_name}</div>
                        <a href={`https://wa.me/91${ord.customer_phone}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "var(--gold)" }}>
                          📞 {ord.customer_phone}
                        </a>
                      </td>
                      <td style={{ padding: "16px 20px", fontSize: 13, color: "var(--cream-soft)" }}>
                        {ord.order_items?.map((i, idx) => (
                          <div key={idx}>• {i.quantity}x {i.name_snapshot}</div>
                        )) || "2x Heritage Specialties"}
                      </td>
                      <td style={{ padding: "16px 20px", fontWeight: 700, color: "var(--gold)" }}>
                        {formatINR(ord.total_paise)}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <span style={{ fontSize: 12, padding: "3px 8px", borderRadius: "var(--radius-full)", background: "rgba(212, 175, 55, 0.15)", color: "var(--gold-light)", textTransform: "uppercase" }}>
                          {ord.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                          {ord.status !== "processing" && (
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              style={{ padding: "4px 8px", fontSize: 11 }}
                              onClick={() => updateStatus(ord.order_number, "processing")}
                            >
                              Kitchen
                            </button>
                          )}
                          {ord.status !== "out_for_delivery" && (
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              style={{ padding: "4px 8px", fontSize: 11 }}
                              onClick={() => updateStatus(ord.order_number, "out_for_delivery")}
                            >
                              Dispatch
                            </button>
                          )}
                          {ord.status !== "delivered" && (
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              style={{ padding: "4px 8px", fontSize: 11 }}
                              onClick={() => updateStatus(ord.order_number, "delivered")}
                            >
                              Delivered
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div style={{ background: "var(--forest-card)", border: "1px solid var(--forest-border)", borderRadius: "var(--radius-lg)", padding: "24px" }}>
            <h3 style={{ marginBottom: 16 }}>Live Daily Kitchen Availability</h3>
            <p className="muted" style={{ marginBottom: 24, fontSize: 13.5 }}>
              Toggle dishes when ingredients run out or seasonal rasams sell out for the afternoon or evening service.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {menuItems.map((dish) => {
                const isAvailable = itemStock[dish.id] !== false;
                return (
                  <div
                    key={dish.id}
                    style={{
                      background: "rgba(4, 18, 11, 0.6)",
                      border: "1px solid rgba(212, 175, 55, 0.15)",
                      borderRadius: "var(--radius-md)",
                      padding: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{dish.name}</div>
                      <div style={{ fontSize: 12, color: "var(--gold)" }}>{formatINR(dish.pricePaise)}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleStock(dish.id)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "var(--radius-full)",
                        fontSize: 12,
                        fontWeight: 700,
                        background: isAvailable ? "rgba(46, 139, 87, 0.2)" : "rgba(211, 47, 47, 0.2)",
                        color: isAvailable ? "#8EE0A8" : "#FF8A80",
                        border: `1px solid ${isAvailable ? "#2E8B57" : "#D32F2F"}`
                      }}
                    >
                      {isAvailable ? "In Stock ✓" : "Sold Out ✗"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}