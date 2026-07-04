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
      toast.success("Message transmitted successfully!")
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <SiteHeader />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column: Contact Info & Configuration */}
              <div className="space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-6">
                    LET'S START <br />
                    <span className="text-primary italic">THE CONVERSATION.</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Whether you're looking to automate a studio apartment or a commercial complex, our experts are ready to assist.
                  </p>
                </motion.div>

                {/* Display configuration if imported from LocalStorage */}
                {loadedConfig && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-primary/5 border border-primary/20 rounded-[2.5rem] space-y-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-xl rounded-full" />
                    
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs">
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
                        <span className="text-white/50 font-bold uppercase tracking-wider">Property Class</span>
                        <span className="font-bold text-white uppercase italic">{loadedConfig.propertyType}</span>
                      </div>
                      
                      <div className="space-y-3 max-h-[160px] overflow-y-auto pr-2 border-y border-white/5 py-4">
                        {loadedConfig.rooms.map((r, idx) => (
                          <div key={idx} className="space-y-1">
                            <p className="text-xs font-bold text-white/80 uppercase tracking-wider">{r.name}</p>
                            <p className="text-[11px] text-white/45 truncate leading-relaxed">{r.devices.join(", ")}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Configuration Total</p>
                          <p className="text-3xl font-black text-primary italic tracking-tighter text-glow">${loadedConfig.totalPrice.toLocaleString()}</p>
                        </div>
                        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1">
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
                      <div className="p-4 bg-muted rounded-2xl group-hover:bg-primary/20 group-hover:text-primary transition-colors h-fit">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-white mb-1">{item.title}</h3>
                        <p className="text-muted-foreground font-medium">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-8 flex gap-4">
                   <div className="p-3 glass rounded-xl text-muted-foreground hover:text-primary transition-colors cursor-pointer"><Globe className="h-5 w-5" /></div>
                   <div className="p-3 glass rounded-xl text-muted-foreground hover:text-primary transition-colors cursor-pointer"><MessageSquare className="h-5 w-5" /></div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Send className="h-32 w-32" />
                </div>

                {isSubmitted ? (
                  <div className="text-center py-12 space-y-6">
                     <div className="mx-auto w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-10 w-10" />
                     </div>
                     <h2 className="text-3xl font-black italic tracking-tighter text-white">TRANSMISSION SECURED!</h2>
                     <p className="text-muted-foreground">Thank you for reaching out. One of our lead automation engineers will contact you within 24 hours.</p>
                     <Button 
                       variant="outline" 
                       onClick={() => setIsSubmitted(false)} 
                       className="rounded-xl px-8 border-white/10 hover:bg-white/5 text-white"
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
                              <FormLabel className="font-bold uppercase tracking-widest text-[10px] text-white">Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} className="h-14 bg-background/50 border-white/10 text-white rounded-xl" />
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
                              <FormLabel className="font-bold uppercase tracking-widest text-[10px] text-white">Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" {...field} className="h-14 bg-background/50 border-white/10 text-white rounded-xl" />
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
                              <FormLabel className="font-bold uppercase tracking-widest text-[10px] text-white">Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="09170000000" {...field} className="h-14 bg-background/50 border-white/10 text-white rounded-xl" />
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
                              <FormLabel className="font-bold uppercase tracking-widest text-[10px] text-white">Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="Consultation Request" {...field} className="h-14 bg-background/50 border-white/10 text-white rounded-xl" />
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
                            <FormLabel className="font-bold uppercase tracking-widest text-[10px] text-white">Your Project Details</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your smart home vision..." 
                                className="min-h-[180px] bg-background/50 border-white/10 text-white rounded-xl py-4" 
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
                        className="w-full h-16 rounded-2xl font-black text-xl italic tracking-tighter"
                      >
                        {isSubmitting ? "TRANSMITTING..." : "SEND MESSAGE"}
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
