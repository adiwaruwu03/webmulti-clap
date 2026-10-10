"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mounts its children only when the placeholder gets within `margin` of the viewport. Used for the partner marquee so its
 * ~60 logo images are not requested during the first paint (they would compete with the logo and hero for bandwidth).
 * The placeholder keeps the final height, so nothing shifts when the content appears.
 */
export default function LazyMount({ children, className, margin = "1500px" }: { children: ReactNode; className?: string; margin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: `${margin} 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return (
    <div ref={ref} className={className}>
      {show ? children : null}
    </div>
  );
}
