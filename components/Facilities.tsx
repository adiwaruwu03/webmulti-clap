import type { CSSProperties } from "react";
import {
  AirVent,
  CalendarCheck,
  Cigarette,
  Coffee,
  DoorClosed,
  MapPin,
  MoonStar,
  Presentation,
  Printer,
  Sofa,
  Toilet,
  Users,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { T } from "./Lang";

type Item = { icon: LucideIcon; id: string; en: string; descId: string; descEn: string };

const main: Item[] = [
  {
    icon: Wifi,
    id: "Internet Cepat",
    en: "Fast Internet",
    descId: "Wi-Fi dan listrik siap pakai untuk bekerja tanpa gangguan.",
    descEn: "Wi-Fi and power ready to use, so you can work without interruption.",
  },
  {
    icon: Presentation,
    id: "Ruang Meeting Lengkap",
    en: "Fully Equipped Meeting Rooms",
    descId: "Meeting room dengan proyektor dan sound system.",
    descEn: "Meeting rooms with a projector and sound system.",
  },
  {
    icon: Printer,
    id: "Layanan Resepsionis & Dokumen",
    en: "Reception & Document Services",
    descId: "Resepsionis (front office), penanganan paket, printing, dan fotokopi.",
    descEn: "Front office reception, parcel handling, printing, and copying.",
  },
  {
    icon: Sofa,
    id: "Area Santai & Lounge",
    en: "Relaxation & Lounge Area",
    descId: "Lobi/lounge, mini library, dan napping pod untuk beristirahat sejenak.",
    descEn: "A lobby/lounge, mini library, and napping pod for a short break.",
  },
  {
    icon: Coffee,
    id: "Pantry & Free Flow Drink",
    en: "Pantry & Free-Flow Drinks",
    descId: "Kopi dan teh free flow, serta pantry dengan kulkas dan microwave.",
    descEn: "Free-flow coffee and tea, plus a pantry with a fridge and microwave.",
  },
  {
    icon: DoorClosed,
    id: "Ruang Privat",
    en: "Private Spaces",
    descId: "Phone booth untuk panggilan penting dan loker untuk barang Anda.",
    descEn: "Phone booths for important calls and lockers for your belongings.",
  },
  {
    icon: CalendarCheck,
    id: "Paket Akses Fleksibel",
    en: "Flexible Access Plans",
    descId: "Pilihan coworking harian (daypass) sesuai kebutuhan Anda.",
    descEn: "Daily coworking (daypass) options to match your needs.",
  },
  {
    icon: Users,
    id: "Jaringan Komunitas",
    en: "Community Network",
    descId: "Bertemu komunitas, serta event dan kegiatan yang mendukung.",
    descEn: "Meet the community, with events and activities that support you.",
  },
  {
    icon: MapPin,
    id: "Lokasi Strategis",
    en: "Strategic Location",
    descId: "Mudah dijangkau di pusat kota Medan.",
    descEn: "Easy to reach in the heart of Medan.",
  },
];

const extras: { icon: LucideIcon; id: string; en: string }[] = [
  { icon: AirVent, id: "AC", en: "Air conditioning" },
  { icon: Toilet, id: "Toilet", en: "Restrooms" },
  { icon: MoonStar, id: "Mushola", en: "Prayer room" },
  { icon: Cigarette, id: "Smoke Area", en: "Smoking area" },
];

export default function Facilities() {
  return (
    <section className="bg-secondary py-24 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="reveal max-w-2xl">
          <h2 className="font-heading text-3xl font-semibold leading-tight tracking-wide text-foreground md:text-5xl">
            <T
              en={
                <>
                  Facilities that <span className="text-brick">support</span> your business
                </>
              }
            >
              Fasilitas yang <span className="text-brick">mendukung</span> bisnis Anda
            </T>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            <T en="Everything you need to work comfortably, from the first coffee to the last meeting.">
              Semua yang Anda butuhkan untuk bekerja nyaman, dari kopi pertama hingga rapat terakhir.
            </T>
          </p>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {main.map((f, n) => (
            <div
              key={f.id}
              className="reveal group border-t border-foreground/15 pt-7"
              style={{ "--i": n % 3 } as CSSProperties}
            >
              <f.icon
                size={38}
                strokeWidth={1.4}
                aria-hidden
                className="text-teal-ink transition-all duration-500 group-hover:-translate-y-1 group-hover:text-brick"
              />
              <h3 className="mt-5 font-heading text-xl font-semibold tracking-wide text-foreground">
                <T en={f.en}>{f.id}</T>
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                <T en={f.descEn}>{f.descId}</T>
              </p>
            </div>
          ))}
        </div>

        <div className="reveal mt-16 border-t border-foreground/15 pt-8">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/70">
            <T en="Also included">Juga tersedia</T>
          </p>
          <ul className="flex flex-wrap gap-3">
            {extras.map((e) => (
              <li
                key={e.id}
                className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card px-5 py-2.5 font-medium text-foreground"
              >
                <e.icon size={20} strokeWidth={1.6} aria-hidden className="text-teal-ink" />
                <T en={e.en}>{e.id}</T>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
