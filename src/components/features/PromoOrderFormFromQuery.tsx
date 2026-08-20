"use client";

import { PromoOrderForm } from "@/components/features/PromoOrderForm";
import { useSearchParams } from "next/navigation";

export function PromoOrderFormFromQuery() {
  const params = useSearchParams();
  return <PromoOrderForm initialType={params.get("type") ?? ""} />;
}
