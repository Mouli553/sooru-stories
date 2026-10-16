"use client";

import React, { useState, useEffect, useRef } from "react";
import { trackLead } from "@/lib/analytics";

const RESTAURANT_WHATSAPP = "919384638754";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const sendWhatsAppMessage = (text: string, actionLabel: string) => {
    trackLead("whatsapp_chat", { source: actionLabel });
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${RESTAURANT_WHATSAPP}?text=${encoded}`, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="wa-concierge-container" ref={dropdownRef}>
      {/* Interactive Concierge Popover */}
      {isOpen && (
        <div className="wa-concierge-popover" role="dialog" aria-label="Kitchen WhatsApp Concierge">
          <div className="wa-popover-header">
            <div className="wa-avatar-ring">
              <span className="wa-avatar-icon">👨‍🍳</span>
              <span className="wa-online-indicator" />
            </div>
            <div>
              <div className="wa-popover-title">Kitchen Concierge</div>
              <div className="wa-popover-subtitle">Sooru &amp; Stories · Typically replies instantly</div>
            </div>
            <button
              type="button"
              className="wa-popover-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close concierge"
            >
              ✕
            </button>
          </div>

          <div className="wa-popover-body">
            <p className="wa-bubble-msg">
              Vanakkam! 🙏 How may our kitchen team serve your feast today?
            </p>

            <div className="wa-quick-actions">
              <button
                type="button"
                className="wa-action-btn"
                onClick={() =>
                  sendWhatsAppMessage(
                    "Vanakkam Sooru & Stories! I would like to explore today's hot specials and place an order.",
                    "order_food_quick"
                  )
                }
              >
                <span>🍲</span>
                <div className="wa-action-text">
                  <strong>Order Fresh Feast</strong>
                  <small>Clay pot biryani, 8 healing rasams &amp; starters</small>
                </div>
              </button>

              <button
                type="button"
                className="wa-action-btn"
                onClick={() =>
                  sendWhatsAppMessage(
                    "Vanakkam Sooru & Stories! I'd like to reserve a dining table for a traditional banana leaf feast.",
                    "reserve_table_quick"
                  )
                }
              >
                <span>🪑</span>
                <div className="wa-action-text">
                  <strong>Reserve Dining Table</strong>
                  <small>Traditional banana leaf table for family &amp; friends</small>
                </div>
              </button>

              <button
                type="button"
                className="wa-action-btn"
                onClick={() =>
                  sendWhatsAppMessage(
                    "Vanakkam! We have an upcoming family celebration / corporate event and need catering pricing & options.",
                    "catering_quick"
                  )
                }
              >
                <span>📦</span>
                <div className="wa-action-text">
                  <strong>Bulk / Catering Orders</strong>
                  <small>Kongu &amp; Chettinad feasts for 20–500 guests</small>
                </div>
              </button>

              <button
                type="button"
                className="wa-action-btn highlight"
                onClick={() =>
                  sendWhatsAppMessage(
                    "Vanakkam Sooru & Stories! I have a question regarding the menu and delivery.",
                    "direct_chat_quick"
                  )
                }
              >
                <span>💬</span>
                <div className="wa-action-text">
                  <strong>Chat Directly on WhatsApp</strong>
                  <small>Direct line to +91 93846 38754</small>
                </div>
              </button>
            </div>
          </div>

          <div className="wa-popover-footer">
            <span>🛡️ Powered by WhatsApp Business Hotline: <strong>+91 93846 38754</strong></span>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <aside
        className="wa-circle-glide-trigger"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        aria-label="Order on WhatsApp via Kitchen Concierge"
        title="Direct Kitchen WhatsApp Concierge"
      >
        <div className="wa-circle-icon-badge">
          <svg
            className="wa-icon"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          <span className="wa-pulse-dot" />
        </div>

        <div className="wa-glide-label">
          <span className="wa-glide-eyebrow">Kitchen Concierge · Online</span>
          <span className="wa-glide-title">Order on WhatsApp →</span>
        </div>
      </aside>
    </div>
  );
}
