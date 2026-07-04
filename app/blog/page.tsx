"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Smart Home Devices That Will Transform Your Living Space",
      excerpt:
        "Discover the latest smart home innovations that can make your home more comfortable, efficient, and secure.",
      date: "March 20, 2025",
      author: "Emma Johnson",
      category: "Vision",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "How to Set Up a Smart Home Security System on a Budget",
      excerpt:
        "Learn how to create an effective home security system without breaking the bank using affordable smart devices.",
      date: "March 15, 2025",
      author: "Michael Chen",
      category: "Security",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "The Future of Voice Assistants in Smart Homes",
      excerpt:
        "Explore how voice assistant technology is evolving and what it means for the future of home automation.",
      date: "March 10, 2025",
      author: "Sarah Williams",
      category: "Intelligence",
      image: "https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Energy Saving Tips with Smart Home Automation",
      excerpt:
        "Discover how smart thermostats, lighting, and appliances can help reduce your energy consumption.",
      date: "March 5, 2025",
      author: "David Rodriguez",
      category: "Efficiency",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Integrating Smart Home Systems: A Comprehensive Guide",
      excerpt:
        "Learn how to make different smart home ecosystems work together for a seamless experience.",
      date: "February 28, 2025",
      author: "Lisa Thompson",
      category: "Ecosystems",
      image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Smart Home Innovations for Aging in Place",
      excerpt: "How smart technology can help seniors live independently and safely in their homes for longer.",
      date: "February 23, 2025",
      author: "Robert Garcia",
      category: "Accessibility",
      image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=800&auto=format&fit=crop",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* Simple Page Header */}
        <div className="pt-32 pb-12 border-b border-foreground/5 mb-12">
           <div className="container px-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary">
                       <Sparkles className="h-4 w-4" />
                       <span className="text-[10px] uppercase font-black tracking-widest">EDITORIAL</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">SMARTER HOME <span className="text-primary italic">JOURNAL</span></h1>
                 </div>
                 <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
                   Deep dives into the future of home automation, private cloud systems, and intelligent lifestyle engineering.
                 </p>
              </div>
           </div>
        </div>

        <section className="container px-4 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group glass h-full rounded-[2.5rem] border-foreground/5 hover:border-primary/50 transition-all duration-500 overflow-hidden flex flex-col">
                  <div className="aspect-[16/10] relative bg-muted overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-6 left-6">
                       <Badge className="bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest px-3 py-1">{post.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic">
                      <div className="flex items-center gap-1.5"><Calendar className="h-3 w-3" /> {post.date}</div>
                      <div className="flex items-center gap-1.5"><User className="h-3 w-3" /> {post.author}</div>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors leading-tight italic">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-8 flex-1 leading-relaxed">{post.excerpt}</p>
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="ghost" className="w-fit p-0 h-auto hover:bg-transparent hover:text-primary font-black uppercase tracking-widest text-xs group/btn italic">
                        READ ARTICLE <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}


