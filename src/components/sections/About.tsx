"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { values } from "@/lib/data";
import { motion } from "framer-motion";
import { Eye, Heart, Target } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto w-[min(1200px,92%)]">
        <SectionHeading
          eyebrow="About"
          title="The studio behind unforgettable digital experiences"
          description="Earlsdwara Digital exists for brands that refuse to look average online. We blend strategy, cinematic design, and conversion engineering into websites that feel elite—and perform like it."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="h-full">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                <Target size={22} />
              </div>
              <h3 className="font-display text-2xl font-bold">Mission</h3>
              <p className="mt-3 text-subtext leading-relaxed">
                To build digital experiences so precise and premium that they inspire trust on
                contact—and growth on every click.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <GlassCard className="h-full">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-highlight/20 text-highlight">
                <Eye size={22} />
              </div>
              <h3 className="font-display text-2xl font-bold">Vision</h3>
              <p className="mt-3 text-subtext leading-relaxed">
                A world where every ambitious brand—startup to enterprise—owns a website worthy of
                the future they’re building.
              </p>
            </GlassCard>
          </motion.div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <GlassCard className="h-full">
                <Heart size={18} className="mb-4 text-accent" />
                <h4 className="font-display text-lg font-semibold">{value.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-subtext">{value.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
