"use client"

import { useState } from "react"
import { ArrowDown } from "lucide-react"

const starters = [
  { label: "I say “Hey Google, good night”", when: "I say “Hey Google, good night”" },
  { label: "At sunset", when: "the sun sets" },
  { label: "Weekdays at 6:30 AM", when: "it is 6:30 AM on a weekday" },
  { label: "I leave home", when: "I leave home" },
]

const actions = [
  "Turn off the lights",
  "Lock the front door",
  "Set the aircon to 25°C",
  "Turn on the porch light",
  "Turn on the camera",
]

/** Pick a starter and some actions to preview what a Google Home routine looks like. Not connected to a real home. */
export function GoogleRoutineBuilder() {
  const [starter, setStarter] = useState(0)
  const [picked, setPicked] = useState<string[]>(["Turn off the lights", "Lock the front door"])

  const toggle = (a: string) =>
    setPicked((p) => (p.includes(a) ? p.filter((x) => x !== a) : [...p, a]))

  return (
    <div className="rounded-xl border bg-card p-6 sm:p-8">
      <p className="eyebrow mb-3">1. Starter</p>
      <div role="radiogroup" aria-label="Routine starter" className="flex flex-wrap gap-2">
        {starters.map((s, i) => (
          <button
            key={s.label}
            type="button"
            role="radio"
            aria-checked={starter === i}
            onClick={() => setStarter(i)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              starter === i
                ? "border-foreground bg-foreground text-background"
                : "hover:border-foreground/50"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <p className="eyebrow mb-3 mt-7">2. Actions</p>
      <div role="group" aria-label="Routine actions" className="flex flex-wrap gap-2">
        {actions.map((a) => {
          const on = picked.includes(a)
          return (
            <button
              key={a}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(a)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                on ? "border-primary bg-primary/15 text-foreground" : "hover:border-foreground/50"
              }`}
            >
              {a}
            </button>
          )
        })}
      </div>

      <div className="mt-8 rounded-lg bg-secondary/70 p-5" aria-live="polite">
        <p className="eyebrow mb-2">Your routine</p>
        <p className="font-display text-2xl leading-tight">When {starters[starter].when}</p>
        <ArrowDown className="my-3 h-4 w-4 text-primary-ink" aria-hidden />
        {picked.length === 0 ? (
          <p className="text-muted-foreground">Pick at least one action.</p>
        ) : (
          <ul className="space-y-1.5">
            {picked.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {p}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Preview only. Nothing here is connected.
        </p>
      </div>
    </div>
  )
}
