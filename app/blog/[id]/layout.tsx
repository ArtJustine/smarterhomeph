import type { Metadata } from "next"
import { pageMeta, SITE_NAME } from "@/lib/site"

const posts: Record<string, { title: string; description: string }> = {
  "1": {
    title: "10 Smart Home Devices Worth Installing",
    description: "Discover smart home devices that make a house more comfortable, efficient and secure, from automation hubs to lighting and climate control.",
  },
  "2": {
    title: "Smart Home Security on a Budget",
    description: "How to build an effective smart home security system with affordable cameras, locks and sensors, without overspending.",
  },
  "3": {
    title: "Voice Assistants in Smart Homes",
    description: "How voice assistants like Alexa and Google Assistant are changing home automation and what to expect next.",
  },
  "4": {
    title: "Energy Saving Tips with Smart Home Automation",
    description: "How smart thermostats, lighting and appliances can help reduce energy use at home.",
  },
  "5": {
    title: "Integrating Smart Home Systems: A Guide",
    description: "How to make devices from different brands and ecosystems work together for a smoother smart home.",
  },
  "6": {
    title: "Smart Home Tech for Aging in Place",
    description: "How smart technology can help seniors live independently and safely at home for longer.",
  },
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const post = posts[id]
  if (!post) return { title: "Post not found", robots: { index: false } }
  return { ...pageMeta(`/blog/${id}`, post.title, post.description), title: { absolute: `${post.title} | ${SITE_NAME}` } }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
