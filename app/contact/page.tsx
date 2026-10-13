"use client";

import React, { useState } from "react";
import Link from "next/link";
import { trackLead } from "@/lib/analytics";

const RESTAURANT_WHATSAPP = "919876543210";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("Catering Enquiry");
  const [guests, setGuests] = useState("20–50 Guests");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    let text = `🌾 *SOORU & STORIES — CATERING / INQUIRY* 🌾\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `👤 *Name:* ${name}\n`;
    text += `📞 *Phone:* ${phone}\n`;
    text += `📌 *Nature of Request:* ${type}\n`;
    text += `👥 *Estimated Party Size:* ${guests}\n`;
    if (message.trim()) {
      text += `💬 *Message:* ${message}\n`;
    }
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `Please get in touch with me regarding arrangements!`;

    trackLead("catering_enquiry", { type, guests });

    const whatsappUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(text)}`;
    setSubmitted(true);

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div style={{ paddingTop: 110, minHeight: "80vh" }}>
      <div className="container" style={{ padding: "40px 24px 80px", maxWidth: 1000 }}>
        <div style={{ fontSize: 13, color: "var(--cream-muted)", marginBottom: 20 }}>
          <Link href="/" style={{ color: "var(--gold-light)" }}>← Home</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--cream)" }}>Contact</span>
        </div>

        <div className="section-header" style={{ marginBottom: 40 }}>
          <div className="eyebrow">Direct Contact &amp; Catering</div>
          <h1>Get in Touch with Our Kitchen</h1>
          <p className="muted">
            Have questions about ingredients, bulk family catering, weekend banquets, or delivery coverage? 
            Our team is always delighted to assist you.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 40, alignItems: "start" }}>
          {/* Contact Details Card */}
          <div
            style={{
              background: "var(--forest-card)",
              border: "1px solid var(--forest-border)",
              borderRadius: "var(--radius-lg)",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: 22
            }}
          >
            <div>
              <div style={{ fontSize: 12, color: "var(--gold)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                Location &amp; Kitchen Hub
              </div>
              <div style={{ fontSize: 16, color: "var(--cream)", marginTop: 6 }}>
                Sooru &amp; Stories Kitchens<br />
                Sathyamangalam – Gobichettipalayam Road,<br />
                Erode District, Tamil Nadu – 638401
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, color: "var(--gold)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                Direct Hotline &amp; WhatsApp
              </div>
              <a
                href={`https://wa.me/${RESTAURANT_WHATSAPP}`}
                style={{ fontSize: 17, color: "var(--gold-light)", fontWeight: 700, marginTop: 4, display: "block" }}
              >
                +91 98765 43210 💬
              </a>
            </div>

            <div>
              <div style={{ fontSize: 12, color: "var(--gold)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                Operating Hours
              </div>
              <div style={{ fontSize: 14, color: "var(--cream-soft)", marginTop: 4 }}>
                <strong>Lunch Service:</strong> 12:00 PM – 3:30 PM<br />
                <strong>Dinner Service:</strong> 7:00 PM – 10:30 PM<br />
                <em>Open All 7 Days</em>
              </div>
            </div>

            <div style={{ padding: "16px", background: "rgba(212, 175, 55, 0.08)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--gold)", fontSize: 13, color: "var(--gold-shimmer)" }}>
              🍃 <strong>Event Catering:</strong> We provide authentic banana leaf feast catering for weddings, housewarmings, and corporate gatherings across Western Tamil Nadu.
            </div>
          </div>

          {/* Form Card */}
          <div
            style={{
              background: "var(--forest-card)",
              border: "1px solid var(--forest-border)",
              borderRadius: "var(--radius-lg)",
              padding: "32px"
            }}
          >
            <h3 style={{ fontSize: 22, marginBottom: 18 }}>Send an Inquiry</h3>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "30px 10px" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✨</div>
                <h4 style={{ fontSize: 20, color: "var(--gold)", marginBottom: 8 }}>
                  Thank you, {name}!
                </h4>
                <p className="muted" style={{ marginBottom: 20 }}>
                  We have forwarded your details to our kitchen team via WhatsApp. We will reply shortly.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Inquiry Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="form-control"
                  >
                    <option value="Catering Enquiry">Event Catering (Banana Leaf Feast)</option>
                    <option value="Table Booking">Large Table Reservation (8+ Guests)</option>
                    <option value="Ingredient & Allergen Question">Dietary / Allergen Question</option>
                    <option value="General Feedback">General Feedback</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Estimated Guest Count</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="form-control"
                  >
                    <option value="10–25 Guests">10–25 Guests</option>
                    <option value="25–50 Guests">25–50 Guests</option>
                    <option value="50–100 Guests">50–100 Guests</option>
                    <option value="100+ Guests">100+ Guests (Full Banquet)</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Details or Message</label>
                  <textarea
                    placeholder="Tell us about your event, preferred date, or special menu requests..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-control"
                    style={{ minHeight: 80 }}
                  />
                </div>

                <div className="form-group full-width">
                  <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 8 }}>
                    Submit Inquiry via WhatsApp 💬
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}