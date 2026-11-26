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
import { citiesInProvince } from "@/lib/cities"
import { getProvincePage, provincePages } from "@/lib/provinces"

export const dynamicParams = false

export function generateStaticParams() {
  return provincePages.map((p) => ({ province: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ province: string }> }): Promise<Metadata> {
  const { province } = await params
  const p = getProvincePage(province)
  if (!p) return {}
  return pageMeta(`/areas/${p.slug}`, p.metaTitle, p.metaDescription)
}

export default async function ProvincePage({ params }: { params: Promise<{ province: string }> }) {
  const { province } = await params
  const p = getProvincePage(province)
  if (!p) notFound()

  const path = `/areas/${p.slug}`
  const cities = citiesInProvince(p.name)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <JsonLd
        data={graph(
          webPage({ path, name: p.metaTitle, description: p.metaDescription }),
          {
            "@type": "Service",
            "@id": `${abs(path)}#service`,
            name: p.metaTitle,
            serviceType: "Smart home installation",
            description: p.metaDescription,
            url: abs(path),
            provider: { "@id": BUSINESS_ID },
            areaServed: { "@type": "AdministrativeArea", name: `${p.name}, Philippines` },
          },
          {
            "@type": "FAQPage",
            "@id": `${abs(path)}#faq`,
            mainEntity: p.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          breadcrumb([
            { name: "Home", path: "/" },
            { name: `Smart home installation in ${p.name}`, path },
          ]),
        )}
      />
      <main className="flex-1">
        <PageHeader
          eyebrow={`${p.name}, Philippines`}
          title={
            <>
              {p.headline} <span className="italic text-primary-ink">{p.headlineItalic}</span>
            </>
          }
          intro={p.intro}
        >
          <Button asChild size="lg" className="mt-6 h-12 rounded-full px-7">
            <Link href="/contact">
              Get a quote <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </PageHeader>

        <section className="container py-20 lg:py-28">
          <p className="eyebrow mb-4">Cities in {p.name}</p>
          <h2 className="mb-10 max-w-2xl text-balance text-4xl leading-tight sm:text-5xl">Pick your city.</h2>
          <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-3">
            {cities.map((c) => (
              <Link key={c.slug} href={`/smart-home-installation/${c.slug}`} className="group bg-background p-8 transition-colors hover:bg-card">
                <p className="font-display text-4xl leading-none">{c.name}</p>
                <p className="mt-4 text-muted-foreground">{c.areas.slice(0, 4).join(", ")}</p>
                <p className="mt-6 inline-flex items-center gap-1 text-sm underline-offset-4 group-hover:underline">
                  See {c.name} <ArrowUpRight className="h-4 w-4" />
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-10 max-w-2xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            {p.notes.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
        </section>

        <section className="container pb-20 lg:pb-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">{p.name} questions</p>
              <h2 className="text-4xl leading-tight sm:text-5xl">Quick answers.</h2>
            </div>
            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="w-full">
                {p.faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`q-${i}`}>
                    <AccordionTrigger className="py-6 text-left font-display text-2xl font-normal hover:no-underline">{f.q}</AccordionTrigger>
                    <AccordionContent className="max-w-2xl pb-6 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="container pb-24 lg:pb-32">
          <p className="eyebrow mb-6">Also serving</p>
          <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
            {provincePages
              .filter((o) => o.slug !== p.slug)
              .map((o) => (
                <Link key={o.slug} href={`/areas/${o.slug}`} className="group bg-background p-8 transition-colors hover:bg-card">
                  <p className="font-display text-4xl leading-none">{o.name}</p>
                  <p className="mt-6 inline-flex items-center gap-1 text-sm underline-offset-4 group-hover:underline">
                    See {o.name} <ArrowUpRight className="h-4 w-4" />
                  </p>
                </Link>
              ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
