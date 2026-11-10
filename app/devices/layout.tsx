import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"

export const metadata: Metadata = pageMeta(
  "/devices",
  "Smart Home Devices: Locks, Cameras, Lights, Sensors",
  "Browse smart locks, security cameras, bulbs, plugs and sensors that work with Alexa, Google Home, HomeKit and Matter. We supply and install them in Central Luzon.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
