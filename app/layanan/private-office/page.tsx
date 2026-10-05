import type { Metadata } from "next";

// Placeholder page: noindex until real content exists (remove `robots` and add to app/sitemap.ts then).
export const metadata: Metadata = {
  title: "Private Office di Medan",
  description: "Private office tenang dan lengkap di Medan untuk tim yang butuh fokus tanpa gangguan.",
  robots: { index: false, follow: true },
};

import { T } from "@/components/Lang";

export default function PrivateOfficePage() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold capitalize text-gray-900"><T en="Private Office Page">Halaman Private Office</T></h1>
    </main>
  );
}
