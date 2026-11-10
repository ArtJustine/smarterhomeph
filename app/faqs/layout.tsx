import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"

export const metadata: Metadata = pageMeta(
  "/faqs",
  "Smart Home FAQs for Philippine Homes",
  "Answers on smart home cost, wiring, brownouts and internet outages, Alexa and Google Home, aircon control and installing in Pampanga, Tarlac and Bulacan.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
