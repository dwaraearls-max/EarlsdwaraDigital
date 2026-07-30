"use client";

import { Button } from "@/components/ui/Button";
import { useTheme } from "@/components/layout/ThemeProvider";
import { navLinks, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const overCinema = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "safe-top fixed inset-x-0 top-0 z-[70] transition-all duration-500",
        scrolled ? "py-2 md:py-3" : "py-3 md:py-5",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-[min(1200px,92%)] items-center justify-between gap-2 rounded-2xl px-3 py-2.5 transition-all duration-500 sm:gap-3 sm:px-4 sm:py-3 md:px-6",
          scrolled ? "glass shadow-lg shadow-black/5" : "bg-transparent",
        )}
      >
        <Link
          href="/"
          className="group flex min-w-0 flex-1 items-center gap-2 sm:gap-3 sm:flex-none"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-highlight to-accent font-display text-sm font-bold text-[#081525] shadow-lg shadow-accent/30">
            ED
          </span>
          <span
            className={cn(
              "truncate font-display text-base font-semibold tracking-tight transition group-hover:opacity-90 sm:text-xl md:text-2xl",
              overCinema ? "text-white" : "text-text",
            )}
          >
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition",
                overCinema ? "text-white/75 hover:text-white" : "text-subtext hover:text-text",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className={cn(
              "touch-target rounded-xl transition",
              overCinema
                ? "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "glass text-subtext hover:text-text",
            )}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Button href="/booking" className="!py-2.5 !text-xs">
            Book Consultation
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "touch-target shrink-0 rounded-xl lg:hidden",
            overCinema
              ? "border border-white/20 bg-white/10 text-white"
              : "glass text-text",
          )}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[-1] bg-bg-primary/40 backdrop-blur-[2px] lg:hidden"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="glass custom-scrollbar mx-auto mt-2 max-h-[calc(100dvh-5.5rem)] w-[min(1200px,92%)] overflow-y-auto overscroll-contain rounded-3xl p-5 sm:p-6 lg:hidden"
            >
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="touch-target rounded-xl px-3 py-2.5 text-base text-text sm:text-lg"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="glass touch-target rounded-xl text-subtext"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <Button href="/booking" className="min-h-11 flex-1" onClick={() => setOpen(false)}>
                  Book Consultation
                </Button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
