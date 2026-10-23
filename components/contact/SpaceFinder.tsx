"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { WA_INTRO, whatsappLink } from "../../lib/contact";
import { services } from "../../lib/services";
import { useLang, useT } from "../Lang";

/*
 * Space Finder: 01 need + people + usage -> 02 matching rooms (prices from lib/services.ts) -> 03 contact, sent to WhatsApp.
 * No booking backend: the team confirms availability and price.
 */

type Need = "solo" | "team" | "meeting" | "event" | "address" | "podcast";
type Usage = { id: string; label: [string, string] };
type Match = { name: string; note: [string, string]; price?: string; unit?: [string, string]; href: string; img: string };

const NEEDS: { id: Need; label: [string, string]; mark: ReactNode }[] = [
  { id: "solo", label: ["Kerja individual", "Working solo"], mark: <circle cx="12" cy="12" r="5" /> },
  { id: "team", label: ["Kantor untuk tim", "Office for a team"], mark: <rect x="7" y="7" width="10" height="10" rx="1" /> },
  { id: "meeting", label: ["Meeting", "Meeting"], mark: <path d="M12 5 19 12 12 19 5 12Z" /> },
  { id: "event", label: ["Event", "Event"], mark: <path d="M12 5 19 18H5Z" /> },
  { id: "address", label: ["Alamat bisnis", "Business address"], mark: <path d="M12 4a5 5 0 0 0-5 5c0 4 5 10 5 10s5-6 5-10a5 5 0 0 0-5-5Z" /> },
  { id: "podcast", label: ["Rekam podcast", "Record a podcast"], mark: <path d="M9 5h6v8a3 3 0 0 1-6 0Zm-3 7a6 6 0 0 0 12 0M12 18v2" /> },
];

const STORE = "clapham-space-finder";

// What the date field means for each need (used for the visible label and the WhatsApp message)
const DATE_LABEL: Record<Need, [string, string]> = {
  solo: ["Tanggal mulai bekerja", "Start date"],
  team: ["Rencana mulai sewa kantor", "Planned move-in date"],
  meeting: ["Tanggal pemakaian ruang meeting", "Date of the meeting"],
  event: ["Tanggal acara", "Event date"],
  address: ["Rencana mulai berlangganan", "Planned start date"],
  podcast: ["Tanggal rekaman", "Recording date"],
};
const TYPE_MAX = 9999; // typed headcount cap; anything above a room capacity goes to WhatsApp

// people range per need: [min, max of the stepper, max we can host]
const RANGE: Record<Need, [number, number, number]> = {
  solo: [1, 10, 10],
  team: [2, 12, 6],
  meeting: [2, 40, 10],
  event: [10, 200, 150],
  address: [1, 1, 1],
  podcast: [1, 8, 6],
};

const USAGE: Record<Need, Usage[]> = {
  solo: [
    { id: "day", label: ["Sekali datang (harian)", "One-off visit (daily)"] },
    { id: "flex", label: ["Bulanan, kursi fleksibel", "Monthly, any free seat"] },
    { id: "dedicated", label: ["Bulanan, meja tetap", "Monthly, my own desk"] },
  ],
  team: [{ id: "month", label: ["Bulanan", "Monthly"] }],
  meeting: [
    { id: "hour", label: ["Per jam", "By the hour"] },
    { id: "6", label: ["Setengah hari (6 jam)", "Half day (6 hours)"] },
    { id: "8", label: ["Seharian (8 jam)", "Full day (8 hours)"] },
  ],
  event: [
    { id: "3", label: ["3 jam", "3 hours"] },
    { id: "6", label: ["6 jam", "6 hours"] },
    { id: "9", label: ["9 jam", "9 hours"] },
  ],
  address: [{ id: "month", label: ["Berlangganan", "Subscription"] }],
  podcast: [
    { id: "record", label: ["Record Only", "Record Only"] },
    { id: "post", label: ["Ready to Post", "Ready to Post"] },
  ],
};

// ?layanan=<slug> from the service pages preselects the need
const FROM_SLUG: Record<string, Need> = {
  "coworking-space": "solo",
  "private-office": "team",
  "meeting-room": "meeting",
  "event-space": "event",
  "event-management": "event",
  "virtual-office": "address",
  "podcast-studio": "podcast",
};

