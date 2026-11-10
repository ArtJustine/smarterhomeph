"use client"

import { useMemo, useState } from "react"
import { Camera, DoorClosed, Lightbulb, Snowflake, Tv, type LucideIcon } from "lucide-react"

type HomeState = {
  living: boolean
  bedroom: boolean
  locked: boolean
  camera: boolean
  ac: number // 0 = off, otherwise target temp in °C
  tv: boolean
}

const AC_CYCLE = [0, 24, 25, 26, 27]

const START: HomeState = { living: true, bedroom: false, locked: true, camera: false, ac: 0, tv: false }

const SCENES: { name: string; state: HomeState; note: string }[] = [
  {
    name: "Morning",
    state: { living: true, bedroom: true, locked: true, camera: false, ac: 0, tv: false },
    note: "Morning: lights up, camera off, door stays locked.",
  },
  {
    name: "Movie night",
    state: { living: false, bedroom: false, locked: true, camera: false, ac: 24, tv: true },
    note: "Movie night: lights off, TV on, aircon at 24°C.",
  },
  {
    name: "Goodnight",
    state: { living: false, bedroom: false, locked: true, camera: true, ac: 25, tv: false },
    note: "Goodnight: lights off, door locked, camera armed, aircon at 25°C.",
  },
  {
    name: "Away",
    state: { living: false, bedroom: false, locked: true, camera: true, ac: 0, tv: false },
    note: "Away: everything off, door locked, camera armed.",
  },
]

const same = (a: HomeState, b: HomeState) => (Object.keys(a) as (keyof HomeState)[]).every((k) => a[k] === b[k])

// Rough watts for the little readout. Example numbers only.
const watts = (s: HomeState) =>
  (s.living ? 9 : 0) + (s.bedroom ? 9 : 0) + (s.tv ? 85 : 0) + (s.ac ? 650 : 0) + (s.camera ? 4 : 0)

const ink = "hsl(var(--foreground))"
const paper = "hsl(var(--card))"
const amber = "hsl(38 95% 62%)" // warm bulb colour, independent of the brand green
const brand = "hsl(var(--primary))"
const hush = "hsl(var(--muted))"

function Pill({
  x,
  y,
  w,
  label,
  on,
  onClick,
}: {
  x: number
  y: number
  w: number
  label: string
  on: boolean
  onClick: () => void
}) {
  return (
    // Mouse affordance only. Keyboard and screen reader users get the real buttons below the house.
    <g aria-hidden="true" onClick={onClick} style={{ cursor: "pointer" }} className="max-sm:hidden">
      <rect
        x={x}
        y={y}
        width={w}
        height={26}
        rx={13}
        style={{ fill: on ? amber : paper, stroke: ink, strokeWidth: 1.25, transition: "fill .3s" }}
      />
      <circle cx={x + 13} cy={y + 13} r={3.5} style={{ fill: on ? ink : "hsl(var(--muted-foreground))" }} />
      <text
        x={x + 24}
        y={y + 17}
        style={{ fill: ink, fontSize: 11, fontFamily: "var(--font-geist-mono), monospace" }}
      >
        {label}
      </text>
    </g>
  )
}

