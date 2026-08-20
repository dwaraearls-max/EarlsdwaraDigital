"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-highlight via-accent to-[#8b7355]"
      style={{ top: "var(--promo-banner-height, 0px)", scaleX }}
      aria-hidden
    />
  );
}
