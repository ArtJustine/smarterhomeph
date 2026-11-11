import type { Metadata } from "next"
import { pageMeta, SITE_NAME } from "@/lib/site"
import { JsonLd } from "@/components/json-ld"
import { BUSINESS_ID, abs, breadcrumb, graph, webPage } from "@/lib/schema"

const posts: Record<string, { title: string; description: string; published: string }> = {
  "1": {
    title: "10 Smart Home Devices Worth Installing",
    description: "Discover smart home devices that make a house more comfortable, efficient and secure, from automation hubs to lighting and climate control.",
    published: "2025-03-20",
  },
  "2": {
    title: "Smart Home Security on a Budget",
    description: "How to build an effective smart home security system with affordable cameras, locks and sensors, without overspending.",
    published: "2025-03-15",
  },
  "3": {
    title: "Voice Assistants in Smart Homes",
    description: "How voice assistants like Alexa and Google Assistant are changing home automation and what to expect next.",
    published: "2025-03-10",
  },
  "4": {
    title: "Energy Saving Tips with Smart Home Automation",
    description: "How smart thermostats, lighting and appliances can help reduce energy use at home.",
    published: "2025-03-05",
  },
  "5": {
    title: "Integrating Smart Home Systems: A Guide",
    description: "How to make devices from different brands and ecosystems work together for a smoother smart home.",
    published: "2025-02-28",
  },
  "6": {
    title: "Smart Home Setup for Aging in Place",
    description: "Seven practical smart home upgrades for an aging parent's home, plus privacy, brownout and wifi tips for Filipino families.",
    published: "2025-02-23",
  },
  "7": {
    title: "How to Start a Smart Home in the Philippines",
    description: "What a smart home is, what to buy first, what it costs to begin, and the Philippine details to check: voltage, 2.4GHz wifi, brownouts and installers.",
    published: "2026-11-11",
  },
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const post = posts[id]
  if (!post) return { title: "Post not found", robots: { index: false } }
  return { ...pageMeta(`/blog/${id}`, post.title, post.description), title: { absolute: `${post.title} | ${SITE_NAME}` } }
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = posts[id]
  const path = `/blog/${id}`

  return (
    <>
      {post && (
        <JsonLd
          data={graph(
            webPage({ path, name: post.title, description: post.description }),
            {
              "@type": "BlogPosting",
              "@id": `${abs(path)}#post`,
              headline: post.title,
              description: post.description,
              datePublished: post.published,
              inLanguage: "en-PH",
              mainEntityOfPage: { "@id": `${abs(path)}#webpage` },
              author: { "@id": BUSINESS_ID },
              publisher: { "@id": BUSINESS_ID },
            },
            breadcrumb([
              { name: "Blog", path: "/blog" },
              { name: post.title, path },
            ]),
          )}
        />
      )}
      {children}
    </>
  )
}
