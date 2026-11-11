import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"

export const metadata: Metadata = pageMeta(
  "/google-home",
  "Google Home Setup in Pampanga, Tarlac & Bulacan",
  "Google Home and Nest setup for Android and iPhone households in Pampanga, Tarlac and Bulacan. Routines, Matter devices, cameras and aircon control.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
