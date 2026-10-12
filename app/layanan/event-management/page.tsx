import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import Link from "next/link";
import { T } from "../../../components/Lang";
import HeroCarousel from "../../../components/events/HeroCarousel";
import EventGrid from "../../../components/events/EventGrid";
import ServiceCta from "../../../components/service/ServiceCta";
import Reveal from "../../../components/Reveal";
import AboutClapham from "../../../components/AboutClapham";
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

const steps = [
  { t: "Konsultasi Awal", en: "Initial Consultation", d: "Kami menerima kebutuhan awal Anda dan memahami gambaran umum acara yang ingin diselenggarakan.", dEn: "We receive your initial needs and understand the general overview of the event to be held." },
  { t: "Konsultasi Kebutuhan", en: "Needs Consultation", d: "Diskusi lebih lanjut untuk menggali detail acara, tujuan, serta ekspektasi yang ingin dicapai.", dEn: "Further discussion to explore event details, objectives, and desired expectations." },
  { t: "Penyusunan Penawaran / Proposal", en: "Proposal Preparation", d: "Kami menyiapkan proposal yang mencakup konsep, ruang lingkup layanan, serta estimasi biaya.", dEn: "We prepare a proposal covering the concept, scope of services, and cost estimation." },
  { t: "Konfirmasi Kerja Sama", en: "Collaboration Confirmation", d: "Setelah disetujui, kerja sama difinalisasi melalui agreement dan pembayaran awal.", dEn: "Once approved, the collaboration is finalized through an agreement and initial payment." },
  { t: "Perencanaan & Persiapan", en: "Planning & Preparation", d: "Tim kami mulai menyiapkan seluruh kebutuhan acara secara terstruktur dan terkoordinasi.", dEn: "Our team begins preparing all event needs in a structured and coordinated manner." },
  { t: "Pelaksanaan Event", en: "Event Execution", d: "Acara dijalankan sesuai rencana dengan pengawasan penuh dari tim kami.", dEn: "The event is carried out according to plan with full supervision from our team." },
  { t: "Dokumentasi & Evaluasi", en: "Documentation & Evaluation", d: "Kami menyediakan dokumentasi serta melakukan evaluasi untuk peningkatan ke depannya.", dEn: "We provide documentation and conduct evaluations for future improvement." },
];

