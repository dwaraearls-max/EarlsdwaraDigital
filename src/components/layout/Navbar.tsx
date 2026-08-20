"use client";

import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { useWebsitePromo } from "@/hooks/useWebsitePromo";
import { navLinks } from "@/lib/data";
import { homeHashHref, scrollToHash } from "@/lib/links";
import { getPromoEntryHref, getPromoPriceLabel } from "@/lib/promo";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { visible: promoVisible } = useWebsitePromo();
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
        "safe-top fixed inset-x-0 z-[70] transition-all duration-500",
        scrolled ? "py-2 md:py-3" : "py-3 md:py-5",
      )}
      style={{ top: "var(--promo-banner-height, 0px)" }}
    >
      <div
        className={cn(
          "mx-auto flex w-[min(1200px,92%)] items-center justify-between gap-2 rounded-2xl px-3 py-2.5 transition-all duration-500 sm:gap-3 sm:px-4 sm:py-3 md:px-6",
          scrolled ? "glass shadow-lg shadow-black/5" : "bg-transparent",
        )}
      >
        <Logo
          priority
          className="min-w-0 flex-1 sm:flex-none"
          onClick={() => setOpen(false)}
        />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={homeHashHref(link.href, pathname)}
              onClick={(event) => {
                if (pathname === "/" && link.href.startsWith("#") && scrollToHash(link.href)) {
                  event.preventDefault();
                }
              }}
              className={cn(
                "text-sm transition",
                overCinema ? "text-white/75 hover:text-white" : "text-subtext hover:text-text",
              )}
            >
              {link.label}
            </Link>
          ))}
          {promoVisible ? (
            <Link
              href={getPromoEntryHref(pathname)}
              onClick={(event) => {
                if (pathname === "/" && scrollToHash("#promo")) {
                  event.preventDefault();
                }
              }}
              className={cn(
                "text-sm font-semibold transition",
                overCinema ? "text-[#e0c08a] hover:text-white" : "text-accent hover:text-highlight",
              )}
            >
              Promo
            </Link>
          ) : null}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href={promoVisible ? getPromoEntryHref(pathname) : "/booking"} className="!py-2.5 !text-xs">
            {promoVisible ? `Get ${getPromoPriceLabel()} Site` : "Book Consultation"}
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
                    href={homeHashHref(link.href, pathname)}
                    onClick={(event) => {
                      setOpen(false);
                      if (pathname === "/" && link.href.startsWith("#") && scrollToHash(link.href)) {
                        event.preventDefault();
                      }
                    }}
                    className="touch-target rounded-xl px-3 py-2.5 text-base text-text sm:text-lg"
                  >
                    {link.label}
                  </Link>
                ))}
                {promoVisible ? (
                  <Link
                    href={getPromoEntryHref(pathname)}
                    onClick={(event) => {
                      setOpen(false);
                      if (pathname === "/" && scrollToHash("#promo")) {
                        event.preventDefault();
                      }
                    }}
                    className="touch-target rounded-xl px-3 py-2.5 text-base font-semibold text-accent sm:text-lg"
                  >
                    August Promo
                  </Link>
                ) : null}
              </nav>
              <div className="mt-5 border-t border-border pt-5">
                <Button
                  href={promoVisible ? getPromoEntryHref(pathname) : "/booking"}
                  className="min-h-11 w-full"
                  onClick={() => setOpen(false)}
                >
                  {promoVisible ? `Get ${getPromoPriceLabel()} Site` : "Book Consultation"}
                </Button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
