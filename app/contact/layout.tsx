import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"

export const metadata: Metadata = pageMeta(
  "/contact",
  "Get a Smart Home Quote in Pampanga, Tarlac or Bulacan",
  "Tell us about your house and what annoys you most. We will plan the setup and send a quote before anything is bought.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
