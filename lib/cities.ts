export interface CityPage {
  slug: string
  name: string
  province: string
  /** Real barangays or areas we name in the copy */
  areas: string[]
  metaTitle: string
  metaDescription: string
  headline: string
  headlineItalic: string
  intro: string
  /** Two short paragraphs about homes here and what usually matters */
  localNotes: string[]
  /** 3 things that tend to matter in this city, each with a title and a short body */
  focus: { title: string; body: string }[]
  faqs: { q: string; a: string }[]
}

export const cityPages: CityPage[] = [
  {
    slug: "angeles-city",
    name: "Angeles City",
    province: "Pampanga",
    areas: ["Balibago", "Pulung Maragul", "Anunas", "Pampang", "Cutcut"],
    metaTitle: "Smart Home Installation in Angeles City, Pampanga",
    metaDescription:
      "Smart home installation in Angeles City: lights, locks, cameras, aircon control, Alexa, Apple Home and Google Home. Planned and installed by Smarter Home PH.",
    headline: "Smart home installation in Angeles City,",
    headlineItalic: "done properly.",
    intro:
      "We plan, install and set up smart lights, locks, cameras and aircon control for homes in Angeles City, from Balibago to Pulung Maragul.",
    localNotes: [
      "Angeles City homes come in all shapes: townhouses, gated subdivisions, condos and older family compounds. The right setup is different for each, so we start with a short walk through before we suggest anything.",
      "Plenty of households here run on odd hours, with shift work and kids on different schedules. Scenes that follow the time of day, quiet night lighting and phone alerts that only reach the right person make the house easier to live in.",
    ],
    focus: [
      { title: "Condos and townhouses", body: "Tight spaces and shared walls mean we pick devices that need no heavy wiring and respect your building rules. Smart locks and sensors go in without drilling through walls." },
      { title: "Rentals and guests", body: "If you rent out a unit or host guests, a smart lock with its own code for each stay, and a camera at the entrance, saves you handing over keys." },
      { title: "Busy streets", body: "Homes near main roads get a lot of passing noise and foot traffic. We tune camera zones and motion alerts so your phone is not buzzing all day." },
    ],
    faqs: [
      { q: "Do you install smart homes in condos in Angeles City?", a: "Yes. We choose devices that need no wall wiring, and we check your building's rules on drilling, door changes and outdoor cameras before we install." },
      { q: "Can you set up a smart lock for a rental unit?", a: "Yes. A smart lock can give each guest their own code and remove it after the stay. We set it up and show you how to manage the codes." },
      { q: "Which areas of Angeles City do you cover?", a: "We cover homes across Angeles City, including Balibago, Pulung Maragul, Anunas, Pampang and Cutcut. If yours is elsewhere in the city, message us and we will confirm." },
      { q: "How do I get a quote?", a: "Plan your rooms with our room by room planner or send us a message. We reply with a written quote before anything is bought." },
    ],
  },
  {
    slug: "mabalacat",
    name: "Mabalacat",
    province: "Pampanga",
    areas: ["Dau", "Mabiga", "Dolores", "Camachiles"],
    metaTitle: "Smart Home Installation in Mabalacat City, Pampanga",
    metaDescription:
      "Smart home installation in Mabalacat City: lights, locks, cameras, WiFi and aircon control with Alexa, Apple Home or Google Home. Smarter Home PH is based here.",
    headline: "Smart home installation in Mabalacat,",
    headlineItalic: "from a local team.",
    intro:
      "Smarter Home PH is based in Mabalacat City. We plan and install smart lights, locks, cameras and WiFi for homes in Dau, Mabiga, Dolores and Camachiles.",
    localNotes: [
      "Mabalacat is close to Clark and the NLEX exits, which makes it easy for us to reach most homes quickly. That means shorter waits for site visits, quicker fixes and easier follow-up after the install.",
      "Many homes here are in growing subdivisions and newer builds where the wiring is still open to plan around. If you are building or renovating, tell us early. Adding smart switches, a camera cable or a LAN point is much cheaper before the walls close.",
    ],
    focus: [
      { title: "New and growing subdivisions", body: "Newer homes often have neutral wires at the switches and room for cable runs. We use that to install smart switches and a wired network the clean way." },
      { title: "Quick site visits", body: "Because we are based here, we can visit, survey and follow up without the long wait of an out-of-town installer." },
      { title: "Builders and renovators", body: "Building or renovating? We can plan the smart parts with you before the walls close. See our page for builders for what that looks like." },
    ],
    faqs: [
      { q: "Are you based in Mabalacat?", a: "Yes. Mabalacat is our home base, so site visits, installs and follow-ups here are quick." },
      { q: "Can you add smart devices to a house that is still being built?", a: "Yes, and it is the best time to do it. Planning switches, cable runs and network points before the walls close costs far less than fixing them later." },
      { q: "Which parts of Mabalacat do you cover?", a: "We cover homes across Mabalacat City, including Dau, Mabiga, Dolores and Camachiles. If yours is elsewhere, message us and we will confirm." },
      { q: "Which platform should I choose?", a: "It depends on your phones and how you use the house. Our Alexa, Apple Home and Google Home pages explain each, and we will recommend one after a short chat." },
    ],
  },
  {
    slug: "san-fernando",
    name: "San Fernando",
    province: "Pampanga",
    areas: ["Dolores", "Telabastagan", "Del Pilar", "Sindalan", "Bulaon"],
    metaTitle: "Smart Home Installation in San Fernando, Pampanga",
    metaDescription:
      "Smart home installation in San Fernando, Pampanga: lights, locks, cameras, WiFi and aircon control. Planned and installed by Smarter Home PH.",
    headline: "Smart home installation in San Fernando,",
    headlineItalic: "planned around your house.",
    intro:
      "We plan, install and set up smart homes in San Fernando, Pampanga, from Dolores and Telabastagan to Del Pilar, Sindalan and Bulaon.",
    localNotes: [
      "San Fernando is the provincial capital, so households here are often busy: parents commuting, kids in school, family businesses run from home. A smart home that handles the morning rush, the school run and the evening wind down saves time every day.",
      "Many homes in the city sit in subdivisions with a gate, a carport and more than one floor. That makes WiFi coverage and a doorbell at the gate the first things we check, before any lights or locks.",
    ],
    focus: [
      { title: "Family households", body: "Routines for school mornings, bedtime and getting out the door, with simple controls everyone from the kids to the grandparents can use." },
      { title: "Home and small business", body: "If you run a shop or office from the house, we can separate the work area and the home area so alerts and schedules do not mix." },
      { title: "Gates and driveways", body: "A video doorbell or gate intercom, a camera on the carport and lights that come on when you arrive, planned around where you actually park." },
    ],
    faqs: [
      { q: "Do you cover all of San Fernando?", a: "We cover homes across San Fernando, including Dolores, Telabastagan, Del Pilar, Sindalan and Bulaon. If yours is elsewhere in the city, message us and we will confirm." },
      { q: "Can you set up a smart home for a house with a separate shop or office?", a: "Yes. We can group devices by area so the shop and the house have their own schedules, alerts and access." },
      { q: "How long does an install take?", a: "A starter setup often takes a day. A full house with cameras, locks and a network takes longer. We give you a time estimate in the written quote." },
      { q: "Do I need new WiFi first?", a: "Not always. We test your signal at the visit and tell you honestly if a mesh network is worth adding before the smart devices." },
    ],
  },
  {
    slug: "tarlac-city",
    name: "Tarlac City",
    province: "Tarlac",
    areas: ["San Roque", "Sto. Cristo", "Maliwalo", "Matatalaib"],
    metaTitle: "Smart Home Installation in Tarlac City",
    metaDescription:
      "Smart home installation in Tarlac City: lights, locks, cameras, WiFi, water pump control and aircon control. Planned and installed by Smarter Home PH.",
    headline: "Smart home installation in Tarlac City,",
    headlineItalic: "for bigger lots and longer gates.",
    intro:
      "We plan, install and set up smart homes in Tarlac City, including San Roque, Sto. Cristo, Maliwalo and Matatalaib.",
    localNotes: [
      "Homes in Tarlac City tend to sit on larger lots, with a gate far from the door, a carport, a garden and sometimes a separate pump and tank. That changes the plan. Coverage outdoors, a doorbell that actually reaches your WiFi and cameras that see the whole yard matter more than they do in a small townhouse.",
      "Tarlac is a bit further from our Pampanga base, so we schedule installs in batches. We tell you plainly when we can visit, and we do the survey and the install in as few trips as we can.",
    ],
    focus: [
      { title: "Outdoor WiFi", body: "A mesh network with a node near the gate or carport, so the doorbell and cameras stay online across the whole lot." },
      { title: "Pump and tank control", body: "Scheduled filling, run-time limits and leak alerts for homes that rely on a pump and a tank." },
      { title: "Cameras and lighting", body: "Cameras that cover the yard and driveway, with lights that come on when something moves, and phone alerts that you can tune." },
    ],
    faqs: [
      { q: "Do you install in Tarlac City?", a: "Yes. We cover Tarlac City, including San Roque, Sto. Cristo, Maliwalo and Matatalaib. We schedule visits in batches, and we confirm the date when you ask for a quote." },
      { q: "Can you help with a house on a large lot?", a: "Yes. Large lots need a stronger outdoor network and well placed cameras. We plan those before the lights and locks." },
      { q: "Can you control my water pump?", a: "Yes, with a properly rated controller and, where needed, a licensed electrician. See our page on pump and tank control for details." },
      { q: "Is there a travel fee?", a: "We tell you about any travel cost in the written quote before anything is bought, so there are no surprises." },
    ],
  },
  {
    slug: "malolos",
    name: "Malolos",
    province: "Bulacan",
    areas: ["Bulihan", "Sumapang Matanda", "Mojon", "Longos", "Atlag"],
    metaTitle: "Smart Home Installation in Malolos, Bulacan",
    metaDescription:
      "Smart home installation in Malolos, Bulacan: lights, locks, cameras, WiFi and aircon control with Alexa, Apple Home or Google Home. Planned and installed by Smarter Home PH.",
    headline: "Smart home installation in Malolos,",
    headlineItalic: "close to our Pampanga base.",
    intro:
      "We plan, install and set up smart homes in Malolos, Bulacan, including Bulihan, Sumapang Matanda, Mojon, Longos and Atlag.",
    localNotes: [
      "Malolos is the provincial capital of Bulacan and one of the nearest cities to San Fernando, Pampanga, so it is an easy trip from our side of the border. Site visits and follow-ups here do not need a long wait.",
      "Homes in the city range from older family houses to newer subdivisions and townhouses. We start with a short walk through, check your WiFi and your switches, and only then suggest what to buy.",
    ],
    focus: [
      { title: "Older family houses", body: "Houses with older wiring and thick walls need a careful plan. We pick devices that work without rewiring and test your WiFi before anything is installed." },
      { title: "New subdivisions", body: "Newer builds often have neutral wires and room for cable runs, which makes smart switches and a wired network much easier." },
      { title: "Busy households", body: "Morning and evening routines, a doorbell at the gate and phone alerts that reach the right person make a full house easier to run." },
    ],
    faqs: [
      { q: "Do you install smart homes in Malolos?", a: "Yes. We cover Malolos, including Bulihan, Sumapang Matanda, Mojon, Longos and Atlag. If yours is elsewhere in the city, message us and we will confirm." },
      { q: "Is Malolos far from your base?", a: "No. Malolos is one of the nearest Bulacan cities to San Fernando, Pampanga, so we can visit, survey and follow up without long delays." },
      { q: "Can you add smart devices to an older house?", a: "Yes. We choose devices that do not need rewiring, and we test your WiFi at the visit before we suggest anything." },
      { q: "How do I get a quote?", a: "Plan your rooms with our room by room planner or send us a message. We reply with a written quote before anything is bought." },
    ],
  },
]

export const getCityPage = (slug: string) => cityPages.find((c) => c.slug === slug)

export const citiesInProvince = (province: string) => cityPages.filter((c) => c.province === province)
