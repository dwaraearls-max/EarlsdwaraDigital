"use client";

import { getPromoPriceLabel, getPromoStatus } from "@/lib/promo";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { FormEvent, useState } from "react";

type Message = { role: "user" | "assistant"; text: string };

const starter: Message[] = [
  {
    role: "assistant",
    text: "Welcome to Earlsdwara Digital. I can help with services, pricing, timelines, or booking a consultation. What are you building?",
  },
];

function replyTo(input: string): string {
  const text = input.toLowerCase();
  const promoStatus = getPromoStatus();
  if (
    text.includes("price") ||
    text.includes("cost") ||
    text.includes("quote") ||
    text.includes("promo") ||
    text.includes("offer")
  ) {
    if (promoStatus === "active") {
      return `August promo is live: every website type is ${getPromoPriceLabel()} through 31 August. Go to /promo, choose your website type, enter the details, and send the brief on WhatsApp.`;
    }
    if (promoStatus === "upcoming") {
      return `From 21–31 August, every website type is ${getPromoPriceLabel()}. Go to /promo to choose your type and enter the details we need to build it.`;
    }
    return "Our Starter plan begins at GH₵5,000, Professional at GH₵6,500, and Enterprise from GH₵8,000. Want a tailored estimate? Try /calculator or book a call.";
  }
  if (text.includes("book") || text.includes("consult") || text.includes("call")) {
    if (promoStatus === "active" || promoStatus === "upcoming") {
      return `To claim the August ${getPromoPriceLabel()} website promo, go to /promo, choose your website type, and enter the details. We’ll receive the brief on WhatsApp.`;
    }
    return "Perfect—head to /booking to choose a service, date, and time. You’ll get an instant confirmation.";
  }
  if (text.includes("seo") || text.includes("speed") || text.includes("redesign")) {
    return "We specialize in redesigns, SEO foundations, and speed optimization as part of every build. Share your current site and goals for a sharper recommendation.";
  }
  return "Great question. Earlsdwara Digital designs and develops premium websites that convert. Tell me your industry and timeline, and I’ll guide the next step.";
}

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(starter);
  const [input, setInput] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = input.trim();
    if (!value) return;
    const nextMessages: Message[] = [
      ...messages,
      { role: "user", text: value },
      { role: "assistant", text: replyTo(value) },
    ];
    setMessages(nextMessages);
    setInput("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-[60] flex items-center gap-2 rounded-2xl bg-gradient-to-r from-highlight to-accent px-4 py-3 text-sm font-semibold text-[#081525] shadow-lg shadow-accent/30 md:left-8"
        aria-label="Open AI assistant"
      >
        <span>AI Assistant</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className="glass custom-scrollbar fixed bottom-24 left-5 z-[65] flex h-[420px] w-[min(360px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl md:left-8"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <p className="text-sm font-semibold">Earlsdwara AI</p>
                <p className="text-xs text-subtext">Instant guidance · Live chat</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 text-subtext hover:text-text"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === "assistant"
                      ? "bg-white/5 text-subtext"
                      : "ml-auto bg-accent/30 text-text"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <form onSubmit={onSubmit} className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about pricing, process..."
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="rounded-xl bg-accent p-2.5 text-[#081525]"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
