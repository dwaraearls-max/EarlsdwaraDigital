import { PromoOrderFormFromQuery } from "@/components/features/PromoOrderFormFromQuery";
import { createShareMetadata } from "@/lib/metadata";
import { getPromoPriceLabel, isPromoVisible, websitePromo } from "@/lib/promo";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = createShareMetadata({
  title: "August Website Promo",
  description: `Choose your website type, enter the details, and claim a ${getPromoPriceLabel()} website from 21–31 August.`,
  path: "/promo",
});

export default function PromoPage() {
  if (!isPromoVisible()) {
    redirect("/");
  }

  return (
    <section className="page-pad-top mx-auto w-[min(1100px,92%)] pb-24">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
          {websitePromo.name}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Start your {getPromoPriceLabel()} website
        </h1>
        <p className="mt-4 text-subtext">
          Select the type of website you want, enter the details we need to build it, then send the
          brief on WhatsApp.
        </p>
      </div>
      <Suspense fallback={null}>
        <PromoOrderFormFromQuery />
      </Suspense>
    </section>
  );
}
