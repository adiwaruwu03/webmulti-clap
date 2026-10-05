@AGENTS.md

# CLAPHAM.CO design guide

Company website for CLAPHAM.CO, a coworking space in Medan (Ruko Centre Point Medan, Jl. Timor Blok G No. III/IV, 2nd Floor). Site copy is in Indonesian. Follow this guide for any UI work. The source of truth for tokens is `app/globals.css`; do not hardcode colors in components.

## Brand

- Feel: calm, elegant, safe, exclusive. Clean and quiet, not busy.
- Brand guide colors: Pale Teal (primary), Brick Red (secondary), Deep Grey/black.
- Brand guide font: Quicksand (custom wordmark font by SANROK Studio is not available, so Quicksand covers everything).
- Logos live in `public/logo.nav/`: `logo-clapham-2.png` (dark, for light backgrounds) and `logo-clapham-white.png` (white, for dark or transparent-over-photo backgrounds).
- Hero photo: `public/foto-home/hero.jpg.jpeg`. Illustrations: `public/foto-home/New folder/` (`square.avif` 982x750, `square2.avif` 1052x480). Use their native aspect ratio, never crop.

## Colors (light `:root`, dark = `.dark` class)

| Role | Light | Dark | Token |
|---|---|---|---|
| Page background | `#f4f7f6` | `#333434` | `bg-background` |
| Text | `#404141` | `#f4f7f6` | `text-foreground` |
| Card | `#ffffff` | `#404141` | `bg-card` |
| Primary (Pale Teal) | `#accfcc` | `#accfcc` | `bg-primary`, text on it is `text-primary-foreground` (deep grey) |
| Secondary tint | `#e3eeec` | `#4a4b4b` | `bg-secondary` |
| Brick Red (brand secondary) | `#c25b46` | `#e07a63` | `text-brick`, `bg-brick` |
| Readable teal for text | `#397570` | `#accfcc` | `text-teal-ink` |
| Border | `#d3e2e0` | `#555656` | `border-border` |
| Muted text | `#6a6d6d` | `#b5bdbc` | `text-muted-foreground` |

Extra brand-guide colors not yet used: olive `#595241`, beige `#b8ae9c` (available as `chart-4/5`).

Rules:
- Pale Teal is too light to read as text on white. Use `text-teal-ink` for teal text and links. Use `bg-primary` only for fills (buttons, glows) with deep-grey text on top, never white.
- Brick Red is an accent: highlighted heading words, stars, glows. Not for body text.
- Section rhythm near the bottom: testimonials (light page bg) -> booking = `bg-primary` Pale Teal with a white `bg-card` form card -> footer = `dark` carbon. Booking must NOT be dark: it touches the dark footer and would merge into one slab (owner flagged this). Text on the teal band uses `text-foreground` (deep grey), small labels `text-foreground/60`. Keep `dark` only for the footer and the 'Nilai' band.
- Brick Red on white passes only for large text; do not use it for small text.

## Typography

- One family: Quicksand via `next/font` (`--font-quicksand`). `font-sans` and `font-heading` both resolve to it.
- Headings (`h1`/`h2`): `font-heading tracking-wide font-semibold`. Body: default weight, `leading-loose` for long paragraphs.
- Long body paragraphs are justified: `text-justify hyphens-auto`.

## Shape and depth

- Radius token is `--radius: 1.25rem`; cards use `rounded-lg`, inputs and buttons `rounded-md`, chips and links `rounded-full`.
- Shadows come from theme tokens (`shadow-xs`, `shadow-xl`, ...). Cards lift on hover (`hover:-translate-y-1.5 hover:shadow-xl`).

## Motion (CSS only, no animation library)

- Classes in `globals.css`: `animate-kenburns` (hero photo), `animate-fade-up`, `animate-marquee`, `animate-float`, and `.reveal` (scroll-driven fade-up using `animation-timeline: view()`; stagger with `style={{ "--i": n }}`).
- Everything is disabled under `prefers-reduced-motion`.
- `.reveal` only animates in browsers with scroll-driven animation support (Chrome, Edge, Safari); elsewhere content just shows.

## Navbar

