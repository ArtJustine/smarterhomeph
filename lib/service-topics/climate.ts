import type { ServiceTopic } from "./types"

export const climateTopics: ServiceTopic[] = [
  {
    slug: "ac-controllers",
    service: "climate",
    icon: "snowflake",
    name: "AC controllers",
    cardBlurb: "Control split-type aircon from your phone, on a schedule or by room.",
    metaTitle: "Smart Aircon Controllers in Pampanga, Tarlac and Bulacan",
    metaDescription:
      "Control split-type aircon from your phone with schedules and room sensors. Installed by Smart Home Philippines in Central Luzon.",
    headline: "AC controllers,",
    headlineItalic: "cool before you arrive.",
    intro: "A small controller turns your existing aircon into one you can schedule and control from anywhere.",
    why: [
      "Aircon is a big part of the power bill in most Philippine homes. The waste usually comes from small things: left on in an empty room, running with a window open, or started too late and set too low to catch up.",
      "A controller lets you start the aircon on the way home, set it to turn off at a time, and link it to a temperature sensor. You keep the same aircon and the same remote.",
    ],
    install: [
      { title: "Check your units", body: "We list each aircon, the brand and the model. Most split-type units that use an infrared remote work. We confirm before we quote." },
      { title: "Place the controller", body: "The controller sits where it can see the aircon's receiver, usually under or beside the unit. A bad angle means missed commands, so we test it." },
      { title: "Teach it the commands", body: "We match the controller to your aircon's remote codes, test every mode and temperature, and check the aircon responds each time." },
      { title: "Add schedules and sensors", body: "We set schedules and link a room temperature sensor so the aircon follows the actual room, not just the clock." },
    ],
    automations: [
      { title: "Cool before bed", body: "The bedroom aircon turns on 20 minutes before your bedtime and steps up to a higher temperature after you sleep." },
      { title: "Heading home", body: "When your phone is close to home, the living room aircon turns on." },
      { title: "Window open", body: "If the bedroom window opens, the aircon turns off after a few minutes." },
    ],
    goodToKnow: [
      "Controllers send the same commands as your remote. They do not know the real state of the unit unless you add a sensor or a power meter.",
      "Some older or unusual models need extra setup. We test before we install.",
      "A controller does not fix a dirty filter or an oversized unit. Maintain the aircon as usual.",
    ],
    faqs: [
      { q: "Will it work with my aircon?", a: "Most split-type aircon with an infrared remote work. We check your brand and model first." },
      { q: "Do I need to replace the aircon?", a: "No. The controller works with the one you have." },
      { q: "Can I control it when I am away from home?", a: "Yes, as long as the controller and your home Wi-Fi are online. Local control inside the house works without internet." },
      { q: "Will it save money?", a: "It can, by stopping waste such as running in empty rooms. The amount depends on how you use the aircon now." },
    ],
  },
  {
    slug: "fan-switches",
    service: "climate",
    icon: "fan",
    name: "Fan switches",
    cardBlurb: "Speed and schedule control for ceiling and wall fans.",
    metaTitle: "Smart Fan Control in Pampanga, Tarlac and Bulacan",
    metaDescription:
      "Smart fan switches with speed control and schedules. Planned and installed in Central Luzon by Smart Home Philippines.",
    headline: "Fan switches,",
    headlineItalic: "air without the pull cord.",
    intro: "Set fan speed from the wall, your phone or your voice, and let a schedule turn it off for you.",
    why: [
      "Fans are the first thing most families reach for before aircon. A smart fan switch lets you set speeds, run them for a set time and turn them off when you leave the room.",
      "Paired with a temperature sensor, a fan can come on when a room warms up, before you reach for the aircon.",
    ],
    install: [
      { title: "Check the fan type", body: "Not every fan motor works with a smart speed controller. We check the motor type and the existing control before we choose a switch." },
      { title: "Pick the right switch", body: "A fan needs a switch designed for fans. A normal smart switch can damage a fan or hum. We use the correct type." },
      { title: "Install and test every speed", body: "We wire it in, then test every speed and the off position. We listen for humming or buzzing and fix it before we leave." },
      { title: "Add schedules", body: "We set timers so the fan turns off an hour after bedtime, or starts when the room is warm." },
    ],
    automations: [
      { title: "Sleep timer", body: "The bedroom fan runs at medium speed and turns off after you fall asleep." },
      { title: "Warm room", body: "When the room temperature goes above your set point, the fan turns on at low." },
      { title: "Leave the room", body: "When presence is no longer detected, the fan turns off after ten minutes." },
    ],
    goodToKnow: [
      "Some fans buzz or run poorly on the wrong controller. We confirm compatibility first.",
      "Fans with built-in remotes may need a different approach. We check each type.",
      "Fan and light on one switch box need two separate controls. We plan for it.",
    ],
    faqs: [
      { q: "Can I use any smart switch for a fan?", a: "No. Use one made for fans. A regular dimmer or smart switch can cause buzzing or damage." },
      { q: "Can it work with my existing remote?", a: "Often yes, but it depends on the fan. We check on the visit." },
      { q: "Does it control light and fan separately?", a: "Yes, with a two-control switch or separate switches." },
      { q: "Will it work during a brownout?", a: "No device runs without power. Once power returns, it resumes using the state you set." },
    ],
  },
  {
    slug: "curtain-controllers",
    service: "climate",
    icon: "curtains",
    name: "Curtain and blind controllers",
    cardBlurb: "Motorised or retrofit control for curtains and blinds.",
    metaTitle: "Smart Curtains and Blinds in Pampanga, Tarlac and Bulacan",
    metaDescription:
      "Motorised curtains and blinds with schedules and sun based control. Installed in Central Luzon.",
    headline: "Curtain controllers,",
    headlineItalic: "let the sun in on your terms.",
    intro: "Open and close curtains and blinds on a schedule, with a button or by voice.",
    why: [
      "Sunlight heats a room fast. Closing the curtains in the afternoon keeps the room cooler, and opening them in the morning lets in light. Doing that by hand every day is the kind of thing people stop doing.",
      "Motorised curtains also make large windows, high windows and sliding doors easy to manage.",
    ],
    install: [
      { title: "Measure and check the track", body: "We check the rail or rod, the weight of the curtain and the window width. A heavy curtain needs a stronger motor." },
      { title: "Choose motorised or retrofit", body: "A motorised track is neat and strong. A retrofit device fits your existing rod and costs less. We pick what suits the window." },
      { title: "Fit and power it", body: "We install the motor, run or hide the power, and set the limits so the curtain opens and closes fully." },
      { title: "Set the schedules", body: "We add open and close times and, if you want, sun based triggers so it follows the day." },
    ],
    automations: [
      { title: "Morning open", body: "The bedroom curtains open halfway at 7 a.m." },
      { title: "Afternoon heat", body: "The west facing curtains close at 1 p.m. to keep the living room cooler." },
      { title: "Movie time", body: "Curtains close and lights dim when you start a movie scene." },
    ],
    goodToKnow: [
      "Power is the main planning point. Battery models need charging, wired models need an outlet near the track.",
      "Very heavy curtains or wide spans need a stronger motor.",
      "Blackout curtains and sheers on a double track need two motors.",
    ],
    faqs: [
      { q: "Can I keep my existing curtains?", a: "Often yes. Motorised tracks and retrofit devices work with many existing curtains. We check weight and rod type." },
      { q: "How are they powered?", a: "Either a rechargeable battery or a plug-in or wired supply. We discuss which suits each window." },
      { q: "Can they work with my hub or voice assistant?", a: "Yes. We choose models that work with the system you use." },
      { q: "Do they still open by hand?", a: "Some do. Whether you can also move them by hand depends on the model, so we check." },
    ],
  },
  {
    slug: "temperature-sensors",
    service: "climate",
    icon: "thermometer",
    name: "Temperature sensors",
    cardBlurb: "Trigger aircon and fans by the real temperature in each room.",
    metaTitle: "Smart Temperature and Humidity Sensors in Central Luzon",
    metaDescription:
      "Room temperature and humidity sensors that trigger aircon and fans. Installed in Pampanga, Tarlac and Bulacan.",
    headline: "Temperature sensors,",
    headlineItalic: "know the room, not the thermostat.",
    intro: "A small sensor in each room tells your aircon and fans what the room is really doing.",
    why: [
      "An aircon reads the temperature near its own unit, which is not always the part of the room you sit in. A sensor placed where you live gives the system better information.",
      "Humidity is also useful. In the Philippines, a damp room feels warm and invites mold. A humidity reading lets you start a fan or dehumidifier before it becomes a problem.",
    ],
    install: [
      { title: "Pick the placement", body: "We place sensors at body height, away from direct sun, aircon vents and kitchens, where readings stay honest." },
      { title: "Pair with your hub", body: "We add each sensor to your hub and name it by room, so you see all rooms on one screen." },
      { title: "Link to aircon and fans", body: "We set rules like turn on the aircon above a temperature, or turn on the fan first." },
      { title: "Check the readings", body: "We compare each reading to a known thermometer so you can trust the numbers." },
    ],
    automations: [
      { title: "Warm room response", body: "The bedroom hits a set temperature and the fan comes on. If it keeps rising, the aircon follows." },
      { title: "Humidity alert", body: "Bathroom humidity stays high for an hour and the exhaust fan turns on." },
      { title: "Daily summary", body: "A morning view of overnight temperatures in every room." },
    ],
    goodToKnow: [
      "Sensors report a room, not the whole house. A few well placed ones beat many badly placed ones.",
      "A sensor in direct sun or near a vent gives misleading data.",
      "Sensors run on small batteries and last a long time.",
    ],
    faqs: [
      { q: "How many do I need?", a: "One per room where you use aircon or fans is a good start." },
      { q: "Can I see past readings?", a: "Yes, on a hub like Home Assistant you can see history by room." },
      { q: "Do they measure humidity as well?", a: "Most do. We choose models that report both." },
      { q: "Will it work without internet?", a: "Yes. A sensor on a local hub keeps recording and triggering local rules." },
    ],
  },
]
