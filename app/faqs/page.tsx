import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    q: "How much does smart home installation cost in the Philippines?",
    a: "It depends on the size of the house, the rooms you want covered and the level of finish. A single-room setup costs far less than a whole house with locks, cameras and aircon control. Use the home builder for a running estimate, then send it to us and we will give you a written quote before anything is bought.",
  },
  {
    q: "Do you install smart homes in Pampanga, Tarlac and Bulacan?",
    a: "Yes. We work in Pampanga (Angeles, Mabalacat, San Fernando and nearby), Tarlac City and nearby, and Bulacan (Malolos, Meycauayan and nearby). Somewhere else in Luzon? Message us first and we will tell you honestly if we can help.",
  },
  {
    q: "What is a smart home system?",
    a: "A smart home is a set of connected devices, like lights, locks, cameras and aircon controllers, that you control from your phone or by voice and that can run on schedules or scenes. For example, one tap for movie night can dim the lights and turn on the TV.",
  },
  {
    q: "Do I need special wiring for smart home devices?",
    a: "Usually no. Most devices connect over WiFi, Zigbee or Matter and run from a normal outlet or battery. Smart switches and some locks need a little electrical work, and a hub or router upgrade helps in bigger houses. We check this when we plan your setup.",
  },
  {
    q: "Will my smart home work during a brownout or when the internet is down?",
    a: "Devices need power, so during a brownout the router and hub need to stay on, and a small UPS is a cheap fix for that. When the internet drops, setups built on a local hub (like Home Assistant) keep running scenes and schedules. Remote access from outside the house needs internet.",
  },
  {
    q: "Does it work with Alexa, Google Home and Apple HomeKit?",
    a: "Most of the devices we install work with Alexa and Google Home, and many support HomeKit and Matter. Each product page lists what it supports, so you can pick devices that fit the assistant you already use.",
  },
  {
    q: "Can I control my aircon with a smart home setup?",
    a: "Yes. A smart aircon controller lets you switch the unit on and off, set the temperature and schedule it from your phone, so the room is cool when you arrive instead of running all day. It works with most split-type units.",
  },
  {
    q: "Do I need to set anything up myself?",
    a: "No. We plan, supply, install and test everything, then walk your household through how to use it. You do not need any technical skills, and we are local, so you can reach us if you want something adjusted later.",
  },
  {
    q: "Are smart home devices safe from hackers?",
    a: "They can be, if they are set up properly. We use unique passwords, turn on two-factor sign-in where it exists, keep firmware updated and prefer devices that can run locally. Where a camera can record to local storage instead of the cloud, we set it up that way.",
  },
  {
    q: "Can I control everything from one app?",
    a: "Yes. We tie devices from different brands together in one place, such as Home Assistant, Google Home or Alexa, so you are not juggling a separate app for every gadget.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

export default function FAQsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

        <PageHeader
          eyebrow="FAQs"
          title={
            <>
              Smart home questions, <span className="italic text-primary-ink">answered.</span>
            </>
          }
          intro="Short answers for Philippine homes. If yours is not here, message us."
        />

        <section className="container py-12 md:py-16">
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i + 1}`}>
                  <AccordionTrigger className="py-6 text-left font-display text-2xl font-normal hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-2xl pb-6 text-base leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <p className="mt-10 text-muted-foreground">
              Want a number for your own house? Try the{" "}
              <Link href="/builder" className="text-foreground underline underline-offset-4">
                home builder
              </Link>{" "}
              or{" "}
              <Link href="/contact" className="text-foreground underline underline-offset-4">
                ask us directly
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
