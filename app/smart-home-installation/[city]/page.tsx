import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { JsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { pageMeta } from "@/lib/site"
import { BUSINESS_ID, abs, breadcrumb, graph, webPage } from "@/lib/schema"
import { cityPages, getCityPage } from "@/lib/cities"
import { servicePlans } from "@/lib/service-plans"

export const dynamicParams = false

const serviceBlurbs: Record<string, string> = {
  lighting: "Bulbs, switches and light strips that follow the time of day.",
  security: "Locks, cameras, doorbells, smoke and gas detectors, and sensors.",
  climate: "Aircon, fans and curtains that respond to the room.",
  automation: "Hubs, voice control, mesh WiFi and routines that tie it together.",
  "media-control": "Speakers, TV and audio working together in every room.",
  appliances: "Plugs, water pump control, energy monitoring and robot vacuums.",
}

export function generateStaticParams() {
  return cityPages.map((c) => ({ city: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params
  const c = getCityPage(city)
  if (!c) return {}
  return pageMeta(`/smart-home-installation/${c.slug}`, c.metaTitle, c.metaDescription)
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params
  const c = getCityPage(city)
  if (!c) notFound()

  const path = `/smart-home-installation/${c.slug}`
  const others = cityPages.filter((o) => o.slug !== c.slug)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <JsonLd
        data={graph(
          webPage({ path, name: c.metaTitle, description: c.metaDescription }),
          {
            "@type": "Service",
            "@id": `${abs(path)}#service`,
            name: c.metaTitle,
            serviceType: "Smart home installation",
            description: c.metaDescription,
            url: abs(path),
            provider: { "@id": BUSINESS_ID },
            areaServed: { "@type": "City", name: `${c.name}, ${c.province}, Philippines` },
          },
          {
            "@type": "FAQPage",
            "@id": `${abs(path)}#faq`,
            mainEntity: c.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          breadcrumb([
            { name: "Services", path: "/services" },
            { name: `Smart home installation in ${c.name}`, path },
          ]),
        )}
      />
      <main className="flex-1">
        <PageHeader
          eyebrow={`${c.name}, ${c.province}`}
          title={
            <>
              {c.headline} <span className="italic text-primary-ink">{c.headlineItalic}</span>
            </>
          }
          intro={c.intro}
        >
          <Button asChild size="lg" className="mt-6 h-12 rounded-full px-7">
            <Link href="/contact">
              Get a quote <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </PageHeader>

        {/* Local notes */}
        <section className="container grid gap-12 pt-12 pb-20 lg:grid-cols-12 lg:pt-20 lg:pb-28">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">Homes in {c.name}</p>
            <h2 className="text-balance text-4xl leading-tight sm:text-5xl">What matters here.</h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-muted-foreground lg:col-span-8">
            {c.localNotes.map((n) => (
              <p key={n}>{n}</p>
            ))}
            <ul className="grid gap-px overflow-hidden rounded-lg border bg-border text-base sm:grid-cols-3">
              {c.focus.map((f) => (
                <li key={f.title} className="bg-background p-6">
                  <h3 className="text-2xl leading-tight text-foreground">{f.title}</h3>
                  <p className="mt-3 text-base leading-relaxed">{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Services */}
        <section className="border-y bg-secondary/60">
          <div className="container py-20 lg:py-28">
            <p className="eyebrow mb-4">What we set up in {c.name}</p>
            <h2 className="mb-12 max-w-2xl text-balance text-4xl leading-tight sm:text-5xl">
              Pick a service, or ask for all of it.
            </h2>
            <ul className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {servicePlans.map((p) => (
                <li key={p.slug}>
                  <Link href={`/services/${p.slug}`} className="group flex h-full flex-col justify-between gap-6 bg-background p-7 transition-colors hover:bg-card">
                    <div>
                      <p className="font-display text-3xl leading-tight">{p.title}</p>
                      <p className="mt-3 text-muted-foreground">{serviceBlurbs[p.slug] ?? ""}</p>
                    </div>
                    <p className="inline-flex items-center gap-1 text-sm underline-offset-4 group-hover:underline">
                      See {p.title.toLowerCase()} <ArrowUpRight className="h-4 w-4" />
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-muted-foreground">
              We set these up on{" "}
              <Link href="/alexa" className="text-foreground underline underline-offset-4">Alexa</Link>,{" "}
              <Link href="/apple-home" className="text-foreground underline underline-offset-4">Apple Home</Link> or{" "}
              <Link href="/google-home" className="text-foreground underline underline-offset-4">Google Home</Link>, whichever your family already uses.
            </p>
          </div>
        </section>

        {/* Areas */}
        <section className="container py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">Where in {c.name}</p>
              <h2 className="text-balance text-4xl leading-tight sm:text-5xl">Areas we cover.</h2>
            </div>
            <div className="lg:col-span-8">
              <ul className="flex flex-wrap gap-2">
                {c.areas.map((a) => (
                  <li key={a} className="rounded-full border px-4 py-2 text-sm">
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-xl text-muted-foreground">
                Somewhere else in {c.name}? <Link href="/contact" className="text-foreground underline underline-offset-4">Message us first</Link> and
                we will tell you honestly if we can help.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container pb-20 lg:pb-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">{c.name} questions</p>
              <h2 className="text-4xl leading-tight sm:text-5xl">Quick answers.</h2>
            </div>
            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="w-full">
                {c.faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`q-${i}`}>
                    <AccordionTrigger className="py-6 text-left font-display text-2xl font-normal hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="max-w-2xl pb-6 text-base leading-relaxed text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Other cities */}
        <section className="container pb-20 lg:pb-28">
          <p className="eyebrow mb-6">Also serving</p>
          <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/smart-home-installation/${o.slug}`} className="group bg-background p-8 transition-colors hover:bg-card">
                <p className="font-display text-4xl leading-none">{o.name}</p>
                <p className="mt-4 text-muted-foreground">Smart home installation in {o.name}, {o.province}.</p>
                <p className="mt-6 inline-flex items-center gap-1 text-sm underline-offset-4 group-hover:underline">
                  See {o.name} <ArrowUpRight className="h-4 w-4" />
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container pb-24 lg:pb-32">
          <div className="relative overflow-hidden rounded-xl bg-foreground px-8 py-16 text-background sm:px-14 lg:py-20">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
            <h2 className="relative max-w-2xl text-balance text-4xl leading-[1.05] sm:text-6xl">
              A smart home in {c.name}, <span className="italic text-primary">planned first.</span>
            </h2>
            <p className="relative mt-5 max-w-lg text-lg text-background/70">
              Tell us about your house and we will plan the devices, the rooms and the routines, then send a written quote before anything is bought.
            </p>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90">
                <Link href="/contact">
                  Get a quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="h-12 rounded-full px-5 text-background hover:bg-background/10 hover:text-background">
                <Link href="/services">Plan by room</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
