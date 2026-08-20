import { blogPosts } from "@/lib/data";
import { createShareMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = createShareMetadata({
  title: "Insights & Blog",
  description:
    "Ideas on premium web design, conversion, SEO, and digital growth from Earlsdwara Digital.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <section className="page-pad-top mx-auto w-[min(1000px,92%)] pb-24">
      <div className="mb-12 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">Blog</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Insights for brands that want to grow
        </h1>
        <p className="mt-4 text-subtext">
          Practical thinking on design systems, conversion craft, and websites that perform.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glow-card glass block rounded-3xl p-6"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{post.category}</p>
            <h2 className="mt-3 font-display text-xl font-semibold leading-snug">{post.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-subtext">{post.excerpt}</p>
            <p className="mt-5 text-xs text-subtext">
              {post.date} · {post.readTime}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
