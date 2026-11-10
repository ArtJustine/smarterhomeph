import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"

export const metadata: Metadata = pageMeta(
  "/about",
  "About Smarter Home PH",
  "We plan, install and support smart home setups that stay simple, using devices that work together with Alexa, Google Home, HomeKit, Matter and Home Assistant.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
