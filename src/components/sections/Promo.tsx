"use client";

import { PromoCountdown } from "@/components/features/PromoCountdown";
import { PromoOrderForm } from "@/components/features/PromoOrderForm";
import { useWebsitePromo } from "@/hooks/useWebsitePromo";
import { getPromoPriceLabel, websitePromo } from "@/lib/promo";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Promo() {
  const { visible, status, countdown } = useWebsitePromo();

  if (!visible) return null;

  return (
    <section id="promo" className="relative scroll-mt-[calc(7rem+var(--promo-banner-height,0px))] py-16 md:py-24">
      <div className="mx-auto w-[min(1100px,92%)]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 overflow-hidden rounded-[2rem] border border-accent/50 bg-gradient-to-br from-highlight/25 via-bg-secondary to-bg-primary p-6 sm:p-10"
        >
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            <Sparkles size={14} />
            Limited window · {websitePromo.shortRange}
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Choose your website.{" "}
            <span className="gradient-text">{getPromoPriceLabel()}.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-subtext md:text-lg">
            {status === "upcoming"
              ? `From 21 August, pick your website type, enter the details, and send the brief on WhatsApp.`
              : `Pick your website type, enter the details we need to build it, and send everything on WhatsApp.`}
          </p>
          <div className="mt-6 text-highlight">
            <PromoCountdown countdown={countdown} />
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-subtext">
              {websitePromo.longRange}
            </p>
          </div>
        </motion.div>

        <PromoOrderForm />
      </div>
    </section>
  );
}
