import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LangProvider } from "../components/Lang";
import { SITE_URL } from "../lib/site";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const description =
  "Coworking space, private office, ruang meeting, event space, virtual office, dan studio podcast di Ruko Centre Point Medan. Tenang, fleksibel, dan aman.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "./" },
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
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Ruang kerja bersama CLAPHAM.CO di Medan" }],
  },
  twitter: { card: "summary_large_image" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "CLAPHAM.CO",
  alternateName: ["COHIVE at Clapham", "Clapham Collective"],
  url: SITE_URL,
  description,
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/logo.nav/logo-clapham-2.png`,
  telephone: "+62 61 80510977",
  areaServed: { "@type": "City", name: "Medan" },
  geo: { "@type": "GeoCoordinates", latitude: 3.5926181, longitude: 98.681436 },
  hasMap: "https://www.google.com/maps/place/COHIVE+at+Clapham/@3.5926181,98.681436,17z",
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
    <html lang="id" data-scroll-behavior="smooth" className={`${quicksand.variable} h-full antialiased`}>
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
