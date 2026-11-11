import { SITE_NAME, SITE_URL } from "@/lib/site"

export const BUSINESS_ID = `${SITE_URL}/#business`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes }
}

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  }
}

export function webPage(opts: { type?: string; path: string; name: string; description: string }) {
  return {
    "@type": opts.type ?? "WebPage",
    "@id": `${abs(opts.path)}#webpage`,
    url: abs(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: "en-PH",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
  }
}

export { SITE_NAME }
