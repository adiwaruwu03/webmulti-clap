import Link from "next/link";
import Image from "next/image";
import { T } from "./Lang";

const linkClass = "text-muted-foreground hover:text-teal-ink transition-colors duration-300";
const headingClass = "text-xs font-semibold uppercase tracking-[0.25em] text-teal-ink";

const layananLinks = [
  { name: "Coworking Space", href: "/layanan/coworking-space" },
  { name: "Private Office", href: "/layanan/private-office" },
  { name: "Meeting Room", href: "/layanan/meeting-room" },
  { name: "Event Space", href: "/layanan/event-space" },
  { name: "Virtual Office", href: "/layanan/virtual-office" },
  { name: "Event Management Service", href: "/layanan/event-management" },
  { name: "Podcast Studio", href: "/layanan/podcast-studio" },
];

export default function Footer() {
  return (
    <footer className="dark bg-background text-foreground border-t border-border py-14">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Image
              src="/logo.nav/logo-clapham-white.png"
              alt="CLAPHAM.CO"
              width={180}
              height={50}
              className="h-9 w-auto object-contain mb-5"
            />
            <p className="mb-3 max-w-sm text-foreground/80">
              <T en="A calm, elegant, and secure workspace in the heart of Medan.">
                Ruang kerja yang tenang, elegan, dan aman di jantung kota Medan.
              </T>
            </p>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-5">
              Komp. Ruko Centre Point Medan, Jalan Timor Blok G No. III/IV,
              2nd Floor, Gang Buntu, Medan Timur, Medan City, North Sumatra 20231
            </p>
            <h3 className={`${headingClass} mb-2`}>
              <T en="Opening Hours">Jam Buka</T>
            </h3>
            <p className="text-sm text-muted-foreground">
              <T en="Monday–Friday, 09.00–17.00">Senin–Jumat, 09.00–17.00</T>
            </p>
          </div>
          <div>
            <h3 className={`${headingClass} mb-5`}>
              <T en="Services">Layanan</T>
            </h3>
            <ul className="space-y-3">
              {layananLinks.map((l) => (
                <li key={l.href}><Link href={l.href} className={linkClass}>{l.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={`${headingClass} mb-5`}>
              <T en="Links">Tautan</T>
            </h3>
            <ul className="space-y-3">
              <li><Link href="/" className={linkClass}>Home</Link></li>
              <li><Link href="/about" className={linkClass}><T en="About Us">Tentang Kami</T></Link></li>
              <li><Link href="/blog" className={linkClass}>Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className={`${headingClass} mb-5`}>
              <T en="Social Media">Sosial Media</T>
            </h3>
            <ul className="space-y-3">
              <li><a href="https://instagram.com/claphamco" target="_blank" rel="noopener noreferrer" className={linkClass}>Instagram</a></li>
              <li><a href="https://linktr.ee/claphamco" target="_blank" rel="noopener noreferrer" className={linkClass}>Linktree</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p className="max-w-3xl mx-auto mb-4 leading-relaxed">
            <T en="Find your ideal workspace with CLAPHAM.CO — offering a range of workspace options, including shared workspace, private offices, virtual offices, and meeting rooms in Medan.">
              Temukan ruang kerja ideal Anda bersama CLAPHAM.CO — menawarkan
              berbagai pilihan ruang kerja, termasuk ruang kerja bersama, kantor
              pribadi, kantor virtual, dan ruang meeting di Medan.
            </T>
          </p>
          <p>
            &copy; {new Date().getFullYear()} CLAPHAM.CO. <T en="All rights reserved.">Hak cipta dilindungi.</T>
          </p>
        </div>
      </div>
    </footer>
  );
}
