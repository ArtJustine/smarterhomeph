import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"
import { JsonLd } from "@/components/json-ld"
import { breadcrumb, graph, webPage } from "@/lib/schema"

export const metadata: Metadata = pageMeta(
  "/apple-home",
  "Apple Home & HomeKit Setup in Pampanga, Tarlac, Bulacan",
  "Apple Home and HomeKit setup for iPhone households in Pampanga, Tarlac and Bulacan. Home hub, scenes, automations and Matter devices, set up properly.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ type: "WebPage", path: "/apple-home", name: "Apple Home & HomeKit Setup in Pampanga, Tarlac, Bulacan", description: "Apple Home and HomeKit setup for iPhone households in Pampanga, Tarlac and Bulacan. Home hub, scenes, automations and Matter devices, set up properly." }),
          breadcrumb([{ name: "Apple Home", path: "/apple-home" }]),
        )}
      />
      {children}
    </>
  )
}
