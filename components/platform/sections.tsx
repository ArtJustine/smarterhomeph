import Link from "next/link"
import { ArrowRight, ArrowUpRight, Check, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { platformList, type Platform } from "@/lib/platforms"

export function SetupList({ platform, heading }: { platform: Platform; heading: string }) {
  return (
    <section className="container py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-4">What we set up</p>
          <h2 className="text-balance text-4xl leading-tight sm:text-5xl">{heading}</h2>
        </div>
        <ol className="lg:col-span-8">
          {platform.setup.map((item, i) => (
            <li
              key={item.title}
              className="grid gap-3 border-t py-7 first:border-t-0 first:pt-0 sm:grid-cols-[4rem_1fr_1.3fr] sm:gap-8"
            >
              <span className="font-mono text-sm text-primary-ink">0{i + 1}</span>
              <h3 className="text-3xl leading-tight">{item.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function FitAndLimits({ platform }: { platform: Platform }) {
  return (
    <section className="border-y bg-secondary/60">
      <div className="container grid gap-12 py-20 md:grid-cols-2 lg:py-28">
        <div>
          <p className="eyebrow mb-4">A good fit if</p>
          <ul className="space-y-4">
            {platform.goodFor.map((t) => (
              <li key={t} className="flex gap-3 text-lg leading-snug">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Worth knowing</p>
          <ul className="space-y-4">
            {platform.limits.map((t) => (
              <li key={t} className="flex gap-3 text-lg leading-snug text-muted-foreground">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-background text-muted-foreground ring-1 ring-border">
                  <Minus className="h-3 w-3" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function DevicesLink({ platform }: { platform: Platform }) {
  return (
    <section className="container py-16 lg:py-20">
      <Link
        href={`/devices?ecosystem=${encodeURIComponent(platform.ecosystem)}`}
        className="group flex flex-col justify-between gap-4 rounded-xl border p-8 transition-colors hover:bg-card sm:flex-row sm:items-center sm:p-10"
      >
        <div>
          <p className="eyebrow mb-2">Compatible devices</p>
          <p className="font-display text-3xl leading-tight sm:text-4xl">
            See the devices that work with {platform.name}.
          </p>
        </div>
        <ArrowUpRight className="h-8 w-8 shrink-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary-ink" />
      </Link>
    </section>
  )
}

export function PlatformFaq({ platform }: { platform: Platform }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: platform.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }
  return (
    <section className="container pb-20 lg:pb-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-4">{platform.name} questions</p>
          <h2 className="text-4xl leading-tight sm:text-5xl">Quick answers.</h2>
        </div>
        <div className="lg:col-span-8">
          <Accordion type="single" collapsible className="w-full">
            {platform.faqs.map((f, i) => (
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
  )
}

export function OtherPlatforms({ current }: { current: Platform["slug"] }) {
  const others = platformList.filter((p) => p.slug !== current)
  return (
    <section className="container pb-20 lg:pb-28">
      <p className="eyebrow mb-6">Not sure which one?</p>
      <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2">
        {others.map((p) => (
          <Link key={p.slug} href={`/${p.slug}`} className="group bg-background p-8 transition-colors hover:bg-card">
            <p className="font-display text-4xl leading-none">{p.name}</p>
            <p className="mt-4 max-w-sm text-muted-foreground">{p.short}</p>
            <p className="mt-6 inline-flex items-center gap-1 text-sm underline-offset-4 group-hover:underline">
              See the {p.name} page <ArrowUpRight className="h-4 w-4" />
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function PlatformCta({ platform }: { platform: Platform }) {
  return (
    <section className="container pb-24 lg:pb-32">
      <div className="relative overflow-hidden rounded-xl bg-foreground px-8 py-16 text-background sm:px-14 lg:py-20">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <h2 className="relative max-w-2xl text-balance text-4xl leading-[1.05] sm:text-6xl">
          Get {platform.name} set up <span className="italic text-primary">the first time.</span>
        </h2>
        <p className="relative mt-5 max-w-lg text-lg text-background/70">
          Tell us about your house and we will plan the devices, the rooms and the routines, then send a quote before anything is bought.
        </p>
        <div className="relative mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="h-12 rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90">
            <Link href="/contact">
              Get a quote <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="h-12 rounded-full px-5 text-background hover:bg-background/10 hover:text-background">
            <Link href="/builder">Try the builder</Link>
          </Button>
        </div>
      </div>
      <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">
        Alexa is a trademark of Amazon.com, Inc. Apple Home, HomeKit and HomePod are trademarks of Apple Inc. Google Home and Nest are trademarks of Google LLC. Smarter Home PH is an independent installer and is not affiliated with these companies.
      </p>
    </section>
  )
}
