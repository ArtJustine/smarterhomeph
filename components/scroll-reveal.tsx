"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Fades and lifts sections (and the cards inside grids) into view as the page scrolls.
 *
 * - Runs on every route, no per-page wiring needed.
 * - The first section of each page (the hero or page header) is left alone, it already animates on load.
 * - Elements are only hidden after hydration, so the page is fully readable without JS and for crawlers.
 * - Anything already on screen at load is never hidden, so there is no flash.
 * - Does nothing when the visitor prefers reduced motion.
 * - Sections that contain a form or [data-no-reveal] skip the card stagger.
 */
export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!("IntersectionObserver" in window)) return

    let observer: IntersectionObserver | undefined
    const raf = requestAnimationFrame(() => {
      const main = document.querySelector("main")
      if (!main) return

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            ;(entry.target as HTMLElement).dataset.reveal = "in"
            observer?.unobserve(entry.target)
          }
        },
        { threshold: 0, rootMargin: "0px 0px -10% 0px" },
      )

      const hide = (el: HTMLElement, delay = 0) => {
        // Already on screen: leave it visible so nothing flashes.
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return
        if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`)
        el.dataset.reveal = "out"
        observer?.observe(el)
      }

      const sections = Array.from(main.querySelectorAll<HTMLElement>(":scope > section")).slice(1)
      for (const section of sections) {
        hide(section)

        if (section.querySelector("form, [data-no-reveal]")) continue
        section.querySelectorAll<HTMLElement>(".grid").forEach((grid) => {
          const items = Array.from(grid.children).filter((c): c is HTMLElement => c instanceof HTMLElement)
          if (items.length < 2) return
          items.forEach((item, i) => hide(item, Math.min(i, 5) * 80))
        })
      }
    })

    return () => {
      cancelAnimationFrame(raf)
      observer?.disconnect()
    }
  }, [pathname])

  return null
}
