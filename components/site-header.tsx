"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { name: "Devices", href: "/devices" },
  { name: "Services", href: "/services" },
  { name: "Builder", href: "/builder" },
  { name: "Reviews", href: "/reviews" },
  { name: "Blog", href: "/blog" },
]

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className="relative top-[-1px] inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_3px_hsl(var(--primary)/0.55)]" />
      <span className="font-display text-2xl leading-none tracking-tight">Smarter Home</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">PH</span>
    </span>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background/90 backdrop-blur transition-colors ${
        scrolled || open ? "border-b" : "border-b border-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" aria-label="Smarter Home PH, home">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative text-sm transition-colors hover:text-foreground ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute -bottom-[21px] left-0 right-0 h-px bg-foreground" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden rounded-full px-5 sm:inline-flex">
            <Link href="/contact">Get a quote</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden md:hidden"
          >
            <nav className="container flex flex-col py-2" aria-label="Mobile">
              {[...navLinks, { name: "About", href: "/about" }, { name: "FAQs", href: "/faqs" }].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b py-4 font-display text-2xl last:border-b-0"
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild className="my-4 h-12 rounded-full">
                <Link href="/contact">Get a quote</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
