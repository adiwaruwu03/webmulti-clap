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

- Content is fixed: Home, Layanan/Services (hover dropdown with 7 service pages), Tentang/About, Blog, plus an ID/EN toggle at the right end (owner asked for it). Plus a CTA button "Kontak Kami" / "Contact Us" (owner/boss request; was "Atur Kunjungan" until 2026-10-08) that goes to the dedicated page `/atur-kunjungan`, NOT to the form card on the home page. Do not add other links, icons, or a mobile pill nav unless asked.
- Nav animation on service pages: `/layanan/event-management` behaves exactly like home (transparent over a full-screen photo hero, solid after 40px scroll, white logo -> dark logo). Controlled by `isHome` in `components/Navbar.tsx`; add a pathname there for any other page that opens with a full-screen photo hero (that hero needs `-mt-16 min-h-svh`). All other routes stay solid.
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
- Article body text is justified from md up (`md:text-justify`, left-aligned on phones); no `hyphens-auto`. Each body wrapper carries its own `lang` (`id` or `en`).
- Blog is fully bilingual: each post in `data/blog/posts.json` has `en: { title, excerpt, blocks }` with the SAME block layout/order as the Indonesian blocks (links, `**` markers and image/embed blocks aligned). Pages render both through `<T en={...}>` (title, excerpt, body, card titles); Indonesian stays the default and the SEO/metadata language. English was machine-translated by me on 2026-10-05 (proper names, addresses, brand names kept as is); when editing an Indonesian block, edit the same index in `en.blocks` too. Brand quirk kept: article 2 still says "with Workfrom" in both languages (source text). The index subtitle's English original is used for EN and I translated it for ID.
- Fixes vs the old site: date typo `2014-09-20` corrected to 2024 (kept in the API as 2014); typo "perabtotan" fixed; "Artikel Serupa" lists the reference's 4 titles minus the current article; WhatsApp button shown on every article. Old-site contact data (hello@clapham.id, social icons) was NOT copied; the footer stays ours.

## Contact page (/atur-kunjungan) and home contact card

- Navbar CTA "Kontak Kami" goes to `/atur-kunjungan` (route name kept so links/sitemap stay valid). The page renders the SAME `components/ContactSection.tsx` as the home page (teal band, white consult card, location/hours/Maps column); on the page its heading is the h1, on home an h2. The old visit-date/time form (`BookingForm`) was removed on 2026-10-08.
- `components/ConsultForm.tsx` (shared): workspace select (7 services), name, company email, +62 phone, company, details. No backend: submit builds an Indonesian message and opens WhatsApp (`lib/contact.ts` -> wa.me/6285353729190), with a fallback link after submit. `?layanan=<value>` (e.g. `event-management`) preselects the workspace; service pages use it in their CTA.
- Contact constants (WhatsApp, phone) live in `lib/contact.ts`; the phone `(061) 80510977` comes from the Maps listing, WhatsApp from the old site's footer. Verify both are still active.

## FAQ (home)

- `components/Faq.tsx`, placed above the contact band (testimonials -> FAQ on white `bg-card` -> teal contact). Native `<details>` accordion (no JS), 6 questions, bilingual, plus FAQPage JSON-LD. Answers only state facts we know (services, address, hours, contact flow); no prices.

## SEO / performance audit (2026-10-05, Lighthouse 12 on production build)

