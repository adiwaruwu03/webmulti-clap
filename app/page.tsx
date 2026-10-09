import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { T } from "../components/Lang";
import Facilities from "../components/Facilities";
import { serviceOrder, services as allServices } from "../lib/services";
import ContactSection from "../components/ContactSection";
import Faq from "../components/Faq";

// Home service grid. Copy and "Mulai dari" prices come from lib/services.ts (same source as the /layanan pages).
const card = (slug: string, img: string, cls: string, big = false) => {
  // Event Space is on hold and not in serviceOrder yet, so it keeps its own copy here.
  const o = serviceOrder.find((x) => x.slug === slug) ?? {
    name: "Event Space",
    blurb: ["Ruang acara untuk seminar, workshop, dan pertemuan komunitas.", "A venue for seminars, workshops, and community gatherings."],
  };
  return { title: o.name, desc: o.blurb[0], descEn: o.blurb[1], href: `/layanan/${slug}`, img, cls, big, from: allServices[slug]?.from };
};
const services = [
  card("coworking-space", "/layanan/Coworking-Space/CA - Flexible Desk.jpeg", "md:col-span-2 lg:row-span-2", true),
  card("private-office", "/layanan/Private-Office/brosur-private-office.webp", ""),
  card("meeting-room", "/layanan/Meeting-Room/brosur-stephen.webp", ""),
  card("event-space", "/layanan/Event-Space/brosur-event-space.webp", "md:col-span-2"),
  card("virtual-office", "/layanan/Coworking-Space/7F246124-E588-4CBE-8F6C-8ADD8DC80F47-1726-000000E549EFCA4F.jpg", ""),
  card("event-management", "/layanan/Event-Management-Service/hero-event-3.webp", ""),
  card("podcast-studio", "https://i.ytimg.com/vi/pJ1xKfAnqUI/maxresdefault.jpg", "md:col-span-2"),
];

const values = [
  {
    no: "01",
    title: "Tenang",
    titleEn: "Calm",
    desc: "Suasana kerja yang adem dan nyaman, agar Anda dan tim bisa fokus tanpa gangguan.",
    descEn: "A cool, comfortable working atmosphere so you and your team can focus without interruption.",
  },
  {
    no: "02",
    title: "Elegan",
    titleEn: "Elegant",
    desc: "Interior hangat dengan sentuhan modern yang membuat setiap hari kerja terasa istimewa.",
    descEn: "Warm interiors with a modern touch that make every workday feel special.",
  },
  {
    no: "03",
    title: "Aman",
    titleEn: "Secure",
    desc: "Akses yang terjaga dan lingkungan yang aman, sehingga Anda bisa bekerja dengan tenang.",
    descEn: "Controlled access and a safe environment, so you can work with peace of mind.",
  },
];

const collage = [
  { src: "/layanan/Meeting-Room/stephen3.jpg", alt: "Ruang meeting CLAPHAM.CO dengan meja kayu, TV, dan jendela besar", cls: "", pos: "object-[25%_50%]" },
  { src: "/foto-home/New%20folder/clpham-foto.webp", alt: "Area bar dan perpustakaan mini CLAPHAM.CO", cls: "md:mt-14" },
  { src: "/foto-home/New%20folder/clapham-foto2.webp", alt: "Lounge CLAPHAM.CO", cls: "" },
];

const partners = [
  { name: "Mekari", src: "/partners/mekari-logo.webp", w: 520, h: 100 },
  { name: "DBS", src: "/partners/dbs-logo.webp", w: 493, h: 144 },
  { name: "BCA", src: "/partners/bca.webp", w: 465, h: 144 },
  { name: "Kartu Prakerja", src: "/partners/logo-kartu-prakerja.webp", w: 450, h: 144 },
  { name: "Indonesia Baik", src: "/partners/indonesia-baik-logo.webp", w: 349, h: 144 },
  { name: "Zahav Techno Creative", src: "/partners/zahav-techno-creative-logo.webp", w: 268, h: 66 },
  { name: "Asosiasi Blockchain Indonesia", src: "/partners/asosiasi-blockchain-indonesia.webp", w: 344, h: 102 },
  { name: "GUAlokal", src: "/partners/gualokal.webp", w: 318, h: 76 },
  { name: "Letterist.co", src: "/partners/letterist.webp", w: 520, h: 131 },
  { name: "Soulmate", src: "/partners/soulmate.webp", w: 160, h: 160, label: "Soulmate" },
  { name: "Bakeout", src: "/partners/bakeout.webp", w: 520, h: 104 },
  { name: "Bakeout Society", src: "/partners/bakeout-society.webp", w: 272, h: 144 },
  { name: "M-Burger", src: "/partners/m-burger.webp", w: 520, h: 129 },
  { name: "Coffeenatics", src: "/partners/coffeenatics.webp", w: 144, h: 144, label: "Coffeenatics" },
  { name: "LivWell Clinic Medan", src: "/partners/livwell-clinic-medan-logo.webp", w: 171, h: 81 },
  { name: "Sistech Kharisma", src: "/partners/sistec-logo.webp", w: 159, h: 144 },
  { name: "PT Sumatra Tobacco Trading Company", src: "/partners/pt-sumatra-tobacco-trading-company-logo.webp", w: 402, h: 144 },
  { name: "Haengun.id", src: "/partners/haengun-id.webp", w: 97, h: 123 },
  { name: "Clapham Education Series - Higher Education Day 2024", src: "/partners/clapham-education-series.webp", w: 488, h: 144 },
  { name: "PT Kanvas Mitra Aktiva", src: "/partners/pt-kanvas-mitra-aktiva.webp", w: 520, h: 37 },
];

