"use client";

import { useT } from "./Lang";

const inputClass =
  "w-full bg-background text-foreground placeholder:text-muted-foreground border border-input rounded-md px-4 py-3.5 outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-teal-ink/30";

export default function ConsultForm({ options }: { options: { value: string; label: string }[] }) {
  const t = useT();
  return (
    <form className="grid grid-cols-1 gap-4">
      <select defaultValue="" aria-label={t("Ruang kerja yang Anda cari", "Workspace you are looking for")} className={inputClass} required>
        <option value="" disabled>
          {t("Ruang kerja apa yang Anda cari?", "What workspace are you looking for?")}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <input type="text" placeholder={t("Nama Anda", "Your name")} className={inputClass} required />
      <input type="email" placeholder={t("Email perusahaan Anda", "Your company email")} className={inputClass} required />
      <div className="flex gap-2">
        <span className={`${inputClass} !w-auto flex items-center text-foreground`}>+62</span>
        <input type="tel" placeholder={t("Nomor telepon Anda", "Your phone number")} className={inputClass} required />
      </div>
      <input type="text" placeholder={t("Perusahaan Anda", "Your company")} className={inputClass} />
      <textarea
        placeholder={t("Berikan detail ruang kerja yang Anda cari", "Describe the workspace you are looking for")}
        rows={4}
        className={`${inputClass} resize-y`}
      />
      <button
        type="button"
        className="group mt-2 w-full inline-flex items-center justify-center gap-2 bg-foreground text-background font-semibold text-base py-4 rounded-md shadow-md hover:shadow-xl hover:bg-teal-ink active:scale-[0.98] transition-all duration-300"
      >
        {t("Kirim", "Send")}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
      </button>
    </form>
  );
}
