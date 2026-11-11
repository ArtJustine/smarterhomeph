export interface PlanItem {
  id: string
  label: string
  hint: string
}

export interface ServicePlan {
  slug: string
  /** Short name, used in the plan sent to the contact form */
  name: string
  title: string
  metaTitle: string
  metaDescription: string
  intro: string
  /** What the person is counting, e.g. "fixtures" */
  unit: string
  items: PlanItem[]
  /** Copy for the local SEO section */
  body: string[]
}

export const ROOMS = [
  "Entire home",
  "Living room",
  "Kitchen",
  "Dining area",
  "Master bedroom",
  "Bedroom 2",
  "Bedroom 3",
  "Bathroom",
  "Home office",
  "Garage",
  "Entrance and gate",
  "Garden and outdoor",
  "Other",
]

export const servicePlans: ServicePlan[] = [
  {
    slug: "lighting",
    name: "Smart lighting",
    title: "Smart lighting",
    metaTitle: "Smart Lighting Installation in Pampanga, Tarlac and Bulacan",
    metaDescription:
      "Plan smart bulbs, switches, light strips and accent lighting room by room. Installed by Smart Home Philippines in Pampanga, Tarlac and Bulacan.",
    intro: "Pick a room, then count what you want. We turn it into a written quote.",
    unit: "fixtures",
    items: [
      { id: "bulbs", label: "Smart bulbs", hint: "Replace existing bulbs" },
      { id: "switches", label: "Smart switches", hint: "Control a whole circuit from the wall" },
      { id: "strips", label: "Light strips", hint: "Under cabinets, behind TVs, along stairs" },
      { id: "accent", label: "Accent lighting", hint: "Wall washers, spots, cove lighting" },
    ],
    body: [
      "Good lighting is the easiest upgrade to feel. Scenes that change with the time of day, switches that still work like switches, and nothing for your family to learn.",
      "We plan lighting room by room and install it ourselves for homes in Angeles City, Mabalacat, San Fernando, Tarlac City, Malolos and Meycauayan.",
    ],
  },
  {
    slug: "security",
    name: "Smart security",
    title: "Smart security",
    metaTitle: "Smart Home Security, Cameras and Locks in Central Luzon",
    metaDescription:
      "Plan cameras, smart locks and door, window, motion and leak sensors for your home. Installed in Pampanga, Tarlac and Bulacan.",
    intro: "Tell us how many doors, windows, locks, cameras and sensors. We size the system to match.",
    unit: "devices",
    items: [
      { id: "doors", label: "Doors to monitor", hint: "Entry, patio, back door" },
      { id: "windows", label: "Windows to monitor", hint: "Ground floor and reachable windows" },
      { id: "locks", label: "Smart locks", hint: "Keypad, fingerprint or app unlock" },
      { id: "cameras", label: "Cameras", hint: "Indoor or outdoor" },
      { id: "leak", label: "Leak sensors", hint: "Kitchen, bathrooms, water heater" },
      { id: "motion", label: "Motion sensors", hint: "Halls, garage, garden" },
      { id: "door-sensors", label: "Door sensors", hint: "Open and close alerts" },
    ],
    body: [
      "A security setup should tell you what matters and stay quiet otherwise. Alerts on your phone, local recording where the camera supports it, and locks your family can actually use.",
      "We cover homes and small offices across Pampanga, Tarlac and Bulacan, and set everything up before we leave.",
    ],
  },
  {
    slug: "climate",
    name: "Smart climate",
    title: "Smart climate",
    metaTitle: "Smart Aircon and Climate Control in Pampanga, Tarlac and Bulacan",
    metaDescription:
      "Plan AC controllers, fan switches, curtain and blind controllers and temperature sensors for each room. Installed in Central Luzon.",
    intro: "Choose the rooms, then the aircon, fans, curtains and sensors you want in each.",
    unit: "devices",
    items: [
      { id: "ac", label: "AC controllers", hint: "Control split-type aircon from your phone" },
      { id: "fan", label: "Fan switches", hint: "Speed and schedule control" },
      { id: "curtains", label: "Curtain and blind controllers", hint: "Motorised or retrofit" },
      { id: "temp", label: "Temperature sensors", hint: "Trigger aircon and fans by room" },
    ],
    body: [
      "Aircon is the biggest part of most power bills here. Room sensors and schedules mean the space is cool when you arrive and off when you are not home.",
      "We install climate control for homes in Angeles City, Mabalacat, San Fernando, Tarlac City, Malolos and Meycauayan.",
    ],
  },
  {
    slug: "automation",
    name: "Home automation",
    title: "Home automation",
    metaTitle: "Home Automation and Hubs in Pampanga, Tarlac and Bulacan",
    metaDescription:
      "Plan hubs, scene buttons, presence sensors and wall panels for routines that keep working offline. Installed in Central Luzon.",
    intro: "Routines tie the other services together. Count what each room needs to trigger them.",
    unit: "devices",
    items: [
      { id: "hub", label: "Smart hub", hint: "Usually one per home" },
      { id: "buttons", label: "Scene buttons", hint: "One tap for movie night or goodnight" },
      { id: "presence", label: "Presence sensors", hint: "Lights and aircon follow people" },
      { id: "speakers", label: "Voice speakers or displays", hint: "Alexa, Google or Apple" },
      { id: "panel", label: "Wall control panels", hint: "For family members who skip the app" },
    ],
    body: [
      "Automation should feel like the house is just well run. Routines on a local hub keep working when the internet drops.",
      "We build and set up automation for homes across Pampanga, Tarlac and Bulacan.",
    ],
  },
  {
    slug: "media-control",
    name: "Media control",
    title: "Media control",
    metaTitle: "Smart Media Control: Multi-room Audio and TV in Central Luzon",
    metaDescription:
      "Plan multi-room speakers, TV control, soundbars and streaming for your home. Installed in Pampanga, Tarlac and Bulacan.",
    intro: "Choose rooms, then speakers, screens and streaming boxes.",
    unit: "devices",
    items: [
      { id: "speakers", label: "Multi-room speakers", hint: "Same music across rooms" },
      { id: "tv", label: "TVs to connect", hint: "Control with scenes and voice" },
      { id: "soundbar", label: "Soundbar or audio system", hint: "Living room or media room" },
      { id: "streaming", label: "Streaming boxes", hint: "One remote for everything" },
    ],
    body: [
      "Speakers and TVs should join your scenes, so movie night is one tap.",
      "We set up media control for homes in Angeles City, Mabalacat, San Fernando, Tarlac City, Malolos and Meycauayan.",
    ],
  },
  {
    slug: "appliances",
    name: "Smart appliances",
    title: "Appliances",
    metaTitle: "Smart Appliances: Plugs, Purifiers and Robot Vacuums in Central Luzon",
    metaDescription:
      "Plan smart plugs, power strips, pet feeders, humidifiers, air purifiers and robot vacuums for each room. Installed in Pampanga, Tarlac and Bulacan.",
    intro: "Pick a room, then count the appliances you want to schedule, control or track.",
    unit: "appliances",
    items: [
      { id: "plugs", label: "Smart plugs", hint: "Lamps, fans, small appliances" },
      { id: "strips", label: "Power strips", hint: "Switch each outlet separately" },
      { id: "feeder", label: "Dog feeders", hint: "Scheduled meals, even when you are out" },
      { id: "humidifier", label: "Humidifiers", hint: "Schedules and humidity-based control" },
      { id: "purifier", label: "Air purifiers", hint: "Auto mode and air quality alerts" },
      { id: "vacuum", label: "Robot vacuums", hint: "Cleaning runs when the house is empty" },
    ],
    body: [
      "Ordinary appliances become things you can schedule and control from your phone. Feeders, purifiers and vacuums run on their own while you are at work.",
      "We set up appliances for homes across Pampanga, Tarlac and Bulacan.",
    ],
  },
]

export const getPlan = (slug: string) => servicePlans.find((p) => p.slug === slug)