const testimonials = [
  {
    quote:
      "Pengalaman yang sangat luar biasa mengadakan acara HUT komunitas pemuda kami di Clapham Collective… Ruangannya sangat luas, audiensnya josss, dan suasana dan lightingnya sangat mendukung.",
    quoteEn:
      "An amazing experience hosting our youth community's anniversary event at Clapham Collective… The room is very spacious, the audience was great, and the atmosphere and lighting were very supportive.",
    name: "Vincent Junedy Luis",
  },
  {
    quote:
      "Clapham menjadi tempat yang sangat cocok untuk mengadakan workshop. Tempatnya nyaman, bersih, dengan fasilitas yang lengkap dan suasana yang kondusif. Pelayanannya juga ramah serta sangat membantu selama kegiatan berlangsung. Terima kasih Clapham sudah memfasilitasi kegiatan kami dengan sangat baik.",
    quoteEn:
      "Clapham is a great place to hold workshops. The venue is comfortable and clean, with complete facilities and a conducive atmosphere. The service was also friendly and very helpful throughout the event. Thank you Clapham for facilitating our activities so well.",
    name: "Jeanne elga",
  },
  {
    quote:
      "Nyaman, tenang, dan sangat mendukung produktivitas. Salah satu co-working space terbaik di Medan. Sangat direkomendasikan juga untuk acara!",
    quoteEn:
      "Comfortable, quiet, and highly supportive of productivity. One of the best co-working spaces in Medan. Also highly recommended for events!",
    name: "Celia Fransiska",
  },
  {
    quote:
      "Clapham menyediakan fasilitas coworking termasuk ruang serbaguna yang bisa disewa untuk rapat maupun acara seminar dalam skala kecil.",
    quoteEn:
      "Clapham provides coworking facilities, including a multipurpose room that can be rented for meetings or small-scale seminars.",
    name: "Edwin Petrus",
  },
  {
    quote:
      "Tempatnya nyaman untuk kegiatan meeting atau training. Para stafnya ramah dan sigap membantu. Makanannya juga enak dan cocok di lidah. Terima kasih Clapham sudah membantu mensukseskan kegiatan kami.",
    quoteEn:
      "A comfortable place for meetings or training. The staff are friendly and quick to help. The food is also delicious and suits the palate. Thank you Clapham for helping make our event a success.",
    name: "Endah Juarsih",
  },
  {
    quote:
      "Kalau kerja kelompok di kampus sering terganggu karena berisik, tapi sejak sewa ruang kantor, semuanya jadi lebih efektif. Bisa diskusi tanpa ribut, ada whiteboard buat brainstorming, dan pastinya lebih fokus dibanding di kafe. Di sini suasananya bagus dan mendukung untuk belajar dan kerja.",
    quoteEn:
      "Group work on campus is often disrupted by noise, but since renting office space, everything has become more effective. We can discuss without the racket, there's a whiteboard for brainstorming, and it's definitely more focused than a café. The atmosphere here is great and supports studying and working.",
    name: "annisa nst",
  },
];

