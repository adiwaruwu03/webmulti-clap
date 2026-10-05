import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LangProvider } from "../components/Lang";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const description =
  "CLAPHAM.CO menyediakan coworking space, private office, ruang meeting, event space, virtual office, dan studio podcast di Ruko Centre Point Medan. Ruang kerja fleksibel, tenang, dan aman.";

export const metadata: Metadata = {
  title: {
    default: "CLAPHAM.CO - Coworking Space & Sewa Kantor di Medan",
    template: "%s | CLAPHAM.CO",
  },
  description,
  keywords: [
    "coworking space Medan",
    "sewa kantor Medan",
    "private office Medan",
    "ruang meeting Medan",
    "virtual office Medan",
    "event space Medan",
    "studio podcast Medan",
    "CLAPHAM.CO",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "CLAPHAM.CO",
    title: "CLAPHAM.CO - Coworking Space & Sewa Kantor di Medan",
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "CLAPHAM.CO",
  description,
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Komp. Ruko Centre Point Medan, Jalan Timor Blok G No. III/IV, 2nd Floor, Gang Buntu",
    addressLocality: "Medan Timur, Medan",
    addressRegion: "Sumatera Utara",
    postalCode: "20231",
    addressCountry: "ID",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  sameAs: ["https://instagram.com/claphamco", "https://linktr.ee/claphamco"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${quicksand.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LangProvider>
          <Navbar />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
