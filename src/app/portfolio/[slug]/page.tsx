import { Button } from "@/components/ui/Button";
import { SocialShare } from "@/components/features/SocialShare";
import { portfolio } from "@/lib/data";
import { createShareMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return portfolio.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.find((item) => item.slug === slug);
  if (!project) return {};
  return createShareMetadata({
    title: `${project.title} Case Study`,
    description: project.summary,
    path: `/portfolio/${slug}`,
  });
}

export default async function PortfolioCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = portfolio.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <section className="mx-auto w-[min(960px,92%)] pb-24 pt-32 md:pt-36">
      <p className="text-xs uppercase tracking-[0.25em] text-accent">{project.category}</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
        {project.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-subtext">{project.summary}</p>

      <div className="relative mt-10 h-64 overflow-hidden rounded-3xl border border-accent/20 md:h-80">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.category} project`}
          fill
          priority
          sizes="(max-width: 960px) 92vw, 960px"
          className="object-cover"
        />
        <div className="portfolio-card-overlay pointer-events-none absolute inset-0 opacity-90" />
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-40 mix-blend-multiply ${project.color}`}
        />
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {[
          ["Client", project.client],
          ["Year", project.year],
          ["Result", project.result],
        ].map(([label, value]) => (
          <div key={label} className="glass rounded-3xl p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-subtext">{label}</p>
            <p className="mt-2 font-display text-xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <div className="glass mt-8 space-y-4 rounded-3xl p-6 leading-relaxed text-subtext md:p-10">
        <h2 className="font-display text-2xl font-bold text-text">The challenge</h2>
        <p>
          {project.client} needed a digital presence that matched the quality of their offer—and
          converted attention into action without friction.
        </p>
        <h2 className="font-display text-2xl font-bold text-text">Our approach</h2>
        <p>
          We crafted a cinematic visual system, clarified messaging hierarchy, and engineered a
          conversion path around the moments that matter most for {project.category.toLowerCase()}{" "}
          audiences.
        </p>
        <h2 className="font-display text-2xl font-bold text-text">The outcome</h2>
        <p>
          The launched experience delivered {project.result.toLowerCase()}, stronger brand trust,
          and a foundation ready for ongoing growth.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button href="/#contact">Start a similar project</Button>
        <Button href="/#portfolio" variant="secondary">
          Back to portfolio
        </Button>
      </div>
      <SocialShare className="mt-10" label="Connect with us" />
    </section>
  );
}
