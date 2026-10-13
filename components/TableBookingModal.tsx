"use client";

import React, { useState } from "react";
import { useCart } from "@/lib/cart";
import { trackLead } from "@/lib/analytics";

const RESTAURANT_WHATSAPP = "919876543210";

export default function TableBookingModal() {
  const { isBookingModalOpen, closeBookingModal } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("7:30 PM");
  const [guests, setGuests] = useState("2 Guests");
  const [occasion, setOccasion] = useState("Family Dinner");
  const [notes, setNotes] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  if (!isBookingModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date) {
      alert("Please fill in your name, phone number, and reservation date.");
      return;
    }

    const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;

    let message = `🪑 *SOORU & STORIES — TABLE RESERVATION* 🪑\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🔖 *Booking Ref:* #${bookingId}\n`;
    message += `👤 *Guest Name:* ${name}\n`;
    message += `📞 *Phone:* ${phone}\n`;
    message += `📅 *Date:* ${date}\n`;
    message += `⏰ *Time Slot:* ${time}\n`;
    message += `👥 *Party Size:* ${guests}\n`;
    message += `🎉 *Occasion:* ${occasion}\n`;
    if (notes.trim()) {
      message += `📝 *Special Requests:* ${notes}\n`;
    }
    message += `━━━━━━━━━━━━━━━━━━━━━\n`;
    message += `🙏 _Please confirm table availability!_`;

    trackLead("table_booking", {
      booking_id: bookingId,
      guests,
      date,
      time,
      occasion
    });

    const whatsappUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(message)}`;

    setIsBooked(true);

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank");
    }
  };

  const handleClose = () => {
    setIsBooked(false);
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
              {isBooked ? "Reservation Sent!" : "Reserve Your Table"}
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
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🥂</div>
            <h4 style={{ fontSize: 22, color: "var(--gold)", marginBottom: 8 }}>
              Reservation Request Received!
            </h4>
            <p style={{ color: "var(--cream-soft)", marginBottom: 12 }}>
              We look forward to welcoming you, <strong>{name}</strong>, on{" "}
              <strong>{date}</strong> at <strong>{time}</strong>.
            </p>
            <p className="muted" style={{ fontSize: 13, marginBottom: 24 }}>
              WhatsApp has opened with your table details. The host will confirm your seating within minutes!
            </p>
            <button
              type="button"
              className="btn btn-primary"
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
              Reserve Table on WhatsApp 💬
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
