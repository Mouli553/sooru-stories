"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function Footer() {
  const { openBookingModal } = useCart();

  return (
    <footer className="site-footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Heritage */}
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

          {/* Column 2: Explore Menu (All verified query routes) */}
          <div className="footer-col">
            <h4>Explore Menu</h4>
            <ul className="footer-links">
              <li><Link href="/menu?category=Digest%20%26%20Eat">Digest &amp; Eat (8 Rasams)</Link></li>
              <li><Link href="/menu?category=Signature%20Starters">Signature Starters</Link></li>
              <li><Link href="/menu?category=Signature%20Non-Veg">Signature Non-Veg</Link></li>
              <li><Link href="/menu?category=Biryani%20%26%20Rice">Biryani &amp; Fragrant Rice</Link></li>
              <li><Link href="/menu?category=South%20Indian%20Specials">South Indian Specials</Link></li>
              <li><Link href="/menu?category=Modern%20Fusion">Modern Fusion</Link></li>
              <li><Link href="/menu?category=Mocktails">Craft Mocktails &amp; Coolers</Link></li>
              <li><Link href="/menu?category=Desserts">Heritage Desserts</Link></li>
            </ul>
          </div>

          {/* Column 3: Guest Services */}
          <div className="footer-col">
            <h4>Guest Services</h4>
            <ul className="footer-links">
              <li>
                <button
                  type="button"
                  className="footer-btn-link"
                  onClick={openBookingModal}
                >
                  Reserve a Table
                </button>
              </li>
              <li><Link href="/#story">Our Culinary Heritage</Link></li>
              <li><Link href="/#testimonials">Customer Reviews</Link></li>
              <li><Link href="/contact">Catering &amp; Bulk Orders</Link></li>
              <li><Link href="/faq">Frequently Asked Questions</Link></li>
              <li><Link href="/track">Track Live Order</Link></li>
              <li><Link href="/account">My Account &amp; Past Orders</Link></li>
              <li><Link href="/admin">Kitchen Operations &amp; Admin</Link></li>
            </ul>
          </div>

          {/* Column 4: Policies & Orders */}
          <div className="footer-col">
            <h4>Policies &amp; Orders</h4>
            <ul className="footer-links">
              <li><Link href="/delivery">Delivery &amp; Service Radius</Link></li>
              <li><Link href="/terms">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy">Privacy &amp; Data Security</Link></li>
              <li><Link href="/refunds">Cancellations &amp; Refunds</Link></li>
            </ul>
            <div style={{ marginTop: 22, paddingTop: 14, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <div style={{ fontSize: 11.5, color: "var(--cream-muted)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                Kitchen Desk &amp; Helpline
              </div>
              <a 
                href="tel:9384638754"
                style={{ color: "var(--gold-light)", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
              >
                📞 +91 93846 38754
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