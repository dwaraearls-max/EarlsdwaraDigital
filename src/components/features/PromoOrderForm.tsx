"use client";

import { Button } from "@/components/ui/Button";
import {
  getPromoOrderWhatsAppUrl,
  getPromoPriceLabel,
  getPromoWebsiteType,
  promoContentOptions,
  promoFeatureOptions,
  promoGoals,
  promoPageOptions,
  promoStyleOptions,
  promoWebsiteTypes,
} from "@/lib/promo";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function PromoOrderForm({ initialType = "" }: { initialType?: string }) {
  const matchedType = getPromoWebsiteType(initialType);
  const [step, setStep] = useState<"type" | "details">(matchedType ? "details" : "type");
  const [websiteTypeId, setWebsiteTypeId] = useState(matchedType?.id ?? "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");
  const [industry, setIndustry] = useState("");
  const [goal, setGoal] = useState("");
  const [pages, setPages] = useState<string[]>(["Home", "About", "Contact"]);
  const [features, setFeatures] = useState<string[]>(["Contact form", "WhatsApp button"]);
  const [existingUrl, setExistingUrl] = useState("");
  const [style, setStyle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const selectedType = useMemo(
    () => promoWebsiteTypes.find((type) => type.id === websiteTypeId),
    [websiteTypeId],
  );
  const isRedesign = websiteTypeId === "website-redesign";

  const continueToDetails = () => {
    if (!selectedType) {
      setError("Select the type of website you want.");
      return;
    }
    setError("");
    setStep("details");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedType) {
      setError("Select the type of website you want.");
      setStep("type");
      return;
    }
    if (!name.trim() || !phone.trim() || !email.trim() || !business.trim() || !industry.trim() || !goal) {
      setError("Please complete your contact details, business, and website goal.");
      return;
    }

    const url = getPromoOrderWhatsAppUrl({
      websiteType: selectedType.label,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      business: business.trim(),
      industry: industry.trim(),
      goal,
      pages,
      features,
      existingUrl: existingUrl.trim(),
      style,
      content,
      notes: notes.trim(),
    });

    window.location.href = url;
  };

  return (
    <div className="glass rounded-3xl p-4 sm:p-6 md:p-8">
      <div className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-subtext">
        <span className={cn(step === "type" ? "text-accent" : "text-subtext")}>1. Website type</span>
        <span aria-hidden>/</span>
        <span className={cn(step === "details" ? "text-accent" : "text-subtext")}>2. Your details</span>
      </div>

      {step === "type" ? (
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            What type of website do you want?
          </h3>
          <p className="mt-2 text-sm text-subtext">
            Every type is {getPromoPriceLabel()} during the August promo. Choose one to continue.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {promoWebsiteTypes.map((type) => {
              const active = websiteTypeId === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => {
                    setWebsiteTypeId(type.id);
                    setError("");
                  }}
                  className={cn(
                    "rounded-2xl border px-4 py-4 text-left transition",
                    active
                      ? "border-accent bg-accent/20 text-text"
                      : "surface-field text-subtext hover:text-text",
                  )}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-display text-lg font-semibold text-text">{type.label}</span>
                    {active ? <Check size={16} className="shrink-0 text-accent" /> : null}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed">{type.description}</span>
                </button>
              );
            })}
          </div>
          {error ? (
            <p className="mt-4 text-sm text-red-400" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="button" className="mt-6 w-full sm:w-auto" onClick={continueToDetails}>
            Continue with details <ArrowRight size={16} />
          </Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {selectedType?.label} · {getPromoPriceLabel()}
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">
                Tell us how to build it
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setStep("type")}
              className="inline-flex items-center gap-2 text-sm text-subtext hover:text-text"
            >
              <ArrowLeft size={14} /> Change website type
            </button>
          </div>

          <Field
            label="Full name"
            id="promo-name"
            value={name}
            onChange={setName}
            required
          />
          <Field
            label="WhatsApp number"
            id="promo-phone"
            type="tel"
            value={phone}
            onChange={setPhone}
            required
          />
          <Field
            label="Email"
            id="promo-email"
            type="email"
            value={email}
            onChange={setEmail}
            required
          />
          <Field
            label="Business / brand name"
            id="promo-business"
            value={business}
            onChange={setBusiness}
            required
          />
          <Field
            label="What do you do?"
            id="promo-industry"
            value={industry}
            onChange={setIndustry}
            placeholder="Restaurant, church, fashion shop, school..."
            required
            className="md:col-span-2"
          />

          <div className="md:col-span-2">
            <label htmlFor="promo-goal" className="mb-2 block text-sm text-subtext">
              What should this website do?
            </label>
            <select
              id="promo-goal"
              required
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              className="w-full rounded-2xl surface-field px-4 py-3 text-sm text-text outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="" disabled>
                Select a goal
              </option>
              {promoGoals.map((item) => (
                <option key={item} value={item} className="bg-bg-secondary">
                  {item}
                </option>
              ))}
            </select>
          </div>

          <ChipGroup
            label="Pages you need"
            options={promoPageOptions}
            selected={pages}
            onToggle={(value) => setPages((current) => toggleValue(current, value))}
          />
          <ChipGroup
            label="Features to include"
            options={promoFeatureOptions}
            selected={features}
            onToggle={(value) => setFeatures((current) => toggleValue(current, value))}
          />

          <Field
            label={isRedesign ? "Current website URL" : "Current website URL (optional)"}
            id="promo-url"
            value={existingUrl}
            onChange={setExistingUrl}
            placeholder="https://"
            required={isRedesign}
            className="md:col-span-2"
          />

          <div>
            <label htmlFor="promo-style" className="mb-2 block text-sm text-subtext">
              Style you prefer
            </label>
            <select
              id="promo-style"
              value={style}
              onChange={(event) => setStyle(event.target.value)}
              className="w-full rounded-2xl surface-field px-4 py-3 text-sm text-text outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Select a style</option>
              {promoStyleOptions.map((item) => (
                <option key={item} value={item} className="bg-bg-secondary">
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="promo-content" className="mb-2 block text-sm text-subtext">
              Content readiness
            </label>
            <select
              id="promo-content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="w-full rounded-2xl surface-field px-4 py-3 text-sm text-text outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Select one</option>
              {promoContentOptions.map((item) => (
                <option key={item} value={item} className="bg-bg-secondary">
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="promo-notes" className="mb-2 block text-sm text-subtext">
              Anything else we should know
            </label>
            <textarea
              id="promo-notes"
              rows={5}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Products you sell, colours, pages that matter most, examples you like..."
              className="w-full resize-none rounded-2xl surface-field px-4 py-3 text-sm text-text outline-none placeholder:text-subtext/60 focus:ring-2 focus:ring-accent"
            />
          </div>

          {error ? (
            <p className="md:col-span-2 text-sm text-red-400" role="alert">
              {error}
            </p>
          ) : null}

          <Button type="submit" className="md:col-span-2 w-full">
            Send details on WhatsApp <MessageCircle size={16} />
          </Button>
          <p className="md:col-span-2 text-center text-xs text-subtext">
            WhatsApp will open with your brief so we can start building your {getPromoPriceLabel()} website.
          </p>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  className,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm text-subtext">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl surface-field px-4 py-3 text-sm text-text outline-none placeholder:text-subtext/60 focus:ring-2 focus:ring-accent"
      />
    </div>
  );
}

function ChipGroup({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="md:col-span-2">
      <p className="mb-3 text-sm text-subtext">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                active
                  ? "border-accent bg-accent/20 text-text"
                  : "surface-field text-subtext hover:text-text",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
