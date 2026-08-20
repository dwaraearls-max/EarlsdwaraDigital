"use client";

import { Button } from "@/components/ui/Button";
import { useWebsitePromo } from "@/hooks/useWebsitePromo";
import { getPromoPriceLabel, promoFormPath, websitePromo } from "@/lib/promo";
import { formatCurrency } from "@/lib/utils";
import { useMemo, useState } from "react";

const pageOptions = [
  { label: "Landing page (1)", value: 1, base: 3500 },
  { label: "Starter site (5)", value: 5, base: 5000 },
  { label: "Business site (8–12)", value: 10, base: 10000 },
  { label: "Custom platform (15+)", value: 15, base: 20000 },
];

const addons = [
  { id: "ecommerce", label: "E-Commerce", price: 6000 },
  { id: "seo", label: "Advanced SEO", price: 2500 },
  { id: "animations", label: "Premium Animations", price: 2000 },
  { id: "cms", label: "CMS Integration", price: 2500 },
  { id: "maintenance", label: "3-Month Maintenance", price: 1800 },
];

export function ProjectCalculator() {
  const [pages, setPages] = useState(pageOptions[1].value);
  const [selected, setSelected] = useState<string[]>(["seo"]);
  const [urgency, setUrgency] = useState<"standard" | "priority">("standard");
  const { visible, active } = useWebsitePromo();

  const estimate = useMemo(() => {
    const selectedOption = pageOptions.find((option) => option.value === pages);
    const base = active ? websitePromo.price : (selectedOption?.base ?? 5000);
    const extras = addons
      .filter((addon) => selected.includes(addon.id))
      .reduce((sum, addon) => {
        if (active && addon.id === "ecommerce") return sum;
        return sum + addon.price;
      }, 0);
    const rush = active ? 0 : urgency === "priority" ? 0.18 : 0;
    return Math.round((base + extras) * (1 + rush));
  }, [pages, selected, urgency, active]);

  const toggleAddon = (id: string) => {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  return (
    <div className="glass rounded-3xl p-6 md:p-10">
      {visible ? (
        <div className="mb-8 rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-highlight">
          {active
            ? `August promo is live: every website type is ${getPromoPriceLabel()} through 31 August. E-commerce is included as a website type.`
            : `From 21 August, every website type drops to ${getPromoPriceLabel()} through 31 August.`}
        </div>
      ) : null}
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <div>
            <label className="mb-3 block text-sm font-medium text-subtext">Project size</label>
            <div className="grid gap-3 sm:grid-cols-2">
              {pageOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPages(option.value)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    pages === option.value
                      ? "border-accent bg-accent/20 text-text"
                      : "surface-field text-subtext hover:text-text"
                  }`}
                >
                  <span className="block font-medium">{option.label}</span>
                  {active ? (
                    <span className="text-xs text-highlight">{getPromoPriceLabel()}</span>
                  ) : visible ? (
                    <span className="text-xs opacity-80">
                      {getPromoPriceLabel()} from 21 Aug
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-subtext">Add-ons</label>
            <div className="grid gap-3 sm:grid-cols-2">
              {addons.map((addon) => {
                const activeAddon = selected.includes(addon.id);
                const included = active && addon.id === "ecommerce";
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                      activeAddon || included
                        ? "border-highlight bg-highlight/20 text-text"
                        : "surface-field text-subtext hover:text-text"
                    }`}
                  >
                    <span className="block font-medium">{addon.label}</span>
                    <span className="text-xs opacity-80">
                      {included ? "Included in promo" : `+${formatCurrency(addon.price)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {active ? null : (
            <div>
              <label className="mb-3 block text-sm font-medium text-subtext">Timeline</label>
              <div className="flex flex-wrap gap-3">
                {(
                  [
                    ["standard", "Standard delivery"],
                    ["priority", "Priority (+18%)"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setUrgency(value)}
                    className={`rounded-2xl border px-4 py-3 text-sm ${
                      urgency === value
                        ? "border-accent bg-accent/20 text-text"
                        : "surface-field text-subtext"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-accent/30 bg-gradient-to-b from-accent/20 to-transparent p-6 text-center lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs uppercase tracking-[0.25em] text-subtext">
            {active ? "Promo estimate" : "Instant estimate"}
          </p>
          <p className="mt-4 font-display text-4xl font-bold sm:text-5xl">{formatCurrency(estimate)}</p>
          <p className="mt-3 text-sm text-subtext">
            {active
              ? `Website builds are ${getPromoPriceLabel()} through 31 August. Choose your type and send the brief to start.`
              : visible
                ? `From 21 August, every website type is ${getPromoPriceLabel()}. Start with the promo brief.`
                : "Final quotes are tailored after discovery. This generator gives you a strong starting range."}
          </p>
          <Button href={visible ? promoFormPath : "/booking"} className="mt-8 w-full">
            {visible ? "Start my website" : "Book consultation"}
          </Button>
          {visible ? null : (
            <Button href="/#contact" variant="secondary" className="mt-3 w-full">
              Request exact quote
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
