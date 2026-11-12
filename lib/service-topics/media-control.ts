import type { ServiceTopic } from "./types"

export const mediaTopics: ServiceTopic[] = [
  {
    slug: "multi-room-audio",
    service: "media-control",
    icon: "speaker",
    name: "Multi-room speakers",
    cardBlurb: "The same music across rooms, or a different one in each.",
    metaTitle: "Multi-room Audio in Pampanga, Tarlac and Bulacan",
    metaDescription:
      "Multi-room speakers that play in sync across your home. Planned and installed by Smart Home Philippines in Central Luzon.",
    headline: "Multi-room audio,",
    headlineItalic: "music that follows you.",
    intro: "Play the same song in the kitchen, living room and garden, or a different one in each room.",
    why: [
      "Music is part of how a home feels. Weekend cleaning, Sunday lunch with the family, a quiet evening. With multi-room audio you do not carry a speaker around.",
      "It also ties into scenes. A morning scene can start soft music in the kitchen, and goodnight can stop it everywhere with one command.",
    ],
    install: [
      { title: "Plan the rooms", body: "We choose which rooms get a speaker and where each one sits for even sound. Corners and shelves behave very differently." },
      { title: "Choose the system", body: "Speakers that work with AirPlay, Google Cast, or Alexa. We pick the one that matches your phones and streaming apps." },
      { title: "Set up the network", body: "Multi-room audio depends on good Wi-Fi. We check coverage in each room and fix weak spots before we place speakers." },
      { title: "Group and name the rooms", body: "We create groups like Downstairs and Everywhere, so you can say play music downstairs." },
    ],
    automations: [
      { title: "Morning kitchen", body: "At 7 a.m. the kitchen speaker plays a playlist at low volume." },
      { title: "Party mode", body: "One command groups all speakers and starts the same music everywhere." },
      { title: "Goodnight", body: "Music stops across the house and turns off the speakers." },
    ],
    goodToKnow: [
      "Different speaker brands often cannot group together. We keep the system to one ecosystem.",
      "Speakers rely on Wi-Fi. A weak signal causes dropouts.",
      "Outdoor speakers need weather resistant models.",
    ],
    faqs: [
      { q: "Can I mix brands?", a: "Sometimes, using a shared standard such as AirPlay 2 or Google Cast. We check what works together." },
      { q: "Do I need wiring?", a: "Not for wireless speakers. Wired in-ceiling speakers need cabling, which is best planned during construction." },
      { q: "Can I control it with voice?", a: "Yes. Play music in the living room works with Alexa, Google and Apple speakers." },
      { q: "Will it work during an internet outage?", a: "Streaming services will not. Local music on your phone or a home server still plays over your network." },
    ],
  },
  {
    slug: "tv-control",
    service: "media-control",
    icon: "tv",
    name: "TV control",
    cardBlurb: "Turn the TV on and off, change inputs and join scenes.",
    metaTitle: "Smart TV Control in Pampanga, Tarlac and Bulacan",
    metaDescription:
      "Control your TV with scenes, schedules and voice. Planned and installed in Central Luzon.",
    headline: "TV control,",
    headlineItalic: "one tap for movie night.",
    intro: "Link the TV to the rest of the house so it turns on with a scene, and turns off when you leave.",
    why: [
      "A movie night usually means several steps. Dim the lights, close the curtains, find the remote, pick the input. TV control collapses that into one tap or one phrase.",
      "It also stops waste. A TV left on in an empty room is the kind of thing you can fix with a rule.",
    ],
    install: [
      { title: "Check what the TV supports", body: "Most modern TVs can be controlled over the network. Older ones may need an infrared controller. We check each TV before we plan." },
      { title: "Choose the control method", body: "Network control, HDMI-CEC or infrared. We pick the one that works reliably with your model." },
      { title: "Connect to the hub", body: "We add the TV to your hub so it can join scenes and respond to voice." },
      { title: "Test the common actions", body: "We test power, volume and input changes, so you know it works before we leave." },
    ],
    automations: [
      { title: "Movie scene", body: "The TV turns on, lights dim and curtains close." },
      { title: "Empty room", body: "If the room is empty for 20 minutes, the TV turns off." },
      { title: "Bedtime", body: "The bedroom TV turns off at a set time, with a warning first." },
    ],
    goodToKnow: [
      "Some TVs take a while to wake up. We build short delays into scenes.",
      "Turning a TV on over the network depends on its settings. We adjust them.",
      "An infrared controller needs line of sight to the TV.",
    ],
    faqs: [
      { q: "Will it work with my TV?", a: "Most TVs from the last several years can be controlled. We check the brand and model first." },
      { q: "Can I change the input with my voice?", a: "On many TVs, yes. It depends on the model and the assistant." },
      { q: "Can I still use the normal remote?", a: "Yes. The smart controls work alongside it." },
      { q: "Do I need to buy a new TV?", a: "No. We work with the TV you have." },
    ],
  },
  {
    slug: "soundbars",
    service: "media-control",
    icon: "soundbar",
    name: "Soundbars and audio systems",
    cardBlurb: "Better TV sound, wired in and part of your scenes.",
    metaTitle: "Soundbar and Home Audio Setup in Pampanga, Tarlac and Bulacan",
    metaDescription:
      "Soundbars and home audio systems set up with your TV and scenes. Installed in Central Luzon.",
    headline: "Soundbars,",
    headlineItalic: "hear every word.",
    intro: "Clear dialogue and proper sound for the living room or media room, set up so you only need one remote.",
    why: [
      "TV speakers are thin. A soundbar or a small audio system makes dialogue clear and films more engaging, without a rack of equipment.",
      "Setup matters. A soundbar placed or connected the wrong way sounds worse than it should and leaves you with three remotes.",
    ],
    install: [
      { title: "Check the room and the TV", body: "We look at the size of the room, where you sit and which HDMI ports the TV has. Many TVs have a port that is made for a soundbar." },
      { title: "Choose the system", body: "A soundbar, a bar with a subwoofer, or a full surround setup. We match it to the room and your budget." },
      { title: "Connect and place", body: "We connect with HDMI where possible, place the bar and subwoofer, and tidy the cables." },
      { title: "Tune the sound and the control", body: "We adjust sound modes and make sure one remote controls power and volume for both devices." },
    ],
    automations: [
      { title: "Movie mode", body: "The soundbar switches to a movie sound mode when the movie scene starts." },
      { title: "Night mode", body: "After 10 p.m. it lowers loud effects so you do not wake the family." },
      { title: "Shared power", body: "The soundbar powers on and off with the TV." },
    ],
    goodToKnow: [
      "Subwoofers can be loud for neighbors, especially in townhouses. We set levels with that in mind.",
      "Not every TV and soundbar combination works the same over HDMI. We test before we leave.",
      "A room with hard surfaces and glass sounds different from a carpeted room.",
    ],
    faqs: [
      { q: "Soundbar or full surround system?", a: "A soundbar suits most living rooms. A full surround system is worth it in a dedicated media room." },
      { q: "Wired or wireless?", a: "Wired through HDMI is more reliable. Wireless subwoofers and rears are fine for most setups." },
      { q: "Can it join my multi-room music?", a: "Some soundbars can. We choose models that do if you want that." },
      { q: "Will it fit with my wall mounted TV?", a: "Yes. We choose a bar that sits below the TV or mounts under it." },
    ],
  },
  {
    slug: "streaming-boxes",
    service: "media-control",
    icon: "streaming",
    name: "Streaming boxes",
    cardBlurb: "One remote for everything you watch.",
    metaTitle: "Streaming Box Setup in Pampanga, Tarlac and Bulacan",
    metaDescription:
      "Streaming boxes and one-remote setups for your TV. Installed in Central Luzon.",
    headline: "Streaming boxes,",
    headlineItalic: "one remote, everything.",
    intro: "A good streaming box and a clean setup, so you stop juggling remotes and apps.",
    why: [
      "A fast, supported streaming box makes a TV much better to use. Menus are quick, apps update and the remote does what you expect.",
      "The right setup also makes your TV a part of the smart home. The box can start a scene, and your scenes can start the box.",
    ],
    install: [
      { title: "Choose the box", body: "Apple TV, Android TV or Fire TV. We choose based on your phones, your apps and your smart home system." },
      { title: "Check the network", body: "Streaming needs steady Wi-Fi or a cable. If the TV is far from the router, we fix that first." },
      { title: "Set up apps and accounts", body: "We install your apps, sign in with your accounts and arrange the home screen so the apps you use are first." },
      { title: "Connect to your scenes", body: "We link the box to your hub and set a single remote to control TV, box and sound." },
    ],
    automations: [
      { title: "Movie night", body: "A scene turns on the TV and opens the streaming app you use most." },
      { title: "Kids bedtime", body: "The box turns off at a set time on school nights." },
      { title: "Away", body: "When everyone leaves, the TV and box turn off." },
    ],
    goodToKnow: [
      "Streaming services need internet. Without it, only local content plays.",
      "Accounts and passwords are yours. We sign in with you present and do not store them.",
      "Cheap boxes slow down over time. A good one is worth it.",
    ],
    faqs: [
      { q: "Which box should I get?", a: "Apple TV suits iPhone households. Android TV and Fire TV work well for others. We help you choose." },
      { q: "Can I use my TV's built-in apps instead?", a: "Yes. A separate box is usually faster and gets updates for longer." },
      { q: "Can I control it by voice?", a: "Yes, with the remote or a smart speaker." },
      { q: "Will it work with my sound system?", a: "Yes. We connect it to the TV or soundbar and set the correct audio output." },
    ],
  },
]
