import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { platforms } from "@/lib/platforms"
import { GoogleRoutineBuilder } from "@/components/platform/google-routine-builder"
import { SetupList, FitAndLimits, DevicesLink, PlatformFaq, OtherPlatforms, PlatformCta } from "@/components/platform/sections"

const p = platforms["google-home"]

export default function GoogleHomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b">
          <div className="container grid grid-cols-1 gap-12 pb-16 pt-14 md:pb-20 md:pt-20 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-5">
              <p className="eyebrow mb-6">Google Home setup · Philippines</p>
              <h1 className="text-balance text-5xl leading-[1.02] sm:text-6xl lg:text-[4rem]">
                Google Home setup that <span className="italic text-primary-ink">runs on routines.</span>
              </h1>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground">
                One phrase, one schedule or one trip out the door can run your whole house. We set up Google Home
                for Android and iPhone households in Pampanga, Tarlac and Bulacan.
              </p>
            </div>
            <div className="min-w-0 lg:col-span-7">
              <GoogleRoutineBuilder />
            </div>
          </div>
        </section>

        <SetupList platform={p} heading="Google Home, set up to run itself." />
        <FitAndLimits platform={p} />
        <DevicesLink platform={p} />
        <PlatformFaq platform={p} />
        <OtherPlatforms current="google-home" />
        <PlatformCta platform={p} />
      </main>
      <SiteFooter />
    </div>
  )
}
