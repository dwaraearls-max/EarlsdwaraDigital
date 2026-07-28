"use client";

import { ScrollToTop } from "@/components/features/ScrollToTop";
import { WhatsAppChat } from "@/components/features/WhatsAppChat";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import type { ReactNode } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <div className="noise" aria-hidden />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppChat />
      <ScrollToTop />
    </ThemeProvider>
  );
}
