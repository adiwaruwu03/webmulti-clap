"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { T, useLang } from "./Lang";

const layananLinks = [
  { name: "Coworking Space", href: "/layanan/coworking-space" },
  { name: "Private Office", href: "/layanan/private-office" },
  { name: "Meeting Room", href: "/layanan/meeting-room" },
  { name: "Event Space", href: "/layanan/event-space" },
  { name: "Virtual Office", href: "/layanan/virtual-office" },
  { name: "Event Management Service", href: "/layanan/event-management" },
  { name: "Podcast Studio", href: "/layanan/podcast-studio" },
];

const underline =
  "relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-current after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLang();

  useEffect(() => {
    if (!isHome) return;
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const solid = !isHome || scrolled;
  const linkColor = solid ? "text-foreground/75 hover:text-teal-ink" : "text-white/85 hover:text-white";

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        solid
          ? "bg-card/85 backdrop-blur-xl border-b border-border shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div
        className={`container mx-auto px-4 md:px-6 flex items-center justify-between transition-all duration-500 ${
          solid ? "h-16" : "h-20"
        }`}
      >
        <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
          <Image
            src={solid ? "/logo.nav/logo-clapham-2.png" : "/logo.nav/logo-clapham-white.png"}
            alt="CLAPHAM.CO"
            width={180}
            height={50}
            loading="eager"
            fetchPriority="high"
            className={`w-auto object-contain transition-all duration-500 ${solid ? "h-7 md:h-8" : "h-8 md:h-9"}`}
          />
        </Link>

        <div className="flex items-center gap-2 text-sm sm:gap-3 font-medium md:gap-6 lg:gap-8">
          <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={`${underline} ${linkColor} transition-colors`}>
            Home
          </Link>

          <div className="relative group">
            <button className={`flex items-center gap-1 py-2 transition-colors ${linkColor}`}>
              <T en="Services">Layanan</T>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300">
              <div className="w-64 bg-popover text-popover-foreground border border-border rounded-lg shadow-xl p-2">
                {layananLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2.5 rounded-md text-sm text-foreground/80 hover:bg-secondary hover:text-teal-ink hover:pl-5 transition-all duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/about" className={`${underline} ${linkColor} transition-colors`}>
            <T en="About">Tentang</T>
          </Link>
          <Link href="/blog" className={`${underline} ${linkColor} transition-colors`}>
            Blog
          </Link>
          </div>

          <Link
            href="/atur-kunjungan"
            className={`whitespace-nowrap rounded-md px-2.5 py-2 text-xs sm:px-3 font-semibold transition-all duration-300 active:scale-[0.97] md:px-5 md:text-sm ${
              solid
                ? "bg-foreground text-background hover:bg-teal-ink"
                : "bg-white text-foreground hover:bg-primary"
            }`}
          >
            <T en="Schedule a Visit">Atur Kunjungan</T>
          </Link>

          <div
            role="group"
            aria-label="Language"
            className={`flex items-center rounded-full p-0.5 text-xs font-semibold transition-colors duration-500 ${
              solid ? "bg-foreground/5" : "bg-white/15"
            }`}
          >
            {(["id", "en"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-2 py-1 sm:px-3 uppercase tracking-wider transition-colors duration-300 ${
                  lang === l
                    ? "bg-primary text-primary-foreground"
                    : solid
                      ? "text-foreground/80 hover:text-foreground"
                      : "text-white/80 hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
