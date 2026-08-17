import { siteConfig } from "@/lib/data";

export type SharePayload = {
  url: string;
  title: string;
  text: string;
};

export function getSiteSharePayload(pathname = ""): SharePayload {
  const base = siteConfig.url.replace(/\/$/, "");
  const path = pathname.startsWith("/") ? pathname : pathname ? `/${pathname}` : "";
  const url = `${base}${path}`;

  return {
    url,
    title: `${siteConfig.name} | Premium Websites That Grow Businesses`,
    text: `${siteConfig.tagline} — ${siteConfig.name}`,
  };
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildShareLinks({ url, title, text }: SharePayload) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(text);

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${text}\n\n${url}`)}`,
  };
}
