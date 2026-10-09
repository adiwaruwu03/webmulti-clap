"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { useT } from "../Lang";

const D = "/layanan/Event-Management-Service";
const slides = [
  { src: `${D}/hero-event-1.webp`, id: "Above and Beyond Open House", en: "Above and Beyond Open House" },
  { src: `${D}/hero-event-2.webp`, id: "Above and Beyond Seminar", en: "Above and Beyond Seminar" },
  { src: `${D}/hero-event-3.webp`, id: "Clapham Conference", en: "Clapham Conference" },
  { src: `${D}/hero-event-4.webp`, id: "Community Creative Gathering", en: "Community Creative Gathering" },
  { src: `${D}/hero-event-5.webp`, id: "Brand Experience Festival", en: "Brand Experience Festival" },
  { src: `${D}/hero-event-6.webp`, id: "Active Democracy", en: "Active Democracy" },
];

export default function HeroCarousel({ children }: { children: ReactNode }) {
  const t = useT();
  const [cur, setCur] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setCur((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative -mt-16 flex min-h-svh items-center overflow-hidden bg-black">
      {slides.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.en}
          fill
          sizes="100vw"
          quality={80}
          {...(i === 0 ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
          className={`object-cover transition-opacity duration-1000 ${i === cur ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />

      <div className="container relative mx-auto max-w-7xl px-4 pb-24 pt-32 text-white">{children}</div>

      <div className="absolute bottom-6 left-0 right-0">
        <div className="container mx-auto flex max-w-7xl items-center gap-4 px-4">
          <div className="flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-label={t(s.id, s.en)}
                aria-current={i === cur}
                onClick={() => setCur(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === cur ? "w-8 bg-white" : "w-4 bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>
          <span className="hidden text-sm font-medium text-white/80 sm:block">{t(slides[cur].id, slides[cur].en)}</span>
        </div>
      </div>
    </section>
  );
}
