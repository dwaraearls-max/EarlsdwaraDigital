"use client";

import { PromoCallout } from "@/components/features/PromoCallout";
import { SocialProfileLinks } from "@/components/ui/SocialProfileLinks";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HoneypotField } from "@/components/ui/HoneypotField";
import { useWebsitePromo } from "@/hooks/useWebsitePromo";
import { budgetRanges, projectTypes, siteConfig } from "@/lib/data";
import { submitForm } from "@/lib/forms";
import { getPromoBudgetOption, getPromoPriceLabel } from "@/lib/promo";
import { FormEvent, useState } from "react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { visible: promoVisible } = useWebsitePromo();
  const budgets = promoVisible ? [getPromoBudgetOption(), ...budgetRanges] : budgetRanges;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      business: String(data.get("business") ?? "").trim(),
      projectType: String(data.get("projectType") ?? "").trim(),
      budget: String(data.get("budget") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      _hp: String(data.get("_hp") ?? "").trim(),
    };

    const result = await submitForm("/api/contact", payload);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative scroll-mt-28 py-16 sm:py-20 md:py-28">
      <div className="mx-auto w-[min(1000px,92%)]">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s build something unforgettable"
          description={
            promoVisible
              ? `August promo: every website type is ${getPromoPriceLabel()} from 21–31 August. Choose your type and enter the details, or send the form below.`
              : "Tell us about your vision. We’ll respond with clarity, next steps, and a tailored recommendation."
          }
        />

        {promoVisible ? (
          <div className="mb-6">
            <PromoCallout compact />
          </div>
        ) : null}

        <div className="glass rounded-3xl p-4 sm:p-6 md:p-10">
          {submitted ? (
            <div className="py-10 text-center">
              <p className="font-display text-3xl font-bold">Request received.</p>
              <p className="mt-3 text-subtext">
                Thank you. Your quote request was emailed to our team—we&apos;ll reply to you shortly.
              </p>
              <Button href="/booking" className="mt-8">
                Book a time now
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="relative grid gap-5 md:grid-cols-2">
              <HoneypotField />
              <Field label="Name" id="name" required />
              <Field label="Email" id="email" type="email" required />
              <Field label="Phone" id="phone" type="tel" />
              <Field label="Business" id="business" />
              <div>
                <label htmlFor="projectType" className="mb-2 block text-sm text-subtext">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  className="w-full rounded-2xl surface-field px-4 py-3 text-sm text-text outline-none focus:ring-2 focus:ring-accent"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a project type
                  </option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type} className="bg-bg-secondary">
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="budget" className="mb-2 block text-sm text-subtext">
                  Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  required
                  className="w-full rounded-2xl surface-field px-4 py-3 text-sm text-text outline-none focus:ring-2 focus:ring-accent"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a budget range
                  </option>
                  {budgets.map((range) => (
                    <option key={range} value={range} className="bg-bg-secondary">
                      {range}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="message" className="mb-2 block text-sm text-subtext">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us about your goals, timeline, and vision..."
                  className="w-full resize-none rounded-2xl surface-field px-4 py-3 text-sm text-text outline-none placeholder:text-subtext/60 focus:ring-2 focus:ring-accent"
                />
              </div>
              {error ? (
                <div className="md:col-span-2" role="alert">
                  <p className="text-sm text-red-400">{error}</p>
                  <p className="mt-2 text-sm text-subtext">
                    Or email us directly at{" "}
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-text underline-offset-2 hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </p>
                </div>
              ) : null}
              <div className="flex flex-col gap-3 md:col-span-2 md:flex-row">
                <Button type="submit" className="flex-1" disabled={submitting}>
                  {submitting ? "Sending…" : "Request Quote"}
                </Button>
                <Button href="/booking" variant="secondary" className="flex-1">
                  Book Consultation
                </Button>
              </div>
              <div className="flex flex-col items-center gap-2 text-center text-xs text-subtext sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-2 md:col-span-2">
                <span>Or reach us at</span>
                <a href={`mailto:${siteConfig.email}`} className="text-text underline-offset-2 hover:underline">
                  {siteConfig.email}
                </a>
                <span className="hidden sm:inline">·</span>
                <a href={siteConfig.social.whatsapp} className="text-text underline-offset-2 hover:underline">
                  {siteConfig.phone}
                </a>
              </div>
              <SocialProfileLinks className="md:col-span-2 justify-center" />
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  type = "text",
  required,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-subtext">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full rounded-2xl surface-field px-4 py-3 text-sm text-text outline-none focus:ring-2 focus:ring-accent"
      />
    </div>
  );
}
