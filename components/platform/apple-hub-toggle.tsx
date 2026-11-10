"use client"

import { useState } from "react"
import { Check, Minus } from "lucide-react"

const rows = [
  { label: "Control from your iPhone while on home WiFi", noHub: true, hub: true },
  { label: "Control your home when you are away", noHub: false, hub: true },
  { label: "Automations, like lights on when you arrive", noHub: false, hub: true },
]

/** Shows what changes when an Apple Home hub (HomePod, HomePod mini or Apple TV) is in the house. */
export function AppleHubToggle() {
  const [hub, setHub] = useState(true)

  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-card p-6 sm:p-8">
      <div role="radiogroup" aria-label="Home hub" className="mx-auto grid max-w-md grid-cols-2 rounded-full border bg-background p-1">
        {[
          { v: false, label: "No home hub" },
          { v: true, label: "With a home hub" },
        ].map((o) => (
          <button
            key={o.label}
            type="button"
            role="radio"
            aria-checked={hub === o.v}
            onClick={() => setHub(o.v)}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              hub === o.v ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      <ul className="mt-8 divide-y" aria-live="polite">
        {rows.map((r) => {
          const ok = hub ? r.hub : r.noHub
          return (
            <li key={r.label} className="flex items-center justify-between gap-4 py-4">
              <span className={ok ? "" : "text-muted-foreground"}>{r.label}</span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                  ok ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}
                aria-label={ok ? "Works" : "Does not work"}
              >
                {ok ? <Check className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
              </span>
            </li>
          )
        })}
      </ul>

      <p className="mt-4 text-sm text-muted-foreground">
        A home hub can be a HomePod, HomePod mini or Apple TV that stays at home.
      </p>
    </div>
  )
}
