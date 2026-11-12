/**
 * Config for the interactive house on each sub page.
 * `devices` are the things that are drawn and tappable on that page.
 * `scenarios` line up with the three automations written for the topic, in the same order.
 */

export type DeviceKey =
  | "living"
  | "bedroom"
  | "porch"
  | "doorSensor"
  | "windowSensor"
  | "lock"
  | "camera"
  | "visitor"
  | "motion"
  | "presence"
  | "leak"
  | "ac"
  | "fan"
  | "temp"
  | "curtains"
  | "hub"
  | "button"
  | "voice"
  | "panel"
  | "speakers"
  | "tv"
  | "soundbar"
  | "streaming"
  | "strip"
  | "accent"
  | "plug"
  | "powerstrip"
  | "feeder"
  | "humidifier"
  | "purifier"
  | "vacuum"

export interface HomeState {
  living: boolean
  /** 0 warm, 1 daylight, 2 dim */
  tone: number
  bedroom: boolean
  porch: boolean
  locked: boolean
  doorOpen: boolean
  windowOpen: boolean
  camera: boolean
  visitor: boolean
  motion: boolean
  present: boolean
  leak: boolean
  /** 0 off, otherwise target temperature in °C */
  ac: number
  /** 0 off, 1 low, 2 medium, 3 high */
  fan: number
  /** room temperature before aircon and fan, in °C */
  temp: number
  curtains: boolean
  tv: boolean
  soundbar: boolean
  streaming: boolean
  speakers: boolean
  /** 0 off, 1 warm white, 2 blue, 3 green */
  strip: number
  /** 0 off, 1 spotlights, 2 cove glow */
  accent: number
  plug: boolean
  power: boolean
  feeder: boolean
  humidifier: boolean
  purifier: boolean
  vacuum: boolean
  internet: boolean
  voice: boolean
  panelDim: boolean
  /** Text shown as a phone notification. Empty means none. */
  alert: string
}

export const START_STATE: HomeState = {
  living: true,
  tone: 0,
  bedroom: false,
  porch: false,
  locked: true,
  doorOpen: false,
  windowOpen: false,
  camera: false,
  visitor: false,
  motion: false,
  present: false,
  leak: false,
  ac: 0,
  fan: 0,
  temp: 29,
  curtains: true,
  tv: false,
  soundbar: false,
  streaming: false,
  speakers: false,
  strip: 0,
  accent: 0,
  plug: false,
  power: true,
  feeder: false,
  humidifier: false,
  purifier: false,
  vacuum: false,
  internet: true,
  voice: false,
  panelDim: false,
  alert: "",
}

export interface HomeDemo {
  devices: DeviceKey[]
  /** Start from this state instead of the default */
  start?: Partial<HomeState>
  /** Cycle the living light through warm, daylight and dim */
  tones?: boolean
  /** Draw wall switches beside the lights */
  switches?: boolean
  /** Hot room turns the fan on by itself */
  autoFan?: boolean
  hide?: ("sofa" | "bed")[]
  /** One patch per automation on the page, same order */
  scenarios: [Partial<HomeState>, Partial<HomeState>, Partial<HomeState>]
}

