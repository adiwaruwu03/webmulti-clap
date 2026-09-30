import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

const services = [
  {
    title: "Private Office",
    desc: "Ruang privat yang tenang untuk tim yang butuh fokus tanpa gangguan.",
    href: "/layanan/private-office",
    img: "https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Coworking Space",
    desc: "Kursi fleksibel di ruang bersama yang nyaman, hangat, dan mendukung kolaborasi.",
    href: "/layanan/coworking-space",
    img: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Meeting Room",
    desc: "Ruang rapat profesional dengan perangkat lengkap untuk presentasi lancar.",
    href: "/layanan/meeting-room",
    img: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Virtual Office",
    desc: "Alamat bisnis premium untuk membangun kredibilitas perusahaan Anda.",
    href: "/layanan/virtual-office",
    img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop",
  },
];

const partners = ["Acme Corp", "Globex", "Soylent", "Initech", "Umbrella", "Hooli", "Stark Co", "Wayne Group"];

const testimonials = [
  {
    quote:
      "CLAPHAM.CO memberi lingkungan yang pas untuk startup kami berkembang. Fasilitas rapi dan komunitasnya hangat.",
    name: "Budi Santoso",
    role: "CEO, TechNusa",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    quote:
      "Ruang rapatnya lengkap dan internetnya cepat. Coworking space paling nyaman yang pernah saya pakai di kota ini.",
    name: "Siti Rahma",
    role: "Freelance Designer",
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    quote:
      "Pindah ke private office di sini keputusan terbaik untuk tim kami. Staf-nya ramah dan sangat membantu.",
    name: "Andi Wijaya",
    role: "Marketing Director",
    avatar: "https://i.pravatar.cc/150?u=3",
  },
];

const i = (n: number) => ({ "--i": n }) as CSSProperties;
const delay = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

