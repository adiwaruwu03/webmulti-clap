import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_DISPLAY } from "../../lib/contact";
import { T } from "../Lang";

const btnDark =
  "inline-flex items-center justify-center rounded-md bg-foreground px-8 py-3.5 font-semibold text-background shadow-md transition-all duration-300 hover:bg-teal-ink hover:shadow-xl active:scale-[0.98]";

/** Teal "Siap memulai?" band shared by every /layanan page. `contact` = booking page link, `wa` = WhatsApp link. */
export default function ServiceCta({ contact, wa }: { contact: string; wa: string }) {
  const rows = [
    { k: <T en="Phone">Telepon</T>, key: "tel", v: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` },
    { k: "WhatsApp", key: "wa", v: WHATSAPP_DISPLAY, href: wa },
    { k: <T en="Opening hours">Jam operasional</T>, key: "hours", v: <T en="Monday–Friday, 09.00–17.00">Senin–Jumat, 09.00–17.00</T> },
  ];
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-foreground md:py-28">
      <div aria-hidden className="absolute -right-24 -top-24 h-96 w-96 animate-float rounded-full bg-white/45 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 -left-24 h-96 w-96 animate-float rounded-full bg-brick/15 blur-3xl [animation-delay:-6s]" />
      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="reveal grid overflow-hidden rounded-lg bg-card shadow-xl lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="p-8 md:p-14">
            <h2 className="font-heading text-3xl font-semibold leading-tight tracking-wide md:text-5xl">
              <T en={<>Ready to <span className="text-brick">get started?</span></>}>
                Siap <span className="text-brick">memulai?</span>
              </T>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              <T en="Tell us what you need and our team will help you pick the right option.">
                Ceritakan kebutuhan Anda dan tim kami akan membantu memilih opsi yang tepat.
              </T>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={contact} className={`${btnDark} gap-3 px-9`}>
                <T en="Contact Us">Kontak Kami</T>
                <span aria-hidden>→</span>
              </Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md border border-border px-9 py-3.5 font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-ink hover:text-teal-ink active:scale-[0.98]">
                WhatsApp
              </a>
            </div>
          </div>
          <dl className="divide-y divide-border bg-secondary p-8 md:p-14">
            {rows.map((r) => (
              <div key={r.key} className="py-5 first:pt-0 last:pb-0">
                <dt className="text-sm text-muted-foreground">{r.k}</dt>
                <dd className="mt-1 font-heading text-lg font-semibold tracking-wide text-foreground">
                  {r.href ? (
                    <a href={r.href} className="transition-colors hover:text-teal-ink" {...(r.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {r.v}
                    </a>
                  ) : (
                    r.v
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
