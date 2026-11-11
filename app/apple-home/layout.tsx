import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"

export const metadata: Metadata = pageMeta(
  "/apple-home",
  "Apple Home & HomeKit Setup in Pampanga, Tarlac, Bulacan",
  "Apple Home and HomeKit setup for iPhone households in Pampanga, Tarlac and Bulacan. Home hub, scenes, automations and Matter devices, set up properly.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
