import {
  AirVent, BookOpen, Camera, CalendarCheck, Check, Coffee, DoorClosed, Handshake, Headset, Lock, Mail, MapPin,
  Mic, MoonStar, PackageCheck, Presentation, Printer, ShieldCheck, SlidersHorizontal, Sofa, Sparkles, Sun,
  Users, Wallet, Wifi, type LucideIcon,
} from "lucide-react";

// First match wins, so keep the specific rules above the generic ones.
// Words are anchored (\b) so e.g. "strategis" never matches "rate" and lands on the wallet icon.
const rules: [RegExp, LucideIcon][] = [
  [/mikrofon|microphone/i, Mic],
  [/kamera|camera/i, Camera],
  [/mixer/i, SlidersHorizontal],
  [/operator/i, Headset],
  [/peralatan|equipment/i, Camera],
  [/listrik|wifi|wi-fi|internet|electric/i, Wifi],
  [/drink|kopi|coffee|teh\b|pantry/i, Coffee],
  [/\bac\b|air-condition|air conditioning/i, AirVent],
  [/printing|print\b|copies|fotokopi/i, Printer],
  [/locker|loker/i, Lock],
  [/mailing|alamat surat/i, Mail],
  [/lokasi|location|strategis|dijangkau|alamat bisnis|business address/i, MapPin],
  [/gathering|komunitas|community/i, Users],
  [/perpustakaan|library|buku/i, BookOpen],
  [/ibadah|mushola|prayer/i, MoonStar],
  [/\btv\b|whiteboard|presentasi|presentation|proyektor|projector|sound system/i, Presentation],
  [/jendela|window/i, Sun],
  [/meja|desk|kursi|chair|table/i, Sofa],
  [/ukuran tim|team size|pilihan ruang|orang|people|member/i, Users],
  [/privat|tenang|private|quiet/i, Lock],
  [/aman|security|keamanan/i, ShieldCheck],
  [/nyaman|comfort/i, Sofa],
  [/penawaran|offer|kemitraan|partner/i, Handshake],
  [/fleksibel|flexible|kebutuhan|needs|digabung|combined|bisa digabung/i, CalendarCheck],
  [/siap pakai|ready|paket|package|plan/i, PackageCheck],
  [/fasilitas|facilit/i, Sparkles],
  [/booth|ruang|room|tertutup|kantor|office/i, DoorClosed],
  [/\bbiaya|\bcost|\bharga|\bprice|\btarif|\brate\b/i, Wallet],
];

/** Picks a line icon for a facility label (Indonesian or English). Falls back to a check mark. */
export const iconFor = (label: string): LucideIcon => rules.find(([re]) => re.test(label))?.[1] ?? Check;

