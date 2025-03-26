import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <PageHeader
          title="FREQUENTLY ASKED QUESTIONS"
          backgroundImage="/placeholder.svg?height=500&width=1200"
          alt="Customer support"
        />

        <section className="container py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">What is a smart home system?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  A smart home system is a network of connected devices and appliances that can be remotely controlled
                  and automated. These systems allow you to manage various aspects of your home, such as lighting,
                  security, climate, and entertainment, through a central interface like a smartphone app or voice
                  assistant.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium">
                  Do I need special wiring for smart home devices?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Most modern smart home devices are wireless and connect via Wi-Fi, Bluetooth, Zigbee, or Z-Wave
                  protocols, eliminating the need for special wiring. However, some systems may require a hub or
                  controller that connects to your router. Certain devices like smart switches or thermostats might need
                  installation that involves your home's existing wiring.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium">
                  Can I install smart home devices myself?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Many smart home devices are designed for DIY installation and come with user-friendly instructions.
                  Devices like smart plugs, bulbs, cameras, and sensors are typically easy to set up. However, for
                  devices that require electrical work, such as smart switches or hardwired security systems, we
                  recommend professional installation if you're not experienced with electrical work.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-medium">
                  Will smart home devices work if my internet goes down?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Most smart home devices will continue to function at a basic level without internet, but you'll lose
                  remote control capabilities and cloud-based features. Many systems can still operate on your local
                  network even when internet connectivity is lost. Some devices also have backup modes that allow for
                  manual operation during outages.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-medium">Are smart home devices secure?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We take security seriously and implement multiple layers of protection in our devices. This includes
                  encrypted communications, secure boot processes, and regular security updates. To maximize security,
                  we recommend using strong, unique passwords, enabling two-factor authentication when available, and
                  keeping your devices updated with the latest firmware.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg font-medium">
                  Can I control multiple smart home devices from one app?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, our SmartHome app allows you to control all compatible devices from a single interface.
                  Additionally, many of our devices work with popular smart home platforms like Apple HomeKit, Google
                  Home, and Amazon Alexa, which provide unified control across multiple brands and device types.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

