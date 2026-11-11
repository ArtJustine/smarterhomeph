"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { InteractiveHome } from "@/components/interactive-home"
import { platformList } from "@/lib/platforms"


const steps = [
  {
    n: "01",
    title: "Tell us about your home",
    body: "Pick a service and list what you want room by room, or just message us what annoys you most. Lights you forget, a door you worry about, an aircon you leave on.",
  },
  {
    n: "02",
    title: "We plan it and quote it",
    body: "You get a list of what goes where and what it costs, before anything is bought. Change it as many times as you like.",
  },
  {
    n: "03",
    title: "We install and set it up",
    body: "Devices get mounted, connected to your WiFi and tied together, then we show you the app and the scenes so the whole household can use it.",
  },
]

const setups = [
  {
    title: "Smart lighting",
    body: "Bulbs, strips and switches that follow a schedule or a scene, and still work with the wall switch.",
    href: "/services/lighting",
  },
  {
    title: "Smart locks and cameras",
    body: "Smart door locks and CCTV cameras with alerts on your phone, so you can check the gate from the office.",
    href: "/services/security",
  },
  {
    title: "Aircon control",
    body: "Smart aircon control and temperature sensors, so the room is cool when you get there, not all day.",
    href: "/services/climate",
  },
  {
    title: "Sensors and plugs",
    body: "Motion, door and power sensors that trigger the rest. Turn off the iron from your phone.",
    href: "/services/appliances",
  },
]

const areas = [
  { name: "Pampanga", note: "Smart home installation in Angeles, Mabalacat, San Fernando and nearby" },
  { name: "Tarlac", note: "Smart home installation in Tarlac City and nearby" },
  { name: "Bulacan", note: "Smart home installation in Malolos, Meycauayan and nearby" },
]

const fade = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="container grid grid-cols-1 items-center gap-12 pb-20 pt-12 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-20">
          <div className="min-w-0 lg:col-span-5">
            <motion.p {...fade} transition={{ duration: 0.5 }} className="eyebrow mb-6">
              Smart home installer · Central Luzon
            </motion.p>
            <motion.h1
              {...fade}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-balance text-5xl leading-[1.02] sm:text-6xl lg:text-[3.6rem] xl:text-[4rem]"
            >
              Smart home setup in <span className="italic text-primary-ink">Pampanga, Tarlac and Bulacan.</span>
            </motion.h1>
            <motion.p
              {...fade}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground"
            >
              We plan, supply and install smart lights, door locks, CCTV cameras and aircon control that work
              with Alexa, Google Home and Home Assistant. Tap the house to see how it feels.
            </motion.p>
            <motion.div
              {...fade}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg" className="h-12 rounded-full px-7">
                <Link href="/contact">
                  Get a quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="h-12 rounded-full px-5">
                <Link href="/services">Our services</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="min-w-0 lg:col-span-7"
          >
            <InteractiveHome />
          </motion.div>
        </section>

        {/* Platforms */}
        <section className="container py-24 lg:py-32">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow mb-4">Pick your platform</p>
            <h2 className="text-balance text-4xl leading-tight sm:text-5xl">
              Alexa, Apple Home or Google Home. We set up all three.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-3">
            {platformList.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="group bg-background p-8 transition-colors hover:bg-card">
                <p className="font-display text-5xl leading-none">{p.name}</p>
                <p className="mt-5 min-h-[3.5rem] max-w-xs text-muted-foreground">{p.short}</p>
                <p className="mt-8 inline-flex items-center gap-1 text-sm underline-offset-4 group-hover:underline">
                  {p.name} setup <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="container py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">How it works</p>
              <h2 className="text-balance text-4xl leading-tight sm:text-5xl">How a smart home install works.</h2>
            </div>
            <ol className="lg:col-span-8">
              {steps.map((s) => (
                <li key={s.n} className="grid gap-4 border-t py-8 first:border-t-0 first:pt-0 sm:grid-cols-[5rem_1fr] sm:gap-8">
                  <span className="font-mono text-sm text-primary-ink">{s.n}</span>
                  <div>
                    <h3 className="text-3xl leading-tight">{s.title}</h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* What we set up */}
        <section className="bg-secondary/60">
          <div className="container py-24 lg:py-32">
            <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow mb-4">What we set up</p>
                <h2 className="max-w-xl text-balance text-4xl leading-tight sm:text-5xl">
                  Smart home devices we install.
                </h2>
              </div>
              <Link href="/services" className="inline-flex items-center gap-1 text-sm underline-offset-4 hover:underline">
                All services <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <ul className="border-b border-foreground/20">
              {setups.map((item) => (
                <li key={item.title} className="border-t border-foreground/20">
                  <Link
                    href={item.href}
                    className="group grid items-baseline gap-2 py-7 transition-colors hover:bg-background/60 sm:grid-cols-[1fr_1.2fr_auto] sm:gap-10 sm:px-2"
                  >
                    <h3 className="text-4xl leading-none transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl">
                      {item.title}
                    </h3>
                    <p className="max-w-md text-muted-foreground">{item.body}</p>
                    <ArrowUpRight className="hidden h-6 w-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary-ink sm:block" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Where we work */}
        <section className="container py-24 lg:py-32">
          <p className="eyebrow mb-4">Where we work</p>
          <h2 className="max-w-2xl text-balance text-4xl leading-tight sm:text-5xl">
            Smart home installation across Central Luzon.
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-3">
            {areas.map((a) => (
              <div key={a.name} className="bg-background p-8 transition-colors hover:bg-card">
                <p className="font-display text-5xl leading-none">{a.name}</p>
                <p className="mt-4 text-sm text-muted-foreground">{a.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Somewhere else in Luzon? Message us first and we will tell you honestly if we can help.
          </p>
        </section>

        {/* Builder CTA */}
        <section className="container pb-24 lg:pb-32">
          <div className="relative overflow-hidden rounded-xl bg-foreground px-8 py-16 text-background sm:px-14 lg:py-24">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/25 blur-3xl"
            />
            <p className="eyebrow relative mb-5 !text-background/50">Plan by room</p>
            <h2 className="relative max-w-2xl text-balance text-5xl leading-[1.02] sm:text-6xl">
              Tell us what you want, <span className="italic text-primary">room by room.</span>
            </h2>
            <p className="relative mt-6 max-w-lg text-lg text-background/70">
              Choose a service, pick a room, count the lights, locks, cameras or sensors. Send it to us when
              it looks right.
            </p>
            <Button
              asChild
              size="lg"
              className="relative mt-10 h-12 rounded-full bg-primary px-7 text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/services">
                Start planning <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
