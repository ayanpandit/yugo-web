import type { MetadataRoute } from "next";
import { siteMeta } from "./lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMeta.name,
    short_name: siteMeta.name,
    description: siteMeta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0d2b2b",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
