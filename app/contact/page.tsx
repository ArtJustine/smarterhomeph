"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock,
  MessageSquare,
  Globe,
  Sparkles,
  Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

interface BuilderConfig {
  propertyType: string
  rooms: Array<{ name: string; devices: string[] }>
  totalPrice: number
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loadedConfig, setLoadedConfig] = useState<BuilderConfig | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  // Read configuration from LocalStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem("smarterhome_builder_config")
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as BuilderConfig
        setLoadedConfig(parsed)
        
        // Auto-populate form subject and message details
        const roomsStr = parsed.rooms.map(r => `• ${r.name}: ${r.devices.join(", ")}`).join("\n")
        const prepopulatedMessage = `I would like to request a professional installation consultation for my custom smart system.\n\nProperty Type: ${parsed.propertyType}\nRooms Setup:\n${roomsStr}\n\nEstimated Total Investment: $${parsed.totalPrice.toLocaleString()}`
        
        form.setValue("subject", `Custom Smart ${parsed.propertyType} Consultation`)
        form.setValue("message", prepopulatedMessage)
      } catch (e) {
        console.error("Failed to parse smart builder configuration", e)
      }
    }
  }, [form])

  const handleClearConfig = () => {
    localStorage.removeItem("smarterhome_builder_config")
    setLoadedConfig(null)
    form.setValue("subject", "")
    form.setValue("message", "")
    toast.success("Builder configuration cleared.")
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setIsSubmitted(true)
      localStorage.removeItem("smarterhome_builder_config")
      setLoadedConfig(null)
      toast.success("Message sent. We will be in touch.")
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      
      <main className="flex-1 pb-24 pt-14 md:pt-20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column: Contact Info & Configuration */}
              <div className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="eyebrow mb-5">Contact</p>
                  <h1 className="mb-6 text-5xl leading-[1.02] sm:text-6xl">Get a smart home quote for <span className="italic text-primary-ink">your house.</span></h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    A studio, a townhouse or a small office. Send a few lines and we will reply with next steps.
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
                        <div>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Configuration Total</p>
                          <p className="text-3xl font-semibold text-primary-ink tracking-tight">${loadedConfig.totalPrice.toLocaleString()}</p>
                        </div>
                        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary-ink text-[10px] font-semibold uppercase tracking-widest px-3 py-1">
                          Specs Attached
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="grid gap-8">
                  {[
                    { title: "Email Us", desc: "hello@smarterhomeph.com", icon: Mail },
                    { title: "Call Us", desc: "+63 (2) 8000-0000", icon: Phone },
                    { title: "Visit Us", desc: "123 Innovation Way, Taguig City", icon: MapPin },
                    { title: "Support", desc: "24/7 Priority Support", icon: Clock },
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
                        <p className="text-muted-foreground font-medium">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-8 flex gap-4">
                   <div className="p-3 bg-card border rounded-xl text-muted-foreground hover:text-primary-ink transition-colors cursor-pointer"><Globe className="h-5 w-5" /></div>
                   <div className="p-3 bg-card border rounded-xl text-muted-foreground hover:text-primary-ink transition-colors cursor-pointer"><MessageSquare className="h-5 w-5" /></div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border p-8 md:p-12 rounded-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Send className="h-32 w-32" />
                </div>

                {isSubmitted ? (
                  <div className="text-center py-12 space-y-6">
                     <div className="mx-auto w-20 h-20 bg-primary/20 text-primary-ink rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-10 w-10" />
                     </div>
                     <h2 className="text-4xl">Message sent.</h2>
                     <p className="text-muted-foreground">Thank you for reaching out. We will get back to you soon.</p>
                     <Button 
                       variant="outline" 
                       onClick={() => setIsSubmitted(false)} 
                       className="rounded-xl px-8 border-border hover:bg-secondary text-foreground"
                     >
                       Send Another Message
                     </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-normal">Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} className="h-14 bg-background/50 border-border text-foreground rounded-xl" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-normal">Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" {...field} className="h-14 bg-background/50 border-border text-foreground rounded-xl" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-normal">Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="09170000000" {...field} className="h-14 bg-background/50 border-border text-foreground rounded-xl" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-normal">Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="Consultation Request" {...field} className="h-14 bg-background/50 border-border text-foreground rounded-xl" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-normal">Your Project Details</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your smart home vision..." 
                                className="min-h-[180px] bg-background/50 border-border text-foreground rounded-xl py-4" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full h-16 rounded-lg font-semibold text-xl tracking-tight"
                      >
                        {isSubmitting ? "Sending..." : "Send message"}
                      </Button>
                    </form>
                  </Form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
