import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Check, Minus } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { JsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { TopicIconMark } from "@/components/service-topics/topic-icon"
import { pageMeta } from "@/lib/site"
import { BUSINESS_ID, abs, breadcrumb, graph, webPage } from "@/lib/schema"
import { getPlan } from "@/lib/service-plans"
import { getTopic, getTopicsForService, serviceTopics } from "@/lib/service-topics"

export const dynamicParams = false

export function generateStaticParams() {
  return serviceTopics.map((t) => ({ slug: t.service, topic: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; topic: string }>
}): Promise<Metadata> {
  const { slug, topic } = await params
  const t = getTopic(slug, topic)
  if (!t) return {}
  return pageMeta(`/services/${slug}/${topic}`, t.metaTitle, t.metaDescription)
}

const sections = [
  { id: "why", label: "Why it matters" },
  { id: "install", label: "How we install it" },
  { id: "automations", label: "Automations" },
  { id: "good-to-know", label: "Good to know" },
  { id: "faq", label: "FAQ" },
]

/** Platform pages worth linking from the voice control topic. */
const platformLinks = [
  { href: "/alexa", label: "Alexa" },
  { href: "/google-home", label: "Google Home" },
  { href: "/apple-home", label: "Apple Home" },
]

export default async function ServiceTopicPage({ params }: { params: Promise<{ slug: string; topic: string }> }) {
  const { slug, topic } = await params
  const plan = getPlan(slug)
  const t = getTopic(slug, topic)
  if (!plan || !t) notFound()

  const servicePath = `/services/${plan.slug}`
  const path = `${servicePath}/${t.slug}`
  const siblings = getTopicsForService(plan.slug).filter((s) => s.slug !== t.slug)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <JsonLd
        data={graph(
          webPage({ path, name: t.metaTitle, description: t.metaDescription }),
          {
            "@type": "Service",
            "@id": `${abs(path)}#service`,
            name: t.metaTitle,
            description: t.metaDescription,
            url: abs(path),
            provider: { "@id": BUSINESS_ID },
            areaServed: ["Pampanga", "Tarlac", "Bulacan"].map((n) => ({ "@type": "AdministrativeArea", name: `${n}, Philippines` })),
          },
          {
            "@type": "FAQPage",
            "@id": `${abs(path)}#faq`,
            mainEntity: t.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
          breadcrumb([
            { name: "Services", path: "/services" },
            { name: plan.title, path: servicePath },
            { name: t.name, path },
          ]),
        )}
      />

      <main className="flex-1">
        <nav aria-label="Breadcrumb" className="container pt-6">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            <li>
              <Link href="/services" className="hover:text-foreground">
                Services
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={servicePath} className="hover:text-foreground">
                {plan.title}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {t.name}
            </li>
          </ol>
        </nav>

        <PageHeader
          eyebrow={plan.title}
          title={
            <>
              {t.headline} <span className="italic text-primary-ink">{t.headlineItalic}</span>
            </>
          }
          intro={t.intro}
        >
          <span className="mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <TopicIconMark name={t.icon} className="h-6 w-6" />
          </span>
        </PageHeader>

        <nav aria-label="On this page" className="border-b">
          <ul className="container flex gap-2 overflow-x-auto py-4">
            {sections.map((s) => (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  className="inline-block rounded-full border px-4 py-2 text-sm transition-colors hover:border-foreground/40 hover:bg-card"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section id="why" className="container scroll-mt-20 py-20 lg:py-28">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <p className="eyebrow mb-4">Why it matters</p>
              <h2 className="text-balance text-4xl leading-tight sm:text-5xl">What it does for your home.</h2>
            </div>
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              {t.why.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="install" className="container scroll-mt-20 border-t py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">How we install it</p>
              <h2 className="text-balance text-4xl leading-tight sm:text-5xl">From survey to handover.</h2>
            </div>
            <ol className="lg:col-span-8">
              {t.install.map((step, i) => (
                <li
                  key={step.title}
                  className="grid gap-3 border-t py-7 first:border-t-0 first:pt-0 sm:grid-cols-[4rem_1fr_1.3fr] sm:gap-8"
                >
                  <span className="font-mono text-sm text-primary-ink">0{i + 1}</span>
                  <h3 className="text-2xl leading-tight">{step.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="automations" className="scroll-mt-20 border-y bg-secondary/60">
          <div className="container py-20 lg:py-28">
            <p className="eyebrow mb-4">Automations</p>
            <h2 className="mb-10 max-w-xl text-balance text-4xl leading-tight sm:text-5xl">
              Things it can do <span className="italic text-primary-ink">on its own.</span>
            </h2>
            <ul className="grid gap-4 md:grid-cols-3">
              {t.automations.map((a, i) => (
                <li key={a.title} className="panel p-6">
                  <span className="font-mono text-sm text-primary-ink">0{i + 1}</span>
                  <h3 className="mt-6 text-2xl leading-tight">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="good-to-know" className="container scroll-mt-20 py-20 lg:py-28">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="eyebrow mb-4">Good to know</p>
              <h2 className="text-balance text-4xl leading-tight sm:text-5xl">The honest bits.</h2>
              <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
                What to check before you buy, so nothing surprises you after.
              </p>
            </div>
            <ul className="space-y-4">
              {t.goodToKnow.map((g) => (
                <li key={g} className="flex gap-3 text-lg leading-snug">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background text-muted-foreground ring-1 ring-border">
                    <Minus className="h-3 w-3" />
                  </span>
                  <span className="text-muted-foreground">{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="faq" className="container scroll-mt-20 border-t py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">FAQ</p>
              <h2 className="text-balance text-4xl leading-tight sm:text-5xl">Common questions.</h2>
            </div>
            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="border-b">
                {t.faqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-lg">{f.q}</AccordionTrigger>
                    <AccordionContent className="leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="container pb-16 lg:pb-20">
          <div className="rounded-xl bg-foreground px-8 py-14 text-background sm:px-14">
            <h2 className="max-w-xl text-balance text-4xl leading-tight sm:text-5xl">
              Want {t.name.toLowerCase()} <span className="italic text-primary">in your home?</span>
            </h2>
            <p className="mt-4 max-w-lg text-background/70">
              Tell us the rooms and we will send a written quote for Pampanga, Tarlac or Bulacan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90">
                <Link href={`${servicePath}#plan`}>
                  Plan it room by room <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="h-12 rounded-full px-5 text-background hover:bg-background/10 hover:text-background">
                <Link href="/contact">Book a consultation</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container pb-24 lg:pb-32">
          <p className="eyebrow mb-4">More in {plan.title.toLowerCase()}</p>
          <ul className="flex flex-wrap gap-2">
            {siblings.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.service}/${s.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors hover:border-foreground/40 hover:bg-card"
                >
                  <TopicIconMark name={s.icon} className="h-4 w-4 text-primary-ink" />
                  {s.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={servicePath}
                className="inline-flex items-center gap-2 rounded-full border border-dashed px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                <Check className="h-4 w-4" aria-hidden="true" />
                All {plan.title.toLowerCase()}
              </Link>
            </li>
          </ul>

          {t.slug === "voice-control" && (
            <div className="mt-10">
              <p className="eyebrow mb-4">Platform guides</p>
              <ul className="flex flex-wrap gap-2">
                {platformLinks.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      className="inline-block rounded-full border px-4 py-2 text-sm transition-colors hover:border-foreground/40 hover:bg-card"
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