- Content is fixed: Home, Layanan/Services (hover dropdown with 7 service pages), Tentang/About, Blog, plus an ID/EN toggle at the right end (owner asked for it). Plus a CTA button "Atur Kunjungan" / "Schedule a Visit" (owner/boss request) that goes to the dedicated page `/atur-kunjungan`, NOT to the form card on the home page. Do not add other links, icons, or a mobile pill nav unless asked.
- Behavior: `fixed`, transparent over the hero on `/`, turns solid (blurred card background, dark logo) after 40px scroll and on all other routes. `main` has `pt-16` and the hero uses `-mt-16` to sit under the header.

## Things the owner explicitly rejected (do not reintroduce)

- Yllw Swiss-Bauhaus style from `../design.md` (putty background, uppercase monumental type).
- Glass/blurred info pill over the hero, scroll-down mouse indicator, icon boxes on service cards, small eyebrow labels with a line above section headings. Owner said these look "AI-generated".
- Hero headline, subtext and CTA buttons: owner wants a clean hero with only the photo and one plain-text info line.
- Icon-based nav links, floating mobile bottom nav.

## Placeholder content

Testimonials are REAL Google reviews (6, all 5-star) of the Maps listing "COHIVE at Clapham", copied from owner screenshots on 2026-10-05, names only, no avatars (owner dislikes fake or scraped people photos). Indonesian originals are shown as-is with my English translation; the English review (Celia Fransiska) has my Indonesian translation. Long reviews are cut at a sentence end. Add new ones the same way, never invent reviews.

## SEO and copy (home page)

- Reference layout/wording came from `public/foto-home/referensidesain-home.png` (a competitor coworking site). Wording is adapted to CLAPHAM.CO only; do not copy competitor claims (locations count, "terdepan di Indonesia", mobile app, etc.).
- Home has a visually hidden `<h1>` in the hero (`sr-only`) so the hero stays clean but the page keeps a keyword heading. Primary keywords: "coworking space Medan", "sewa kantor Medan".
- Metadata (title template `%s | CLAPHAM.CO`, description, keywords, Open Graph) and LocalBusiness JSON-LD live in `app/layout.tsx`. Per-page titles go in each page's `metadata.title` without the brand suffix.
- Footer carries internal links to all 7 service pages plus a keyword sentence. Keep service names identical to the navbar dropdown.
- Not done yet: `sitemap.ts`/`robots.ts` (need the final domain), real blog articles, working consultation form backend.

## Responsive scaling

- Layout is rem-based. `globals.css` raises the root font-size on big screens (17px at >=1536px, 19px at >=1920px, 24px at >=2560px) so the whole page scales proportionally on desktop monitors. Do not use fixed px widths for layout; use rem/Tailwind classes so they scale too.
- Content wrappers use `container` (max 96rem) with inner `max-w-6xl`/`max-w-7xl`. Keep section widths consistent with the navbar (`container`).
- Always check 1366, 1920 and 2560 widths after layout changes, not just 1440.

## Partner logos

- Source files: `public/foto-home/logo-partner/` (raw, mixed formats, some 5000px). Do not reference these in pages.
- Page uses processed copies in `public/partners/*.webp` (margins trimmed, max 520x144, ~200 KB total). To add a logo: trim and resize it the same way, save into `public/partners/`, add an entry to the `partners` array in `app/page.tsx`.
- Marquee: logos always in full color (owner request), slight zoom on hover, pauses on hover, 110s loop. Images are NOT lazy-loaded on purpose (lazy loading leaves blank gaps in a moving track).
- `images.jpg` in the raw folder is a cropped duplicate of the Zahav logo and is skipped.
- Removed on owner request (Oct 2026): Bahana Bara Mahanusa, Clapham Conference 2024, Citra Buana Kemala, CV Cahaya Material, CV Makmurindo Bersama, Satu Indonesia. Do not re-add.

## Image sharpness

- `next.config.ts` allows `images.qualities: [75, 90]`; big photos use `quality={90}`. Next 16 coerces any other value to 75.
- When a landscape photo is cropped into a portrait/cover box (collage), `sizes` must describe the full source width (e.g. `sizes="1400px"`), not the visible box width, or the browser requests a tiny version and upscales it (looks blurry, especially at 125-150% display scale).
- Original photos are 1360px wide webp; do not compress them further.
- Round/square logos (aspect < 1.3) get a taller max height. Logos with a `label` field in the `partners` array (Soulmate, Coffeenatics) render their name as text beside the logo to balance the wide logos.
- Raw originals live in `public/foto-home/logo-partner/` (BCA, Coffeenatics, Soulmate included). `public/partners/` holds only processed webp.

