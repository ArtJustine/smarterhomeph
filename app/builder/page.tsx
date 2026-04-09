"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
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

// Types
type PropertyType = "condo" | "townhouse" | "house" | "office"
type DeviceCategory = "lighting" | "security" | "climate" | "entertainment"

interface Device {
  id: string
  name: string
  price: number
  category: DeviceCategory
  icon: any
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
  { id: "l1", name: "Smart Bulb White", price: 15, category: "lighting", icon: Lightbulb },
  { id: "l2", name: "Smart RGB Strip", price: 45, category: "lighting", icon: Sparkles },
  { id: "s1", name: "Indoor Camera", price: 89, category: "security", icon: ShieldCheck },
  { id: "s2", name: "Smart Lock", price: 199, category: "security", icon: Zap },
  { id: "c1", name: "Smart Thermostat", price: 149, category: "climate", icon: Thermometer },
  { id: "e1", name: "Smart Speaker", price: 59, category: "entertainment", icon: Music },
  { id: "e2", name: "TV Controller", price: 35, category: "entertainment", icon: Tv },
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

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <SiteHeader />
      
      <main className="flex-1 container py-8 mt-16 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
              Home Builder
            </h1>
            <p className="text-muted-foreground mt-2">Design your dream smart home in 4 easy steps.</p>
          </div>
          <div className="flex items-center gap-6 glass p-6 rounded-2xl">
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Estimated Total</p>
              <p className="text-3xl font-bold text-primary">${totalPrice.toLocaleString()}</p>
            </div>
            <Link href="/contact">
              <Button size="lg" className="rounded-xl shadow-lg shadow-primary/20" disabled={step < 3}>
                Save Config <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-12">
            <div className="flex justify-between mb-4">
                {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                            {s}
                        </div>
                        <span className={`text-[10px] uppercase font-bold tracking-widest ${step >= s ? 'text-primary' : 'text-muted-foreground'}`}>
                            {s === 1 ? 'Property' : s === 2 ? 'Rooms' : s === 3 ? 'Devices' : 'Review'}
                        </span>
                    </div>
                ))}
            </div>
            <Progress value={(step / 4) * 100} className="h-1" />
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
                  className={`relative overflow-hidden cursor-pointer transition-all hover:ring-2 hover:ring-primary/50 ${propertyType === type.id ? 'ring-2 ring-primary bg-primary/5' : ''}`}
                  onClick={() => {
                    setPropertyType(type.id as PropertyType)
                    setStep(2)
                  }}
                >
                  <CardHeader className="pb-4">
                    <type.icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle>{type.name}</CardTitle>
                    <CardDescription>Starting from ${type.basePrice}</CardDescription>
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
                  <Card key={room.id} className="group relative">
                    <CardHeader className="p-4">
                      <input 
                        className="bg-transparent font-bold text-lg outline-none focus:text-primary transition-colors"
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
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                        onClick={() => deleteRoom(room.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                <Button 
                  variant="outline" 
                  className="h-32 border-dashed rounded-xl flex flex-col gap-2 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
                  onClick={addRoom}
                >
                  <Plus className="h-6 w-6" />
                  <span>Add Room</span>
                </Button>
              </div>
              <div className="flex justify-end">
                <Button size="lg" onClick={() => setStep(3)} className="rounded-xl">
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
                    className="w-full justify-start rounded-xl py-6"
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
                  <TabsList className="grid grid-cols-4 h-12 rounded-xl mb-6">
                    <TabsTrigger value="lighting" className="rounded-lg">Lighting</TabsTrigger>
                    <TabsTrigger value="security" className="rounded-lg">Security</TabsTrigger>
                    <TabsTrigger value="climate" className="rounded-lg">Climate</TabsTrigger>
                    <TabsTrigger value="entertainment" className="rounded-lg">AV</TabsTrigger>
                  </TabsList>
                  
                  {["lighting", "security", "climate", "entertainment"].map((cat) => (
                    <TabsContent key={cat} value={cat} className="mt-0">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {AVAILABLE_DEVICES.filter(d => d.category === cat).map((device) => (
                          <Card key={device.id} className="hover:ring-1 hover:ring-primary/50 transition-all">
                            <CardContent className="p-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                  <device.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <p className="font-bold text-sm">{device.name}</p>
                                  <p className="text-xs text-muted-foreground">${device.price}</p>
                                </div>
                              </div>
                              <Button size="icon" variant="outline" className="rounded-lg" onClick={() => addDeviceToRoom(device)}>
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
                <Card className="rounded-2xl border-primary/20 bg-primary/5 sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-lg">{activeRoom?.name} Devices</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {activeRoom?.devices.length === 0 ? (
                      <div className="text-center py-8">
                        <Plus className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">No devices added to this room yet.</p>
                      </div>
                    ) : (
                      activeRoom?.devices.map((d) => (
                        <div key={d.id} className="flex items-center justify-between text-sm bg-background/50 p-2 rounded-lg border border-border/50">
                          <span className="font-medium truncate max-w-[120px]">{d.name}</span>
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
                  <CardFooter className="flex-col gap-4 border-t pt-4">
                    <div className="flex justify-between w-full font-bold">
                       <span>Room Total</span>
                       <span>${activeRoom?.devices.reduce((acc, d) => acc + d.price, 0)}</span>
                    </div>
                    <Button className="w-full rounded-xl" onClick={() => setStep(4)}>
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
                <Badge variant="outline" className="text-primary border-primary/20 px-3 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold">Summary</Badge>
                <h2 className="text-3xl font-bold">Your Smart System Configuration</h2>
              </div>

              <div className="glass p-8 rounded-3xl space-y-6">
                <div className="flex justify-between items-center border-b pb-4 border-foreground/10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                        {PROPERTY_TYPES.find(p => p.id === propertyType)?.icon && 
                         (() => {
                            const Icon = PROPERTY_TYPES.find(p => p.id === propertyType)!.icon;
                            return <Icon className="h-6 w-6 text-primary" />
                         })()
                        }
                    </div>
                    <div>
                      <p className="font-bold text-lg">{PROPERTY_TYPES.find(p => p.id === propertyType)?.name}</p>
                      <p className="text-sm text-muted-foreground italic">Installation & Hub Setup Included</p>
                    </div>
                  </div>
                  <span className="font-bold text-xl">${PROPERTY_TYPES.find(p => p.id === propertyType)?.basePrice}</span>
                </div>

                <div className="space-y-4">
                  {rooms.filter(r => r.devices.length > 0).map(room => (
                    <div key={room.id} className="space-y-2">
                       <h4 className="font-bold text-sm uppercase tracking-wider opacity-60 flex justify-between items-center">
                         {room.name}
                         <span className="text-xs">${room.devices.reduce((acc, d) => acc + d.price, 0)}</span>
                       </h4>
                       <div className="flex flex-wrap gap-2">
                         {room.devices.map(d => (
                           <Badge key={d.id} variant="secondary" className="font-normal border-none bg-background/30">{d.name}</Badge>
                         ))}
                       </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-foreground/10 flex justify-between items-end">
                   <div>
                     <p className="text-sm text-muted-foreground font-medium">Final Investment</p>
                     <p className="text-4xl font-black text-primary tracking-tighter">${totalPrice.toLocaleString()}</p>
                   </div>
                   <Link href="/contact">
                     <Button size="lg" className="rounded-2xl px-12 h-14 text-lg font-bold shadow-2xl shadow-primary/30">
                       Book Consultation
                     </Button>
                   </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {[
                   { title: "Pro Install", desc: "Expert technicians", icon: Zap },
                   { title: "24/7 Support", desc: "Always here for you", icon: ShieldCheck },
                   { title: "App Access", desc: "Control everywhere", icon: Home },
                 ].map((feat, i) => (
                   <div key={i} className="flex items-center gap-3 p-4 rounded-2xl border border-divider">
                     <div className="p-2 bg-muted rounded-xl">
                       <feat.icon className="h-4 w-4 text-muted-foreground" />
                     </div>
                     <div>
                        <p className="font-bold text-xs">{feat.title}</p>
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
                <Button variant="ghost" onClick={() => setStep(step - 1)} className="rounded-xl">
                    Back
                </Button>
            )}
            <div className="flex-1" />
            {step === 1 && propertyType && (
                 <Button size="lg" onClick={() => setStep(2)} className="rounded-xl">
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                 </Button>
            )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
