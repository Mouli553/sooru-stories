import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { menuItems, formatINR, getProduct } from "@/lib/menu";
import DishAddToCart from "@/components/DishAddToCart";

export function generateStaticParams() {
  return menuItems.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getProduct(slug);
  if (!item) return { title: "Dish Not Found" };

  return {
    title: `${item.name} — ${item.category} | Sooru & Stories`,
    description: item.description,
    alternates: { canonical: `/menu/${item.slug}` },
    openGraph: {
      title: `${item.name} | Sooru & Stories`,
      description: item.description,
      images: [{ url: item.image, width: 800, height: 600, alt: item.name }]
    }
  };
}

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dish = getProduct(slug);
  if (!dish) notFound();

  // Find related dishes in same category
  const relatedDishes = menuItems
    .filter((i) => i.category === dish.category && i.id !== dish.id)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    "name": dish.name,
    "description": dish.description,
    "image": `https://sooru-stories.vercel.app${dish.image}`,
    "offers": {
      "@type": "Offer",
      "price": dish.pricePaise / 100,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "suitableForDiet": dish.vegetarian
      ? "https://schema.org/VegetarianDiet"
      : undefined
  };

  return (
    <div style={{ paddingTop: 110, minHeight: "85vh" }}>
      <div className="container" style={{ padding: "40px 24px 80px" }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 13, color: "var(--cream-muted)", marginBottom: 28 }}>
          <Link href="/" style={{ color: "var(--gold-light)" }}>← Home</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <Link href="/menu" style={{ color: "var(--gold-light)" }}>Menu</Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <Link href={`/menu?category=${encodeURIComponent(dish.category)}`} style={{ color: "var(--gold-light)" }}>
            {dish.category}
          </Link>
          <span style={{ margin: "0 8px" }}>/</span>
          <span style={{ color: "var(--cream)" }}>{dish.name}</span>
        </div>

        <div className="dish-detail-grid">
          {/* Media Column */}
          <div style={{ position: "relative" }}>
            <Image
              src={dish.image}
              alt={dish.name}
              width={650}
              height={450}
              priority
              style={{
                width: "100%",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--forest-border)",
                boxShadow: "var(--shadow-md)",
                objectFit: "cover"
              }}
            />
            <div style={{ position: "absolute", top: 18, left: 18, display: "flex", gap: 8 }}>
              <span className={`diet-badge ${dish.vegetarian ? "diet-veg" : "diet-nonveg"}`}>
                {dish.vegetarian ? "🌿 Pure Veg" : "🍗 Non-Veg"}
              </span>
              {dish.bestseller && (
                <span className="bestseller-badge">⭐ Bestseller</span>
              )}
            </div>
          </div>

          {/* Details Column */}
          <div>
            <div className="eyebrow">{dish.category}</div>
            <h1 style={{ fontSize: "clamp(32px, 4vw, 44px)", margin: "8px 0 14px" }}>
              {dish.name}
            </h1>
            <div style={{ fontSize: 26, fontWeight: 700, color: "var(--gold)", marginBottom: 18 }}>
              {formatINR(dish.pricePaise)}
            </div>

            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--cream-soft)", marginBottom: 20 }}>
              {dish.description}
            </p>

            {dish.story && (
              <div
                style={{
                  background: "rgba(212, 175, 55, 0.08)",
                  borderLeft: "3px solid var(--gold)",
                  padding: "16px 20px",
                  borderRadius: "0 var(--radius-md) var(--radius-md) 0",
                  marginBottom: 20
                }}
              >
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--gold)", fontWeight: 700, marginBottom: 4 }}>
                  📖 The Kitchen Story
                </div>
                <div style={{ fontSize: 14, color: "var(--cream)", fontStyle: "italic", lineHeight: 1.6 }}>
                  &ldquo;{dish.story}&rdquo;
                </div>
              </div>
            )}

            {dish.healthBenefits && (
              <div
                style={{
                  background: "rgba(46, 139, 87, 0.12)",
                  border: "1px solid rgba(46, 139, 87, 0.3)",
                  padding: "14px 18px",
                  borderRadius: "var(--radius-md)",
                  marginBottom: 20,
                  fontSize: 13.5,
                  color: "#B4E4C6"
                }}
              >
                🌿 <strong>Medicinal Wisdom:</strong> {dish.healthBenefits}
              </div>
            )}

            {/* Tags */}
            {dish.tags && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                {dish.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 12,
                      padding: "4px 10px",
                      borderRadius: "var(--radius-full)",
                      background: "rgba(255, 255, 255, 0.06)",
                      color: "var(--cream-muted)"
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* Add to Cart Component */}
            <DishAddToCart dish={dish} />

            <div style={{ marginTop: 24, fontSize: 13, color: "var(--cream-muted)", display: "flex", flexDirection: "column", gap: 8 }}>
              <div>⚡ <strong>Freshly Prepared:</strong> Simmered to order; delivered piping hot in insulated earth-friendly packs.</div>
              <div>📍 <strong>Service Area:</strong> Sathyamangalam, Gobichettipalayam, Erode, Coimbatore.</div>
            </div>
          </div>
        </div>

        {/* Pairing Suggestions */}
        {relatedDishes.length > 0 && (
          <div style={{ marginTop: 40, paddingTop: 40, borderTop: "1px solid rgba(212, 175, 55, 0.15)" }}>
            <div className="section-header" style={{ textAlign: "left", marginBottom: 30 }}>
              <div className="eyebrow">Complete Your Feast</div>
              <h2>Recommended From {dish.category}</h2>
            </div>
            <div className="product-grid">
              {relatedDishes.map((item) => (
                <article key={item.id} className="product-card">
                  <div className="product-card-media">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={360}
                      height={200}
                      className="product-card-img"
                    />
                    <span className={`diet-badge ${item.vegetarian ? "diet-veg" : "diet-nonveg"}`}>
                      {item.vegetarian ? "🌿 Veg" : "🍗 Non-Veg"}
                    </span>
                  </div>
                  <div className="product-card-body">
                    <h3 className="product-card-title">
                      <Link href={`/menu/${item.slug}`}>{item.name}</Link>
                    </h3>
                    <p className="product-card-desc">{item.description}</p>
                    <div className="product-card-footer">
                      <span className="card-price">{formatINR(item.pricePaise)}</span>
                      <Link href={`/menu/${item.slug}`} className="btn btn-primary btn-sm">
                        View Dish →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 60, textAlign: "center", display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <Link href="/menu" className="btn btn-secondary">
            ← Explore Full Menu
          </Link>
          <Link href="/" className="btn btn-secondary">
            ← Back to Home
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}