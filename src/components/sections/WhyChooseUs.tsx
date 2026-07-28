"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stats } from "@/lib/data";
import { motion } from "framer-motion";

export function WhyChooseUs() {
  return (
    <section id="why-us" className="relative scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto w-[min(1200px,92%)]">
        <SectionHeading
          eyebrow="Why Earlsdwara"
          title="Results that feel inevitable"
          description="Luxury aesthetics. Engineering discipline. Conversion obsession. That’s the difference."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="glass relative overflow-hidden rounded-3xl p-8 text-center"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-highlight/10 via-transparent to-accent/10" />
              <p className="relative font-display text-5xl font-semibold text-accent md:text-6xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="relative mt-3 text-sm text-subtext">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
