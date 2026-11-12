"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const STEP_MS = 2000;

/**
 * Photo row like the home partner marquee (several photos visible, endless loop), but it moves one photo every 2 s
 * instead of drifting, left to right (photos enter from the left). The list is rendered twice and the track starts on the second
 * copy; after sliding onto the first copy it jumps back to the second one unseen.
 * Pauses on hover/focus, when off-screen and in a hidden tab. Under reduced motion it never moves and can be scrolled by hand.
 */
export default function StepStrip({ photos, name }: { photos: { src: string; alt: string }[]; name: string }) {
  const box = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0); // 0 until mounted, then n..0 counting down
  const [jump, setJump] = useState(false); // true = reposition without animation
  const hold = useRef({ hover: false, visible: false });
  const n = photos.length;

  useEffect(() => {
    const el = box.current;
    if (!el || n < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const h = hold.current;
    setJump(true);
    setI(n); // start on the second copy (looks identical to the first)
    const io = new IntersectionObserver(([e]) => (h.visible = e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    const timer = setInterval(() => {
      if (h.visible && !h.hover && !document.hidden) {
        setJump(false);
        setI((v) => Math.max(0, v - 1));
      }
    }, STEP_MS);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [n]);

  const step = () => {
    const c = track.current?.children;
    return c && c.length > 1 ? (c[1] as HTMLElement).offsetLeft - (c[0] as HTMLElement).offsetLeft : 0;
  };

  // after sliding onto the first copy, snap back to the second copy (same pictures, so nothing visible changes)
  const onEnd = () => {
    if (i <= 0 && n > 1) {
      setJump(true);
      setI(n);
    }
  };

  return (
    <div
      ref={box}
      onMouseEnter={() => (hold.current.hover = true)}
      onMouseLeave={() => (hold.current.hover = false)}
      onFocus={() => (hold.current.hover = true)}
      onBlur={() => (hold.current.hover = false)}
      className="overflow-hidden motion-reduce:overflow-x-auto"
      tabIndex={0}
      aria-label={name}
    >
      <div
        ref={track}
        onTransitionEnd={onEnd}
        className={`flex gap-4 ${jump ? "" : "transition-transform duration-700 ease-in-out"} motion-reduce:!transform-none`}
        style={{ transform: `translateX(-${i * step()}px)` }}
      >
        {[...photos, ...photos].map((p, k) => (
          <div key={k} aria-hidden={k >= n} className="relative aspect-[3/2] w-[72%] shrink-0 overflow-hidden rounded-lg bg-secondary shadow-sm sm:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)]">
            <Image
              src={p.src}
              alt={k < n ? p.alt : ""}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 72vw"
              quality={90}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
