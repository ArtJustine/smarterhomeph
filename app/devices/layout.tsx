import type { Metadata } from "next"
import { pageMeta } from "@/lib/site"
import { JsonLd } from "@/components/json-ld"
import { abs, breadcrumb, graph, webPage } from "@/lib/schema"
import { sampleDevices } from "@/lib/devices-data"

export const metadata: Metadata = pageMeta(
  "/devices",
  "Smart Home Devices: Locks, Cameras, Lights, Sensors",
  "Browse smart locks, security cameras, bulbs, plugs and sensors that work with Alexa, Google Home, HomeKit and Matter. We supply and install them in Central Luzon.",
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          webPage({ type: "CollectionPage", path: "/devices", name: "Smart Home Devices: Locks, Cameras, Lights, Sensors", description: "Browse smart locks, security cameras, bulbs, plugs and sensors that work with Alexa, Google Home, HomeKit and Matter. We supply and install them in Central Luzon." }),
          breadcrumb([{ name: "Devices", path: "/devices" }]),
          {
            "@type": "ItemList",
            name: "Smart home devices we install",
            itemListElement: sampleDevices.map((d, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Product",
                name: d.name,
                description: d.description,
                category: d.category,
                brand: { "@type": "Brand", name: d.brand },
                url: abs("/devices"),
              },
            })),
          },
        )}
      />
      {children}
    </>
  )
}