export function InteractiveHome() {
  const [s, setS] = useState<HomeState>(START)
  const [note, setNote] = useState("Tap anything. It's a demo, nothing here is connected.")

  const activeScene = useMemo(() => SCENES.find((sc) => same(sc.state, s))?.name, [s])

  const update = (patch: Partial<HomeState>, msg: string) => {
    setS((prev) => ({ ...prev, ...patch }))
    setNote(msg)
  }

  const toggleLiving = () => update({ living: !s.living }, `Living room lights ${s.living ? "off" : "on"}.`)
  const toggleBedroom = () => update({ bedroom: !s.bedroom }, `Bedroom lights ${s.bedroom ? "off" : "on"}.`)
  const toggleDoor = () =>
    update({ locked: !s.locked }, s.locked ? "Front door unlocked." : "Front door locked.")
  const toggleCamera = () => update({ camera: !s.camera }, s.camera ? "Camera disarmed." : "Camera armed.")
  const toggleTv = () => update({ tv: !s.tv }, `TV ${s.tv ? "off" : "on"}.`)
  const cycleAc = () => {
    const next = AC_CYCLE[(AC_CYCLE.indexOf(s.ac) + 1) % AC_CYCLE.length]
    update({ ac: next }, next === 0 ? "Aircon off." : `Aircon set to ${next}°C.`)
  }

  const controls: {
    key: string
    label: string
    value: string
    on: boolean
    icon: LucideIcon
    onClick: () => void
  }[] = [
    { key: "living", label: "Living lights", value: s.living ? "On" : "Off", on: s.living, icon: Lightbulb, onClick: toggleLiving },
    { key: "bedroom", label: "Bedroom lights", value: s.bedroom ? "On" : "Off", on: s.bedroom, icon: Lightbulb, onClick: toggleBedroom },
    { key: "door", label: "Front door", value: s.locked ? "Locked" : "Unlocked", on: !s.locked, icon: DoorClosed, onClick: toggleDoor },
    { key: "camera", label: "Camera", value: s.camera ? "Armed" : "Off", on: s.camera, icon: Camera, onClick: toggleCamera },
    { key: "ac", label: "Aircon", value: s.ac ? `${s.ac}°C` : "Off", on: s.ac > 0, icon: Snowflake, onClick: cycleAc },
    { key: "tv", label: "TV", value: s.tv ? "On" : "Off", on: s.tv, icon: Tv, onClick: toggleTv },
  ]

  return (
    <div className="panel p-3 sm:p-5">
      {/* Scenes */}
      <div className="-mx-1 mb-3 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Scenes">
        <span className="eyebrow self-center pr-1">Scene</span>
        {SCENES.map((sc) => (
          <button
            key={sc.name}
            onClick={() => {
              setS(sc.state)
              setNote(sc.note)
            }}
            aria-pressed={activeScene === sc.name}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
              activeScene === sc.name
                ? "border-foreground bg-foreground text-background"
                : "bg-background hover:border-foreground/60"
            }`}
          >
            {sc.name}
          </button>
        ))}
      </div>

      {/* The house */}
      <div className="overflow-hidden rounded-md border" style={{ background: "hsl(var(--background))" }}>
        <svg
          viewBox="-96 40 796 340"
          role="img"
          aria-label="Cutaway of a house with a living room and a bedroom. The lights, door lock, camera, aircon and TV react to the controls below."
          className="block h-auto w-full select-none"
        >
          <defs>
            <radialGradient id="glow-living" cx="170" cy="172" r="190" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="hsl(38 95% 70%)" stopOpacity="0.85" />
              <stop offset="1" stopColor="hsl(38 95% 70%)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="glow-bedroom" cx="420" cy="172" r="170" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="hsl(38 95% 70%)" stopOpacity="0.85" />
              <stop offset="1" stopColor="hsl(38 95% 70%)" stopOpacity="0" />
            </radialGradient>
            <clipPath id="house-clip">
              <rect x="70" y="172" width="520" height="188" />
            </clipPath>
          </defs>

          {/* ground */}
          <rect x="-96" y="360" width="796" height="20" style={{ fill: hush }} />
          <line x1="-96" y1="360" x2="700" y2="360" style={{ stroke: ink, strokeWidth: 1.5 }} />

          {/* rooms: dim when lights are off, warm when on */}
          <rect x="70" y="172" width="280" height="188" style={{ fill: s.living ? "hsl(38 80% 90%)" : "hsl(36 12% 78%)", transition: "fill .45s" }} />
          <rect x="350" y="172" width="240" height="188" style={{ fill: s.bedroom ? "hsl(38 80% 90%)" : "hsl(36 12% 78%)", transition: "fill .45s" }} />
          <g clipPath="url(#house-clip)">
            <rect x="70" y="172" width="280" height="188" fill="url(#glow-living)" style={{ opacity: s.living ? 1 : 0, transition: "opacity .45s" }} />
            <rect x="350" y="172" width="240" height="188" fill="url(#glow-bedroom)" style={{ opacity: s.bedroom ? 1 : 0, transition: "opacity .45s" }} />
            {/* floor band */}
            <rect x="70" y="340" width="520" height="20" style={{ fill: ink, opacity: 0.08 }} />
          </g>

          {/* walls */}
          <rect x="70" y="172" width="520" height="188" style={{ fill: "none", stroke: ink, strokeWidth: 2 }} />
          <line x1="350" y1="172" x2="350" y2="360" style={{ stroke: ink, strokeWidth: 1.5 }} />

          {/* roof */}
          <polygon points="50,172 330,62 610,172" style={{ fill: hush, stroke: ink, strokeWidth: 2, strokeLinejoin: "round" }} />
          <line x1="50" y1="172" x2="610" y2="172" style={{ stroke: ink, strokeWidth: 2 }} />

          {/* living room lamp */}
          <line x1="170" y1="172" x2="170" y2="196" style={{ stroke: ink, strokeWidth: 1.5 }} />
          <polygon
            points="156,210 184,210 177,196 163,196"
            style={{ fill: s.living ? amber : hush, stroke: ink, strokeWidth: 1.5, transition: "fill .3s" }}
          />
          {/* sofa */}
          <rect x="100" y="294" width="120" height="30" rx="8" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
          <rect x="92" y="308" width="136" height="32" rx="7" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
          {/* tv */}
          <rect
            x="266"
            y="268"
            width="74"
            height="44"
            rx="3"
            style={{ fill: s.tv ? "hsl(205 70% 78%)" : ink, stroke: ink, strokeWidth: 1.5, transition: "fill .3s" }}
          />
          {s.tv && (
            <g style={{ stroke: "hsl(205 70% 98%)", strokeWidth: 1.5, opacity: 0.8 }}>
              <line x1="276" y1="282" x2="326" y2="282" />
              <line x1="276" y1="292" x2="314" y2="292" />
            </g>
          )}
          <rect x="258" y="312" width="90" height="28" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />

          {/* bedroom lamp */}
          <line x1="420" y1="172" x2="420" y2="196" style={{ stroke: ink, strokeWidth: 1.5 }} />
          <polygon
            points="406,210 434,210 427,196 413,196"
            style={{ fill: s.bedroom ? amber : hush, stroke: ink, strokeWidth: 1.5, transition: "fill .3s" }}
          />
          {/* bed */}
          <rect x="372" y="290" width="14" height="50" rx="2" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
          <rect x="386" y="318" width="152" height="22" rx="4" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
          <rect x="392" y="306" width="36" height="14" rx="6" style={{ fill: hush, stroke: ink, strokeWidth: 1.5 }} />
          <rect x="436" y="318" width="102" height="22" rx="4" style={{ fill: hush, stroke: ink, strokeWidth: 1.5 }} />

          {/* aircon */}
          <rect x="512" y="204" width="72" height="22" rx="4" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
          <line x1="520" y1="218" x2="576" y2="218" style={{ stroke: ink, strokeWidth: 1.25 }} />
          {s.ac > 0 && (
            <g style={{ stroke: "hsl(205 70% 45%)", strokeWidth: 1.5, fill: "none" }} className="animate-pulse">
              <path d="M524 232c4 6-4 10 0 16" />
              <path d="M548 232c4 6-4 10 0 16" />
              <path d="M572 232c4 6-4 10 0 16" />
            </g>
          )}

          {/* front door + padlock */}
          <rect x="58" y="262" width="24" height="98" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
          <circle cx="66" cy="314" r="2.5" style={{ fill: ink }} />
          <path
            d={s.locked ? "M40 303v-6a5 5 0 0 1 10 0v6" : "M40 303v-6a5 5 0 0 1 10 0v2"}
            style={{ fill: "none", stroke: ink, strokeWidth: 1.75, strokeLinecap: "round", transition: "d .3s" }}
          />
          <rect x="35" y="303" width="20" height="16" rx="3" style={{ fill: s.locked ? ink : amber, stroke: ink, strokeWidth: 1.5, transition: "fill .3s" }} />

          {/* camera + view cone */}
          <polygon
            points="32,203 -80,150 -80,262"
            style={{ fill: brand, opacity: s.camera ? 0.2 : 0, stroke: ink, strokeWidth: 1, strokeDasharray: "4 4", transition: "opacity .35s" }}
          />
          <rect x="34" y="195" width="30" height="16" rx="3" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
          <circle cx="36" cy="203" r="4" style={{ fill: ink }} />
          {s.camera && <circle cx="56" cy="203" r="2.5" style={{ fill: "hsl(var(--destructive))" }} className="animate-pulse" />}
          <line x1="64" y1="203" x2="70" y2="203" style={{ stroke: ink, strokeWidth: 1.5 }} />

          {/* pills (mouse shortcuts) */}
          <Pill x={-90} y={116} w={124} label={`Camera · ${s.camera ? "Armed" : "Off"}`} on={s.camera} onClick={toggleCamera} />
          <Pill x={-90} y={330} w={116} label={`Door · ${s.locked ? "Locked" : "Open"}`} on={!s.locked} onClick={toggleDoor} />
          <Pill x={118} y={216} w={104} label={`Living · ${s.living ? "On" : "Off"}`} on={s.living} onClick={toggleLiving} />
          <Pill x={366} y={216} w={108} label={`Bedroom · ${s.bedroom ? "On" : "Off"}`} on={s.bedroom} onClick={toggleBedroom} />
          <Pill x={254} y={236} w={88} label={`TV · ${s.tv ? "On" : "Off"}`} on={s.tv} onClick={toggleTv} />
          <Pill x={488} y={256} w={98} label={`AC · ${s.ac ? s.ac + "°C" : "Off"}`} on={s.ac > 0} onClick={cycleAc} />
        </svg>
      </div>

      {/* Controls: the accessible version of the same switches */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {controls.map(({ key, label, value, on, icon: Icon, onClick }) => (
          <button
            key={key}
            onClick={onClick}
            aria-label={`${label}: ${value}. Activate to change.`}
            className="group flex items-center gap-3 rounded-md border bg-background px-3 py-2.5 text-left transition-colors hover:border-foreground/60"
          >
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors ${
                on ? "border-foreground bg-primary" : "bg-card"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="min-w-0">
              <span className="eyebrow block truncate">{label}</span>
              <span className="block font-display text-xl leading-tight">{value}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-col gap-1 border-t pt-3 font-mono text-[11px] text-muted-foreground sm:flex-row sm:justify-between">
        <p aria-live="polite">{note}</p>
        <p className="shrink-0 uppercase tracking-[0.1em]">≈ {watts(s)} W now (example)</p>
      </div>
    </div>
  )
}
