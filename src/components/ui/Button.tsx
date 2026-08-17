"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { scrollToHash } from "@/lib/links";
import type { MouseEvent, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const pathname = usePathname();
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-display text-base font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary",
    variant === "primary" &&
      "glow-btn bg-gradient-to-r from-highlight via-accent to-[#8b7355] text-[#081525]",
    variant === "secondary" &&
      "glass glow-btn text-text hover:border-highlight/50",
    variant === "ghost" && "text-subtext hover:text-text",
    className,
  );

  if (href) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.();
      if (pathname === "/" && (href.startsWith("#") || href.startsWith("/#")) && scrollToHash(href)) {
        event.preventDefault();
      }
    };

    return (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
