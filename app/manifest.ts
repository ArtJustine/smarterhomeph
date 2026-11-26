import type { MetadataRoute } from "next"
import { SITE_NAME } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Smarter Home Philippines",
    short_name: SITE_NAME,
    description: "Smart home planning, supply and installation in Pampanga, Tarlac and Bulacan.",
    start_url: "/",
    display: "standalone",
    background_color: "#fdfdfd",
    theme_color: "#29ad81",
    lang: "en-PH",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  }
}
