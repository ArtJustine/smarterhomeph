import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { BUSINESS_ID, abs, graph } from "@/lib/schema"

const categories = [
  {
    id: "lighting",
    title: "Lighting",
    description: "Scenes that fit the time of day, and bulbs that still work with the wall switch.",
    features: ["Schedules and scenes", "Voice control", "Energy saving"],
    href: "/builder",
  },
  {
    id: "security",
    title: "Security",
    description: "Cameras and locks with alerts on your phone. Local recording where the device supports it.",
    features: ["Local video storage", "Smart locks", "Motion alerts"],
    href: "/builder",
  },
  {
    id: "climate",
    title: "Climate",
    description: "Aircon control and room sensors so the space is comfortable when you arrive.",
    features: ["Aircon scheduling", "Temperature sensors", "Air quality"],
    href: "/builder",
  },
  {
    id: "automation",
    title: "Automation",
    description: "Routines that keep working even when the internet drops, built on a local hub.",
    features: ["Works offline", "Custom routines", "Home Assistant"],
    href: "/builder",
  },
  {
    id: "entertainment",
    title: "Audio and video",
    description: "Speakers and TV control that tie into scenes, like movie night in one tap.",
    features: ["Multi-room audio", "TV control", "Scene triggers"],
    href: "/builder",
  },
  {
    id: "appliances",
    title: "Smart plugs",
    description: "Make ordinary appliances switchable and see how much power they use.",
    features: ["Energy monitoring", "Schedules", "Away mode"],
    href: "/builder",
  },
]

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <JsonLd
          data={graph({
            "@type": "ItemList",
            name: "Smart home services",
            itemListElement: categories.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Service",
                name: `Smart ${c.title.toLowerCase()} installation`,
                description: c.description,
                url: abs(c.href),
                provider: { "@id": BUSINESS_ID },
                areaServed: ["Pampanga", "Tarlac", "Bulacan"].map((n) => ({ "@type": "AdministrativeArea", name: `${n}, Philippines` })),
              },
            })),
          })}
        />
        <PageHeader
          eyebrow="Services"
          title={
            <>
              Smart home installation, <span className="italic text-primary-ink">start to finish.</span>
            </>
          }
          intro="Planning, supply, installation and setup of smart lighting, locks, cameras and aircon control for homes and small offices in Pampanga, Tarlac and Bulacan."
        />

        <section className="container py-12 lg:py-20">
          <ul className="border-b">
            {categories.map((cat, i) => (
              <li key={cat.id} className="border-t">
                <Link
                  href={cat.href}
                  className="group grid gap-4 py-8 transition-colors hover:bg-card md:grid-cols-[4rem_1fr_1.2fr_auto] md:items-baseline md:gap-8 md:px-2"
                >
                  <span className="font-mono text-sm text-primary-ink">0{i + 1}</span>
                  <h2 className="text-4xl leading-none transition-transform duration-300 group-hover:translate-x-2">
                    {cat.title}
                  </h2>
                  <div>
                    <p className="max-w-md leading-relaxed text-muted-foreground">{cat.description}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {cat.features.map((f) => (
                        <li key={f} className="rounded-full border px-3 py-1 font-mono text-[11px] text-muted-foreground">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ArrowUpRight className="hidden h-6 w-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary-ink md:block" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="container pb-24">
          <div className="rounded-xl bg-foreground px-8 py-14 text-background sm:px-14">
            <h2 className="max-w-xl text-balance text-4xl leading-tight sm:text-5xl">
              Bigger project? <span className="italic text-primary">Let's talk it through.</span>
            </h2>
            <p className="mt-4 max-w-lg text-background/70">
              Whole-house setups, small offices and rentals each need a slightly different plan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90">
                <Link href="/contact">
                  Book a consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="h-12 rounded-full px-5 text-background hover:bg-background/10 hover:text-background">
                <Link href="/builder">Try the builder</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
