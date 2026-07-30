"use client";

import { siteConfig } from "@/lib/data";
import { MessageCircle } from "lucide-react";

export function WhatsAppChat() {
  const href = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hi Earlsdwara Digital — I’d like to discuss a website project.",
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed-safe-bottom fixed-safe-right fixed z-[60] flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg shadow-emerald-500/30 transition hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={22} />
    </a>
  );
}