const h2 = "font-heading text-3xl font-semibold tracking-wide text-foreground md:text-4xl";
export default function EventManagementPage() {
  const wa = whatsappLink("Halo CLAPHAM.CO, saya ingin berkonsultasi tentang Event Management Service.");
  return (
    <div className="bg-background">
      <Reveal />
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

      {/* Company profile + video (dark band, as on the reference page) */}
      <section className="dark bg-background py-24 text-foreground">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="rv">
              <h2 className={h2}>
                <T en={<>More Than Events: We Build <span className="text-brick">Experiences</span></>}>Lebih dari Sekadar Event: Kami Membangun <span className="text-brick">Pengalaman</span></T>
              </h2>
              <p className="mt-6 text-lg leading-loose text-muted-foreground md:text-justify">
                <T en="Since 2016, Clapham Collective has been an ecosystem connecting ideas, communities, and impact. We believe every event is an opportunity to create real change.">
                  Sejak 2016, Clapham Collective telah menjadi ekosistem yang menghubungkan ide, komunitas, dan dampak. Kami percaya setiap event adalah kesempatan untuk menciptakan perubahan nyata.
                </T>
              </p>
            </div>
            <div className="rv relative aspect-video overflow-hidden rounded-lg bg-black shadow-xl" style={{ "--i": 1 } as CSSProperties}>
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
        </div>
      </section>

      {/* Why us */}
      <section className="bg-card py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className={`rv ${h2}`}>
            <T en={<>Why <span className="text-brick">Choose Us</span></>}>Mengapa <span className="text-brick">Memilih Kami</span></T>
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((s, i) => (
              <div key={s.title} className="rv group relative overflow-hidden rounded-lg border border-t-4 border-border border-t-brick bg-background p-6 shadow-xs transition-all duration-300 hover:-translate-y-2 hover:border-foreground/20 hover:shadow-xl md:p-8" style={{ "--i": i } as CSSProperties}>
                <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <h3 className="font-heading text-xl font-semibold tracking-wide text-foreground">
                    <T en={s.en}>{s.title}</T>
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    <T en={s.descEn}>{s.desc}</T>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured moments */}
      <section className="bg-background py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className={`rv ${h2}`}>
            <T en={<>Featured <span className="text-brick">Moments</span></>}>Momen <span className="text-brick">Terpilih</span></T>
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {featuredEvents.map((e, i) => (
              <Link key={e.slug} href={`${BASE}/${e.slug}`} className="rv group block" style={{ "--i": i } as CSSProperties}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-xs">
                  <Image src={e.image} alt={e.name} fill sizes="(min-width: 768px) 30vw, 100vw" quality={90} className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-foreground/55 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="p-5 text-sm font-medium text-white"><T en="Read More">Baca Selengkapnya</T></span>
                  </div>
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold tracking-wide text-foreground transition-colors group-hover:text-brick">{e.name}</h3>
                <p className="mt-2 line-clamp-2 leading-relaxed text-muted-foreground">
                  <T en={e.en!.description}>{e.description}</T>
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <a href="#portofolio" className="text-sm font-semibold text-teal-ink underline-offset-4 transition-colors hover:text-brick hover:underline">
              <T en="View All Events">Lihat Semua Event</T>
            </a>
          </div>
        </div>
      </section>

      {/* Services + process */}
      <section className="bg-card py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className={`rv ${h2}`}>
            <T en={<>Our <span className="text-brick">Services</span></>}>Layanan <span className="text-brick">Kami</span></T>
          </h2>
          <p className="rv mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            <T en="We provide end-to-end event solutions designed to deliver impactful, seamless, and memorable experiences.">
              Kami menyediakan solusi event end-to-end yang dirancang untuk memberikan pengalaman yang berdampak, lancar, dan berkesan.
            </T>
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((s, i) => (
              <div key={s.title} className="rv group relative overflow-hidden rounded-lg border border-border bg-background p-6 shadow-xs transition-all duration-500 hover:-translate-y-1 hover:shadow-lg" style={{ "--i": i % 4 } as CSSProperties}>
                <div aria-hidden className="absolute right-0 top-0 h-full w-1 bg-brick transition-all duration-500 group-hover:w-full" />
                <div className="relative z-10">
                  <span className="font-heading text-sm font-semibold tracking-widest text-brick transition-colors duration-300 group-hover:text-white/80">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-heading text-lg font-semibold leading-snug tracking-wide text-foreground transition-colors duration-300 group-hover:text-white">
                    <T en={s.en}>{s.title}</T>
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-white">
                    {s.items.map((item, j) => (
                      <li key={item} className="leading-relaxed before:mr-2.5 before:inline-block before:h-px before:w-3 before:bg-brick before:align-middle before:transition-colors before:duration-300 group-hover:before:bg-white/80">
                        <T en={s.itemsEn[j]}>{item}</T>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <h3 className="rv mt-28 font-heading text-2xl font-semibold tracking-wide text-foreground md:text-3xl">
            <T en={<>Our <span className="text-brick">Process</span></>}>Cara Kerja <span className="text-brick">Kami</span></T>
          </h3>
          <div className="mt-12 flex flex-wrap justify-center gap-5">
            {steps.map((st, i) => (
              <div key={st.t} className="rv group relative w-full overflow-hidden rounded-lg border border-border bg-background p-6 shadow-xs transition-all duration-500 hover:-translate-y-1 hover:shadow-lg sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.95rem)]" style={{ "--i": i % 4 } as CSSProperties}>
                <div aria-hidden className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-primary/40 transition-transform duration-500 group-hover:scale-150" />
                <div aria-hidden className="absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-brick/10 transition-transform delay-100 duration-500 group-hover:scale-150" />
                <div className="relative z-10">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading text-sm font-semibold text-primary-foreground shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">{String(i + 1).padStart(2, "0")}</span>
                  <h4 className="mt-4 font-heading text-lg font-semibold tracking-wide text-foreground transition-colors duration-300 group-hover:text-brick">
                    <T en={st.en}>{st.t}</T>
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    <T en={st.dEn}>{st.d}</T>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section id="portofolio" className="container mx-auto max-w-7xl px-4 py-24">
        <h2 className={`rv mb-4 ${h2}`}>
          <T en={<>Our <span className="text-brick">Events</span></>}>Event <span className="text-brick">Kami</span></T>
        </h2>
        <p className="rv mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          <T en="A selection of events held and supported by our team.">Sebagian acara yang pernah kami selenggarakan dan dukung.</T>
        </p>
        <EventGrid />
      </section>

      {/* About Clapham Collective (text + photo slider + stats) */}
      <AboutClapham />

      {/* CTA (same as the other service pages) */}
      <ServiceCta contact="/atur-kunjungan?layanan=event-management" wa={wa} />
    </div>
  );
}
