"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { name: "Devices", href: "/devices" },
  { name: "Services", href: "/services" },
  { name: "Builder", href: "/builder" },
  { name: "Reviews", href: "/reviews" },
  { name: "Blog", href: "/blog" },
]

const platformLinks = [
  { name: "Alexa", href: "/alexa", note: "Voice-first, widest brand support" },
  { name: "Apple Home", href: "/apple-home", note: "Private, built around iPhone" },
  { name: "Google Home", href: "/google-home", note: "Routines on Android and iPhone" },
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
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [menuOpen])

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
          {navLinks.slice(0, 1).map((link) => {
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
                {active && <span className="absolute -bottom-[21px] left-0 right-0 h-px bg-foreground" />}
              </Link>
            )
          })}

          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              onMouseEnter={() => setMenuOpen(true)}
              className={`flex items-center gap-1 text-sm transition-colors hover:text-foreground ${
                menuOpen || platformLinks.some((l) => l.href === pathname) ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Platforms <ChevronDown className={`h-3.5 w-3.5 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
            </button>
            {menuOpen && (
              <div className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-4" onMouseLeave={() => setMenuOpen(false)}>
                <ul className="rounded-lg border bg-background p-2 shadow-lg">
                  {platformLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="block rounded-md px-3 py-3 transition-colors hover:bg-secondary"
                        aria-current={pathname === l.href ? "page" : undefined}
                      >
                        <span className="font-display text-xl leading-none">{l.name}</span>
                        <span className="mt-1 block text-xs text-muted-foreground">{l.note}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => {
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
              <Link href="/devices" className="border-b py-4 font-display text-2xl">
                Devices
              </Link>
              <div className="border-b py-4">
                <p className="eyebrow mb-3">Platforms</p>
                <div className="flex flex-col gap-3 pl-3">
                  {platformLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="font-display text-2xl leading-none">
                      {l.name}
                    </Link>
                  ))}
                </div>
              </div>
              {[...navLinks.slice(1), { name: "About", href: "/about" }, { name: "FAQs", href: "/faqs" }].map((link) => (
                <Link key={link.href} href={link.href} className="border-b py-4 font-display text-2xl last:border-b-0">
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
