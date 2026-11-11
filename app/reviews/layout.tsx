import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"
import { JsonLd } from "@/components/json-ld"
import { breadcrumb, graph, webPage } from "@/lib/schema"

export const metadata: Metadata = pageMeta(
  "/reviews",
  "Customer Reviews",
  "Read what homeowners say about their smart home setups, from smart lights and locks to cameras and aircon control.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ type: "WebPage", path: "/reviews", name: "Customer Reviews", description: "Read what homeowners say about their smart home setups, from smart lights and locks to cameras and aircon control." }),
          breadcrumb([{ name: "Reviews", path: "/reviews" }]),
        )}
      />
      {children}
    </>
  )
}
