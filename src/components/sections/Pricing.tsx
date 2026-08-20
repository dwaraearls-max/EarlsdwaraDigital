"use client";

import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useWebsitePromo } from "@/hooks/useWebsitePromo";
import { pricingPlans } from "@/lib/data";
import { getPromoPriceLabel, promoFormPath, websitePromo } from "@/lib/promo";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function Pricing() {
  const { visible, active } = useWebsitePromo();
  const promoPrice = websitePromo.price;

  return (
    <section id="pricing" className="relative scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto w-[min(1200px,92%)]">
        <SectionHeading
          eyebrow={visible ? "August Promo" : "Pricing"}
          title={visible ? "Any website type, one promo price" : "Investment plans built for growth"}
          description={
            visible
              ? `${websitePromo.longRange}: landing pages, business sites, e-commerce, custom builds, and redesigns are all ${getPromoPriceLabel()}.`
              : "Transparent packages. Premium outcomes. Choose the level that matches your ambition."
          }
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
                  {visible ? "Promo price" : "Most Popular"}
                </span>
              ) : null}
              {visible && !plan.popular ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-accent/50 bg-bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                  August deal
                </span>
              ) : null}
              <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
              <p className="mt-2 text-sm text-subtext">{plan.description}</p>
              <p className="mt-6 font-display text-3xl font-bold sm:text-4xl">
                {active ? (
                  <>
                    {formatCurrency(promoPrice)}
                    <span className="ml-3 text-lg font-normal text-subtext line-through">
                      {formatCurrency(plan.price)}
                    </span>
                  </>
                ) : visible ? (
                  <>
                    {formatCurrency(promoPrice)}
                    <span className="block text-sm font-normal text-subtext">
                      from 21 August · was {formatCurrency(plan.price)}
                    </span>
                  </>
                ) : (
                  formatCurrency(plan.price)
                )}
                {visible && active ? (
                  <span className="text-base font-normal text-subtext"> / project</span>
                ) : visible ? null : (
                  <span className="text-base font-normal text-subtext"> / project</span>
                )}
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
                href={visible ? promoFormPath : "/#contact"}
                variant={plan.popular ? "primary" : "secondary"}
                className="mt-8 w-full"
              >
                {visible ? "Start my website" : plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-subtext">
          {visible
            ? "Promo applies to every website type started through the August brief between 21 and 31 August 2026. "
            : "Need a custom estimate? Try our "}
          <a href="/calculator" className="text-accent underline-offset-4 hover:underline">
            Project Calculator
          </a>
          {visible ? " for add-ons and extras." : "."}
        </p>
      </div>
    </section>
  );
}
