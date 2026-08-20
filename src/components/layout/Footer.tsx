"use client";

import { SocialProfileLinks } from "@/components/ui/SocialProfileLinks";
import { Logo } from "@/components/ui/Logo";
import { SocialShare } from "@/components/features/SocialShare";
import { useWebsitePromo } from "@/hooks/useWebsitePromo";
import { siteConfig, services } from "@/lib/data";
import { homeHashHref, scrollToHash } from "@/lib/links";
import { submitForm } from "@/lib/forms";
import { promoFormPath } from "@/lib/promo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FormEvent, useState } from "react";
import { HoneypotField } from "@/components/ui/HoneypotField";

export function Footer() {
  const pathname = usePathname();
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { visible: promoVisible } = useWebsitePromo();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const email = String(new FormData(event.currentTarget).get("email") ?? "").trim();
    const result = await submitForm("/api/newsletter", {
      email,
      _hp: String(new FormData(event.currentTarget).get("_hp") ?? "").trim(),
    });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setSubscribed(true);
  };

  return (
    <footer className="relative mt-24 border-t border-border bg-bg-secondary/80">
      <div className="mx-auto grid w-[min(1200px,92%)] gap-8 px-0 py-12 sm:gap-10 sm:py-14 md:grid-cols-2 md:py-16 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="mb-4">
            <Logo imageClassName="max-h-16 sm:max-h-[4.5rem]" />
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
              {[
                ["About", "#about"],
                ["Portfolio", "#portfolio"],
                ["Pricing", "#pricing"],
                ...(promoVisible ? [["August Promo", promoFormPath] as const] : []),
                ["Blog", "/blog"],
                ["Book a Call", "/booking"],
              ].map(([label, href]) => {
                const external = href.startsWith("http");
                return (
                <li key={href}>
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-text"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={homeHashHref(href, pathname)}
                      className="hover:text-text"
                      onClick={(event) => {
                        if (pathname === "/" && href.startsWith("#") && scrollToHash(href)) {
                          event.preventDefault();
                        }
                      }}
                    >
                      {label}
                    </Link>
                  )}
                </li>
                );
              })}
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
          <form onSubmit={onSubmit} className="relative space-y-3">
            <HoneypotField />
            <label className="sr-only" htmlFor="newsletter-email">
              Email
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder="you@company.com"
              className="w-full rounded-2xl surface-field px-4 py-3 text-sm text-text outline-none ring-accent placeholder:text-subtext/70 focus:ring-2"
            />
            {error ? (
              <p className="text-xs text-red-400" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={submitting || subscribed}
              className="glow-btn w-full rounded-2xl bg-gradient-to-r from-highlight to-accent px-4 py-3 text-sm font-semibold text-[#081525] disabled:opacity-60"
            >
              {subscribed ? "You're in ✓" : submitting ? "Subscribing…" : "Subscribe"}
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
