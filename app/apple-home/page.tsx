import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { platforms } from "@/lib/platforms"
import { AppleHubToggle } from "@/components/platform/apple-hub-toggle"
import { SetupList, FitAndLimits, DevicesLink, PlatformFaq, OtherPlatforms, PlatformCta, LocalAreas, ServiceJsonLd, PlatformDevices } from "@/components/platform/sections"

const p = platforms["apple-home"]

const needs = [
  { n: "01", title: "An iPhone or iPad", body: "The Home app runs on Apple devices only." },
  { n: "02", title: "A home hub", body: "A HomePod, HomePod mini or Apple TV that stays at home." },
  { n: "03", title: "Solid home WiFi", body: "Most devices connect through your router, so coverage matters." },
  { n: "04", title: "Compatible devices", body: "Look for Works with Apple Home or Matter on the box." },
]

export default function AppleHomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <ServiceJsonLd platform={p} />
        <section className="container pb-16 pt-14 text-center md:pt-24">
          <p className="eyebrow mb-6">Apple Home and HomeKit setup · Philippines</p>
          <h1 className="mx-auto max-w-4xl text-balance text-5xl leading-[1.02] sm:text-6xl lg:text-[4.75rem]">
            Apple Home setup that is <span className="italic text-primary-ink">private and quiet.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            We set up Apple Home and HomeKit for iPhone households in Angeles, Mabalacat, Tarlac City, Malolos and the rest of
            Pampanga, Tarlac and Bulacan, from the home hub to the last scene.
          </p>
        </section>

        <section className="container pb-20 lg:pb-28">
          <AppleHubToggle />
        </section>

        <section className="border-y bg-secondary/60">
          <div className="container py-20 lg:py-28">
            <p className="eyebrow mb-4">What you need</p>
            <h2 className="mb-12 max-w-2xl text-balance text-4xl leading-tight sm:text-5xl">Four things, and we help with all of them.</h2>
            <div className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {needs.map((n) => (
                <div key={n.n} className="bg-background p-7">
                  <span className="font-mono text-sm text-primary-ink">{n.n}</span>
                  <h3 className="mt-6 text-3xl leading-tight">{n.title}</h3>
                  <p className="mt-3 text-muted-foreground">{n.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PlatformDevices platform={p} plain />
        <SetupList platform={p} heading="Apple Home, set up the calm way." />
        <FitAndLimits platform={p} />
        <DevicesLink platform={p} />
        <LocalAreas platform={p} />
        <PlatformFaq platform={p} />
        <OtherPlatforms current="apple-home" />
        <PlatformCta platform={p} />
      </main>
      <SiteFooter />
    </div>
  )
}
