"use client";

import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/data";
import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  RefreshCw,
  Rocket,
  Search,
  Server,
  ShoppingBag,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Palette,
  Code2,
  ShoppingBag,
  Rocket,
  Search,
  Wrench,
  RefreshCw,
  Server,
};

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto w-[min(1200px,92%)]">
        <SectionHeading
          eyebrow="Services"
          title="Everything your brand needs to look elite online"
          description="From first sketch to post-launch care—crafted for startups, businesses, and institutions that want results."
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = icons[service.icon] ?? Palette;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <GlassCard className="group flex h-full flex-col">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-highlight/30 to-accent/20 text-accent transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(201,164,108,0.35)]">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-subtext">
                    {service.description}
                  </p>
                  <Button
                    href={`/services/${service.slug}`}
                    variant="ghost"
                    className="mt-5 !justify-start !px-0"
                  >
                    Learn More →
                  </Button>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
