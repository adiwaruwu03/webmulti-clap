"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Photo = { src: string; w: number; h: number };

/** Horizontal scroll-snap photo strip with previous/next buttons. Touch and trackpad scroll work natively. */
export default function RoomGallery({ photos, name }: { photos: Photo[]; name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ atStart: true, atEnd: photos.length < 2 });

  const sync = () => {
    const el = ref.current;
    if (!el) return;
    setPos({ atStart: el.scrollLeft < 8, atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  };
  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const btn =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-card/95 text-foreground shadow-md transition-all duration-300 hover:bg-foreground hover:text-background disabled:pointer-events-none disabled:opacity-0";

  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={sync}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-4"
        tabIndex={0}
        aria-label={name}
      >
        {photos.map((p, i) => (
          <div key={p.src} className="relative aspect-[3/2] w-[88%] shrink-0 snap-start overflow-hidden rounded-lg bg-secondary shadow-sm md:w-[62%] xl:w-[56%]">
            <Image
              src={p.src}
              alt={`${name}, foto ${i + 1}`}
              fill
              sizes="(min-width: 1280px) 40vw, (min-width: 768px) 55vw, 88vw"
              quality={85}
              className="object-cover"
              {...(i > 1 ? {} : { loading: "lazy" as const })}
            />
          </div>
        ))}
      </div>
      {photos.length > 1 && (
        <>
          <button type="button" aria-label="Foto sebelumnya" disabled={pos.atStart} onClick={() => go(-1)} className={`${btn} left-3`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button type="button" aria-label="Foto berikutnya" disabled={pos.atEnd} onClick={() => go(1)} className={`${btn} right-3`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </>
      )}
    </div>
  );
}
