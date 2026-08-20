"use client";

import { PromoCountdown } from "@/components/features/PromoCountdown";
import { useWebsitePromo } from "@/hooks/useWebsitePromo";
import { getPromoEntryHref, getPromoPriceLabel } from "@/lib/promo";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { scrollToHash } from "@/lib/links";

export function PromoBanner() {
  const pathname = usePathname();
  const { showBanner, status, countdown, dismiss } = useWebsitePromo();

  useEffect(() => {
    if (!showBanner) {
      document.documentElement.removeAttribute("data-promo-banner");
      return;
    }

    document.documentElement.setAttribute("data-promo-banner", status);
    return () => document.documentElement.removeAttribute("data-promo-banner");
  }, [showBanner, status]);

  if (!showBanner) return null;

  const href = getPromoEntryHref(pathname);
  const message =
    status === "upcoming"
      ? `From 21 August: all website types ${getPromoPriceLabel()} · start your brief`
      : `All website types ${getPromoPriceLabel()} · choose your type · ends 31 August`;

  return (
    <>
      <style>{`html { --promo-banner-height: 2.75rem; }`}</style>
      <div className="promo-banner fixed inset-x-0 top-0 z-[78] h-[var(--promo-banner-height)]">
        <div className="mx-auto flex h-full w-[min(1200px,96%)] items-center justify-between gap-2">
          <Link
            href={href}
            onClick={(event) => {
              if (href === "#promo" && scrollToHash("#promo")) {
                event.preventDefault();
              }
            }}
            className="flex min-w-0 flex-1 items-center justify-center gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.18em]"
          >
            <span className="truncate">{message}</span>
            <span className="hidden shrink-0 sm:inline">
              <PromoCountdown countdown={countdown} compact />
            </span>
          </Link>
          <button
            type="button"
            onClick={dismiss}
            className="touch-target shrink-0 rounded-lg text-[#081525]/80 hover:text-[#081525]"
            aria-label="Dismiss promo banner"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
