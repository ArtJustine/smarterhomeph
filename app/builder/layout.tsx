import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"

export const metadata: Metadata = pageMeta(
  "/builder",
  "Smart Home Cost Estimator and Setup Planner",
  "Pick your property type, add rooms and devices, and see a running estimate for your smart home before you talk to anyone. Free to use.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
