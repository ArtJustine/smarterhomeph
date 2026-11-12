import type { ServiceTopic } from "./types"

export const lightingTopics: ServiceTopic[] = [
  {
    slug: "smart-bulbs",
    service: "lighting",
    icon: "bulb",
    name: "Smart bulbs",
    cardBlurb: "Dim, warm up or recolor the bulbs you already have sockets for.",
    metaTitle: "Smart Bulbs Installation in Pampanga, Tarlac and Bulacan",
    metaDescription:
      "Smart bulbs with scenes, schedules and voice control. Planned, supplied and set up by Smart Home Philippines in Central Luzon.",
    headline: "Smart bulbs,",
    headlineItalic: "the easiest upgrade.",
    intro: "Swap the bulb, keep the fixture. Get dimming, warm and cool light, and scenes without touching the wiring.",
    why: [
      "Lighting is the first thing people notice. Bright white at midday, warm and low in the evening, a soft glow at night when you walk to the kitchen. Smart bulbs make that happen without rewiring.",
      "They are also the quickest way to start. You can upgrade one room in an afternoon and see if you like it before doing more.",
    ],
    install: [
      { title: "Count and check sockets", body: "We list every bulb in the room and check the socket type and fixture. Enclosed fixtures and very small shades can overheat some bulbs, so we choose the right model." },
      { title: "Choose the right bulbs", body: "We pick white, tunable white or color bulbs depending on the room. Bedrooms and living rooms usually want tunable white. A color bulb is for accents, not for reading." },
      { title: "Pair to your hub", body: "We connect the bulbs to your hub or app and name them by room. This matters later when you say, turn off the kitchen." },
      { title: "Build scenes and a wall switch plan", body: "We create scenes like Evening and Movie. We also decide what happens when someone flips the wall switch, because that is the usual problem with smart bulbs." },
    ],
    automations: [
      { title: "Evening wind down", body: "At sunset the living room shifts from white to a warm, lower light." },
      { title: "Wake up gently", body: "The bedroom light fades up over ten minutes before your alarm." },
      { title: "Away lights", body: "When you are out of town, a few lights turn on and off in the evening so the house looks lived in." },
    ],
    goodToKnow: [
      "A smart bulb needs power. If someone turns it off at the wall switch, it cannot respond to voice or schedules. Switch covers or smart switches solve this.",
      "Cheap bulbs can flicker on dimmers or older switches. We test before we leave.",
      "Many bulbs means many devices on your network. We use a hub so your Wi-Fi does not get crowded.",
    ],
    faqs: [
      { q: "What happens when someone uses the wall switch?", a: "If the switch is off, the bulb has no power. We can fit a switch cover so it stays on, or use a smart switch instead." },
      { q: "Do smart bulbs work with Alexa, Google Home and Apple Home?", a: "Most do, but not all. We choose bulbs that work with the one you use, and we can set up more than one." },
      { q: "Will they work without internet?", a: "Bulbs paired to a local hub keep working with local automations and the wall panel. Voice assistants and remote control need internet." },
      { q: "How long do they last?", a: "Quality LED smart bulbs are rated for many years of normal use. Where you place them matters, since heat shortens life." },
    ],
  },
  {
    slug: "smart-switches",
    service: "lighting",
    icon: "switch",
    name: "Smart switches",
    cardBlurb: "Control a whole circuit from the wall, and from your phone.",
    metaTitle: "Smart Light Switches in Pampanga, Tarlac and Bulacan",
    metaDescription:
      "Smart wall switches that keep working like normal switches. Installed by a local team in Central Luzon.",
    headline: "Smart switches,",
    headlineItalic: "still a normal switch.",
    intro: "Keep the wall switch your family already uses. Add scenes, schedules and phone control behind it.",
    why: [
      "A smart switch controls every bulb on the circuit, including bulbs you will never replace. Chandeliers, downlights and fixtures with special bulbs all become smart without a single smart bulb.",
      "It also removes the biggest complaint with smart lighting. Guests and kids can use the wall switch like always, and it still works with your phone and voice.",
    ],
    install: [
      { title: "Check the wiring", body: "We open the switch box and check what wires are present. Some boxes have no neutral wire, and we plan for that before buying anything." },
      { title: "Choose the switch type", body: "Single, two-way and dimmer circuits each need a different switch. We match each one, and we check your bulbs work with dimming." },
      { title: "Install safely", body: "We switch off the breaker, fit the smart switch, and test it with the real load. All work follows normal electrical practice and is checked before we power up." },
      { title: "Set up scenes and buttons", body: "We name each switch, add it to rooms, and set up what a double tap or long press does." },
    ],
    automations: [
      { title: "Sunset porch light", body: "The porch light turns on at sunset and off at sunrise, adjusting through the year." },
      { title: "All off at the door", body: "One button by the front door turns off every light in the house." },
      { title: "Bathroom night mode", body: "After midnight the bathroom light turns on at a low level." },
    ],
    goodToKnow: [
      "Some switch boxes have no neutral wire. It is common enough that we always check first, and there are options that handle it.",
      "Not every LED bulb dims well. If you want dimming, we check bulb and switch compatibility.",
      "Wall switches are mounted into the wall. They take longer to install than bulbs, but need less upkeep.",
    ],
    faqs: [
      { q: "Do I need a neutral wire?", a: "Many smart switches do. If your box does not have one, we use a model that works without it, or fit a small relay behind the light." },
      { q: "Can I keep my existing bulbs?", a: "Yes. That is one of the main reasons to choose switches. Dimming depends on the bulb being dimmable." },
      { q: "Can I control one light separately in a room with several?", a: "Yes, if each light is on its own circuit. If they share a circuit, they switch together." },
      { q: "Is it safe?", a: "When fitted properly, yes. We use quality switches and follow normal electrical practice. If we find a wiring problem, we tell you first." },
    ],
  },
  {
    slug: "light-strips",
    service: "lighting",
    icon: "strip",
    name: "Light strips",
    cardBlurb: "Under cabinets, behind TVs and along stairs.",
    metaTitle: "Smart LED Light Strips in Pampanga, Tarlac and Bulacan",
    metaDescription:
      "Smart LED strips under cabinets, behind TVs and along stairs. Planned and installed in Central Luzon.",
    headline: "Light strips,",
    headlineItalic: "light where you need it.",
    intro: "A thin line of light under cabinets, behind the TV, along the stairs or inside a closet.",
    why: [
      "A strip lights a task or a path without lighting the whole room. Under the kitchen cabinets you can see what you are chopping. Along the stairs you can walk at night without switching on a bright light.",
      "Behind a TV it reduces eye strain and makes the room feel larger. A strip is also cheap enough to try in one spot first.",
    ],
    install: [
      { title: "Pick the spot and length", body: "We measure the run, find where power can reach, and check the surface. Dusty or oily surfaces need cleaning before the strip will stick." },
      { title: "Choose the strip", body: "White, tunable white or color. Under a cabinet we use a high quality white strip. Behind a TV, color works well." },
      { title: "Hide the wiring and the controller", body: "We cut to length, hide the cable and controller, and use channels or a diffuser to avoid dotted light." },
      { title: "Connect and set scenes", body: "We pair the strip to your hub, and add it to scenes so it follows the rest of the room." },
    ],
    automations: [
      { title: "Kitchen task light", body: "The under cabinet strip turns on when you walk into the kitchen and dims to a low level later at night." },
      { title: "Stair path", body: "A motion sensor lights the stairs softly at night." },
      { title: "Movie mode", body: "The TV turns on and the strip behind it fades to a low warm color." },
    ],
    goodToKnow: [
      "Cheap adhesive can peel in heat and humidity. We use good tape or mounting channels.",
      "Strips need a power supply near the strip. We plan where it will live before we cut anything.",
      "A visible dotted look can happen with bare strips. A diffuser channel fixes it.",
    ],
    faqs: [
      { q: "Can I cut the strip?", a: "Yes, at the marked points. We cut and reconnect it for you." },
      { q: "Will it work in the bathroom?", a: "Only with a strip rated for moisture. We choose the right one for wet areas." },
      { q: "Does it get hot?", a: "LED strips stay warm rather than hot. Good mounting channels help spread heat." },
      { q: "Can I change the color later?", a: "If you choose a color strip, yes. White only strips will not change color." },
    ],
  },
  {
    slug: "accent-lighting",
    service: "lighting",
    icon: "sparkles",
    name: "Accent lighting",
    cardBlurb: "Wall washers, spots and cove lighting that set the mood.",
    metaTitle: "Smart Accent Lighting in Pampanga, Tarlac and Bulacan",
    metaDescription:
      "Wall washers, spotlights and cove lighting with smart control. Planned and installed in Central Luzon.",
    headline: "Accent lighting,",
    headlineItalic: "the finishing touch.",
    intro: "Light the art, the wall, the ceiling edge or the plants. Control it with scenes so it only shows when you want it.",
    why: [
      "Main lights do the job. Accent lights set the mood. A washed wall, a lit shelf or a glowing ceiling cove changes how a room feels in the evening.",
      "With smart control, accent lighting becomes part of scenes. One tap for dinner, another for movie night, and nothing for guests to figure out.",
    ],
    install: [
      { title: "Walk the room at night", body: "We see what you want to highlight and where light will fall. We also note glare, reflections and where the eye goes first." },
      { title: "Choose the fixtures", body: "Spots for art, wall washers for textured walls, cove lights for ceilings. Each has the right beam angle and brightness." },
      { title: "Plan the wiring", body: "For new work, we plan before the ceiling closes. For existing homes, we work with what is there and hide cables well." },
      { title: "Tune and save scenes", body: "We adjust brightness and color temperature, then save scenes so the room looks right at the push of a button." },
    ],
    automations: [
      { title: "Dinner scene", body: "The dining spot dims, the wall washers turn on, and the main light goes low." },
      { title: "Entertaining", body: "One scene turns on the garden lights, the living room accents and the porch light." },
      { title: "Night glow", body: "A low cove light stays on in the hallway until sunrise." },
    ],
    goodToKnow: [
      "Accent lighting is easiest to plan during construction or renovation. We can still do it in an existing home.",
      "A cove light needs a clean, finished edge. Poor finishing shows with light on.",
      "Pick fewer, better accents. Too many compete with each other.",
    ],
    faqs: [
      { q: "Can accent lights be added to an existing ceiling?", a: "Often yes, using surface mounted strips, track lights or plug-in options. We check on site." },
      { q: "What is a wall washer?", a: "A fixture that spreads an even band of light across a wall. It is good for texture, art and tall walls." },
      { q: "Will it work with my other smart lights?", a: "Yes, as long as we use compatible products and one hub. We design them as one system." },
      { q: "Do accent lights use a lot of power?", a: "LED accent lights use little power. They are a small part of your bill compared with aircon." },
    ],
  },
]
