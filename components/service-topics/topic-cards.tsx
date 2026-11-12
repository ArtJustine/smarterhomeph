import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { TopicIconMark } from "@/components/service-topics/topic-icon"
import type { ServiceTopic } from "@/lib/service-topics"

/** Card grid on a service page. Each card opens that device's own page. */
export function TopicCards({ serviceTitle, topics }: { serviceTitle: string; topics: ServiceTopic[] }) {
  if (topics.length === 0) return null

  return (
    <section className="container pt-12 lg:pt-16" aria-labelledby="topic-cards-heading">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-3">Learn more</p>
          <h2 id="topic-cards-heading" className="text-balance text-4xl leading-tight sm:text-5xl">
            {serviceTitle}, <span className="italic text-primary-ink">one device at a time.</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          Why it matters, how we install it, automations and answers to common questions.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/services/${t.service}/${t.slug}`}
              className="group flex h-full flex-col rounded-lg border bg-card p-6 transition-colors hover:border-foreground/40"
            >
              <div className="mb-8 flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <TopicIconMark name={t.icon} className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary-ink" />
              </div>
              <h3 className="text-2xl leading-tight">{t.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.cardBlurb}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
