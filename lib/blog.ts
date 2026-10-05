import raw from "../data/blog/posts.json";
import { whatsappLink } from "./contact";

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "callout"; text: string }
  | { t: "img"; src: string; w: number; h: number; alt: string };

export type Post = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  author: { name: string; role: string };
  hero: { src: string; w: number; h: number };
  blocks: Block[];
};

// posts.json keeps the reference "Artikel Terbaru" order
export const posts = raw as unknown as Post[];

const bySlug = (slugs: string[]) => slugs.map((s) => posts.find((p) => p.slug === s)).filter((p): p is Post => !!p);

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const featured = posts[0];

export const popular = bySlug([
  "5-meeting-room-medan-terbaik",
  "7-coworking-space-di-medan",
  "fasilitas-sewa-private-office",
  "sewa-kantor-murah",
  "coworking-space-vs-sewa-kantor",
]);

export const similar = (slug: string) =>
  bySlug([
    "fasilitas-kantor-sewa-untuk-kerja-yang-nyaman",
    "manfaat-private-office",
    "keuntungan-menggunakan-virtual-office-untuk-bisnis-di-medan",
    "kerja-lebih-fleksibel-dengan-private-office",
  ]).filter((p) => p.slug !== slug);

export const WHATSAPP_URL = whatsappLink("Halo CLAPHAM.CO, saya tertarik dengan layanan ruang kerja Anda.");
