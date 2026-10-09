import raw from "../data/events.json";

export type EventItem = {
  slug: string;
  name: string;
  type: string;
  image: string;
  w?: number;
  h?: number;
  // Only the 4 events with a detail page have the fields below (no invented copy for the rest).
  description?: string;
  content?: string[];
  highlights?: string[];
  story?: { image: string; w: number; h: number; title: string; description: string; en: { title: string; description: string } }[];
  en?: { description: string; content: string[]; highlights: string[] };
};

export const events = raw as EventItem[]; // detail events first
export const hasDetail = (e: EventItem) => Boolean(e.content);
export const detailEvents = events.filter(hasDetail);
export const featuredEvents = detailEvents.filter((e) => e.slug !== "community-creative-gathering");
export const getEvent = (slug: string) => detailEvents.find((e) => e.slug === slug);

export const BASE = "/layanan/event-management";

// Proper-name types stay as is; only the ones that read differently in Indonesian are translated.
export const typeLabel: Record<string, { id: string; en: string }> = {
  "Seminar & Conference": { id: "Seminar & Konferensi", en: "Seminar & Conference" },
  "Brand Activation": { id: "Brand Activation", en: "Brand Activation" },
  "Community Event": { id: "Event Komunitas", en: "Community Event" },
  Workshop: { id: "Workshop", en: "Workshop" },
  Gathering: { id: "Gathering", en: "Gathering" },
};
export const eventTypes = Object.keys(typeLabel);
