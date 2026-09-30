import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CLAPHAM.CO - Coworking Space Medan",
  description: "Ruang kerja tenang dan elegan di jantung kota Medan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${quicksand.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
