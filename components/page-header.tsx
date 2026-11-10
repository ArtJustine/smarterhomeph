import type { ReactNode } from "react"

interface PageHeaderProps {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  children?: ReactNode
}

/** Plain editorial page header: small label, big serif title, optional intro. No hero image. */
export function PageHeader({ eyebrow, title, intro, children }: PageHeaderProps) {
  return (
    <section className="border-b">
      <div className="container grid gap-8 pb-12 pt-14 md:pb-16 md:pt-20 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
          <h1 className="text-balance text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">{title}</h1>
        </div>
        {(intro || children) && (
          <div className="lg:col-span-4">
            {intro && <p className="max-w-sm leading-relaxed text-muted-foreground">{intro}</p>}
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
