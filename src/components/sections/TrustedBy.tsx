"use client";

import { trustedBy } from "@/lib/data";

export function TrustedBy() {
  const logos = [...trustedBy, ...trustedBy];

  return (
    <section className="relative border-y border-border bg-bg-secondary/70 py-16 md:py-20" aria-label="Trusted by brands">
      <div className="mx-auto mb-8 w-[min(1200px,92%)] text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-subtext">
          Trusted by ambitious brands
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg-primary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg-primary to-transparent" />
        <div className="marquee gap-4">
          {logos.map((name, index) => (
            <div
              key={`${name}-${index}`}
              className="glass mx-2 flex h-16 min-w-[180px] items-center justify-center rounded-2xl px-8 text-sm font-semibold tracking-wide text-subtext"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
