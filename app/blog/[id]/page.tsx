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
    title: "10 Smart Home Devices That Will Transform Your Living Space",
    subtitle: "Discover the latest smart home innovations that can make your home more comfortable, efficient, and secure.",
    date: "March 20, 2025",
    author: "Emma Johnson",
    authorRole: "Interior Automation Architect",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    readTime: "6 min read",
    category: "Vision",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    content: (
      <>
        <p className="text-xl leading-relaxed text-foreground">
          The concept of a "smart home" has evolved rapidly over the last decade. What once seemed like science fiction—controlling your lights with your voice, checking cameras from across the world, or having your thermostat learn your schedule—is now a routine part of modern home design.
        </p>
        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">1. The Brain: Next-Gen Automation Hubs</h2>
        <p className="leading-relaxed text-muted-foreground">
          A truly smart home starts with a centralized ecosystem. Hubs that support modern local protocols like Matter and Thread ensure that your devices communicate locally without requiring a round-trip to the cloud. This means near-zero latency, robust offline operation, and bulletproof security.
        </p>
        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">2. Smart Lighting That Flows with the Day</h2>
        <p className="leading-relaxed text-muted-foreground">
          Lighting does more than help us see; it influences our mood, sleep cycles, and productivity. Circadian lighting systems automatically adjust their color temperature and brightness throughout the day—shifting from energizing cool white in the morning to a warm, cozy amber in the evening.
        </p>
        <blockquote className="my-10 border-l-2 border-primary pl-6 font-display text-2xl italic leading-snug sm:text-3xl">
          "The best smart home devices are the ones you forget exist because they adapt to your life automatically."
        </blockquote>
        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">3. Seamless Climate Intelligence</h2>
        <p className="leading-relaxed text-muted-foreground">
          Intelligent thermostats like the Ecobee Smart Thermostat Pro analyze indoor air quality, humidity, and room occupancy to deliver balanced comfort. Rather than running continuously, they adjust dynamically to optimize energy usage, saving homeowners up to 23% in annual heating and cooling costs.
        </p>
      </>
    )
  },
  2: {
    title: "How to Set Up a Smart Home Security System on a Budget",
    subtitle: "Learn how to create an effective home security system without breaking the bank using affordable smart devices.",
    date: "March 15, 2025",
    author: "Michael Chen",
    authorRole: "Principal Security Specialist",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    readTime: "8 min read",
    category: "Security",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    content: (
      <>
        <p className="text-xl leading-relaxed text-foreground">
          Keeping your home secure is a top priority, but traditional professional security systems can cost thousands of dollars upfront, plus heavy recurring monthly contracts. Fortunately, the rise of modular smart security devices has made it possible to build a premium, self-monitored system on a highly accessible budget.
        </p>
        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Start with Key Entryways: Smart Locks</h2>
        <p className="leading-relaxed text-muted-foreground">
          A smart lock is the first line of defense. By installing a retrofit smart lock on your existing deadbolt, you can manage access codes, monitor logs, and grant remote entry to guests. Brand names like August or Aqara offer high-end security standards like bank-level encryption.
        </p>
        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Add Targeted Surveillance</h2>
        <p className="leading-relaxed text-muted-foreground">
          Instead of wiring cameras everywhere, focus on key choke points: the front porch, the backyard entrance, and main interior hallways. Smart cameras from Reolink offer 2K clarity and local storage (on SD cards or local hard drives) so you can avoid monthly cloud storage fees.
        </p>
        <blockquote className="my-10 border-l-2 border-primary pl-6 font-display text-2xl italic leading-snug sm:text-3xl">
          "Security isn't about how much you spend; it's about eliminating blind spots and securing entryways locally."
        </blockquote>
        <p className="leading-relaxed text-muted-foreground">
          By combining these devices with inexpensive contact sensors on your windows, you can configure automations that sound an alarm or flash your smart light bulbs red if a door is opened unexpectedly, creating a cohesive, budget-friendly defense network.
        </p>
      </>
    )
  },
  3: {
    title: "The Future of Voice Assistants in Smart Homes",
    subtitle: "Explore how voice assistant technology is evolving and what it means for the future of home automation.",
    date: "March 10, 2025",
    author: "Sarah Williams",
    authorRole: "Lead AI Interaction Designer",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
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
    author: "David Rodriguez",
    authorRole: "Sustainability & Energy Consultant",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
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
    author: "Lisa Thompson",
    authorRole: "System Integration Specialist",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
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
    title: "Smart Home Innovations for Aging in Place",
    subtitle: "How smart technology can help seniors live independently and safely in their homes for longer.",
    date: "February 23, 2025",
    author: "Robert Garcia",
    authorRole: "Assistive Technology Consultant",
    authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
    readTime: "7 min read",
    category: "Accessibility",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1200&auto=format&fit=crop",
    content: (
      <>
        <p className="text-xl leading-relaxed text-foreground">
          Home automation is often associated with gadget enthusiasts, but its most profound impact lies in assistive care and accessibility. For older adults who wish to "age in place" independently, smart technology provides a supportive framework that ensures safety, comfort, and peace of mind.
        </p>
        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Passive Fall Detection & Motion Mapping</h2>
        <p className="leading-relaxed text-muted-foreground">
          Modern sensors can detect movement patterns without intrusive cameras. Radar-based motion sensors (like the Aqara Presence Sensor FP2) can detect falls and map room occupancy in real-time. If a fall is detected, the system can automatically send alerts to family members or dispatch local emergency services.
        </p>
        <h2 className="text-3xl sm:text-4xl mt-14 mb-4">Simplified Environmental Adjustments</h2>
        <p className="leading-relaxed text-muted-foreground">
          Voice control and automated routines reduce the need for physical bending or reaching. Automations like "Good Morning" can automatically open blinds, adjust the thermostat to a comfortable setting, turn on hall lighting, and pre-heat the coffee maker.
        </p>
        <blockquote className="my-10 border-l-2 border-primary pl-6 font-display text-2xl italic leading-snug sm:text-3xl">
          "Smart technology isn't just about luxury; it represents a major leap forward in accessibility, dignity, and independent living."
        </blockquote>
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
                  Pick your property type and rooms in the builder and see a running total.
                </p>
                <Button
                  asChild
                  className="mt-6 h-11 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="/builder">
                    Open the builder <ArrowRight className="ml-2 h-4 w-4" />
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
