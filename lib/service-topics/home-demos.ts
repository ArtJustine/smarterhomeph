/**
 * Config for the interactive house on each sub page.
 *
 * Each page has three rules, in the same order as the three automations written for the topic.
 * A rule is a real automation: a trigger (something happens), conditions (only if these are true),
 * and actions (what the house then does). Devices on their own only change their own state.
 * All the "smart" behaviour comes from the rule.
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
  | "humidity"
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
  | "air"
  | "vacuum"
  // Things around the house that rules can use as triggers or conditions
  | "night"
  | "away"
  | "rain"
  | "clock"

export type IconKey = DeviceKey | "day" | "home" | "bell"

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
  /** relative humidity before the humidifier, in % */
  rh: number
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
  dusty: boolean
  vacuum: boolean
  internet: boolean
  voice: boolean
  panelDim: boolean
  night: boolean
  away: boolean
  raining: boolean
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
  rh: 55,
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
  dusty: false,
  vacuum: false,
  internet: true,
  voice: false,
  panelDim: false,
  night: false,
  away: false,
  raining: false,
  alert: "",
}

/** A state test. A plain value means "equals". */
export type Match = Partial<{ [K in keyof HomeState]: HomeState[K] | { gte: number } | { lte: number } }>

export interface Trigger {
  label: string
  icon: IconKey
  /** Fires when the state changes from not matching to matching */
  when?: Match
  /** Fires when this event happens: "clock", "button" or "voice" */
  event?: "clock" | "button" | "voice"
  /** For clock triggers, the time shown on the control */
  time?: string
  /** For voice triggers, what the person says */
  say?: string
}

export interface Condition {
  label: string
  icon: IconKey
  test: Match
}

export interface Action {
  label: string
  icon: IconKey
  set: Partial<HomeState>
}

export interface Rule {
  /** What is drawn and tappable for this rule */
  devices: DeviceKey[]
  start?: Partial<HomeState>
  trigger: Trigger
  ifs: Condition[]
  then: Action[]
  /** Shown before anything is tapped */
  hint: string
  /** Cycle the living light through warm, daylight and dim */
  tones?: boolean
  /** Draw wall switches beside the lights */
  switches?: boolean
  hide?: ("sofa" | "bed")[]
}

export interface HomeDemo {
  rules: [Rule, Rule, Rule]
}

// Reusable conditions
const NIGHT: Condition = { label: "It's night", icon: "night", test: { night: true } }
const DAY: Condition = { label: "It's daytime", icon: "day", test: { night: false } }
const HOME: Condition = { label: "Someone is home", icon: "home", test: { away: false } }
const OUT: Condition = { label: "Nobody is home", icon: "away", test: { away: true } }
const notify = (text: string, label = "Send an alert to your phone"): Action => ({ label, icon: "bell", set: { alert: text } })

