export const WHATSAPP_NUMBER = "6285353729190"; // +62 853-5372-9190
export const WHATSAPP_DISPLAY = "+62 853-5372-9190";
export const PHONE_TEL = "+626180510977"; // (061) 80510977
export const PHONE_DISPLAY = "(061) 80510977";

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
