import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link href="/" className="brand" style={{ marginBottom: 14 }}>
              <div className="brand-title">
                Sooru <span>&amp;</span> Stories
              </div>
              <div className="brand-tagline">Good Food, Great Stories, Beautiful Memories</div>
            </Link>
            <p className="muted" style={{ maxWidth: 360, marginTop: 12 }}>
              Celebrating authentic South Indian culinary craftsmanship, homestyle Kongu &amp; Tamil heritage recipes, 
              ancient healing herbal rasams, and slow-cooked earthen feasts.
            </p>
            <div style={{ marginTop: 18, color: "var(--gold-light)", fontSize: 13 }}>
              📍 Sathyamangalam &amp; Coimbatore Region, Tamil Nadu
            </div>
          </div>

          <div className="footer-col">
            <h4>Explore Menu</h4>
            <ul className="footer-links">
              <li><Link href="/menu?category=Digest%20%26%20Eat">Digest &amp; Eat (8 Rasams)</Link></li>
              <li><Link href="/menu?category=Biryani%20%26%20Rice">Biryani &amp; Fragrant Rice</Link></li>
              <li><Link href="/menu?category=Signature%20Starters">Signature Starters</Link></li>
              <li><Link href="/menu?category=South%20Indian%20Specials">South Indian Specials</Link></li>
              <li><Link href="/menu?category=Refreshing%20Mocktails">Craft Mocktails &amp; Coolers</Link></li>
              <li><Link href="/menu?category=Artisanal%20Desserts">Heritage Desserts</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Guest Services</h4>
            <ul className="footer-links">
              <li><Link href="/#booking">Reserve a Table</Link></li>
              <li><Link href="/#story">Our Culinary Heritage</Link></li>
              <li><Link href="/#testimonials">Customer Reviews</Link></li>
              <li><Link href="/contact">Catering &amp; Bulk Orders</Link></li>
              <li><Link href="/faq">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Policies &amp; Orders</h4>
            <ul className="footer-links">
              <li><Link href="/delivery">Delivery &amp; Service Radius</Link></li>
              <li><Link href="/terms">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy">Privacy &amp; Data Security</Link></li>
              <li><Link href="/refunds">Cancellations &amp; Refunds</Link></li>
            </ul>
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 12, color: "var(--cream-muted)" }}>Direct WhatsApp Concierge:</div>
              <a 
                href="https://wa.me/919876543210?text=Hello%20Sooru%20%26%20Stories!%20I%20would%20like%20to%20enquire%20about%20ordering."
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--gold)", fontWeight: 700, fontSize: 14 }}
              >
                +91 98765 43210 💬
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Sooru &amp; Stories. Handcrafted with pride for food lovers.
          </div>
          <div>
            Pure ingredients · Authentic recipes · Zero artificial preservatives
          </div>
        </div>
      </div>
    </footer>
  );
}