"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  Camera, DoorOpen, Droplets, Fan, Lamp, Lightbulb, Lock, Plug, Radar, Router, Siren, Snowflake, Speaker, Thermometer,
  type LucideIcon,
} from "lucide-react"
import type { DeviceInfo, DeviceState, DeviceType, HomeScene } from "./scene"

// The old 2D house is only downloaded if WebGL or the 3D chunk fails.
const Fallback2D = dynamic(() => import("@/components/interactive-home").then((m) => m.InteractiveHome), { ssr: false })

const ICONS: Record<DeviceType, LucideIcon> = {
  ceiling: Lightbulb, lamp: Lamp, fan: Fan, camera: Camera, lock: Lock, contact: DoorOpen, motion: Radar, smoke: Siren,
  leak: Droplets, th: Thermometer, thermo: Thermometer, ac: Snowflake, speaker: Speaker, plug: Plug, hub: Router,
}

const TABS = [
  { room: "Living Room", label: "Living" },
  { room: "Kitchen & Dining", label: "Kitchen" },
  { room: "Master Bedroom", label: "Bedroom" },
  { room: "Bathroom", label: "Bathroom" },
  { room: "Office", label: "Office" },
  { room: "Outside", label: "Outside" },
]

const SPEEDS = ["", "Low", "Medium", "High"]
const COLORS = [0xffd9a0, 0xfff4e0, 0xcfe6ff, 0xff6fb5, 0x4f8dff, 0x4ade80, 0xa78bfa]
const hex = (c: number) => "#" + ("000000" + c.toString(16)).slice(-6)

function stateText(d: DeviceInfo, s: DeviceState): string {
  switch (d.type) {
    case "fan": return s.on ? SPEEDS[s.speed] : "Off"
    case "camera": return s.on ? "Recording" : "Off"
    case "lock": return s.on ? "Locked" : "Unlocked"
    case "contact": return s.on ? "Open" : "Closed"
    case "motion": return s.on ? "Motion detected" : "Clear"
    case "leak": return s.on ? "Leak detected" : "Dry"
    case "smoke": return s.on ? "Alarm" : "Clear"
    case "thermo": return s.on ? `${s.temp}°C` : "Off"
    case "ac": return s.on ? "Cooling" : "Off"
    case "speaker": return s.on ? "Playing" : "Paused"
    case "hub": return s.on ? "Online" : "Off"
    default: return s.on ? "On" : "Off"
  }
}

// Scenes. Anything not listed in a scene is switched off (door lock and hub stay as they are).
const ALWAYS: Record<string, Partial<DeviceState>> = {
  "lock.front_door": { on: true },
  "sensor.ha_hub": { on: true },
  "camera.front_door": { on: true },
}
type SceneDef = { name: string; note: string; on: Record<string, Partial<DeviceState>> }
const SCENES: SceneDef[] = [
  {
    name: "Morning",
    note: "Morning: ceiling lights on in the living room, kitchen and bedroom, aircon off, door stays locked.",
    on: { "light.living_room": { on: true }, "light.kitchen": { on: true }, "light.master_bedroom": { on: true } },
  },
  {
    name: "Movie night",
    note: "Movie night: ceiling lights off, floor lamp on, TV on, speaker playing, fan on low, thermostat at 24°C.",
    on: {
      "light.living_floor_lamp": { on: true },
      "fan.living_room": { on: true, speed: 1 }, "climate.thermostat": { on: true, temp: 24 },
      "media_player.living_room": { on: true }, "switch.living_tv_plug": { on: true },
    },
  },
  {
    name: "Goodnight",
    note: "Goodnight: ceiling lights off, bedside lamps on, door locked, cameras armed, bedroom aircon and fan on.",
    on: {
      "light.bedside_left": { on: true }, "light.bedside_right": { on: true },
      "camera.living_room": { on: true }, "climate.master_ac": { on: true }, "fan.master_bedroom": { on: true, speed: 1 },
      "climate.thermostat": { on: true, temp: 25 },
    },
  },
  {
    name: "Away",
    note: "Away: lights off, everything powered down, door locked, cameras armed.",
    on: { "camera.living_room": { on: true } },
  },
]

type Status = "idle" | "loading" | "ready" | "failed"

