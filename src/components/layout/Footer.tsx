"use client";

import { SocialProfileLinks } from "@/components/ui/SocialProfileLinks";
import { SocialShare } from "@/components/features/SocialShare";
import { siteConfig, services } from "@/lib/data";
import Link from "next/link";
import { type FormEvent, useState } from "react";

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="relative mt-24 border-t border-border bg-bg-secondary/80">
      <div className="mx-auto grid w-[min(1200px,92%)] gap-8 px-0 py-12 sm:gap-10 sm:py-14 md:grid-cols-2 md:py-16 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-highlight to-accent font-display text-sm font-bold text-[#081525]">
              ED
            </span>
            <span className="font-display text-xl font-semibold sm:text-2xl">{siteConfig.name}</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-subtext">{siteConfig.tagline}</p>
          <SocialProfileLinks className="mt-6" />
        </div>

        <div className="grid grid-cols-2 gap-8 md:contents">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-text">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-subtext">
              <li>
                <Link href="#about" className="hover:text-text">
                  About
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="hover:text-text">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-text">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-text">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-text">
                  Book a Call
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-text">
              Services
            </h3>
            <ul className="space-y-3 text-sm text-subtext">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="hover:text-text">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-1 lg:col-span-1">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-text">
            Newsletter
          </h3>
          <p className="mb-4 text-sm text-subtext">
            Insights on design, conversion, and digital growth—once a month.
          </p>
          <form onSubmit={onSubmit} className="space-y-3">
            <label className="sr-only" htmlFor="newsletter-email">
              Email
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@company.com"
              className="w-full rounded-2xl surface-field px-4 py-3 text-sm text-text outline-none ring-accent placeholder:text-subtext/70 focus:ring-2"
            />
            <button
              type="submit"
              className="glow-btn w-full rounded-2xl bg-gradient-to-r from-highlight to-accent px-4 py-3 text-sm font-semibold text-[#081525]"
            >
              {subscribed ? "You're in ✓" : "Subscribe"}
            </button>
          </form>
          <div className="mt-6 space-y-1 text-sm text-subtext">
            <p>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-text">
                {siteConfig.email}
              </a>
            </p>
            <p>
              <a href={siteConfig.social.whatsapp} className="hover:text-text">
                {siteConfig.phone}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-[min(1200px,92%)] pb-10">
        <SocialShare compact />
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-subtext">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
