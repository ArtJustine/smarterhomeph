import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { ServicePlanner } from "@/components/service-planner"
import { JsonLd } from "@/components/json-ld"
import { pageMeta } from "@/lib/site"
import { BUSINESS_ID, abs, breadcrumb, graph, webPage } from "@/lib/schema"
import { getPlan, servicePlans } from "@/lib/service-plans"

export const dynamicParams = false

export function generateStaticParams() {
  return servicePlans.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const plan = getPlan(slug)
  if (!plan) return {}
  return pageMeta(`/services/${slug}`, plan.metaTitle, plan.metaDescription)
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const plan = getPlan(slug)
  if (!plan) notFound()
  const path = `/services/${plan.slug}`
  const others = servicePlans.filter((p) => p.slug !== plan.slug)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <JsonLd
        data={graph(
          webPage({ path, name: plan.metaTitle, description: plan.metaDescription }),
          {
            "@type": "Service",
            "@id": `${abs(path)}#service`,
            name: plan.metaTitle,
            description: plan.metaDescription,
            url: abs(path),
            provider: { "@id": BUSINESS_ID },
            areaServed: ["Pampanga", "Tarlac", "Bulacan"].map((n) => ({ "@type": "AdministrativeArea", name: `${n}, Philippines` })),
          },
          breadcrumb([{ name: "Services", path: "/services" }, { name: plan.title, path }]),
        )}
      />
      <main className="flex-1">
        <PageHeader eyebrow="Services" title={<>{plan.title}, <span className="italic text-primary-ink">room by room.</span></>} intro={plan.intro} />

        <section className="container py-12 lg:py-16">
          <ServicePlanner plan={plan} />
        </section>

        <section className="container pb-16">
          <div className="grid gap-8 border-t pt-12 md:grid-cols-2">
            <h2 className="text-4xl leading-tight">Planned and installed locally.</h2>
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              {plan.body.map((b) => (
                <p key={b}>{b}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="container pb-24">
          <p className="eyebrow mb-4">Other services</p>
          <ul className="flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/services/${o.slug}`} className="inline-block rounded-full border px-4 py-2 text-sm transition-colors hover:border-foreground/40 hover:bg-card">
                  {o.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
