import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Post } from "../../lib/blog";
import { T } from "../Lang";
import PostDate from "./PostDate";

export const pillClass =
  "inline-block rounded-full bg-primary/40 px-3 py-1 text-xs font-semibold text-foreground";

type Props = { post: Post; index?: number; size?: "featured" | "card"; eager?: boolean };

export default function PostCard({ post, index = 0, size = "card", eager = false }: Props) {
  const featured = size === "featured";
  return (
    <div className="reveal h-full" style={{ "--i": index % 4 } as CSSProperties}>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-xs transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
      >
        <div className={`relative overflow-hidden ${featured ? "aspect-[16/8]" : "aspect-[16/10]"}`}>
          <Image
            src={post.hero.src}
            alt={post.title}
            fill
            sizes={featured ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 768px) 30vw, 100vw"}
            quality={90}
            {...(eager ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <span className={`${pillClass} self-start`}>{post.category}</span>
          <h3
            className={`mt-4 font-heading font-semibold leading-snug tracking-wide text-card-foreground transition-colors group-hover:text-teal-ink ${
              featured ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            <T en={post.en.title}>{post.title}</T>
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base"><T en={post.en.excerpt}>{post.excerpt}</T></p>
          <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
            <span>{post.author.name}</span>
            <span aria-hidden>•</span>
            <PostDate iso={post.date} />
          </p>
        </div>
      </Link>
    </div>
  );
}
