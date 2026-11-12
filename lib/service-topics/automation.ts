import type { ServiceTopic } from "./types"

export const automationTopics: ServiceTopic[] = [
  {
    slug: "smart-hubs",
    service: "automation",
    icon: "hub",
    name: "Smart hubs",
    cardBlurb: "The local brain that keeps routines working when the internet drops.",
    metaTitle: "Smart Home Hubs and Home Assistant in Pampanga, Tarlac and Bulacan",
    metaDescription:
      "A local smart home hub keeps routines running without internet. Home Assistant and other hubs set up in Central Luzon.",
    headline: "Smart hubs,",
    headlineItalic: "the brain of the house.",
    intro: "One hub ties every device together and runs your routines locally, even when the internet is down.",
    why: [
      "Without a hub, every device has its own app and its own cloud. Routines depend on the internet, and one brand rarely talks to another. A hub brings it all into one place.",
      "A local hub also helps with a problem we all know. When the internet drops, a cloud-only home stops responding. On a local hub, lights, sensors and schedules keep working.",
    ],
    install: [
      { title: "Plan the system", body: "We list your devices, rooms and how you want the house to behave. We choose the hub that fits, such as Home Assistant, or the one built into your Apple, Google or Amazon devices." },
      { title: "Set up the hub", body: "We install the hub on reliable hardware, connect it to your router by cable, and add the radios for the devices you use." },
      { title: "Add and name devices", body: "We pair every device, name them by room, and group them so voice commands and dashboards make sense." },
      { title: "Build routines and hand over", body: "We create your routines, set up a dashboard on your phone, and walk the family through it. We also set a backup so a failure does not lose your setup." },
    ],
    automations: [
      { title: "Good morning", body: "Curtains open, the kitchen light turns on, and the news speaker starts." },
      { title: "Everyone left", body: "The last person leaves and the lights, aircon and TV all turn off." },
      { title: "Goodnight", body: "One button locks the door, turns off lights and checks that windows are closed." },
    ],
    goodToKnow: [
      "A hub needs power and a network. We recommend a small UPS so it keeps running through short brownouts.",
      "Home Assistant is powerful and flexible. It takes setup time, which is why we do it for you.",
      "Voice assistant hubs are simpler but depend more on the cloud. We explain the trade-offs for your home.",
    ],
    faqs: [
      { q: "Do I need a hub?", a: "For a few bulbs, no. For a home with lights, locks, sensors and aircon, a hub makes everything more reliable and easier to use." },
      { q: "What is Home Assistant?", a: "It is free, open source software that runs on a small computer in your home. It connects devices from many brands and runs routines locally." },
      { q: "What if the hub breaks?", a: "We keep a backup of your configuration. Replacing the hardware and restoring the backup brings the system back." },
      { q: "Can I use Alexa, Google or Apple with it?", a: "Yes. A hub can share your devices with all three, so you can talk to your home however you like." },
    ],
  },
  {
    slug: "scene-buttons",
    service: "automation",
    icon: "button",
    name: "Scene buttons",
    cardBlurb: "One tap for movie night, goodnight or leaving the house.",
    metaTitle: "Smart Scene Buttons in Pampanga, Tarlac and Bulacan",
    metaDescription:
      "Wireless scene buttons for movie night, goodnight and away mode. Installed in Central Luzon.",
    headline: "Scene buttons,",
    headlineItalic: "one tap, many things.",
    intro: "A small button on the wall or the bedside table runs a whole routine. No phone needed.",
    why: [
      "Not everyone in your home wants to use an app or talk to a speaker. A button is something everyone understands, from kids to grandparents.",
      "It also fixes the awkward moment of reaching for your phone to turn things off at night. One press on the bedside table does it all.",
    ],
    install: [
      { title: "Decide the scenes", body: "We start with the moments you repeat every day: leaving, arriving, going to bed and watching TV." },
      { title: "Choose the button type", body: "A single button, a button with several presses, or a small remote with rows. We pick what suits each location." },
      { title: "Place and mount", body: "We mount buttons by the door, beside the bed and near the sofa, at a height people reach without thinking." },
      { title: "Label and teach", body: "We label what each press does and walk the family through it. A good button needs no explanation after the first day." },
    ],
    automations: [
      { title: "Goodnight", body: "One press turns off the lights, locks the door and turns on the night lights." },
      { title: "Leaving", body: "A button by the door turns off everything and arms the alerts." },
      { title: "Movie night", body: "One tap dims the lights, closes the curtains and turns on the TV." },
    ],
    goodToKnow: [
      "Buttons run on batteries and are wireless. They can be moved easily.",
      "Too many presses to remember defeats the point. We keep it to two or three actions per button.",
      "A button works only if the hub is running. A local hub keeps it responsive.",
    ],
    faqs: [
      { q: "Do buttons need wiring?", a: "No. They are wireless and can be stuck or screwed to a wall or placed on a table." },
      { q: "Can one button do different things?", a: "Yes. A single press, double press and long press can each run a different scene." },
      { q: "What if the battery dies?", a: "You get a low battery warning on your phone. Batteries usually last a long time." },
      { q: "Can I add more later?", a: "Yes. Buttons are easy to add once the hub is set up." },
    ],
  },
  {
    slug: "presence-sensors",
    service: "automation",
    icon: "presence",
    name: "Presence sensors",
    cardBlurb: "Lights and aircon that follow people, not timers.",
    metaTitle: "Smart Presence Sensors in Pampanga, Tarlac and Bulacan",
    metaDescription:
      "Presence sensors that keep lights and aircon on while you are in the room. Installed in Central Luzon.",
    headline: "Presence sensors,",
    headlineItalic: "the house knows you are there.",
    intro: "Unlike motion sensors, presence sensors notice you even when you are sitting still.",
    why: [
      "Motion sensors turn lights off on a person reading a book. A presence sensor can tell someone is still in the room, so the lights stay on as long as you do.",
      "That makes automation feel natural. Lights and aircon follow people through the house and turn off when the room is empty.",
    ],
    install: [
      { title: "Pick the rooms", body: "Presence sensors work best in rooms where people sit or sleep for a while, such as living rooms, home offices and bedrooms." },
      { title: "Choose the sensor", body: "Some use radar and some use a mix of motion and other signals. We choose based on room size and layout." },
      { title: "Mount and set the zones", body: "We aim the sensor and mark the zones that count, so a fan or a curtain moving does not fool it." },
      { title: "Tune it in daily use", body: "We adjust sensitivity and delays after a few days so it behaves the way your family lives." },
    ],
    automations: [
      { title: "Home office", body: "Lights and fan turn on when you sit at the desk and turn off ten minutes after you leave." },
      { title: "Living room aircon", body: "The aircon turns off if nobody has been in the room for 15 minutes." },
      { title: "Bathroom light", body: "The light stays on as long as you are in the room, even in the shower." },
    ],
    goodToKnow: [
      "Presence sensors cost more than motion sensors. Use them where they make the difference.",
      "Fans, curtains and pets can cause false detections. Placement and zones reduce this.",
      "Radar sensors can see through thin walls in some cases. We position them to avoid reading the next room.",
    ],
    faqs: [
      { q: "How is it different from a motion sensor?", a: "Motion sensors react to movement. Presence sensors notice you even when you are still, so lights stay on while you read or work." },
      { q: "Does it work with pets?", a: "It can detect them. Zones and settings help, but expect some tuning." },
      { q: "Is it a camera?", a: "No. It does not record images or sound. It only reports whether someone is in the room." },
      { q: "Where should I use it?", a: "Living rooms, home offices and bedrooms. Use motion sensors for halls and garages." },
    ],
  },
  {
    slug: "voice-control",
    service: "automation",
    icon: "voice",
    name: "Voice speakers and displays",
    cardBlurb: "Alexa, Google or Apple, set up properly in each room.",
    metaTitle: "Voice Control with Alexa, Google Home and Apple Home in Central Luzon",
    metaDescription:
      "Smart speakers and displays set up with your lights, locks and aircon. Alexa, Google Home and Apple Home in Pampanga, Tarlac and Bulacan.",
    headline: "Voice control,",
    headlineItalic: "talk to the house.",
    intro: "Speakers and displays in the rooms you use, set up so natural commands work.",
    why: [
      "Voice is the fastest way to do small things. Turn off the living room, set the bedroom aircon to 24, lock the front door. It also helps when your hands are full, or for family members who do not like apps.",
      "Good voice control depends on clean setup. Rooms and device names have to make sense, or the assistant gets confused.",
    ],
    install: [
      { title: "Choose the assistant", body: "Alexa, Google Home or Apple Home. We pick based on the phones your family uses and how much you want to talk to the house." },
      { title: "Place the speakers", body: "We put speakers where voices reach them clearly and away from noisy fans or TV speakers." },
      { title: "Name everything properly", body: "We use short, clear names for rooms and devices. This makes a huge difference when you say turn off the kitchen lights." },
      { title: "Create voice routines", body: "We set up phrases like goodnight or I am leaving, and make sure each family member can use them." },
    ],
    automations: [
      { title: "Goodnight", body: "Say goodnight and the house locks, turns off lights and sets the aircon for sleep." },
      { title: "Movie time", body: "Say movie time and the lights dim and the TV turns on." },
      { title: "Where is everyone", body: "Ask the display which doors and windows are open." },
    ],
    goodToKnow: [
      "Voice assistants rely on the internet for most commands. A local hub keeps lights, sensors and schedules working during outages.",
      "Smart displays have cameras and microphones. We explain the privacy settings and mute controls.",
      "Each assistant has its own platform page with details on what works best.",
    ],
    faqs: [
      { q: "Which assistant is best?", a: "The one your family already uses. If you have Android phones, Google Home fits. If you have iPhones, Apple Home works well. Alexa works with both." },
      { q: "Can I use more than one?", a: "Yes. A hub can share your devices with more than one assistant." },
      { q: "Can the speaker hear me across the house?", a: "No. Place a speaker or display in each room where you want to use voice." },
      { q: "What about privacy?", a: "Every speaker has a mute switch. We show you how to use it and what each assistant stores." },
    ],
  },
  {
    slug: "wall-panels",
    service: "automation",
    icon: "panel",
    name: "Wall control panels",
    cardBlurb: "A touchscreen by the door for anyone who skips the app.",
    metaTitle: "Smart Wall Control Panels in Pampanga, Tarlac and Bulacan",
    metaDescription:
      "Wall mounted control panels for lights, aircon, locks and cameras. Installed in Central Luzon.",
    headline: "Wall panels,",
    headlineItalic: "control for everyone.",
    intro: "A small touchscreen on the wall that shows and controls the house. No phone required.",
    why: [
      "Not every family member has a phone in hand. A wall panel gives kids, grandparents and guests a simple way to control the house, and gives you a view of what is on.",
      "It is also a good home for the things you check often: doors and windows, cameras, aircon status and the weather.",
    ],
    install: [
      { title: "Choose the location", body: "Usually near the entry or the kitchen, where people pass often. We check power and network access at that spot." },
      { title: "Pick the panel", body: "A dedicated panel or a mounted tablet. We select one that handles your dashboard well and stays on without overheating." },
      { title: "Mount and power it", body: "We recess or surface mount the panel, hide the cable and keep it flush to the wall." },
      { title: "Design the dashboard", body: "We build a dashboard with only what your family uses. A simple layout beats a crowded one." },
    ],
    automations: [
      { title: "Welcome screen", body: "The panel wakes when you walk by and shows door status and the next calendar event." },
      { title: "Night dim", body: "The screen dims after bedtime and turns off to avoid light in the hall." },
      { title: "Doorbell view", body: "The panel shows the doorbell camera when someone rings." },
    ],
    goodToKnow: [
      "Panels need constant power and a good network connection. We plan this before mounting.",
      "A panel is only useful if the dashboard is simple. We keep it focused.",
      "Screens age. A removable mount makes future upgrades easy.",
    ],
    faqs: [
      { q: "Is a wall panel better than a phone?", a: "It is a complement. The panel is for quick, shared control, and your phone is for control when you are away." },
      { q: "Can it show cameras?", a: "Yes. It can show a camera feed when someone presses the doorbell or on demand." },
      { q: "Does it need wiring?", a: "It needs power. We can hide the cable or install a power point behind the panel." },
      { q: "What if the screen breaks?", a: "Panels are replaceable. The dashboard lives on your hub, so a new panel loads the same layout." },
    ],
  },
]
