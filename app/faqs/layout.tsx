import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"
import { JsonLd } from "@/components/json-ld"
import { breadcrumb, graph, webPage } from "@/lib/schema"

export const metadata: Metadata = pageMeta(
  "/faqs",
  "Smart Home FAQs for Philippine Homes",
  "Answers on smart home cost, wiring, brownouts and internet outages, Alexa and Google Home, aircon control and installing in Pampanga, Tarlac and Bulacan.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ type: "WebPage", path: "/faqs", name: "Smart Home FAQs for Philippine Homes", description: "Answers on smart home cost, wiring, brownouts and internet outages, Alexa and Google Home, aircon control and installing in Pampanga, Tarlac and Bulacan." }),
          breadcrumb([{ name: "FAQs", path: "/faqs" }]),
        )}
      />
      {children}
    </>
  )
}
