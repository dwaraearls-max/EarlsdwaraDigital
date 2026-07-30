"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { portfolio } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const filters = ["All", "E-Commerce", "Real Estate", "Education", "Restaurant", "Landing Page", "Nonprofit"];

export function Portfolio() {
  const [active, setActive] = useState("All");

  const items = useMemo(
    () => (active === "All" ? portfolio : portfolio.filter((item) => item.category === active)),
    [active],
  );

  return (
    <section id="portfolio" className="relative scroll-mt-28 py-20 md:py-28">
      <div className="mx-auto w-[min(1200px,92%)]">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected work that raised the standard"
          description="Case studies from brands that chose craft over templates—and growth over guesswork."
        />

        <div className="no-scrollbar -mx-[4%] mb-10 flex gap-2 overflow-x-auto px-[4%] pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold tracking-wide transition min-h-11",
                active === filter
                  ? "bg-gradient-to-r from-highlight to-accent text-[#081525] shadow-lg shadow-accent/30"
                  : "glass text-subtext hover:text-text",
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((project) => (
              <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="glow-card group glass block overflow-hidden rounded-3xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${project.category} project`}
                      fill
                      sizes="(max-width: 768px) 92vw, (max-width: 1280px) 45vw, 360px"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="portfolio-card-overlay pointer-events-none absolute inset-0" />
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-50 mix-blend-multiply",
                        project.color,
                      )}
                    />
                    <span className="portfolio-card-badge absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs backdrop-blur">
                      {project.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold">{project.title}</h3>
                    <p className="mt-2 text-sm text-subtext">{project.summary}</p>
                    <p className="mt-4 text-sm font-semibold text-accent">{project.result}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
