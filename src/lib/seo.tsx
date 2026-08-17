import { siteConfig } from "@/lib/data";

type ArticleJsonLdInput = {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  category: string;
};

type ServiceJsonLdInput = {
  title: string;
  description: string;
  path: string;
};

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url.replace(/\/$/, "")}${siteConfig.logo}`,
    image: `${siteConfig.url.replace(/\/$/, "")}/opengraph-image`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    slogan: siteConfig.tagline,
    areaServed: "Worldwide",
    serviceType: [
      "Website Design",
      "Web Development",
      "E-Commerce",
      "SEO",
      "Website Redesign",
    ],
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
      siteConfig.social.tiktok,
      siteConfig.social.x,
    ],
  };
}

export function createArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  category,
}: ArticleJsonLdInput) {
  const url = `${siteConfig.url.replace(/\/$/, "")}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url.replace(/\/$/, "")}${siteConfig.logo}`,
      },
    },
    mainEntityOfPage: url,
    articleSection: category,
    url,
  };
}

export function createServiceJsonLd({ title, description, path }: ServiceJsonLdInput) {
  const url = `${siteConfig.url.replace(/\/$/, "")}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: "Worldwide",
    url,
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
