"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  Cpu, 
  ChevronRight,
  Play,
  Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const brands = [
  { name: "Aqara", logo: "/aqara-logo 1.svg" },
  { name: "Govee", logo: "/Govee-Logo 1.svg" },
  { name: "Eve", logo: "/eve.svg" },
  { name: "Reolink", logo: "/reolink.svg" },
  { name: "Abode", logo: "/abode.svg" },
  { name: "YoLink", logo: "/yolink.svg" },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <SiteHeader />
      
      <main className="flex-1">
        {/* Breathtaking Hero Section */}
        <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
             <Image
               src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
               alt="Luxury Smart Home"
               fill
               className="object-cover scale-105"
               priority
             />
             <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-background" />
             <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent hidden lg:block" />
          </div>

          <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/50 bg-primary/10 text-primary-foreground backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-[0.2em]">
                  Next-Gen Home Automation
                </Badge>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                  SMARTER <br />
                  <span className="text-primary italic">LIVING</span> <br />
                  DEFINED.
                </h1>
                <p className="text-xl text-white/70 max-w-xl mb-10 leading-relaxed font-medium">
                  Experience the pinnacle of luxury and convenience. Build your custom smart ecosystem with professional installation and 24/7 support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/builder">
                    <Button size="lg" className="h-16 px-10 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/30 group">
                      START BUILDING <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl text-lg font-bold glass-dark text-white border-white/20 hover:bg-white/10">
                      OUR SOLUTIONS
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Floating Element for Hero */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-20 right-[10%] hidden lg:block"
          >
            <div className="glass-dark p-6 rounded-[2.5rem] border-white/10 flex items-center gap-6 shadow-2xl">
               <div className="p-4 bg-primary/20 rounded-[1.5rem] text-primary">
                 <Cpu className="h-8 w-8" />
               </div>
               <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-3 w-3 fill-primary text-primary" />)}
                  </div>
                  <p className="text-white font-black text-xl italic uppercase tracking-tighter">1,200+ Homes</p>
                  <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Digitized locally</p>
               </div>
            </div>
          </motion.div>
        </section>

        {/* Brand Showcase - Marquee */}
        <section className="py-12 bg-background border-y border-foreground/5">
          <div className="container overflow-hidden">
             <p className="text-center text-[10px] uppercase font-black tracking-[0.3em] text-muted-foreground mb-12">INTEGRATED ECOSYSTEM PARTNERS</p>
             <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
                {[...brands, ...brands].map((brand, i) => (
                  <div key={i} className="flex items-center gap-2 px-8 grayscale hover:grayscale-0 transition-all opacity-40 hover:opacity-100">
                    <Image src={brand.logo} alt={brand.name} width={100} height={40} className="h-8 object-contain" />
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* Visual Features Section */}
        <section className="py-24 lg:py-40 relative">
          <div className="container px-4">
             <div className="grid lg:grid-cols-2 gap-24 items-center">
                <div className="relative">
                   <div className="aspect-square rounded-[3rem] overflow-hidden rotate-3 shadow-2xl relative z-10">
                      <Image 
                        src="https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000&auto=format&fit=crop" 
                        alt="Security Focus" 
                        fill 
                        className="object-cover brightness-75 transition-transform hover:scale-110 duration-1000" 
                      />
                      <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                   </div>
                   <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full -z-10" />
                   {/* Overlay Stats */}
                   <div className="absolute -bottom-8 -left-8 glass p-8 rounded-3xl z-20 shadow-2xl animate-bounce-slow">
                      <p className="text-3xl font-black italic tracking-tighter">0.02s</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Response Latency</p>
                   </div>
                </div>

                <div className="space-y-12">
                   <div>
                      <Badge className="bg-primary/10 text-primary border-none mb-6">WHY CHOOSE US</Badge>
                      <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">INTELLIGENCE THAT <br /><span className="text-muted-foreground/30">WORKS FOR YOU.</span></h2>
                      <p className="text-muted-foreground text-lg leading-relaxed">Unlike off-the-shelf solutions, we engineer private, local-first environments that prioritize your privacy without sacrificing connectivity.</p>
                   </div>

                   <div className="grid gap-6">
                      {[
                        { title: "Military Grade Privacy", desc: "Local server processing, no cloud dependency.", icon: ShieldCheck },
                        { title: "Matter Ready", desc: "Seamless cross-platform device interoperability.", icon: Zap },
                        { title: "Adaptive Lighting", desc: "Circadian rhythms adjusted to your sleep cycle.", icon: Smartphone },
                      ].map((item, i) => (
                        <div key={i} className="group flex items-start gap-6 p-6 rounded-2xl hover:bg-muted/50 transition-colors border border-transparent hover:border-foreground/5">
                           <div className="p-4 bg-muted rounded-xl group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                             <item.icon className="h-6 w-6" />
                           </div>
                           <div>
                              <h3 className="font-bold text-xl mb-1">{item.title}</h3>
                              <p className="text-muted-foreground">{item.desc}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* The Builder CTA Section */}
        <section className="py-24 container px-4">
           <div className="relative rounded-[4rem] overflow-hidden bg-foreground text-background p-12 lg:p-24">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                 <div className="grid grid-cols-6 h-full border-l border-white/10">
                    {Array.from({length: 24}).map((_, i) => <div key={i} className="border-r border-b border-white/5" />)}
                 </div>
              </div>
              
              <div className="relative z-10 max-w-2xl">
                 <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8">READY TO BUILD YOUR <br /><span className="text-primary italic">SMARTER HOME?</span></h2>
                 <p className="text-background/60 text-xl mb-12">Our interactive builder helps you plan your smart conversion in minutes. Get an instant quote for your property type.</p>
                 <Link href="/builder">
                   <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-16 px-12 rounded-2xl font-black text-xl shadow-2xl shadow-primary/20">
                     OPEN BUILDER <ChevronRight className="ml-2 h-6 w-6" />
                   </Button>
                 </Link>
              </div>
           </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}


