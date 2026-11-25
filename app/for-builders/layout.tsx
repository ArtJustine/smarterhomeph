import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"
import { JsonLd } from "@/components/json-ld"
import { breadcrumb, graph, webPage } from "@/lib/schema"

const title = "Smart Home Pre-Wiring for Builders and Contractors in Central Luzon"
const description =
  "Plan smart home wiring, network points and device locations before the walls close. Smarter Home PH works with builders and contractors in Pampanga, Tarlac and Bulacan."

export const metadata: Metadata = pageMeta("/for-builders", title, description)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ type: "WebPage", path: "/for-builders", name: title, description }),
          breadcrumb([{ name: "For builders", path: "/for-builders" }]),
        )}
      />
      {children}
    </>
  )
}
