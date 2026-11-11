import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"
import { JsonLd } from "@/components/json-ld"
import { breadcrumb, graph, webPage } from "@/lib/schema"

// Reviews are hidden for now: no nav link, not in the sitemap, and noindex until real reviews exist.
export const metadata: Metadata = {
  ...pageMeta(
    "/reviews",
    "Customer Reviews",
    "Read what homeowners say about their smart home setups, from smart lights and locks to cameras and aircon control.",
  ),
  robots: { index: false, follow: false },
}

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
