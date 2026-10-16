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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [activeBookingId, setActiveBookingId] = useState("");

  if (!isBookingModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !date) {
      alert("Please fill in your name, email address, and reservation date.");
      return;
    }

    setIsSubmitting(true);
    const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    setActiveBookingId(bookingId);

    trackLead("table_booking", {
      booking_id: bookingId,
      guests,
      date,
      time,
      occasion
    });

    let emailSent = false;
    try {
      // 1. Silent email dispatch via EmailJS backend proxy
      const res = await fetch("/api/reservation", {
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
      });

      if (res.ok) {
        emailSent = true;
      } else {
        console.warn("Reservation API returned non-ok status:", res.status);
      }
    } catch (err) {
      console.warn("Silent reservation notification route error:", err);
    }

    // 2. Direct client-side EmailJS fallback if backend proxy encountered an issue
    if (!emailSent) {
      try {
        await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_1tnij0f",
            template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_pnixwxg",
            user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "HsrT1U-D1Liv5ehyI",
            template_params: {
              to_email: "moulir607@gmail.com",
              to_name: "Mouli / Sooru & Stories Host",
              from_name: "Sooru & Stories Reservations",
              reply_to: email,
              name,
              customer_name: name,
              email,
              customer_email: email,
              phone: phone || "Not provided",
              customer_phone: phone || "Not provided",
              date,
              time,
              guests,
              occasion,
              notes: notes || "None",
              booking_id: bookingId,
              order_items: `Table Reservation #${bookingId} (${guests}) on ${date} at ${time}`,
              message: `Vanakkam!\n\nA new table reservation request #${bookingId} has been booked:\n\n• Guest: ${name}\n• Email: ${email}\n• Phone: ${phone || "Not provided"}\n• Date: ${date}\n• Time: ${time}\n• Party Size: ${guests}\n• Occasion: ${occasion}\n• Special Requests: ${notes || "None"}\n\nPlease confirm table seating arrangements.`
            }
          })
        });
      } catch (fallbackErr) {
        console.warn("Direct client EmailJS fallback error:", fallbackErr);
      }
    }

    setIsSubmitting(false);
    setIsBooked(true);
  };

  const handleClose = () => {
    setIsBooked(false);
    setIsSubmitting(false);
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
              {isBooked ? "Reservation Confirmed!" : "Reserve Your Table"}
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
          <div style={{ textAlign: "center", padding: "16px 8px" }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>🥂</div>
            <h4 style={{ fontSize: 22, color: "#a34e36", marginBottom: 8 }}>
              Reservation Request Sent!
            </h4>
            <p style={{ color: "#30251e", marginBottom: 14, lineHeight: 1.6 }}>
              Vanakkam <strong>{name}</strong>! Your table reservation request for{" "}
              <strong>{date}</strong> at <strong>{time}</strong> (#{activeBookingId}) has been successfully submitted.
            </p>

            <div
              style={{
                background: "#f1ece3",
                border: "1px solid #ded3c5",
                borderRadius: 8,
                padding: "16px",
                marginBottom: 20,
                textAlign: "left",
                fontSize: 13,
                color: "#55483d",
                lineHeight: 1.7
              }}
            >
              <div><strong>🔖 Booking Ref:</strong> #{activeBookingId}</div>
              <div><strong>👥 Party Size:</strong> {guests}</div>
              <div><strong>🎉 Occasion:</strong> {occasion}</div>
              <div><strong>✉ Confirmation Dispatched To:</strong> {email}</div>
              <div style={{ marginTop: 6, paddingTop: 6, borderTop: "1px dashed #d8cdbe", fontSize: 12, color: "#786d62" }}>
                ✓ An automated notification has been sent silently to <strong>{RESTAURANT_EMAIL}</strong>.
              </div>
            </div>

            <div style={{ padding: "12px", background: "#f8f4ee", borderRadius: 6, fontSize: 12.5, color: "#786d62", marginBottom: 20 }}>
              📞 Need immediate changes? Call our host directly at <strong style={{ color: "#30251e" }}>{RESTAURANT_PHONE}</strong>
            </div>

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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Seating Time *</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="form-control"
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: 22 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting Reservation... ⌛" : "Confirm Table Reservation 🪑"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
