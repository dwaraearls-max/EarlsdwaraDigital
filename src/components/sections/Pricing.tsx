"use client";

import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricingPlans } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto w-[min(1200px,92%)]">
        <SectionHeading
          eyebrow="Pricing"
          title="Investment plans built for growth"
          description="Transparent packages. Premium outcomes. Choose the level that matches your ambition."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className={`glow-card relative overflow-visible rounded-3xl border p-6 sm:p-7 md:p-8 ${
                plan.popular
                  ? "border-accent/60 bg-gradient-to-b from-accent/20 to-bg-secondary/60 pt-9 shadow-[0_0_60px_rgba(201,164,108,0.22)]"
                  : "glass"
              }`}
            >
              {plan.popular ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-highlight to-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#081525]">
                  Most Popular
                </span>
              ) : null}
              <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
              <p className="mt-2 text-sm text-subtext">{plan.description}</p>
              <p className="mt-6 font-display text-3xl font-bold sm:text-4xl">
                {formatCurrency(plan.price)}
                <span className="text-base font-normal text-subtext"> / project</span>
              </p>
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-subtext">
                    <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                href="/#contact"
                variant={plan.popular ? "primary" : "secondary"}
                className="mt-8 w-full"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-subtext">
          Need a custom estimate? Try our{" "}
          <a href="/calculator" className="text-accent underline-offset-4 hover:underline">
            Project Calculator
          </a>
          .
        </p>
      </div>
    </section>
  );
}
