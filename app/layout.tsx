import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import OrderModal from "@/components/OrderModal";
import TableBookingModal from "@/components/TableBookingModal";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ToastContainer from "@/components/ToastContainer";
import SpiceCanvas from "@/components/SpiceCanvas";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sooru-stories.vercel.app"),
  title: {
    default: "Sooru & Stories | Good Food, Great Stories, Beautiful Memories",
    template: "%s | Sooru & Stories"
  },
  description:
    "Experience authentic South Indian clay pot feasts, 8 traditional herbal rasams, fragrant Seeraga Samba biryanis, and homestyle hospitality in Tamil Nadu.",
  keywords: [
    "Sooru and Stories",
    "South Indian Restaurant",
    "Tamil Nadu Cuisine",
    "8 Traditional Rasams",
    "Ambur Biryani",
    "Kongu Nadu Food",
    "Sathyamangalam Food Delivery",
    "Coimbatore Food",
    "Medicinal Rasam",
    "Pure Ghee Dosa"
  ],
  authors: [{ name: "Sooru & Stories Culinary Team" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sooru-stories.vercel.app",
    siteName: "Sooru & Stories",
    title: "Sooru & Stories | Good Food, Great Stories, Beautiful Memories",
    description:
      "Authentic South Indian culinary heritage, 8 traditional healing rasams, slow-cooked biryanis & homestyle feasts.",
    images: [
      {
        url: "/images/hero-feast.jpg",
        width: 1200,
        height: 630,
        alt: "Sooru & Stories Grand South Indian Feast"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sooru & Stories | Good Food, Great Stories",
    description: "Authentic South Indian clay pot feasts, 8 herbal rasams, and fragrant biryanis.",
    images: ["/images/hero-feast.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Sooru & Stories",
    "image": "https://sooru-stories.vercel.app/images/hero-feast.jpg",
    "description": "Authentic South Indian dining and cloud kitchen specializing in 8 traditional herbal rasams and slow-cooked regional feasts.",
    "servesCuisine": ["South Indian", "Tamil", "Chettinad", "Kongu"],
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "11:30",
        "closes": "22:30"
      }
    ],
    "hasMenu": "https://sooru-stories.vercel.app/menu"
  };

  return (
    <html lang="en-IN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <CartProvider>
          <SpiceCanvas />
          <Header />
          <main id="main-content">{children}</main>
          <CartDrawer />
          <OrderModal />
          <TableBookingModal />
          <FloatingWhatsApp />
          <ToastContainer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}