"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "rest" | "start" | "roll" | "restart";

const CYCLES = 2; // full 0-9 turns before landing
const STRIP = Array.from({ length: 10 * (CYCLES + 1) }, (_, i) => i % 10);
const ROLL_MS = 1700;
const STAGGER_MS = 170;
const REPLAY_MS = 9000;

type Props = {
  /** Display value such as "2016", "300+", "10K+". Every digit becomes a rolling reel; other characters stay. */
  value: string;
  className?: string;
};

/**
 * Slot-machine / odometer digits. Each digit reel spins from 0 to its value when scrolled into view, then re-spins every
 * few seconds while visible so the numbers stay alive. Server render and prefers-reduced-motion show the final value.
 */
export default function Odometer({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<Phase>("rest");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = false;
    let pending = true; // a (re)play is waiting for the element to be visible
    let timer: ReturnType<typeof setTimeout> | undefined;
    let raf1 = 0;
    let raf2 = 0;
    let first = true;

    const play = () => {
      pending = false;
      setPhase(first ? "start" : "restart");
      first = false;
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setPhase("roll"));
      });
      timer = setTimeout(() => {
        pending = true;
        if (visible) play();
      }, REPLAY_MS);
    };

    setPhase("start"); // zeros until the first time the element is visible
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && pending) play();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [value]);

  let reel = 0;
  return (
    <span ref={ref} className={className} role="img" aria-label={value}>
      <span aria-hidden className="inline-flex">
        {value.split("").map((ch, i) => {
          if (!/\d/.test(ch)) return <span key={i}>{ch}</span>;
          const d = Number(ch);
          const idx = reel++;
          const pos = phase === "start" ? 0 : phase === "restart" ? d : 10 * CYCLES + d;
          const animate = phase === "roll";
          return (
            <span key={i} className="relative inline-block h-[1em] leading-none [clip-path:inset(0_-0.4em)]">
              {/* invisible final digit sets the reel width, so spacing matches a normal number */}
              <span className="invisible block h-[1em] leading-none">{d}</span>
              <span
                className="absolute left-0 top-0 flex flex-col will-change-transform"
                style={{
                  transform: `translateY(-${pos}em)`,
                  transition: animate ? `transform ${ROLL_MS + idx * STAGGER_MS}ms cubic-bezier(0.16, 0.84, 0.3, 1)` : "none",
                }}
              >
                {STRIP.map((n, k) => (
                  <span key={k} className="block h-[1em] leading-none">
                    {n}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
