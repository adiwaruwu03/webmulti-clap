import type { Metadata } from "next";

// Placeholder page: noindex until real content exists (remove `robots` and add to app/sitemap.ts then).
export const metadata: Metadata = {
  title: "Coworking Space di Medan",
  description: "Coworking space fleksibel dan nyaman di Ruko Centre Point Medan untuk individu, startup, dan tim.",
  robots: { index: false, follow: true },
};

import { T } from "@/components/Lang";

export default function CoworkingSpacePage() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold capitalize text-gray-900"><T en="Coworking Space Page">Halaman Coworking Space</T></h1>
    </main>
  );
}
