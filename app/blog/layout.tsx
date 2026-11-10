import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"

export const metadata: Metadata = pageMeta(
  "/blog",
  "Smart Home Guides and Tips",
  "Practical guides on smart lighting, security, climate control and getting devices from different brands to work together.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
