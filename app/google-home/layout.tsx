import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"
import { JsonLd } from "@/components/json-ld"
import { breadcrumb, graph, webPage } from "@/lib/schema"

export const metadata: Metadata = pageMeta(
  "/google-home",
  "Google Home Setup in Pampanga, Tarlac & Bulacan",
  "Google Home and Nest setup for Android and iPhone households in Pampanga, Tarlac and Bulacan. Routines, Matter devices, cameras and aircon control.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ type: "WebPage", path: "/google-home", name: "Google Home Setup in Pampanga, Tarlac & Bulacan", description: "Google Home and Nest setup for Android and iPhone households in Pampanga, Tarlac and Bulacan. Routines, Matter devices, cameras and aircon control." }),
          breadcrumb([{ name: "Google Home", path: "/google-home" }]),
        )}
      />
      {children}
    </>
  )
}
