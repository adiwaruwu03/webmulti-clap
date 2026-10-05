import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { T } from "../components/Lang";
import ConsultForm from "../components/ConsultForm";

const services = [
  {
    title: "Coworking Space",
    desc: "Kursi fleksibel di ruang bersama yang nyaman, hangat, dan mendukung kolaborasi.",
    descEn: "Flexible seats in a shared space that is comfortable, warm, and built for collaboration.",
    href: "/layanan/coworking-space",
    img: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=1400&auto=format&fit=crop",
    cls: "md:col-span-2 lg:row-span-2",
    big: true,
  },
  {
    title: "Private Office",
    desc: "Ruang privat yang tenang untuk tim yang butuh fokus tanpa gangguan.",
    descEn: "A quiet private space for teams that need focus without distraction.",
    href: "/layanan/private-office",
    img: "https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=800&auto=format&fit=crop",
    cls: "",
  },
  {
    title: "Meeting Room",
    desc: "Ruang rapat profesional dengan perangkat lengkap untuk presentasi lancar.",
    descEn: "Professional meeting rooms with complete equipment for smooth presentations.",
    href: "/layanan/meeting-room",
    img: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=800&auto=format&fit=crop",
    cls: "",
  },
  {
    title: "Event Space",
    desc: "Ruang acara fleksibel untuk workshop, seminar, peluncuran produk, dan pertemuan komunitas.",
    descEn: "A flexible venue for workshops, seminars, product launches, and community gatherings.",
    href: "/layanan/event-space",
    img: "/foto-home/New%20folder/clapham-foto2.webp",
    cls: "md:col-span-2",
  },
  {
    title: "Virtual Office",
    desc: "Alamat bisnis premium untuk membangun kredibilitas perusahaan Anda.",
    descEn: "A premium business address to build your company's credibility.",
    href: "/layanan/virtual-office",
    img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop",
    cls: "",
  },
  {
    title: "Event Management Service",
    desc: "Perencanaan hingga pelaksanaan acara, dari konsep dan teknis sampai dokumentasi.",
    descEn: "Planning through execution for your events, from concept and logistics to documentation.",
    href: "/layanan/event-management",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=900&auto=format&fit=crop",
    cls: "",
  },
  {
    title: "Podcast Studio",
    desc: "Studio rekaman yang nyaman dengan perangkat audio siap pakai untuk konten Anda.",
    descEn: "A comfortable recording studio with ready-to-use audio equipment for your content.",
    href: "/layanan/podcast-studio",
    img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1200&auto=format&fit=crop",
    cls: "md:col-span-2",
  },
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
  { src: "/foto-home/New%20folder/clapham-foto3.webp", alt: "Area kerja bersama CLAPHAM.CO", cls: "" },
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
      "CLAPHAM.CO memberi lingkungan yang pas untuk startup kami berkembang. Fasilitas rapi dan komunitasnya hangat.",
    quoteEn:
      "CLAPHAM.CO gave our startup the right environment to grow. The facilities are tidy and the community is warm.",
    name: "Budi Santoso",
    role: "CEO, TechNusa",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    quote:
      "Ruang rapatnya lengkap dan internetnya cepat. Coworking space paling nyaman yang pernah saya pakai di kota ini.",
    quoteEn:
      "The meeting rooms are complete and the internet is fast. The most comfortable coworking space I've ever used in this city.",
    name: "Siti Rahma",
    role: "Freelance Designer",
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    quote:
      "Pindah ke private office di sini keputusan terbaik untuk tim kami. Staf-nya ramah dan sangat membantu.",
    quoteEn:
      "Moving to a private office here was the best decision for our team. The staff are friendly and very helpful.",
    name: "Andi Wijaya",
    role: "Marketing Director",
    avatar: "https://i.pravatar.cc/150?u=3",
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
              <T en="Schedule a Visit">Atur Kunjungan</T>
            </a>
            <a
              href="#layanan"
              className="inline-flex items-center rounded-md border border-border px-7 py-3.5 font-semibold text-foreground hover:border-teal-ink hover:text-teal-ink transition-colors duration-300"
            >
              <T en="View Services">Lihat Layanan</T>
            </a>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl mt-20 grid grid-cols-3 gap-3 md:gap-6">
          {collage.map((c, n) => (
            <div key={c.src} className={`reveal ${c.cls}`} style={i(n)}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src={c.src}
                  alt={c.alt}
                  fill
                  sizes="1400px"
                  quality={90}
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
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
                  <img
                    src={s.img}
                    alt={s.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 text-white">
                    <h3 className={`font-heading tracking-wide font-semibold ${s.big ? "text-2xl md:text-3xl" : "text-xl"} mb-2`}>
                      {s.title}
                    </h3>
                    <p className={`text-sm md:text-base leading-relaxed text-white/85 max-w-md transition-all duration-500 ${s.big ? "" : "lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-32 lg:group-hover:opacity-100"}`}>
                      <T en={s.descEn}>{s.desc}</T>
                    </p>
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

      {/* Lokasi */}
      <section className="py-28 bg-card">
        <div className="container mx-auto px-4 max-w-7xl grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="reveal overflow-hidden rounded-lg border border-border shadow-md">
            <iframe
              title="Lokasi CLAPHAM.CO di Ruko Centre Point Medan"
              src="https://www.google.com/maps?q=Komp.+Ruko+Centre+Point+Medan+Jalan+Timor+Blok+G+No.+III%2FIV&output=embed"
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
              href="https://www.google.com/maps/search/?api=1&query=Komp.+Ruko+Centre+Point+Medan+Jalan+Timor+Blok+G+No.+III%2FIV"
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
              <div key={t.name} className="reveal" style={i(n)}>
                <figure className="relative h-full bg-card p-8 rounded-lg border border-border shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                  <span className="absolute top-4 right-6 font-heading tracking-wide text-7xl leading-none text-brick/20 select-none">&rdquo;</span>
                  <div className="flex gap-0.5 text-brick mb-5">
                    {[...Array(5)].map((_, k) => (
                      <svg key={k} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                    ))}
                  </div>
                  <blockquote className="font-heading tracking-wide text-lg text-card-foreground leading-relaxed mb-8">
                    &ldquo;<T en={t.quoteEn}>{t.quote}</T>&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-teal-ink/30" />
                    <div>
                      <p className="font-semibold text-card-foreground">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking + Lokasi */}
      <section id="booking" className="dark bg-background text-foreground py-28 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/25 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-32 -left-24 w-96 h-96 bg-brick/20 rounded-full blur-3xl animate-float [animation-delay:-6s]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 items-start">
            <div className="reveal md:col-span-3 bg-card/60 backdrop-blur-xl rounded-xl p-8 md:p-10 border border-border shadow-2xl">
              <h2 className="font-heading tracking-wide font-semibold text-3xl md:text-4xl mb-3 leading-tight">
                <T en="Discuss Your Needs">Konsultasikan Kebutuhan Anda</T>
              </h2>
              <p className="text-muted-foreground mb-8">
                <T en="Need help finding a workspace? Fill in the form below.">Butuh bantuan untuk mencari ruang kerja? Isi formulir di bawah ini.</T>
              </p>
              <ConsultForm options={services.map((s) => ({ value: s.href.split("/").pop() as string, label: s.title }))} />
            </div>

            <div className="reveal md:col-span-2 space-y-8 md:pt-6" style={i(1)}>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-ink mb-3">
                  <T en="Location">Lokasi</T>
                </h3>
                <p className="text-foreground/90 leading-relaxed">
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
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-ink mb-3">
                  <T en="Opening Hours">Jam Operasional</T>
                </h3>
                <p className="text-foreground/90">
                  <T en="Monday–Friday, 09.00–17.00">Senin–Jumat, 09.00–17.00</T>
                </p>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Komp.+Ruko+Centre+Point+Medan+Jalan+Timor+Blok+G+No.+III%2FIV"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-teal-ink hover:text-teal-ink transition-colors duration-300"
              >
                <T en="Open in Google Maps">Buka di Google Maps</T>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
