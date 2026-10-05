import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { T } from "../../../components/Lang";
import PostDate from "../../../components/blog/PostDate";
import Rich from "../../../components/blog/Rich";
import { pillClass } from "../../../components/blog/PostCard";
import { clip } from "../../../lib/site";
import { WHATSAPP_URL, getPost, posts, similar, type Block } from "../../../lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: clip(post.excerpt),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      siteName: "CLAPHAM.CO",
      locale: "id_ID",
      title: post.title,
      description: clip(post.excerpt),
      publishedTime: post.date,
      authors: [post.author.name],
      images: [{ url: post.hero.src, width: post.hero.w, height: post.hero.h, alt: post.title }],
    },
    twitter: { card: "summary_large_image" },
  };
}

function Body({ block }: { block: Block }) {
  switch (block.t) {
    case "p":
      return (
        <p className="mb-6 text-lg leading-loose text-foreground/85 md:text-justify">
          <Rich text={block.text} />
        </p>
      );
    case "h2":
      return (
        <h2 className="mb-5 mt-14 font-heading text-3xl font-semibold leading-tight tracking-wide text-foreground">
          <Rich text={block.text} />
        </h2>
      );
    case "h3":
      return (
        <h3 className="mb-3 mt-10 font-heading text-xl font-semibold leading-snug tracking-wide text-foreground md:text-2xl">
          <Rich text={block.text} />
        </h3>
      );
    case "ul":
      return (
        <ul className="mb-6 list-disc space-y-2 pl-6 text-lg leading-relaxed text-foreground/85 marker:text-teal-ink md:text-justify">
          {block.items.map((it, i) => (
            <li key={i}>
              <Rich text={it} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mb-6 list-decimal space-y-2 pl-6 text-lg leading-relaxed text-foreground/85 marker:font-semibold marker:text-teal-ink md:text-justify">
          {block.items.map((it, i) => (
            <li key={i}>
              <Rich text={it} />
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div className="mb-6 rounded-lg border-l-4 border-primary bg-secondary p-5 text-lg leading-relaxed text-foreground/85 md:text-justify">
          <Rich text={block.text} />
        </div>
      );
    case "img":
      return (
        <figure className="my-8">
          <Image
            src={block.src}
            alt={block.alt}
            width={block.w}
            height={block.h}
            sizes="(min-width: 1024px) 820px, 100vw"
            quality={90}
            className="h-auto w-full rounded-lg"
          />
        </figure>
      );
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author.name, jobTitle: post.author.role },
    publisher: { "@type": "Organization", name: "CLAPHAM.CO" },
    image: post.hero.src,
    inLanguage: "id",
  };

  return (
    <article className="bg-background pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container mx-auto max-w-7xl px-4 pt-10 md:pt-14">
        <Link
          href="/blog"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-teal-ink hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-x-1"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
          <T en="Back to Blog">Kembali ke Blog</T>
        </Link>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0 max-w-4xl">
        <header>
          <span className={pillClass}>{post.category}</span>
          <h1 className="mt-5 font-heading text-3xl font-semibold leading-tight tracking-wide text-foreground md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground md:text-xl">{post.excerpt}</p>
          <PostDate iso={post.date} className="mt-6 block text-sm font-semibold text-foreground" />

          <div className="mt-6 rounded-lg bg-secondary px-5 py-4">
            <p className="font-medium text-foreground">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">{post.author.role}</p>
          </div>
        </header>

        <hr className="my-10 border-border" />

        <T
          en={
            <p className="mb-8 rounded-lg border border-border bg-card px-5 py-3 text-sm text-muted-foreground">
              This article is currently available in Indonesian only.
            </p>
          }
        >
          {null}
        </T>

        <Image
          src={post.hero.src}
          alt={post.title}
          width={post.hero.w}
          height={post.hero.h}
          sizes="(min-width: 1024px) 820px, 100vw"
          quality={90}
          loading="eager"
          fetchPriority="high"
          className="mb-10 h-auto w-full rounded-lg"
        />

        <div lang="id">
          {post.blocks.map((b, i) => (
            <Body key={i} block={b} />
          ))}
        </div>

        <a
          href={WHATSAPP_URL}
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
              <T en="Similar Articles">Artikel Serupa</T>
            </h2>
            <ul className="space-y-4">
              {similar(post.slug).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group block rounded-lg border border-border bg-card p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-ink/40 hover:shadow-md"
                  >
                    <span className={pillClass}>{p.category}</span>
                    <p className="mt-3 font-heading font-semibold leading-snug tracking-wide text-card-foreground transition-colors group-hover:text-teal-ink">
                      {p.title}
                    </p>
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
