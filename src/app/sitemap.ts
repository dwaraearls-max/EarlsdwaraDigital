import { blogPosts, portfolio, services, siteConfig } from "@/lib/data";
import type { MetadataRoute } from "next";

const baseUrl = siteConfig.url.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/promo`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/calculator`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap = portfolio.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...portfolioRoutes, ...blogRoutes];
}
