export interface Platform {
  slug: "alexa" | "apple-home" | "google-home"
  name: string
  /** Value used by the ecosystem filter on /devices */
  ecosystem: string
  short: string
  setup: { title: string; body: string }[]
  goodFor: string[]
  limits: string[]
  faqs: { q: string; a: string }[]
}

export const platforms: Record<Platform["slug"], Platform> = {
  alexa: {
    slug: "alexa",
    name: "Alexa",
    ecosystem: "Alexa",
    short: "Voice-first control with the widest range of compatible brands.",
    setup: [
      {
        title: "Echo placement and Alexa app",
        body: "We pick the right Echo for each room, connect it to your WiFi and set up the Alexa app for everyone at home.",
      },
      {
        title: "Device linking and room names",
        body: "Each smart device gets linked, named in plain words and put in the right room, so \"turn off the bedroom lights\" works the first time.",
      },
      {
        title: "Routines for your day",
        body: "Good morning, movie time, leaving home and goodnight, each one set to run several devices from a single phrase or a schedule.",
      },
      {
        title: "Locks and cameras, safely",
        body: "Smart locks are set up with a voice code so nobody can unlock your door just by asking, and cameras are checked from the Alexa app.",
      },
      {
        title: "Matter and Zigbee devices",
        body: "Matter devices pair straight to Alexa. Some Echo models also have a built-in Zigbee hub, which we use where it saves you buying a separate one.",
      },
    ],
    goodFor: [
      "You want to control things by voice in every room.",
      "You mix brands and want the most options to choose from.",
      "Your household uses both Android phones and iPhones.",
    ],
    limits: [
      "Most voice commands need the internet, so the Echo is not much use when the connection is down.",
      "Smart locks need a voice code to unlock by voice. That is a safety feature, not a bug.",
      "More devices means more names to remember, so we keep naming simple.",
    ],
    faqs: [
      {
        q: "Do I need an Echo speaker to use Alexa smart home devices?",
        a: "No. You can control devices from the Alexa app on your phone. An Echo adds hands-free voice control in the room.",
      },
      {
        q: "Can Alexa control my aircon?",
        a: "Yes, with a smart aircon controller linked to Alexa. You can switch the unit on and off, set the temperature and run it in a routine such as goodnight.",
      },
      {
        q: "Does Alexa work with Matter?",
        a: "Yes. Matter devices can be added to Alexa, and Matter keeps working across Alexa, Apple Home and Google Home if you ever switch.",
      },
    ],
  },
  "apple-home": {
    slug: "apple-home",
    name: "Apple Home",
    ecosystem: "HomeKit",
    short: "Private, quiet and tied into your iPhone, with fewer but carefully made devices.",
    setup: [
      {
        title: "Home hub setup",
        body: "A HomePod, HomePod mini or Apple TV acts as your home hub. We set it up so your home works when you are out and automations run on their own.",
      },
      {
        title: "Rooms, zones and scenes",
        body: "We build the Home app around how your house is actually laid out, then add scenes like Morning and Movie night.",
      },
      {
        title: "Automations",
        body: "Lights that turn on when you get home, a lock that checks itself at night, fans that start when it gets warm.",
      },
      {
        title: "Matter and Thread devices",
        body: "Matter devices pair directly to the Home app, and Thread devices use your hub as a border router for faster, steadier connections.",
      },
      {
        title: "Family sharing",
        body: "Everyone in the house gets the right level of access from their own iPhone, with no shared passwords.",
      },
    ],
    goodFor: [
      "Your household mostly uses iPhones and iPads.",
      "Privacy matters to you and you like things to feel simple.",
      "You prefer fewer, well-built devices over a huge catalogue.",
    ],
    limits: [
      "You need an iPhone or iPad. Android phones cannot run the Home app.",
      "Control from outside the house and automations need a home hub.",
      "Fewer devices work with it than with Alexa, so we check compatibility before you buy.",
    ],
    faqs: [
      {
        q: "Do I need a HomePod or Apple TV for Apple Home?",
        a: "You can control devices from your iPhone at home without one. For control when you are away and for automations, Apple requires a home hub, which can be a HomePod, HomePod mini or Apple TV.",
      },
      {
        q: "What does Works with Apple Home mean?",
        a: "It means the device has been built to connect to the Home app, either through HomeKit or Matter. We only recommend devices that carry it for Apple Home setups.",
      },
      {
        q: "Can I use Apple Home with Alexa or Google Home at the same time?",
        a: "Yes, if the device supports Matter. One Matter device can be added to more than one platform, so you are not locked in.",
      },
    ],
  },
  "google-home": {
    slug: "google-home",
    name: "Google Home",
    ecosystem: "Google Home",
    short: "Routines that run your day, on both Android and iPhone.",
    setup: [
      {
        title: "Google Home app and household",
        body: "We create your home in the Google Home app, invite the family and put every device in the right room.",
      },
      {
        title: "Nest speakers and displays",
        body: "We place Nest speakers and displays where you will actually use them. Some Nest devices also act as Matter and Thread hubs.",
      },
      {
        title: "Routines",
        body: "Routines start from a voice phrase, a time, sunrise or sunset, or when you leave home, then run as many actions as you like.",
      },
      {
        title: "Cameras, TV and speakers",
        body: "Cameras, Chromecast or Google TV and speakers are tied into the same home, so movie night is one phrase.",
      },
      {
        title: "Matter devices",
        body: "Matter devices pair to Google Home directly and stay usable if you change platforms later.",
      },
    ],
    goodFor: [
      "You use Android and want everything to connect to your phone.",
      "You like the idea of routines that run on their own schedule.",
      "You already use Google services like Chromecast, Google TV or Nest.",
    ],
    limits: [
      "Features change often, so some routine options vary by device and region.",
      "Voice commands need the internet, like most cloud assistants.",
      "Not every brand supports Google Home, so we check before you buy.",
    ],
    faqs: [
      {
        q: "Does Google Home work on iPhone?",
        a: "Yes. The Google Home app is available for both Android and iPhone, so a mixed household can share one setup.",
      },
      {
        q: "What can a Google Home routine do?",
        a: "A routine starts from something like a voice phrase, a time, or sunrise and sunset, then runs several actions together, for example turning off lights, locking the door and setting the aircon.",
      },
      {
        q: "Do I need a Nest speaker to use Google Home?",
        a: "No. You can control devices from the Google Home app. A Nest speaker or display adds voice control and, on some models, acts as a hub for Matter and Thread devices.",
      },
    ],
  },
}

export const platformList = [platforms.alexa, platforms["apple-home"], platforms["google-home"]]
