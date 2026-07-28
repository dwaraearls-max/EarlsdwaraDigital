"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data";
import { motion } from "framer-motion";

export function Process() {
  return (
    <section id="process" className="relative scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto w-[min(1200px,92%)]">
        <SectionHeading
          eyebrow="Process"
          title="A clear path from idea to launch"
          description="No chaos. No guesswork. A refined timeline built for clarity, craft, and confidence."
        />

        <div className="relative">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-highlight via-accent to-[#8b7355] md:left-1/2 md:block" />
          <div className="space-y-6 md:space-y-10">
            {processSteps.map((step, index) => {
              const left = index % 2 === 0;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55 }}
                  className={`relative grid items-center gap-4 md:grid-cols-2 ${
                    left ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  <div className={`${left ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="glass rounded-3xl p-6 md:p-8">
                      <p className="text-xs font-semibold tracking-[0.25em] text-accent">
                        STEP {step.step}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-bold">{step.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-subtext">{step.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-6 top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_20px_rgba(201,164,108,0.8)] md:left-1/2 md:block md:-translate-x-1/2" />
                  <div className="hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
