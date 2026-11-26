import type { Metadata } from "next"

/** Canonical production domain. Hardcoded so a stray env var can never point SEO back at vercel.app. */
export const SITE_URL = "https://smarterhomephilippines.com"
export const SITE_HOST = "smarterhomephilippines.com"
export const SITE_NAME = "Smarter Home PH"

export const SERVICE_AREAS = ["Pampanga", "Tarlac", "Bulacan"]

/** Towns we name in local copy and structured data. Confirm these match where you actually install. */
export const SERVICE_CITIES = [
  { province: "Pampanga", cities: ["Angeles City", "Mabalacat", "San Fernando"] },
  { province: "Tarlac", cities: ["Tarlac City"] },
  { province: "Bulacan", cities: ["Malolos", "Meycauayan"] },
]

/** Builds per-page metadata with a canonical URL and matching social tags. */
export function pageMeta(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_PH",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE_NAME}`, description },
  }
}
