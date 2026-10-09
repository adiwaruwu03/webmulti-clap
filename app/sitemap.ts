import type { MetadataRoute } from "next";
import { posts } from "../lib/blog";
import { BASE, detailEvents } from "../lib/events";
import { services } from "../lib/services";
import { SITE_URL } from "../lib/site";

// Service pages with `index: true` in lib/services.ts are listed; event-space (placeholder) and virtual-office (no package details yet) are noindex and left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const latest = new Date(posts[0].date);
  return [
    { url: `${SITE_URL}/`, lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/atur-kunjungan`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}${BASE}`, changeFrequency: "monthly", priority: 0.8 },
    ...detailEvents.map((e) => ({ url: `${SITE_URL}${BASE}/${e.slug}`, changeFrequency: "yearly" as const, priority: 0.5 })),
    ...Object.values(services).filter((s) => s.index).map((s) => ({ url: `${SITE_URL}/layanan/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${SITE_URL}/blog`, lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
