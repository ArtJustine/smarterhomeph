import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"
import { JsonLd } from "@/components/json-ld"
import { breadcrumb, graph, webPage } from "@/lib/schema"

export const metadata: Metadata = pageMeta(
  "/contact",
  "Get a Smart Home Quote in Pampanga, Tarlac or Bulacan",
  "Tell us about your house and what annoys you most. We will plan the setup and send a quote before anything is bought.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ type: "ContactPage", path: "/contact", name: "Get a Smart Home Quote in Pampanga, Tarlac or Bulacan", description: "Tell us about your house and what annoys you most. We will plan the setup and send a quote before anything is bought." }),
          breadcrumb([{ name: "Contact", path: "/contact" }]),
        )}
      />
      {children}
    </>
  )
}
