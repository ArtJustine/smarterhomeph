import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"

export const metadata: Metadata = pageMeta(
  "/alexa",
  "Alexa Smart Home Setup in Pampanga, Tarlac & Bulacan",
  "We install and set up Alexa with smart lights, door locks, cameras and aircon control for homes in Pampanga, Tarlac and Bulacan. Routines, Echo placement and Matter included.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
