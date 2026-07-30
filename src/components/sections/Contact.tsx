"use client";

import { SocialProfileLinks } from "@/components/ui/SocialProfileLinks";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { budgetRanges, projectTypes, siteConfig } from "@/lib/data";
import { FormEvent, useState } from "react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative scroll-mt-28 py-16 sm:py-20 md:py-28">
      <div className="mx-auto w-[min(1000px,92%)]">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s build something unforgettable"
          description="Tell us about your vision. We’ll respond with clarity, next steps, and a tailored recommendation."
        />

        <div className="glass rounded-3xl p-4 sm:p-6 md:p-10">
          {submitted ? (
            <div className="py-10 text-center">
              <p className="font-display text-3xl font-bold">Request received.</p>
              <p className="mt-3 text-subtext">
                Thank you. Our team will reach out shortly to schedule your consultation.
              </p>
              <Button href="/booking" className="mt-8">
                Book a time now
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
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
                  required
                  className="w-full rounded-2xl surface-field px-4 py-3 text-sm text-text outline-none focus:ring-2 focus:ring-accent"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a budget range
                  </option>
                  {budgetRanges.map((range) => (
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
                  required
                  rows={5}
                  placeholder="Tell us about your goals, timeline, and vision..."
                  className="w-full resize-none rounded-2xl surface-field px-4 py-3 text-sm text-text outline-none placeholder:text-subtext/60 focus:ring-2 focus:ring-accent"
                />
              </div>
              <div className="flex flex-col gap-3 md:col-span-2 md:flex-row">
                <Button type="submit" className="flex-1">
                  Request Quote
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
