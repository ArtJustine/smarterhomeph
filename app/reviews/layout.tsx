import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"

export const metadata: Metadata = pageMeta(
  "/reviews",
  "Customer Reviews",
  "Read what homeowners say about their smart home setups, from smart lights and locks to cameras and aircon control.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
