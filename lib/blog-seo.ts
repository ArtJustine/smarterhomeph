// One target keyword per blog post. The same keyword goes in the URL slug, title (H1),
// meta description and the first sentence of the article.
export const blogSeo: Record<number, { slug: string; keyword: string; title: string; description: string }> = {
  1: {
    slug: "smart-home-devices-philippines",
    keyword: "smart home devices philippines",
    title: "Smart Home Devices in the Philippines: 10 to Buy First (With Prices)",
    description:
      "Ten smart home devices in the Philippines in the order to buy them, with rough peso prices and the voltage, 2.4GHz wifi and brownout checks.",
  },
  2: {
    slug: "smart-home-security-philippines",
    keyword: "smart home security philippines",
    title: "Smart Home Security in the Philippines: How to Set It Up on a Budget",
    description:
      "Smart home security in the Philippines without monthly fees: what to buy first, what it costs in pesos, local vs cloud storage and brownout backup.",
  },
  3: {
    slug: "smart-home-voice-assistant",
    keyword: "smart home voice assistant",
    title: "Smart Home Voice Assistants: Where Alexa and Google Assistant Are Heading",
    description:
      "How a smart home voice assistant like Alexa or Google Assistant is changing home automation, and what to expect from the next generation.",
  },
  4: {
    slug: "smart-home-energy-saving",
    keyword: "smart home energy saving",
    title: "Smart Home Energy Saving: How Automation Cuts Your Power Bill",
    description:
      "Smart home energy saving with smart plugs, thermostats and lighting automation. Practical ways to reduce energy use at home without losing comfort.",
  },
  5: {
    slug: "smart-home-integration",
    keyword: "smart home integration",
    title: "Smart Home Integration: How to Connect Devices From Different Brands",
    description:
      "Smart home integration explained: how to make devices from different brands and ecosystems work together, and where Matter fits in.",
  },
  6: {
    slug: "smart-home-for-elderly",
    keyword: "smart home for elderly",
    title: "Smart Home for Elderly Parents: 7 Upgrades for Safer Aging in Place",
    description:
      "A smart home for elderly parents: seven practical upgrades for aging in place, plus privacy, brownout and wifi tips for Filipino families.",
  },
  7: {
    slug: "how-to-start-a-smart-home-philippines",
    keyword: "how to start a smart home philippines",
    title: "How to Start a Smart Home in the Philippines (and What to Buy First)",
    description:
      "How to start a smart home in the Philippines: what to buy first, what it costs, and the voltage, 2.4GHz wifi, brownout and installer details to check.",
  },
  8: {
    slug: "cut-aircon-electricity-bill-philippines",
    keyword: "aircon electricity bill philippines",
    title: "How to Cut Your Aircon Electricity Bill in the Philippines With a Smart Home",
    description:
      "Cut your aircon electricity bill in the Philippines with five smart home automations, from 25°C schedules to window sensors, plus brownout and wifi checks.",
  },
}

export const blogSlugToId = (slug: string): number | undefined =>
  Object.entries(blogSeo).find(([, v]) => v.slug === slug)?.[0] !== undefined
    ? Number(Object.entries(blogSeo).find(([, v]) => v.slug === slug)![0])
    : undefined

export const blogPath = (id: number) => `/blog/${blogSeo[id].slug}`
