import { Fragment } from "react";
import Link from "next/link";
import { whatsappLink } from "../../lib/contact";

const WA_MESSAGE = "Halo CLAPHAM.CO, saya tertarik dengan layanan ruang kerja Anda.";

/** Renders [text](url), ***bold italic***, **bold** and *italic* markers as elements (no raw HTML). `wa:` links open WhatsApp. */
export default function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, to] = link;
          const cls = "font-medium text-teal-ink underline underline-offset-2 hover:text-foreground";
          if (to === "wa:")
            return <a key={i} href={whatsappLink(WA_MESSAGE)} target="_blank" rel="noopener noreferrer" className={cls}><Rich text={label} /></a>;
          if (to.startsWith("/"))
            return <Link key={i} href={to} className={cls}><Rich text={label} /></Link>;
          return <a key={i} href={to} target="_blank" rel="noopener noreferrer" className={cls}><Rich text={label} /></a>;
        }
        if (part.startsWith("***") && part.endsWith("***") && part.length > 6)
          return <strong key={i} className="font-semibold text-foreground"><em>{part.slice(3, -3)}</em></strong>;
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4)
          return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
