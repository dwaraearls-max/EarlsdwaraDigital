import { Button } from "@/components/ui/Button";
import { SocialShare } from "@/components/features/SocialShare";
import { blogPosts } from "@/lib/data";
import { createShareMetadata } from "@/lib/metadata";
import { createArticleJsonLd, JsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return {};
  return createShareMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <article className="page-pad-top mx-auto w-[min(760px,92%)] pb-24">
      <JsonLd
        data={createArticleJsonLd({
          title: post.title,
          description: post.excerpt,
          path: `/blog/${slug}`,
          datePublished: post.date,
          category: post.category,
        })}
      />
      <p className="text-xs uppercase tracking-[0.25em] text-accent">{post.category}</p>
      <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">{post.title}</h1>
      <p className="mt-4 text-sm text-subtext">
        {post.date} · {post.readTime} read
      </p>
      <div className="glass mt-10 space-y-5 rounded-3xl p-6 text-subtext leading-relaxed md:p-10">
        <p>{post.excerpt}</p>
        <p>
          At Earlsdwara Digital, we treat every website as a growth system—not a brochure. Hierarchy
          guides attention. Motion creates presence. Speed protects trust. And every CTA earns its
          place.
        </p>
        <p>
          Whether you&apos;re launching, redesigning, or optimizing, the brands that win online are
          the ones that make visitors feel something immediately: clarity, confidence, and desire to
          take the next step.
        </p>
        <p>
          If you&apos;re ready to elevate your digital presence, we&apos;d love to map the path with
          you.
        </p>
      </div>
      <Button href="/booking" className="mt-8">
        Book a consultation
      </Button>
      <SocialShare className="mt-10" label="Connect with us" />
    </article>
  );
}
