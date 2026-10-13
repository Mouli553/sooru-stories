"use client";

import React from "react";
import { trackLead } from "@/lib/analytics";

const RESTAURANT_WHATSAPP = "919876543210";

export default function FloatingWhatsApp() {
  const handleClick = () => {
    trackLead("whatsapp_chat", { source: "floating_button" });
    const text = encodeURIComponent(
      "Vanakkam Sooru & Stories! I would like to explore today's specials and place an order."
    );
    window.open(`https://wa.me/${RESTAURANT_WHATSAPP}?text=${text}`, "_blank");
  };

  return (
    <div
      className="floating-whatsapp"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Order on WhatsApp"
      title="Direct WhatsApp Concierge"
    >
      <span style={{ fontSize: 20 }}>💬</span>
      <span>Order on WhatsApp</span>
    </div>
  );
}
