import type { Metadata } from "next";
import ContactSection from "../../components/ContactSection";

// Route stays /atur-kunjungan (existing links and sitemap); the page itself is "Kontak Kami".
export const metadata: Metadata = {
  title: "Kontak Kami",
  description:
    "Hubungi CLAPHAM.CO di Ruko Centre Point Medan. Isi formulir singkat dan tim kami akan membantu Anda menemukan ruang kerja atau layanan yang tepat.",
  alternates: { canonical: "/atur-kunjungan" },
};

export default function ContactPage() {
  return <ContactSection asPage />;
}
