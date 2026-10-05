import type { Metadata } from "next";
import Link from "next/link";
import { T } from "../../components/Lang";
import PostCard, { pillClass } from "../../components/blog/PostCard";
import { featured, popular, posts } from "../../lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artikel seputar coworking space, private office, virtual office, dan sewa kantor di Medan dari tim CLAPHAM.CO.",
};

const h2 = "font-heading text-xl font-semibold tracking-wide text-foreground";

export default function BlogPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 pb-24 pt-12 md:pt-16">
        <header className="reveal mb-14 max-w-3xl md:mb-16">
          <h1 className="font-heading text-4xl font-semibold tracking-wide text-foreground md:text-5xl">
            Clapham Blog
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            <T en="We build a culture where client are welcome to engage proactively in discussion to express their ideas, preferences, and feedbacks.">
              Kami membangun budaya di mana klien disambut untuk berdiskusi secara proaktif dalam menyampaikan ide,
              preferensi, dan masukan mereka.
            </T>
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
          <div>
            <section className="mb-14">
              <h2 className={`${h2} mb-6`}>
                <T en="Featured Article">Artikel Unggulan</T>
              </h2>
              <PostCard post={featured} size="featured" eager />
            </section>

            <section>
              <h2 className={`${h2} mb-6`}>
                <T en="Latest Articles">Artikel Terbaru</T>
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {posts.map((post, i) => (
                  <PostCard key={post.slug} post={post} index={i} />
                ))}
              </div>
            </section>
          </div>

          <aside>
            <div className="lg:sticky lg:top-24">
              <h2 className={`${h2} mb-6`}>
                <T en="Popular Articles">Artikel Populer</T>
              </h2>
              <ul className="space-y-4">
                {popular.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block rounded-lg border border-border bg-card p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-ink/40 hover:shadow-md"
                    >
                      <span className={pillClass}>{post.category}</span>
                      <p className="mt-3 font-heading font-semibold leading-snug tracking-wide text-card-foreground transition-colors group-hover:text-teal-ink">
                        <T en={post.en.title}>{post.title}</T>
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
