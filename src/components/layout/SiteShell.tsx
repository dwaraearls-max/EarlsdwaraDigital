"use client";

import { PromoBanner } from "@/components/features/PromoBanner";
import { ScrollToTop } from "@/components/features/ScrollToTop";
import { WhatsAppChat } from "@/components/features/WhatsAppChat";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import type { ReactNode } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <PromoBanner />
      <div className="noise" aria-hidden />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppChat />
      <ScrollToTop />
    </>
  );
}
