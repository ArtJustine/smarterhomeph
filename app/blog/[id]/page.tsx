"use client"

import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, User, ArrowLeft, ArrowRight, Clock, Tag, Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
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
        <p className="text-lg leading-relaxed text-muted-foreground">
          The concept of a "smart home" has evolved rapidly over the last decade. What once seemed like science fiction—controlling your lights with your voice, checking cameras from across the world, or having your thermostat learn your schedule—is now a routine part of modern home design.
        </p>
        <h2 className="text-3xl font-black italic tracking-tighter uppercase mt-12 mb-6">1. The Brain: Next-Gen Automation Hubs</h2>
        <p className="leading-relaxed text-muted-foreground">
          A truly smart home starts with a centralized ecosystem. Hubs that support modern local protocols like Matter and Thread ensure that your devices communicate locally without requiring a round-trip to the cloud. This means near-zero latency, robust offline operation, and bulletproof security.
        </p>
        <h2 className="text-3xl font-black italic tracking-tighter uppercase mt-12 mb-6">2. Smart Lighting That Flows with the Day</h2>
        <p className="leading-relaxed text-muted-foreground">
          Lighting does more than help us see; it influences our mood, sleep cycles, and productivity. Circadian lighting systems automatically adjust their color temperature and brightness throughout the day—shifting from energizing cool white in the morning to a warm, cozy amber in the evening.
        </p>
        <blockquote className="border-l-4 border-primary bg-primary/5 p-6 rounded-r-2xl italic font-medium my-8 text-white/90">
          "The best smart home devices are the ones you forget exist because they adapt to your life automatically."
        </blockquote>
        <h2 className="text-3xl font-black italic tracking-tighter uppercase mt-12 mb-6">3. Seamless Climate Intelligence</h2>
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
        <p className="text-lg leading-relaxed text-muted-foreground">
          Keeping your home secure is a top priority, but traditional professional security systems can cost thousands of dollars upfront, plus heavy recurring monthly contracts. Fortunately, the rise of modular smart security devices has made it possible to build a premium, self-monitored system on a highly accessible budget.
        </p>
        <h2 className="text-3xl font-black italic tracking-tighter uppercase mt-12 mb-6">Start with Key Entryways: Smart Locks</h2>
        <p className="leading-relaxed text-muted-foreground">
          A smart lock is the first line of defense. By installing a retrofit smart lock on your existing deadbolt, you can manage access codes, monitor logs, and grant remote entry to guests. Brand names like August or Aqara offer high-end security standards like bank-level encryption.
        </p>
        <h2 className="text-3xl font-black italic tracking-tighter uppercase mt-12 mb-6">Add Targeted Surveillance</h2>
        <p className="leading-relaxed text-muted-foreground">
          Instead of wiring cameras everywhere, focus on key choke points: the front porch, the backyard entrance, and main interior hallways. Smart cameras from Reolink offer 2K clarity and local storage (on SD cards or local hard drives) so you can avoid monthly cloud storage fees.
        </p>
        <blockquote className="border-l-4 border-primary bg-primary/5 p-6 rounded-r-2xl italic font-medium my-8 text-white/90">
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
        <p className="text-lg leading-relaxed text-muted-foreground">
          For years, voice control in the smart home has been somewhat transactional: "Turn on the lights," "What is the weather today?" or "Set a timer for 10 minutes." However, the integration of Large Language Models (LLMs) and advanced local processing is changing everything, turning smart assistants into proactive, contextual home co-pilots.
        </p>
        <h2 className="text-3xl font-black italic tracking-tighter uppercase mt-12 mb-6">From Commands to Conversations</h2>
        <p className="leading-relaxed text-muted-foreground">
          The next generation of voice assistants won't require rigid, exact commands. You can simply state, "The room feels a bit stuffy," and the assistant will intelligently correlate your request with ambient temperature and air quality data, deciding to turn on the ceiling fan or adjust the ventilation system.
        </p>
        <h2 className="text-3xl font-black italic tracking-tighter uppercase mt-12 mb-6">Local Processing & Absolute Privacy</h2>
        <p className="leading-relaxed text-muted-foreground">
          One of the biggest concerns with voice assistants has been data privacy—audio clips being transmitted to cloud servers for analysis. Future integrations utilize powerful neural processors built directly into home automation servers, allowing voice recognition to occur completely offline. Your conversations remain inside your home.
        </p>
        <blockquote className="border-l-4 border-primary bg-primary/5 p-6 rounded-r-2xl italic font-medium my-8 text-white/90">
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
        <p className="text-lg leading-relaxed text-muted-foreground">
          With utility bills rising and climate awareness at an all-time high, homeowners are searching for ways to decrease energy consumption. Fortunately, smart home technology offers powerful tools to automate energy efficiency without sacrificing comfort.
        </p>
        <h2 className="text-3xl font-black italic tracking-tighter uppercase mt-12 mb-6">Automating Standby Power Cuts</h2>
        <p className="leading-relaxed text-muted-foreground">
          Many electronics (TVs, gaming consoles, chargers) draw energy even when turned off—a phenomenon known as "vampire load." By plugging these devices into smart plugs with built-in energy monitoring, you can automate schedules to completely cut off their power supply when you go to bed or leave for work.
        </p>
        <h2 className="text-3xl font-black italic tracking-tighter uppercase mt-12 mb-6">Sun-Tracking Window Coverings</h2>
        <p className="leading-relaxed text-muted-foreground">
          By integrating smart blinds with temperature sensors, your home can automatically close the shades during the hottest hours of the summer day, reducing the load on your air conditioning. In winter, they open up to let in free thermal heat from the sun.
        </p>
        <blockquote className="border-l-4 border-primary bg-primary/5 p-6 rounded-r-2xl italic font-medium my-8 text-white/90">
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
        <p className="text-lg leading-relaxed text-muted-foreground">
          One of the biggest frustrations in home automation is fragmentation. Buying devices that require separate apps can turn a "smart home" into an exhausting chore. A seamless home automation experience relies on connecting different platforms together into a single, unified interface.
        </p>
        <h2 className="text-3xl font-black italic tracking-tighter uppercase mt-12 mb-6">The Matter Standard: Unified Connectivity</h2>
        <p className="leading-relaxed text-muted-foreground">
          The introduction of the Matter standard marks a historic shift. Sponsored by major industry players like Apple, Google, Amazon, and Samsung, Matter allows certified devices to work cross-platform out of the box. You can now control a Matter smart bulb using Apple HomeKit, Alexa, and Google Assistant simultaneously.
        </p>
        <h2 className="text-3xl font-black italic tracking-tighter uppercase mt-12 mb-6">Bridging Older Hardware</h2>
        <p className="leading-relaxed text-muted-foreground">
          If you have older Zigbee, Z-Wave, or proprietary smart gadgets, you don't need to throw them away. Automation gateways and custom smart hubs can translate these legacy protocols, exposing them as standard Matter-compatible accessories on your modern network.
        </p>
        <blockquote className="border-l-4 border-primary bg-primary/5 p-6 rounded-r-2xl italic font-medium my-8 text-white/90">
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
        <p className="text-lg leading-relaxed text-muted-foreground">
          Home automation is often associated with gadget enthusiasts, but its most profound impact lies in assistive care and accessibility. For older adults who wish to "age in place" independently, smart technology provides a supportive framework that ensures safety, comfort, and peace of mind.
        </p>
        <h2 className="text-3xl font-black italic tracking-tighter uppercase mt-12 mb-6">Passive Fall Detection & Motion Mapping</h2>
        <p className="leading-relaxed text-muted-foreground">
          Modern sensors can detect movement patterns without intrusive cameras. Radar-based motion sensors (like the Aqara Presence Sensor FP2) can detect falls and map room occupancy in real-time. If a fall is detected, the system can automatically send alerts to family members or dispatch local emergency services.
        </p>
        <h2 className="text-3xl font-black italic tracking-tighter uppercase mt-12 mb-6">Simplified Environmental Adjustments</h2>
        <p className="leading-relaxed text-muted-foreground">
          Voice control and automated routines reduce the need for physical bending or reaching. Automations like "Good Morning" can automatically open blinds, adjust the thermostat to a comfortable setting, turn on hall lighting, and pre-heat the coffee maker.
        </p>
        <blockquote className="border-l-4 border-primary bg-primary/5 p-6 rounded-r-2xl italic font-medium my-8 text-white/90">
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
      <div className="flex min-h-screen flex-col bg-background text-foreground justify-center items-center">
        <SiteHeader />
        <div className="text-center space-y-6 max-w-md px-6 py-20 glass rounded-[2.5rem]">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-primary">Post Not Found</h2>
          <p className="text-muted-foreground">The article you are looking for does not exist or has been archived.</p>
          <Link href="/blog">
            <Button className="rounded-xl w-full">BACK TO JOURNAL</Button>
          </Link>
        </div>
        <SiteFooter />
      </div>
    )
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.subtitle,
        url: window.location.href
      }).catch(console.error)
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Article link copied to clipboard!")
    }
  }

  const otherPosts = Object.entries(BLOG_POSTS_DETAIL)
    .filter(([key]) => parseInt(key) !== id)
    .slice(0, 2)
    .map(([key, val]) => ({ id: parseInt(key), ...val }))

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* Article Hero */}
        <section className="relative min-h-[60vh] flex items-end pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/60" />
          </div>

          <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl space-y-6">
              <Link href="/blog">
                <Button variant="ghost" className="text-white hover:text-primary gap-2 p-0 h-auto font-bold uppercase tracking-widest text-xs italic bg-transparent hover:bg-transparent">
                  <ArrowLeft className="h-4 w-4" /> Back to Journal
                </Button>
              </Link>
              
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-3 py-1">
                  {post.category}
                </Badge>
                <Badge variant="outline" className="border-white/20 text-white backdrop-blur-md bg-white/5 text-[10px] font-black uppercase tracking-widest px-3 py-1">
                  {post.readTime}
                </Badge>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase italic text-glow">
                {post.title}
              </h1>

              <p className="text-lg sm:text-xl text-white/70 font-medium leading-relaxed max-w-3xl">
                {post.subtitle}
              </p>

              <div className="flex items-center gap-6 pt-4 border-t border-white/10 w-fit">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden border border-primary/20">
                    <Image
                      src={post.authorAvatar}
                      alt={post.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-wider">{post.author}</p>
                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">{post.authorRole}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/40 font-bold uppercase tracking-widest">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className="py-20 container px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-8 text-foreground prose dark:prose-invert max-w-none">
              {post.content}
              
              {/* Interaction Panel */}
              <div className="flex justify-between items-center py-6 border-y border-foreground/5 mt-16">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleShare} className="rounded-xl font-bold text-xs gap-2">
                    <Share2 className="h-3.5 w-3.5" /> SHARE
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => toast.success("Article bookmarked!")} className="rounded-xl font-bold text-xs gap-2">
                    <Bookmark className="h-3.5 w-3.5" /> SAVE
                  </Button>
                </div>
                <Link href="/blog">
                  <Button variant="ghost" className="text-xs font-black uppercase tracking-widest italic hover:text-primary">
                    View all posts
                  </Button>
                </Link>
              </div>
            </div>

            {/* Side Callouts / CTAs */}
            <div className="lg:col-span-4 space-y-8">
              <Card className="glass-dark border-primary/20 rounded-[2rem] p-8 space-y-6">
                <div className="p-3 bg-primary/10 rounded-2xl w-fit text-primary">
                  <Tag className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white leading-tight">Ready to build your smart space?</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Design a custom system tailored to your budget and property type in less than 5 minutes using our interactive Home Builder.
                </p>
                <Link href="/builder">
                  <Button className="w-full rounded-xl py-6 font-bold flex gap-2">
                    OPEN BUILDER <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </Card>

              {/* Related posts */}
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-widest opacity-40">Related Articles</h4>
                <div className="grid gap-6">
                  {otherPosts.map(other => (
                    <Link key={other.id} href={`/blog/${other.id}`}>
                      <div className="group flex gap-4 p-4 glass rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                        <div className="relative h-20 w-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                          <Image src={other.image} alt={other.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="space-y-1">
                          <Badge className="bg-primary/10 text-primary border-none text-[8px] font-black uppercase tracking-widest px-2 py-0.5">{other.category}</Badge>
                          <h5 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">{other.title}</h5>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
