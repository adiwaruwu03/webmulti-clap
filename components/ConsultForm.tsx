"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { whatsappLink } from "../lib/contact";
import { useT } from "./Lang";

const inputClass =
  "w-full bg-background text-foreground placeholder:text-muted-foreground border border-input rounded-md px-4 py-3.5 outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-teal-ink/30";

export default function ConsultForm({ options }: { options: { value: string; label: string }[] }) {
  const t = useT();
  const [sent, setSent] = useState<string>();
  const spaceRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    // ?layanan=<value> preselects the workspace (used by the service pages' CTA)
    const pre = new URLSearchParams(window.location.search).get("layanan");
    if (pre && spaceRef.current && options.some((o) => o.value === pre)) spaceRef.current.value = pre;
  }, [options]);

  // No backend: build an Indonesian message and open WhatsApp (same flow as the old visit form)
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const space = options.find((o) => o.value === v("space"))?.label ?? v("space");
    const lines = [
      "Halo CLAPHAM.CO, saya ingin berkonsultasi.\n",
      `Ruang yang dicari: ${space}`,
      `Nama: ${v("name")}`,
      `Email: ${v("email")}`,
      `Telepon: +62${v("phone").replace(/^0+/, "")}`,
      v("company") && `Perusahaan: ${v("company")}`,
      v("details") && `Detail: ${v("details")}`,
    ].filter(Boolean);
    const url = whatsappLink(lines.join("\n"));
    setSent(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
      <select ref={spaceRef} name="space" defaultValue="" aria-label={t("Ruang kerja yang Anda cari", "Workspace you are looking for")} className={inputClass} required>
        <option value="" disabled>
          {t("Ruang kerja apa yang Anda cari?", "What workspace are you looking for?")}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <input name="name" type="text" autoComplete="name" placeholder={t("Nama Anda", "Your name")} aria-label={t("Nama Anda", "Your name")} className={inputClass} required />
      <input name="email" type="email" autoComplete="email" placeholder={t("Email perusahaan Anda", "Your company email")} aria-label={t("Email perusahaan Anda", "Your company email")} className={inputClass} required />
      <div className="flex gap-2">
        <span className={`${inputClass} !w-auto flex items-center text-foreground`}>+62</span>
        <input name="phone" type="tel" autoComplete="tel-national" placeholder={t("Nomor telepon Anda", "Your phone number")} aria-label={t("Nomor telepon Anda", "Your phone number")} className={inputClass} required />
      </div>
      <input name="company" type="text" autoComplete="organization" placeholder={t("Perusahaan Anda", "Your company")} aria-label={t("Perusahaan Anda", "Your company")} className={inputClass} />
      <textarea
        name="details"
        placeholder={t("Berikan detail ruang kerja yang Anda cari", "Describe the workspace you are looking for")}
        aria-label={t("Detail kebutuhan", "Your requirements")}
        rows={4}
        className={`${inputClass} resize-y`}
      />
      <button
        type="submit"
        className="group mt-2 w-full inline-flex items-center justify-center gap-2 bg-foreground text-background font-semibold text-base py-4 rounded-md shadow-md hover:shadow-xl hover:bg-teal-ink active:scale-[0.98] transition-all duration-300"
      >
        {t("Kirim via WhatsApp", "Send via WhatsApp")}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
      </button>
      {sent && (
        <p role="status" className="rounded-md bg-secondary px-4 py-3 text-center text-sm text-foreground">
          {t("Terima kasih! Jika WhatsApp tidak terbuka, ", "Thank you! If WhatsApp did not open, ")}
          <a href={sent} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-ink underline">
            {t("klik di sini", "click here")}
          </a>
          .
        </p>
      )}
    </form>
  );
}
