import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { whatsappLink } from "../../lib/contact";
import dims from "../../data/photo-dims.json";
import { serviceOrder, services, type L } from "../../lib/services";
import { T } from "../Lang";
import ServiceCta from "./ServiceCta";
import YouTubeCard from "./YouTubeCard";
import { iconFor } from "./icons";

const h2 = "font-heading text-3xl font-semibold leading-tight tracking-wide text-foreground md:text-4xl";
const btnDark =
  "inline-flex items-center justify-center rounded-md bg-foreground px-8 py-3.5 font-semibold text-background shadow-md transition-all duration-300 hover:bg-teal-ink hover:shadow-xl active:scale-[0.98]";
const dash = "leading-relaxed before:mr-3 before:inline-block before:h-px before:w-3 before:bg-brick before:align-middle";
const cols: Record<number, string> = { 1: "", 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" };

const size = (src: string) => (dims as Record<string, number[]>)[src] ?? [1600, 1067];

const steps: { t: L; d: L }[] = [
  { t: ["Hubungi kami", "Contact us"], d: ["Ceritakan kebutuhan Anda lewat formulir atau WhatsApp.", "Tell us what you need through the form or WhatsApp."] },
  { t: ["Kunjungi atau konsultasi", "Visit or consult"], d: ["Kami tunjukkan ruangannya dan menjawab pertanyaan Anda.", "We show you the space and answer your questions."] },
  { t: ["Mulai menggunakan", "Get started"], d: ["Pilih paket yang cocok dan mulai gunakan ruangnya.", "Choose the plan that fits and start using the space."] },
];

// Photo grid: landscape = 1 cell, portrait = 2 rows tall. Needs an order with no holes in the 3-column and 2-column grid and
// a landscape photo in every row (so tall photos line up flush). Seeded search, so builds are stable. If the set cannot tile,
// the fewest photos are skipped (up to 4); otherwise the given order is used.
const isTall = (src: string) => size(src)[0] / size(src)[1] < 1.1;
function fits(tall: boolean[], cols: number) {
  const units = tall.reduce((n, t) => n + (t ? 2 : 1), 0);
  if (units % cols) return false;
  const rows = units / cols;
  const g: number[][] = Array.from({ length: rows + 2 }, () => Array(cols).fill(0));
  const hasL = Array(rows + 2).fill(false);
  for (const t of tall) {
    const h = t ? 2 : 1;
    let done = false;
    for (let r = 0; r + h <= g.length && !done; r++)
      for (let c = 0; c < cols && !done; c++)
        if (g[r][c] === 0 && (h === 1 || g[r + 1][c] === 0)) {
          g[r][c] = 1;
          if (h === 2) g[r + 1][c] = 1;
          else hasL[r] = true;
          done = true;
        }
    if (!done) return false;
  }
  return g.slice(0, rows).every((row) => row.every(Boolean)) && g.slice(rows).every((row) => !row.some(Boolean)) && hasL.slice(0, rows).every(Boolean);
}
function arrange<T extends { src: string }>(items: T[]): T[] {
  let rnd = 7;
  const next = () => ((rnd = (rnd * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const tries = (list: T[]) => {
    const order = [...list];
    for (let n = 0; n < 300; n++) {
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
      const tall = order.map((o) => isTall(o.src));
      if (fits(tall, 3) && fits(tall, 2)) return [...order];
    }
    return null;
  };
  const combos = (n: number, k: number): number[][] =>
    k === 0 ? [[]] : Array.from({ length: n }, (_, i) => n - 1 - i).flatMap((i) => combos(i, k - 1).map((c) => [...c, i]));
  for (let k = 0; k <= 4; k++)
    for (const drop of combos(items.length, k)) {
      const hit = tries(items.filter((_, i) => !drop.includes(i)));
      if (hit) return hit;
    }
  return items;
}

const Tl = ({ v }: { v: L }) => <T en={v[1]}>{v[0]}</T>;

export default function ServicePage({ slug }: { slug: string }) {
  const s = services[slug];
  const contact = `/atur-kunjungan?layanan=${slug}`;
  const wa = whatsappLink(`Halo CLAPHAM.CO, saya ingin bertanya tentang ${s.name}.`);
  const others = serviceOrder.filter((o) => o.slug !== slug);

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="container mx-auto max-w-7xl overflow-x-clip px-4 pb-20 pt-12 md:pt-16">
        <div className={`grid items-center gap-10 lg:gap-16 ${s.video ? "lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]" : "lg:grid-cols-2"}`}>
          <div className="reveal">
            <h1 className="font-heading text-4xl font-semibold leading-tight tracking-wide text-foreground md:text-6xl">
              {s.title ? (
                <>
                  <span className="sr-only">{s.name}: </span>
                  <T en={<>{s.title.pre[1]}<span className="text-brick">{s.title.accent[1]}</span>{s.title.post[1]}</>}>
                    {s.title.pre[0]}<span className="text-brick">{s.title.accent[0]}</span>{s.title.post[0]}
                  </T>
                </>
              ) : (
                s.name
              )}
            </h1>
            {s.title && <p className="mt-4 font-heading text-lg font-semibold tracking-wide text-teal-ink">{s.name}</p>}
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              <Tl v={s.lead} />
            </p>
            {s.from && (
              <p className="mt-8">
                <span className="block text-sm text-muted-foreground">
                  <T en="Starting from">Mulai dari</T>
                </span>
                <span className="font-heading text-4xl font-semibold tracking-wide text-brick">{s.from.price}</span>{" "}
                <span className="text-muted-foreground">
                  <Tl v={s.from.unit} />
                </span>
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={contact} className={btnDark}>
                <T en="Contact Us">Kontak Kami</T>
              </Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md border border-border bg-card px-8 py-3.5 font-semibold text-foreground shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md">
                WhatsApp
              </a>
            </div>
            {s.highlights && (
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-6 text-muted-foreground">
                {s.highlights.map((h) => {
                  const Icon = iconFor(h[0]);
                  return (
                    <li key={h[0]} className="inline-flex items-center gap-2.5">
                      <Icon size={20} strokeWidth={1.6} aria-hidden className="text-teal-ink" />
                      <Tl v={h} />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className={`reveal ${s.video ? "pr-3 md:pr-4" : ""}`} style={{ "--i": 1 } as CSSProperties}>
            {s.video ? (
              <YouTubeCard id={s.video} title={`${s.name} CLAPHAM.CO`} />
            ) : s.art ? (
              // eslint-disable-next-line @next/next/no-img-element
              <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 shadow-lg">
                <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-primary/25 blur-3xl transition-transform duration-700 group-hover:scale-125" />
                <div aria-hidden className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-brick/10 blur-3xl" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.art} alt={`Ilustrasi ${s.name} CLAPHAM.CO`} width={900} height={640} className="relative h-auto w-full animate-float" />
                <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-teal-ink shadow-xs">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a7 7 0 0 0-7 7c0 5.3 7 13 7 13s7-7.7 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
                  Centre Point Medan
                </span>
              </div>
            ) : (
              <div className={size(s.hero)[0] / size(s.hero)[1] < 1.1 ? "relative mx-auto w-full max-w-md pb-3 pr-3 lg:ml-auto lg:mr-0 md:pb-4 md:pr-4" : "relative"}>
                {size(s.hero)[0] / size(s.hero)[1] < 1.1 && <div aria-hidden className="absolute bottom-0 right-0 h-[calc(100%-0.75rem)] w-[calc(100%-0.75rem)] rounded-lg bg-primary/70 md:h-[calc(100%-1rem)] md:w-[calc(100%-1rem)]" />}
                <Image src={s.hero} alt={`${s.name} CLAPHAM.CO`} width={size(s.hero)[0]} height={size(s.hero)[1]} sizes="(min-width: 1024px) 40vw, 100vw" quality={90} loading="eager" fetchPriority="high" className="relative h-auto w-full rounded-lg shadow-xl" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Plans */}
      {s.plans && (
        <section className="bg-secondary py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className={`reveal ${h2}`}>
              <Tl v={s.plansTitle} />
            </h2>
            {s.matrix ? (
              <div className="reveal mt-12 overflow-x-auto rounded-lg border border-border bg-card shadow-md">
                <table className="w-full min-w-[48rem] border-collapse text-left">
                  <thead>
                    <tr>
                      <th className="w-[28%] bg-card p-5 md:p-6" />
                      {s.plans.map((p) => (
                        <th key={String(p.name)} className="bg-primary/25 p-5 align-bottom transition-colors duration-300 hover:bg-primary/45 md:p-6">
                          <span className="block font-heading text-lg font-semibold tracking-wide text-foreground">{typeof p.name === "string" ? p.name : <Tl v={p.name} />}</span>
                          <span className="mt-3 block text-sm font-medium text-foreground/70">
                            {p.prefix ? <Tl v={p.prefix} /> : <>&nbsp;</>}
                          </span>
                          <span className="block font-heading text-2xl font-semibold tracking-wide text-brick md:text-3xl">{p.price}</span>
                          {p.unit && (
                            <span className="text-sm font-medium text-foreground/70">
                              <Tl v={p.unit} />
                            </span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.matrix.map((r) => (
                      <tr key={r.label[0]} className="group/row transition-colors duration-200 even:bg-secondary/40 hover:bg-primary/20">
                        <th scope="row" className="px-5 py-4 font-medium text-foreground/80 transition-colors group-hover/row:text-foreground md:px-6">
                          <Tl v={r.label} />
                        </th>
                        {r.v.map((v, i) => (
                          <td key={i} className="px-5 py-4 text-center md:px-6">
                            {v === true ? (
                              <span aria-label="Ya" className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-teal-ink text-white">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m5 12 5 5L20 7" /></svg>
                              </span>
                            ) : v === false ? (
                              <span className="text-muted-foreground/40" aria-label="Tidak">—</span>
                            ) : typeof v === "string" ? (
                              <span className="font-semibold text-foreground">{v}</span>
                            ) : (
                              <span className="font-semibold text-foreground">
                                <Tl v={v} />
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td className="px-5 py-6 md:px-6" />
                      {s.plans.map((p) => (
                        <td key={String(p.name)} className="px-3 py-6 text-center md:px-4">
                          <Link href={contact} className="group inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-semibold text-background shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-ink hover:shadow-md">
                            <T en="Ask">Tanya</T>
                            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
            <div className={`mt-12 grid gap-6 ${cols[s.plans.length]}`}>
              {s.plans.map((p, i) => (
                <div key={String(p.name)} className="reveal flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-xs transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl" style={{ "--i": i % 4 } as CSSProperties}>
                  {p.image && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={p.image} alt={`${typeof p.name === "string" ? p.name : p.name[0]}`} fill sizes="(min-width: 1024px) 40vw, 100vw" quality={90} className="object-cover" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <h3 className="font-heading text-xl font-semibold tracking-wide text-card-foreground">
                      {typeof p.name === "string" ? p.name : <Tl v={p.name} />}
                    </h3>
                    {p.note && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        <Tl v={p.note} />
                      </p>
                    )}
                    <p className="mt-5">
                      {p.prefix && (
                        <span className="block text-sm text-muted-foreground">
                          <Tl v={p.prefix} />
                        </span>
                      )}
                      <span className="font-heading text-3xl font-semibold tracking-wide text-brick">{p.price}</span>{" "}
                      {p.unit && (
                        <span className="text-muted-foreground">
                          <Tl v={p.unit} />
                        </span>
                      )}
                    </p>
                    {p.rows && (
                      <dl className="mt-5 divide-y divide-border border-y border-border text-sm">
                        {p.rows.map((r) => (
                          <div key={r.label[0]} className="flex justify-between gap-4 py-2.5">
                            <dt className="text-muted-foreground">
                              <Tl v={r.label} />
                            </dt>
                            <dd className="font-semibold text-foreground">{r.price}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    {p.features && (
                      <ul className="mt-5 flex-1 space-y-2 text-sm text-muted-foreground">
                        {p.features.map((f) => (
                          <li key={f[0]} className={dash}>
                            <Tl v={f} />
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link href={contact} className="mt-6 inline-flex items-center gap-2 font-semibold text-teal-ink hover:underline">
                      <T en="Ask about this plan">Tanya paket ini</T>
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        </section>
      )}

      {/* Bento features */}
      {s.bento && s.bentoTitle && (
        <section className="bg-secondary py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className={`reveal ${h2}`}>
              <Tl v={s.bentoTitle} />
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {s.bento.map((b, i) => (
                <Link
                  key={b.t[0]}
                  href={contact}
                  className="reveal group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card p-7 shadow-xs transition-all duration-300 ease-out hover:-translate-y-2 hover:border-teal-ink/40 hover:shadow-xl md:p-8"
                  style={{ "--i": i } as CSSProperties}
                >
                  <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/30 opacity-0 blur-3xl transition-all duration-500 group-hover:scale-110 group-hover:opacity-100" />
                  <span aria-hidden className="relative font-heading text-4xl font-bold text-foreground/10 transition-colors duration-300 group-hover:text-teal-ink/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative mt-4 font-heading text-xl font-semibold leading-snug tracking-wide text-card-foreground">
                    <Tl v={b.t} />
                  </h3>
                  <p className="relative mt-3 flex-1 leading-relaxed text-muted-foreground">
                    <Tl v={b.d} />
                  </p>
                  <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-ink">
                    <T en="Ask for details">Tanya detail</T>
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </span>
                </Link>
              ))}
            </div>
            {s.ctaNote && (
              <p className="reveal mt-10 text-lg text-muted-foreground">
                <Tl v={s.ctaNote} />
              </p>
            )}
          </div>
        </section>
      )}

      {/* Included: line-icon grid (same look as the home "Fasilitas" section) */}
      {s.included && s.includedTitle && !s.bento && (
        <section className="py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className={`reveal ${h2}`}>
              <Tl v={s.includedTitle} />
            </h2>
            <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:gap-x-10 lg:grid-cols-4">
              {s.included.map((f, n) => {
                const Icon = iconFor(f[0]);
                return (
                  <li
                    key={f[0]}
                    className="reveal group border-t border-foreground/15 pt-6"
                    style={{ "--i": n % 4 } as CSSProperties}
                  >
                    <Icon
                      size={36}
                      strokeWidth={1.4}
                      aria-hidden
                      className="text-teal-ink transition-all duration-500 group-hover:-translate-y-1 group-hover:text-brick"
                    />
                    <p className="mt-4 text-lg font-medium leading-snug text-foreground">
                      <Tl v={f} />
                    </p>
                  </li>
                );
              })}
            </ul>
            {s.ctaNote && (
              <p className="reveal mt-10 text-lg text-muted-foreground">
                <Tl v={s.ctaNote} />
              </p>
            )}
          </div>
        </section>
      )}

      {/* Why */}
      {!s.bento && (
      <section className="bg-chart-4/25 py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className={`reveal ${h2}`}>
            <Tl v={s.whyTitle} />
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {s.why.map((w, i) => (
              <div key={w.t[0]} className="reveal rounded-lg border border-t-4 border-border border-t-brick bg-card p-6 shadow-xs transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl md:p-8" style={{ "--i": i } as CSSProperties}>
                <h3 className="font-heading text-xl font-semibold tracking-wide text-card-foreground">
                  <Tl v={w.t} />
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  <Tl v={w.d} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      )}

      {/* Uses */}
      <section className="container mx-auto max-w-7xl px-4 py-24">
        <h2 className={`reveal ${h2}`}>
          <Tl v={s.usesTitle} />
        </h2>
        <div className="mt-12 border-b border-border">
          {s.uses.map((u, i) => (
            <div key={u.t[0]} className="reveal group grid gap-3 border-t border-border py-8 transition-colors duration-300 hover:bg-card/60 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-12 md:px-4">
              <div className="flex items-baseline gap-4">
                <span className="font-heading text-sm font-semibold tracking-widest text-brick">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-heading text-xl font-semibold leading-snug tracking-wide text-foreground transition-colors duration-300 group-hover:text-brick">
                  <Tl v={u.t} />
                </h3>
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                <Tl v={u.d} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      {s.gallery.length > 0 && (
        <section className="bg-secondary py-24">
          <div className="container mx-auto max-w-7xl px-4">
            <h2 className={`reveal ${h2}`}>
              <T en="A look inside">Lihat ruangannya</T>
            </h2>
            <div className="mt-12 grid grid-flow-dense grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              {arrange(s.gallery).map((g, i) => {
                
                const tall = isTall(g.src);
                return (
                  <div key={g.src} className={`reveal group relative overflow-hidden rounded-lg shadow-md ${tall ? "row-span-2 aspect-[3/4] md:aspect-auto" : "aspect-[3/2]"}`} style={{ "--i": i % 3 } as CSSProperties}>
                    <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 40vw, 50vw" quality={90} className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Steps + location */}
      <section className="bg-chart-4/25 py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className={`reveal ${h2}`}>
            <T en={<>How to <span className="text-brick">get started</span></>}>
              Cara <span className="text-brick">memulai</span>
            </T>
          </h2>
          <ol className="relative mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
            <span aria-hidden className="absolute left-[16%] right-[16%] top-12 hidden border-t-2 border-dashed border-foreground/20 md:block" />
            {(s.steps ?? steps).map((st, i) => (
              <li
                key={st.t[0]}
                className="reveal group relative rounded-lg border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl md:p-8"
                style={{ "--i": i } as CSSProperties}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-brick/50 bg-card font-heading text-lg font-semibold text-brick transition-colors duration-300 group-hover:border-solid group-hover:bg-brick group-hover:text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold tracking-wide text-card-foreground">
                  <Tl v={st.t} />
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  <Tl v={st.d} />
                </p>
              </li>
            ))}
          </ol>

          <div className="reveal mt-16 grid gap-10 border-t border-foreground/15 pt-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
            <h2 className={h2}>
              <T en={<>Find us in <span className="text-brick">Medan</span></>}>
                Temukan kami di <span className="text-brick">Medan</span>
              </T>
            </h2>
            <div className="space-y-5 text-lg leading-loose text-muted-foreground">
              <p>
                Komp. Ruko Centre Point Medan, Jalan Timor Blok G No. III/IV, 2nd Floor, Gang Buntu, Medan Timur, Medan, North Sumatra 20231.
              </p>
              <p>
                <T en="Right in the city center, with access to a shopping mall and within walking distance of Railink Station, which connects directly to Kuala Namu International Airport.">
                  Tepat di pusat kota, dengan akses ke pusat perbelanjaan dan berjarak jalan kaki dari Stasiun Railink yang terhubung langsung ke Bandara Internasional Kuala Namu.
                </T>
              </p>
              <p>
                <T en="Open Monday–Friday, 09.00–17.00.">Buka Senin–Jumat, 09.00–17.00.</T>
              </p>
              <a
                href="https://www.google.com/maps/place/COHIVE+at+Clapham/@3.5926181,98.681436,17z/data=!4m6!3m5!1s0x303131c784afcce9:0x1c0f6a9ddeb16361!8m2!3d3.5926181!4d98.681436"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-semibold text-teal-ink hover:underline"
              >
                <T en="Open in Google Maps">Buka di Google Maps</T>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              {s.map && (
                <div className="overflow-hidden rounded-lg border border-border shadow-md">
                  <iframe
                    src="https://www.google.com/maps?q=3.5926181,98.681436&z=15&output=embed"
                    title="Peta CLAPHAM.CO"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="aspect-video w-full border-0"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="container mx-auto max-w-7xl px-4 py-24">
        <h2 className={`reveal ${h2}`}>
          <T en="Other services">Layanan lainnya</T>
        </h2>
        <div className="mt-12 grid border-b border-border md:grid-cols-2 md:gap-x-12">
          {others.map((o) => (
            <Link key={o.slug} href={`/layanan/${o.slug}`} className="group border-t border-border py-6 transition-colors hover:bg-card/60 md:px-3">
              <span className="flex items-center justify-between gap-4 font-heading text-lg font-semibold tracking-wide text-foreground transition-colors group-hover:text-brick">
                {o.name}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              <span className="mt-1 block text-muted-foreground">
                <Tl v={o.blurb} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <ServiceCta contact={contact} wa={wa} />
    </div>
  );
}
