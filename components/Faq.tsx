import type { CSSProperties } from "react";
import { T } from "./Lang";

const faqs = [
  {
    q: "Layanan apa saja yang tersedia di CLAPHAM.CO?",
    qEn: "What services does CLAPHAM.CO offer?",
    a: "Coworking Space, Private Office, Meeting Room, Event Space, Virtual Office, Event Management Service, dan Podcast Studio.",
    aEn: "Coworking Space, Private Office, Meeting Room, Event Space, Virtual Office, Event Management Service, and Podcast Studio.",
  },
  {
    q: "Di mana lokasi CLAPHAM.CO?",
    qEn: "Where is CLAPHAM.CO located?",
    a: "Kami berada di Komp. Ruko Centre Point Medan, Jalan Timor Blok G No. III/IV, 2nd Floor, Medan Timur, Medan.",
    aEn: "We are at Komp. Ruko Centre Point Medan, Jalan Timor Blok G No. III/IV, 2nd Floor, Medan Timur, Medan.",
  },
  {
    q: "Apa jam operasional CLAPHAM.CO?",
    qEn: "What are the opening hours?",
    a: "Kami buka Senin sampai Jumat, pukul 09.00 sampai 17.00.",
    aEn: "We are open Monday to Friday, 09.00 to 17.00.",
  },
  {
    q: "Bagaimana cara melihat ruang atau berkonsultasi dengan tim?",
    qEn: "How can I see the space or talk to the team?",
    a: "Klik Kontak Kami, isi formulir singkat, dan pesan Anda akan terkirim lewat WhatsApp. Tim kami akan menghubungi Anda untuk mengatur kunjungan atau menjawab kebutuhan Anda.",
    aEn: "Click Contact Us and fill in the short form. Your message is sent through WhatsApp, and our team will get back to you to arrange a visit or answer your needs.",
  },
  {
    q: "Apakah CLAPHAM.CO bisa membantu menyelenggarakan event?",
    qEn: "Can CLAPHAM.CO help organize an event?",
    a: "Bisa. Anda dapat menyewa Event Space, atau memakai Event Management Service kami untuk konsep, produksi, penyelenggaraan, dokumentasi, dan promosi acara.",
    aEn: "Yes. You can rent our Event Space, or use our Event Management Service for concept, production, organizing, documentation, and promotion.",
  },
  {
    q: "Berapa biaya sewa ruang atau layanan?",
    qEn: "How much does a space or service cost?",
    a: "Biaya bergantung pada jenis layanan, durasi, dan kebutuhan Anda. Hubungi kami dan tim akan memberikan penawaran yang sesuai.",
    aEn: "Cost depends on the service, the duration, and your needs. Contact us and the team will send you a suitable quote.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  return (
    <section id="faq" className="py-28 bg-card">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
          <div className="reveal">
            <h2 className="font-heading text-3xl font-semibold leading-tight tracking-wide text-foreground md:text-4xl">
              <T en={<>Frequently Asked <span className="text-brick">Questions</span></>}>
                Pertanyaan yang <span className="text-brick">Sering Diajukan</span>
              </T>
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              <T en="Cannot find your answer? Contact us and our team will help.">
                Belum menemukan jawabannya? Hubungi kami, tim kami siap membantu.
              </T>
            </p>
          </div>

          <div className="reveal border-b border-border" style={{ "--i": 1 } as CSSProperties}>
            {faqs.map((f) => (
              <details key={f.q} className="group border-t border-border">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-heading text-lg font-semibold tracking-wide text-foreground transition-colors duration-300 hover:text-teal-ink [&::-webkit-details-marker]:hidden">
                  <span>
                    <T en={f.qEn}>{f.q}</T>
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 text-brick transition-transform duration-300 group-open:rotate-45"><path d="M12 5v14" /><path d="M5 12h14" /></svg>
                </summary>
                <p className="pb-6 pr-10 leading-loose text-muted-foreground">
                  <T en={f.aEn}>{f.a}</T>
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
