import { SiteShell } from "@/components/layout/SiteShell";
import { siteConfig } from "@/lib/data";
import { createOrganizationJsonLd, JsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import { Cormorant_Garamond, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const libre = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Earlsdwara Digital | Premium Websites That Grow Businesses",
    template: "%s | Earlsdwara Digital",
  },
  description: siteConfig.description,
  keywords: [
    "Earlsdwara Digital",
    "website design",
    "web development",
    "ecommerce websites",
    "landing pages",
    "SEO development",
    "website redesign",
    "UI UX design",
  ],
  authors: [{ name: "Earlsdwara Digital" }],
  icons: {
    icon: [{ url: siteConfig.logo, type: "image/png" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Earlsdwara Digital | Premium Websites That Grow Businesses",
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} logo — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Earlsdwara Digital | Premium Websites That Grow Businesses",
    description: siteConfig.description,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  category: "technology",
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = createOrganizationJsonLd();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${cormorant.variable} ${libre.variable} h-full`}
    >
      <body suppressHydrationWarning className="flex min-h-full flex-col antialiased">
        <JsonLd data={jsonLd} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
