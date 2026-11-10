"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mic } from "lucide-react"

const phrases = [
  {
    say: "Alexa, good night",
    does: ["Living room lights off", "Front door locked", "Aircon set to 25°C", "Camera on"],
  },
  {
    say: "Alexa, movie time",
    does: ["Living room lights dimmed", "TV on", "Aircon set to 24°C"],
  },
  {
    say: "Alexa, I'm leaving",
    does: ["All lights off", "Front door locked", "Aircon off", "Camera on"],
  },
  {
    say: "Alexa, good morning",
    does: ["Bedroom lights on, soft", "Aircon off", "Front door stays locked"],
  },
]

const bars = [0.4, 0.8, 0.55, 1, 0.65, 0.9, 0.45, 0.75, 0.5]

/** Click a phrase to see what an example Alexa routine would do. Nothing here is connected to a real home. */
export function AlexaVoiceDemo() {
  const [active, setActive] = useState(0)
  const current = phrases[active]

  return (
    <div className="rounded-xl bg-foreground p-6 text-background sm:p-8">
      <p className="eyebrow !text-background/50">Try saying</p>

      <div role="group" aria-label="Example voice commands" className="mt-4 flex flex-col gap-2">
        {phrases.map((p, i) => (
          <button
            key={p.say}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
              active === i
                ? "border-primary bg-primary/15 text-background"
                : "border-background/15 text-background/70 hover:border-background/40 hover:text-background"
            }`}
          >
            <Mic className={`h-4 w-4 shrink-0 ${active === i ? "text-primary" : ""}`} />
            <span className="font-display text-xl leading-none">&ldquo;{p.say}&rdquo;</span>
          </button>
        ))}
      </div>

      <div className="mt-6 border-t border-background/15 pt-6" aria-live="polite">
        <div className="mb-4 flex h-8 items-center gap-1" aria-hidden>
          {bars.map((h, i) => (
            <motion.span
              key={`${active}-${i}`}
              className="w-1 rounded-full bg-primary"
              initial={{ height: 4 }}
              animate={{ height: [4, 28 * h, 6, 22 * h, 4] }}
              transition={{ duration: 1.1, delay: i * 0.04, ease: "easeInOut" }}
            />
          ))}
        </div>
        <ul className="space-y-2">
          {current.does.map((d) => (
            <li key={d} className="flex items-center gap-3 text-background/90">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {d}
            </li>
          ))}
        </ul>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-wider text-background/40">
          Example routine. Nothing here is connected.
        </p>
      </div>
    </div>
  )
}
