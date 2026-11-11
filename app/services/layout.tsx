import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"
import { JsonLd } from "@/components/json-ld"
import { breadcrumb, graph, webPage } from "@/lib/schema"

export const metadata: Metadata = pageMeta(
  "/services",
  "Smart Home Installation Services in Central Luzon",
  "Smart lighting, door locks, CCTV cameras, aircon control and automation planned, supplied and installed for homes in Pampanga, Tarlac and Bulacan.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ type: "WebPage", path: "/services", name: "Smart Home Installation Services in Central Luzon", description: "Smart lighting, door locks, CCTV cameras, aircon control and automation planned, supplied and installed for homes in Pampanga, Tarlac and Bulacan." }),
          breadcrumb([{ name: "Services", path: "/services" }]),
        )}
      />
      {children}
    </>
  )
}
