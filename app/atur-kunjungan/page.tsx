import type { Metadata } from "next";
import { T } from "../../components/Lang";
import BookingForm from "../../components/BookingForm";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP_DISPLAY, whatsappLink } from "../../lib/contact";

export const metadata: Metadata = {
  title: "Atur Kunjungan",
  description:
    "Atur kunjungan ke CLAPHAM.CO di Ruko Centre Point Medan. Isi formulir, dan tim kami akan mengonfirmasi jadwal Anda.",
  alternates: { canonical: "/atur-kunjungan" },
};

const services = [
  { value: "coworking-space", label: "Coworking Space" },
  { value: "private-office", label: "Private Office" },
  { value: "meeting-room", label: "Meeting Room" },
  { value: "event-space", label: "Event Space" },
  { value: "virtual-office", label: "Virtual Office" },
  { value: "event-management", label: "Event Management Service" },
  { value: "podcast-studio", label: "Podcast Studio" },
];

const h3 = "font-heading text-lg font-semibold tracking-wide text-foreground mb-3";
const link = "inline-flex items-center gap-2 font-medium text-teal-ink hover:underline";

export default function BookingPage() {
  return (
    <div className="bg-background pb-24">
      <div className="container mx-auto max-w-4xl px-4 pt-12 md:pt-16">
        <header className="reveal max-w-3xl">
          <h1 className="font-heading text-4xl font-semibold tracking-wide text-foreground md:text-5xl">
            <T en="Schedule a Visit">Atur Kunjungan</T>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            <T en="Want to see our workspace and facilities in person? Fill in the form below and we will arrange your visit.">
              Ingin melihat langsung ruang kerja dan fasilitas kami? Silakan isi formulir di bawah ini dan kami akan
              mengatur kunjungan Anda.
            </T>
          </p>
        </header>

        <div className="reveal mt-10 rounded-xl border border-border bg-card p-6 shadow-sm md:p-10" style={{ "--i": 1 } as React.CSSProperties}>
          <BookingForm options={services} />
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="reveal">
            <h2 className={h3}>
              <T en="Address">Alamat</T>
            </h2>
            <address className="not-italic leading-relaxed text-muted-foreground">
              Komp. Ruko Centre Point Medan
              <br />
              Jalan Timor Blok G No. III/IV, 2nd Floor
              <br />
              Gang Buntu, Medan Timur, Medan City
              <br />
              North Sumatra 20231
            </address>
          </div>

          <div className="reveal" style={{ "--i": 1 } as React.CSSProperties}>
            <h2 className={h3}>
              <T en="Call Us">Telepon Kami</T>
            </h2>
            <a href={`tel:${PHONE_TEL}`} className={link}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.62a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.46-1.19a2 2 0 0 1 2.11-.45c.84.29 1.72.5 2.62.62A2 2 0 0 1 22 16.92Z" /></svg>
              {PHONE_DISPLAY}
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              <T en="Monday–Friday, 09.00–17.00">Senin–Jumat, 09.00–17.00</T>
            </p>
          </div>

          <div className="reveal" style={{ "--i": 2 } as React.CSSProperties}>
            <h2 className={h3}>
              <T en="Chat">Chat</T>
            </h2>
            <a
              href={whatsappLink("Halo CLAPHAM.CO, saya ingin bertanya tentang kunjungan.")}
              target="_blank"
              rel="noopener noreferrer"
              className={link}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.23 8.21Z" /></svg>
              {WHATSAPP_DISPLAY}
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              <T en="Or ask us directly through WhatsApp.">Atau, tanyakan langsung lewat WhatsApp.</T>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
