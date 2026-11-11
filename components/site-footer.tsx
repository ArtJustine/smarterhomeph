import Link from "next/link"

const columns = [
  {
    title: "Shop",
    links: [
      { name: "Alexa setup", href: "/alexa" },
      { name: "Apple Home setup", href: "/apple-home" },
      { name: "Google Home setup", href: "/google-home" },
      { name: "Services", href: "/services" },
    ],
  },
  {
    title: "Learn",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy policy", href: "/privacy-policy" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-16 lg:py-24">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-display text-5xl leading-[1.05] sm:text-6xl">
              Make the house<br />
              <span className="italic text-primary">do the boring stuff.</span>
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Talk to us
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:pl-12">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-background/50">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-background/80 transition-colors hover:text-primary">
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-background/15 pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-background/50 sm:flex-row sm:justify-between">
          <p>Serving Pampanga, Tarlac and Bulacan</p>
          <p>© {new Date().getFullYear()} Smarter Home PH</p>
        </div>
      </div>
    </footer>
  )
}
