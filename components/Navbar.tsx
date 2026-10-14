"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
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

type NavKey = "home" | "layanan" | "about" | "blog";
const activeKey = (path: string): NavKey | null =>
  path === "/" ? "home" : path.startsWith("/layanan") ? "layanan" : path.startsWith("/about") ? "about" : path.startsWith("/blog") ? "blog" : null;

export default function Navbar() {
  const pathname = usePathname();
  // pages whose first section is a full-screen photo: nav starts transparent and turns solid on scroll
  const isHome = pathname === "/" || pathname === "/layanan/event-management";
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const active = activeKey(pathname);

  // Sliding indicator under the current section's link
  const barRef = useRef<HTMLDivElement>(null);
  const items = useRef<Partial<Record<NavKey, HTMLElement | null>>>({});
  const [bar, setBar] = useState<{ x: number; w: number } | null>(null);
  const [barReady, setBarReady] = useState(false);

  useLayoutEffect(() => {
    const measure = () => {
      const el = active && items.current[active];
      setBar(el ? { x: el.offsetLeft, w: el.offsetWidth } : null);
    };
    measure();
    const holder = barRef.current?.parentElement;
    if (!holder) return;
    const ro = new ResizeObserver(measure); // fires when labels change width (ID/EN) or the window resizes
    ro.observe(holder);
    return () => ro.disconnect();
  }, [active, lang]);

  // enable the slide transition only after the first placement, so the bar does not fly in from the left on load
  useEffect(() => {
    if (bar && !barReady) {
      const id = requestAnimationFrame(() => setBarReady(true));
      return () => cancelAnimationFrame(id);
    }
  }, [bar, barReady]);

  // close the Layanan drawer whenever the route changes
  useEffect(() => setMenuOpen(false), [pathname]);

  const closeMenu = () => {
    setMenuOpen(false);
    (document.activeElement as HTMLElement | null)?.blur(); // keyboard focus must not keep it open
  };
  const on = (k: NavKey) => (active === k ? (solid ? "!text-foreground" : "!text-white") : "");

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
          <div className="relative hidden md:flex items-center gap-8">
          <div
            ref={barRef}
            aria-hidden
            className={`pointer-events-none absolute -bottom-1.5 left-0 h-0.5 rounded-full ${solid ? "bg-brick" : "bg-white"} ${
              barReady ? "transition-[transform,width,opacity,background-color] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" : ""
            }`}
            style={{ width: bar?.w ?? 0, transform: `translateX(${bar?.x ?? 0}px)`, opacity: bar ? 1 : 0 }}
          />
          <Link
            href="/"
            ref={(el) => void (items.current.home = el)}
            aria-current={active === "home" ? "page" : undefined}
            className={`${active === "home" ? "" : underline} ${linkColor} ${on("home")} transition-colors`}
          >
            Home
          </Link>

          <div
            ref={(el) => void (items.current.layanan = el)}
            className="relative"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
            onFocus={() => setMenuOpen(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMenuOpen(false);
            }}
            onKeyDown={(e) => e.key === "Escape" && closeMenu()}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className={`flex items-center gap-1 py-2 transition-colors ${linkColor} ${on("layanan")}`}
            >
              <T en="Services">Layanan</T>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 ${
                menuOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 translate-y-2"
              }`}
            >
              <div className="w-64 bg-popover text-popover-foreground border border-border rounded-lg shadow-xl p-2">
                {layananLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`block px-4 py-2.5 rounded-md text-sm hover:bg-secondary hover:text-teal-ink hover:pl-5 transition-all duration-200 ${
                      pathname === link.href ? "bg-secondary/70 font-semibold text-teal-ink" : "text-foreground/80"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/about"
            ref={(el) => void (items.current.about = el)}
            aria-current={active === "about" ? "page" : undefined}
            className={`${active === "about" ? "" : underline} ${linkColor} ${on("about")} transition-colors`}
          >
            <T en="About">Tentang</T>
          </Link>
          <Link
            href="/blog"
            ref={(el) => void (items.current.blog = el)}
            aria-current={active === "blog" ? "page" : undefined}
            className={`${active === "blog" ? "" : underline} ${linkColor} ${on("blog")} transition-colors`}
          >
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
            <T en="Contact Us">Kontak Kami</T>
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
