"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLang, useT } from "./Lang";
import { whatsappLink } from "../lib/contact";

const inputClass =
  "w-full bg-background text-foreground placeholder:text-muted-foreground border border-input rounded-md px-4 py-3.5 outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-teal-ink/30";

const TIMES = Array.from({ length: 16 }, (_, i) => {
  const h = 9 + Math.floor(i / 2);
  return `${String(h).padStart(2, "0")}:${i % 2 ? "30" : "00"}`;
});

const MONTHS_ID = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

const STARTS = [
  { id: "Segera", en: "As soon as possible" },
  { id: "Dalam 1 bulan", en: "Within 1 month" },
  { id: "1–3 bulan lagi", en: "In 1–3 months" },
  { id: "Lebih dari 3 bulan lagi", en: "More than 3 months from now" },
  { id: "Belum pasti", en: "Not sure yet" },
];

type Option = { value: string; label: string };

export default function BookingForm({ options }: { options: Option[] }) {
  const t = useT();
  const { lang } = useLang();
  const [people, setPeople] = useState(1);
  const [minDate, setMinDate] = useState<string>();
  const [sent, setSent] = useState<string>();
  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const d = new Date();
    setMinDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
  }, []);

  const checkWeekday = () => {
    const el = dateRef.current;
    if (!el) return;
    const day = el.value ? new Date(`${el.value}T00:00:00`).getDay() : 1;
    el.setCustomValidity(
      day === 0 || day === 6 ? t("Kami buka Senin–Jumat. Pilih hari kerja.", "We are open Monday–Friday. Please pick a weekday.") : "",
    );
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const [y, m, d] = v("date").split("-").map(Number);
    const space = options.find((o) => o.value === v("space"))?.label ?? v("space");
    const lines = [
      "Halo CLAPHAM.CO, saya ingin mengatur kunjungan.\n",
      `Nama: ${v("name")}`,
      `Email: ${v("email")}`,
      `Telepon: +62${v("phone").replace(/^0+/, "")}`,
      v("company") && `Perusahaan: ${v("company")}`,
      `Ruang yang diminati: ${space}`,
      `Tanggal kunjungan: ${d} ${MONTHS_ID[m - 1]} ${y}`,
      `Waktu: ${v("time")}`,
      v("start") && `Rencana mulai: ${v("start")}`,
      `Jumlah orang: ${people}`,
      v("needs") && `Keperluan: ${v("needs")}`,
    ].filter(Boolean);
    const url = whatsappLink(lines.join("\n"));
    setSent(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <input name="name" type="text" autoComplete="name" required aria-label={t("Nama Anda", "Your name")} placeholder={t("Nama Anda", "Your name")} className={inputClass} />
      <input name="email" type="email" autoComplete="email" required aria-label={t("Email perusahaan Anda", "Your company email")} placeholder={t("Email perusahaan Anda", "Your company email")} className={inputClass} />

      <div className="flex gap-2">
        <span className={`${inputClass} !w-auto flex items-center text-foreground`}>+62</span>
        <input name="phone" type="tel" inputMode="tel" autoComplete="tel-national" required pattern="[0-9\s\-]{7,15}" aria-label={t("Nomor telepon Anda", "Your phone number")} placeholder={t("Nomor telepon Anda", "Your phone number")} className={inputClass} />
      </div>
      <input name="company" type="text" autoComplete="organization" aria-label={t("Perusahaan Anda", "Your company")} placeholder={t("Perusahaan Anda", "Your company")} className={inputClass} />

      <select name="space" defaultValue="" required aria-label={t("Ruang kerja yang diminati", "Workspace of interest")} className={`${inputClass} md:col-span-2`}>
        <option value="" disabled>{t("Ruang kerja apa yang Anda minati?", "Which workspace are you interested in?")}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <div className="md:col-span-2 border-t border-border pt-5">
        <p className="mb-1 font-semibold text-foreground">{t("Kapan Anda ingin berkunjung?", "When would you like to visit?")}</p>
        <p className="text-sm text-muted-foreground">{t("Kami buka Senin–Jumat, 09.00–17.00.", "We are open Monday–Friday, 09.00–17.00.")}</p>
      </div>

      <input
        ref={dateRef}
        name="date"
        type="date"
        required
        min={minDate}
        onChange={checkWeekday}
        lang={lang}
        aria-label={t("Tanggal kunjungan", "Visit date")}
        className={inputClass}
      />
      <select name="time" defaultValue="" required aria-label={t("Waktu kunjungan", "Visit time")} className={inputClass}>
        <option value="" disabled>{t("Pilih waktu", "Choose a time")}</option>
        {TIMES.map((x) => (
          <option key={x} value={x}>{x}</option>
        ))}
      </select>

      <select name="start" defaultValue="" aria-label={t("Rencana mulai menggunakan", "Planned start")} className={inputClass}>
        <option value="" disabled>{t("Rencana mulai menggunakan", "When do you plan to start?")}</option>
        {STARTS.map((s) => (
          <option key={s.id} value={s.id}>{t(s.id, s.en)}</option>
        ))}
      </select>

      <div className={`${inputClass} !p-0 flex items-center overflow-hidden`}>
        <span className="flex-1 truncate px-4 text-foreground">
          {t("Saya butuh ruangan untuk", "I need space for")} <strong className="font-semibold">{people}</strong> {t("orang", people === 1 ? "person" : "people")}
        </span>
        <button
          type="button"
          aria-label={t("Kurangi jumlah orang", "Decrease people")}
          onClick={() => setPeople((n) => Math.max(1, n - 1))}
          className="h-full px-4 py-3.5 text-xl leading-none text-foreground hover:bg-secondary transition-colors"
        >
          −
        </button>
        <span className="h-6 w-px bg-border" />
        <button
          type="button"
          aria-label={t("Tambah jumlah orang", "Increase people")}
          onClick={() => setPeople((n) => Math.min(200, n + 1))}
          className="h-full px-4 py-3.5 text-xl leading-none text-foreground hover:bg-secondary transition-colors"
        >
          +
        </button>
      </div>

      <textarea
        name="needs"
        rows={4}
        aria-label={t("Keperluan bisnis", "Business needs")}
        placeholder={t("Keperluan bisnis", "Business needs")}
        className={`${inputClass} resize-y md:col-span-2`}
      />

      <div className="md:col-span-2 flex flex-col items-center gap-4 pt-2">
        <button
          type="submit"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-foreground px-10 py-4 text-base font-semibold text-background shadow-md transition-all duration-300 hover:bg-teal-ink hover:shadow-xl active:scale-[0.98] md:w-auto md:min-w-72"
        >
          {t("Kirim via WhatsApp", "Send via WhatsApp")}
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
        </button>
        <p className="text-center text-sm text-muted-foreground">
          {t(
            "WhatsApp akan terbuka dengan detail kunjungan Anda. Tim kami akan mengonfirmasi jadwalnya.",
            "WhatsApp will open with your visit details. Our team will confirm the schedule.",
          )}
        </p>
        {sent && (
          <p role="status" className="rounded-md bg-secondary px-4 py-3 text-center text-sm text-foreground">
            {t("Terima kasih! Jika WhatsApp tidak terbuka, ", "Thank you! If WhatsApp did not open, ")}
            <a href={sent} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-ink underline">
              {t("klik di sini", "click here")}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
