"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Send, Sparkles, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { toast } from "sonner"

const EMAIL = "info@smarterhomephilippines.com"

interface BuilderConfig {
  propertyType: string
  rooms: Array<{ name: string; devices: string[] }>
  totalPrice: number
}

export default function ContactPage() {
  const [loadedConfig, setLoadedConfig] = useState<BuilderConfig | null>(null)

  // Read configuration from LocalStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem("smarterhome_builder_config")
    if (raw) {
      try {
        setLoadedConfig(JSON.parse(raw) as BuilderConfig)
      } catch (e) {
        console.error("Failed to parse smart builder configuration", e)
      }
    }
  }, [])

  const handleClearConfig = () => {
    localStorage.removeItem("smarterhome_builder_config")
    setLoadedConfig(null)
    toast.success("Builder configuration cleared.")
  }

  // Build the mailto link, adding the builder setup to the email body when there is one
  let subject = "Smart home quote request"
  let body = "Hi Smarter Home PH,\n\nI would like a quote for my home.\n\nName:\nLocation:\nProperty type (house, townhouse, condo, office):\nWhat I want to automate:\n"
  if (loadedConfig) {
    const roomsStr = loadedConfig.rooms.map((r) => `- ${r.name}: ${r.devices.join(", ")}`).join("\n")
    subject = `${loadedConfig.propertyType} quote request`
    body = `Hi Smarter Home PH,\n\nI would like a quote for my custom smart system.\n\nProperty type: ${loadedConfig.propertyType}\nRooms:\n${roomsStr}${loadedConfig.totalPrice > 0 ? `\n\nEstimated total: ${loadedConfig.totalPrice.toLocaleString()}` : ""}\n\nName:\nLocation:\n`
  }
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 pb-24 pt-14 md:pt-20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column: Contact Info & Configuration */}
              <div className="space-y-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <p className="eyebrow mb-5">Contact</p>
                  <h1 className="mb-6 text-5xl leading-[1.02] sm:text-6xl">Get a smart home quote for <span className="italic text-primary-ink">your house.</span></h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    A studio, a townhouse or a small office. Send us an email with a few lines and we will reply with next steps.
                  </p>
                </motion.div>

                {/* Display configuration if imported from LocalStorage */}
                {loadedConfig && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-primary/5 border border-primary/20 rounded-xl space-y-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-xl rounded-full" />

                    <div className="flex justify-between items-center border-b border-border pb-4">
                      <div className="flex items-center gap-2 text-primary-ink font-semibold uppercase tracking-widest text-xs">
                        <Sparkles className="h-4 w-4" />
                        <span>Custom Build Imported</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearConfig}
                        className="text-xs text-destructive hover:bg-destructive/10 hover:text-destructive h-auto p-2 rounded-xl font-bold flex gap-1 items-center"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> CLEAR
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-bold uppercase tracking-wider">Property Class</span>
                        <span className="font-bold text-foreground uppercase">{loadedConfig.propertyType}</span>
                      </div>

                      <div className="space-y-3 max-h-[160px] overflow-y-auto pr-2 border-y border-border py-4">
                        {loadedConfig.rooms.map((r, idx) => (
                          <div key={idx} className="space-y-1">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{r.name}</p>
                            <p className="text-[11px] text-muted-foreground truncate leading-relaxed">{r.devices.join(", ")}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-end">
                        {loadedConfig.totalPrice > 0 ? (
                          <div>
                            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Configuration Total</p>
                            <p className="text-3xl font-semibold text-primary-ink tracking-tight">${loadedConfig.totalPrice.toLocaleString()}</p>
                          </div>
                        ) : (
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Quote on request</p>
                        )}
                        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary-ink text-[10px] font-semibold uppercase tracking-widest px-3 py-1">
                          Specs Attached
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="grid gap-8">
                  {[
                    { title: "Email Us", desc: EMAIL, icon: Mail, href: mailto },
                    { title: "Location", desc: "Mabalacat City, Pampanga. No physical office, we come to you.", icon: MapPin },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-6 group"
                    >
                      <div className="h-fit rounded-full border bg-card p-3 transition-colors group-hover:bg-primary">
                        <item.icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h3 className=" text-lg text-foreground mb-1">{item.title}</h3>
                        {item.href ? (
                          <a href={item.href} className="text-muted-foreground font-medium underline-offset-4 hover:underline">
                            {item.desc}
                          </a>
                        ) : (
                          <p className="text-muted-foreground font-medium">{item.desc}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right Column: Email card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border p-8 md:p-12 rounded-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Send className="h-32 w-32" />
                </div>

                <div className="space-y-6">
                  <h2 className="text-4xl">Send us an email.</h2>
                  <p className="text-muted-foreground">
                    Click the button and your email app opens with a short template. Tell us where you live, what kind of
                    property it is and what you want to automate. We reply with next steps.
                  </p>
                  <Button asChild size="lg" className="h-14 rounded-full px-8 text-base font-medium normal-case tracking-normal">
                    <a href={mailto}>
                      <Mail className="mr-2 h-5 w-5" strokeWidth={1.75} />
                      Send us an email
                    </a>
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Or write to <a href={mailto} className="text-foreground underline underline-offset-4">{EMAIL}</a> from any email account.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