const plan = (slug: string, name: string) => services[slug].plans!.find((p) => p.name === name || (Array.isArray(p.name) && p.name[0] === name))!;
const row = (slug: string, name: string, label: string) => plan(slug, name).rows?.find((r) => r.label[0] === label)?.price;

export function match(need: Need, people: number, usage: string): Match[] {
  if (need === "solo") {
    const name = usage === "day" ? "DayPass" : usage === "flex" ? "Flexible Desk" : "Dedicated Desk";
    const p = plan("coworking-space", name);
    return [{ name: `Coworking Space · ${name}`, note: ["Harga per orang", "Price per person"], price: p.price, unit: p.unit, href: "/layanan/coworking-space", img: services["coworking-space"].hero }];
  }
  if (need === "team") {
    return [2, 3, 5, 6]
      .filter((n) => n >= people)
      .map((size) => {
        const p = plan("private-office", `${size} orang`);
        return { name: `Private Office · ${size} orang`, note: [`Ruang privat untuk ${size} orang`, `Private room for ${size} people`] as [string, string], price: p.price, unit: p.unit, href: "/layanan/private-office", img: services["private-office"].hero };
      });
  }
  if (need === "meeting") {
    const rooms = (["Newton", "Elliot", "Stephen"] as const).filter((r) => (r === "Stephen" ? 10 : 6) >= people);
    return rooms.map((r) => {
      const p = plan("meeting-room", r);
      const price = usage === "hour" ? p.price : row("meeting-room", r, `${usage} jam`);
      return {
        name: `Meeting Room · ${r}`,
        note: [`Kapasitas ${r === "Stephen" ? 10 : 6} orang`, `Seats ${r === "Stephen" ? 10 : 6} people`],
        price,
        unit: usage === "hour" ? (["/jam", "/hour"] as [string, string]) : ([`/${usage} jam`, `/${usage} hours`] as [string, string]),
        href: "/layanan/meeting-room",
        img: p.image ?? services["meeting-room"].hero,
      };
    });
  }
  if (need === "event") {
    const rooms: [string, number][] = [["Thornton Vault", 30], ["Thornton Senior", 60], ["Wilberforce Chamber", 80], ["Wilberforce Extension", 150]];
    return rooms
      .filter(([, cap]) => cap >= people)
      .map(([r, cap]) => {
        const p = plan("event-space", r);
        return {
          name: `Event Space · ${r}`,
          note: [`Hingga ${cap} orang (susunan teater)`, `Up to ${cap} people (theatre layout)`] as [string, string],
          price: usage === "3" ? p.price : row("event-space", r, `${usage} jam`),
          unit: [`/${usage} jam`, `/${usage} hours`] as [string, string],
          href: "/layanan/event-space",
          img: p.image ?? services["event-space"].hero,
        };
      });
  }
  if (need === "address") {
    return [{ name: "Virtual Office", note: ["Paket dan harga dijelaskan oleh tim kami", "Our team shares the packages and prices"], href: "/layanan/virtual-office", img: services["virtual-office"].art ?? services["virtual-office"].hero }];
  }
  const p = plan("podcast-studio", usage === "record" ? "Record Only" : "Ready to Post");
  return [{ name: `Podcast Studio · ${p.name as string}`, note: ["Maksimal 6 orang, operator standby", "Up to 6 people, standby operator"], price: p.price, unit: p.unit, href: "/layanan/podcast-studio", img: `https://i.ytimg.com/vi/${services["podcast-studio"].video}/hqdefault.jpg` }];
}

