import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

const profiles = [
  { label: "Instagram", href: siteConfig.social.instagram, icon: "instagram" as const },
  { label: "TikTok", href: siteConfig.social.tiktok, icon: "tiktok" as const },
  { label: "WhatsApp", href: siteConfig.social.whatsapp, icon: "whatsapp" as const },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("h-4 w-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("h-4 w-4", className)} fill="currentColor">
      <path d="M16.5 3h2.2c.2 1.6 1.1 3.1 2.5 4v3.4c-1.8 0-3.5-.6-4.9-1.6v6.8c0 3.4-2.8 6.2-6.2 6.2S4 19 4 15.6s2.8-6.2 6.2-6.2c.3 0 .7 0 1 .1v3.5c-.3-.1-.6-.1-.9-.1-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7V3z" />
    </svg>
  );
}

export function SocialProfileLinks({
  className,
  iconClassName,
  variant = "glass",
}: {
  className?: string;
  iconClassName?: string;
  variant?: "glass" | "field";
}) {
  const iconSurface =
    variant === "field"
      ? "surface-field text-subtext transition hover:border-accent/40 hover:text-text"
      : "glass text-subtext transition hover:text-text";

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {profiles.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={cn(
            "touch-target rounded-xl p-2.5",
            iconSurface,
            iconClassName,
          )}
        >
          {icon === "instagram" ? <InstagramIcon /> : null}
          {icon === "tiktok" ? <TikTokIcon /> : null}
          {icon === "whatsapp" ? <MessageCircle size={16} /> : null}
        </a>
      ))}
    </div>
  );
}
