export interface HubDevice {
  name: string
  maker: string
  kind: "Speaker" | "Display" | "Wall panel" | "TV box"
  bestFor: string
  benefits: string[]
  /** Hub and radio capabilities shown as chips */
  hub: string[]
  ourTake: string
  /** Square product photo (600x600) in /public/devices */
  image?: string
}

/**
 * First-party devices only (made by Amazon, Apple or Google).
 * Capabilities come from the makers' published specs. Prices and Philippine stock are deliberately left out
 * because they change; we confirm both in the quote.
 */
export const platformDevices: Record<"alexa" | "apple-home" | "google-home", HubDevice[]> = {
  alexa: [
    {
      name: "Echo Dot",
      image: "/devices/alexa/echo-dot.webp",
      maker: "Amazon",
      kind: "Speaker",
      bestFor: "Bedrooms, study rooms and guest rooms",
      benefits: [
        "Voice control for the lights, aircon and locks in that room",
        "Built-in hub, so many devices connect without a separate box",
        "Fuller sound than the previous generation, good for music and alarms",
      ],
      hub: ["Zigbee", "Matter", "Thread"],
      ourTake: "The quiet, low-profile way to put Alexa in every room of the house.",
    },
    {
      name: "Echo Show 8",
      image: "/devices/alexa/echo-show.webp",
      maker: "Amazon",
      kind: "Display",
      bestFor: "Kitchen, living room or family area",
      benefits: [
        "See who is at the door and check your cameras on screen",
        "Video calls with family, plus recipes and timers in the kitchen",
        "Controls every room from one touch screen",
      ],
      hub: ["Zigbee", "Matter", "Thread"],
      ourTake: "Gives the whole family one screen to run the house from.",
    },
    {
      name: "Echo Hub",
      image: "/devices/alexa/echo-hub.webp",
      maker: "Amazon",
      kind: "Wall panel",
      bestFor: "Entryway, hallway or a central wall",
      benefits: [
        "A fixed control panel on the wall for lights, locks, cameras and aircon",
        "Anyone in the house can use it without a phone",
        "Wall-mounted for a clean look, with no clutter on a counter",
      ],
      hub: ["Zigbee", "Matter", "Thread"],
      ourTake: "Our pick when you want a permanent, designed control point.",
    },
    {
      name: "Echo Studio",
      image: "/devices/alexa/echo-studio.webp",
      maker: "Amazon",
      kind: "Speaker",
      bestFor: "Living rooms where sound matters",
      benefits: [
        "Premium audio with Dolby Atmos for music and movies",
        "Fills a large living room without extra speakers",
        "Doubles as a smart home hub for the room",
      ],
      hub: ["Zigbee", "Matter", "Thread"],
      ourTake: "For homes where good sound is part of the brief.",
    },
  ],
  "apple-home": [
    {
      name: "HomePod",
      image: "/devices/apple-home/homepod.webp",
      maker: "Apple",
      kind: "Speaker",
      bestFor: "Living rooms and main family spaces",
      benefits: [
        "High-quality room-filling sound with spatial audio",
        "Acts as your home hub, so you can control the house when you are away",
        "Built-in temperature and humidity sensing for the room",
      ],
      hub: ["Home hub", "Matter", "Thread"],
      ourTake: "The quality choice for an Apple household that wants great sound and a rock-solid hub.",
    },
    {
      name: "HomePod mini",
      image: "/devices/apple-home/homepod-mini.webp",
      maker: "Apple",
      kind: "Speaker",
      bestFor: "Bedrooms, kitchen and study",
      benefits: [
        "Siri voice control in more rooms",
        "Also works as a home hub, which keeps automations running",
        "Intercom between rooms and between family members",
      ],
      hub: ["Home hub", "Matter", "Thread"],
      ourTake: "The simple way to add coverage and Siri to the rest of the house.",
    },
    {
      name: "Apple TV 4K",
      image: "/devices/apple-home/apple-tv-4k.webp",
      maker: "Apple",
      kind: "TV box",
      bestFor: "Living room or home theatre",
      benefits: [
        "Home hub for the Apple Home app, plus your streaming in one box",
        "See a compatible video doorbell on the TV when someone arrives",
        "Cinema-quality picture and sound for movie night scenes",
      ],
      hub: ["Home hub", "Matter", "Thread (select models)"],
      ourTake: "Does two jobs at once: entertainment and the brain of the house.",
    },
  ],
  "google-home": [
    {
      name: "Google Home Speaker",
      maker: "Google",
      kind: "Speaker",
      bestFor: "Living rooms and bedrooms",
      benefits: [
        "Fuller sound than the older Nest Mini",
        "Works with Gemini, Google's newer voice assistant",
        "Built-in hub for Matter and Thread devices",
      ],
      hub: ["Matter", "Thread border router"],
      ourTake: "Google's current speaker and our default for adding voice control and a hub in one.",
    },
    {
      name: "Nest Hub (2nd gen)",
      maker: "Google",
      kind: "Display",
      bestFor: "Bedside tables, kitchens and desks",
      benefits: [
        "7-inch screen to see controls, cameras and routines at a glance",
        "Photo frame when idle, so it looks at home on a shelf",
        "Built-in hub for Matter and Thread devices",
      ],
      hub: ["Matter", "Thread border router"],
      ourTake: "A compact screen that blends into the room.",
    },
    {
      name: "Nest Hub Max",
      maker: "Google",
      kind: "Display",
      bestFor: "Kitchen, family room or home office",
      benefits: [
        "Larger 10-inch screen with a built-in camera for video calls and home checks",
        "Microphone and camera can be switched off with a physical switch",
        "Built-in hub for Matter and Thread devices",
      ],
      hub: ["Matter", "Thread border router"],
      ourTake: "The big screen for the room the family actually lives in.",
    },
  ],
}
