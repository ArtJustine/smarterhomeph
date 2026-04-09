"use client"

import { useState } from "react"
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
  Globe
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

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setIsSubmitted(true)
      toast.success("Message sent successfully!")
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Left Column: Contact Info */}
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

                <div className="grid gap-8">
                  {[
                    { title: "Email Us", desc: "hello@zenithsmart.com", icon: Mail },
                    { title: "Call Us", desc: "+1 (555) 000-0000", icon: Phone },
                    { title: "Visit Us", desc: "123 Innovation Way, Tech City", icon: MapPin },
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
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
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
                     <h2 className="text-3xl font-bold italic tracking-tighter">MESSAGE RECEIVED!</h2>
                     <p className="text-muted-foreground">Thank you for reaching out. One of our smart home specialists will contact you within 24 hours.</p>
                     <Button 
                       variant="outline" 
                       onClick={() => setIsSubmitted(false)} 
                       className="rounded-xl px-8"
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
                              <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} className="h-14 bg-background/50 rounded-xl" />
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
                              <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" {...field} className="h-14 bg-background/50 rounded-xl" />
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
                              <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (555) 000-0000" {...field} className="h-14 bg-background/50 rounded-xl" />
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
                              <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Interest</FormLabel>
                              <FormControl>
                                <Input placeholder="Security System" {...field} className="h-14 bg-background/50 rounded-xl" />
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
                            <FormLabel className="font-bold uppercase tracking-widest text-[10px]">Your Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your project..." 
                                className="min-h-[150px] bg-background/50 rounded-xl py-4" 
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
