"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { BASE, eventTypes, events, hasDetail, typeLabel, type EventItem } from "../../lib/events";
import { T, useLang, useT } from "../Lang";

const PAGE = 9;
const pill = "inline-block rounded-full bg-primary/40 px-3 py-1 text-xs font-semibold text-foreground";
const navBtn =
  "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-md transition hover:bg-white/20";

function Lightbox({ items, index, onIndex }: { items: EventItem[]; index: number | null; onIndex: (i: number | null) => void }) {
  const t = useT();
  const open = index !== null;
  const total = items.length;
  const go = (d: number) => onIndex(((index ?? 0) + d + total) % total);

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onIndex(null);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = prev;
    };
  });

  const cur = index !== null ? items[index] : undefined;
  if (!cur) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={cur.name} className="fixed inset-0 z-[100] bg-black/90 p-4" onClick={() => onIndex(null)}>
      <button type="button" aria-label={t("Tutup", "Close")} onClick={() => onIndex(null)} className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl text-white transition hover:bg-white/20">
        ✕
      </button>
      {total > 1 && (
        <>
          <button type="button" aria-label={t("Foto sebelumnya", "Previous photo")} onClick={(e) => { e.stopPropagation(); go(-1); }} className={`${navBtn} left-4`}>‹</button>
          <button type="button" aria-label={t("Foto berikutnya", "Next photo")} onClick={(e) => { e.stopPropagation(); go(1); }} className={`${navBtn} right-4`}>›</button>
        </>
      )}
      <div className="relative mx-auto h-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <Image key={cur.slug} src={cur.image} alt={cur.name} fill sizes="100vw" quality={90} className="object-contain" />
      </div>
      <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-sm text-white">{cur.name}</p>
    </div>
  );
}

export default function EventGrid() {
  const { lang } = useLang();
  const [type, setType] = useState("all");
  const [all, setAll] = useState(false);
  const [box, setBox] = useState<number | null>(null);

  const list = useMemo(() => (type === "all" ? events : events.filter((e) => e.type === type)), [type]);
  const shown = all ? list : list.slice(0, PAGE);
  const photos = useMemo(() => shown.filter((e) => !hasDetail(e)), [shown]);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {["all", ...eventTypes].map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={type === k}
            onClick={() => { setType(k); setAll(false); }}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              type === k ? "bg-foreground text-background" : "bg-secondary text-foreground hover:bg-primary/60"
            }`}
          >
            {k === "all" ? <T en="All">Semua</T> : typeLabel[k][lang]}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
        {shown.map((e, i) => {
          const card = (
            <>
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={e.image}
                  alt={e.name}
                  fill
                  sizes="(min-width: 768px) 30vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-4 md:p-6">
                <span className={pill}>{typeLabel[e.type][lang]}</span>
                <h3 className="mt-3 font-heading text-base font-semibold leading-snug tracking-wide text-card-foreground transition-colors group-hover:text-brick md:text-lg">
                  {e.name}
                </h3>
              </div>
            </>
          );
          const cls = "group block h-full overflow-hidden rounded-lg border border-border bg-card text-left shadow-xs transition-all duration-500 hover:-translate-y-1.5 hover:border-brick/40 hover:shadow-xl";
          return (
            <div key={e.slug} className="reveal" style={{ "--i": i % 3 } as CSSProperties}>
              {hasDetail(e) ? (
                <Link href={`${BASE}/${e.slug}`} className={cls}>{card}</Link>
              ) : (
                <button type="button" onClick={() => setBox(photos.indexOf(e))} className={`${cls} w-full`}>{card}</button>
              )}
            </div>
          );
        })}
      </div>

      {list.length > PAGE && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setAll(!all)}
            className="rounded-full border border-border bg-card px-8 py-3 text-sm font-semibold text-foreground shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            {all ? <T en="Show Fewer">Tampilkan Lebih Sedikit</T> : <T en="Show All Events">Lihat Semua Event</T>}
          </button>
        </div>
      )}

      <Lightbox items={photos} index={box} onIndex={setBox} />
    </>
  );
}
