import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"
import { JsonLd } from "@/components/json-ld"
import { breadcrumb, graph, webPage } from "@/lib/schema"

export const metadata: Metadata = pageMeta(
  "/privacy-policy",
  "Privacy Policy",
  "How Smarter Home PH collects, uses and protects the information you share with us.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ type: "WebPage", path: "/privacy-policy", name: "Privacy Policy", description: "How Smarter Home PH collects, uses and protects the information you share with us." }),
          breadcrumb([{ name: "Privacy policy", path: "/privacy-policy" }]),
        )}
      />
      {children}
    </>
  )
}
