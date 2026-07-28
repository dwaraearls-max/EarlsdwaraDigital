"use client";

import { SocialProfileLinks } from "@/components/ui/SocialProfileLinks";
import { cn } from "@/lib/utils";
import { Share2 } from "lucide-react";

type SocialShareProps = {
  className?: string;
  label?: string;
  compact?: boolean;
};

export function SocialShare({
  className,
  label = "Connect with us",
  compact = false,
}: SocialShareProps) {
  return (
    <div className={cn("glass rounded-3xl p-5 md:p-6", className)}>
      <div className={cn("flex items-center gap-2", compact ? "mb-3" : "mb-4")}>
        <Share2 size={18} className="text-accent" />
        <p
          className={cn(
            "font-display font-semibold text-text",
            compact ? "text-base" : "text-lg",
          )}
        >
          {label}
        </p>
      </div>

      <SocialProfileLinks
        variant="field"
        className={cn(compact && "gap-2")}
        iconClassName={cn(compact && "p-2")}
      />
    </div>
  );
}