const inputClass =
  "w-full bg-background/60 text-foreground placeholder:text-muted-foreground border border-input rounded-md px-4 py-3.5 outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-teal-ink/30";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero */}
      <section id="home" className="relative w-full min-h-screen -mt-16 flex items-end overflow-hidden bg-black">
        <Image
          src="/foto-home/hero.jpg.jpeg"
          alt="Interior CLAPHAM.CO"
          fill
          priority
          sizes="100vw"
          className="object-cover animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/45" />

        <div className="relative z-10 w-full px-4 pb-12 md:pb-16">
          <div
            className="animate-fade-up flex flex-wrap items-center justify-center gap-x-10 gap-y-2 text-sm tracking-[0.18em] uppercase text-white/85"
            style={delay(0.6)}
          >
            <span>Ruko Center Point Medan</span>
            <span className="hidden sm:block h-3 w-px bg-white/30" />
            <span>Senin–Jumat, 09.00–17.00</span>
            <span className="hidden sm:block h-3 w-px bg-white/30" />
            <span>Akses aman &amp; terjaga</span>
          </div>
        </div>
      </section>

      {/* Tentang */}
      <section className="py-28 bg-card">
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-14 md:gap-20 items-center">
          <div className="reveal">
            <h2 className="font-heading tracking-wide font-semibold text-4xl md:text-5xl text-foreground mb-8 leading-tight">
              Membuat <span className="text-brick">perbedaan.</span>
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-loose text-justify hyphens-auto">
              <p>
                Clapham Company menghargai orang-orang yang memiliki tujuan yang
                sama: mengubah kota tempat kita tinggal menjadi lebih baik.
              </p>
              <p>
                Melalui karya kami, kami ingin membuat perbedaan, menantang
                status quo, dan mendorong potensi terbaik dari setiap orang di
                dalamnya. Kami bersatu dalam visi tentang kota yang lebih baik,
                tempat generasi mendatang dapat menikmati kehidupan yang lebih
                baik dan terlibat dalam pekerjaan yang bermakna.
              </p>
              <p className="text-foreground font-medium">Kami berbasis di Medan.</p>
            </div>
          </div>
          <div className="reveal" style={i(1)}>
            <Image
              src="/foto-home/New%20folder/square.avif"
              alt="Nilai-nilai Clapham Co: kolaborasi, berbagi, belajar, karya berdampak, hati yang peduli"
              width={982}
              height={750}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div className="reveal md:order-1" style={i(1)}>
            <Image
              src="/foto-home/New%20folder/square2.avif"
              alt="Kolaborasi, semangat berbagi, budaya belajar, karya berdampak, hati yang peduli"
              width={1052}
              height={480}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="reveal md:order-2">
            <h2 className="font-heading tracking-wide font-semibold text-4xl md:text-5xl text-foreground mb-8 leading-tight">
              <span className="text-brick">Nilai</span> yang kami yakini
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-loose text-justify hyphens-auto">
              <p>
                Dalam setiap proyek yang kami jalankan, kami berupaya menjunjung
                tinggi nilai-nilai berikut. Kami memuliakan martabat manusia dan
                karyanya, serta menerapkan tata kelola perusahaan yang baik
                sebagai fondasi kepercayaan.
              </p>
              <p>
                Kami percaya pada pembelajaran yang berkelanjutan, kebaikan hati
                dalam setiap interaksi, dan karya yang berdampak nyata. Semua itu
                kami wujudkan bersama dengan keterlibatan aktif bagi masyarakat di
                sekitar kami.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Layanan */}
      <section id="layanan" className="py-28">
        <div className="container mx-auto px-4">
          <div className="reveal max-w-2xl mx-auto text-center mb-16">
            <h2 className="font-heading tracking-wide font-semibold text-4xl md:text-5xl text-foreground mb-5 leading-tight">
              Ruang untuk setiap cara Anda bekerja
            </h2>
            <p className="text-muted-foreground text-lg">
              Temukan ruang yang pas untuk kebutuhan bisnis Anda, dari kursi
              fleksibel hingga kantor privat yang lengkap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, n) => (
              <div key={s.title} className="reveal" style={i(n)}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col bg-card rounded-lg overflow-hidden border border-border shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">{s.desc}</p>
                    <span className="text-teal-ink font-semibold inline-flex items-center text-sm">
                      Pelajari selengkapnya
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dipercaya oleh */}
      <section className="py-16 bg-card border-y border-border">
        <p className="reveal text-center text-xs font-semibold text-muted-foreground uppercase tracking-[0.25em] mb-10">
          Dipercaya oleh perusahaan dan profesional di Medan
        </p>
        <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            {[...partners, ...partners].map((p, n) => (
              <span
                key={n}
                aria-hidden={n >= partners.length}
                className="mx-10 md:mx-14 text-2xl font-heading tracking-wide text-muted-foreground/60 hover:text-foreground transition-colors duration-300 whitespace-nowrap"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="py-28">
        <div className="container mx-auto px-4">
          <div className="reveal text-center mb-16">
            <h2 className="font-heading tracking-wide font-semibold text-4xl md:text-5xl text-foreground">Kata Mereka</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((t, n) => (
              <div key={t.name} className="reveal" style={i(n)}>
                <figure className="relative h-full bg-card p-8 rounded-lg border border-border shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                  <span className="absolute top-4 right-6 font-heading tracking-wide text-7xl leading-none text-brick/20 select-none">&rdquo;</span>
                  <div className="flex gap-0.5 text-brick mb-5">
                    {[...Array(5)].map((_, k) => (
                      <svg key={k} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    ))}
                  </div>
                  <blockquote className="font-heading tracking-wide text-lg text-card-foreground leading-relaxed mb-8">
                    &ldquo;{t.quote}&rdquo;
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
          <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12 items-start">
            <div className="reveal md:col-span-3 bg-card/60 backdrop-blur-xl rounded-xl p-8 md:p-10 border border-border shadow-2xl">
              <h2 className="font-heading tracking-wide font-semibold text-3xl md:text-4xl mb-3 leading-tight">Siap bekerja dengan tenang?</h2>
              <p className="text-muted-foreground mb-8">Jadwalkan kunjungan atau amankan tempat Anda hari ini.</p>
              <form className="grid grid-cols-1 gap-4">
                <input type="text" placeholder="Nama Lengkap" className={inputClass} required />
                <input type="email" placeholder="Alamat Email" className={inputClass} required />
                <select defaultValue="" className={inputClass}>
                  <option value="" disabled>Pilih Layanan</option>
                  <option value="coworking">Coworking Space</option>
                  <option value="private-office">Private Office</option>
                  <option value="meeting-room">Meeting Room</option>
                  <option value="event-space">Event Space</option>
                </select>
                <button
                  type="button"
                  className="group mt-2 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-base py-4 rounded-md shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:brightness-110 active:scale-[0.98] transition-all duration-300"
                >
                  Pesan Ruangan Sekarang
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </form>
            </div>

            <div className="reveal md:col-span-2 space-y-8 md:pt-6" style={i(1)}>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-ink mb-3">Lokasi</h3>
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
                <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-ink mb-3">Jam Operasional</h3>
                <p className="text-foreground/90">Senin–Jumat, 09.00–17.00</p>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Komp.+Ruko+Centre+Point+Medan+Jalan+Timor+Blok+G+No.+III%2FIV"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:border-teal-ink hover:text-teal-ink transition-colors duration-300"
              >
                Buka di Google Maps
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
