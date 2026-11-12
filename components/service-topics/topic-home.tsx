"use client"

import { useMemo, useState } from "react"
import {
  AudioLines,
  Blinds,
  Bot,
  Camera,
  Cast,
  CircleDot,
  Cpu,
  DoorOpen,
  Droplet,
  Droplets,
  Fan,
  Frame,
  Lightbulb,
  Lock,
  Mic,
  PawPrint,
  Plug,
  PlugZap,
  Radar,
  Rainbow,
  Snowflake,
  Sparkles,
  Speaker,
  Tablet,
  Thermometer,
  Tv,
  User,
  Users,
  Wind,
  type LucideIcon,
} from "lucide-react"
import type { ServiceTopic } from "@/lib/service-topics"
import { START_STATE, homeDemos, type DeviceKey, type HomeDemo, type HomeState } from "@/lib/service-topics/home-demos"

const ink = "hsl(var(--foreground))"
const paper = "hsl(var(--card))"
const amber = "hsl(38 95% 62%)"
const brand = "hsl(var(--primary))"
const hush = "hsl(var(--muted))"
const sky = "hsl(205 70% 90%)"
const alertRed = "hsl(var(--destructive))"

const TONES = ["Warm", "Daylight", "Dim"]
const FAN_NAMES = ["Off", "Low", "Medium", "High"]
const STRIP_NAMES = ["Off", "Warm", "Blue", "Green"]
const STRIP_COLORS = ["transparent", "hsl(38 95% 62%)", "hsl(205 85% 60%)", "hsl(160 62% 42%)"]
const ACCENT_NAMES = ["Off", "Spotlights", "Cove glow"]
const AC_CYCLE = [0, 24, 25, 26]
const TEMP_CYCLE = [27, 29, 31]

type Box = [number, number, number, number]

const roomTemp = (s: HomeState) => Math.round(s.temp - (s.ac ? 4 : 0) - s.fan * 0.5)

interface Meta {
  label: string
  icon: LucideIcon
  boxes: (d: HomeDemo) => Box[]
  value: (s: HomeState, d: HomeDemo) => string
  on: (s: HomeState) => boolean
  act: (s: HomeState, d: HomeDemo) => { patch: Partial<HomeState>; msg: string }
}

const has = (d: HomeDemo, k: DeviceKey) => d.devices.includes(k)

