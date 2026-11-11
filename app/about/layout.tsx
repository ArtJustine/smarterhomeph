import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"
import { JsonLd } from "@/components/json-ld"
import { breadcrumb, graph, webPage } from "@/lib/schema"

export const metadata: Metadata = pageMeta(
  "/about",
  "About Smarter Home PH",
  "We plan, install and support smart home setups that stay simple, using devices that work together with Alexa, Google Home, HomeKit, Matter and Home Assistant.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ type: "AboutPage", path: "/about", name: "About Smarter Home PH", description: "We plan, install and support smart home setups that stay simple, using devices that work together with Alexa, Google Home, HomeKit, Matter and Home Assistant." }),
          breadcrumb([{ name: "About", path: "/about" }]),
        )}
      />
      {children}
    </>
  )
}