export const homeDemos: Record<string, HomeDemo> = {
  // ---------------------------------------------------------------- Lighting
  "smart-bulbs": {
    rules: [
      {
        devices: ["night", "away", "living"],
        tones: true,
        start: { night: false, away: false, living: true, tone: 1 },
        trigger: { label: "The sun sets", icon: "night", when: { night: true } },
        ifs: [HOME],
        then: [{ label: "Warm and dim the living light", icon: "living", set: { living: true, tone: 2 } }],
        hint: "Switch the time to Night. Then set it to Away and try again: nobody is home, so nothing changes.",
      },
      {
        devices: ["clock", "away", "bedroom"],
        start: { night: true, away: false, bedroom: false, living: false },
        trigger: { label: "The alarm time arrives", icon: "clock", event: "clock", time: "7:00 am" },
        ifs: [HOME],
        then: [{ label: "Fade up the bedroom light", icon: "bedroom", set: { bedroom: true } }],
        hint: "Tap the clock to jump to 7:00 am. Try again with the house set to Away.",
      },
      {
        devices: ["away", "night", "living"],
        start: { away: false, night: true, living: false },
        trigger: { label: "Everyone leaves", icon: "away", when: { away: true } },
        ifs: [NIGHT],
        then: [{ label: "Turn on the living light", icon: "living", set: { living: true } }],
        hint: "Set the house to Away at night. In daytime the light stays off, no point lighting an empty house.",
      },
    ],
  },
  "smart-switches": {
    rules: [
      {
        devices: ["night", "porch"],
        switches: true,
        start: { night: false, porch: false, living: true, bedroom: true },
        trigger: { label: "The sun sets", icon: "night", when: { night: true } },
        ifs: [{ label: "Porch light is off", icon: "porch", test: { porch: false } }],
        then: [{ label: "Turn on the porch light", icon: "porch", set: { porch: true } }],
        hint: "Switch the time to Night. The porch light comes on by itself, no one touches a switch.",
      },
      {
        devices: ["button", "living", "bedroom", "porch"],
        start: { night: true, living: true, bedroom: true, porch: true },
        trigger: { label: "You press the button by the door", icon: "button", event: "button" },
        ifs: [],
        then: [{ label: "Turn off every light in the house", icon: "living", set: { living: false, bedroom: false, porch: false } }],
        hint: "Press the wall button. One press and every light goes off. No conditions, it always works.",
      },
      {
        devices: ["motion", "night", "living"],
        tones: true,
        start: { night: true, living: false, tone: 0, motion: false },
        trigger: { label: "Motion in the hall", icon: "motion", when: { motion: true } },
        ifs: [NIGHT],
        then: [{ label: "Turn on the light, dimmed", icon: "living", set: { living: true, tone: 2 } }],
        hint: "Trigger the motion sensor at night: a low light. Switch to Day and try again: nothing, you do not need it.",
      },
    ],
  },
  "light-strips": {
    rules: [
      {
        devices: ["motion", "night", "strip"],
        start: { living: false, night: true, strip: 0, motion: false },
        trigger: { label: "You walk into the kitchen", icon: "motion", when: { motion: true } },
        ifs: [NIGHT],
        then: [{ label: "Turn on the under-cabinet strip", icon: "strip", set: { strip: 1 } }],
        hint: "Trigger the motion sensor. The strip lights your counter without waking the whole house.",
      },
      {
        devices: ["motion", "night", "living", "strip"],
        start: { living: false, night: true, strip: 0, motion: false },
        trigger: { label: "Movement on the stairs", icon: "motion", when: { motion: true } },
        ifs: [NIGHT, { label: "The main light is off", icon: "living", test: { living: false } }],
        then: [{ label: "Light the path with a soft strip", icon: "strip", set: { strip: 1 } }],
        hint: "Turn the main light on first, then trigger the motion sensor. It skips the strip, you already have light.",
      },
      {
        devices: ["tv", "night", "strip"],
        start: { tv: false, night: true, strip: 0, living: true },
        trigger: { label: "The TV turns on", icon: "tv", when: { tv: true } },
        ifs: [NIGHT],
        then: [
          { label: "Switch the room light off", icon: "living", set: { living: false } },
          { label: "Glow the strip behind the TV", icon: "strip", set: { strip: 2 } },
        ],
        hint: "Turn the TV on at night. Do it in daytime and the lights stay as they are.",
      },
    ],
  },
  "accent-lighting": {
    rules: [
      {
        devices: ["away", "living", "accent", "button"],
        start: { living: true, away: false, accent: 0 },
        trigger: { label: "You press the dinner button", icon: "button", event: "button" },
        ifs: [HOME],
        then: [
          { label: "Dim the main light", icon: "living", set: { living: false } },
          { label: "Turn on the spotlights", icon: "accent", set: { accent: 1 } },
        ],
        hint: "Press the button. The room goes from bright to a lit-wall dinner setting.",
      },
      {
        devices: ["doorSensor", "night", "living", "accent"],
        start: { living: false, night: true, accent: 0, doorOpen: false },
        trigger: { label: "Guests arrive, the door opens", icon: "doorSensor", when: { doorOpen: true } },
        ifs: [NIGHT],
        then: [
          { label: "Turn on the cove glow", icon: "accent", set: { accent: 2 } },
          { label: "Turn on the living light", icon: "living", set: { living: true } },
        ],
        hint: "Open the door at night. In daytime you do not need the mood lighting.",
      },
      {
        devices: ["night", "away", "living", "accent"],
        start: { night: false, away: false, living: true, accent: 0 },
        trigger: { label: "The sun sets", icon: "night", when: { night: true } },
        ifs: [HOME],
        then: [
          { label: "Turn off the main light", icon: "living", set: { living: false } },
          { label: "Keep a low cove light on", icon: "accent", set: { accent: 2 } },
        ],
        hint: "Switch the time to Night and the house changes to its evening look.",
      },
    ],
  },

  // ---------------------------------------------------------------- Security
  "door-sensors": {
    rules: [
      {
        devices: ["doorSensor", "night", "living"],
        start: { doorOpen: false, living: false, night: true },
        trigger: { label: "The front door opens", icon: "doorSensor", when: { doorOpen: true } },
        ifs: [NIGHT],
        then: [{ label: "Turn on the living light", icon: "living", set: { living: true } }],
        hint: "Open the door. Then close it, switch to Day and open it again: the light stays off.",
      },
      {
        devices: ["doorSensor", "away"],
        start: { doorOpen: false, away: true },
        trigger: { label: "The front door opens", icon: "doorSensor", when: { doorOpen: true } },
        ifs: [OUT],
        then: [notify("Door opened while you are out")],
        hint: "Open the door while the house is set to Away. Set it to Home and nothing is sent, that is just family.",
      },
      {
        devices: ["clock", "doorSensor", "ac"],
        start: { doorOpen: true, ac: 24, living: false, bedroom: true },
        trigger: { label: "10 minutes pass", icon: "clock", event: "clock", time: "10 min" },
        ifs: [
          { label: "The door is still open", icon: "doorSensor", test: { doorOpen: true } },
          { label: "The aircon is running", icon: "ac", test: { ac: { gte: 1 } } },
        ],
        then: [notify("Door open with the aircon on")],
        hint: "Let 10 minutes pass. Close the door first and try again: no reminder.",
      },
    ],
  },
  "window-sensors": {
    rules: [
      {
        devices: ["clock", "windowSensor"],
        start: { windowOpen: true, living: false, bedroom: true },
        trigger: { label: "Bedtime arrives", icon: "clock", event: "clock", time: "10:00 pm" },
        ifs: [{ label: "A window is still open", icon: "windowSensor", test: { windowOpen: true } }],
        then: [notify("Bedroom window still open")],
        hint: "Tap the clock at bedtime. Close the window first and there is nothing to report.",
      },
      {
        devices: ["windowSensor", "ac"],
        start: { windowOpen: false, ac: 24, living: false, bedroom: true },
        trigger: { label: "A window opens", icon: "windowSensor", when: { windowOpen: true } },
        ifs: [{ label: "The aircon is running", icon: "ac", test: { ac: { gte: 1 } } }],
        then: [
          { label: "Turn the aircon off", icon: "ac", set: { ac: 0 } },
          notify("Aircon paused, window open"),
        ],
        hint: "Open the window while the aircon runs. Turn the aircon off first, and the window opens without any fuss.",
      },
      {
        devices: ["rain", "windowSensor"],
        start: { windowOpen: true, raining: false, living: false, bedroom: true },
        trigger: { label: "It starts to rain", icon: "rain", when: { raining: true } },
        ifs: [{ label: "A window is open", icon: "windowSensor", test: { windowOpen: true } }],
        then: [notify("Rain coming, window is open")],
        hint: "Make it rain. Close the window first and you are not warned about nothing.",
      },
    ],
  },
  "smart-locks": {
    rules: [
      {
        devices: ["lock", "night", "living", "ac"],
        start: { locked: true, living: false, night: true, ac: 0 },
        trigger: { label: "You unlock the door", icon: "lock", when: { locked: false } },
        ifs: [NIGHT],
        then: [
          { label: "Turn on the living light", icon: "living", set: { living: true } },
          { label: "Start the aircon at 24°C", icon: "ac", set: { ac: 24 } },
        ],
        hint: "Unlock the door at night. In daytime the lock opens but the house does not change.",
      },
      {
        devices: ["doorSensor", "lock", "clock"],
        start: { locked: false, doorOpen: false },
        trigger: { label: "One minute passes", icon: "clock", event: "clock", time: "1 min" },
        ifs: [
          { label: "The door is closed", icon: "doorSensor", test: { doorOpen: false } },
          { label: "The door is unlocked", icon: "lock", test: { locked: false } },
        ],
        then: [{ label: "Lock the door", icon: "lock", set: { locked: true, alert: "Door locked itself" } }],
        hint: "Wait a minute with the door closed and it locks. Open the door first: the lock waits, it will not bolt an open door.",
      },
      {
        devices: ["lock", "clock"],
        start: { locked: false },
        trigger: { label: "The helper's hours end", icon: "clock", event: "clock", time: "5:00 pm" },
        ifs: [{ label: "The door is unlocked", icon: "lock", test: { locked: false } }],
        then: [
          { label: "Lock the door", icon: "lock", set: { locked: true } },
          notify("Helper code expired, door locked"),
        ],
        hint: "Tap the clock at 5:00 pm. Lock the door first and there is nothing to do.",
      },
    ],
  },
  cameras: {
    rules: [
      {
        devices: ["visitor", "camera", "night", "porch"],
        start: { camera: true, night: true, porch: false, living: false },
        trigger: { label: "A person is at the gate", icon: "visitor", when: { visitor: true } },
        ifs: [NIGHT, { label: "The camera is armed", icon: "camera", test: { camera: true } }],
        then: [
          { label: "Turn on the porch light", icon: "porch", set: { porch: true } },
          notify("Person at the gate"),
        ],
        hint: "Send a visitor to the gate. Turn the camera off or switch to Day and the house does not react.",
      },
      {
        devices: ["away", "camera"],
        start: { away: false, camera: false, living: false },
        trigger: { label: "Everyone leaves", icon: "away", when: { away: true } },
        ifs: [],
        then: [
          { label: "Arm the camera", icon: "camera", set: { camera: true } },
          notify("Away mode on, camera recording"),
        ],
        hint: "Set the house to Away. The camera arms itself, so you never forget.",
      },
      {
        devices: ["visitor", "away", "camera", "living"],
        start: { camera: true, away: false, living: false, night: false },
        trigger: { label: "Someone rings the doorbell", icon: "visitor", when: { visitor: true } },
        ifs: [HOME],
        then: [
          { label: "Turn on the living light", icon: "living", set: { living: true } },
          notify("Doorbell: someone at the door"),
        ],
        hint: "Ring the bell with someone home. Set Away and it still sees them, but does not make a fuss inside.",
      },
    ],
  },
  "motion-sensors": {
    rules: [
      {
        devices: ["motion", "night", "living"],
        start: { living: false, night: true, tone: 0, motion: false },
        trigger: { label: "Motion in the hallway", icon: "motion", when: { motion: true } },
        ifs: [NIGHT],
        then: [{ label: "Turn on a dim light", icon: "living", set: { living: true, tone: 2 } }],
        hint: "Walk by at night: a soft light. Try it in the daytime: no light needed.",
      },
      {
        devices: ["motion", "night", "porch"],
        start: { porch: false, night: true, motion: false },
        trigger: { label: "Motion in the carport", icon: "motion", when: { motion: true } },
        ifs: [NIGHT],
        then: [{ label: "Turn on the carport light", icon: "porch", set: { porch: true } }],
        hint: "Park the car at night and the light is already on.",
      },
      {
        devices: ["motion", "away", "camera"],
        start: { away: true, camera: false, motion: false },
        trigger: { label: "Motion in the living room", icon: "motion", when: { motion: true } },
        ifs: [OUT],
        then: [
          { label: "Arm the camera", icon: "camera", set: { camera: true } },
          notify("Motion in an empty house"),
        ],
        hint: "Trigger motion while the house is set to Away. If someone is home, motion is normal and nothing happens.",
      },
    ],
  },
  "leak-sensors": {
    rules: [
      {
        devices: ["leak", "away"],
        hide: ["sofa"],
        start: { leak: false, away: false, living: false },
        trigger: { label: "Water under the sink", icon: "leak", when: { leak: true } },
        ifs: [],
        then: [notify("Water under the kitchen sink", "Send an urgent alert")],
        hint: "Simulate a leak. There are no conditions. A leak always matters, day or night, home or away.",
      },
      {
        devices: ["leak", "night", "living"],
        hide: ["sofa"],
        start: { leak: false, night: true, living: false },
        trigger: { label: "Water under the sink", icon: "leak", when: { leak: true } },
        ifs: [NIGHT],
        then: [
          { label: "Turn on the lights", icon: "living", set: { living: true } },
          notify("Water under the kitchen sink"),
        ],
        hint: "Make it leak at night and the lights come on so you can find it. In daytime you can already see.",
      },
      {
        devices: ["clock", "leak"],
        hide: ["sofa"],
        start: { leak: false, living: false },
        trigger: { label: "Monday morning check", icon: "clock", event: "clock", time: "Mon 9:00 am" },
        ifs: [{ label: "The sensor is dry", icon: "leak", test: { leak: false } }],
        then: [notify("Leak sensor battery 87%", "Send the weekly status")],
        hint: "Run the weekly check. If the sensor is wet, the report is skipped and you get the real alarm instead.",
      },
    ],
  },

  // ---------------------------------------------------------------- Climate
  "ac-controllers": {
    rules: [
      {
        devices: ["clock", "away", "windowSensor", "ac"],
        start: { ac: 0, away: false, windowOpen: false, living: false, bedroom: true },
        trigger: { label: "20 minutes before bedtime", icon: "clock", event: "clock", time: "9:40 pm" },
        ifs: [HOME, { label: "The window is closed", icon: "windowSensor", test: { windowOpen: false } }],
        then: [{ label: "Start the aircon at 24°C", icon: "ac", set: { ac: 24 } }],
        hint: "Tap the clock. Open the window first and the aircon waits, it will not cool the whole street.",
      },
      {
        devices: ["away", "temp", "ac"],
        start: { away: true, temp: 29, ac: 0, living: false, bedroom: true },
        trigger: { label: "You get close to home", icon: "home", when: { away: false } },
        ifs: [{ label: "The room is warm", icon: "temp", test: { temp: { gte: 29 } } }],
        then: [{ label: "Start the aircon at 25°C", icon: "ac", set: { ac: 25 } }],
        hint: "Set Home to arrive. Cool the room down first with the temperature control and the aircon stays off.",
      },
      {
        devices: ["windowSensor", "ac"],
        start: { windowOpen: false, ac: 24, living: false, bedroom: true },
        trigger: { label: "A window opens", icon: "windowSensor", when: { windowOpen: true } },
        ifs: [{ label: "The aircon is running", icon: "ac", test: { ac: { gte: 1 } } }],
        then: [
          { label: "Turn the aircon off", icon: "ac", set: { ac: 0 } },
          notify("Window open, aircon off"),
        ],
        hint: "Open the window while the aircon runs. It stops wasting power right away.",
      },
    ],
  },
  "fan-switches": {
    rules: [
      {
        devices: ["clock", "fan"],
        start: { fan: 2, living: false, bedroom: false },
        trigger: { label: "One hour after bedtime", icon: "clock", event: "clock", time: "+1 hour" },
        ifs: [{ label: "The fan is running", icon: "fan", test: { fan: { gte: 1 } } }],
        then: [{ label: "Turn the fan off", icon: "fan", set: { fan: 0 } }],
        hint: "Let an hour pass and the fan switches itself off. Turn it off yourself first and nothing needs doing.",
      },
      {
        devices: ["temp", "away", "fan"],
        start: { temp: 29, away: false, fan: 0, living: false },
        trigger: { label: "The room gets hot", icon: "temp", when: { temp: { gte: 31 } } },
        ifs: [HOME],
        then: [{ label: "Turn the fan on, low", icon: "fan", set: { fan: 1 } }],
        hint: "Raise the temperature with the control. Set Away first and the fan stays off in an empty room.",
      },
      {
        devices: ["presence", "fan"],
        start: { present: true, fan: 2, living: false },
        trigger: { label: "You leave the room", icon: "presence", when: { present: false } },
        ifs: [{ label: "The fan is running", icon: "fan", test: { fan: { gte: 1 } } }],
        then: [{ label: "Turn the fan off", icon: "fan", set: { fan: 0 } }],
        hint: "Make the room empty. The fan stops. Nobody is there to feel the breeze.",
      },
    ],
  },
  "curtain-controllers": {
    rules: [
      {
        devices: ["clock", "away", "curtains"],
        start: { curtains: false, away: false },
        trigger: { label: "The morning schedule", icon: "clock", event: "clock", time: "7:00 am" },
        ifs: [HOME],
        then: [{ label: "Open the curtains", icon: "curtains", set: { curtains: true } }],
        hint: "Tap the clock. Try it with the house on Away: the curtains stay closed.",
      },
      {
        devices: ["clock", "temp", "curtains"],
        start: { curtains: true, temp: 29 },
        trigger: { label: "Midday sun hits the window", icon: "clock", event: "clock", time: "1:00 pm" },
        ifs: [
          { label: "The room is hot", icon: "temp", test: { temp: { gte: 29 } } },
          { label: "The curtains are open", icon: "curtains", test: { curtains: true } },
        ],
        then: [{ label: "Close the curtains", icon: "curtains", set: { curtains: false } }],
        hint: "Tap the clock. If the room is already cool, the curtains stay open for the light.",
      },
      {
        devices: ["tv", "night", "living", "curtains"],
        start: { tv: false, night: true, living: true, curtains: true },
        trigger: { label: "The TV turns on", icon: "tv", when: { tv: true } },
        ifs: [NIGHT],
        then: [
          { label: "Switch the light off", icon: "living", set: { living: false } },
          { label: "Close the curtains", icon: "curtains", set: { curtains: false } },
        ],
        hint: "Turn the TV on. Switch to Day and try again: curtains stay open.",
      },
    ],
  },
  "temperature-sensors": {
    rules: [
      {
        devices: ["temp", "away", "fan", "ac"],
        start: { temp: 29, away: false, fan: 0, ac: 0, living: false, bedroom: true },
        trigger: { label: "The room hits 31°C", icon: "temp", when: { temp: { gte: 31 } } },
        ifs: [HOME],
        then: [
          { label: "Turn the fan on, medium", icon: "fan", set: { fan: 2 } },
          { label: "Start the aircon at 24°C", icon: "ac", set: { ac: 24 } },
        ],
        hint: "Tap the temperature to warm the room up. The house responds on its own.",
      },
      {
        devices: ["humidity", "fan"],
        start: { rh: 55, fan: 0, living: false },
        trigger: { label: "Humidity gets high", icon: "humidity", when: { rh: { gte: 80 } } },
        ifs: [{ label: "The fan is off", icon: "fan", test: { fan: 0 } }],
        then: [
          { label: "Turn the fan on, high", icon: "fan", set: { fan: 3 } },
          notify("Humidity high, fan on"),
        ],
        hint: "Tap the humidity sensor until it reads high. Turn the fan on yourself first and it has nothing to add.",
      },
      {
        devices: ["clock", "away", "temp"],
        start: { temp: 28, away: false, living: false },
        trigger: { label: "The morning report", icon: "clock", event: "clock", time: "7:00 am" },
        ifs: [HOME],
        then: [notify("Overnight low 26°, high 31°", "Send the daily summary")],
        hint: "Tap the clock for the summary. Set Away and it waits until you are back.",
      },
    ],
  },

  // ---------------------------------------------------------------- Automation
  "smart-hubs": {
    rules: [
      {
        devices: ["clock", "away", "curtains", "living", "hub"],
        start: { curtains: false, living: false, away: false, internet: true },
        trigger: { label: "The morning schedule", icon: "clock", event: "clock", time: "7:00 am" },
        ifs: [HOME],
        then: [
          { label: "Open the curtains", icon: "curtains", set: { curtains: true } },
          { label: "Turn on the living light", icon: "living", set: { living: true } },
        ],
        hint: "Take the internet offline first, then tap the clock. A local hub still runs the routine.",
      },
      {
        devices: ["away", "living", "lock", "hub"],
        start: { away: false, living: true, locked: false, internet: true },
        trigger: { label: "Everyone leaves", icon: "away", when: { away: true } },
        ifs: [{ label: "A light is on", icon: "living", test: { living: true } }],
        then: [
          { label: "Turn the lights off", icon: "living", set: { living: false } },
          { label: "Lock the front door", icon: "lock", set: { locked: true } },
        ],
        hint: "Set the house to Away. Switch the light off first and it only locks the door.",
      },
      {
        devices: ["button", "night", "living", "lock", "hub"],
        start: { night: true, living: true, locked: false, internet: true },
        trigger: { label: "You press the goodnight button", icon: "button", event: "button" },
        ifs: [NIGHT],
        then: [
          { label: "Turn the lights off", icon: "living", set: { living: false } },
          { label: "Lock the front door", icon: "lock", set: { locked: true } },
        ],
        hint: "Press the button, with and without the internet. At midday the same button does nothing.",
      },
    ],
  },
  "scene-buttons": {
    rules: [
      {
        devices: ["doorSensor", "living", "lock", "button"],
        start: { living: true, locked: false, doorOpen: false, night: true },
        trigger: { label: "You press the goodnight button", icon: "button", event: "button" },
        ifs: [{ label: "The front door is closed", icon: "doorSensor", test: { doorOpen: false } }],
        then: [
          { label: "Turn the lights off", icon: "living", set: { living: false } },
          { label: "Lock the door", icon: "lock", set: { locked: true } },
        ],
        hint: "Press the button. Open the door first and it will not lock an open door.",
      },
      {
        devices: ["doorSensor", "living", "tv", "camera", "button"],
        start: { living: true, tv: true, camera: false, doorOpen: false },
        trigger: { label: "You press the leaving button", icon: "button", event: "button" },
        ifs: [{ label: "The front door is closed", icon: "doorSensor", test: { doorOpen: false } }],
        then: [
          { label: "Turn off the light and TV", icon: "living", set: { living: false, tv: false } },
          { label: "Arm the camera", icon: "camera", set: { camera: true } },
        ],
        hint: "One press on your way out. The checks run first, so it only acts when the door is shut.",
      },
      {
        devices: ["night", "living", "tv", "curtains", "button"],
        start: { night: true, living: true, tv: false, curtains: true },
        trigger: { label: "You press the movie button", icon: "button", event: "button" },
        ifs: [NIGHT],
        then: [
          { label: "Turn the light off", icon: "living", set: { living: false } },
          { label: "Close the curtains", icon: "curtains", set: { curtains: false } },
          { label: "Turn the TV on", icon: "tv", set: { tv: true } },
        ],
        hint: "Press the button at night. In daytime it keeps the room bright, nobody wants a dark room at noon.",
      },
    ],
  },
  "presence-sensors": {
    rules: [
      {
        devices: ["presence", "night", "living"],
        start: { present: false, night: false, living: false },
        trigger: { label: "You sit down at the desk", icon: "presence", when: { present: true } },
        ifs: [DAY],
        then: [{ label: "Turn on the light", icon: "living", set: { living: true } }],
        hint: "Sit down in daytime and the light comes on. At night you might want a different scene.",
      },
      {
        devices: ["presence", "ac"],
        start: { present: true, ac: 24, living: true },
        trigger: { label: "The room empties", icon: "presence", when: { present: false } },
        ifs: [{ label: "The aircon is running", icon: "ac", test: { ac: { gte: 1 } } }],
        then: [{ label: "Turn the aircon off", icon: "ac", set: { ac: 0 } }],
        hint: "Tap the sensor to leave the room. The aircon follows you out.",
      },
      {
        devices: ["presence", "night", "living"],
        tones: true,
        start: { present: false, night: true, living: false, tone: 0 },
        trigger: { label: "You walk into the bathroom", icon: "presence", when: { present: true } },
        ifs: [NIGHT],
        then: [{ label: "Turn on a dim light", icon: "living", set: { living: true, tone: 2 } }],
        hint: "Step in at night for a gentle light. By day it would be pointless.",
      },
    ],
  },
  "voice-control": {
    rules: [
      {
        devices: ["voice", "night", "living", "lock"],
        start: { night: true, living: true, locked: false, voice: false },
        trigger: { label: "You say goodnight", icon: "voice", event: "voice", say: "Alexa, goodnight" },
        ifs: [NIGHT],
        then: [
          { label: "Turn the lights off", icon: "living", set: { living: false } },
          { label: "Lock the front door", icon: "lock", set: { locked: true } },
        ],
        hint: "Tap the speaker to talk to it. The routine only runs at night.",
      },
      {
        devices: ["voice", "away", "living", "tv"],
        start: { away: false, living: true, tv: false, voice: false },
        trigger: { label: "You say movie time", icon: "voice", event: "voice", say: "Alexa, movie time" },
        ifs: [HOME],
        then: [
          { label: "Turn the light off", icon: "living", set: { living: false } },
          { label: "Turn the TV on", icon: "tv", set: { tv: true } },
        ],
        hint: "Say it with someone home. Set Away and it ignores the request.",
      },
      {
        devices: ["voice", "doorSensor"],
        start: { doorOpen: true, voice: false },
        trigger: { label: "You ask which doors are open", icon: "voice", event: "voice", say: "Alexa, which doors are open?" },
        ifs: [{ label: "A door is open", icon: "doorSensor", test: { doorOpen: true } }],
        then: [notify("The front door is open", "Answer on the display")],
        hint: "Ask the speaker. Close the door first and there is nothing to report.",
      },
    ],
  },
  "wall-panels": {
    rules: [
      {
        devices: ["motion", "panel"],
        start: { panelDim: true, motion: false },
        trigger: { label: "You walk past the panel", icon: "motion", when: { motion: true } },
        ifs: [{ label: "The panel is asleep", icon: "panel", test: { panelDim: true } }],
        then: [{ label: "Wake the panel up", icon: "panel", set: { panelDim: false } }],
        hint: "Trigger the motion sensor and the screen wakes as you pass.",
      },
      {
        devices: ["night", "panel"],
        start: { night: false, panelDim: false },
        trigger: { label: "The sun sets", icon: "night", when: { night: true } },
        ifs: [{ label: "The panel is awake", icon: "panel", test: { panelDim: false } }],
        then: [{ label: "Dim the panel", icon: "panel", set: { panelDim: true } }],
        hint: "Switch to Night and the screen stops lighting up your hallway.",
      },
      {
        devices: ["visitor", "away", "panel", "camera"],
        start: { visitor: false, away: false, panelDim: true, camera: true },
        trigger: { label: "Someone rings the doorbell", icon: "visitor", when: { visitor: true } },
        ifs: [HOME],
        then: [
          { label: "Wake the panel", icon: "panel", set: { panelDim: false } },
          notify("Doorbell: camera on the panel", "Show the camera feed"),
        ],
        hint: "Ring the bell with someone home. Set Away and it goes to your phone instead.",
      },
    ],
  },

  // ---------------------------------------------------------------- Media control
  "multi-room-audio": {
    rules: [
      {
        devices: ["clock", "away", "speakers"],
        start: { speakers: false, away: false, living: true },
        trigger: { label: "The morning schedule", icon: "clock", event: "clock", time: "7:00 am" },
        ifs: [HOME],
        then: [{ label: "Start the playlist in the kitchen", icon: "speakers", set: { speakers: true } }],
        hint: "Tap the clock. With the house on Away there is nobody to hear it.",
      },
      {
        devices: ["away", "speakers", "button"],
        start: { speakers: false, away: false, living: false, bedroom: false },
        trigger: { label: "You press the party button", icon: "button", event: "button" },
        ifs: [HOME],
        then: [
          { label: "Play the same music in every room", icon: "speakers", set: { speakers: true } },
          { label: "Turn on the lights", icon: "living", set: { living: true, bedroom: true } },
        ],
        hint: "One press for the whole house. Nothing happens if the house is empty.",
      },
      {
        devices: ["clock", "speakers"],
        start: { speakers: true, living: true },
        trigger: { label: "Bedtime arrives", icon: "clock", event: "clock", time: "10:30 pm" },
        ifs: [{ label: "Music is playing", icon: "speakers", test: { speakers: true } }],
        then: [{ label: "Stop the music everywhere", icon: "speakers", set: { speakers: false } }],
        hint: "Tap the clock. Stop the music yourself first and there is nothing left to do.",
      },
    ],
  },
  "tv-control": {
    rules: [
      {
        devices: ["tv", "living", "curtains"],
        start: { tv: false, living: true, curtains: true, night: true },
        trigger: { label: "The TV turns on", icon: "tv", when: { tv: true } },
        ifs: [],
        then: [
          { label: "Turn the light off", icon: "living", set: { living: false } },
          { label: "Close the curtains", icon: "curtains", set: { curtains: false } },
        ],
        hint: "The TV is off and the room is bright. Turn the TV on and watch the room set itself up for the film.",
      },
      {
        devices: ["presence", "tv"],
        start: { present: true, tv: true, living: false },
        trigger: { label: "Nobody in the room for 20 minutes", icon: "presence", when: { present: false } },
        ifs: [{ label: "The TV is on", icon: "tv", test: { tv: true } }],
        then: [{ label: "Turn the TV off", icon: "tv", set: { tv: false } }],
        hint: "Make the room empty. The TV shuts itself off, you will not pay for the electricity.",
      },
      {
        devices: ["clock", "tv"],
        start: { tv: true, bedroom: true, living: false },
        trigger: { label: "Bedtime arrives", icon: "clock", event: "clock", time: "11:00 pm" },
        ifs: [{ label: "The TV is on", icon: "tv", test: { tv: true } }],
        then: [
          { label: "Turn the TV off", icon: "tv", set: { tv: false } },
          notify("TV turned off for bedtime"),
        ],
        hint: "Tap the clock. If you already turned it off, nothing else happens.",
      },
    ],
  },
  soundbars: {
    rules: [
      {
        devices: ["tv", "soundbar"],
        start: { tv: false, soundbar: false, living: false },
        trigger: { label: "The TV turns on", icon: "tv", when: { tv: true } },
        ifs: [{ label: "The soundbar is off", icon: "soundbar", test: { soundbar: false } }],
        then: [{ label: "Turn the soundbar on", icon: "soundbar", set: { soundbar: true } }],
        hint: "Turn the TV on. One remote, both devices.",
      },
      {
        devices: ["soundbar", "night"],
        start: { soundbar: false, night: true, tv: true, living: false },
        trigger: { label: "The soundbar turns on", icon: "soundbar", when: { soundbar: true } },
        ifs: [NIGHT],
        then: [notify("Night mode on, effects lowered", "Lower the loud effects")],
        hint: "Turn the soundbar on at night. By day it plays at full strength.",
      },
      {
        devices: ["tv", "soundbar"],
        start: { tv: true, soundbar: true, living: false },
        trigger: { label: "The TV turns off", icon: "tv", when: { tv: false } },
        ifs: [{ label: "The soundbar is on", icon: "soundbar", test: { soundbar: true } }],
        then: [{ label: "Turn the soundbar off", icon: "soundbar", set: { soundbar: false } }],
        hint: "Turn the TV off. The soundbar follows, no standby power wasted.",
      },
    ],
  },
  "streaming-boxes": {
    rules: [
      {
        devices: ["streaming", "tv", "night", "living"],
        start: { streaming: false, tv: false, night: true, living: true },
        trigger: { label: "You open your streaming app", icon: "streaming", when: { streaming: true } },
        ifs: [NIGHT],
        then: [{ label: "Dim the lights", icon: "living", set: { living: false } }],
        hint: "Start the box at night and the lights dim. In daytime they stay on.",
      },
      {
        devices: ["clock", "streaming", "tv"],
        start: { streaming: true, tv: true, living: false },
        trigger: { label: "Kids' bedtime", icon: "clock", event: "clock", time: "8:30 pm" },
        ifs: [{ label: "The box is playing", icon: "streaming", test: { streaming: true } }],
        then: [
          { label: "Stop the box", icon: "streaming", set: { streaming: false } },
          { label: "Turn the TV off", icon: "tv", set: { tv: false } },
        ],
        hint: "Tap the clock. If it is already off, there is nothing to switch.",
      },
      {
        devices: ["away", "tv", "streaming", "living"],
        start: { away: false, tv: true, streaming: true, living: true },
        trigger: { label: "Everyone leaves", icon: "away", when: { away: true } },
        ifs: [{ label: "The TV is on", icon: "tv", test: { tv: true } }],
        then: [
          { label: "Turn the TV and box off", icon: "tv", set: { tv: false, streaming: false } },
          { label: "Turn the light off", icon: "living", set: { living: false } },
        ],
        hint: "Set the house to Away. Everything shuts down behind you.",
      },
    ],
  },

  // ---------------------------------------------------------------- Appliances
  "smart-plugs": {
    rules: [
      {
        devices: ["night", "away", "plug"],
        start: { night: false, away: false, plug: false, living: false },
        trigger: { label: "The sun sets", icon: "night", when: { night: true } },
        ifs: [HOME],
        then: [{ label: "Turn the lamp on", icon: "plug", set: { plug: true } }],
        hint: "Switch to Night. An ordinary lamp comes on by itself. Set Away first and it stays dark.",
      },
      {
        devices: ["clock", "plug"],
        start: { plug: true, living: false },
        trigger: { label: "Four hours of charging", icon: "clock", event: "clock", time: "+4 hours" },
        ifs: [{ label: "The plug is on", icon: "plug", test: { plug: true } }],
        then: [
          { label: "Switch the charger off", icon: "plug", set: { plug: false } },
          notify("Charger turned off"),
        ],
        hint: "Tap the clock. The charger stops so your phone does not trickle all night.",
      },
      {
        devices: ["bedroom", "night", "plug"],
        start: { bedroom: true, night: true, plug: true, living: false },
        trigger: { label: "The bedroom light goes off", icon: "bedroom", when: { bedroom: false } },
        ifs: [NIGHT, { label: "The plug is on", icon: "plug", test: { plug: true } }],
        then: [{ label: "Turn the plug off", icon: "plug", set: { plug: false } }],
        hint: "Turn the bedroom light off. The fan or lamp on the plug follows when you go to sleep.",
      },
    ],
  },
  "power-strips": {
    rules: [
      {
        devices: ["clock", "powerstrip", "tv", "soundbar"],
        start: { power: true, tv: true, soundbar: true, living: false },
        trigger: { label: "Midnight", icon: "clock", event: "clock", time: "12:00 am" },
        ifs: [{ label: "The strip is on", icon: "powerstrip", test: { power: true } }],
        then: [{ label: "Cut power to the TV area", icon: "powerstrip", set: { power: false, tv: false, soundbar: false } }],
        hint: "Tap the clock. Everything on the strip loses power, including standby draw.",
      },
      {
        devices: ["presence", "powerstrip", "tv"],
        start: { present: true, power: true, tv: true, living: false },
        trigger: { label: "You leave the desk", icon: "presence", when: { present: false } },
        ifs: [{ label: "The strip is on", icon: "powerstrip", test: { power: true } }],
        then: [{ label: "Switch the strip off", icon: "powerstrip", set: { power: false, tv: false } }],
        hint: "Leave the room. Your monitor and chargers go dark.",
      },
      {
        devices: ["clock", "powerstrip"],
        start: { power: true, living: false },
        trigger: { label: "Midnight", icon: "clock", event: "clock", time: "12:00 am" },
        ifs: [],
        then: [{ label: "Turn off all outlets except the router", icon: "powerstrip", set: { power: false, alert: "Router outlet stays on" } }],
        hint: "One outlet is marked always on, so the router keeps running while the rest go to sleep.",
      },
    ],
  },
  "dog-feeders": {
    rules: [
      {
        devices: ["clock", "feeder"],
        hide: ["bed"],
        start: { feeder: false, bedroom: true, living: true },
        trigger: { label: "Dinner time", icon: "clock", event: "clock", time: "6:00 pm" },
        ifs: [{ label: "The bowl is empty", icon: "feeder", test: { feeder: false } }],
        then: [
          { label: "Serve the meal", icon: "feeder", set: { feeder: true } },
          notify("Meal served"),
        ],
        hint: "Tap the clock for dinner. Serve it already and it will not overfeed.",
      },
      {
        devices: ["clock", "feeder"],
        hide: ["bed"],
        start: { feeder: false, bedroom: true, living: true },
        trigger: { label: "The hopper drops below 20%", icon: "clock", event: "clock", time: "Low" },
        ifs: [],
        then: [notify("Food hopper is low", "Remind you to refill")],
        hint: "Tap the clock to simulate a nearly empty hopper. You get told before it is empty.",
      },
      {
        devices: ["away", "feeder"],
        hide: ["bed"],
        start: { away: false, feeder: false, bedroom: true, living: true },
        trigger: { label: "Everyone leaves", icon: "away", when: { away: true } },
        ifs: [{ label: "The bowl is empty", icon: "feeder", test: { feeder: false } }],
        then: [
          { label: "Serve a meal", icon: "feeder", set: { feeder: true } },
          notify("Meal served, clip ready"),
        ],
        hint: "Set the house to Away. Your dog is fed even if you are stuck at work.",
      },
    ],
  },
  humidifiers: {
    rules: [
      {
        devices: ["humidity", "night", "humidifier"],
        start: { rh: 55, night: true, humidifier: false, living: false, bedroom: true },
        trigger: { label: "The air gets dry", icon: "humidity", when: { rh: { lte: 40 } } },
        ifs: [NIGHT],
        then: [{ label: "Turn the humidifier on", icon: "humidifier", set: { humidifier: true } }],
        hint: "Tap the humidity sensor to dry the air. It only runs at night while you sleep.",
      },
      {
        devices: ["humidity", "humidifier"],
        start: { rh: 35, humidifier: true, living: false, bedroom: true },
        trigger: { label: "The air is comfortable again", icon: "humidity", when: { rh: { gte: 55 } } },
        ifs: [{ label: "The humidifier is on", icon: "humidifier", test: { humidifier: true } }],
        then: [{ label: "Turn the humidifier off", icon: "humidifier", set: { humidifier: false } }],
        hint: "Tap the humidity sensor to raise the reading. It shuts off before the room gets damp.",
      },
      {
        devices: ["clock", "humidifier"],
        start: { humidifier: true, living: false, bedroom: true },
        trigger: { label: "The tank runs out", icon: "clock", event: "clock", time: "Empty" },
        ifs: [{ label: "The humidifier is on", icon: "humidifier", test: { humidifier: true } }],
        then: [
          { label: "Turn it off", icon: "humidifier", set: { humidifier: false } },
          notify("Humidifier tank is low"),
        ],
        hint: "Tap the clock to empty the tank. It stops, and tells you.",
      },
    ],
  },
  "air-purifiers": {
    rules: [
      {
        devices: ["air", "away", "purifier"],
        start: { dusty: false, away: false, purifier: false },
        trigger: { label: "The air gets smoky", icon: "air", when: { dusty: true } },
        ifs: [HOME],
        then: [{ label: "Turn the purifier on, high", icon: "purifier", set: { purifier: true } }],
        hint: "Tap Air quality to simulate cooking smoke. The purifier clears it.",
      },
      {
        devices: ["night", "purifier"],
        start: { night: false, purifier: true },
        trigger: { label: "The sun sets", icon: "night", when: { night: true } },
        ifs: [{ label: "The purifier is on", icon: "purifier", test: { purifier: true } }],
        then: [notify("Purifier on quiet speed", "Drop to the quietest speed")],
        hint: "Switch to Night. It keeps cleaning, but quietly so you can sleep.",
      },
      {
        devices: ["clock", "purifier"],
        start: { purifier: true },
        trigger: { label: "Six months of use", icon: "clock", event: "clock", time: "6 months" },
        ifs: [],
        then: [notify("Filter at 10%, replace soon", "Send a filter reminder")],
        hint: "Tap the clock. You never have to remember when the filter needs changing.",
      },
    ],
  },
  "robot-vacuums": {
    rules: [
      {
        devices: ["away", "lock", "vacuum"],
        start: { away: false, locked: true, vacuum: false, living: true },
        trigger: { label: "Everyone leaves", icon: "away", when: { away: true } },
        ifs: [{ label: "The front door is locked", icon: "lock", test: { locked: true } }],
        then: [{ label: "Start cleaning", icon: "vacuum", set: { vacuum: true } }],
        hint: "Set the house to Away. Unlock the door first and it will not start with the house open.",
      },
      {
        devices: ["away", "vacuum"],
        start: { away: true, vacuum: true, living: false },
        trigger: { label: "Someone gets home", icon: "home", when: { away: false } },
        ifs: [{ label: "The vacuum is cleaning", icon: "vacuum", test: { vacuum: true } }],
        then: [{ label: "Return to the dock", icon: "vacuum", set: { vacuum: false } }],
        hint: "Set Home. It stops mid-run and goes back to its dock so it is out of the way.",
      },
      {
        devices: ["clock", "night", "vacuum"],
        start: { night: true, vacuum: false, living: false },
        trigger: { label: "After dinner", icon: "clock", event: "clock", time: "8:00 pm" },
        ifs: [NIGHT],
        then: [{ label: "Clean the kitchen", icon: "vacuum", set: { vacuum: true } }],
        hint: "Tap the clock. Switch to Day first and it holds off until the evening.",
      },
    ],
  },
}