const meta: Record<DeviceKey, Meta> = {
  living: {
    label: "Living light",
    icon: Lightbulb,
    boxes: (d) => [[146, 190, 48, 28], ...(d.switches ? ([[88, 240, 22, 28]] as Box[]) : [])],
    value: (s, d) => (!s.living ? "Off" : d.tones ? TONES[s.tone] : "On"),
    on: (s) => s.living,
    act: (s, d) => {
      if (d.tones) {
        if (!s.living) return { patch: { living: true, tone: 0 }, msg: "Living light on, warm white." }
        if (s.tone < 2) return { patch: { tone: s.tone + 1 }, msg: `Living light set to ${TONES[s.tone + 1].toLowerCase()}.` }
        return { patch: { living: false }, msg: "Living light off." }
      }
      return { patch: { living: !s.living }, msg: `Living light ${s.living ? "off" : "on"}.` }
    },
  },
  bedroom: {
    label: "Bedroom light",
    icon: Lightbulb,
    boxes: (d) => [[396, 190, 48, 28], ...(d.switches ? ([[352, 240, 22, 28]] as Box[]) : [])],
    value: (s) => (s.bedroom ? "On" : "Off"),
    on: (s) => s.bedroom,
    act: (s) => ({ patch: { bedroom: !s.bedroom }, msg: `Bedroom light ${s.bedroom ? "off" : "on"}.` }),
  },
  porch: {
    label: "Porch light",
    icon: Lightbulb,
    boxes: () => [[22, 230, 30, 28]],
    value: (s) => (s.porch ? "On" : "Off"),
    on: (s) => s.porch,
    act: (s) => ({ patch: { porch: !s.porch }, msg: `Porch light ${s.porch ? "off" : "on"}.` }),
  },
  doorSensor: {
    label: "Front door",
    icon: DoorOpen,
    boxes: () => [[52, 250, 36, 112]],
    value: (s) => (s.doorOpen ? "Open" : "Closed"),
    on: (s) => s.doorOpen,
    act: (s) =>
      s.doorOpen
        ? { patch: { doorOpen: false, alert: "" }, msg: "Door closed. The sensor reports closed." }
        : { patch: { doorOpen: true, alert: "Front door opened" }, msg: "Door opened. Your phone gets an alert." },
  },
  windowSensor: {
    label: "Bedroom window",
    icon: Frame,
    boxes: () => [[440, 182, 60, 52]],
    value: (s) => (s.windowOpen ? "Open" : "Closed"),
    on: (s) => s.windowOpen,
    act: (s, d) => {
      if (s.windowOpen) return { patch: { windowOpen: false, alert: "" }, msg: "Window closed." }
      return {
        patch: { windowOpen: true, alert: "Bedroom window opened", ...(has(d, "ac") && s.ac ? { ac: 0 } : {}) },
        msg: has(d, "ac") && s.ac ? "Window opened. The aircon pauses and you get an alert." : "Window opened. Your phone gets an alert.",
      }
    },
  },
  lock: {
    label: "Smart lock",
    icon: Lock,
    boxes: () => [[28, 290, 34, 34]],
    value: (s) => (s.locked ? "Locked" : "Unlocked"),
    on: (s) => !s.locked,
    act: (s) =>
      s.locked
        ? { patch: { locked: false, alert: "Door unlocked with a family code" }, msg: "Unlocked with a family code. The lock logs who it was." }
        : { patch: { locked: true, alert: "" }, msg: "Door locked." },
  },
  camera: {
    label: "Camera",
    icon: Camera,
    boxes: () => [[26, 190, 46, 28]],
    value: (s) => (s.camera ? "Armed" : "Off"),
    on: (s) => s.camera,
    act: (s) => ({ patch: { camera: !s.camera }, msg: s.camera ? "Camera off." : "Camera armed and recording." }),
  },
  visitor: {
    label: "Person at the gate",
    icon: User,
    boxes: () => [[-74, 292, 48, 70]],
    value: (s) => (s.visitor ? "Here" : "None"),
    on: (s) => s.visitor,
    act: (s, d) => {
      if (s.visitor) return { patch: { visitor: false, alert: "" }, msg: "The person leaves." }
      if (!s.camera) return { patch: { visitor: true }, msg: "Someone is at the gate. The camera is off, so nobody is told." }
      return {
        patch: { visitor: true, alert: "Person at the gate", ...(has(d, "porch") ? { porch: true } : {}) },
        msg: "The camera sees a person. You get an alert and the porch light comes on.",
      }
    },
  },
  motion: {
    label: "Motion sensor",
    icon: Radar,
    boxes: () => [[72, 178, 60, 34]],
    value: (s) => (s.motion ? "Detected" : "Clear"),
    on: (s) => s.motion,
    act: (s, d) =>
      s.motion
        ? { patch: { motion: false }, msg: "Motion clear." }
        : { patch: { motion: true, ...(has(d, "living") ? { living: true } : {}) }, msg: "Motion detected. The light comes on." },
  },
  presence: {
    label: "Presence sensor",
    icon: Users,
    boxes: () => [[88, 174, 130, 170]],
    value: (s) => (s.present ? "Occupied" : "Empty"),
    on: (s) => s.present,
    act: (s, d) =>
      s.present
        ? { patch: { present: false, living: false, ...(has(d, "ac") ? { ac: 0 } : {}) }, msg: "Room empty for a while. Light and aircon turn off." }
        : { patch: { present: true, living: true }, msg: "Someone sits down. The light stays on while they are there." },
  },
  leak: {
    label: "Leak sensor",
    icon: Droplets,
    boxes: () => [[106, 284, 104, 66]],
    value: (s) => (s.leak ? "Water found" : "Dry"),
    on: (s) => s.leak,
    act: (s) =>
      s.leak
        ? { patch: { leak: false, alert: "" }, msg: "Leak fixed. The sensor is dry again." }
        : { patch: { leak: true, alert: "Water under the kitchen sink" }, msg: "Water under the sink. Your phone gets an urgent alert." },
  },
  ac: {
    label: "Aircon",
    icon: Snowflake,
    boxes: () => [[506, 200, 84, 30]],
    value: (s) => (s.ac ? `${s.ac}°C` : "Off"),
    on: (s) => s.ac > 0,
    act: (s) => {
      const next = AC_CYCLE[(AC_CYCLE.indexOf(s.ac) + 1) % AC_CYCLE.length]
      return { patch: { ac: next }, msg: next === 0 ? "Aircon off." : `Aircon set to ${next}°C.` }
    },
  },
  fan: {
    label: "Fan",
    icon: Fan,
    boxes: () => [[90, 174, 80, 22]],
    value: (s) => FAN_NAMES[s.fan],
    on: (s) => s.fan > 0,
    act: (s) => {
      const next = (s.fan + 1) % 4
      return { patch: { fan: next }, msg: next === 0 ? "Fan off." : `Fan on ${FAN_NAMES[next].toLowerCase()}.` }
    },
  },
  temp: {
    label: "Room temperature",
    icon: Thermometer,
    boxes: () => [[350, 194, 38, 42]],
    value: (s) => `${roomTemp(s)}°C`,
    on: (s) => roomTemp(s) >= 30,
    act: (s) => {
      const next = TEMP_CYCLE[(TEMP_CYCLE.indexOf(s.temp) + 1) % TEMP_CYCLE.length]
      return { patch: { temp: next }, msg: `The room is ${next >= 31 ? "getting hot" : next <= 27 ? "cooler" : "warm"}.` }
    },
  },
  curtains: {
    label: "Curtains",
    icon: Blinds,
    boxes: () => [[232, 178, 112, 58]],
    value: (s) => (s.curtains ? "Open" : "Closed"),
    on: (s) => s.curtains,
    act: (s) => ({ patch: { curtains: !s.curtains }, msg: s.curtains ? "Curtains closing." : "Curtains opening." }),
  },
  hub: {
    label: "Internet",
    icon: Cpu,
    boxes: () => [[100, 216, 40, 24]],
    value: (s) => (s.internet ? "Online" : "Down"),
    on: (s) => !s.internet,
    act: (s) =>
      s.internet
        ? { patch: { internet: false }, msg: "Internet is down. Everything linked to the hub still works. Try the lights." }
        : { patch: { internet: true }, msg: "Back online." },
  },
  button: {
    label: "Goodnight button",
    icon: CircleDot,
    boxes: () => [[86, 238, 26, 26]],
    value: () => "Press",
    on: () => false,
    act: (_s, d) => ({
      patch: {
        living: false,
        locked: true,
        ...(has(d, "tv") ? { tv: false } : {}),
        ...(has(d, "curtains") ? { curtains: false } : {}),
      },
      msg: "One press: lights off, door locked, TV off, curtains closed.",
    }),
  },
  voice: {
    label: "Voice",
    icon: Mic,
    boxes: () => [[108, 208, 34, 36]],
    value: (s) => (s.voice ? "Listening" : "Idle"),
    on: (s) => s.voice,
    act: (s, d) =>
      s.voice
        ? {
            patch: { voice: false, living: true, alert: "" },
            msg: "Good morning. Lights on.",
          }
        : {
            patch: { voice: true, living: false, locked: true, ...(has(d, "tv") ? { tv: false } : {}) },
            msg: "Goodnight. Lights off and the door locks.",
          },
  },
  panel: {
    label: "Wall panel",
    icon: Tablet,
    boxes: () => [[92, 220, 46, 60]],
    value: (s) => (s.panelDim ? "Dimmed" : "Awake"),
    on: (s) => !s.panelDim,
    act: (s) => ({ patch: { panelDim: !s.panelDim }, msg: s.panelDim ? "Panel wakes up." : "Panel dims for the night." }),
  },
  speakers: {
    label: "Music",
    icon: Speaker,
    boxes: () => [
      [108, 208, 34, 36],
      [350, 296, 34, 48],
    ],
    value: (s) => (s.speakers ? "Playing" : "Off"),
    on: (s) => s.speakers,
    act: (s) => ({ patch: { speakers: !s.speakers }, msg: s.speakers ? "Music stops in every room." : "Music plays in both rooms, in sync." }),
  },
  tv: {
    label: "TV",
    icon: Tv,
    boxes: () => [[262, 264, 84, 50]],
    value: (s) => (s.tv ? "On" : "Off"),
    on: (s) => s.tv,
    act: (s, d) => {
      if (!s.tv && has(d, "powerstrip") && !s.power) return { patch: {}, msg: "No power to the TV. The strip is off." }
      return { patch: { tv: !s.tv, ...(s.tv ? { streaming: false } : {}) }, msg: `TV ${s.tv ? "off" : "on"}.` }
    },
  },
  soundbar: {
    label: "Soundbar",
    icon: AudioLines,
    boxes: () => [[262, 314, 56, 14]],
    value: (s) => (s.soundbar ? "On" : "Off"),
    on: (s) => s.soundbar,
    act: (s, d) => {
      if (!s.soundbar && has(d, "powerstrip") && !s.power) return { patch: {}, msg: "No power to the soundbar. The strip is off." }
      return { patch: { soundbar: !s.soundbar }, msg: `Soundbar ${s.soundbar ? "off" : "on"}.` }
    },
  },
  streaming: {
    label: "Streaming box",
    icon: Cast,
    boxes: () => [[318, 326, 30, 14]],
    value: (s) => (s.streaming ? "Playing" : "Off"),
    on: (s) => s.streaming,
    act: (s) => (s.streaming ? { patch: { streaming: false }, msg: "Streaming stopped." } : { patch: { streaming: true, tv: true }, msg: "TV and streaming box start together." }),
  },
  strip: {
    label: "Light strip",
    icon: Rainbow,
    boxes: () => [[96, 220, 140, 46]],
    value: (s) => STRIP_NAMES[s.strip],
    on: (s) => s.strip > 0,
    act: (s) => {
      const next = (s.strip + 1) % 4
      return { patch: { strip: next }, msg: next === 0 ? "Light strip off." : `Light strip set to ${STRIP_NAMES[next].toLowerCase()}.` }
    },
  },
  accent: {
    label: "Accent lights",
    icon: Sparkles,
    boxes: () => [[96, 172, 160, 92]],
    value: (s) => ACCENT_NAMES[s.accent],
    on: (s) => s.accent > 0,
    act: (s) => {
      const next = (s.accent + 1) % 3
      return { patch: { accent: next }, msg: next === 0 ? "Accent lights off." : `Accent lights: ${ACCENT_NAMES[next].toLowerCase()}.` }
    },
  },
  plug: {
    label: "Lamp on a smart plug",
    icon: Plug,
    boxes: () => [[226, 286, 54, 58]],
    value: (s) => (s.plug ? "On" : "Off"),
    on: (s) => s.plug,
    act: (s) => ({ patch: { plug: !s.plug, alert: "" }, msg: s.plug ? "Plug off. The lamp goes dark." : "Plug on. An ordinary lamp, now on from your phone." }),
  },
  powerstrip: {
    label: "TV area strip",
    icon: PlugZap,
    boxes: () => [[256, 338, 86, 16]],
    value: (s) => (s.power ? "On" : "Off"),
    on: (s) => s.power,
    act: (s) =>
      s.power
        ? { patch: { power: false, tv: false, soundbar: false }, msg: "Strip off. The TV and soundbar lose power." }
        : { patch: { power: true, alert: "" }, msg: "Strip on. Your devices can start again." },
  },
  feeder: {
    label: "Dog feeder",
    icon: PawPrint,
    boxes: () => [[386, 286, 44, 58]],
    value: (s) => (s.feeder ? "Served" : "Waiting"),
    on: (s) => s.feeder,
    act: (s) =>
      s.feeder
        ? { patch: { feeder: false, alert: "" }, msg: "Bowl is empty again. Ready for the next meal." }
        : { patch: { feeder: true, alert: "Meal served" }, msg: "Meal served on schedule. Your phone gets a notice." },
  },
  humidifier: {
    label: "Humidifier",
    icon: Droplet,
    boxes: () => [[348, 262, 40, 82]],
    value: (s) => (s.humidifier ? "On" : "Off"),
    on: (s) => s.humidifier,
    act: (s) => ({ patch: { humidifier: !s.humidifier }, msg: s.humidifier ? "Humidifier off. Humidity is in range." : "Air is dry. The humidifier starts." }),
  },
  purifier: {
    label: "Air purifier",
    icon: Wind,
    boxes: () => [[230, 270, 32, 74]],
    value: (s) => (s.purifier ? "On" : "Off"),
    on: (s) => s.purifier,
    act: (s) => ({ patch: { purifier: !s.purifier }, msg: s.purifier ? "Purifier off. Dust builds up again." : "Purifier on. The air clears." }),
  },
  vacuum: {
    label: "Robot vacuum",
    icon: Bot,
    boxes: () => [[380, 334, 210, 28]],
    value: (s) => (s.vacuum ? "Cleaning" : "Docked"),
    on: (s) => s.vacuum,
    act: (s) => ({ patch: { vacuum: !s.vacuum }, msg: s.vacuum ? "Vacuum back on its dock." : "Vacuum started cleaning." }),
  },
}

