"use client";

import { useEffect } from "react";

/**
 * Scroll reveal as on the old clpaham-page: elements with `.rv` fade and rise 40px over 0.8 s once they are 15% visible
 * (time-based, plays once; unlike `.reveal`, which is tied to scroll position). Mount once per page.
 */
export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("rv-on");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("rv-active");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.classList.remove("rv-on");
    };
  }, []);
  return null;
}
