import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Sooru & Stories",
  description: "Find answers about our 8 rasams, ingredients, catering orders, and delivery at Sooru & Stories."
};

const faqs = [
  {
    q: "What makes Sooru & Stories different from other South Indian restaurants?",
    a: "We avoid modern commercial shortcuts like artificial coloring, MSG, and processed gravies. We slow-cook in clay pots, use single-origin cold-pressed oils, pure A2 country ghee, and offer our signature 8 medicinal herbal rasams inspired by ancient Kongu and Siddha culinary heritage."
  },
  {
    q: "Are the 8 Rasams vegetarian and healthy?",
    a: "Yes! All 8 of our traditional rasams are 100% vegetarian. Each recipe features therapeutic botanicals like Mudakathan (balloon vine for joint health), Moringa / Murunga Keerai (iron-rich), Kollu (horse gram for metabolism), and Milagu (pepper for respiratory wellness)."
  },
  {
    q: "How does the WhatsApp ordering process work?",
    a: "Simply add your favorite dishes to the cart and proceed to checkout. When you submit your details, an instant formatted order receipt is generated, and WhatsApp opens automatically connecting you directly to our kitchen dispatch team. No login or app downloads required!"
  },
  {
    q: "Can I pay online using UPI or Google Pay?",
    a: "Yes! You can choose 'Pay Online (UPI / Card)' at checkout or opt for 'Cash on Delivery / Pay on Pickup'. For online payments, you can instantly scan or pay via GPay, PhonePe, Paytm, or net banking upon confirmation."
  },
  {
    q: "Do you offer bulk catering for family functions and weddings?",
    a: "Yes, we specialize in authentic traditional banana leaf catering for parties of 15 to 300+ guests across Coimbatore, Tirupur, Erode, and Sathyamangalam. Contact us via our Catering Inquiry form or WhatsApp to customize your menu."
  },
  {
    q: "How can I book a table in advance?",
    a: "You can click 'Book a Table' on our website, select your preferred date, time, and guest count, and receive instant confirmation directly from our host."
  }
];

export default function FAQPage() {
  return (
    <div style={{ paddingTop: 110, minHeight: "80vh" }}>
      <div className="container" style={{ padding: "40px 24px 80px", maxWidth: 860 }}>
        <div style={{ fontSize: 13, color: "var(--cream-muted)", marginBottom: 20 }}>
          <Link href="/" style={{ color: "var(--gold-light)" }}>← Home</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--cream)" }}>FAQ</span>
        </div>

        <div className="section-header" style={{ textAlign: "left", marginBottom: 36 }}>
          <div className="eyebrow">Got Questions?</div>
          <h1>Frequently Asked Questions</h1>
          <p className="muted">Everything you need to know about our food, traditions, and service.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                background: "var(--forest-card)",
                border: "1px solid var(--forest-border)",
                borderRadius: "var(--radius-lg)",
                padding: "24px 28px"
              }}
            >
              <h3 style={{ fontSize: 18, color: "var(--gold-light)", marginBottom: 10 }}>
                {faq.q}
              </h3>
              <p className="muted" style={{ fontSize: 14.5, lineHeight: 1.7 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: "center" }}>
          <p className="muted" style={{ marginBottom: 16 }}>Have a question that is not answered here?</p>
          <Link href="/contact" className="btn btn-secondary">
            Chat with Our Kitchen on WhatsApp 💬
          </Link>
        </div>
      </div>
    </div>
  );
}