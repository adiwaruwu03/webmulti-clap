import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import Link from "next/link";
import { T } from "../../../components/Lang";
import HeroCarousel from "../../../components/events/HeroCarousel";
import EventGrid from "../../../components/events/EventGrid";
import ServiceCta from "../../../components/service/ServiceCta";
import { whatsappLink } from "../../../lib/contact";
import { BASE, featuredEvents } from "../../../lib/events";

export const metadata: Metadata = {
  title: "Event Management Service di Medan",
  description:
    "Jasa event management di Medan: konsep, produksi, penyelenggaraan, dokumentasi, dan promosi acara. Lihat portofolio seminar, workshop, dan brand activation kami.",
  alternates: { canonical: BASE },
};

const services = [
  {
    title: "Manajemen Event",
    en: "Event Management",
    items: ["Pengembangan konsep dan tema acara", "Penyusunan timeline dan project plan", "Perencanaan dan kontrol anggaran", "Koordinasi vendor dan stakeholder", "Manajemen registrasi peserta", "Supervisi keseluruhan event", "Evaluasi dan reporting pasca-event"],
    itemsEn: ["Event concept and theme development", "Timeline and project plan", "Budget planning and control", "Vendor and stakeholder coordination", "Participant registration management", "Overall event supervision", "Post-event evaluation and reporting"],
  },
  {
    title: "Produksi Event",
    en: "Event Production",
    items: ["Stage design dan setup", "Sound system dan lighting", "LED screen dan multimedia", "Technical production planning", "Setup dan technical rehearsal", "On-site technical support"],
    itemsEn: ["Stage design and setup", "Sound system and lighting", "LED screen and multimedia", "Technical production planning", "Setup and technical rehearsal", "On-site technical support"],
  },
  {
    title: "Penyelenggaraan Event",
    en: "Event Organizing",
    items: ["Penyusunan rundown acara", "Pengaturan flow dan alur acara", "Manajemen registrasi dan check-in", "Koordinasi crew dan volunteer", "Pengelolaan tamu dan peserta", "Eksekusi operasional di hari H"],
    itemsEn: ["Event rundown preparation", "Event flow management", "Registration and check-in management", "Crew and volunteer coordination", "Guest and participant management", "Operational execution on event day"],
  },
  {
    title: "Management Pembicara & Talenta",
    en: "Speaker & Talent Management",
    items: ["Kurasi dan rekomendasi speaker/talent", "Akses ke jaringan profesional dan praktisi", "Koordinasi jadwal dan kebutuhan", "Briefing dan alignment materi", "Pengelolaan kontrak dan administrasi", "Hospitality untuk speaker dan talent"],
    itemsEn: ["Speaker/talent curation and recommendation", "Access to a network of professionals and practitioners", "Schedule and requirement coordination", "Briefing and material alignment", "Contract and administration management", "Hospitality for speakers and talents"],
  },
  {
    title: "Dokumentasi Event",
    en: "Event Documentation",
    items: ["Fotografi event", "Videografi event", "Highlight video", "Konten untuk media sosial", "Editing dan post-production"],
    itemsEn: ["Event photography", "Event videography", "Highlight video", "Social media content", "Editing and post-production"],
  },
  {
    title: "Humas & Promosi Event",
    en: "PR & Event Promotion",
    items: ["Strategi promosi event", "Campaign media sosial", "Media partnership", "Press release dan publikasi media", "Aktivasi digital marketing", "Audience engagement strategy"],
    itemsEn: ["Event promotion strategy", "Social media campaign", "Media partnership", "Press release and media publication", "Digital marketing activation", "Audience engagement strategy"],
  },
  {
    title: "Program Komunitas & Keterlibatan Audiens",
    en: "Community & Audience Engagement Programs",
    items: ["Strategi pengembangan komunitas", "Aktivasi komunitas melalui program/event", "Engagement dan komunikasi audiens", "Pengelolaan database peserta", "Retention dan loyalty program"],
    itemsEn: ["Community development strategy", "Community activation through programs/events", "Audience engagement and communication", "Participant database management", "Retention and loyalty program"],
  },
  {
    title: "Layanan Makanan & Minuman",
    en: "Food & Beverage Services",
    items: ["Coffee break dan snack", "Catering untuk event", "Booth F&B", "Custom menu sesuai konsep acara", "Koordinasi vendor F&B"],
    itemsEn: ["Coffee break and snack", "Event catering", "F&B booth", "Custom menu to fit the event concept", "F&B vendor coordination"],
  },
];

const strengths = [
  { title: "Desain Event Strategis", en: "Strategic Event Design", desc: "Setiap event dirancang dengan tujuan yang jelas, bukan sekadar ramai.", descEn: "Every event is designed with clear goals, not just crowd-pleasing." },
  { title: "Kurasi & Alur yang Kuat", en: "Curated Flow & Structure", desc: "Konten, flow acara, dan pengalaman audiens disusun secara matang.", descEn: "Content, event flow, and audience experience are carefully crafted." },
  { title: "Eksekusi yang Andal", en: "Reliable Execution", desc: "Detail, timeline, dan teknis kami kelola dengan presisi.", descEn: "We manage details, timelines, and technical aspects with precision." },
  { title: "Kemitraan Kolaboratif", en: "Collaborative Partnership", desc: "Kami bekerja sebagai partner, bukan sekadar vendor.", descEn: "We work as partners, not just vendors." },
];

