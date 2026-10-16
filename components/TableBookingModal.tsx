"use client";

import React, { useState } from "react";
import { useCart } from "@/lib/cart";
import { trackLead } from "@/lib/analytics";

const RESTAURANT_EMAIL = "moulir607@gmail.com";
const RESTAURANT_PHONE = "+91 93846 38754";

export default function TableBookingModal() {
  const { isBookingModalOpen, closeBookingModal } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("7:30 PM");
  const [guests, setGuests] = useState("2 Guests");
  const [occasion, setOccasion] = useState("Family Dinner");
  const [notes, setNotes] = useState("");
  const [isBooked, setIsBooked] = useState(false);
  const [activeBookingId, setActiveBookingId] = useState("");
  const [activeMailto, setActiveMailto] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isBookingModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !date) {
      alert("Please fill in your name, email address, and reservation date.");
      return;
    }

    const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    setActiveBookingId(bookingId);

    const subject = `Table Reservation Request #${bookingId} — ${name}`;
    let body = `Vanakkam Sooru & Stories,\n\n`;
    body += `I would like to request a table reservation with the following details:\n\n`;
    body += `━━━━━━━━━━━━━━━━━━━━━\n`;
    body += `• Booking Reference: #${bookingId}\n`;
    body += `• Guest Name: ${name}\n`;
    body += `• Email: ${email}\n`;
    body += `• Contact Phone: ${phone || "Provided on request"}\n`;
    body += `• Reservation Date: ${date}\n`;
    body += `• Seating Time: ${time}\n`;
    body += `• Party Size: ${guests}\n`;
    body += `• Occasion: ${occasion}\n`;
    if (notes.trim()) {
      body += `• Special Notes / Dietary: ${notes}\n`;
    }
    body += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    body += `Kindly confirm table availability.\n\n`;
    body += `Warm regards,\n${name}`;

    trackLead("table_booking", {
      booking_id: bookingId,
      guests,
      date,
      time,
      occasion
    });

    const mailtoUrl = `mailto:${RESTAURANT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setActiveMailto(mailtoUrl);

    // Call reservation API in background
    try {
      fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          name,
          email,
          phone,
          date,
          time,
          guests,
          occasion,
          notes
        })
      }).catch((err) => console.warn("Background reservation notification error:", err));
    } catch (err) {
      console.warn("Reservation API dispatch skipped:", err);
    }

    setIsBooked(true);

    // Open user's email client
    if (typeof window !== "undefined") {
      window.location.href = mailtoUrl;
    }
  };

  const handleCopyDetails = () => {
    const details = `Table Reservation #${activeBookingId}\nGuest: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date} at ${time}\nGuests: ${guests}\nOccasion: ${occasion}${notes ? `\nNotes: ${notes}` : ""}\nSent to: ${RESTAURANT_EMAIL}`;
    navigator.clipboard?.writeText(details).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handleClose = () => {
    setIsBooked(false);
    setCopied(false);
    closeBookingModal();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <div className="modal-header">
          <div>
            <div className="eyebrow">Table Reservation</div>
            <h3 id="booking-modal-title">
              {isBooked ? "Reservation Request Prepared!" : "Reserve Your Table"}
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

        {isBooked ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 52, marginBottom: 14 }}>🥂</div>
            <h4 style={{ fontSize: 22, color: "#a34e36", marginBottom: 8 }}>
              Reservation Details Prepared!
            </h4>
            <p style={{ color: "#42352c", marginBottom: 12, lineHeight: 1.6 }}>
              Vanakkam <strong>{name}</strong>! Your table reservation request for{" "}
              <strong>{date}</strong> at <strong>{time}</strong> (#{activeBookingId}) has been generated.
            </p>
            <p className="muted" style={{ fontSize: 13, marginBottom: 22, lineHeight: 1.5 }}>
              Your email client should open automatically addressed to <strong>{RESTAURANT_EMAIL}</strong>. If it didn&apos;t open, click below to send or copy details.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              <a
                href={activeMailto}
                className="btn btn-primary"
                style={{ width: "100%", textDecoration: "none" }}
              >
                Open Email Client ✉
              </a>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ width: "100%" }}
                onClick={handleCopyDetails}
              >
                {copied ? "✓ Copied to Clipboard!" : "Copy Reservation Details 📋"}
              </button>
            </div>

            <div style={{ padding: "12px", background: "#f1ece3", borderRadius: 6, fontSize: 12.5, color: "#786d62", marginBottom: 20 }}>
              📞 Immediate Assistance Hotline: <strong style={{ color: "#30251e" }}>{RESTAURANT_PHONE}</strong>
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: "100%" }}
              onClick={handleClose}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="muted" style={{ fontSize: 13.5, marginBottom: 20 }}>
              Enjoy our warm banana leaf hospitality, slow-cooked feast dishes, and personalized service.
            </p>

            <div className="booking-form">
              <div className="form-group">
                <label className="form-label">Guest Name *</label>
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
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Phone</label>
                <input
                  type="tel"
                  placeholder="e.g. 9384638754"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Reservation Date *</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Seating Time *</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="form-control"
                >
                  <option value="12:30 PM">12:30 PM (Lunch)</option>
                  <option value="1:30 PM">1:30 PM (Lunch)</option>
                  <option value="7:00 PM">7:00 PM (Dinner)</option>
                  <option value="7:30 PM">7:30 PM (Dinner)</option>
                  <option value="8:30 PM">8:30 PM (Dinner)</option>
                  <option value="9:15 PM">9:15 PM (Late Dinner)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Number of Guests *</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="form-control"
                >
                  <option value="1-2 Guests">1–2 Guests (Intimate Table)</option>
                  <option value="3-4 Guests">3–4 Guests (Family Table)</option>
                  <option value="5-6 Guests">5–6 Guests (Feast Table)</option>
                  <option value="7-10 Guests">7–10 Guests (Large Group)</option>
                  <option value="12+ Guests">12+ Guests (Private Dining)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Occasion</label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="form-control"
                >
                  <option value="Family Dinner">Family Dinner</option>
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Business Lunch">Business / Team Meal</option>
                  <option value="Casual Gathering">Casual Foodie Trip</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label className="form-label">Special Dietary or Seating Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Traditional banana leaf seating preferred, high chair needed"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: 22 }}
            >
              Reserve Table via Email ✉
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
