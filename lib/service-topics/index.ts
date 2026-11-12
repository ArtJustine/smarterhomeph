import type { ServiceTopic } from "./types"
import { lightingTopics } from "./lighting"
import { securityTopics } from "./security"
import { climateTopics } from "./climate"
import { automationTopics } from "./automation"
import { mediaTopics } from "./media-control"
import { applianceTopics } from "./appliances"

export type { ServiceTopic, TopicIcon, TopicStep, TopicFaq } from "./types"

export const serviceTopics: ServiceTopic[] = [
  ...lightingTopics,
  ...securityTopics,
  ...climateTopics,
  ...automationTopics,
  ...mediaTopics,
  ...applianceTopics,
]

export const getTopicsForService = (service: string) => serviceTopics.filter((t) => t.service === service)

export const getTopic = (service: string, slug: string) =>
  serviceTopics.find((t) => t.service === service && t.slug === slug)
