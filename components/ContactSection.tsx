import type { CSSProperties } from "react";
import ConsultForm from "./ConsultForm";
import { T } from "./Lang";

// Same names as the navbar dropdown / footer
const options = [
  { value: "coworking-space", label: "Coworking Space" },
  { value: "private-office", label: "Private Office" },
  { value: "meeting-room", label: "Meeting Room" },
  { value: "event-space", label: "Event Space" },
  { value: "virtual-office", label: "Virtual Office" },
  { value: "event-management", label: "Event Management Service" },
  { value: "podcast-studio", label: "Podcast Studio" },
];

const arrow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

/** Teal band with the white consult card + location. Used on home (h2) and on /atur-kunjungan (h1). */
export default function ContactSection({ asPage = false }: { asPage?: boolean }) {
  const Heading = asPage ? "h1" : "h2";
  return (
    <section id="booking" className="bg-primary text-foreground py-28 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/45 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-32 -left-24 w-96 h-96 bg-brick/15 rounded-full blur-3xl animate-float [animation-delay:-6s]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-start">
          <div className="reveal md:col-span-3 bg-card rounded-xl p-8 md:p-10 border border-border shadow-xl">
            <Heading className="font-heading tracking-wide font-semibold text-3xl md:text-4xl mb-3 leading-tight">
              <T en="Discuss Your Needs">Konsultasikan Kebutuhan Anda</T>
            </Heading>
            <p className="text-muted-foreground mb-8">
              <T en="Need help finding a workspace? Fill in the form below.">Butuh bantuan untuk mencari ruang kerja? Isi formulir di bawah ini.</T>
            </p>
            <ConsultForm options={options} />
          </div>

          <div className="reveal md:col-span-2 space-y-8 md:pt-6" style={{ "--i": 1 } as CSSProperties}>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-foreground mb-3">
                <T en="Location">Lokasi</T>
              </h3>
              <p className="text-foreground leading-relaxed">
                Komp. Ruko Centre Point Medan
                <br />
                Jalan Timor Blok G No. III/IV, 2nd Floor
                <br />
                Gang Buntu, Medan Timur, Medan City
                <br />
                North Sumatra 20231
              </p>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-foreground mb-3">
                <T en="Opening Hours">Jam Operasional</T>
              </h3>
              <p className="text-foreground">
                <T en="Monday–Friday, 09.00–17.00">Senin–Jumat, 09.00–17.00</T>
              </p>
            </div>
            <a
              href="https://www.google.com/maps/place/COHIVE+at+Clapham/@3.5926181,98.681436,17z/data=!4m6!3m5!1s0x303131c784afcce9:0x1c0f6a9ddeb16361!8m2!3d3.5926181!4d98.681436"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/30 px-5 py-2.5 text-sm font-medium text-foreground hover:border-foreground hover:bg-white/50 transition-colors duration-300"
            >
              <T en="Open in Google Maps">Buka di Google Maps</T>
              {arrow}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