- Scores: desktop home 98/100/100/100 (perf/a11y/best/seo), desktop blog 100/100/100/100, mobile home 87/96/100/100, mobile blog 87/100/100/100, mobile booking 95/100/100/100, mobile article 92/96/100/100. Mobile LCP is 3-4 s only under Lighthouse's simulated slow 4G + 4x CPU throttle.
- `lib/site.ts`: `SITE_URL` (env `NEXT_PUBLIC_SITE_URL`, fallback https://webmulti-clap.vercel.app) feeds `metadataBase`, `app/robots.ts`, `app/sitemap.ts`, JSON-LD. CHANGE IT when the real domain is connected, or canonicals and the sitemap will point to the vercel.app host.
- Layout metadata sets canonical `./` (per page), default OG image `public/og-image.jpg` (1200x630 crop of the hero), twitter `summary_large_image`. Descriptions are kept under ~160 chars (`clip()` for blog excerpts). Each page needs ONE h1.
- JSON-LD LocalBusiness in the root layout includes `alternateName` ["COHIVE at Clapham", "Clapham Collective"] because the Google Maps listing uses that name. Blog posts add BlogPosting.
- `/layanan/*` are placeholder pages (3 words): they have unique metadata but `robots: noindex` and are NOT in the sitemap. When a service page gets real content: remove the `robots` line and add the URL to `app/sitemap.ts`.
- Perf rules learned: never preload 20 partner logos at normal priority (they compete with the hero; they use `fetchPriority="low"`); `sizes` must describe the rendered image width, not the crop box; below-fold plain `<img>` need `loading="lazy"`; the LCP image of a page must be `loading="eager"` + `fetchPriority="high"` (blog featured card uses `eager`); hero uses `quality={80}`.
- Contrast: small text on `bg-primary` (Pale Teal) must be full `text-foreground`, not `/60`; blog pills use `text-foreground` on `bg-primary/40`. Lighthouse may still flag `.reveal` text at load (opacity animation), which is a false positive.
- Known remaining: Google Maps name mismatch (COHIVE at Clapham vs CLAPHAM.CO); English mode is client-side only so EN is not indexed; blog titles with the " | CLAPHAM.CO" suffix reach 77 chars (Google cuts at ~60); blog articles have no internal links to service pages yet.

## Home collage (under the intro)

- 3 photos in a row, middle one offset down. Left photo is the Clapham meeting room (`public/layanan/Meeting-Room/WhatsApp Image 2025-02-13 at 14.20.34_29bf9eef.jpg`, 4032x3024, shown with `object-[25%_50%]` so the TV, table and window stay in the crop). The other two are in `public/foto-home/New folder/`.
- Photos are wider from 1200px up (`min-[1200px]:max-w-7xl` + `aspect-[5/6]`), keeping the same height as the earlier `aspect-[3/4]`; below 1200px they stay 3/4. The meeting-room source is large (~1.2 MB); Next serves a 828px optimised copy.

## Event Management Service (/layanan/event-management)

- Ported from the earlier design in `D:\projek\Clapham_co\clpaham-page` (events section + `/events/[slug]`), restyled with our tokens. Intro, 8 service scope cards (text only, no icons), 3 featured events, portfolio grid with type filter + lightbox, teal CTA band.
- Data: `data/events.json` (typed in `lib/events.ts`), 90 events. Only 4 have a detail page (`/layanan/event-management/[slug]`, static): above-and-beyond-open-house, above-and-beyond-seminar-100, clapham-conference-2025, community-creative-gathering. The other 86 show name + type only (old per-event descriptions were generic filler, dropped). Detail events carry an `en` block (machine-translated by me 2026-10-07). Event names stay untranslated.
- Photos: `public/layanan/Event-Management-Service/<slug>.webp` (max 1600px, q84), story photos `<slug>-story-N.webp` shown at native ratio. To add an event, convert the photo the same way and add an entry to `data/events.json`.
- Page is indexed and in `app/sitemap.ts` (service placeholders elsewhere stay noindex). "Seminar Above and Beyond Seminar" renamed to "Above and Beyond Seminar" (typo). Numbers in the old Community Creative Gathering copy (200+ members) came from the old design, verify with the owner.
- Event Management hero (`components/events/HeroCarousel.tsx`): 6 slides = the first 6 portfolio photos (`hero-event-N.webp`, renamed from `hero-N` to dodge the Next image cache). Headline in white with the last phrase in `text-primary`; left-to-right dark gradient for legibility; keyword "Event Management Service di Medan" is `sr-only` inside the h1.
- Event detail pages (`[slug]/page.tsx`) use the same layout and body styles as the blog article page (back link, pill, h1, excerpt, hero, justified body, Highlights list, story sections as h2 + photo + paragraph, WhatsApp button, sticky "Event Serupa" sidebar). Keep them in sync with `app/blog/[slug]/page.tsx`.

## Service pages (/layanan/*)

- Coworking Space, Meeting Room, Private Office, Virtual Office and Podcast Studio share one template: `components/service/ServicePage.tsx` (hero with "Mulai dari" price, plan cards, included list, photo gallery, other services, contact card) fed by `lib/services.ts` ([id, en] pairs). Each `app/layanan/<slug>/page.tsx` is a few lines. Event Management has its own page; Event Space is still a noindex placeholder (on hold).
- Prices come from `D:\projek\Clapham_co\desain-layanan\Brosur Clapham (1).pdf` (+ podcast price list from the owner): DayPass 100k, Flexible Desk 1.250k/mo, Dedicated Desk 2.250k/mo, Cube from 5.000k/mo; Meeting Room Stephen (10) 220k/hr, Newton and Elliot (6) 165k/hr, member rate 137,5k and 82,5k; Private Office 2/3/5/6 pax = 5.000k/7.500k/12.500k/15.000k per month (per room, not per person); Podcast Record Only 299k/hr, Ready to Post 599k/hr. Never invent numbers or inclusions.
- Only 3 meeting rooms exist: Stephen, Newton, Elliot. Photos are named after the room (`public/layanan/Meeting-Room/stephen*.jpg`, `newton*.jpg`, `elliot.jpeg`). The home collage left photo is now `stephen3.jpg`.
- Podcast hero shows the click-to-play YouTube card (`components/service/YouTubeCard.tsx`, video `pJ1xKfAnqUI`; thumbnail loads first, iframe only after click).
- Virtual Office has no package/price info from the owner yet, so it stays `index: false` (noindex, not in the sitemap). Set `index: true` in `lib/services.ts` once it has real content. The other four are indexed and in `app/sitemap.ts`.
- The reference designs in `desain-layanan/*.png` are GoWork pages (structure only: hero + "mulai dari" price, plans, benefits, other packages); do not copy their wording or claims.
- Photo galleries on service pages are a symmetric grid: landscape photo = one 3:2 cell, portrait photo (ratio < 1.1) = 2 rows tall. `arrange()` in `components/service/ServicePage.tsx` finds a hole-free order for the 3-col and 2-col grid (a landscape photo in every row) and, if the set cannot tile, skips the fewest photos (max 4). Just list the photos in `lib/services.ts`; sizes come from `data/photo-dims.json` (regenerate it after adding photos, including .webp). Every service page also has a why-us band, a use-cases list, 3 steps and a location block (facts from the brochure). Coworking uses a comparison table (`matrix`) instead of plan cards.
- Illustration exception: Virtual Office has no real photo, so its hero uses `public/ilustrasi/virtual-office.svg` (isometric office in brand colors, hand-built SVG, field `art` in `lib/services.ts`). Everywhere else photos stay the rule; do not replace real photos with illustrations.
- Virtual Office uses the optional fields `title` (h1 with one brick word, service name kept in the h1 as sr-only), `bento` (3 feature cards with watermark number, hover glow and "Tanya detail" link, replacing the why band) and `steps` (custom 3 steps). The illustration hero sits in a framed card with ambient glows and a "Centre Point Medan" pin badge. Steps on every service page are a connected strip (dashed line, numbered circle that fills brick on hover). Feature copy only states facts we have (address, mailing address from the brochure, meeting rooms, community); no legal/domicile or WhatsApp-notification claims until the owner confirms the package.

## About page story + animated stats

- The company story text "Dirancang dengan tujuan, dieksekusi dengan presisi" (3 paragraphs, ID + EN) lives on `/about` (last section, `bg-chart-4/25`), moved there from `/layanan/event-management` at the boss's request. Do not put it back on the event page.
- `/layanan/event-management` keeps only the 4 stats (2016 / 300+ / 100+ / 10K+) as a row on `bg-chart-4/25`, rendered with `components/CountUp.tsx` (counts up once when scrolled into view at 60% visibility, ease-out, ~1.8 s; the year counts from 2000; SSR and `prefers-reduced-motion` show the final value). Each stat uses `.reveal` with a stagger.
- `CountUp` props: `value` ("300+", "10K+", "2016"), `from`, `duration`, `className`. Stats are placeholders from the old site; confirm the real numbers with the client before launch.

## About story + stats, event page CTA

- The company-story text ("Dirancang dengan tujuan, dieksekusi dengan presisi", 3 paragraphs) AND the four numbers (2016, 300+, 100+, 10K+) live on `/about` (third section): numbers sit in the same right column right under the text, behind a hairline (boss request: numbers merged with the text). `/layanan/event-management` has neither.
- Numbers use `components/Odometer.tsx` (slot-machine reels, chosen as a motion different from the partner marquee): each digit is a vertical 0-9 strip that spins 2 turns and lands on its digit, staggered per digit, starts when 60% visible, re-spins every 9 s while visible (pauses off-screen), final value on server render and under `prefers-reduced-motion`; reel width follows the final digit so spacing is normal; `role="img"` + `aria-label` carry the real value. The old CountUp component was deleted. Reuse Odometer for any new stat.
- Event Management uses the same teal "Siap memulai?" CTA as all other service pages: shared `components/service/ServiceCta.tsx` (props `contact`, `wa`), also used by `ServicePage`. Do not re-create page-specific CTA cards on `/layanan/*`.

## Home: Fasilitas section

- `components/Facilities.tsx`, placed on Home between Layanan and Lokasi (`bg-secondary`). Boss request (WhatsApp, 2026-10-09): general facilities were missing on the front page; reference was GoWork's "Dukungan Untuk Bisnis Anda". 9 main items in a 3x3 grid with thin line icons and a short description (Internet Cepat, Ruang Meeting Lengkap, Layanan Resepsionis & Dokumen, Area Santai & Lounge, Pantry & Free Flow Drink, Ruang Privat, Paket Akses Fleksibel, Jaringan Komunitas, Lokasi Strategis) + a "Juga tersedia" row of chips (AC, Toilet, Mushola, Smoke Area). All bilingual in the component's data arrays.
- Icons come from `lucide-react` (re-added as a dependency for this; only imported icons are bundled). Icons are bare line icons, NO colored boxes (owner earlier rejected icon boxes on cards); they turn brick red on hover.
- Descriptions only restate what the boss listed (no new claims such as hours, counts or prices). Edit the `main`/`extras` arrays to change items.

## Service pages: icon facility grid

- Design reference (boss, GoWork Podcast Studio page): design only, NOT their prices or copy. Clapham keeps its own prices/plans already on the pages.
- `ServicePage` "Included" section is now a bare line-icon grid (4 columns, `grid-cols-2` on phones; no boxes, hairline on top, icon turns brick red on hover), same look as the Home "Fasilitas" section. It renders when a service has `included` + `includedTitle` and no `bento` (Virtual Office keeps its bento cards). Hero `highlights` also get icons.
- Icons are picked by keyword from the label in `components/service/icons.ts` (`iconFor`, first match wins, fallback = check mark). When adding an `included` item, check the mapped icon in the browser; add a rule there if it falls back.
- Content rule: `included` lists only use facts already on that page or from the owner's facilities list (coworking: matrix/gallery captions; meeting room: page text + projector/sound system; private office: page text; podcast: equipment list). Meeting-room items and "Booth kerja privat/Ruang ibadah" are derived, confirm with the owner before launch. Do not add claims (hours, counts, prices).
- Section backgrounds alternate: Plans = `bg-secondary`, Included = page background (do not make both secondary or they merge).

## Service pages: line-icon design (from the GoWork Podcast Studio reference)

- Reference gave only the look (bare thin line icons, 3-up cards, "how it works" icons); prices/packages from the reference were NOT copied and all existing content and prices stay.
- Icons live in `components/service/icons.ts`: `iconFor(label)` maps Indonesian text to a lucide icon by keyword (first match wins, specific before generic, words anchored: "strategis" must not hit "rate", "nyaman" must not hit "aman"); fallback is a check mark. `stepIcons` = contact / visit / start by position.
- Where used in `ServicePage.tsx`: ONLY the hero `highlights` chips and the "Termasuk" grid (4 columns, bare icon above the label, brick red on hover). Owner rejected icons INSIDE cards (2026-10-09), so "Mengapa" cards, bento cards and "Cara memulai" step cards stay icon-free (only the number circle / big faded number). Do not add icons to those cards again. Icons are bare (no filled boxes), teal, `strokeWidth` 1.4-1.6.
- When adding a service or item, check `iconFor` returns something sensible (a quick tsx script over `services` lists each label with its icon); add a rule instead of leaving the check-mark fallback.
- Two Claude sessions edited this area at the same time once (duplicate `icons.tsx`, since removed). Check file mtimes before editing shared service files.

## Partner logos: second batch (2026-10-09)

- 12 more logos were added from `public/logo.nav/logo tamabahan/` (raw originals stay there): Akara Capital, Denali Capital, Lemon Hexa, Avokado, Metrohm, Miss Planner, PT Surya Bumi Niaga, Bhinneka.com, SMLONE, Ternak AI, Tokudoku, Trainedu. Processed the same way as before into `public/partners/*.webp`; interleaved with the old ones in the `partners` array (32 total).
- That folder also held Bahana Bara Mahanusa, Citra Buana Kemala, CV Cahaya Material and CV Makmurindo Bersama, which the owner had asked to remove earlier, and PT Kanvas (already shown). They were intentionally NOT re-added; ask before adding them.
- Marquee duration now scales with the list: `partners.length * 5.5` seconds (about 55 px/s), so adding logos does not speed it up.
