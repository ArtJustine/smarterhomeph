import type { Metadata } from "next"

/** Change this to the real domain once one is connected in Vercel. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://smarterhomeph.vercel.app"
export const SITE_NAME = "Smarter Home PH"

export const SERVICE_AREAS = ["Pampanga", "Tarlac", "Bulacan"]

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
    twitter: { card: "summary", title: `${title} | ${SITE_NAME}`, description },
  }
}
