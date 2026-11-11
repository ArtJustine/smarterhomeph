import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"
import { JsonLd } from "@/components/json-ld"
import { breadcrumb, graph, webPage } from "@/lib/schema"

export const metadata: Metadata = pageMeta(
  "/alexa",
  "Alexa Smart Home Setup in Pampanga, Tarlac & Bulacan",
  "We install and set up Alexa with smart lights, door locks, cameras and aircon control for homes in Pampanga, Tarlac and Bulacan. Routines, Echo placement and Matter included.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ type: "WebPage", path: "/alexa", name: "Alexa Smart Home Setup in Pampanga, Tarlac & Bulacan", description: "We install and set up Alexa with smart lights, door locks, cameras and aircon control for homes in Pampanga, Tarlac and Bulacan. Routines, Echo placement and Matter included." }),
          breadcrumb([{ name: "Alexa", path: "/alexa" }]),
        )}
      />
      {children}
    </>
  )
}
