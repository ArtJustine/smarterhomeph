import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"

const values = [
  { title: "Privacy first", desc: "Where a device can run locally, we set it up that way, so your data stays in your home." },
  { title: "Done properly", desc: "Our technicians are trained on the protocols we install, and we test every scene before we leave." },
  { title: "Simple to live with", desc: "If your lola can't use it, we haven't finished. Every setup ends with a walkthrough for the whole household." },
  { title: "Room to grow", desc: "From a studio to a full house, you can start small and add devices later without starting over." },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <PageHeader
          eyebrow="About"
          title={
            <>
              Central Luzon smart home installers who <span className="italic text-primary-ink">keep it simple.</span>
            </>
          }
          intro="We don't just sell gadgets. We plan, install and support setups that work together."
        />

        <section className="container grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <p className="eyebrow lg:col-span-4">What we care about</p>
          <ul className="lg:col-span-8">
            {values.map((v, i) => (
              <li key={v.title} className="grid gap-3 border-t py-8 first:border-t-0 first:pt-0 sm:grid-cols-[4rem_1fr_1.4fr] sm:gap-8">
                <span className="font-mono text-sm text-primary-ink">0{i + 1}</span>
                <h3 className="text-3xl leading-tight">{v.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{v.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-y bg-secondary/60">
          <div className="container grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
            <p className="eyebrow lg:col-span-4">Our story</p>
            <div className="max-w-2xl space-y-8 lg:col-span-8">
              <p className="font-display text-3xl leading-snug sm:text-4xl">
                Founded in 2015, Smarter Home PH began with a simple idea: technology should work for people, not
                the other way around.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                I&apos;m Art Gonzales, a father of four, a lifelong nerd and a smart home enthusiast. A house with
                four kids never sits still. Lights get left on, doors get left open and somebody always wants the
                aircon colder. I started automating my own home to take some of that off my plate, and I never
                stopped.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Over the years I tested more gadgets than I can count, and I learned which ones are worth your
                money and which ones end up in a drawer. Now I set up the good ones for other families across
                Central Luzon, so you get a home that just works without spending your weekends on it.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                I favour setups where devices work together instead of isolated gadgets. They run on the platform
                your family already uses, whether that is Alexa, Apple Home or Google Home, and they can grow with
                you through Matter and Home Assistant when you are ready for more.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                A smart home should be simple enough for everyone in the house, from the kids to the grandparents.
                If it takes a manual to turn on the lights, I did it wrong.
              </p>
            </div>
          </div>
        </section>

        <section className="container py-20 text-center lg:py-28">
          <h2 className="mx-auto max-w-2xl text-balance text-4xl leading-tight sm:text-5xl">
            Got a house and a list of annoyances?
          </h2>
          <Button asChild size="lg" className="mt-8 h-12 rounded-full px-7">
            <Link href="/contact">
              Tell us about it <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