export const homeDemos: Record<string, HomeDemo> = {
  // Lighting
  "smart-bulbs": {
    devices: ["living", "bedroom"],
    tones: true,
    start: { living: true, tone: 1 },
    scenarios: [
      { living: true, tone: 2, bedroom: false },
      { living: false, bedroom: true },
      { living: true, tone: 0, bedroom: false },
    ],
  },
  "smart-switches": {
    devices: ["living", "bedroom", "porch"],
    switches: true,
    start: { living: true, bedroom: true },
    scenarios: [
      { porch: true, living: true, bedroom: true },
      { porch: false, living: false, bedroom: false },
      { living: false, bedroom: true },
    ],
  },
  "light-strips": {
    devices: ["strip", "tv"],
    start: { living: false },
    scenarios: [{ strip: 1 }, { strip: 2 }, { strip: 3, tv: true }],
  },
  "accent-lighting": {
    devices: ["accent", "living"],
    start: { living: false },
    scenarios: [
      { accent: 1, living: false },
      { accent: 2, living: true },
      { accent: 2, living: false },
    ],
  },

  // Security
  "door-sensors": {
    devices: ["doorSensor", "living", "ac"],
    start: { living: false },
    scenarios: [
      { doorOpen: true, living: true, alert: "Front door opened" },
      { doorOpen: true, living: false, alert: "Door opened while out" },
      { doorOpen: true, ac: 24, living: false, alert: "Patio door open, aircon on" },
    ],
  },
  "window-sensors": {
    devices: ["windowSensor", "ac"],
    start: { ac: 24, living: false, bedroom: true },
    scenarios: [
      { windowOpen: true, ac: 0, alert: "Bedroom window still open" },
      { windowOpen: true, ac: 0, alert: "Window open, aircon paused" },
      { windowOpen: true, ac: 0, alert: "Rain coming, window is open" },
    ],
  },
  "smart-locks": {
    devices: ["lock", "living", "ac"],
    start: { living: false },
    scenarios: [
      { locked: false, living: true, ac: 24, alert: "Door unlocked with a family code" },
      { locked: true, alert: "Door locked itself" },
      { locked: false, alert: "Helper code used, 8:02 am" },
    ],
  },
  cameras: {
    devices: ["camera", "visitor", "porch"],
    start: { living: false },
    scenarios: [
      { camera: true, visitor: true, porch: true, alert: "Person at the gate" },
      { camera: true, living: false, alert: "Away mode, cameras recording" },
      { camera: true, visitor: true, alert: "Doorbell: someone at the door" },
    ],
  },
  "motion-sensors": {
    devices: ["motion", "living"],
    start: { living: false },
    scenarios: [
      { motion: true, living: true },
      { motion: true, living: true },
      { motion: true, living: false, alert: "Motion in an empty room" },
    ],
  },
  "leak-sensors": {
    devices: ["leak", "living"],
    hide: ["sofa"],
    start: { living: false },
    scenarios: [
      { leak: true, alert: "Water under the kitchen sink" },
      { leak: true, living: true, alert: "Water under the kitchen sink" },
      { leak: false, alert: "Leak sensor battery 87%" },
    ],
  },

  // Climate
  "ac-controllers": {
    devices: ["ac", "windowSensor"],
    start: { living: false, bedroom: true },
    scenarios: [
      { ac: 24, bedroom: true },
      { ac: 25, bedroom: true, alert: "Aircon on, you are almost home" },
      { windowOpen: true, ac: 0, alert: "Window open, aircon off" },
    ],
  },
  "fan-switches": {
    devices: ["fan", "temp"],
    autoFan: true,
    start: { living: false },
    scenarios: [
      { fan: 2, living: false },
      { fan: 1, temp: 31 },
      { fan: 0 },
    ],
  },
  "curtain-controllers": {
    devices: ["curtains", "tv", "living"],
    scenarios: [
      { curtains: true, living: true, tv: false },
      { curtains: false, living: true, tv: false },
      { curtains: false, living: false, tv: true },
    ],
  },
  "temperature-sensors": {
    devices: ["temp", "fan", "ac"],
    start: { living: false, bedroom: true },
    scenarios: [
      { temp: 31, fan: 2, ac: 0 },
      { temp: 29, fan: 3, alert: "Bathroom humidity high, fan on" },
      { temp: 28, alert: "Overnight low 26°, high 31°" },
    ],
  },

  // Automation
  "smart-hubs": {
    devices: ["hub", "living", "lock", "curtains"],
    start: { living: false, curtains: false },
    scenarios: [
      { curtains: true, living: true },
      { living: false, locked: true },
      { living: false, locked: true, curtains: false },
    ],
  },
  "scene-buttons": {
    devices: ["button", "living", "lock", "tv", "curtains"],
    start: { living: true, tv: false },
    scenarios: [
      { living: false, locked: true },
      { living: false, locked: true, tv: false, alert: "Leaving: everything off" },
      { living: false, tv: true, curtains: false },
    ],
  },
  "presence-sensors": {
    devices: ["presence", "living", "ac"],
    start: { living: false },
    scenarios: [
      { present: true, living: true },
      { present: false, living: false, ac: 0 },
      { present: true, living: true },
    ],
  },
  "voice-control": {
    devices: ["voice", "living", "lock", "tv"],
    scenarios: [
      { voice: true, living: false, locked: true },
      { voice: true, living: false, tv: true },
      { voice: true, alert: "Front door locked, all windows closed" },
    ],
  },
  "wall-panels": {
    devices: ["panel", "living", "lock", "ac"],
    scenarios: [
      { living: true, locked: false, panelDim: false },
      { living: false, panelDim: true },
      { alert: "Doorbell: camera on the panel" },
    ],
  },

  // Media control
  "multi-room-audio": {
    devices: ["speakers"],
    start: { living: true, bedroom: false },
    scenarios: [{ speakers: true }, { speakers: true, bedroom: true }, { speakers: false }],
  },
  "tv-control": {
    devices: ["tv", "living", "curtains"],
    scenarios: [
      { tv: true, living: false, curtains: false },
      { tv: false },
      { tv: false, bedroom: false, living: false },
    ],
  },
  soundbars: {
    devices: ["soundbar", "tv"],
    start: { living: false },
    scenarios: [
      { tv: true, soundbar: true },
      { tv: true, soundbar: true, alert: "Night mode: effects lowered" },
      { tv: true, soundbar: true },
    ],
  },
  "streaming-boxes": {
    devices: ["streaming", "tv", "living"],
    scenarios: [
      { tv: true, streaming: true, living: false },
      { tv: false, streaming: false },
      { tv: false, streaming: false, living: false },
    ],
  },

  // Appliances
  "smart-plugs": {
    devices: ["plug"],
    start: { living: false },
    scenarios: [{ plug: true }, { plug: false, alert: "Charger turned off" }, { plug: false }],
  },
  "power-strips": {
    devices: ["powerstrip", "tv", "soundbar"],
    start: { living: false, tv: true, soundbar: true },
    scenarios: [
      { power: false, tv: false, soundbar: false },
      { power: false, tv: false, soundbar: false },
      { power: true, alert: "Router outlet stays on" },
    ],
  },
  "dog-feeders": {
    devices: ["feeder"],
    hide: ["bed"],
    start: { bedroom: true },
    scenarios: [
      { feeder: true, alert: "Meal served" },
      { feeder: false, alert: "Food hopper is low" },
      { feeder: true, alert: "Meal served, clip ready" },
    ],
  },
  humidifiers: {
    devices: ["humidifier"],
    start: { living: false, bedroom: true },
    scenarios: [
      { humidifier: true },
      { humidifier: false },
      { humidifier: false, alert: "Humidifier tank is low" },
    ],
  },
  "air-purifiers": {
    devices: ["purifier"],
    scenarios: [
      { purifier: true },
      { purifier: true, living: false, bedroom: false },
      { purifier: false, alert: "Filter at 10%, replace soon" },
    ],
  },
  "robot-vacuums": {
    devices: ["vacuum", "lock"],
    start: { living: false, bedroom: true },
    scenarios: [
      { vacuum: true, locked: true, living: false },
      { vacuum: false, locked: false },
      { vacuum: true },
    ],
  },
}
