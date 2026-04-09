"use client"

import { motion } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Shield, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* Simple Premium Hero */}
        <section className="pt-40 pb-20 container px-4 sm:px-6 lg:px-8">
           <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="outline" className="px-4 py-1.5 border-primary/50 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
                Our Vision
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
                DEFINING THE FUTURE OF <br />
                <span className="text-primary italic">INTELLIGENT LIVING.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We don't just sell gadgets; we engineer private, secure, and intuitive smart home environments for the modern lifestyle.
              </p>
           </div>
        </section>

        {/* Values Grid */}
        <section className="py-24 bg-muted/30">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Privacy First", desc: "Local-first processing ensures your data never leaves your home.", icon: Shield },
                { title: "Expert Engineering", desc: "Our technicians are certified in top automation protocols.", icon: Target },
                { title: "User Centered", desc: "Every interface we build is designed for absolute simplicity.", icon: Heart },
                { title: "Scaleable Support", desc: "From studios to estates, we grow with your automation needs.", icon: Users },
              ].map((val, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-8 rounded-[2rem] space-y-4 hover:border-primary/50 transition-colors"
                >
                  <div className="p-3 bg-primary/10 rounded-xl w-fit text-primary">
                    <val.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold italic tracking-tight">{val.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-black italic tracking-tighter uppercase">Our Story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded in 2015, Zenith began with a simple idea: that technology should work for people, not the other
                way around. Our team of engineers, designers, and home automation enthusiasts came together with a shared
                vision of creating smart home solutions that are both powerful and easy to use.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-black italic tracking-tighter uppercase">Our Approach</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe in a holistic approach to smart home technology. Rather than offering isolated gadgets, we
                create ecosystems where devices work together seamlessly. Our solutions are designed to be flexible,
                scalable, and compatible with the leading smart home platforms like Matter, HomeKit, and Home Assistant.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}


