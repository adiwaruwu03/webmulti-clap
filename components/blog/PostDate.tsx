"use client";

import { useLang } from "../Lang";

const ID = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function PostDate({ iso, className }: { iso: string; className?: string }) {
  const { lang } = useLang();
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  const text = lang === "en" ? `${EN[m - 1]} ${d}, ${y}` : `${d} ${ID[m - 1]} ${y}`;
  return (
    <time dateTime={iso} className={className}>
      {text}
    </time>
  );
}