## Bilingual (ID / EN)

- Default language is Indonesian (SSR + SEO). English is switched client-side via the nav toggle and remembered in `localStorage`; `<html lang>` updates on switch. No separate /en routes.
- `components/Lang.tsx`: `LangProvider` (wraps Navbar, main, Footer in `app/layout.tsx`), `useLang()`, `<T en="...">Indonesian text</T>` for visible text (en accepts JSX), and `useT()` -> `t("Indonesia", "English")` for attributes like placeholders.
- EVERY new visible string must be wrapped in `<T>` (or use `useT`) with both languages. Arrays with copy get `descEn`/`titleEn`/`quoteEn` fields. Proper names (Coworking Space, Event Management Service, partner names, the address) stay untranslated.
- Not translated on purpose: image `alt` text, iframe title, page `metadata` (title/description stay Indonesian for SEO), JSON-LD.
- Nav label is "Tentang" (ID) / "About" (EN), never "About" in Indonesian mode.

## Favicon / app icon

- Owner chose the full nav wordmark (`public/logo.nav/logo-clapham-2.png`, dark version) centered on a white rounded tile (white so it stays visible on dark browser themes). It is wide (4:1) so it is tiny at 16px; owner accepted that. Do not switch back to the "C" monogram unless asked.
- Files: `app/favicon.ico` (16/32/48), `app/icon.png` (512), `app/apple-icon.png` (180). Next 16 auto-injects the `<link rel="icon">` tags. Regenerate with sharp from the logo if it changes.

## Section backgrounds (page rhythm)

- Booking/consult section uses solid Pale Teal (`bg-primary`) with a white form card and dark `Kirim` button, NOT the `dark` theme, so it never blends with the carbon footer. Only the "Nilai" band and the footer use `dark`. Never put two `dark` sections next to each other.

## Blog

- Reference layout: screenshots in `D:\projek\Clapham_colog\` of the old site (clapham.workfrom.id/blog). Layout copied (Clapham Blog heading, Artikel Unggulan, 2-col Artikel Terbaru, sticky Artikel Populer sidebar; article page with category pill, title, excerpt, date, author card, hero, body, WhatsApp button and a sticky "Artikel Serupa" sidebar) but styled with OUR brand, navbar and footer. Do not import the old site's top bar/footer.
- Content source: the exact text, links, photos and Google Maps embeds of the 10 articles come from the old site's WordPress REST API (`https://cms-clapham.workfrom.id/wp-json/wp/v2/posts?_embed`), converted to `data/blog/posts.json` (typed in `lib/blog.ts`). It first existed as a transcription of screenshots; on 2026-10-05 it was replaced by the real source text (7 of 10 articles matched word for word). Block types: p, h2, h3, ul, ol, callout, img, embed (Google Maps iframe, lazy). Inline markers `[text](url)`, `***bold italic***`, `**bold**`, `*italic*` are rendered by `components/blog/Rich.tsx` (no raw HTML; link `wa:` opens WhatsApp, `/path` is an internal link).
- Photos: `public/blog/*.webp`, downloaded from the CMS at full size (max 1600 px wide, webp q88). Heroes are 1000-1600 px (sharp). Body photos from the CMS are only 480-680 px natively, so they are shown at their native width (never stretched past it) and centered; the Clapham gallery banner and a few others are 1200-1600 px. Do NOT crop images from screenshots again.
- Link handling when converting: links to clapham.workfrom.id -> `/`, old WhatsApp links -> our WhatsApp, old `use-case` booking link -> `/atur-kunjungan`, blog links -> `/blog/<slug>`, links to workfrom.id (another brand/platform) were dropped (text kept). One photo hotlinked from the dead host blog.go-work.com (GoWork article image) was skipped. The old WhatsApp button image was dropped; we render our own button at the end of every article.
- Routes: `app/blog/page.tsx` (index), `app/blog/[slug]/page.tsx` (`dynamicParams = false`, static, per-post metadata + BlogPosting JSON-LD). Cards: `components/blog/PostCard.tsx`; dates formatted per language by `PostDate.tsx`.
- Article body text is justified from md up (`md:text-justify`, left-aligned on phones); no `hyphens-auto` (no Indonesian hyphenation dictionary, and html lang flips to en in EN mode). Body wrapper has `lang="id"`.
- Article body is Indonesian only; in EN mode a small note says so. UI chrome is bilingual via `<T>`. The index subtitle's English original is used for EN and I translated it for ID.
- Fixes vs the old site: date typo `2014-09-20` corrected to 2024 (kept in the API as 2014); typo "perabtotan" fixed; "Artikel Serupa" lists the reference's 4 titles minus the current article; WhatsApp button shown on every article. Old-site contact data (hello@clapham.id, social icons) was NOT copied; the footer stays ours.

