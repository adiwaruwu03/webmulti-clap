import type { Metadata } from "next";

// Placeholder page: noindex until real content exists (remove `robots` and add to app/sitemap.ts then).
export const metadata: Metadata = {
  title: "Podcast Studio di Medan",
  description: "Studio podcast nyaman di Medan dengan perangkat audio siap pakai.",
  robots: { index: false, follow: true },
};

import { T } from "@/components/Lang";

export default function PodcastStudioPage() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold capitalize text-gray-900"><T en="Podcast Studio Page">Halaman Podcast Studio</T></h1>
    </main>
  );
}
