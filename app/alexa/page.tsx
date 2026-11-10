import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { platforms } from "@/lib/platforms"
import { AlexaVoiceDemo } from "@/components/platform/alexa-voice-demo"
import { SetupList, FitAndLimits, DevicesLink, PlatformFaq, OtherPlatforms, PlatformCta } from "@/components/platform/sections"

const p = platforms.alexa

export default function AlexaPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container grid grid-cols-1 items-center gap-12 pb-20 pt-12 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-20">
          <div className="min-w-0 lg:col-span-6">
            <p className="eyebrow mb-6">Alexa smart home setup · Philippines</p>
            <h1 className="text-balance text-5xl leading-[1.02] sm:text-6xl lg:text-[4.25rem]">
              Alexa smart home setup, <span className="italic text-primary-ink">done properly.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Say what you want and the house does it. We install and set up Alexa with your lights, door locks,
              cameras and aircon, for homes in Pampanga, Tarlac and Bulacan.
            </p>
          </div>
          <div className="min-w-0 lg:col-span-6">
            <AlexaVoiceDemo />
          </div>
        </section>

        <SetupList platform={p} heading="Alexa, set up around your home." />
        <FitAndLimits platform={p} />
        <DevicesLink platform={p} />
        <PlatformFaq platform={p} />
        <OtherPlatforms current="alexa" />
        <PlatformCta platform={p} />
      </main>
      <SiteFooter />
    </div>
  )
}