## Booking page (/atur-kunjungan)

- Dedicated visit/consultation page reached from the navbar CTA (reference: GoWork "Atur Kunjungan Lokasi"; layout adapted, single location so no location picker). `app/atur-kunjungan/page.tsx` + client form `components/BookingForm.tsx`.
- Fields: name, company email, +62 phone, company, workspace of interest (7 services), visit date (weekdays only, min today), time (09:00-16:30, 30-min slots), planned start, number of people stepper, business needs. All bilingual via `useT`.
- No backend: submit builds an Indonesian message and opens WhatsApp (`lib/contact.ts` -> wa.me/6285353729190). A fallback link shows after submit in case the popup is blocked. The home page consult form (`ConsultForm`) is still a dummy with no submit.
- Contact constants (WhatsApp, phone) live in `lib/contact.ts`; the phone `(061) 80510977` comes from the Maps listing, WhatsApp from the old site's footer. Verify both are still active.

## SEO / performance audit (2026-10-05, Lighthouse 12 on production build)

- Scores: desktop home 98/100/100/100 (perf/a11y/best/seo), desktop blog 100/100/100/100, mobile home 87/96/100/100, mobile blog 87/100/100/100, mobile booking 95/100/100/100, mobile article 92/96/100/100. Mobile LCP is 3-4 s only under Lighthouse's simulated slow 4G + 4x CPU throttle.
- `lib/site.ts`: `SITE_URL` (env `NEXT_PUBLIC_SITE_URL`, fallback https://webmulti-clap.vercel.app) feeds `metadataBase`, `app/robots.ts`, `app/sitemap.ts`, JSON-LD. CHANGE IT when the real domain is connected, or canonicals and the sitemap will point to the vercel.app host.
- Layout metadata sets canonical `./` (per page), default OG image `public/og-image.jpg` (1200x630 crop of the hero), twitter `summary_large_image`. Descriptions are kept under ~160 chars (`clip()` for blog excerpts). Each page needs ONE h1.
- JSON-LD LocalBusiness in the root layout includes `alternateName` ["COHIVE at Clapham", "Clapham Collective"] because the Google Maps listing uses that name. Blog posts add BlogPosting.
- `/layanan/*` are placeholder pages (3 words): they have unique metadata but `robots: noindex` and are NOT in the sitemap. When a service page gets real content: remove the `robots` line and add the URL to `app/sitemap.ts`.
- Perf rules learned: never preload 20 partner logos at normal priority (they compete with the hero; they use `fetchPriority="low"`); `sizes` must describe the rendered image width, not the crop box; below-fold plain `<img>` need `loading="lazy"`; the LCP image of a page must be `loading="eager"` + `fetchPriority="high"` (blog featured card uses `eager`); hero uses `quality={80}`.
- Contrast: small text on `bg-primary` (Pale Teal) must be full `text-foreground`, not `/60`; blog pills use `text-foreground` on `bg-primary/40`. Lighthouse may still flag `.reveal` text at load (opacity animation), which is a false positive.
- Known remaining: Google Maps name mismatch (COHIVE at Clapham vs CLAPHAM.CO); English mode is client-side only so EN is not indexed; blog titles with the " | CLAPHAM.CO" suffix reach 77 chars (Google cuts at ~60); blog articles have no internal links to service pages yet.