const h2 = "font-heading text-3xl font-semibold tracking-wide text-foreground md:text-4xl";
export default function EventManagementPage() {
  const wa = whatsappLink("Halo CLAPHAM.CO, saya ingin berkonsultasi tentang Event Management Service.");
  return (
    <div className="bg-background">
      <HeroCarousel>
        <div className="max-w-3xl [text-shadow:0_2px_24px_rgb(0_0_0/0.45)]">
          <h1 className="font-heading text-4xl font-semibold leading-tight tracking-wide md:text-6xl">
            <T en={<>We Bring Ideas to Life, Helping You <span className="text-primary">Achieve Your Goals</span></>}>
              Kami Mewujudkan Ide, dan Membantu Anda <span className="text-primary">Mencapai Tujuan</span>
            </T>
            <span className="sr-only"> - Event Management Service di Medan</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
            <T en="Strategic event management for brands, organizations, and communities aiming to create meaningful impact.">
              Manajemen event strategis untuk brand, organisasi, dan komunitas yang ingin menciptakan dampak nyata.
            </T>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3.5 font-semibold text-primary-foreground shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
              <T en="Plan Your Event">Rencanakan Event Anda</T>
            </a>
            <a href="#portofolio" className="inline-flex items-center justify-center rounded-md border border-white/70 px-8 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-white/15">
              <T en="See Our Work">Lihat Karya Kami</T>
            </a>
          </div>
        </div>
      </HeroCarousel>

      {/* Profile + video */}
      <section className="container mx-auto max-w-7xl px-4 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <h2 className={h2}>
              <T en={<>More Than Events: We Build <span className="text-brick">Experiences</span></>}>Lebih dari Sekadar Event: Kami Membangun <span className="text-brick">Pengalaman</span></T>
            </h2>
            <p className="mt-6 text-lg leading-loose text-muted-foreground md:text-justify">
              <T en="Since 2016, Clapham Collective has been an ecosystem connecting ideas, communities, and impact. We believe every event is an opportunity to create real change.">
                Sejak 2016, Clapham Collective telah menjadi ekosistem yang menghubungkan ide, komunitas, dan dampak. Kami percaya setiap event adalah kesempatan untuk menciptakan perubahan nyata.
              </T>
            </p>
          </div>
          <div className="reveal relative aspect-video overflow-hidden rounded-lg bg-black shadow-xl" style={{ "--i": 1 } as CSSProperties}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/SLSkMD3GjQs?autoplay=1&mute=1&controls=0&loop=1&playlist=SLSkMD3GjQs&modestbranding=1&rel=0"
              title="Company Profile"
              loading="lazy"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-chart-4/25 py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className={`reveal ${h2}`}>
            <T en={<>Why <span className="text-brick">Choose Us</span></>}>Mengapa <span className="text-brick">Memilih Kami</span></T>
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((s, i) => (
              <div key={s.title} className="reveal rounded-lg border border-t-4 border-border border-t-brick bg-card p-6 shadow-xs transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl md:p-8" style={{ "--i": i } as CSSProperties}>
                <h3 className="font-heading text-xl font-semibold tracking-wide text-card-foreground">
                  <T en={s.en}>{s.title}</T>
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  <T en={s.descEn}>{s.desc}</T>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="container mx-auto max-w-7xl px-4 py-24">
        <div>
          <h2 className={`reveal ${h2}`}>
            <T en={<>What we <span className="text-brick">handle</span></>}>Yang kami <span className="text-brick">tangani</span></T>
          </h2>
          <div className="mt-12 border-b border-border">
            {services.map((s, i) => (
              <div
                key={s.title}
                className="reveal group grid gap-4 border-t border-border py-8 transition-colors duration-300 hover:bg-card/60 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-12 md:px-4"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-heading text-sm font-semibold tracking-widest text-brick">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-heading text-xl font-semibold leading-snug tracking-wide text-foreground transition-colors duration-300 group-hover:text-brick">
                    <T en={s.en}>{s.title}</T>
                  </h3>
                </div>
                <ul className="grid gap-x-10 gap-y-2.5 text-muted-foreground sm:grid-cols-2">
                  {s.items.map((item, j) => (
                    <li key={item} className="leading-relaxed before:mr-3 before:inline-block before:h-px before:w-3 before:bg-brick before:align-middle">
                      <T en={s.itemsEn[j]}>{item}</T>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-secondary py-24">
       <div className="container mx-auto max-w-7xl px-4">
        <h2 className={`reveal ${h2}`}>
          <T en={<>Featured <span className="text-brick">Events</span></>}>Event <span className="text-brick">Pilihan</span></T>
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {featuredEvents.map((e, i) => (
            <Link
              key={e.slug}
              href={`${BASE}/${e.slug}`}
              className="reveal group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-xs transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
              style={{ "--i": i } as CSSProperties}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={e.image} alt={e.name} fill sizes="(min-width: 768px) 30vw, 100vw" quality={90} className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-xl font-semibold tracking-wide text-card-foreground transition-colors group-hover:text-brick">{e.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                  <T en={e.en!.description}>{e.description}</T>
                </p>
              </div>
            </Link>
          ))}
        </div>
       </div>
      </section>

      {/* Portfolio */}
      <section id="portofolio" className="container mx-auto max-w-7xl px-4 py-24">
        <h2 className={`reveal mb-4 ${h2}`}>
          <T en={<>Our <span className="text-brick">Events</span></>}>Event <span className="text-brick">Kami</span></T>
        </h2>
        <p className="reveal mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          <T en="A selection of events held and supported by our team.">Sebagian acara yang pernah kami selenggarakan dan dukung.</T>
        </p>
        <EventGrid />
      </section>

      {/* CTA (same as the other service pages) */}
      <ServiceCta contact="/atur-kunjungan?layanan=event-management" wa={wa} />
    </div>
  );
}
