import { siteConfig } from "@/lib/data";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Earlsdwara",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    theme_color: "#081525",
    background_color: "#081525",
    lang: "en",
    categories: ["business", "design"],
    icons: [
      {
        src: siteConfig.logo,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
