import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"
import { JsonLd } from "@/components/json-ld"
import { abs, breadcrumb, graph, webPage, BUSINESS_ID } from "@/lib/schema"

export const metadata: Metadata = pageMeta(
  "/builder",
  "Smart Home Cost Estimator and Setup Planner",
  "Pick your property type, add rooms and devices, and see a running estimate for your smart home before you talk to anyone. Free to use.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ type: "WebPage", path: "/builder", name: "Smart Home Cost Estimator and Setup Planner", description: "Pick your property type, add rooms and devices, and see a running estimate for your smart home before you talk to anyone. Free to use." }),
          breadcrumb([{ name: "Home builder", path: "/builder" }]),
      {
        "@type": "WebApplication",
        "@id": `${abs("/builder")}#app`,
        name: "Smarter Home PH home builder",
        url: abs("/builder"),
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        description: "Pick a property type, add rooms and devices and see a running smart home estimate.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "PHP" },
        provider: { "@id": BUSINESS_ID },
      },
        )}
      />
      {children}
    </>
  )
}
