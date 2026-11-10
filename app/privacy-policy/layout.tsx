import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"

export const metadata: Metadata = pageMeta(
  "/privacy-policy",
  "Privacy Policy",
  "How Smarter Home PH collects, uses and protects the information you share with us.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
