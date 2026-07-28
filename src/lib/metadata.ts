import { siteConfig } from "@/lib/data";
import type { Metadata } from "next";

type PageShareOptions = {
  title: string;
  description: string;
  path: string;
};

export function createShareMetadata({ title, description, path }: PageShareOptions): Metadata {
  const url = `${siteConfig.url.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}
