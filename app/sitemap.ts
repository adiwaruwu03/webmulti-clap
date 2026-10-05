import type { MetadataRoute } from "next";
import { posts } from "../lib/blog";
import { SITE_URL } from "../lib/site";

// Service pages (/layanan/*) are placeholders and noindex, so they are left out until they have content.
export default function sitemap(): MetadataRoute.Sitemap {
  const latest = new Date(posts[0].date);
  return [
    { url: `${SITE_URL}/`, lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/atur-kunjungan`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
