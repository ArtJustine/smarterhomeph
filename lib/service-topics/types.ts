export type TopicIcon =
  | "bulb"
  | "switch"
  | "strip"
  | "sparkles"
  | "door"
  | "window"
  | "lock"
  | "camera"
  | "motion"
  | "leak"
  | "snowflake"
  | "fan"
  | "curtains"
  | "thermometer"
  | "hub"
  | "button"
  | "presence"
  | "voice"
  | "panel"
  | "speaker"
  | "tv"
  | "soundbar"
  | "streaming"
  | "plug"
  | "powerstrip"
  | "feeder"
  | "humidifier"
  | "purifier"
  | "vacuum"

export interface TopicStep {
  title: string
  body: string
}

export interface TopicFaq {
  q: string
  a: string
}

export interface ServiceTopic {
  /** URL piece, lives under /services/<service>/<slug> */
  slug: string
  /** Parent service slug, matches servicePlans */
  service: string
  icon: TopicIcon
  /** Short name used on cards, breadcrumbs and links */
  name: string
  /** One line shown on the card on the parent service page */
  cardBlurb: string
  /** Page title and meta */
  metaTitle: string
  metaDescription: string
  /** Big serif headline, the part before the italic bit */
  headline: string
  headlineItalic: string
  /** Short intro in the page header */
  intro: string
  /** 2 short paragraphs on why it matters */
  why: string[]
  /** 4 steps, how we install it */
  install: TopicStep[]
  /** 3 example routines */
  automations: TopicStep[]
  /** 3 honest notes: limits, things to check */
  goodToKnow: string[]
  faqs: TopicFaq[]
}
