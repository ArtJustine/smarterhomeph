"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, Sparkles, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      name: "Jennifer M.",
      location: "San Francisco, CA",
      rating: 5,
      review:
        "The smart home system has completely transformed our daily routines. The automation features are intuitive and the app is incredibly user-friendly. Customer support was also exceptional.",
      product: "Complete Home Automation Package",
    },
    {
      id: 2,
      name: "Robert T.",
      location: "Chicago, IL",
      rating: 5,
      review:
        "I've been using the security system for about 6 months now and I'm very impressed with the quality of the cameras and the reliability of the motion detection. Truly premium hardware.",
      product: "Smart Security Bundle",
    },
    {
      id: 3,
      name: "Maria G.",
      location: "Austin, TX",
      rating: 5,
      review:
        "The smart lighting system is amazing! I love being able to control the ambiance of each room from my phone, and the energy savings have been significant. The installation was seamless.",
      product: "Smart Lighting Package",
    },
    {
      id: 4,
      name: "David L.",
      location: "Seattle, WA",
      rating: 5,
      review:
        "Technically marvelous. The integration with our existing local servers was handled perfectly by the engineering team. Private, fast, and reliable.",
      product: "Private Hub Integration",
    },
    {
      id: 5,
      name: "Sarah K.",
      location: "Boston, MA",
      rating: 4,
      review:
        "The smart thermostat has made a noticeable difference in our energy bills. It's easy to program and I love being able to adjust the temperature remotely. Exceptional build quality.",
      product: "Climate Control System",
    },
    {
      id: 6,
      name: "Michael P.",
      location: "Denver, CO",
      rating: 5,
      review:
        "The white-glove installation service was worth every penny. The technicians were professional, knowledgeable, and took the time to explain every protocol. Highly recommended.",
      product: "Professional Field Service",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* Review Hero */}
        <section className="pt-40 pb-20 container px-4 sm:px-6 lg:px-8">
           <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="outline" className="px-4 py-1.5 border-primary/50 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
                Testimonials
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
                TRUSTED BY <br />
                <span className="text-primary italic">VISIONARY HOMEOWNERS.</span>
              </h1>
              <div className="flex justify-center gap-2 mb-8">
                 {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-primary text-primary" />
                 ))}
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Join thousands of families who have already elevated their living standards with our intelligent home solutions.
              </p>
           </div>
        </section>

        {/* Reviews Masonry-ish Grid */}
        <section className="py-24 bg-muted/30">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="glass h-full rounded-[2.5rem] border-foreground/5 hover:border-primary/50 transition-all duration-500 overflow-hidden flex flex-col group">
                    <CardContent className="p-10 flex flex-col h-full">
                       <Quote className="h-8 w-8 text-primary mb-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                       <div className="flex mb-6">
                         {Array.from({ length: 5 }).map((_, i) => (
                           <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-primary/10"}`} />
                         ))}
                       </div>
                       <p className="text-lg font-medium leading-relaxed italic mb-8 flex-1">"{review.review}"</p>
                       <div className="pt-8 border-t border-foreground/5 flex items-center justify-between">
                          <div className="space-y-1">
                             <div className="font-black italic uppercase tracking-tighter flex items-center gap-2">
                                {review.name} <CheckCircle className="h-3 w-3 text-primary" />
                             </div>
                             <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{review.location}</div>
                          </div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-primary italic text-right max-w-[100px] leading-tight">
                             {review.product}
                          </div>
                       </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Shoutout */}
        <section className="py-40 container text-center space-y-12">
           <div className="inline-flex items-center gap-2 text-primary">
              <Sparkles className="h-5 w-5" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">RELIABILITY AS STANDARD</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic">99.9% UPTIME FOR YOUR <br />SMART ECOSYSTEM.</h2>
           <p className="text-muted-foreground max-w-xl mx-auto">
             Our enterprise-grade hubs and localized processing ensure your home stays intelligent even during network outages.
           </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}