const i = (n: number) => ({ "--i": n }) as CSSProperties;
const delay = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero */}
      <section id="home" className="relative w-full min-h-screen -mt-16 flex items-end overflow-hidden bg-black">
        <Image
          src="/foto-home/hero.jpg.jpeg"
          alt="Interior CLAPHAM.CO"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          quality={90}
          className="object-cover animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/45" />
        <h1 className="sr-only">
          <T en="Coworking Space and Office Rental in Medan - CLAPHAM.CO">Coworking Space dan Sewa Kantor di Medan - CLAPHAM.CO</T>
        </h1>

        <div className="relative z-10 w-full px-4 pb-12 md:pb-16">
          <div
            className="animate-fade-up flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-sm tracking-[0.18em] uppercase text-white/85"
            style={delay(0.6)}
          >
            <span>Ruko Center Point Medan</span>
            <span className="hidden sm:block h-3 w-px bg-white/30" />
            <span>
              <T en="Monday–Friday, 09.00–17.00">Senin–Jumat, 09.00–17.00</T>
            </span>
            <span className="hidden sm:block h-3 w-px bg-white/30" />
            <span>
              <T en="Secure, guarded access">Akses aman &amp; terjaga</T>
            </span>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-28 bg-card">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="reveal font-heading tracking-wide font-semibold text-3xl md:text-4xl text-foreground leading-snug mb-10">
            <T
              en={
                <>
                  CLAPHAM.CO is a provider of{" "}
                  <span className="text-brick">coworking space and office rental</span> in Medan
                </>
              }
            >
              CLAPHAM.CO adalah penyedia{" "}
              <span className="text-brick">coworking space dan sewa kantor</span> di Medan
            </T>
          </h2>
          <div className="reveal space-y-5 text-muted-foreground text-lg leading-loose" style={i(1)}>
            <p>
              <T en="Optimize your team's productivity with the right workspace. CLAPHAM.CO offers modern, flexible, and comprehensive solutions for a dynamic, ever-changing world of work.">
                Optimalkan produktivitas tim Anda dengan ruang kerja yang tepat.
                CLAPHAM.CO menyediakan solusi modern, fleksibel, dan komprehensif
                di dunia kerja yang dinamis dan terus berubah.
              </T>
            </p>
            <p>
              <T en="Located at Ruko Centre Point Medan, we provide coworking space, private offices, meeting rooms, event space, virtual office, and a podcast studio for individuals, startups, and companies.">
                Berlokasi di Ruko Centre Point Medan, kami menyediakan coworking
                space, private office, ruang meeting, event space, virtual office,
                hingga studio podcast untuk individu, startup, dan perusahaan.
              </T>
            </p>
          </div>
          <div className="reveal mt-10 flex flex-wrap justify-center gap-4" style={i(2)}>
            <a
              href="#booking"
              className="inline-flex items-center rounded-md bg-primary px-7 py-3.5 font-semibold text-primary-foreground hover:brightness-95 active:scale-[0.98] transition-all duration-300"
            >
              <T en="Contact Us">Kontak Kami</T>
            </a>
            <a
              href="#layanan"
              className="inline-flex items-center rounded-md border border-border px-7 py-3.5 font-semibold text-foreground hover:border-teal-ink hover:text-teal-ink transition-colors duration-300"
            >
              <T en="View Services">Lihat Layanan</T>
            </a>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl min-[1200px]:max-w-7xl mt-20 grid grid-cols-3 gap-3 md:gap-6">
          {collage.map((c, n) => (
            <div key={c.src} className={`reveal ${c.cls}`} style={i(n)}>
              <div className="relative aspect-[3/4] min-[1200px]:aspect-[5/6] overflow-hidden rounded-lg">
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 1024px) 820px, (min-width: 640px) 500px, 270px"
                  quality={90}
                  className={`object-cover ${c.pos ?? ""} transition-transform duration-700 ease-out hover:scale-105`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nilai */}
      <section className="dark bg-background text-foreground py-24 md:py-28">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="reveal font-heading tracking-wide font-semibold text-3xl md:text-5xl leading-tight max-w-3xl mb-16">
            <T en="A calm workspace, for a clear mind">Ruang kerja yang tenang, untuk pikiran yang jernih</T>
          </h2>
          <div className="grid md:grid-cols-3 gap-10 md:gap-12">
            {values.map((v, n) => (
              <div key={v.no} className="reveal border-t border-border pt-8" style={i(n)}>
                <p className="font-heading font-semibold text-6xl text-teal-ink mb-6">{v.no}</p>
                <h3 className="font-heading tracking-wide font-semibold text-2xl mb-3">
                  <T en={v.titleEn}>{v.title}</T>
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  <T en={v.descEn}>{v.desc}</T>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layanan */}
      <section id="layanan" className="py-28">
        <div className="container mx-auto px-4">
          <div className="reveal max-w-2xl mx-auto text-center mb-16">
            <h2 className="font-heading tracking-wide font-semibold text-4xl md:text-5xl text-foreground mb-5 leading-tight">
              <T en="Find Your Ideal Workspace">Temukan Ruang Kerja Ideal Anda</T>
            </h2>
            <p className="text-muted-foreground text-lg">
              <T en="Discover your ideal workspace here! Explore our range of private and shared workspaces, all with flexible plans and payment options.">
                Cari tahu ruang kerja ideal Anda di sini! Jelajahi berbagai
                pilihan ruang kerja pribadi dan bersama kami, semuanya dengan
                paket dan opsi pembayaran yang fleksibel.
              </T>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[18rem] lg:auto-rows-[17rem] lg:grid-flow-dense gap-4 md:gap-5">
            {services.map((s, n) => (
              <div key={s.title} className={`reveal ${s.cls}`} style={i(n % 4)}>
                <Link
                  href={s.href}
                  className="group relative block h-full overflow-hidden rounded-lg bg-secondary shadow-sm hover:shadow-xl transition-shadow duration-500"
                >
                  {s.img.startsWith("http") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.img} alt={s.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110" />
                  ) : (
                    <Image src={s.img} alt={s.title} fill sizes={s.big ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"} quality={90} className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110" />
                  )}
                  {/* dark scrim so the white text always reads */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-white [text-shadow:0_1px_12px_rgb(0_0_0/0.45)]">
                    <h3 className={`font-heading tracking-wide font-semibold ${s.big ? "text-2xl md:text-3xl" : "text-xl"} mb-2`}>
                      {s.title}
                    </h3>
                    <p className={`text-sm md:text-base leading-relaxed text-white/85 max-w-md transition-all duration-500 ${s.big ? "" : "lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-32 lg:group-hover:opacity-100"}`}>
                      <T en={s.descEn}>{s.desc}</T>
                    </p>
                    {s.from && (
                      <p className="mt-3 text-sm text-white/80">
                        <T en="From">Mulai dari</T>{" "}
                        <span className="font-heading text-base font-semibold text-white">{s.from.price}</span>
                        <T en={s.from.unit[1]}>{s.from.unit[0]}</T>
                      </p>
                    )}
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      <T en="Learn more">Pelajari selengkapnya</T>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1.5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fasilitas */}
      <Facilities />

      {/* Lokasi */}
      <section className="py-28 bg-card">
        <div className="container mx-auto px-4 max-w-7xl grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="reveal overflow-hidden rounded-lg border border-border shadow-md">
            <iframe
              title="Lokasi CLAPHAM.CO di Ruko Centre Point Medan"
              src="https://www.google.com/maps?q=COHIVE+at+Clapham&ll=3.5926181,98.681436&z=15&hl=id&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full md:h-[26rem]"
            />
          </div>
          <div className="reveal" style={i(1)}>
            <h2 className="font-heading tracking-wide font-semibold text-3xl md:text-4xl text-foreground mb-8 leading-tight">
              <T
                en={
                  <>
                    Work More Flexibly in the <span className="text-brick">Heart of Medan</span>
                  </>
                }
              >
                Kerja Lebih Fleksibel di <span className="text-brick">Jantung Kota Medan</span>
              </T>
            </h2>
            <p className="text-muted-foreground text-lg leading-loose mb-8 text-justify hyphens-auto">
              <T en="With a strategic location in East Medan, your team can work productively from a space that fits their needs. Whether working closer to home, accessing various workspaces, or working from headquarters, CLAPHAM.CO gives you the flexibility to grow in any environment.">
                Dengan lokasi strategis di Medan Timur, tim Anda dapat bekerja
                produktif dari ruang yang sesuai dengan kebutuhan. Baik itu bekerja
                lebih dekat ke rumah, mengakses berbagai ruang kerja, atau bekerja
                dari kantor pusat, CLAPHAM.CO memberikan fleksibilitas bagi Anda
                untuk berkembang di lingkungan apa pun.
              </T>
            </p>
            <a
              href="https://www.google.com/maps/place/COHIVE+at+Clapham/@3.5926181,98.681436,17z/data=!4m6!3m5!1s0x303131c784afcce9:0x1c0f6a9ddeb16361!8m2!3d3.5926181!4d98.681436"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-semibold text-primary-foreground hover:brightness-95 active:scale-[0.98] transition-all duration-300"
            >
              <T en="Open in Google Maps">Buka di Google Maps</T>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Partner */}
      <section className="py-24 bg-card border-b border-border">
        <div className="reveal container mx-auto px-4 text-center mb-14">
          <h2 className="font-heading tracking-wide font-semibold text-3xl md:text-4xl text-foreground mb-4">
            <T en="CLAPHAM.CO Partners">Partner CLAPHAM.CO</T>
          </h2>

        </div>
        <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max items-center animate-marquee [animation-duration:110s] group-hover:[animation-play-state:paused]">
            {[...partners, ...partners].map((p, n) => (
              <div key={n} className={`mx-8 md:mx-12 flex h-20 items-center justify-center gap-3 ${"label" in p ? "w-auto" : "w-44 md:w-52"}`} aria-hidden={n >= partners.length}>
                <img
                  src={p.src}
                  fetchPriority="low"
                  decoding="async"
                  alt={n < partners.length ? p.name : ""}
                  width={p.w}
                  height={p.h}
                  className={`${p.w / p.h < 1.3 ? "max-h-[4.5rem] md:max-h-20" : "max-h-14 md:max-h-16"} w-auto max-w-full object-contain mix-blend-multiply transition duration-500 hover:scale-110`}
                />
                {"label" in p && (
                  <span className="font-heading text-lg md:text-xl font-semibold tracking-wide text-foreground whitespace-nowrap">
                    {p.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Office */}
      <section className="py-28 bg-secondary">
        <div className="container mx-auto px-4 max-w-7xl grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/foto-home/hero.jpg.jpeg"
              alt="Area kerja bersama CLAPHAM.CO"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              quality={90}
              className="object-cover"
            />
          </div>
          <div className="reveal" style={i(1)}>
            <h2 className="font-heading tracking-wide font-semibold text-3xl md:text-4xl text-foreground mb-6 leading-tight">
              <T en="Virtual Office: A Professional Business Address Solution">Virtual Office: Solusi Alamat Kantor Profesional</T>
            </h2>
            <p className="text-muted-foreground text-lg leading-loose mb-8 text-justify hyphens-auto">
              <T en="Enjoy a premium business address at Ruko Centre Point Medan without the cost of a full office lease. Ideal for startups, SMEs, and companies that need a professional business address.">
                Nikmati alamat bisnis premium di Ruko Centre Point Medan tanpa
                biaya sewa kantor penuh. Cocok untuk startup, UMKM, dan perusahaan
                yang membutuhkan alamat usaha yang profesional.
              </T>
            </p>
            <Link
              href="/layanan/virtual-office"
              className="group inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3.5 font-semibold text-primary-foreground hover:brightness-95 active:scale-[0.98] transition-all duration-300"
            >
              <T en="Learn About Virtual Office">Pelajari Tentang Virtual Office</T>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="py-28">
        <div className="container mx-auto px-4">
          <div className="reveal text-center mb-16">
            <h2 className="font-heading tracking-wide font-semibold text-4xl md:text-5xl text-foreground">
              <T en="What They Say">Kata Mereka</T>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {testimonials.map((t, n) => (
              <div key={t.name} className="reveal" style={i(n % 3)}>
                <figure className="relative flex h-full flex-col bg-card p-8 rounded-lg border border-border shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                  <span className="absolute top-4 right-6 font-heading tracking-wide text-7xl leading-none text-brick/20 select-none">&rdquo;</span>
                  <div className="flex gap-0.5 text-brick mb-5">
                    {[...Array(5)].map((_, k) => (
                      <svg key={k} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    ))}
                  </div>
                  <blockquote className="font-heading tracking-wide text-lg text-card-foreground leading-relaxed mb-8 flex-grow">
                    &ldquo;<T en={t.quoteEn}>{t.quote}</T>&rdquo;
                  </blockquote>
                  <figcaption className="border-t border-border pt-5">
                    <p className="font-semibold text-card-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">
                      <T en="Google review">Ulasan Google</T>
                    </p>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
          <div className="reveal mt-12 text-center">
            <a
              href="https://www.google.com/maps/place/COHIVE+at+Clapham/@3.5926181,98.6788611,697m/data=!3m1!1e3!4m16!1m9!3m8!1s0x303131c784afcce9:0x1c0f6a9ddeb16361!2sCOHIVE+at+Clapham!8m2!3d3.5926181!4d98.681436!9m1!1b1!16s%2Fg%2F11bwc10nt0!3m5!1s0x303131c784afcce9:0x1c0f6a9ddeb16361!8m2!3d3.5926181!4d98.681436!16s%2Fg%2F11bwc10nt0"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md border border-border px-7 py-3.5 font-semibold text-foreground hover:border-teal-ink hover:text-teal-ink transition-colors duration-300"
            >
              <T en="See all reviews on Google Maps">Lihat semua ulasan di Google Maps</T>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </a>
          </div>
        </div>
      </section>

      <Faq />

      {/* Booking + Lokasi */}
      <ContactSection />
    </div>
  );
}
