export interface ProvincePage {
  slug: string
  name: string
  metaTitle: string
  metaDescription: string
  headline: string
  headlineItalic: string
  intro: string
  notes: string[]
  faqs: { q: string; a: string }[]
}

export const provincePages: ProvincePage[] = [
  {
    slug: "pampanga",
    name: "Pampanga",
    metaTitle: "Smart Home Installation in Pampanga",
    metaDescription:
      "Smart home installation across Pampanga: Angeles City, Mabalacat and San Fernando. Lights, locks, cameras, WiFi and aircon control by Smarter Home PH.",
    headline: "Smart home installation in Pampanga,",
    headlineItalic: "from a team based here.",
    intro:
      "Smarter Home PH is based in Pampanga. We plan, install and set up smart lights, locks, cameras and WiFi for homes in Angeles City, Mabalacat and San Fernando.",
    notes: [
      "Pampanga is where we live and work, so site visits, installs and follow-ups here are the quickest. Pick your city below to see what matters in your area.",
      "Not sure which city page fits? Message us with your barangay and we will confirm that we cover it.",
    ],
    faqs: [
      { q: "Which cities in Pampanga do you cover?", a: "We cover Angeles City, Mabalacat and San Fernando. If you are in a nearby town, message us and we will tell you honestly if we can help." },
      { q: "Where are you based?", a: "We are based in Mabalacat City, Pampanga." },
      { q: "Do you work with new builds?", a: "Yes. Planning switches, cable runs and network points before the walls close costs far less than fixing them later." },
      { q: "How do I get a quote?", a: "Send us a message or plan your rooms with our planner. We reply with a written quote before anything is bought." },
    ],
  },
  {
    slug: "tarlac",
    name: "Tarlac",
    metaTitle: "Smart Home Installation in Tarlac",
    metaDescription:
      "Smart home installation in Tarlac: Tarlac City and nearby. Lights, locks, cameras, WiFi, water pump control and aircon control by Smarter Home PH.",
    headline: "Smart home installation in Tarlac,",
    headlineItalic: "planned around your lot.",
    intro:
      "We plan, install and set up smart homes in Tarlac, starting with Tarlac City. Bigger lots mean we plan outdoor WiFi, cameras and gates first.",
    notes: [
      "Tarlac is a bit further from our Pampanga base, so we schedule installs in batches and tell you plainly when we can visit.",
      "Not in Tarlac City? Message us first and we will tell you honestly if we can help.",
    ],
    faqs: [
      { q: "Which parts of Tarlac do you cover?", a: "We cover Tarlac City. For other towns in Tarlac, message us and we will confirm." },
      { q: "Is there a travel fee?", a: "We tell you about any travel cost in the written quote before anything is bought." },
      { q: "Can you control my water pump?", a: "Yes, with a properly rated controller and, where needed, a licensed electrician." },
      { q: "How do I get a quote?", a: "Send us a message. We reply with a written quote before anything is bought." },
    ],
  },
  {
    slug: "bulacan",
    name: "Bulacan",
    metaTitle: "Smart Home Installation in Bulacan",
    metaDescription:
      "Smart home installation in Bulacan: Malolos and nearby. Lights, locks, cameras, WiFi and aircon control by Smarter Home PH.",
    headline: "Smart home installation in Bulacan,",
    headlineItalic: "just across the border.",
    intro:
      "We plan, install and set up smart homes in Bulacan, starting with Malolos, which is close to our Pampanga base.",
    notes: [
      "Bulacan borders Pampanga, so the parts of the province closest to San Fernando are the easiest for us to reach.",
      "Not in Malolos? Message us first and we will tell you honestly if we can help.",
    ],
    faqs: [
      { q: "Which parts of Bulacan do you cover?", a: "We cover Malolos. For other cities and towns in Bulacan, message us and we will confirm." },
      { q: "Is Bulacan far from your base?", a: "Malolos is one of the nearest Bulacan cities to San Fernando, Pampanga, so visits are quick." },
      { q: "Do you work with new builds?", a: "Yes. Planning switches, cable runs and network points before the walls close costs far less than fixing them later." },
      { q: "How do I get a quote?", a: "Send us a message. We reply with a written quote before anything is bought." },
    ],
  },
]

export const getProvincePage = (slug: string) => provincePages.find((p) => p.slug === slug)
export const getProvinceByName = (name: string) => provincePages.find((p) => p.name === name)
