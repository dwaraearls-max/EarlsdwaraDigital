import { siteConfig } from "@/lib/data";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Earlsdwara",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    lang: "en",
    categories: ["business", "design"],
  };
}
