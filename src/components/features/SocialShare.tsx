"use client";

import { SocialProfileLinks } from "@/components/ui/SocialProfileLinks";
import { siteConfig } from "@/lib/data";
import { buildShareLinks, getSiteSharePayload } from "@/lib/share";
import { cn } from "@/lib/utils";
import { Check, Link2, Share2 } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const payload = getSiteSharePayload(pathname);
  const shareLinks = buildShareLinks(payload);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(payload.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", payload.url);
    }
  };

  const handleShare = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: payload.title,
          text: payload.text,
          url: payload.url,
        });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
      }
    }

    await copyLink();
  };

  const iconSurface = "surface-field text-subtext transition hover:border-accent/40 hover:text-text";

  return (
    <div className={cn("glass rounded-3xl p-5 md:p-6", className)}>
      <div
        className={cn(
          "flex flex-wrap items-center justify-between gap-3",
          compact ? "mb-3" : "mb-4",
        )}
      >
        <div className="flex items-center gap-3">
          <Image
            src={siteConfig.logo}
            alt=""
            width={120}
            height={82}
            className="h-10 w-auto max-w-[120px] object-contain"
            aria-hidden
          />
          <p
            className={cn(
              "font-display font-semibold text-text",
              compact ? "text-base" : "text-lg",
            )}
          >
            {label}
          </p>
        </div>

        <button
          type="button"
          onClick={() => void handleShare()}
          className={cn(
            "touch-target inline-flex items-center gap-2 rounded-xl px-3 text-sm font-medium",
            iconSurface,
          )}
          aria-label={copied ? "Link copied" : "Share this page"}
        >
          {copied ? <Check size={16} /> : <Share2 size={16} />}
          {copied ? "Copied!" : "Share"}
        </button>
      </div>

      {compact ? null : (
        <div className="mb-4 flex flex-wrap gap-2">
          {(
            [
              ["Facebook", shareLinks.facebook],
              ["X", shareLinks.x],
              ["LinkedIn", shareLinks.linkedin],
              ["WhatsApp", shareLinks.whatsapp],
            ] as const
          ).map(([name, href]) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "touch-target rounded-xl px-3 text-xs font-medium uppercase tracking-wide",
                iconSurface,
              )}
            >
              {name}
            </a>
          ))}
          <button
            type="button"
            onClick={() => void copyLink()}
            className={cn(
              "touch-target inline-flex items-center gap-1.5 rounded-xl px-3 text-xs font-medium uppercase tracking-wide",
              iconSurface,
            )}
            aria-label="Copy link"
          >
            {copied ? <Check size={14} /> : <Link2 size={14} />}
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      )}

      <SocialProfileLinks
        variant="field"
        className={cn(compact && "gap-2")}
        iconClassName={cn("p-2.5", compact && "p-2")}
      />
    </div>
  );
}
