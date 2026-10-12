"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { T } from "./Lang";
import Reveal from "./Reveal";
import Odometer from "./Odometer";

const images = ["/about/clapham-1.webp", "/about/clapham-2.webp", "/about/clapham-3.webp"];

const stats = [
  { value: "2016", id: "Berdiri Sejak", en: "Founded" },
  { value: "300+", id: "Event Terselenggara", en: "Events Hosted" },
  { value: "100+", id: "Brand Partner", en: "Brand Partners" },
  { value: "10K+", id: "Peserta Event", en: "Event Participants" },
];

const arrow = "absolute top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-foreground/55 text-background transition-colors hover:bg-foreground/80";

/** "Tentang Clapham Collective": story text left, 3D photo slider right, stats row below (layout of the old clpaham-page). */
export default function AboutClapham({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const [cur, setCur] = useState(0);
  const n = images.length;
  const Heading = heading;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setCur((c) => (c + 1) % n), 5000);
    return () => clearInterval(t);
  }, [n]);

  return (
    <section className="overflow-x-clip bg-card py-24">
      <Reveal />
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="rv">
            <Heading className="font-heading text-3xl font-semibold leading-tight tracking-wide text-foreground md:text-4xl">
              <T en={<>About <span className="text-brick">Clapham Collective</span></>}>
                Tentang <span className="text-brick">Clapham Collective</span>
              </T>
            </Heading>
            <div className="mt-8 space-y-5 text-lg leading-loose text-muted-foreground md:text-justify">
              <p>
                <T en="Since 2016, Clapham Collective has served as a collaborative space and event ecosystem based in Medan. Starting as a coworking space, we have grown into a strategic partner for brands, organizations, and communities aiming to create meaningful experiences.">
                  Sejak 2016, Clapham Collective telah hadir sebagai ruang kolaborasi dan ekosistem event yang berbasis di Medan. Berawal dari sebuah coworking space, kami berkembang menjadi mitra strategis bagi brand, organisasi, dan komunitas yang ingin menciptakan pengalaman bermakna.
                </T>
              </p>
              <p>
                <T en="We believe every event is an opportunity to build connections, inspire audiences, and deliver real impact. Our philosophy is simple: design with purpose, execute with precision, and always collaborate as partners.">
                  Kami percaya bahwa setiap event adalah kesempatan untuk membangun koneksi, menginspirasi audiens, dan menghasilkan dampak nyata. Filosofi kami sederhana: merancang dengan tujuan, mengeksekusi dengan presisi, dan selalu berkolaborasi sebagai partner.
                </T>
              </p>
              <p>
                <T en="With experience managing hundreds of events from intimate gatherings to large conferences, we understand that success lies in careful attention to detail and strategic planning.">
                  Dengan pengalaman mengelola ratusan event dari skala intim hingga konferensi besar, kami memahami bahwa kesuksesan terletak pada detail dan strategi yang matang.
                </T>
              </p>
            </div>
          </div>

          <div
            className="rv relative mx-auto aspect-[4/3] w-full max-w-lg py-8 [--dx:25%] [perspective:1200px] sm:aspect-[16/9] md:[--dx:60px]"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {images.map((src, idx) => {
              const off = (idx - cur + n) % n;
              const transform =
                off === 0
                  ? "translateX(0) scale(1) rotateY(0deg)"
                  : off === 1
                    ? "translateX(var(--dx)) scale(0.85) rotateY(-15deg)"
                    : "translateX(calc(var(--dx) * -1)) scale(0.85) rotateY(15deg)";
              return (
                <div
                  key={src}
                  aria-hidden={off !== 0}
                  className="absolute inset-0 transition-all duration-700 ease-out"
                  style={{ transform, zIndex: 30 - off * 10, opacity: off > 1 ? 0.3 : 1 }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-lg shadow-xl">
                    <Image
                      src={src}
                      alt="Clapham Collective coworking space"
                      fill
                      sizes="(min-width: 1024px) 40vw, 90vw"
                      quality={80}
                      className="object-cover"
                      priority={idx === 0}
                    />
                  </div>
                </div>
              );
            })}
            <button type="button" onClick={() => setCur((c) => (c - 1 + n) % n)} className={`${arrow} left-3`} aria-label="Foto sebelumnya">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button type="button" onClick={() => setCur((c) => (c + 1) % n)} className={`${arrow} right-3`} aria-label="Foto berikutnya">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m9 18 6-6-6-6" /></svg>
            </button>
            <div className="absolute -bottom-2 left-1/2 z-40 flex -translate-x-1/2 gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCur(idx)}
                  aria-label={`Foto ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${idx === cur ? "w-8 bg-primary" : "w-6 bg-border hover:bg-muted-foreground/50"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 text-center md:grid-cols-4">
          {stats.map((st) => (
            <div key={st.id}>
              <dd className="font-heading text-4xl font-semibold tracking-wide text-foreground md:text-5xl">
                <Odometer value={st.value} />
              </dd>
              <dt className="mt-2 text-sm font-medium text-muted-foreground">
                <T en={st.en}>{st.id}</T>
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
