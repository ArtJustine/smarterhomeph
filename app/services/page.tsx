"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Lightbulb, 
  Shield, 
  Thermometer, 
  Zap, 
  Music, 
  Coffee,
  CheckCircle2,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"

const categories = [
  { 
    id: "lighting", 
    title: "Intelligence Lighting", 
    description: "Dynamic scenes that adapt to your mood and biological rhythm.",
    icon: Lightbulb,
    features: ["Circadian Adjustment", "Voice Integration", "Energy Harvesting"]
  },
  { 
    id: "security", 
    title: "Fortress Security", 
    description: "AI-driven threat detection with local-first processing for total privacy.",
    icon: Shield,
    features: ["Privacy-First Video", "Biometric Locks", "Intrusion Prediction"]
  },
  { 
    id: "climate", 
    title: "Adaptive Climate", 
    description: "Micro-climate control for every room, synchronized with local weather.",
    icon: Thermometer,
    features: ["Zoned Heating", "Air Quality Monitoring", "Auto-Ventilation"]
  },
  { 
    id: "automation", 
    title: "Local Automation", 
    description: "Offline-first routines that work even when your internet doesn't.",
    icon: Zap,
    features: ["Zero-Latency", "Custom Scripting", "Private Server Hub"]
  },
  { 
    id: "entertainment", 
    title: "Immersive Audio/Visual", 
    description: "Cinema-grade experiences integrated seamlessly into your architecture.",
    icon: Music,
    features: ["Multi-room Sync", "Acoustic Tuning", "Hidden Speakers"]
  },
  { 
    id: "appliances", 
    title: "Smart Kitchen", 
    description: "Connected culinary experiences that simplify your daily routine.",
    icon: Coffee,
    features: ["Inventory Tracking", "Guided Cooking", "Energy Monitoring"]
  },
]

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("smarter-home")

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* Service Hero */}
        <section className="pt-40 pb-20 container px-4">
           <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="outline" className="px-4 py-1.5 border-primary/50 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
                Our Services
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                HOLISTIC <span className="text-primary italic">SOLUTIONS</span> <br />
                FOR EVERY SPACE.
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                We provide end-to-end smart conversion services, from initial architectural planning to white-glove professional installation.
              </p>
           </div>
        </section>

        {/* Category Grid */}
        <section className="py-24 bg-muted/30">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat, i) => (
                <motion.div 
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="group glass h-full rounded-[2.5rem] border-foreground/5 hover:border-primary/50 transition-all duration-500 overflow-hidden">
                    <CardContent className="p-10 flex flex-col h-full">
                       <div className="p-4 bg-primary/10 rounded-2xl w-fit text-primary mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                         <cat.icon className="h-8 w-8" />
                       </div>
                       <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-4">{cat.title}</h3>
                       <p className="text-muted-foreground mb-8 flex-1">{cat.description}</p>
                       <ul className="space-y-3 mb-10">
                          {cat.features.map(feat => (
                            <li key={feat} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-60">
                               <CheckCircle2 className="h-4 w-4 text-primary" />
                               {feat}
                            </li>
                          ))}
                       </ul>
                       <Button variant="outline" className="rounded-xl h-12 border-foreground/10 hover:bg-primary hover:text-primary-foreground transition-all">
                         EXPLORE <ArrowRight className="ml-2 h-4 w-4" />
                       </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-40 container px-4">
           <div className="glass p-12 lg:p-24 rounded-[4rem] text-center space-y-8 bg-primary/5 border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 blur-[120px] rounded-full -z-10" />
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">NEED A CUSTOM <span className="text-primary italic">CONSULTATION?</span></h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Our lead engineers are available for specialized consultations for large-scale residential and commercial projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                 <Button size="lg" className="h-16 px-12 rounded-2xl text-lg font-bold">BOOK A SESSION</Button>
                 <Button size="lg" variant="outline" className="h-16 px-12 rounded-2xl text-lg font-bold">VIEW CASE STUDIES</Button>
              </div>
           </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}


