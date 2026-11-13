"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { toast } from "sonner"

// Structured blog articles content
const BLOG_POSTS_DETAIL: Record<number, {
  title: string
  subtitle: string
  date: string
  author: string
  authorRole: string
  authorAvatar: string
  readTime: string
  category: string
  image: string
  content: React.ReactNode
}> = {
  1: {
    title: "10 Smart Home Devices Worth Buying in the Philippines (and the Order to Buy Them)",
    subtitle: "Ten devices that make a daily difference, what each one does, and the Philippine checks to make before you order.",
    date: "March 20, 2025",
    author: "Art Gonzales",
    authorRole: "Smarter Home PH",
    authorAvatar: "",
    readTime: "6 min read",
    category: "Devices",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    content: (
      <>
        <p className="text-xl leading-relaxed text-foreground">
          You don't need a full smart home to feel the difference. These ten devices are the ones that change your day, listed in the order most homes should buy them.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Every device here works over normal home wifi. Prices below come from local listings and a recent TP-Link Philippines guide, so treat them as rough numbers.
        </p>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">The ten, in buying order</h2>
        <ol className="list-decimal space-y-4 pl-5 leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Smart plug.</strong> Schedule a fan, lamp or charger, or switch it off from your phone. Listings run from a few hundred pesos. Check the wattage rating first and skip it for aircon.
          </li>
          <li>
            <strong className="text-foreground">Smart bulb.</strong> Set a schedule, dim it, or change the colour. Basic wifi bulbs can be found for under ₱700. Check for 220 to 240V and your base type, usually E27.
          </li>
          <li>
            <strong className="text-foreground">Indoor wifi camera.</strong> Look in on a pet, a helper or a sleeping child. A good budget camera is about ₱1,500 to ₱3,000, and models with microSD recording save you monthly fees.
          </li>
          <li>
            <strong className="text-foreground">Video doorbell.</strong> See and talk to whoever is at the gate without leaving the sofa. Good for deliveries and for anyone who can't get to the door quickly.
          </li>
          <li>
            <strong className="text-foreground">Smart lock.</strong> Open with a PIN or fingerprint and stop worrying about lost keys. Always keep a physical key as a backup.
          </li>
          <li>
            <strong className="text-foreground">Door and motion sensors.</strong> Small and cheap, and they trigger other devices. A door opens at night and a light comes on, for example.
          </li>
          <li>
            <strong className="text-foreground">Aircon controller.</strong> Turn on your split-type aircon 20 minutes before you get home instead of leaving it running all day. Works with most remote-controlled units.
          </li>
          <li>
            <strong className="text-foreground">Smart speaker.</strong> Voice control for everything above. "Turn off the lights" beats finding your phone. Pick the platform you'll stick with: <Link href="/alexa" className="underline underline-offset-4">Alexa</Link>, <Link href="/google-home" className="underline underline-offset-4">Google Home</Link> or <Link href="/apple-home" className="underline underline-offset-4">Apple Home</Link>.
          </li>
          <li>
            <strong className="text-foreground">Robot vacuum.</strong> Set it to run while you're out. Works best in a mostly open floor plan with few cables on the floor.
          </li>
          <li>
            <strong className="text-foreground">Curtain motor.</strong> Opens with the morning light and closes at night. Nice to have, not a first purchase.
          </li>
        </ol>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Check before you pay</h2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li><strong className="text-foreground">Voltage.</strong> Some listings are made for 100 to 125V. Look for 220 to 240V.</li>
          <li><strong className="text-foreground">2.4GHz wifi.</strong> Many cheap devices only connect to 2.4GHz.</li>
          <li><strong className="text-foreground">Platform support.</strong> Make sure the box says it works with Alexa, Google Home or Apple Home. Matter devices work with all three.</li>
          <li><strong className="text-foreground">Return policy.</strong> Buy from a seller you can return to if it doesn't fit your door, bulb base or aircon.</li>
        </ul>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Which ones need an installer</h2>
        <p className="leading-relaxed text-muted-foreground">
          You can do plugs, bulbs, speakers, sensors and indoor cameras yourself. Call someone for the smart lock, the video doorbell, the aircon controller and the curtain motor. Getting them wrong costs more than the install.
        </p>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Don't forget brownouts</h2>
        <p className="leading-relaxed text-muted-foreground">
          No power means no router, and no router means most of these devices go offline.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          A small UPS for your modem and router fixes most of it. Units under ₱1,000 can keep a router running for roughly 1 to 2 hours, depending on the model.
        </p>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">What to skip at first</h2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li>Buying the whole list at once.</li>
          <li>Mixing five brands with five apps.</li>
          <li>Anything that needs its own hub when you only have two or three devices.</li>
        </ul>

        <p className="leading-relaxed text-muted-foreground">
          New to all this? Start with our <Link href="/blog/7" className="underline underline-offset-4">beginner guide</Link>. If you're in Pampanga, Tarlac or Bulacan and want help picking and installing, use our <Link href="/services" className="underline underline-offset-4">services page</Link> to send us a room by room list for a quote.
        </p>
      </>
    )
  },
  2: {
    title: "How to Set Up Smart Home Security on a Budget in the Philippines",
    subtitle: "What to buy first, what it costs, and how to avoid monthly fees, with the brownout and privacy details most guides skip.",
    date: "March 15, 2025",
    author: "Art Gonzales",
    authorRole: "Smarter Home PH",
    authorAvatar: "",
    readTime: "6 min read",
    category: "Security",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    content: (
      <>
        <p className="text-xl leading-relaxed text-foreground">
          You can cover the main weak points of a home for a few thousand pesos. You don't need a monthly plan, and you don't need to wire anything.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          The trick is buying in the right order and picking devices that store footage on your own card.
        </p>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Start with how someone gets in</h2>
        <p className="leading-relaxed text-muted-foreground">
          Walk around your home and list the entry points. For most houses it's:
        </p>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li>The front door.</li>
          <li>The gate or carport.</li>
          <li>The back door or kitchen door.</li>
          <li>Ground floor windows.</li>
        </ul>
        <p className="leading-relaxed text-muted-foreground">
          Cover these first. Skip anything that doesn't point at one of them.
        </p>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">What to buy, in order</h2>
        <ol className="list-decimal space-y-4 pl-5 leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">One camera with a microSD slot.</strong> Budget indoor cameras run about ₱1,500 to ₱3,000. Point it at the main entrance from inside. Add a microSD card so recordings stay with you and there's no monthly fee.
          </li>
          <li>
            <strong className="text-foreground">Door and window sensors.</strong> They're small, cheap and tell you the moment something opens. Put them on the front door, back door and one or two ground floor windows.
          </li>
          <li>
            <strong className="text-foreground">An outdoor camera for the gate or carport.</strong> Look for an outdoor rating (IP65) and person detection, so you're not alerted for every cat.
          </li>
          <li>
            <strong className="text-foreground">A smart lock.</strong> Use PIN codes, not keys, and remove a code when a helper leaves. Keep a physical key as a backup.
          </li>
          <li>
            <strong className="text-foreground">Smart bulbs or plugs for lights.</strong> Lights that turn on when something opens do more to scare someone off than a camera does.
          </li>
        </ol>
        <p className="leading-relaxed text-muted-foreground">
          Starter kits can save time. When it launched, a Cherry Mobile kit with a camera, door sensors and a smart bulb started at around ₱2,300. Check what's in the box and that the app is still supported.
        </p>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Local storage or cloud?</h2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li><strong className="text-foreground">Local (microSD).</strong> No monthly fee. Footage stays on the card. If someone takes the camera, they take the footage too.</li>
          <li><strong className="text-foreground">Cloud.</strong> Footage is safe off-site, but expect a recurring cost.</li>
        </ul>
        <p className="leading-relaxed text-muted-foreground">
          On a budget, start local. Add cloud later only for the one camera that matters most.
        </p>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Set up three alerts that matter</h2>
        <p className="leading-relaxed text-muted-foreground">
          More alerts means you'll start ignoring all of them. Start with these:
        </p>
        <ol className="list-decimal space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li>Front door opens after you've gone to bed: send a phone alert and turn on the lights.</li>
          <li>Person detected at the gate while you're away: send a phone alert with a clip.</li>
          <li>Back door opens when no one's home: send a phone alert.</li>
        </ol>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Plan for brownouts</h2>
        <p className="leading-relaxed text-muted-foreground">
          If the power goes out, the router goes out, and your phone alerts stop.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          A mini UPS for the modem and router costs under ₱1,000 and can keep a router on for roughly 1 to 2 hours, depending on the model. Cameras that record to a card keep their footage, but they stop recording when their own power is cut.
        </p>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Lock down the devices themselves</h2>
        <p className="leading-relaxed text-muted-foreground">
          A camera is only secure if its account is.
        </p>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li>Use a unique password and turn on two-step login.</li>
          <li>Change the default wifi password on your router.</li>
          <li>Install firmware updates when the app asks.</li>
          <li>Never put cameras in bedrooms or bathrooms.</li>
          <li>Remove access for anyone who no longer needs it.</li>
        </ul>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Mistakes that waste money</h2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li>Buying four cameras and no door sensors.</li>
          <li>Pointing a camera at a window with strong sunlight.</li>
          <li>Skipping the microSD card.</li>
          <li>Leaving the camera in a spot your wifi barely reaches.</li>
        </ul>

        <p className="leading-relaxed text-muted-foreground">
          Not sure where to start? See our <Link href="/services/security" className="underline underline-offset-4">security services</Link>. In Pampanga, Tarlac or Bulacan, you can send us a list of your entry points on the <Link href="/services" className="underline underline-offset-4">services page</Link> and get a quote.
        </p>
      </>
    )
  },
  3: {
    title: "The Future of Voice Assistants in Smart Homes",
    subtitle: "Explore how voice assistant technology is evolving and what it means for the future of home automation.",
    date: "March 10, 2025",
    author: "Art Gonzales",
    authorRole: "Smarter Home PH",
    authorAvatar: "",
    readTime: "5 min read",
    category: "Intelligence",
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=1200&auto=format&fit=crop",
    content: (
      <>
        <p className="text-xl leading-relaxed text-foreground">
          For years, voice control in the smart home has been somewhat transactional: "Turn on the lights," "What is the weather today?" or "Set a timer for 10 minutes." However, the integration of Large Language Models (LLMs) and advanced local processing is changing everything, turning smart assistants into proactive, contextual home co-pilots.
        </p>
        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">From Commands to Conversations</h2>
        <p className="leading-relaxed text-muted-foreground">
          The next generation of voice assistants won't require rigid, exact commands. You can simply state, "The room feels a bit stuffy," and the assistant will intelligently correlate your request with ambient temperature and air quality data, deciding to turn on the ceiling fan or adjust the ventilation system.
        </p>
        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Local Processing & Absolute Privacy</h2>
        <p className="leading-relaxed text-muted-foreground">
          One of the biggest concerns with voice assistants has been data privacy—audio clips being transmitted to cloud servers for analysis. Future integrations utilize powerful neural processors built directly into home automation servers, allowing voice recognition to occur completely offline. Your conversations remain inside your home.
        </p>
        <blockquote className="my-10 border-l-2 border-primary pl-6 font-display text-2xl italic leading-snug sm:text-3xl">
          "Artificial intelligence in the home should be felt, not seen, operating behind the scenes to streamline your day."
        </blockquote>
      </>
    )
  },
  4: {
    title: "Energy Saving Tips with Smart Home Automation",
    subtitle: "Discover how smart thermostats, lighting, and appliances can help reduce your energy consumption.",
    date: "March 5, 2025",
    author: "Art Gonzales",
    authorRole: "Smarter Home PH",
    authorAvatar: "",
    readTime: "7 min read",
    category: "Efficiency",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    content: (
      <>
        <p className="text-xl leading-relaxed text-foreground">
          With utility bills rising and climate awareness at an all-time high, homeowners are searching for ways to decrease energy consumption. Fortunately, smart home technology offers powerful tools to automate energy efficiency without sacrificing comfort.
        </p>
        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Automating Standby Power Cuts</h2>
        <p className="leading-relaxed text-muted-foreground">
          Many electronics (TVs, gaming consoles, chargers) draw energy even when turned off—a phenomenon known as "vampire load." By plugging these devices into smart plugs with built-in energy monitoring, you can automate schedules to completely cut off their power supply when you go to bed or leave for work.
        </p>
        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Sun-Tracking Window Coverings</h2>
        <p className="leading-relaxed text-muted-foreground">
          By integrating smart blinds with temperature sensors, your home can automatically close the shades during the hottest hours of the summer day, reducing the load on your air conditioning. In winter, they open up to let in free thermal heat from the sun.
        </p>
        <blockquote className="my-10 border-l-2 border-primary pl-6 font-display text-2xl italic leading-snug sm:text-3xl">
          "Sustainability doesn't require compromises. Automation enables energy efficiency to become a passive, background operation."
        </blockquote>
      </>
    )
  },
  5: {
    title: "Integrating Smart Home Systems: A Comprehensive Guide",
    subtitle: "Learn how to make different smart home ecosystems work together for a seamless experience.",
    date: "February 28, 2025",
    author: "Art Gonzales",
    authorRole: "Smarter Home PH",
    authorAvatar: "",
    readTime: "9 min read",
    category: "Ecosystems",
    image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=1200&auto=format&fit=crop",
    content: (
      <>
        <p className="text-xl leading-relaxed text-foreground">
          One of the biggest frustrations in home automation is fragmentation. Buying devices that require separate apps can turn a "smart home" into an exhausting chore. A seamless home automation experience relies on connecting different platforms together into a single, unified interface.
        </p>
        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">The Matter Standard: Unified Connectivity</h2>
        <p className="leading-relaxed text-muted-foreground">
          The introduction of the Matter standard marks a historic shift. Sponsored by major industry players like Apple, Google, Amazon, and Samsung, Matter allows certified devices to work cross-platform out of the box. You can now control a Matter smart bulb using Apple HomeKit, Alexa, and Google Assistant simultaneously.
        </p>
        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Bridging Older Hardware</h2>
        <p className="leading-relaxed text-muted-foreground">
          If you have older Zigbee, Z-Wave, or proprietary smart gadgets, you don't need to throw them away. Automation gateways and custom smart hubs can translate these legacy protocols, exposing them as standard Matter-compatible accessories on your modern network.
        </p>
        <blockquote className="my-10 border-l-2 border-primary pl-6 font-display text-2xl italic leading-snug sm:text-3xl">
          "A unified home system is the difference between owning twenty separate smart gadgets and living in an integrated, smart ecosystem."
        </blockquote>
      </>
    )
  },
  6: {
    title: "Smart Home Setup for Aging in Place: A Practical Guide for Families",
    subtitle: "Seven small upgrades that make a parent's or grandparent's home safer, plus the privacy and brownout details most guides skip.",
    date: "February 23, 2025",
    author: "Art Gonzales",
    authorRole: "Smarter Home PH",
    authorAvatar: "",
    readTime: "5 min read",
    category: "Accessibility",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop",
    content: (
      <>
        <p className="text-xl leading-relaxed text-foreground">
          If your parents or grandparents want to stay in their own home, a few small devices can make that safer. Most of them work over normal home wifi.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          One honest note first. Smart devices help with daily safety, but they don't replace a caregiver or medical care.
        </p>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Start with the problem, not the gadget</h2>
        <p className="leading-relaxed text-muted-foreground">
          Ask what actually worries you. For most families it's one of these:
        </p>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li>Falls on the way to the bathroom at night.</li>
          <li>Not knowing if they're okay when you're not there.</li>
          <li>Doors left unlocked or lost keys.</li>
          <li>Things left on, like an iron or a fan.</li>
          <li>Switches that are hard to reach.</li>
        </ul>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Seven upgrades worth doing, in order</h2>
        <ol className="list-decimal space-y-4 pl-5 leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Motion-activated night lights.</strong> Light the path from bedroom to bathroom automatically. Nobody has to find a switch in the dark.
          </li>
          <li>
            <strong className="text-foreground">Voice control.</strong> "Turn on the living room light" is easier than a switch for someone with sore hands. Keep the commands short and few. See our <Link href="/alexa" className="underline underline-offset-4">Alexa</Link> and <Link href="/google-home" className="underline underline-offset-4">Google Home</Link> pages.
          </li>
          <li>
            <strong className="text-foreground">A video doorbell.</strong> They can see and talk to a visitor from a chair, and you can check from your phone.
          </li>
          <li>
            <strong className="text-foreground">A smart lock with a PIN.</strong> No lost keys. You can give a helper a code and remove it later. Always keep a physical key as a backup.
          </li>
          <li>
            <strong className="text-foreground">Door and motion sensors for check-ins.</strong> They tell you someone is moving around without using a camera. A set-up like "no kitchen motion by 10am, send me a message" works well.
          </li>
          <li>
            <strong className="text-foreground">Smoke and leak sensors.</strong> A smart smoke alarm sends an alert to your phone, not only a loud noise in the house.
          </li>
          <li>
            <strong className="text-foreground">A smart plug with an auto-off timer.</strong> Good for a fan or small appliance that gets forgotten. Check the plug's wattage rating and don't use it for heavy loads like aircon.
          </li>
        </ol>
        <p className="leading-relaxed text-muted-foreground">
          Before buying sensors, check that the app can send an alert when nothing moves. Not every app can.
        </p>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Use sensors, not cameras, inside the home</h2>
        <p className="leading-relaxed text-muted-foreground">
          Cameras inside a parent's home can feel like surveillance. Motion and door sensors answer the question you actually have: are they up and moving?
        </p>
        <p className="leading-relaxed text-muted-foreground">
          A housing project in Hong Kong uses this idea. Door sensors text volunteers if a resident's front door shows no movement for 48 hours. At home you'd set a much shorter window.
        </p>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li>Tell them what is installed and why.</li>
          <li>Never put cameras in bedrooms or bathrooms.</li>
          <li>Agree on who gets the alerts.</li>
        </ul>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Plan for brownouts and weak wifi</h2>
        <p className="leading-relaxed text-muted-foreground">
          When the power goes out, the router goes off and your alerts stop.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          A mini UPS for the modem and router fixes most of it. Units under ₱1,000 can keep a router on for roughly 1 to 2 hours, depending on the model.
        </p>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li>Make sure wifi reaches the bedroom and the bathroom.</li>
          <li>Keep a physical key for the smart lock.</li>
          <li>Set a reminder to check sensor and lock batteries every few months.</li>
        </ul>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">If you live far away</h2>
        <p className="leading-relaxed text-muted-foreground">
          Many families have someone working abroad or in another city. Shared access lets you see alerts, check the door and let in a helper without calling anyone.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Pick one platform for the whole house so there is only one app to learn.
        </p>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">What it costs</h2>
        <p className="leading-relaxed text-muted-foreground">
          Smart plugs and bulbs start at a few hundred pesos each. Locks, doorbells and sensors vary a lot by brand, so ask for a written quote instead of guessing.
        </p>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Test it together</h2>
        <p className="leading-relaxed text-muted-foreground">
          Sit down with them and try every device once. Leave a printed card with the three or four voice commands they'll use most.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Then check in a week later and ask what annoys them. If a device is annoying, they'll switch it off.
        </p>

        <p className="leading-relaxed text-muted-foreground">
          If you're in Pampanga, Tarlac or Bulacan and want help planning it, use our <Link href="/services" className="underline underline-offset-4">services page</Link> to list what you want room by room and send it for a quote.
        </p>
      </>
    )
  },
  7: {
    title: "How to Start a Smart Home in the Philippines (and What to Buy First)",
    subtitle: "A plain guide to what a smart home is, what it costs to begin, and the Philippine details most guides skip.",
    date: "November 11, 2026",
    author: "Art Gonzales",
    authorRole: "Smarter Home PH",
    authorAvatar: "",
    readTime: "5 min read",
    category: "Getting started",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    content: (
      <>
        <p className="text-xl leading-relaxed text-foreground">
          A smart home is a house where lights, locks, cameras and aircon respond to your phone, your voice or a schedule. You can start with one or two cheap devices and add more later.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Most guides to smart homes in the Philippines talk about market growth. This one covers what you do on day one.
        </p>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">What you need before you buy anything</h2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li>Home wifi that reaches the rooms you want to automate.</li>
          <li>A phone (Android or iPhone).</li>
          <li>A voice assistant you already use: Alexa, Google Home or Apple Home.</li>
        </ul>
        <p className="leading-relaxed text-muted-foreground">
          That's it. Most starter devices don't need a separate hub.
        </p>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Check the box before you pay</h2>
        <p className="leading-relaxed text-muted-foreground">
          Three things trip up first-time buyers here.
        </p>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li><strong className="text-foreground">Voltage.</strong> Some listings are for the US market and are rated for 100 to 125V only. Look for 220 to 240V on bulbs and plugs sold for Philippine homes.</li>
          <li><strong className="text-foreground">2.4GHz wifi.</strong> Many cheap smart devices only connect to 2.4GHz, not 5GHz. Your router needs to have it switched on during setup.</li>
          <li><strong className="text-foreground">Bulb base.</strong> Check whether your fixtures take E27 or another base before you order a pack.</li>
        </ul>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">What to buy first, in order</h2>
        <ol className="list-decimal space-y-3 pl-5 leading-relaxed text-muted-foreground">
          <li><strong className="text-foreground">A smart plug.</strong> It turns a fan, lamp or charger into something you can schedule. Listings we checked in November 2026 ran from about ₱490 to ₱690.</li>
          <li><strong className="text-foreground">A smart bulb.</strong> A wifi colour bulb with no hub was listed at about ₱310 at a local retailer.</li>
          <li><strong className="text-foreground">A camera or video doorbell.</strong> This is where most people feel the biggest day-to-day difference.</li>
          <li><strong className="text-foreground">A smart lock.</strong> Worth doing once the basics are working.</li>
          <li><strong className="text-foreground">An aircon controller.</strong> It lets you cool the room before you get home instead of leaving the unit on all day.</li>
        </ol>
        <p className="leading-relaxed text-muted-foreground">
          Prices move and stock sells out, so treat these as a rough guide. Locks, cameras and aircon controllers vary a lot by brand, so ask for a written quote instead of guessing.
        </p>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Plan for brownouts</h2>
        <p className="leading-relaxed text-muted-foreground">
          No power means no router, and no router means your smart devices go offline.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          A small UPS for your modem and router fixes most of it. Units for under ₱1,000 can keep a router running for roughly 1 to 2 hours, depending on the model.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Two more habits help. Keep a physical key or PIN backup on any smart lock. And leave the wall switch on for smart bulbs, since cutting power at the switch makes them unreachable.
        </p>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Pick one platform and stay with it</h2>
        <p className="leading-relaxed text-muted-foreground">
          Mixing five brands with five apps is the fastest way to give up on a smart home.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Choose one: <Link href="/alexa" className="underline underline-offset-4">Alexa</Link>, <Link href="/apple-home" className="underline underline-offset-4">Apple Home</Link> or <Link href="/google-home" className="underline underline-offset-4">Google Home</Link>. Devices that support Matter work across all three, so look for that label when you have a choice.
        </p>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">DIY or get an installer?</h2>
        <p className="leading-relaxed text-muted-foreground">
          Plugs and bulbs are easy to do yourself. You screw them in, open the app and follow the prompts.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Call someone for the jobs that can go wrong: door locks, wired cameras, aircon controllers, and wifi that doesn't reach every room. A bad install on a lock or a camera costs more than the install itself.
        </p>

        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Mistakes to avoid</h2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li>Buying a full kit before testing one plug.</li>
          <li>Ignoring weak wifi in the far bedroom or the garage.</li>
          <li>Skipping the backup key on a smart lock.</li>
          <li>Buying a device that only works with an app you'll never open again.</li>
        </ul>

        <p className="leading-relaxed text-muted-foreground">
          If you're in Pampanga, Tarlac or Bulacan and want help planning it, our <Link href="/services" className="underline underline-offset-4">services page</Link> lets you list what you want room by room and send it for a quote.
        </p>
      </>
    )
  }
}

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const id = parseInt(resolvedParams.id)

  const post = BLOG_POSTS_DETAIL[id]

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="container flex flex-1 flex-col items-start justify-center gap-6 py-24">
          <p className="eyebrow">404</p>
          <h1 className="text-5xl sm:text-6xl">Post not found.</h1>
          <p className="max-w-md text-muted-foreground">
            The article you are looking for does not exist or has been archived.
          </p>
          <Button asChild className="rounded-full">
            <Link href="/blog">Back to the journal</Link>
          </Button>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({ title: post.title, text: post.subtitle, url: window.location.href })
        .catch(console.error)
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Article link copied to clipboard")
    }
  }

  const otherPosts = Object.entries(BLOG_POSTS_DETAIL)
    .filter(([key]) => parseInt(key) !== id)
    .slice(0, 2)
    .map(([key, val]) => ({ id: parseInt(key), ...val }))

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <article>
          <header className="border-b">
            <div className="container pb-12 pt-12 md:pb-16 md:pt-16"><div className="max-w-4xl">
              <Link
                href="/blog"
                className="eyebrow inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Journal
              </Link>
              <p className="eyebrow mt-10 text-primary-ink">
                {post.category} · {post.readTime}
              </p>
              <h1 className="mt-4 text-balance text-5xl leading-[1.03] sm:text-6xl lg:text-7xl">{post.title}</h1>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground">{post.subtitle}</p>
              <p className="eyebrow mt-8">
                By {post.author}, {post.authorRole} · {post.date}
              </p>
            </div></div>
          </header>

          <div className="container grid gap-16 py-16 lg:grid-cols-12 lg:py-20">
            <div className="max-w-2xl space-y-6 lg:col-span-8">
              {post.content}

              <div className="!mt-16 flex items-center justify-between border-y py-5">
                <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 rounded-full">
                  <Share2 className="h-3.5 w-3.5" /> Share
                </Button>
                <Link href="/blog" className="text-sm underline-offset-4 hover:underline">
                  All posts
                </Link>
              </div>
            </div>

            <aside className="space-y-12 lg:col-span-4">
              <div className="rounded-xl bg-foreground p-8 text-background">
                <h2 className="text-3xl leading-tight">Ready to price your own setup?</h2>
                <p className="mt-3 text-sm leading-relaxed text-background/70">
                  Pick a service, list what you want in each room and send it to us for a written quote.
                </p>
                <Button
                  asChild
                  className="mt-6 h-11 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="/services">
                    Plan by room <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div>
                <p className="eyebrow mb-2">Keep reading</p>
                <ul>
                  {otherPosts.map((other) => (
                    <li key={other.id} className="border-t last:border-b">
                      <Link href={`/blog/${other.id}`} className="group block py-5">
                        <p className="eyebrow text-primary-ink">{other.category}</p>
                        <p className="mt-2 font-display text-2xl leading-snug transition-transform duration-300 group-hover:translate-x-1">
                          {other.title}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  )
}
