import { ProjectCalculator } from "@/components/features/ProjectCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Cost Estimator",
  description:
    "Get an instant website cost estimate with the Earlsdwara Digital project calculator.",
};

export default function CalculatorPage() {
  return (
    <section className="mx-auto w-[min(1100px,92%)] pb-24 pt-32 md:pt-36">
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
      <ProjectCalculator />
    </section>
  );
}
