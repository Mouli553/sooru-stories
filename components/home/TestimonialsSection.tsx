import React from "react";

const testimonials = [
  {
    name: "Karthikeyan S.",
    location: "Coimbatore",
    avatar: "K",
    rating: "★★★★★",
    quote:
      "The Ambur Royal Biryani with Seeraga Samba rice took me straight back to grandmother's Sunday feasts. The delicate spices and sheer tenderness of the chicken were pure perfection."
  },
  {
    name: "Priya Sundaram",
    location: "Erode",
    avatar: "P",
    rating: "★★★★★",
    quote:
      "Their Milagu and Kollu Parupu Rasams are absolute medicine in a cup. When seasonal weather shifts, their Digest & Eat rasam selection has become our family's go-to comfort elixir."
  },
  {
    name: "Dr. Natarajan K.",
    location: "Sathyamangalam",
    avatar: "N",
    rating: "★★★★★",
    quote:
      "As a physician, finding authentic regional dining with genuine cold-pressed oils, zero food coloring, and medicinal greens like Mudakathan is truly rare. Extraordinary care in every dish."
  },
  {
    name: "Anandhi M.",
    location: "Tirupur",
    avatar: "A",
    rating: "★★★★★",
    quote:
      "Ordered a weekend dinner spread for 12 guests. From the crispy Vazhaipoo cutlets to Madurai Fire Chicken and Jigarthanda, every guest was mesmerized. The WhatsApp order updates made it seamless."
  }
];

export default function TestimonialsSection() {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <div className="eyebrow">Guest Experiences</div>
          <h2>Stories from Our Table</h2>
          <p className="muted">
            Over 15,000 satisfied guests across Coimbatore, Erode, Sathyamangalam, and beyond. 
            Here is what food enthusiasts have to say.
          </p>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((t, idx) => (
            <div key={idx} className="testimonial-card">
              <div className="test-stars">{t.rating}</div>
              <p className="test-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="test-author">
                <div className="author-avatar">{t.avatar}</div>
                <div>
                  <div className="author-name">{t.name}</div>
                  <div className="author-loc">📍 {t.location} · Verified Patron</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
