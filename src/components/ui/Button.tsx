"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { MouseEvent, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
  disabled?: boolean;
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
  ariaLabel,
  disabled,
}: ButtonProps) {
  const pathname = usePathname();
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-display text-base font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary active:scale-[0.98]",
    variant === "primary" &&
      "glow-btn bg-gradient-to-r from-highlight via-accent to-[#8b7355] text-[#081525]",
    variant === "secondary" &&
      "glass glow-btn text-text hover:border-highlight/50",
    variant === "ghost" && "text-subtext hover:text-text",
    disabled && "pointer-events-none opacity-60",
    className,
  );

  if (href) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.();

      const hashMatch = href.match(/#([^#]+)$/);
      if (!hashMatch) return;

      const hash = hashMatch[1];
      const pathPart = href.split("#")[0];
      const onTargetPage = pathPart === "" || pathPart === pathname;

      if (!onTargetPage) return;

      const target = document.getElementById(hash);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${hash}`);
    };

    return (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
