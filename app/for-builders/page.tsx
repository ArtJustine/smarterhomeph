import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const offers = [
  { title: "A pre-wiring plan per house type", body: "We mark up your plans or a site visit with switch positions, network points, camera cable runs and power spots, so your crew knows exactly what to rough in." },
  { title: "Fewer callbacks after turnover", body: "Neutral wires at the switches, conduit where cameras go and a LAN point in the right rooms mean the smart devices go in cleanly and your client does not call you about it." },
  { title: "Install and handover", body: "After finishing, we install and set up the devices and show the homeowner how everything works. You hand over a house that works on day one." },
  { title: "One point of contact", body: "One team plans, installs and supports it. You do not chase three suppliers or explain the plan to the homeowner a second time." },
]

const checklist = [
  { title: "Neutral wire at every switch box", body: "Many smart switches need a neutral wire. Pulling it now costs almost nothing. Adding it later means opening walls." },
  { title: "Conduit to the gate and the carport", body: "A spare conduit to the gate, carport and garden allows a doorbell, cameras and outdoor lights without surface cables." },
  { title: "LAN points where WiFi is weakest", body: "A cable to the living room, the upstairs hall and the outside corners lets us hang mesh nodes and cameras on a wired network." },
  { title: "A clean spot for the network gear", body: "A small shelf with a power outlet, ventilation and an entry for the provider's fiber. It keeps the router and hub tidy." },
  { title: "Power at curtain tracks and the TV wall", body: "Motorized curtains and a wall mounted TV need an outlet in the right place. It is easy to plan and awkward to retrofit." },
  { title: "Water tank and pump location", body: "A dry spot with power and WiFi reach near the pump and tank allows scheduled filling, leak sensors and a controller." },
]

const steps = [
  { title: "Send the plan or invite us to the site", body: "A floor plan, a house type or a walk through of a unit that is still open is enough to start." },
  { title: "We send a pre-wiring plan", body: "You get a marked-up plan and a short list for your electrician: what to run, where and how many." },
  { title: "Your crew roughs it in", body: "Your electrician does the wiring as part of the build. We answer questions and can visit before the walls close." },
  { title: "We install and hand over", body: "When the house is finished, we install the devices, set up the network and show the homeowner how it works." },
]

const faqs = [
  { q: "Do you replace our electrician?", a: "No. Your electrician does the wiring. We give them a clear plan of what to rough in, and we handle the smart devices, the network and the setup after finishing." },
  { q: "What does it cost the builder?", a: "Pre-wiring plans for a house type are a conversation. Send us a plan and we tell you what is involved before anything is agreed." },
  { q: "Which areas do you cover?", a: "Pampanga, Tarlac and Bulacan, starting from Mabalacat. We confirm coverage when you send the project location." },
  { q: "Can you offer this as a package to our buyers?", a: "Yes. Some builders offer a smart home option per house type. We can price a fixed package so your buyers see a clear option and you do not manage the details." },
  { q: "What if the house is already built?", a: "Then we plan around what is there. Many devices need no new wiring, and we tell you honestly where a retrofit costs more." },
]

export default function ForBuildersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader
          eyebrow="For builders and contractors"
          title={
            <>
              Smart home pre-wiring, <span className="italic text-primary-ink">before the walls close.</span>
            </>
          }
          intro="We work with builders, contractors and architects in Central Luzon to plan the wiring and network a smart home needs, then install it after you finish."
        >
          <Button asChild size="lg" className="mt-6 h-12 rounded-full px-7">
            <Link href="/contact">
              Talk about a project <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </PageHeader>

        {/* What we do */}
        <section className="container pt-12 pb-20 lg:pt-20 lg:pb-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">What you get</p>
              <h2 className="text-balance text-4xl leading-tight sm:text-5xl">A smart home option your buyers will ask about.</h2>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:col-span-8">
              {offers.map((o) => (
                <li key={o.title} className="bg-background p-7">
                  <h3 className="text-3xl leading-tight">{o.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{o.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Checklist */}
        <section className="border-y bg-secondary/60">
          <div className="container py-20 lg:py-28">
            <p className="eyebrow mb-4">The pre-wiring checklist</p>
            <h2 className="mb-12 max-w-2xl text-balance text-4xl leading-tight sm:text-5xl">Six things to rough in while the walls are open.</h2>
            <ol className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {checklist.map((c, i) => (
                <li key={c.title} className="bg-background p-7">
                  <span className="font-mono text-sm text-primary-ink">0{i + 1}</span>
                  <h3 className="mt-6 text-3xl leading-tight">{c.title}</h3>
                  <p className="mt-3 text-muted-foreground">{c.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              This is a starting list. The right wiring depends on the house type and the devices, so we confirm it against your plan.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="container py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">How we work together</p>
              <h2 className="text-balance text-4xl leading-tight sm:text-5xl">Four steps, one handover.</h2>
            </div>
            <ol className="lg:col-span-8">
              {steps.map((s, i) => (
                <li key={s.title} className="grid gap-3 border-t py-7 first:border-t-0 first:pt-0 sm:grid-cols-[4rem_1fr_1.3fr] sm:gap-8">
                  <span className="font-mono text-sm text-primary-ink">0{i + 1}</span>
                  <h3 className="text-3xl leading-tight">{s.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="container pb-20 lg:pb-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">Builder questions</p>
              <h2 className="text-4xl leading-tight sm:text-5xl">Quick answers.</h2>
            </div>
            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((f, i) => (
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

        {/* CTA */}
        <section className="container pb-24 lg:pb-32">
          <div className="relative overflow-hidden rounded-xl bg-foreground px-8 py-16 text-background sm:px-14 lg:py-20">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
            <h2 className="relative max-w-2xl text-balance text-4xl leading-[1.05] sm:text-6xl">
              Building in Central Luzon? <span className="italic text-primary">Let us plan the smart part.</span>
            </h2>
            <p className="relative mt-5 max-w-lg text-lg text-background/70">
              Send a floor plan or the project location. We reply with a short pre-wiring plan and what it involves, before anything is agreed.
            </p>
            <div className="relative mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90">
                <Link href="/contact">
                  Send a project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="h-12 rounded-full px-5 text-background hover:bg-background/10 hover:text-background">
                <Link href="/services">See our services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
