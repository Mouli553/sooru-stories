import type { MetadataRoute } from "next";
import { menuItems } from "@/lib/menu";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://sooru-stories.vercel.app";

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/menu`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/delivery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/refunds`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 }
  ];

  const productPages: MetadataRoute.Sitemap = menuItems.map((dish) => ({
    url: `${base}/menu/${dish.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85
  }));

  return [...staticPages, ...productPages];
}