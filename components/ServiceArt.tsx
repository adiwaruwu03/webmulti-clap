import type { ReactNode } from "react";

// Small flat illustrations for the home service cards (front view, brand colors via tokens).
// ink = outlines, tint = soft teal fill, pop = Brick Red accent.
const ink = "var(--teal-ink)";
const tint = "var(--primary)";
const pop = "var(--brick)";
const line = { fill: "none", stroke: ink, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const soft = { ...line, fill: tint, fillOpacity: 0.55 } as const;
const accent = { ...line, stroke: pop } as const;
const accentFill = { ...line, stroke: pop, fill: pop, fillOpacity: 0.85 } as const;

const art: Record<string, ReactNode> = {
  "coworking-space": (
    <>
      <path {...accent} d="M60 6v14" />
      <path {...accentFill} d="M48 30a12 10 0 0 1 24 0z" />
      <rect {...soft} x="14" y="58" width="92" height="9" rx="2" />
      <path {...line} d="M24 67v20M96 67v20" />
      <rect {...line} x="28" y="46" width="22" height="12" rx="1.5" />
      <rect {...line} x="70" y="46" width="22" height="12" rx="1.5" />
      <path {...line} d="M24 52h-6M102 52h-6" />
    </>
  ),
  "private-office": (
    <>
      <rect {...line} x="12" y="10" width="96" height="78" rx="3" />
      <path {...line} d="M12 74h96" />
      <rect {...soft} x="22" y="56" width="46" height="7" rx="1.5" />
      <path {...line} d="M28 63v11M62 63v11" />
      <rect {...line} x="36" y="36" width="20" height="14" rx="1.5" />
      <path {...line} d="M46 50v6" />
      <path {...accent} d="M84 74V54" />
      <path {...accentFill} d="M84 54c-8-2-10-10-8-14 8 0 12 6 8 14zM84 54c8-2 10-10 8-14-8 0-12 6-8 14z" />
      <path {...line} d="M79 74h10l-1.5 8h-7z" />
    </>
  ),
  "meeting-room": (
    <>
      <rect {...line} x="30" y="8" width="60" height="30" rx="2" />
      <path {...accent} d="M38 26l8-7 7 5 9-9 10 11" />
      <ellipse {...soft} cx="60" cy="68" rx="38" ry="12" />
      <circle {...line} cx="30" cy="52" r="5" />
      <circle {...line} cx="60" cy="48" r="5" />
      <circle {...line} cx="90" cy="52" r="5" />
      <circle {...line} cx="30" cy="86" r="5" />
      <circle {...line} cx="60" cy="90" r="5" />
      <circle {...line} cx="90" cy="86" r="5" />
    </>
  ),
  "event-space": (
    <>
      <rect {...soft} x="22" y="12" width="76" height="26" rx="2" />
      <path {...accentFill} d="M22 12c0 10-4 22-10 26h10zM98 12c0 10 4 22 10 26H98z" />
      <path {...line} d="M10 38h100" />
      <rect {...line} x="52" y="22" width="16" height="16" rx="1.5" />
      {[24, 40, 56, 72, 88].map((x) => (
        <rect key={`a${x}`} {...line} x={x} y="56" width="8" height="7" rx="2" />
      ))}
      {[18, 34, 50, 66, 82, 98].map((x) => (
        <rect key={`b${x}`} {...line} x={x} y="74" width="8" height="7" rx="2" />
      ))}
    </>
  ),
  "virtual-office": (
    <>
      <path {...accentFill} d="M60 4a8 8 0 0 1 8 8c0 6-8 14-8 14s-8-8-8-14a8 8 0 0 1 8-8z" />
      <circle cx="60" cy="12" r="2.6" fill="var(--card)" />
      <rect {...soft} x="34" y="38" width="52" height="48" rx="2" />
      {[44, 58, 72].map((x) => [48, 60, 72].map((y) => <rect key={`${x}${y}`} {...line} x={x} y={y} width="6" height="6" rx="1" />))}
      <path {...line} d="M26 86h68" />
      <path {...line} d="M16 52a8 8 0 0 1 4-14 10 10 0 0 1 18 2 7 7 0 0 1 0 12z" transform="translate(-2 4) scale(0.8)" />
    </>
  ),
  "event-management": (
    <>
      <rect {...soft} x="20" y="16" width="64" height="68" rx="4" />
      <path {...accentFill} d="M20 20a4 4 0 0 1 4-4h56a4 4 0 0 1 4 4v14H20z" />
      <path {...line} d="M36 10v12M68 10v12" />
      {[32, 46, 60].map((x) => [46, 60, 72].map((y) => <circle key={`${x}${y}`} cx={x + 4} cy={y} r="2" fill={ink} fillOpacity="0.55" />))}
      <circle {...accent} cx="86" cy="70" r="16" fill="var(--card)" />
      <path {...accent} d="M78 70l6 6 11-12" />
    </>
  ),
  "podcast-studio": (
    <>
      <rect {...soft} x="48" y="8" width="24" height="42" rx="12" />
      <path {...line} d="M54 22h12M54 30h12" />
      <path {...line} d="M38 38v6a22 22 0 0 0 44 0v-6" />
      <path {...line} d="M60 66v16M44 86h32" />
      <path {...accent} d="M22 28c-4 6-4 14 0 20M12 22c-8 10-8 22 0 32M98 28c4 6 4 14 0 20M108 22c8 10 8 22 0 32" />
    </>
  ),
};

export default function ServiceArt({ slug, className }: { slug: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 96" className={className} aria-hidden="true" focusable="false">
      {art[slug]}
    </svg>
  );
}
