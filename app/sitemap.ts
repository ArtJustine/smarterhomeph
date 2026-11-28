import type { MetadataRoute } from "next"
import { blogPath, blogSeo } from "@/lib/blog-seo"
import { SITE_URL } from "@/lib/site"
import { serviceTopics } from "@/lib/service-topics"
import { cityPages } from "@/lib/cities"
import { provincePages } from "@/lib/provinces"

const routes: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/services", priority: 0.9 },
  ...["lighting", "security", "climate", "automation", "media-control", "appliances"].map((s) => ({ path: `/services/${s}`, priority: 0.8 })),
  ...serviceTopics.map((t) => ({ path: `/services/${t.service}/${t.slug}`, priority: 0.6 })),
  ...provincePages.map((p) => ({ path: `/areas/${p.slug}`, priority: 0.8 })),
  ...cityPages.map((c) => ({ path: `/smart-home-installation/${c.slug}`, priority: 0.8 })),
  { path: "/for-builders", priority: 0.7 },
  { path: "/alexa", priority: 0.9 },
  { path: "/apple-home", priority: 0.9 },
  { path: "/google-home", priority: 0.9 },
  { path: "/contact", priority: 0.8 },
  { path: "/about", priority: 0.6 },
  { path: "/faqs", priority: 0.7 },
  { path: "/blog", priority: 0.7 },
  ...Object.keys(blogSeo).map((id) => ({ path: blogPath(Number(id)), priority: Number(id) >= 7 ? 0.6 : 0.5 })),
  { path: "/privacy-policy", priority: 0.2 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map((r) => ({ url: `${SITE_URL}${r.path}`, lastModified, priority: r.priority }))
}
