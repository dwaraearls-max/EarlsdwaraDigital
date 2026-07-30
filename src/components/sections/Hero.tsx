"use client";

import { Button } from "@/components/ui/Button";
import { useMousePosition } from "@/hooks/useMousePosition";
import { siteConfig } from "@/lib/data";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export function Hero() {
  const mouse = useMousePosition();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${x}px ${y}px, rgba(201,164,108,0.2), transparent 60%)`;

  useEffect(() => {
    x.set(mouse.x);
    y.set(mouse.y);
  }, [mouse.x, mouse.y, x, y]);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 sm:pt-28 md:pt-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/hero-handshake.png"
          alt="Business partners shaking hands over a strategic chess piece and global map"
          fill
          priority
          sizes="100vw"
          className="hero-visual__img object-cover object-center"
        />
        <div className="hero-visual__grade absolute inset-0" />
        <div className="hero-overlay-side absolute inset-0" />
        <div className="hero-overlay-bottom absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_70%_50%,rgba(201,164,108,0.14),transparent_55%)]" />
        <div className="orb animate-pulse-glow left-[-10%] top-[12%] hidden h-64 w-64 bg-highlight/20 md:block md:h-80 md:w-80" />
        <div className="orb animate-float right-[-5%] bottom-[15%] hidden h-56 w-56 bg-accent/15 md:block md:h-72 md:w-72" />
        <motion.div className="absolute inset-0" style={{ background: spotlight }} />
      </div>

      <div className="relative z-10 mx-auto flex w-[min(1200px,92%)] flex-col items-center px-1 py-12 text-center sm:py-14 md:items-start md:py-20 md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="glass mb-5 inline-flex max-w-[min(100%,20rem)] items-center gap-2 rounded-full px-3 py-2 text-[11px] font-medium text-subtext sm:mb-6 sm:max-w-none sm:px-4 sm:text-xs"
        >
          <Sparkles size={14} className="text-accent" />
          Premium digital studio for ambitious brands
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.05 }}
          className="font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl md:text-6xl lg:text-7xl"
        >
          {siteConfig.name}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12 }}
          className="mt-3 max-w-3xl font-display text-xl font-medium leading-[1.2] tracking-tight text-subtext sm:mt-4 sm:text-2xl md:text-4xl lg:text-[2.75rem]"
        >
          We Build Websites That{" "}
          <span className="gradient-text gradient-animate font-semibold">Grow Businesses.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 max-w-2xl text-sm leading-relaxed text-subtext sm:mt-6 sm:text-base md:text-lg"
        >
          Your website should work harder than your sales team. At Earlsdwara Digital, we create
          premium websites that convert visitors into customers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28 }}
          className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row sm:items-center md:items-start"
        >
          <Button href="#contact" className="w-full min-w-[200px] sm:w-auto">
            Get My Website <ArrowRight size={16} />
          </Button>
          <Button href="#portfolio" variant="secondary" className="w-full min-w-[200px] sm:w-auto">
            View Portfolio
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 text-sm tracking-wide text-subtext/90"
        >
          {siteConfig.tagline}
        </motion.p>
      </div>
    </section>
  );
}
