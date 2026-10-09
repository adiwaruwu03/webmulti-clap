import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { T } from "../../../../components/Lang";
import { pillClass } from "../../../../components/blog/PostCard";
import { whatsappLink } from "../../../../lib/contact";
import { BASE, detailEvents, getEvent, typeLabel } from "../../../../lib/events";
import { clip } from "../../../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return detailEvents.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return {};
  return {
    title: e.name,
    description: clip(e.description!),
    alternates: { canonical: `${BASE}/${e.slug}` },
    openGraph: { images: [{ url: e.image, width: e.w, height: e.h, alt: e.name }] },
  };
}

// Same body styles as the blog article page
const p = "mb-6 text-lg leading-loose text-foreground/85 md:text-justify";
const h2 = "mb-5 mt-14 font-heading text-3xl font-semibold leading-tight tracking-wide text-foreground";

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) notFound();
  const en = e.en!;
  const wa = whatsappLink(`Halo CLAPHAM.CO, saya tertarik membuat event seperti "${e.name}".`);
  const type = typeLabel[e.type];
  const similar = detailEvents.filter((x) => x.slug !== e.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: e.name,
    description: e.description,
    image: e.image,
    publisher: { "@type": "Organization", name: "CLAPHAM.CO" },
    inLanguage: "id",
  };

  return (
    <article className="bg-background pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container mx-auto max-w-7xl px-4 pt-10 md:pt-14">
        <Link href={`${BASE}#portofolio`} className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-ink hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-x-1"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
          <T en="Back to Events">Kembali ke Event</T>
        </Link>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="min-w-0 max-w-4xl">
            <header>
              <span className={pillClass}>
                <T en={type.en}>{type.id}</T>
              </span>
              <h1 className="mt-5 font-heading text-3xl font-semibold leading-tight tracking-wide text-foreground md:text-5xl">{e.name}</h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
                <T en={en.description}>{e.description}</T>
              </p>
            </header>

            <hr className="my-10 border-border" />

            <Image
              src={e.image}
              alt={e.name}
              width={e.w!}
              height={e.h!}
              sizes="(min-width: 1024px) 820px, 100vw"
              quality={90}
              loading="eager"
              fetchPriority="high"
              className="mb-10 h-auto w-full rounded-lg"
            />

            <T
              en={
                <div lang="en">
                  {en.content.map((t, i) => (
                    <p key={i} className={p}>{t}</p>
                  ))}
                  <h2 className={h2}>Highlights</h2>
                  <ul className="mb-6 list-disc space-y-2 pl-6 text-lg leading-relaxed text-foreground/85 marker:text-teal-ink">
                    {en.highlights.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              }
            >
              <div lang="id">
                {e.content!.map((t, i) => (
                  <p key={i} className={p}>{t}</p>
                ))}
                <h2 className={h2}>Highlights</h2>
                <ul className="mb-6 list-disc space-y-2 pl-6 text-lg leading-relaxed text-foreground/85 marker:text-teal-ink">
                  {e.highlights!.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            </T>

            {e.story?.map((s) => (
              <section key={s.title}>
                <h2 className={h2}>
                  <T en={s.en.title}>{s.title}</T>
                </h2>
                <figure className="my-8">
                  <Image
                    src={s.image}
                    alt={s.title}
                    width={s.w}
                    height={s.h}
                    sizes="(min-width: 1024px) 820px, 100vw"
                    quality={90}
                    style={{ maxWidth: Math.min(s.w, 820) }}
                    className="mx-auto h-auto w-full rounded-lg"
                  />
                </figure>
                <p className={p}>
                  <T en={s.en.description}>{s.description}</T>
                </p>
              </section>
            ))}

            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-3 rounded-md bg-[#128C7E] px-7 py-4 text-lg font-semibold text-white transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.23 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29Z" /></svg>
              <T en="Chat with Us on WhatsApp">WhatsApp Kami</T>
            </a>
          </div>

          <aside>
            <div className="lg:sticky lg:top-24">
              <h2 className="mb-6 font-heading text-xl font-semibold tracking-wide text-foreground">
                <T en="Similar Events">Event Serupa</T>
              </h2>
              <ul className="space-y-4">
                {similar.map((x) => (
                  <li key={x.slug}>
                    <Link
                      href={`${BASE}/${x.slug}`}
                      className="group block rounded-lg border border-border bg-card p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-ink/40 hover:shadow-md"
                    >
                      <span className={pillClass}>
                        <T en={typeLabel[x.type].en}>{typeLabel[x.type].id}</T>
                      </span>
                      <p className="mt-3 font-heading font-semibold leading-snug tracking-wide text-card-foreground transition-colors group-hover:text-teal-ink">{x.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
