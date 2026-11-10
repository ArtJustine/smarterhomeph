import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"

export const metadata: Metadata = pageMeta(
  "/services",
  "Smart Home Installation Services in Central Luzon",
  "Smart lighting, door locks, CCTV cameras, aircon control and automation planned, supplied and installed for homes in Pampanga, Tarlac and Bulacan.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
