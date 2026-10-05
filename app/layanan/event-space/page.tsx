import type { Metadata } from "next";

// Placeholder page: noindex until real content exists (remove `robots` and add to app/sitemap.ts then).
export const metadata: Metadata = {
  title: "Event Space di Medan",
  description: "Event space fleksibel di Medan untuk workshop, seminar, peluncuran produk, dan pertemuan komunitas.",
  robots: { index: false, follow: true },
};

import { T } from "@/components/Lang";

export default function EventSpacePage() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold capitalize text-gray-900"><T en="Event Space Page">Halaman Event Space</T></h1>
    </main>
  );
}
