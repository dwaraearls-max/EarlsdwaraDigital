import { PromoCallout } from "@/components/features/PromoCallout";
import { ProjectCalculator } from "@/components/features/ProjectCalculator";
import { createShareMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createShareMetadata({
  title: "Project Cost Estimator",
  description:
    "Get an instant website cost estimate with the Earlsdwara Digital project calculator.",
  path: "/calculator",
});

export default function CalculatorPage() {
  return (
    <section className="page-pad-top mx-auto w-[min(1100px,92%)] pb-24">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
          Cost estimator
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Instant quote generator
        </h1>
        <p className="mt-4 text-subtext">
          Configure your project scope and generate a premium starting estimate in seconds.
        </p>
      </div>
      <div className="mb-8">
        <PromoCallout compact />
      </div>
      <ProjectCalculator />
    </section>
  );
}
