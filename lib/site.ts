// Set NEXT_PUBLIC_SITE_URL in Vercel when the final domain is ready.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://webmulti-clap.vercel.app").replace(/\/$/, "");

export const clip = (text: string, max = 158) => {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
};
