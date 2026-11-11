import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      name: "Jennifer M.",
      location: "San Francisco, CA",
      rating: 5,
      review:
        "The smart home system has completely transformed our daily routines. The automation features are intuitive and the app is incredibly user-friendly. Customer support was also exceptional.",
      product: "Complete Home Automation Package",
    },
    {
      id: 2,
      name: "Robert T.",
      location: "Chicago, IL",
      rating: 5,
      review:
        "I've been using the security system for about 6 months now and I'm very impressed with the quality of the cameras and the reliability of the motion detection. Truly premium hardware.",
      product: "Smart Security Bundle",
    },
    {
      id: 3,
      name: "Maria G.",
      location: "Austin, TX",
      rating: 5,
      review:
        "The smart lighting system is amazing! I love being able to control the ambiance of each room from my phone, and the energy savings have been significant. The installation was seamless.",
      product: "Smart Lighting Package",
    },
    {
      id: 4,
      name: "David L.",
      location: "Seattle, WA",
      rating: 5,
      review:
        "Technically marvelous. The integration with our existing local servers was handled perfectly by the engineering team. Private, fast, and reliable.",
      product: "Private Hub Integration",
    },
    {
      id: 5,
      name: "Sarah K.",
      location: "Boston, MA",
      rating: 4,
      review:
        "The smart thermostat has made a noticeable difference in our energy bills. It's easy to program and I love being able to adjust the temperature remotely. Exceptional build quality.",
      product: "Climate Control System",
    },
    {
      id: 6,
      name: "Michael P.",
      location: "Denver, CO",
      rating: 5,
      review:
        "The white-glove installation service was worth every penny. The technicians were professional, knowledgeable, and took the time to explain every protocol. Highly recommended.",
      product: "Professional Field Service",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <PageHeader
          eyebrow="Reviews"
          title={
            <>
              Smart home reviews from <span className="italic text-primary-ink">homeowners.</span>
            </>
          }
          intro="Notes from people who had a setup installed."
        />

        <section className="container pt-12 pb-24 lg:pt-20 lg:pb-32">
          <ul className="grid gap-px overflow-hidden rounded-lg border bg-border md:grid-cols-2">
            {reviews.map((r) => (
              <li key={r.id} className="flex flex-col bg-background p-8 transition-colors hover:bg-card sm:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary-ink">
                  {r.rating}/5 · {r.product}
                </p>
                <blockquote className="mt-5 flex-1 font-display text-2xl leading-snug sm:text-[1.7rem]">
                  “{r.review}”
                </blockquote>
                <p className="mt-8 text-sm">
                  {r.name} <span className="text-muted-foreground">· {r.location}</span>
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
