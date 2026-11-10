"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Building2, 
  Home, 
  Waves, 
  Lightbulb, 
  ShieldCheck, 
  Thermometer, 
  Music, 
  Tv, 
  Plus, 
  Trash2, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"

// Types
type PropertyType = "condo" | "townhouse" | "house" | "office"
type DeviceCategory = "lighting" | "security" | "climate" | "entertainment"

interface Device {
  id: string
  name: string
  price: number
  category: DeviceCategory
  icon: any
  image: string
}

interface Room {
  id: string
  name: string
  devices: Device[]
}

const PROPERTY_TYPES = [
  { id: "condo", name: "Studio / Condo", icon: Building2, basePrice: 500 },
  { id: "townhouse", name: "Townhouse", icon: Home, basePrice: 1200 },
  { id: "house", name: "3BR House", icon: Waves, basePrice: 2500 },
  { id: "office", name: "Modern Office", icon: Zap, basePrice: 1500 },
]

const AVAILABLE_DEVICES: Device[] = [
  { id: "l1", name: "Smart Bulb White", price: 15, category: "lighting", icon: Lightbulb, image: "https://images.unsplash.com/photo-1550524514-9b50228b3a7b?q=80&w=150&auto=format&fit=crop" },
  { id: "l2", name: "Smart RGB Strip", price: 45, category: "lighting", icon: Sparkles, image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=150&auto=format&fit=crop" },
  { id: "s1", name: "Indoor Camera", price: 89, category: "security", icon: ShieldCheck, image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=150&auto=format&fit=crop" },
  { id: "s2", name: "Smart Lock Pro", price: 199, category: "security", icon: Zap, image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=150&auto=format&fit=crop" },
  { id: "c1", name: "Smart Thermostat", price: 149, category: "climate", icon: Thermometer, image: "https://images.unsplash.com/photo-1595814433015-e6f548d5120a?q=80&w=150&auto=format&fit=crop" },
  { id: "e1", name: "Smart Speaker", price: 59, category: "entertainment", icon: Music, image: "https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=150&auto=format&fit=crop" },
  { id: "e2", name: "TV Controller", price: 35, category: "entertainment", icon: Tv, image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=150&auto=format&fit=crop" },
]

export default function BuilderPage() {
  const [step, setStep] = useState(1)
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null)
  const [rooms, setRooms] = useState<Room[]>([
    { id: "1", name: "Living Room", devices: [] },
    { id: "2", name: "Bedroom", devices: [] },
  ])
  const [activeRoomId, setActiveRoomId] = useState<string>("1")

  const activeRoom = rooms.find(r => r.id === activeRoomId)

  const totalPrice = useMemo(() => {
    const propertyBase = PROPERTY_TYPES.find(p => p.id === propertyType)?.basePrice || 0
    const deviceTotal = rooms.reduce((acc, room) => {
      return acc + room.devices.reduce((dAcc, d) => dAcc + d.price, 0)
    }, 0)
    return propertyBase + deviceTotal
  }, [propertyType, rooms])

  const addDeviceToRoom = (device: Device) => {
    setRooms(prev => prev.map(room => {
      if (room.id === activeRoomId) {
        return { ...room, devices: [...room.devices, { ...device, id: `${device.id}-${Date.now()}` }] }
      }
      return room
    }))
    toast.success(`Added ${device.name} to ${activeRoom?.name}`)
  }

  const removeDeviceFromRoom = (roomId: string, deviceInstanceId: string) => {
    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        return { ...room, devices: room.devices.filter(d => d.id !== deviceInstanceId) }
      }
      return room
    }))
  }

  const addRoom = () => {
    const newRoom: Room = {
      id: Date.now().toString(),
      name: "New Room",
      devices: []
    }
    setRooms([...rooms, newRoom])
    setActiveRoomId(newRoom.id)
  }

  const deleteRoom = (id: string) => {
    if (rooms.length <= 1) return
    setRooms(rooms.filter(r => r.id !== id))
    if (activeRoomId === id) setActiveRoomId(rooms[0].id)
  }

  // Export configuration to LocalStorage and navigate
  const handleSaveAndRedirect = () => {
    const config = {
      propertyType: PROPERTY_TYPES.find(p => p.id === propertyType)?.name || propertyType,
      rooms: rooms.filter(r => r.devices.length > 0).map(r => ({
        name: r.name,
        devices: r.devices.map(d => d.name)
      })),
      totalPrice
    }
    localStorage.setItem("smarterhome_builder_config", JSON.stringify(config))
    toast.success("Design exported successfully! Loading consultation request...")
    window.location.href = "/contact"
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      
      <main className="container max-w-6xl flex-1 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <p className="eyebrow mb-3">Home builder</p>
            <h1 className="text-5xl leading-none sm:text-6xl">Smart home cost estimator.</h1>
            <p className="mt-3 text-muted-foreground">Four short steps. Nothing is bought until you say so.</p>
          </div>
          <div className="flex items-center gap-6 bg-card border p-6 rounded-lg">
            <div className="text-right">
              <p className="eyebrow">Estimated total</p>
              <p className="font-display text-4xl leading-none">${totalPrice.toLocaleString()}</p>
            </div>
            <Button 
              size="lg" 
              className="rounded-full" 
              disabled={step < 3}
              onClick={handleSaveAndRedirect}
            >
              Save Config <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mb-12">
            <div className="flex justify-between mb-4">
                {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs transition-colors ${step >= s ? 'bg-foreground text-background' : 'border bg-card text-muted-foreground'}`}>
                            {s}
                        </div>
                        <span className={`eyebrow ${step >= s ? '!text-foreground' : ''}`}>
                            {s === 1 ? 'Property' : s === 2 ? 'Rooms' : s === 3 ? 'Devices' : 'Review'}
                        </span>
                    </div>
                ))}
            </div>
            <Progress value={(step / 4) * 100} className="h-px bg-border [&>div]:bg-foreground" />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {PROPERTY_TYPES.map((type) => (
                <Card 
                  key={type.id} 
                  className={`relative overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-primary/50 bg-card border-border ${propertyType === type.id ? 'ring-2 ring-primary bg-primary/5' : ''}`}
                  onClick={() => {
                    setPropertyType(type.id as PropertyType)
                    setStep(2)
                  }}
                >
                  <CardHeader className="pb-4">
                    <type.icon className="h-10 w-10 text-primary-ink mb-2" />
                    <CardTitle className="font-bold text-foreground">{type.name}</CardTitle>
                    <CardDescription className="text-muted-foreground">Starting from ${type.basePrice}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {rooms.map((room) => (
                  <Card key={room.id} className="group relative bg-card border-border">
                    <CardHeader className="p-4">
                      <input 
                        className="bg-transparent font-bold text-lg outline-none text-foreground focus:text-primary transition-colors border-b border-transparent focus:border-primary/20 pb-1"
                        value={room.name}
                        onChange={(e) => {
                           setRooms(rooms.map(r => r.id === room.id ? {...r, name: e.target.value} : r))
                        }}
                      />
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 justify-between items-center">
                      <span className="text-xs text-muted-foreground">{room.devices.length} Devices</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => deleteRoom(room.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                <Button 
                  variant="outline" 
                  className="h-32 border-dashed border-border rounded-xl flex flex-col gap-2 hover:border-primary hover:text-primary-ink hover:bg-primary/5 transition-all text-muted-foreground"
                  onClick={addRoom}
                >
                  <Plus className="h-6 w-6" />
                  <span>Add Room</span>
                </Button>
              </div>
              <div className="flex justify-end">
                <Button size="lg" onClick={() => setStep(3)} className="rounded-full">
                  Next: Add Devices <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              <div className="lg:col-span-3 space-y-4">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">Select Room</p>
                {rooms.map((room) => (
                  <Button
                    key={room.id}
                    variant={activeRoomId === room.id ? "default" : "ghost"}
                    className={`w-full justify-start rounded-xl py-6 border border-border ${activeRoomId === room.id ? 'bg-foreground text-background hover:bg-foreground/90 hover:text-background' : 'text-foreground hover:bg-secondary'}`}
                    onClick={() => setActiveRoomId(room.id)}
                  >
                    <div className="flex flex-col items-start gap-0.5">
                      <span className="font-bold">{room.name}</span>
                      <span className="text-[10px] opacity-70">{room.devices.length} items added</span>
                    </div>
                  </Button>
                ))}
              </div>

              <div className="lg:col-span-6">
                <Tabs defaultValue="lighting" className="w-full">
                  <TabsList className="grid grid-cols-4 h-12 bg-card border border-border rounded-xl mb-6 p-1">
                    <TabsTrigger value="lighting" className="rounded-lg text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-black font-bold">Lighting</TabsTrigger>
                    <TabsTrigger value="security" className="rounded-lg text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-black font-bold">Security</TabsTrigger>
                    <TabsTrigger value="climate" className="rounded-lg text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-black font-bold">Climate</TabsTrigger>
                    <TabsTrigger value="entertainment" className="rounded-lg text-muted-foreground data-[state=active]:bg-primary data-[state=active]:text-black font-bold">AV</TabsTrigger>
                  </TabsList>
                  
                  {["lighting", "security", "climate", "entertainment"].map((cat) => (
                    <TabsContent key={cat} value={cat} className="mt-0 outline-none">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {AVAILABLE_DEVICES.filter(d => d.category === cat).map((device) => (
                          <Card key={device.id} className="hover:ring-1 hover:ring-primary/50 transition-all bg-card border-border overflow-hidden">
                            <CardContent className="p-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted border border-border">
                                  <Image src={device.image} alt={device.name} fill className="object-cover" />
                                </div>
                                <div>
                                  <p className="font-bold text-sm text-foreground">{device.name}</p>
                                  <p className="text-xs text-muted-foreground">${device.price}</p>
                                </div>
                              </div>
                              <Button size="icon" variant="outline" className="rounded-lg h-8 w-8 border-border text-foreground hover:bg-primary hover:text-black transition-colors" onClick={() => addDeviceToRoom(device)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              <div className="lg:col-span-3">
                <Card className="rounded-lg border-primary/20 bg-primary/5 sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground font-bold">{activeRoom?.name} Devices</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                    {activeRoom?.devices.length === 0 ? (
                      <div className="text-center py-8">
                        <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">No devices added to this room yet.</p>
                      </div>
                    ) : (
                      activeRoom?.devices.map((d) => (
                        <div key={d.id} className="flex items-center justify-between text-sm bg-card p-2 rounded-lg border border-border">
                          <span className="font-medium text-foreground truncate max-w-[120px]">{d.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">${d.price}</span>
                            <button 
                              onClick={() => removeDeviceFromRoom(activeRoomId, d.id)}
                              className="text-destructive hover:bg-destructive/10 p-1 rounded transition-colors"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                  <CardFooter className="flex-col gap-4 border-t border-border pt-4">
                    <div className="flex justify-between w-full font-bold text-foreground">
                       <span>Room Total</span>
                       <span className="text-primary-ink">${activeRoom?.devices.reduce((acc, d) => acc + d.price, 0)}</span>
                    </div>
                    <Button className="w-full rounded-full" onClick={() => setStep(4)}>
                      Review Order
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-2xl mx-auto space-y-8"
            >
              <div className="text-center space-y-2">
                <Badge variant="outline" className="text-primary-ink border-primary/20 px-3 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold">Summary</Badge>
                <h2 className="text-4xl">Your setup</h2>
              </div>

              <div className="bg-card border p-8 rounded-xl space-y-6">
                <div className="flex justify-between items-center border-b pb-4 border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                        {PROPERTY_TYPES.find(p => p.id === propertyType)?.icon && 
                         (() => {
                            const Icon = PROPERTY_TYPES.find(p => p.id === propertyType)!.icon;
                            return <Icon className="h-6 w-6 text-primary-ink" />
                         })()
                        }
                    </div>
                    <div>
                      <p className="font-bold text-lg text-foreground">{PROPERTY_TYPES.find(p => p.id === propertyType)?.name}</p>
                      <p className="text-sm text-muted-foreground">Installation & Hub Setup Included</p>
                    </div>
                  </div>
                  <span className="font-semibold text-2xl text-foreground">${PROPERTY_TYPES.find(p => p.id === propertyType)?.basePrice}</span>
                </div>

                <div className="space-y-4">
                  {rooms.filter(r => r.devices.length > 0).map(room => (
                    <div key={room.id} className="space-y-2">
                       <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground flex justify-between items-center">
                         {room.name}
                         <span className="text-xs text-muted-foreground font-semibold">${room.devices.reduce((acc, d) => acc + d.price, 0)}</span>
                       </h4>
                       <div className="flex flex-wrap gap-2">
                          {room.devices.map(d => (
                            <Badge key={d.id} variant="secondary" className="font-normal border-none bg-secondary text-muted-foreground">{d.name}</Badge>
                          ))}
                       </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-border flex justify-between items-end">
                   <div>
                     <p className="text-sm text-muted-foreground font-medium">Estimated total</p>
                     <p className="font-display text-5xl leading-none">${totalPrice.toLocaleString()}</p>
                   </div>
                   <Button 
                     size="lg" 
                     className="rounded-lg px-12 h-14 text-lg font-bold"
                     onClick={handleSaveAndRedirect}
                   >
                     Book Consultation
                   </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   { title: "Pro Install", desc: "Expert technicians", icon: Zap },
                   { title: "24/7 Support", desc: "Always here for you", icon: ShieldCheck },
                   { title: "App Access", desc: "Control everywhere", icon: Home },
                 ].map((feat, i) => (
                   <div key={i} className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card">
                     <div className="p-2 bg-secondary rounded-xl">
                       <feat.icon className="h-4 w-4 text-primary-ink" />
                     </div>
                     <div>
                        <p className="font-bold text-xs text-foreground">{feat.title}</p>
                        <p className="text-[10px] text-muted-foreground">{feat.desc}</p>
                     </div>
                   </div>
                 ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-20 flex justify-between items-center">
            {step > 1 && (
                <Button variant="ghost" onClick={() => setStep(step - 1)} className="rounded-full text-foreground hover:bg-secondary">
                    Back
                </Button>
            )}
            <div className="flex-1" />
            {step === 1 && propertyType && (
                 <Button size="lg" onClick={() => setStep(2)} className="rounded-full">
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                 </Button>
            )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
