import { Button } from "@/components/ui/Button";
import { services } from "@/lib/data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return (
    <section className="mx-auto w-[min(860px,92%)] pb-24 pt-32 md:pt-36">
      <p className="text-xs uppercase tracking-[0.25em] text-accent">Service</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
        {service.title}
      </h1>
      <p className="mt-5 text-lg text-subtext">{service.description}</p>
      <div className="glass mt-10 rounded-3xl p-6 leading-relaxed text-subtext md:p-10">
        <p>{service.details}</p>
        <p className="mt-4">
          Every engagement includes strategic discovery, premium design direction, performance-first
          development, and a launch experience designed to convert.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/booking">Book consultation</Button>
        <Button href="/calculator" variant="secondary">
          Estimate cost
        </Button>
      </div>
    </section>
  );
}
