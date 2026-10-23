export const WHATSAPP_NUMBER = "6285353729190"; // +62 853-5372-9190
export const WHATSAPP_DISPLAY = "+62 853-5372-9190";
export const PHONE_TEL = "+626180510977"; // (061) 80510977
export const PHONE_DISPLAY = "(061) 80510977";

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// Standard opener for every WhatsApp button (owner wording, 2026-10-23). `topic` = what the visitor came for.
export const waAsk = (topic?: string) =>
  whatsappLink(`Hai, saya dapat kontak ini dari Website. Mau tanya-tanya sedikit soal ${topic ? `${topic} di Clapham` : "Clapham"}, boleh dibantu?`);
export const WA_INTRO = "Hai, saya dapat kontak ini dari Website.";
