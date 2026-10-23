import type { Metadata } from "next";
import { T } from "../../components/Lang";
import SpaceFinder from "../../components/contact/SpaceFinder";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_DISPLAY, waAsk } from "../../lib/contact";

// Route stays /atur-kunjungan (existing links and sitemap); the page itself is "Kontak Kami".
export const metadata: Metadata = {
  title: "Kontak Kami",
  description:
    "Hubungi CLAPHAM.CO di Ruko Centre Point Medan. Ceritakan kebutuhan Anda, kami cocokkan dengan coworking space, meeting room, private office, atau event space yang tepat.",
  alternates: { canonical: "/atur-kunjungan" },
};

const MAPS =
  "https://www.google.com/maps/place/COHIVE+at+Clapham/@3.5926181,98.681436,17z/data=!4m6!3m5!1s0x303131c784afcce9:0x1c0f6a9ddeb16361!8m2!3d3.5926181!4d98.681436";
const dt = "text-sm text-muted-foreground";
const dd = "mt-1 font-heading text-lg font-semibold tracking-wide text-foreground";

export default function ContactPage() {
  return (
    <div className="bg-background">
      {/* Hero: copy left, Space Finder card right */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-[28rem] w-[28rem] animate-float rounded-full bg-primary/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 animate-float rounded-full bg-brick/10 blur-3xl [animation-delay:-6s]" />
        <div className="container relative mx-auto grid max-w-7xl items-start gap-12 px-4 pb-16 pt-12 md:pb-24 md:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-16 xl:gap-24">
          <div className="animate-fade-up lg:pt-8">
            <h1 className="font-heading text-5xl font-semibold leading-[1.05] tracking-wide text-foreground md:text-6xl">
              <T en={<>The right space, <span className="text-brick">no guesswork.</span></>}>
                Ruang yang tepat, <span className="text-brick">tanpa menebak-nebak.</span>
              </T>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-loose text-muted-foreground md:text-xl">
              <T en="Tell us what you need. We match your headcount and how you plan to use the space with the most relevant Clapham option.">
                Ceritakan kebutuhan Anda. Kami cocokkan jumlah orang dan cara penggunaan dengan pilihan ruang Clapham yang paling relevan.
              </T>
            </p>
            <p className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold uppercase tracking-[0.15em] text-teal-ink">
              <T en="Solo work">Kerja sendiri</T>
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brick" />
              <T en="Teams of 2–6">Tim 2–6 orang</T>
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brick" />
              <T en="Events up to 150">Event hingga 150</T>
            </p>
          </div>
          <div className="animate-fade-up [--delay:0.15s]">
            <SpaceFinder />
          </div>
        </div>
      </section>

      {/* Direct contact + location */}
      <section className="border-t border-border bg-card py-20">
        <div className="container mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          <div className="reveal">
            <h2 className="font-heading text-3xl font-semibold tracking-wide text-foreground md:text-4xl">
              <T en={<>Prefer to <span className="text-brick">talk directly?</span></>}>
                Lebih suka <span className="text-brick">bicara langsung?</span>
              </T>
            </h2>
            <dl className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <dt className={dt}>
                  <T en="Phone">Telepon</T>
                </dt>
                <dd className={dd}>
                  <a href={`tel:${PHONE_TEL}`} className="transition-colors hover:text-teal-ink">{PHONE_DISPLAY}</a>
                </dd>
              </div>
              <div>
                <dt className={dt}>WhatsApp</dt>
                <dd className={dd}>
                  <a href={waAsk()} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-teal-ink">
                    {WHATSAPP_DISPLAY}
                  </a>
                </dd>
              </div>
              <div>
                <dt className={dt}>
                  <T en="Opening hours">Jam operasional</T>
                </dt>
                <dd className={dd}>
                  <T en="Mon–Fri, 09.00–17.00">Senin–Jumat, 09.00–17.00</T>
                </dd>
              </div>
              <div>
                <dt className={dt}>
                  <T en="Address">Alamat</T>
                </dt>
                <dd className="mt-1 leading-relaxed text-foreground">
                  Komp. Ruko Centre Point Medan, Jl. Timor Blok G No. III/IV, 2nd Floor, Medan 20231
                </dd>
              </div>
            </dl>
            <a href={MAPS} target="_blank" rel="noopener noreferrer" className="group mt-10 inline-flex items-center gap-2 font-semibold text-teal-ink hover:underline">
              <T en="Open in Google Maps">Buka di Google Maps</T>
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
          <div className="reveal overflow-hidden rounded-lg border border-border shadow-md" style={{ "--i": 1 } as React.CSSProperties}>
            <iframe
              src="https://www.google.com/maps?q=3.5926181,98.681436&z=15&output=embed"
              title="Peta CLAPHAM.CO"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="aspect-[4/3] h-full w-full border-0 lg:aspect-auto lg:min-h-[24rem]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