/** Where the little label sits for each speech bubble, kept short so it never leaves the house. */
function voiceLine(s: HomeState) {
  if (s.tv) return "Alexa, movie time"
  if (s.alert) return "Alexa, is the house locked?"
  return s.living ? "Alexa, good morning" : "Alexa, goodnight"
}

export function TopicHome({ topic }: { topic: ServiceTopic }) {
  const demo = homeDemos[topic.slug]

  const base = useMemo<HomeState>(() => ({ ...START_STATE, ...(demo?.start ?? {}) }), [demo])
  const [s, setS] = useState<HomeState>(base)
  const [scene, setScene] = useState<number | null>(null)
  const [touched, setTouched] = useState(false)
  const [note, setNote] = useState("Tap a device in the house, or run one of the automations. It's a demo, nothing here is connected.")

  if (!demo) return null

  const runScene = (i: number) => {
    setS({ ...base, ...demo.scenarios[i] })
    setScene(i)
    setTouched(true)
    setNote(topic.automations[i].body)
  }

  const run = (key: DeviceKey) => {
    const { patch, msg } = meta[key].act(s, demo)
    let next: HomeState = { ...s, ...patch }
    let message = msg
    if (demo.autoFan && "temp" in patch) {
      if (next.temp >= 31 && next.fan === 0) {
        next = { ...next, fan: 2 }
        message += " The fan turns on by itself."
      } else if (next.temp < 31 && next.fan > 0) {
        next = { ...next, fan: 0 }
        message += " The fan turns off."
      }
    }
    setS(next)
    setScene(null)
    setTouched(true)
    setNote(message)
  }

  const d = (k: DeviceKey) => has(demo, k)
  const livingFill = s.living ? (s.tone === 1 ? "hsl(200 55% 94%)" : "hsl(38 80% 90%)") : "hsl(36 12% 78%)"
  const livingGlow = s.tone === 1 ? "hsl(200 90% 82%)" : "hsl(38 95% 70%)"
  const livingGlowOpacity = s.living ? (s.tone === 2 ? 0.45 : 1) : 0
  const lampFill = s.living ? (s.tone === 1 ? "hsl(200 85% 85%)" : amber) : hush
  const stripColor = STRIP_COLORS[s.strip]
  const hubDevices = demo.devices.filter((k) => k !== "hub")
  const center = (k: DeviceKey): [number, number] => {
    const [x, y, w, h] = meta[k].boxes(demo)[0]
    return [x + w / 2, y + h / 2]
  }
  const alertWidth = Math.round(26 + s.alert.length * 6.4)

  return (
    <div className="panel p-3 sm:p-5">
      {/* Automations from this page, one tap each */}
      <div className="-mx-1 mb-3 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Automations">
        <span className="eyebrow self-center pr-1">Run</span>
        {topic.automations.map((a, i) => (
          <button
            key={a.title}
            onClick={() => runScene(i)}
            aria-pressed={scene === i}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
              scene === i ? "border-foreground bg-foreground text-background" : "bg-background hover:border-foreground/60"
            }`}
          >
            {a.title}
          </button>
        ))}
        <button
          onClick={() => {
            setS(base)
            setScene(null)
            setTouched(false)
            setNote("Back to the start.")
          }}
          className="shrink-0 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Reset
        </button>
      </div>

      <div className="overflow-hidden rounded-md border" style={{ background: "hsl(var(--background))" }}>
        <svg
          viewBox="-96 40 796 340"
          role="img"
          aria-label={`Cutaway of a house showing ${topic.name.toLowerCase()}. Use the controls below the picture to try it.`}
          className="block h-auto w-full select-none"
        >
          <defs>
            <radialGradient id="th-glow-living" cx="170" cy="172" r="190" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor={livingGlow} stopOpacity="0.85" />
              <stop offset="1" stopColor={livingGlow} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="th-glow-bedroom" cx="420" cy="172" r="170" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="hsl(38 95% 70%)" stopOpacity="0.85" />
              <stop offset="1" stopColor="hsl(38 95% 70%)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="th-glow-porch" cx="35" cy="245" r="46" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="hsl(38 95% 70%)" stopOpacity="0.8" />
              <stop offset="1" stopColor="hsl(38 95% 70%)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="th-cove" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="hsl(38 95% 66%)" stopOpacity="0.9" />
              <stop offset="1" stopColor="hsl(38 95% 66%)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="th-spot" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="hsl(38 95% 70%)" stopOpacity="0.7" />
              <stop offset="1" stopColor="hsl(38 95% 70%)" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="th-stripfade" x1="0" y1="0" x2="0" y2="1" style={{ color: stripColor }}>
              <stop offset="0" stopColor="currentColor" stopOpacity="0.55" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
            <clipPath id="th-house-clip">
              <rect x="70" y="172" width="520" height="188" />
            </clipPath>
          </defs>

          {/* ground */}
          <rect x="-96" y="360" width="796" height="20" style={{ fill: hush }} />
          <line x1="-96" y1="360" x2="700" y2="360" style={{ stroke: ink, strokeWidth: 1.5 }} />

          {/* rooms */}
          <rect x="70" y="172" width="280" height="188" style={{ fill: livingFill, transition: "fill .45s" }} />
          <rect x="350" y="172" width="240" height="188" style={{ fill: s.bedroom ? "hsl(38 80% 90%)" : "hsl(36 12% 78%)", transition: "fill .45s" }} />
          <g clipPath="url(#th-house-clip)">
            <rect x="70" y="172" width="280" height="188" fill="url(#th-glow-living)" style={{ opacity: livingGlowOpacity, transition: "opacity .45s" }} />
            <rect x="350" y="172" width="240" height="188" fill="url(#th-glow-bedroom)" style={{ opacity: s.bedroom ? 1 : 0, transition: "opacity .45s" }} />
            <rect x="70" y="340" width="520" height="20" style={{ fill: ink, opacity: 0.08 }} />
            {/* cove glow along the living room ceiling */}
            {d("accent") && <rect x="70" y="173" width="280" height="34" fill="url(#th-cove)" style={{ opacity: s.accent === 2 ? 1 : 0, transition: "opacity .45s" }} />}
          </g>

          {/* walls */}
          <rect x="70" y="172" width="520" height="188" style={{ fill: "none", stroke: ink, strokeWidth: 2 }} />
          <line x1="350" y1="172" x2="350" y2="360" style={{ stroke: ink, strokeWidth: 1.5 }} />

          {/* roof */}
          <polygon points="50,172 330,62 610,172" style={{ fill: hush, stroke: ink, strokeWidth: 2, strokeLinejoin: "round" }} />
          <line x1="50" y1="172" x2="610" y2="172" style={{ stroke: ink, strokeWidth: 2 }} />

          {/* ceiling lights, always there */}
          <line x1="170" y1="172" x2="170" y2="196" style={{ stroke: ink, strokeWidth: 1.5 }} />
          <polygon points="156,210 184,210 177,196 163,196" style={{ fill: lampFill, stroke: ink, strokeWidth: 1.5, transition: "fill .3s" }} />
          <line x1="420" y1="172" x2="420" y2="196" style={{ stroke: ink, strokeWidth: 1.5 }} />
          <polygon points="406,210 434,210 427,196 413,196" style={{ fill: s.bedroom ? amber : hush, stroke: ink, strokeWidth: 1.5, transition: "fill .3s" }} />

          {/* furniture */}
          {!demo.hide?.includes("sofa") && (
            <g>
              <rect x="100" y="294" width="120" height="30" rx="8" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <rect x="92" y="308" width="136" height="32" rx="7" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
            </g>
          )}
          {!demo.hide?.includes("bed") && (
            <g>
              <rect x="372" y="290" width="14" height="50" rx="2" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <rect x="386" y="318" width="152" height="22" rx="4" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <rect x="392" y="306" width="36" height="14" rx="6" style={{ fill: hush, stroke: ink, strokeWidth: 1.5 }} />
              <rect x="436" y="318" width="102" height="22" rx="4" style={{ fill: hush, stroke: ink, strokeWidth: 1.5 }} />
            </g>
          )}

          {/* front door, always drawn. Opens when the door sensor is triggered. */}
          <rect x="58" y="262" width="24" height="98" style={{ fill: s.doorOpen ? ink : paper, opacity: s.doorOpen ? 0.25 : 1, stroke: ink, strokeWidth: 1.5 }} />
          {s.doorOpen ? (
            <polygon points="58,262 70,267 70,356 58,360" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
          ) : (
            <circle cx="66" cy="314" r="2.5" style={{ fill: ink }} />
          )}

          {/* wall switches */}
          {demo.switches && (
            <g>
              {[
                { x: 92, on: s.living },
                { x: 356, on: s.bedroom },
              ].map((sw) => (
                <g key={sw.x}>
                  <rect x={sw.x} y="244" width="14" height="22" rx="2" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
                  <rect x={sw.x + 3} y={sw.on ? 247 : 256} width="8" height="8" rx="1.5" style={{ fill: sw.on ? amber : hush, stroke: ink, strokeWidth: 1, transition: "all .25s" }} />
                </g>
              ))}
            </g>
          )}

          {/* ---------- devices ---------- */}

          {/* porch light */}
          {d("porch") && (
            <g>
              <circle cx="35" cy="245" r="46" fill="url(#th-glow-porch)" style={{ opacity: s.porch ? 1 : 0, transition: "opacity .35s" }} />
              <rect x="28" y="238" width="14" height="14" rx="3" style={{ fill: s.porch ? amber : paper, stroke: ink, strokeWidth: 1.5, transition: "fill .3s" }} />
              <line x1="42" y1="245" x2="58" y2="245" style={{ stroke: ink, strokeWidth: 1.5 }} />
            </g>
          )}

          {/* door contact sensor */}
          {d("doorSensor") && (
            <g>
              <rect x="60" y="254" width="20" height="5" rx="1.5" style={{ fill: paper, stroke: ink, strokeWidth: 1.25 }} />
              <circle cx="70" cy="256.5" r="1.6" style={{ fill: s.doorOpen ? alertRed : ink }} className={s.doorOpen ? "animate-pulse" : undefined} />
            </g>
          )}

          {/* smart lock */}
          {d("lock") && (
            <g>
              <path
                d={s.locked ? "M40 303v-6a5 5 0 0 1 10 0v6" : "M40 303v-6a5 5 0 0 1 10 0v2"}
                style={{ fill: "none", stroke: ink, strokeWidth: 1.75, strokeLinecap: "round" }}
              />
              <rect x="35" y="303" width="20" height="16" rx="3" style={{ fill: s.locked ? ink : amber, stroke: ink, strokeWidth: 1.5, transition: "fill .3s" }} />
              <circle cx="45" cy="311" r="2" style={{ fill: s.locked ? paper : ink }} />
            </g>
          )}

          {/* camera and view cone */}
          {d("camera") && (
            <g>
              <polygon
                points="32,203 -80,150 -80,262"
                style={{ fill: brand, opacity: s.camera ? 0.2 : 0, stroke: ink, strokeWidth: 1, strokeDasharray: "4 4", transition: "opacity .35s" }}
              />
              <rect x="34" y="195" width="30" height="16" rx="3" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <circle cx="36" cy="203" r="4" style={{ fill: ink }} />
              {s.camera && <circle cx="56" cy="203" r="2.5" style={{ fill: alertRed }} className="animate-pulse" />}
              <line x1="64" y1="203" x2="70" y2="203" style={{ stroke: ink, strokeWidth: 1.5 }} />
            </g>
          )}

          {/* visitor at the gate */}
          {d("visitor") && s.visitor && (
            <g style={{ stroke: ink, strokeWidth: 2.5, strokeLinecap: "round", fill: "none" }}>
              <circle cx="-48" cy="312" r="8" style={{ fill: paper }} />
              <line x1="-48" y1="320" x2="-48" y2="344" />
              <line x1="-48" y1="328" x2="-60" y2="338" />
              <line x1="-48" y1="328" x2="-36" y2="338" />
              <line x1="-48" y1="344" x2="-56" y2="360" />
              <line x1="-48" y1="344" x2="-40" y2="360" />
            </g>
          )}

          {/* motion sensor */}
          {d("motion") && (
            <g>
              <rect x="76" y="184" width="16" height="12" rx="3" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <circle cx="87" cy="190" r="2.5" style={{ fill: s.motion ? alertRed : ink }} className={s.motion ? "animate-pulse" : undefined} />
              {s.motion && (
                <g style={{ stroke: "hsl(38 90% 45%)", strokeWidth: 1.75, fill: "none", strokeLinecap: "round" }} className="animate-pulse">
                  <path d="M98 186c7 2 11 7 11 12" />
                  <path d="M103 180c11 3 17 11 17 22" />
                  <path d="M108 174c15 4 24 15 24 32" />
                </g>
              )}
            </g>
          )}

          {/* presence sensor and a person on the sofa */}
          {d("presence") && (
            <g>
              <rect x="186" y="173" width="20" height="8" rx="4" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <circle cx="196" cy="177" r="1.8" style={{ fill: s.present ? brand : ink }} />
              {s.present && (
                <g>
                  <path d="M170 186c10 8 16 8 26 0M158 192c14 12 34 12 48 0" style={{ fill: "none", stroke: brand, strokeWidth: 1.5, strokeLinecap: "round" }} className="animate-pulse" />
                  <circle cx="160" cy="278" r="8" style={{ fill: paper, stroke: ink, strokeWidth: 1.75 }} />
                  <path d="M160 286v14M160 292l-10 8M160 292l10 6" style={{ fill: "none", stroke: ink, strokeWidth: 2.5, strokeLinecap: "round" }} />
                </g>
              )}
            </g>
          )}

          {/* window with a contact sensor (bedroom) */}
          {d("windowSensor") && (
            <g>
              <rect x="446" y="188" width="48" height="40" style={{ fill: sky, stroke: ink, strokeWidth: 1.5 }} />
              <line x1="470" y1="188" x2="470" y2="228" style={{ stroke: ink, strokeWidth: 1 }} />
              {s.windowOpen && (
                <g>
                  <rect x="470" y="189" width="23" height="38" style={{ fill: "hsl(var(--background))" }} />
                  <polygon points="470,188 486,194 486,222 470,228" style={{ fill: sky, stroke: ink, strokeWidth: 1.25 }} />
                  <path d="M498 200c8 0 10 6 18 6M498 212c8 0 10 6 18 6" style={{ fill: "none", stroke: "hsl(205 70% 45%)", strokeWidth: 1.5, strokeLinecap: "round" }} className="animate-pulse" />
                </g>
              )}
              <rect x="462" y="226" width="16" height="5" rx="1.5" style={{ fill: paper, stroke: ink, strokeWidth: 1.25 }} />
              <circle cx="470" cy="228.5" r="1.6" style={{ fill: s.windowOpen ? alertRed : ink }} className={s.windowOpen ? "animate-pulse" : undefined} />
            </g>
          )}

          {/* leak: open sink cabinet, pipe, drip and puddle */}
          {d("leak") && (
            <g>
              <rect x="108" y="286" width="96" height="8" rx="2" style={{ fill: hush, stroke: ink, strokeWidth: 1.5 }} />
              <rect x="112" y="294" width="88" height="46" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <path d="M126 294v14h30v14" style={{ fill: "none", stroke: ink, strokeWidth: 4, strokeLinejoin: "round" }} />
              <path d="M150 286v-18c0-6 4-8 9-8h8v8" style={{ fill: "none", stroke: ink, strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }} />
              {s.leak ? (
                <g>
                  <circle cx="156" r="3" style={{ fill: "hsl(205 80% 55%)" }}>
                    <animate attributeName="cy" values="326;342;326" dur="1.1s" repeatCount="indefinite" />
                  </circle>
                  <ellipse cx="158" cy="346" rx="44" ry="5" style={{ fill: "hsl(205 80% 55%)", opacity: 0.55 }} className="animate-pulse" />
                </g>
              ) : null}
              <rect x="174" y="334" width="16" height="5" rx="2" style={{ fill: paper, stroke: ink, strokeWidth: 1.25 }} />
              <circle cx="182" cy="336.5" r="1.5" style={{ fill: s.leak ? alertRed : ink }} className={s.leak ? "animate-pulse" : undefined} />
            </g>
          )}

          {/* aircon */}
          {d("ac") && (
            <g>
              <rect x="512" y="204" width="72" height="22" rx="4" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <line x1="520" y1="218" x2="576" y2="218" style={{ stroke: ink, strokeWidth: 1.25 }} />
              {s.ac > 0 && (
                <g style={{ stroke: "hsl(205 70% 45%)", strokeWidth: 1.5, fill: "none" }} className="animate-pulse">
                  <path d="M524 232c4 6-4 10 0 16" />
                  <path d="M548 232c4 6-4 10 0 16" />
                  <path d="M572 232c4 6-4 10 0 16" />
                </g>
              )}
            </g>
          )}

          {/* ceiling fan, seen from the side */}
          {d("fan") && (
            <g>
              <line x1="130" y1="172" x2="130" y2="182" style={{ stroke: ink, strokeWidth: 2 }} />
              <rect x="121" y="182" width="18" height="7" rx="3" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <g
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animation: s.fan ? `fan-spin ${[0, 0.9, 0.55, 0.3][s.fan]}s linear infinite` : undefined,
                }}
              >
                <ellipse cx="130" cy="193" rx="36" ry="3.5" style={{ fill: hush, stroke: ink, strokeWidth: 1.5 }} />
              </g>
            </g>
          )}

          {/* temperature sensor with a readout */}
          {d("temp") && (
            <g>
              <rect x="356" y="200" width="26" height="30" rx="5" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <text x="369" y="219" textAnchor="middle" style={{ fill: roomTemp(s) >= 30 ? alertRed : ink, fontSize: 12, fontFamily: "var(--font-geist-mono), monospace", fontWeight: 600 }}>
                {roomTemp(s)}°
              </text>
              <rect x="361" y="223" width="16" height="2.5" rx="1.25" style={{ fill: roomTemp(s) >= 30 ? alertRed : "hsl(205 70% 45%)" }} />
            </g>
          )}

          {/* living window with motorised curtains */}
          {d("curtains") && (
            <g>
              <rect x="240" y="184" width="76" height="46" style={{ fill: sky, stroke: ink, strokeWidth: 1.5 }} />
              <line x1="278" y1="184" x2="278" y2="230" style={{ stroke: ink, strokeWidth: 1 }} />
              <rect
                x="240" y="186" width="38" height="44"
                style={{ fill: brand, opacity: 0.6, stroke: ink, strokeWidth: 1, transformBox: "fill-box", transformOrigin: "left center", transform: s.curtains ? "scaleX(0.28)" : "scaleX(1)", transition: "transform .5s ease" }}
              />
              <rect
                x="278" y="186" width="38" height="44"
                style={{ fill: brand, opacity: 0.6, stroke: ink, strokeWidth: 1, transformBox: "fill-box", transformOrigin: "right center", transform: s.curtains ? "scaleX(0.28)" : "scaleX(1)", transition: "transform .5s ease" }}
              />
              <line x1="234" y1="185" x2="322" y2="185" style={{ stroke: ink, strokeWidth: 2 }} />
              <rect x="322" y="180" width="14" height="10" rx="2" style={{ fill: s.curtains ? paper : amber, stroke: ink, strokeWidth: 1.5, transition: "fill .3s" }} />
            </g>
          )}

          {/* strip under a shelf, plus a glow behind the TV */}
          {d("strip") && (
            <g>
              <rect x="100" y="231" width="132" height="40" fill="url(#th-stripfade)" style={{ opacity: s.strip ? 1 : 0, transition: "opacity .35s" }} />
              <rect x="100" y="224" width="132" height="5" rx="1.5" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <line x1="102" y1="231" x2="230" y2="231" style={{ stroke: s.strip ? stripColor : hush, strokeWidth: 3, strokeLinecap: "round", transition: "stroke .35s" }} />
              <rect x="116" y="208" width="14" height="16" rx="2" style={{ fill: hush, stroke: ink, strokeWidth: 1.25 }} />
              <rect x="136" y="214" width="22" height="10" rx="2" style={{ fill: paper, stroke: ink, strokeWidth: 1.25 }} />
              {d("tv") && s.strip > 0 && (
                <rect x="262" y="264" width="82" height="52" rx="6" style={{ fill: "none", stroke: stripColor, strokeWidth: 5, opacity: 0.55 }} />
              )}
            </g>
          )}

          {/* accent: framed art, ceiling spot */}
          {d("accent") && (
            <g>
              <polygon points="132,181 98,262 166,262" fill="url(#th-spot)" style={{ opacity: s.accent === 1 ? 1 : 0, transition: "opacity .45s" }} />
              <rect x="126" y="172" width="12" height="9" rx="2" style={{ fill: s.accent === 1 ? amber : paper, stroke: ink, strokeWidth: 1.5, transition: "fill .3s" }} />
              <rect x="110" y="214" width="44" height="44" style={{ fill: paper, stroke: ink, strokeWidth: 2 }} />
              <rect x="116" y="220" width="32" height="32" style={{ fill: hush }} />
              <circle cx="132" cy="234" r="8" style={{ fill: brand, opacity: 0.8 }} />
              <path d="M116 252l12-10 8 6 12-12v16z" style={{ fill: ink, opacity: 0.55 }} />
            </g>
          )}

          {/* smart hub, with live links to every device on the page */}
          {d("hub") && (
            <g>
              {hubDevices.map((k) => {
                const [cx, cy] = center(k)
                return (
                  <line key={k} x1="118" y1="227" x2={cx} y2={cy} style={{ stroke: brand, strokeWidth: 1.25, strokeDasharray: "3 5", opacity: 0.7 }} className="animate-pulse" />
                )
              })}
              <rect x="104" y="222" width="28" height="11" rx="5.5" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <circle cx="112" cy="227.5" r="2" style={{ fill: brand }} className="animate-pulse" />
              <line x1="118" y1="233" x2="118" y2="241" style={{ stroke: ink, strokeWidth: 1.5 }} />
              <rect x="96" y="241" width="44" height="3" rx="1" style={{ fill: hush, stroke: ink, strokeWidth: 1.25 }} />
            </g>
          )}

          {/* wall button */}
          {d("button") && (
            <g>
              <rect x="88" y="240" width="22" height="22" rx="5" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <circle cx="99" cy="251" r="6" style={{ fill: s.living ? brand : ink, opacity: s.living ? 0.9 : 0.8, transition: "fill .3s" }} />
            </g>
          )}

          {/* smart speaker and its speech bubble */}
          {d("voice") && (
            <g>
              <line x1="100" y1="244" x2="146" y2="244" style={{ stroke: ink, strokeWidth: 2 }} />
              <rect x="114" y="214" width="22" height="30" rx="9" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <ellipse cx="125" cy="218" rx="8" ry="2.6" style={{ fill: "none", stroke: s.voice ? brand : ink, strokeWidth: 2 }} className={s.voice ? "animate-pulse" : undefined} />
              {s.voice && (
                <g>
                  <rect x="196" y="184" width={Math.round(24 + voiceLine(s).length * 6.4)} height="24" rx="12" style={{ fill: paper, stroke: ink, strokeWidth: 1.25 }} />
                  <text x="208" y="200" style={{ fill: ink, fontSize: 11, fontFamily: "var(--font-geist-mono), monospace" }}>
                    {voiceLine(s)}
                  </text>
                </g>
              )}
            </g>
          )}

          {/* wall panel, mirrors the live state */}
          {d("panel") && (
            <g>
              <rect x="94" y="222" width="42" height="56" rx="5" style={{ fill: ink, stroke: ink, strokeWidth: 1.5 }} />
              <g style={{ opacity: s.panelDim ? 0.25 : 1, transition: "opacity .35s" }}>
                <rect x="99" y="228" width="14" height="14" rx="3" style={{ fill: s.living ? amber : hush }} />
                <rect x="117" y="228" width="14" height="14" rx="3" style={{ fill: s.locked ? "hsl(160 62% 42%)" : amber }} />
                <rect x="99" y="246" width="14" height="14" rx="3" style={{ fill: s.ac ? "hsl(205 70% 60%)" : hush }} />
                <rect x="117" y="246" width="14" height="14" rx="3" style={{ fill: hush }} />
                <rect x="99" y="264" width="32" height="5" rx="2.5" style={{ fill: hush, opacity: 0.8 }} />
              </g>
            </g>
          )}

          {/* speakers in both rooms */}
          {d("speakers") && (
            <g>
              <line x1="100" y1="244" x2="146" y2="244" style={{ stroke: ink, strokeWidth: 2 }} />
              <rect x="116" y="216" width="20" height="28" rx="5" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <circle cx="126" cy="236" r="5" style={{ fill: "none", stroke: ink, strokeWidth: 1.25 }} />
              <circle cx="126" cy="224" r="2" style={{ fill: ink }} />
              <rect x="350" y="328" width="30" height="12" rx="2" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <rect x="356" y="300" width="18" height="28" rx="5" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <circle cx="365" cy="320" r="5" style={{ fill: "none", stroke: ink, strokeWidth: 1.25 }} />
              <circle cx="365" cy="308" r="2" style={{ fill: ink }} />
              {s.speakers && (
                <g style={{ stroke: brand, strokeWidth: 1.75, fill: "none", strokeLinecap: "round" }} className="animate-pulse">
                  <path d="M142 222c4 3 4 9 0 12M148 218c7 5 7 15 0 20M154 214c10 8 10 22 0 28" />
                  <path d="M382 308c4 3 4 9 0 12" />
                  <path d="M388 304c7 5 7 15 0 20" />
                </g>
              )}
            </g>
          )}

          {/* TV, soundbar and streaming box share the TV stand */}
          {(d("tv") || d("soundbar") || d("streaming") || d("powerstrip")) && (
            <g>
              <rect x="266" y="268" width="74" height="44" rx="3" style={{ fill: s.tv ? "hsl(205 70% 78%)" : ink, stroke: ink, strokeWidth: 1.5, transition: "fill .3s" }} />
              {s.tv && !s.streaming && (
                <g style={{ stroke: "hsl(205 70% 98%)", strokeWidth: 1.5, opacity: 0.8 }}>
                  <line x1="276" y1="282" x2="326" y2="282" />
                  <line x1="276" y1="292" x2="314" y2="292" />
                </g>
              )}
              {s.tv && s.streaming && <polygon points="296,284 296,300 310,292" style={{ fill: paper }} />}
              <rect x="258" y="312" width="90" height="28" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              {d("soundbar") && (
                <g>
                  <rect x="264" y="316" width="56" height="10" rx="3" style={{ fill: s.soundbar ? "hsl(160 30% 24%)" : hush, stroke: ink, strokeWidth: 1.25, transition: "fill .3s" }} />
                  {s.soundbar && (
                    <g style={{ stroke: brand, strokeWidth: 1.5, fill: "none", strokeLinecap: "round" }} className="animate-pulse">
                      <path d="M252 318c-4 3-4 7 0 10M246 314c-7 5-7 13 0 18" />
                    </g>
                  )}
                </g>
              )}
              {d("streaming") && (
                <g>
                  <rect x="324" y="328" width="18" height="8" rx="2" style={{ fill: s.streaming ? brand : hush, stroke: ink, strokeWidth: 1.25, transition: "fill .3s" }} />
                </g>
              )}
              {d("powerstrip") && (
                <g>
                  <rect x="262" y="342" width="76" height="7" rx="3" style={{ fill: ink }} />
                  {[0, 1, 2, 3].map((i) => (
                    <circle key={i} cx={274 + i * 17} cy="345.5" r="2" style={{ fill: s.power ? brand : hush }} />
                  ))}
                  <path d="M262 345h-14" style={{ stroke: ink, strokeWidth: 2 }} />
                </g>
              )}
            </g>
          )}

          {/* table lamp on a smart plug */}
          {d("plug") && (
            <g>
              <circle cx="244" cy="302" r="38" style={{ fill: amber, opacity: s.plug ? 0.28 : 0, transition: "opacity .3s" }} />
              <rect x="230" y="328" width="28" height="12" rx="2" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <line x1="244" y1="328" x2="244" y2="306" style={{ stroke: ink, strokeWidth: 2 }} />
              <polygon points="232,306 256,306 250,290 238,290" style={{ fill: s.plug ? amber : hush, stroke: ink, strokeWidth: 1.5, transition: "fill .3s" }} />
              <path d="M258 336h8" style={{ stroke: ink, strokeWidth: 1.5 }} />
              <rect x="266" y="330" width="14" height="12" rx="3" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <circle cx="273" cy="336" r="2" style={{ fill: s.plug ? brand : ink }} />
            </g>
          )}

          {/* dog and feeder */}
          {d("feeder") && (
            <g>
              <rect x="396" y="296" width="20" height="40" rx="5" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <rect x="400" y="302" width="12" height="14" rx="2" style={{ fill: hush }} />
              <path d="M392 341h28l-3-6h-22z" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              {s.feeder && <path d="M397 337h18l-1-3h-16z" style={{ fill: "hsl(28 60% 42%)" }} />}
              {s.feeder && <circle cx="406" r="2" style={{ fill: "hsl(28 60% 42%)" }}><animate attributeName="cy" values="318;334" dur="0.7s" repeatCount="3" /></circle>}
              {/* dog */}
              <g>
                <rect x="452" y="316" width="50" height="22" rx="10" style={{ fill: "hsl(32 55% 62%)", stroke: ink, strokeWidth: 1.5 }} />
                <rect x="458" y="334" width="7" height="9" rx="2" style={{ fill: "hsl(32 55% 62%)", stroke: ink, strokeWidth: 1.5 }} />
                <rect x="488" y="334" width="7" height="9" rx="2" style={{ fill: "hsl(32 55% 62%)", stroke: ink, strokeWidth: 1.5 }} />
                <g>
                  {s.feeder && <animateTransform attributeName="transform" type="translate" values="0 0;-4 8;0 0" dur="0.8s" repeatCount="indefinite" />}
                  <circle cx="448" cy="316" r="12" style={{ fill: "hsl(32 55% 62%)", stroke: ink, strokeWidth: 1.5 }} />
                  <rect x="428" y="316" width="16" height="9" rx="4.5" style={{ fill: "hsl(32 45% 72%)", stroke: ink, strokeWidth: 1.5 }} />
                  <circle cx="429" cy="318" r="2" style={{ fill: ink }} />
                  <circle cx="446" cy="311" r="1.8" style={{ fill: ink }} />
                  <path d="M452 305c8-2 10 6 8 12" style={{ fill: "hsl(32 55% 50%)", stroke: ink, strokeWidth: 1.5 }} />
                </g>
                <path d="M502 322c8-2 10-10 6-18" style={{ fill: "none", stroke: ink, strokeWidth: 3, strokeLinecap: "round" }} className={s.feeder ? "animate-pulse" : undefined} />
              </g>
            </g>
          )}

          {/* humidifier on the bedside table, with a humidity readout */}
          {d("humidifier") && (
            <g>
              <rect x="350" y="328" width="30" height="12" rx="2" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <rect x="356" y="304" width="18" height="24" rx="7" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <rect x="360" y="312" width="10" height="8" rx="2" style={{ fill: s.humidifier ? "hsl(205 70% 78%)" : hush }} />
              {s.humidifier && (
                <g style={{ stroke: "hsl(205 70% 55%)", strokeWidth: 1.75, fill: "none", strokeLinecap: "round" }} className="animate-pulse">
                  <path d="M362 298c-4-6 4-10 0-16" />
                  <path d="M370 298c-4-6 4-10 0-18" />
                  <path d="M366 290c-3-5 3-8 0-14" />
                </g>
              )}
              <text x="354" y="268" style={{ fill: ink, fontSize: 11, fontFamily: "var(--font-geist-mono), monospace" }}>
                RH {s.humidifier ? 52 : 34}%
              </text>
            </g>
          )}

          {/* air purifier and drifting dust */}
          {d("purifier") && (
            <g>
              {!s.purifier &&
                [
                  [130, 232], [196, 262], [270, 240], [308, 262], [114, 284], [176, 300], [300, 296], [226, 218],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r={i % 2 ? 2.2 : 1.6} style={{ fill: "hsl(30 25% 38%)", opacity: 0.55 }} className="animate-pulse" />
                ))}
              <rect x="236" y="288" width="18" height="52" rx="5" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <line x1="241" y1="298" x2="249" y2="298" style={{ stroke: ink, strokeWidth: 1.25 }} />
              <line x1="241" y1="304" x2="249" y2="304" style={{ stroke: ink, strokeWidth: 1.25 }} />
              <line x1="241" y1="310" x2="249" y2="310" style={{ stroke: ink, strokeWidth: 1.25 }} />
              <circle cx="245" cy="330" r="2.2" style={{ fill: s.purifier ? brand : ink }} />
              {s.purifier && (
                <g style={{ stroke: brand, strokeWidth: 1.5, fill: "none", strokeLinecap: "round" }} className="animate-pulse">
                  <path d="M241 282c-3-4 0-7-2-11M250 282c-3-4 0-7-2-11" />
                </g>
              )}
              <text x="222" y="258" style={{ fill: s.purifier ? "hsl(160 62% 28%)" : alertRed, fontSize: 11, fontFamily: "var(--font-geist-mono), monospace" }}>
                Air: {s.purifier ? "Good" : "Dusty"}
              </text>
            </g>
          )}

          {/* robot vacuum: docks in the bedroom corner, runs along the floor when cleaning */}
          {d("vacuum") && (
            <g>
              <rect x="566" y="344" width="14" height="16" rx="2" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <g>
                {s.vacuum && <animateTransform attributeName="transform" type="translate" values="0 0;-170 0;0 0" dur="8s" repeatCount="indefinite" />}
                <circle cx="552" cy="349" r="10" style={{ fill: s.vacuum ? brand : paper, stroke: ink, strokeWidth: 1.5, transition: "fill .3s" }} />
                <circle cx="552" cy="349" r="3" style={{ fill: ink }} />
              </g>
            </g>
          )}

          {/* phone notification */}
          {s.alert && (
            <g>
              <rect x="-88" y="62" width="22" height="38" rx="4" style={{ fill: paper, stroke: ink, strokeWidth: 1.5 }} />
              <rect x="-84" y="68" width="14" height="22" rx="1.5" style={{ fill: hush }} />
              <circle cx="-66" cy="64" r="4.5" style={{ fill: alertRed }} className="animate-pulse" />
              <rect x="-56" y="70" width={alertWidth} height="24" rx="12" style={{ fill: paper, stroke: ink, strokeWidth: 1.25 }} />
              <text x="-44" y="86" style={{ fill: ink, fontSize: 11, fontFamily: "var(--font-geist-mono), monospace" }}>
                {s.alert}
              </text>
            </g>
          )}

          {/* internet status, hub page only */}
          {d("hub") && (
            <g>
              <rect x="450" y="68" width="150" height="24" rx="12" style={{ fill: paper, stroke: ink, strokeWidth: 1.25 }} />
              <circle cx="466" cy="80" r="4" style={{ fill: s.internet ? brand : alertRed }} />
              <text x="478" y="84" style={{ fill: ink, fontSize: 11, fontFamily: "var(--font-geist-mono), monospace" }}>
                Internet {s.internet ? "online" : "down"}
              </text>
            </g>
          )}

          {/* click targets, on top of everything. Keyboard and screen reader users get the buttons below. */}
          {demo.devices.map((k) =>
            meta[k].boxes(demo).map((b, i) => (
              <rect
                key={`${k}-${i}`}
                x={b[0]}
                y={b[1]}
                width={b[2]}
                height={b[3]}
                rx={6}
                aria-hidden="true"
                className={`demo-hit${touched ? "" : " animate-pulse"}`}
                data-hint={touched ? "false" : "true"}
                onClick={() => run(k)}
              />
            )),
          )}
        </svg>
      </div>

      {/* Same switches as real buttons */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {demo.devices.map((k) => {
          const m = meta[k]
          const Icon = m.icon
          const value = m.value(s, demo)
          return (
            <button
              key={k}
              onClick={() => run(k)}
              aria-label={`${m.label}: ${value}. Activate to change.`}
              className="group flex items-center gap-3 rounded-md border bg-background px-3 py-2.5 text-left transition-colors hover:border-foreground/60"
            >
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors ${m.on(s) ? "border-foreground bg-primary" : "bg-card"}`}>
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="min-w-0">
                <span className="eyebrow block truncate">{m.label}</span>
                <span className="block font-display text-xl leading-tight">{value}</span>
              </span>
            </button>
          )
        })}
      </div>

      <p className="mt-3 min-h-[2.5rem] text-sm leading-relaxed text-muted-foreground" role="status" aria-live="polite">
        {note}
      </p>
    </div>
  )
}