export function SmartHome3D() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HomeScene | null>(null)
  const applyingScene = useRef(false)
  const [status, setStatus] = useState<Status>("idle")
  const [devices, setDevices] = useState<DeviceInfo[]>([])
  const [, setTick] = useState(0)
  const [tab, setTab] = useState(TABS[0].room)
  const [selId, setSelId] = useState<string | null>(null)
  const [activeScene, setActiveScene] = useState<string | null>(null)
  const [clear, setClear] = useState(false)
  const [note, setNote] = useState("Tap anything. It's a demo, nothing here is connected.")

  // Load three.js only when the demo is near the viewport and the browser is idle.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const conn = (navigator as any).connection
    if (conn?.saveData || window.matchMedia("(prefers-reduced-data: reduce)").matches) {
      setStatus("failed")
      return
    }
    let cancelled = false
    let started = false
    let idle = 0
    const start = () => {
      if (started || cancelled) return
      started = true
      setStatus("loading")
      import("./scene")
        .then(({ createHomeScene }) => {
          if (cancelled || !canvasRef.current) return
          const sc = createHomeScene(canvasRef.current)
          sceneRef.current = sc
          setDevices(sc.devices)
          sc.onChange(() => {
            setTick((n) => n + 1)
            if (!applyingScene.current) setActiveScene(null)
          })
          sc.onSelect((id) => {
            setSelId(id)
            if (id) {
              const d = sc.devices.find((x) => x.id === id)
              if (d) setTab(d.room)
            }
          })
          sc.onPick((id) => {
            const d = sc.devices.find((x) => x.id === id)
            if (d && d.controllable) toggleRef.current(d)
          })
          setStatus("ready")
        })
        .catch(() => !cancelled && setStatus("failed"))
    }
    const io = new IntersectionObserver(
      (e) => {
        if (!e[0].isIntersecting) return
        io.disconnect()
        const ric = (window as any).requestIdleCallback as undefined | ((cb: () => void, o?: { timeout: number }) => number)
        if (ric) idle = ric(start, { timeout: 1500 })
        else idle = window.setTimeout(start, 400)
      },
      { rootMargin: "200px" },
    )
    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
      if (idle) {
        const cic = (window as any).cancelIdleCallback as undefined | ((n: number) => void)
        if (cic) cic(idle)
        window.clearTimeout(idle)
      }
      sceneRef.current?.dispose()
      sceneRef.current = null
    }
  }, [])

  const toggleRef = useRef<(d: DeviceInfo) => void>(() => {})
  const sc = sceneRef.current
  const get = (id: string): DeviceState => sc!.getState(id)

  const toggle = useCallback((d: DeviceInfo) => {
    const s = sceneRef.current
    if (!s) return
    const st = s.getState(d.id)
    s.setOn(d.id, !st.on)
    s.select(d.id, false)
    const after = s.getState(d.id)
    setNote(`${d.name}: ${stateText(d, after)}.`)
  }, [])

  toggleRef.current = toggle

  const applyScene = (def: SceneDef) => {
    const s = sceneRef.current
    if (!s) return
    const map: Record<string, Partial<DeviceState>> = {}
    s.devices.forEach((d) => {
      if (!d.controllable) return
      map[d.id] = { on: false }
    })
    Object.assign(map, ALWAYS, def.on)
    applyingScene.current = true
    s.applyStates(map)
    applyingScene.current = false
    s.select(null)
    setActiveScene(def.name)
    setNote(def.note)
  }

  const visible = useMemo(() => devices.filter((d) => d.room === tab && d.controllable), [devices, tab])
  const selected = devices.find((d) => d.id === selId) || null

  if (status === "failed") return <Fallback2D />

  return (
    <div ref={wrapRef} className="panel p-3 sm:p-5">
      {/* Scenes */}
      <div className="-mx-1 mb-3 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Scenes">
        <span className="eyebrow self-center pr-1">Scene</span>
        {SCENES.map((def) => (
          <button
            key={def.name}
            onClick={() => applyScene(def)}
            disabled={status !== "ready"}
            aria-pressed={activeScene === def.name}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors disabled:opacity-50 ${
              activeScene === def.name ? "border-foreground bg-foreground text-background" : "bg-background hover:border-foreground/60"
            }`}
          >
            {def.name}
          </button>
        ))}
      </div>

      {/* The 3D house. Fixed aspect ratio so nothing shifts while it loads. */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-md border bg-secondary/40 sm:aspect-[16/11]">
        <div
          ref={canvasRef}
          className="absolute inset-0"
          role="img"
          aria-label="Interactive 3D cutaway of a 108 square metre smart home with a living room, kitchen, bedroom, bathroom and office. Lights, fans, cameras, door lock, aircon and sensors react to the buttons below."
        />
        {status !== "ready" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="eyebrow animate-pulse">Loading 3D home</p>
          </div>
        )}
        {status === "ready" && (
          <div className="absolute right-2 top-2 flex gap-1.5">
            <button
              onClick={() => {
                const v = !clear
                setClear(v)
                sceneRef.current?.setWallsClear(v)
              }}
              aria-pressed={clear}
              className="rounded-full border bg-background/90 px-3 py-1 text-xs backdrop-blur hover:border-foreground/60"
            >
              {clear ? "Solid walls" : "See through"}
            </button>
            <button
              onClick={() => sceneRef.current?.focusRoom(null)}
              className="rounded-full border bg-background/90 px-3 py-1 text-xs backdrop-blur hover:border-foreground/60"
            >
              Reset view
            </button>
          </div>
        )}
      </div>

      {/* Rooms */}
      <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1" role="tablist" aria-label="Rooms">
        {TABS.map((t) => (
          <button
            key={t.room}
            role="tab"
            aria-selected={tab === t.room}
            disabled={status !== "ready"}
            onClick={() => {
              setTab(t.room)
              sceneRef.current?.focusRoom(t.room)
            }}
            className={`shrink-0 rounded-full border px-3.5 py-1 text-sm transition-colors disabled:opacity-50 ${
              tab === t.room ? "border-foreground bg-secondary" : "bg-background hover:border-foreground/60"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Devices in the selected room */}
      <div className="mt-3 grid min-h-[5.5rem] grid-cols-2 gap-2 sm:grid-cols-3">
        {status === "ready"
          ? visible.map((d) => {
              const st = get(d.id)
              const Icon = ICONS[d.type]
              return (
                <button
                  key={d.id}
                  onClick={() => toggle(d)}
                  aria-pressed={st.on}
                  className={`flex items-center gap-2.5 rounded-md border px-3 py-2 text-left transition-colors ${
                    selId === d.id ? "border-foreground" : "hover:border-foreground/60"
                  } ${st.on ? "bg-secondary" : "bg-background"}`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${st.on ? "text-primary-ink" : "text-muted-foreground"}`} aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] leading-tight">{d.name}</span>
                    <span className="block truncate font-mono text-[11px] text-muted-foreground">
                      {d.sim && !st.on ? "Simulate · " : ""}
                      {stateText(d, st)}
                    </span>
                  </span>
                </button>
              )
            })
          : null}
      </div>

      {/* Extra controls for the selected device */}
      {status === "ready" && selected && (selected.type === "fan" || selected.type === "thermo" || selected.type === "ceiling" || selected.type === "lamp") && (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm">
          <span className="eyebrow mr-1">{selected.name}</span>
          {selected.type === "fan" &&
            [1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => {
                  sceneRef.current?.setSpeed(selected.id, n)
                  setNote(`${selected.name}: ${SPEEDS[n]}.`)
                }}
                aria-pressed={get(selected.id).on && get(selected.id).speed === n}
                className={`rounded-full border px-3 py-0.5 text-xs ${
                  get(selected.id).on && get(selected.id).speed === n ? "border-foreground bg-foreground text-background" : "hover:border-foreground/60"
                }`}
              >
                {SPEEDS[n]}
              </button>
            ))}
          {selected.type === "thermo" && (
            <>
              <button
                aria-label="Lower temperature"
                onClick={() => {
                  const s = sceneRef.current!
                  s.setTemp(selected.id, get(selected.id).temp - 1)
                  setNote(`Thermostat set to ${get(selected.id).temp}°C.`)
                }}
                className="h-7 w-7 rounded-full border hover:border-foreground/60"
              >
                −
              </button>
              <span className="w-12 text-center font-mono text-xs">{get(selected.id).temp}°C</span>
              <button
                aria-label="Raise temperature"
                onClick={() => {
                  const s = sceneRef.current!
                  s.setTemp(selected.id, get(selected.id).temp + 1)
                  setNote(`Thermostat set to ${get(selected.id).temp}°C.`)
                }}
                className="h-7 w-7 rounded-full border hover:border-foreground/60"
              >
                +
              </button>
            </>
          )}
          {(selected.type === "ceiling" || selected.type === "lamp") &&
            COLORS.map((c) => (
              <button
                key={c}
                aria-label={`Light colour ${hex(c)}`}
                onClick={() => sceneRef.current?.setColor(selected.id, c)}
                style={{ background: hex(c) }}
                className={`h-6 w-6 rounded-full border-2 border-background ${
                  get(selected.id).color === c ? "ring-2 ring-foreground" : ""
                }`}
              />
            ))}
        </div>
      )}

      <p className="mt-3 min-h-[1.25rem] font-mono text-xs text-muted-foreground" aria-live="polite">
        {note}
      </p>
    </div>
  )
}