const box = "w-full border border-border bg-background px-4 py-3 text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground focus:border-teal-ink focus:ring-4 focus:ring-teal-ink/20 rounded-md";
const label = "mb-2.5 block font-heading text-sm font-semibold tracking-wide text-foreground md:text-base";
const arrow = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export default function SpaceFinder() {
  const t = useT();
  const { lang } = useLang();
  const tl = (v: [string, string]) => (lang === "en" ? v[1] : v[0]);

  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [need, setNeed] = useState<Need>("meeting");
  const [people, setPeople] = useState(6);
  const [draft, setDraft] = useState<string | null>(null); // typed value while the field is being edited
  const [usage, setUsage] = useState("hour");
  const [sent, setSent] = useState<string>();
  const [form, setForm] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  const [today, setToday] = useState<string>();
  const field = (k: string) => ({ name: k, value: form[k] ?? "", onChange: (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value })) });

  // Keep the visitor's progress for this tab (sessionStorage), so opening a room page and coming back
  // (browser back or the navbar "Kontak Kami") does not reset the finder. ?layanan=<slug> starts fresh on that need.
  // runs once after hydration; reads browser-only state (sessionStorage, URL)
  function restore() {
    const pre = FROM_SLUG[new URLSearchParams(window.location.search).get("layanan") ?? ""];
    let saved: { step?: number; need?: Need; people?: number; usage?: string; form?: Record<string, string> } | null = null;
    try {
      saved = JSON.parse(sessionStorage.getItem(STORE) ?? "null");
    } catch {}
    if (saved?.form) setForm(saved.form);
    if (pre && pre !== saved?.need) pick(pre);
    else if (saved?.need && NEEDS.some((n) => n.id === saved!.need)) {
      setNeed(saved.need);
      if (saved.people) setPeople(saved.people);
      if (saved.usage && USAGE[saved.need].some((u) => u.id === saved!.usage)) setUsage(saved.usage);
      if (saved.step) setStep(saved.step);
    }
    const d = new Date();
    setToday(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
    setLoaded(true);
  }
  // sessionStorage does not exist during SSR, so restoring has to happen after mount
  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
  useEffect(() => restore(), []);

  useEffect(() => {
    if (!loaded) return;
    try {
      sessionStorage.setItem(STORE, JSON.stringify({ step, need, people, usage, form }));
    } catch {}
  }, [loaded, step, need, people, usage, form]);

  const [min, , cap] = RANGE[need];
  const results = useMemo(() => match(need, people, usage), [need, people, usage]);
  const over = people > cap;

  function pick(n: Need) {
    setNeed(n);
    const [lo, hi] = RANGE[n];
    setPeople((p) => Math.min(hi, Math.max(lo, n === "team" ? Math.max(p, 2) : p)));
    setUsage(USAGE[n][0].id);
  }
  const go = (n: number) => {
    setDir(n > step ? "fwd" : "back");
    setStep(n);
  };

  const summary = () => {
    const need0 = NEEDS.find((x) => x.id === need)!.label[0];
    const usage0 = USAGE[need].find((u) => u.id === usage)!.label[0];
    return [`Kebutuhan: ${need0}`, need !== "address" && `Jumlah orang: ${people}`, need !== "address" && `Penggunaan: ${usage0}`].filter(Boolean) as string[];
  };
  // over capacity: skip the form, go straight to WhatsApp with the needs filled in
  const waDirect = whatsappLink(
    [`${WA_INTRO} Kebutuhan saya di atas kapasitas ruang standar, boleh dibantu?\n`, ...summary(), "\nMohon dibantu opsi yang tersedia."].join("\n"),
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const lines = [
      `${WA_INTRO} Mau tanya ketersediaan ruang di Clapham, boleh dibantu?\n`,
      ...summary(),
      results.length ? `Pilihan yang cocok: ${results.map((r) => r.name).join(" / ")}` : "Pilihan: perlu dibantu tim",
      `\nNama: ${v("name")}`,
      `Telepon: +62${v("phone").replace(/^0+/, "")}`,
      v("company") && `Perusahaan: ${v("company")}`,
      v("date") && `${DATE_LABEL[need][0]}: ${v("date")}`,
      form.visit === "yes" && `Ingin survei lokasi dulu${v("visitDate") ? `, tanggal survei: ${v("visitDate")}` : " (jadwal survei menyesuaikan)"}`,
      v("notes") && `Catatan: ${v("notes")}`,
    ].filter(Boolean);
    const url = whatsappLink(lines.join("\n"));
    setSent(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const anim = dir === "fwd" ? "animate-step-in" : "animate-step-back";

  return (
    <div className="relative rounded-lg border border-border bg-card p-5 shadow-xl md:p-8">
      {/* header + progress */}
      <div className="flex items-center justify-between">
        <p className="font-heading text-sm font-semibold tracking-[0.2em] text-foreground">SPACE FINDER</p>
        <p className="font-heading text-sm font-semibold tracking-[0.15em] text-foreground" aria-live="polite">
          <span key={step} className="inline-block animate-pop">0{step}</span>
          <span className="text-muted-foreground">—03</span>
        </p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-1.5" aria-hidden>
        {[1, 2, 3].map((n) => (
          <span key={n} className="h-1 overflow-hidden rounded-full bg-border">
            <span className={`block h-full rounded-full bg-brick transition-all duration-500 ease-out ${step >= n ? "w-full" : "w-0"}`} />
          </span>
        ))}
      </div>

      {step === 1 && (
        <div key="s1" className={`mt-6 ${anim}`}>
          <p className={label}>{t("Apa kebutuhan utama Anda?", "What do you need most?")}</p>
          <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label={t("Kebutuhan", "Need")}>
            {NEEDS.map((n) => {
              const on = n.id === need;
              return (
                <button
                  key={n.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => pick(n.id)}
                  className={`group flex items-center gap-3 rounded-md border px-3.5 py-3 text-left transition-all duration-300 ${
                    on ? "border-foreground bg-foreground text-background shadow-md" : "border-border bg-background text-foreground hover:-translate-y-0.5 hover:border-teal-ink/50 hover:shadow-sm"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      on ? "bg-primary text-foreground" : "bg-secondary text-teal-ink group-hover:bg-primary/50"
                    }`}
                  >
                    <svg key={on ? "on" : "off"} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={on ? "animate-pop" : ""}>
                      {n.mark}
                    </svg>
                  </span>
                  <span className="text-sm font-medium">{tl(n.label)}</span>
                </button>
              );
            })}
          </div>

          {need !== "address" && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <p className={label}>{t("Jumlah orang", "Number of people")}</p>
                <div className="flex items-center rounded-md border border-border bg-background">
                  <button type="button" aria-label={t("Kurangi", "Fewer")} disabled={people <= min} onClick={() => setPeople((p) => Math.max(min, p - 1))} className="px-4 py-2.5 text-lg text-foreground transition-colors hover:text-brick disabled:opacity-30">
                    −
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    aria-label={t("Jumlah orang", "Number of people")}
                    value={draft ?? String(people)}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setDraft(v);
                      if (v) setPeople(Math.max(min, Math.min(TYPE_MAX, Number(v))));
                    }}
                    onBlur={() => setDraft(null)}
                    onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
                    className="w-full min-w-0 flex-1 bg-transparent text-center font-heading text-xl font-semibold text-foreground outline-none"
                  />
                  <button type="button" aria-label={t("Tambah", "More")} disabled={people >= TYPE_MAX} onClick={() => setPeople((p) => Math.min(TYPE_MAX, p + 1))} className="px-4 py-2.5 text-lg text-foreground transition-colors hover:text-brick disabled:opacity-30">
                    +
                  </button>
                </div>
                <p className={`mt-2 text-sm transition-colors ${over ? "text-brick" : "text-muted-foreground"}`}>
                  {over
                    ? t("Di atas kapasitas ruang kami, Anda akan langsung terhubung ke tim via WhatsApp.", "Above our room capacity, you will be connected to our team on WhatsApp.")
                    : t(`Maks. ${cap} orang`, `Up to ${cap} people`)}
                </p>
              </div>
              <div>
                <p className={label}>{t("Tipe penggunaan", "Type of use")}</p>
                <select value={usage} onChange={(e) => setUsage(e.target.value)} className={`${box} cursor-pointer`} aria-label={t("Tipe penggunaan", "Type of use")}>
                  {USAGE[need].map((u) => (
                    <option key={u.id} value={u.id}>
                      {tl(u.label)}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-muted-foreground">{t("Pilih yang paling mendekati", "Pick the closest match")}</p>
              </div>
            </div>
          )}

          {/* over capacity: no recommendation step, go straight to WhatsApp with the needs prefilled */}
          {results.length ? (
            <button type="button" onClick={() => go(2)} className="group mt-6 flex w-full items-center justify-between rounded-md bg-foreground px-6 py-3.5 font-heading font-semibold text-background shadow-md transition-all duration-300 hover:bg-teal-ink hover:shadow-xl active:scale-[0.99]">
              {t("Lihat ruang yang cocok", "See matching spaces")}
              {arrow}
            </button>
          ) : (
            <a key="wa" href={waDirect} target="_blank" rel="noopener noreferrer" className="group mt-6 flex w-full animate-pop items-center justify-between rounded-md bg-foreground px-6 py-3.5 font-heading font-semibold text-background shadow-md transition-all duration-300 hover:bg-teal-ink hover:shadow-xl active:scale-[0.99]">
              {t("Konsultasi via WhatsApp", "Consult via WhatsApp")}
              {arrow}
            </a>
          )}
        </div>
      )}

      {step === 2 && (
        <div key="s2" className={`mt-6 ${anim}`}>
          <p className={label}>
            {results.length
              ? t(`${results.length > 1 ? `${results.length} pilihan` : "Pilihan"} yang cocok untuk Anda`, `${results.length > 1 ? `${results.length} options` : "The option"} that fit${results.length > 1 ? "" : "s"} you`)
              : t("Konsultasi langsung dengan tim", "Talk to our team directly")}
          </p>
          {results.length ? (
            <ul className="space-y-3">
              {results.map((r, i) => (
                <li key={r.name} className="animate-step-in" style={{ "--delay": `${i * 0.08}s` } as CSSProperties}>
                  <Link href={r.href} className="group flex items-center gap-4 rounded-md border border-border bg-background p-3 pr-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-ink/50 hover:shadow-md">
                    <span className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-md bg-secondary sm:w-28">
                      <Image
                        src={r.img}
                        alt={r.name}
                        fill
                        sizes="7rem"
                        quality={75}
                        unoptimized={r.img.endsWith(".svg") || r.img.startsWith("http")}
                        className={`transition-transform duration-500 group-hover:scale-110 ${r.img.endsWith(".svg") ? "object-contain p-1" : "object-cover"}`}
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-heading text-lg font-semibold tracking-wide text-foreground transition-colors group-hover:text-teal-ink">{r.name}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{tl(r.note)}</span>
                    </span>
                    {r.price ? (
                      <span className="shrink-0 text-right">
                        <span className="block font-heading text-xl font-semibold text-brick">{r.price}</span>
                        <span className="text-sm text-muted-foreground">{r.unit && tl(r.unit)}</span>
                      </span>
                    ) : (
                      <span className="shrink-0 text-sm font-semibold text-teal-ink">{t("Tanya tim", "Ask our team")}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-md border border-brick/30 bg-secondary p-5 leading-relaxed text-foreground">
              <p>
                {t(
                  `Untuk ${people} orang, kebutuhan Anda melebihi kapasitas ruang standar kami. Tim kami siap membantu mencarikan opsi terbaik langsung lewat WhatsApp.`,
                  `For ${people} people, your needs go beyond our standard rooms. Our team will help you find the best option directly on WhatsApp.`,
                )}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {tl(NEEDS.find((x) => x.id === need)!.label)} · {people} {t("orang", "people")} · {tl(USAGE[need].find((u) => u.id === usage)!.label)}
              </p>
            </div>
          )}
          {need === "solo" && people > 1 && results[0]?.price && (
            <p className="mt-3 text-sm text-muted-foreground">
              {t(`Untuk ${people} orang: ${people} × ${results[0].price}`, `For ${people} people: ${people} × ${results[0].price}`)}
            </p>
          )}
          {need === "event" && results.length > 0 && <p className="mt-3 text-sm text-muted-foreground">{t("Akhir pekan dan hari libur dikenakan biaya tambahan.", "A surcharge applies on weekends and public holidays.")}</p>}

          <div className="mt-8 grid grid-cols-[auto_1fr] gap-3">
            <button type="button" onClick={() => go(1)} className="rounded-md border border-border px-5 py-3.5 font-semibold text-foreground transition-colors hover:border-foreground">
              ←<span className="sr-only">{t("Kembali", "Back")}</span>
            </button>
            {results.length ? (
              <button type="button" onClick={() => go(3)} className="group flex items-center justify-between rounded-md bg-foreground px-6 py-3.5 font-heading font-semibold text-background shadow-md transition-all duration-300 hover:bg-teal-ink hover:shadow-xl active:scale-[0.99]">
                {t("Tanyakan ketersediaan", "Ask for availability")}
                {arrow}
              </button>
            ) : (
              <a href={waDirect} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-md bg-foreground px-6 py-3.5 font-heading font-semibold text-background shadow-md transition-all duration-300 hover:bg-teal-ink hover:shadow-xl active:scale-[0.99]">
                {t("Konsultasi via WhatsApp", "Consult via WhatsApp")}
                {arrow}
              </a>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <form key="s3" onSubmit={onSubmit} className={`mt-6 grid gap-3.5 ${anim}`}>
          <p className="rounded-md bg-secondary px-4 py-3 text-sm text-foreground">
            <span className="font-semibold">{tl(NEEDS.find((x) => x.id === need)!.label)}</span>
            {need !== "address" && ` · ${people} ${t("orang", people === 1 ? "person" : "people")} · ${tl(USAGE[need].find((u) => u.id === usage)!.label)}`}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="mb-1.5 block text-sm font-medium text-foreground">{t("Nama", "Name")} <span className="text-brick">*</span></span>
              <input {...field("name")} required autoComplete="name" placeholder={t("Nama lengkap", "Full name")} className={box} />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-medium text-foreground">{t("Perusahaan", "Company")} <span className="font-normal text-muted-foreground">({t("opsional", "optional")})</span></span>
              <input {...field("company")} autoComplete="organization" placeholder={t("Nama perusahaan", "Company name")} className={box} />
            </label>
          </div>
          <label>
            <span className="mb-1.5 block text-sm font-medium text-foreground">{t("Nomor WhatsApp", "WhatsApp number")} <span className="text-brick">*</span></span>
            <span className="flex gap-2">
              <span className={`${box} !w-auto`}>+62</span>
              <input {...field("phone")} type="tel" required autoComplete="tel-national" placeholder="812 3456 7890" className={box} />
            </span>
          </label>
          <label>
            <span className="mb-1.5 block text-sm font-medium text-foreground">{tl(DATE_LABEL[need])} <span className="font-normal text-muted-foreground">({t("opsional", "optional")})</span></span>
            <input {...field("date")} type="date" min={today} className={box} />
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-background p-4 transition-colors hover:border-teal-ink/50">
            <input
              type="checkbox"
              checked={form.visit === "yes"}
              onChange={(e) => setForm((f) => ({ ...f, visit: e.target.checked ? "yes" : "" }))}
              className="mt-1 h-4 w-4 accent-[var(--teal-ink)]"
            />
            <span className="text-sm leading-relaxed text-foreground">
              {t("Saya ingin survei lokasi (melihat ruangan) sebelum memesan", "I would like to visit and see the space before booking")}
              <span className="block text-muted-foreground">{t("Kunjungan Senin–Jumat, 09.00–17.00", "Visits Monday–Friday, 09.00–17.00")}</span>
            </span>
          </label>
          {form.visit === "yes" && (
            <label className="animate-step-in">
              <span className="mb-1.5 block text-sm font-medium text-foreground">{t("Tanggal survei lokasi", "Visit date")} <span className="font-normal text-muted-foreground">({t("opsional", "optional")})</span></span>
              <input {...field("visitDate")} type="date" min={today} className={box} />
            </label>
          )}
          <label>
            <span className="mb-1.5 block text-sm font-medium text-foreground">{t("Catatan", "Notes")} <span className="font-normal text-muted-foreground">({t("opsional", "optional")})</span></span>
            <textarea {...field("notes")} rows={3} placeholder={t("Contoh: butuh proyektor, susunan kelas, jam mulai 09.00", "E.g. need a projector, classroom layout, start at 09.00")} className={`${box} resize-y`} />
          </label>
          <div className="mt-2 grid grid-cols-[auto_1fr] gap-3">
            <button type="button" onClick={() => go(2)} className="rounded-md border border-border px-5 py-3.5 font-semibold text-foreground transition-colors hover:border-foreground">
              ←<span className="sr-only">{t("Kembali", "Back")}</span>
            </button>
            <button type="submit" className="group flex items-center justify-between rounded-md bg-foreground px-6 py-3.5 font-heading font-semibold text-background shadow-md transition-all duration-300 hover:bg-teal-ink hover:shadow-xl active:scale-[0.99]">
              {t("Kirim via WhatsApp", "Send via WhatsApp")}
              {arrow}
            </button>
          </div>
          {sent && (
            <p role="status" className="animate-step-in rounded-md bg-secondary px-4 py-3 text-center text-sm text-foreground">
              {t("Terima kasih! Jika WhatsApp tidak terbuka, ", "Thank you! If WhatsApp did not open, ")}
              <a href={sent} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-ink underline">
                {t("klik di sini", "click here")}
              </a>
              .
            </p>
          )}
        </form>
      )}

      <p className="mt-5 text-center text-xs text-muted-foreground md:text-sm">
        {t("Tidak ada pemesanan otomatis. Tim Clapham akan mengonfirmasi ketersediaan dan harga.", "No automatic booking. The Clapham team confirms availability and price.")}
      </p>
    </div>
  );
}
