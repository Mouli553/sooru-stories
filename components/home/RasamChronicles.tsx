"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { menuItems, formatINR } from "@/lib/menu";

export default function RasamChronicles() {
  const { addToCart } = useCart();
  const rasams = menuItems.filter((i) => i.category === "Digest & Eat");

  return (
    <section className="section rasam-spotlight" id="rasam">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">The Rasam Chronicles</div>
          <h2>Digest &amp; Eat — 8 Ancient Herbal Healing Elixirs</h2>
          <p className="muted">
            In traditional South Indian dining, Rasam is never just a soup—it is the culinary climax 
            of a feast, engineered over millennia to restore gut flora, ignite agni (digestive fire), 
            and heal the senses with hand-ground herbs and pepper.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 36, alignItems: "center", marginBottom: 40 }}>
          <div style={{ position: "relative" }}>
            <Image
              src="/images/rasam-chronicles.jpg"
              alt="Steaming Traditional South Indian Rasam in Brass Bowl"
              width={420}
              height={320}
              style={{
                width: "100%",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--gold)",
                boxShadow: "var(--shadow-md)"
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                right: 16,
                background: "rgba(4, 18, 11, 0.88)",
                backdropFilter: "blur(10px)",
                padding: "12px 16px",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(212, 175, 55, 0.3)"
              }}
            >
              <div style={{ fontSize: 13, color: "var(--gold)", fontWeight: 700 }}>
                🍵 The Ancient Earthenware Secret
              </div>
              <div style={{ fontSize: 12, color: "var(--cream-muted)" }}>
                Simmered in authentic eeya chombu (tin vessel) &amp; clay pots for rich, velvety mineral depth.
              </div>
            </div>
          </div>

          <div className="rasam-grid">
            {rasams.map((r, index) => (
              <div key={r.id} className="rasam-card">
                <div className="rasam-number">ELIXIR #{index + 1}</div>
                <h3 className="rasam-name">{r.name}</h3>
                <p className="muted" style={{ fontSize: 13, marginBottom: 8 }}>
                  {r.description}
                </p>
                {r.healthBenefits && (
                  <div className="rasam-benefit">
                    🌿 <strong>Wellness:</strong> {r.healthBenefits}
                  </div>
                )}
                <div className="rasam-footer">
                  <span className="card-price" style={{ fontSize: 18 }}>
                    {formatINR(r.pricePaise)}
                  </span>
                  <button
                    type="button"
                    className="add-cart-btn"
                    onClick={() => addToCart(r)}
                  >
                    <span>+</span> Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
