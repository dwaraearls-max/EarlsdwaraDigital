"use client";

import { Button } from "@/components/ui/Button";
import { PromoCountdown } from "@/components/features/PromoCountdown";
import { useWebsitePromo } from "@/hooks/useWebsitePromo";
import { getPromoPriceLabel, promoFormPath, websitePromo } from "@/lib/promo";

export function PromoCallout({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { visible, status, countdown } = useWebsitePromo();

  if (!visible) return null;

  return (
    <div className="rounded-3xl border border-accent/40 bg-gradient-to-r from-highlight/20 via-accent/15 to-transparent p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        {websitePromo.name}
      </p>
      <p className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
        {websitePromo.headline}
      </p>
      <p className="mt-2 text-sm text-subtext">
        {status === "upcoming"
          ? `From ${websitePromo.longRange}, every website type is ${getPromoPriceLabel()}. Choose your type and enter the details to start.`
          : `Choose your website type, enter the details we need to build it, and send the brief on WhatsApp.`}
      </p>
      <div className="mt-3 text-accent">
        <PromoCountdown countdown={countdown} />
      </div>
      <Button href={promoFormPath} className={compact ? "mt-4" : "mt-5"}>
        Start my website
      </Button>
    </div>
  );
}
