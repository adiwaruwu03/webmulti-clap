import type { Metadata } from "next";

// Placeholder page: noindex until real content exists (remove `robots` and add to app/sitemap.ts then).
export const metadata: Metadata = {
  title: "Virtual Office di Medan",
  description: "Virtual office dengan alamat bisnis profesional di Ruko Centre Point Medan.",
  robots: { index: false, follow: true },
};

import { T } from "@/components/Lang";

export default function VirtualOfficePage() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold capitalize text-gray-900"><T en="Virtual Office Page">Halaman Virtual Office</T></h1>
    </main>
  );
}
