"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, X, Filter, ShoppingBag, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Sample device data
const sampleDevices = [
  {
    id: 1,
    name: "Smart Thermostat Pro",
    description: "Control your home temperature from anywhere",
    price: 129.99,
    brand: "Ecobee",
    category: "Climate",
    ecosystems: ["HomeKit", "Alexa", "Google Home"],
    image: "/placeholder.svg?height=400&width=400&text=Thermostat",
  },
  {
    id: 2,
    name: "Security Camera 2K",
    description: "HD security with night vision and motion detection",
    price: 89.99,
    brand: "Reolink",
    category: "Security",
    ecosystems: ["Alexa", "Google Home"],
    image: "/placeholder.svg?height=400&width=400&text=Camera",
  },
  {
    id: 3,
    name: "Smart Light Bulb",
    description: "Multicolor LED with voice control",
    price: 24.99,
    brand: "Philips",
    category: "Lighting",
    ecosystems: ["HomeKit", "Alexa", "Google Home", "Matter"],
    image: "/placeholder.svg?height=400&width=400&text=Bulb",
  },
  {
    id: 4,
    name: "Smart Lock Pro",
    description: "Keyless entry with fingerprint and PIN",
    price: 199.99,
    brand: "August",
    category: "Security",
    ecosystems: ["HomeKit", "Alexa"],
    image: "/placeholder.svg?height=400&width=400&text=Lock",
  },
  {
    id: 5,
    name: "Motion Sensor",
    description: "Detect movement and trigger automations",
    price: 39.99,
    brand: "Aqara",
    category: "Sensors",
    ecosystems: ["HomeKit", "Alexa", "Google Home", "Matter"],
    image: "/placeholder.svg?height=400&width=400&text=Sensor",
  },
  {
    id: 6,
    name: "Smart Plug Mini",
    description: "Control any device with scheduling and energy monitoring",
    price: 19.99,
    brand: "TP-Link",
    category: "Power",
    ecosystems: ["Alexa", "Google Home"],
    image: "/placeholder.svg?height=400&width=400&text=Plug",
  },
]

const brands = ["Ecobee", "Reolink", "Philips", "August", "Aqara", "TP-Link"]
const categoriesArr = ["Climate", "Security", "Lighting", "Sensors", "Power"]
const ecosystemsArr = ["HomeKit", "Alexa", "Google Home", "Matter"]

export default function DevicesPage() {
  const [expandedFilter, setExpandedFilter] = useState<string | null>("brand")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedEcosystems, setSelectedEcosystems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const toggleFilter = (filter: string) => {
    setExpandedFilter(expandedFilter === filter ? null : filter)
  }

  const toggleItem = (list: string[], setList: (l: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item))
    } else {
      setList([...list, item])
    }
  }

  const clearAllFilters = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setSelectedEcosystems([])
    setPriceRange([0, 500])
    setSearchQuery("")
  }

  const filteredDevices = sampleDevices.filter((device) => {
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(device.brand)
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(device.category)
    const matchesEcosystem = selectedEcosystems.length === 0 || device.ecosystems.some((eco) => selectedEcosystems.includes(eco))
    const matchesPrice = device.price >= priceRange[0] && device.price <= priceRange[1]
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) || device.brand.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesBrand && matchesCategory && matchesEcosystem && matchesPrice && matchesSearch
  })

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-primary-foreground">
      <SiteHeader />

      <main className="flex-1">
        {/* Simple Page Header */}
        <div className="pt-32 pb-12 border-b border-foreground/5 mb-12">
           <div className="container px-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary">
                       <Sparkles className="h-4 w-4" />
                       <span className="text-[10px] uppercase font-black tracking-widest">CURATED CATALOG</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">DEVICES <span className="text-primary">&</span> HARDWARE</h1>
                 </div>
                 <div className="w-full md:w-96 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search ecosystem..." 
                      className="h-14 pl-12 bg-muted/50 border-none rounded-2xl"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                 </div>
              </div>
           </div>
        </div>

        <section className="container px-4 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Filters Sidebar */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest opacity-50">Filter Options</h3>
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs hover:text-primary">RESET</Button>
              </div>

              <div className="space-y-3">
                {[
                  { id: "brand", label: "Brands", items: brands, state: selectedBrands, setState: setSelectedBrands },
                  { id: "category", label: "Categories", items: categoriesArr, state: selectedCategories, setState: setSelectedCategories },
                  { id: "ecosystem", label: "Ecosystems", items: ecosystemsArr, state: selectedEcosystems, setState: setSelectedEcosystems },
                ].map((sec) => (
                  <div key={sec.id} className="glass rounded-[1.5rem] overflow-hidden">
                    <button
                      className="w-full p-5 flex justify-between items-center text-sm font-bold uppercase tracking-tight"
                      onClick={() => toggleFilter(sec.id)}
                    >
                      {sec.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedFilter === sec.id ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {expandedFilter === sec.id && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="px-5 pb-5 overflow-hidden"
                        >
                          <div className="space-y-3 pt-2">
                            {sec.items.map((item) => (
                              <div key={item} className="flex items-center space-x-3">
                                <Checkbox
                                  id={`${sec.id}-${item}`}
                                  checked={sec.state.includes(item)}
                                  onCheckedChange={() => toggleItem(sec.state, sec.setState, item)}
                                  className="h-5 w-5 rounded-lg border-primary/20 data-[state=checked]:bg-primary"
                                />
                                <Label htmlFor={`${sec.id}-${item}`} className="text-sm cursor-pointer hover:text-primary transition-colors">
                                  {item}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Price Filter */}
                <div className="glass rounded-[1.5rem] p-5 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-tight">Price Range</h3>
                  <div className="space-y-6">
                    <Slider
                      defaultValue={[0, 500]}
                      max={500}
                      step={10}
                      value={priceRange}
                      onValueChange={(v) => setPriceRange(v as [number, number])}
                      className="py-4"
                    />
                    <div className="flex justify-between items-center bg-background/50 p-3 rounded-xl border border-foreground/5">
                      <span className="text-xs font-black tracking-tight">${priceRange[0]}</span>
                      <span className="text-xs opacity-20">—</span>
                      <span className="text-xs font-black tracking-tight">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredDevices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredDevices.map((device) => (
                    <motion.div
                      layout
                      key={device.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Card className="group glass-dark h-full rounded-[2.5rem] border-foreground/5 hover:border-primary/50 transition-all duration-500 overflow-hidden flex flex-col">
                        <div className="aspect-[4/5] relative bg-muted relative overflow-hidden">
                           <Image 
                            src={device.image} 
                            alt={device.name} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                           />
                           <div className="absolute top-4 right-4 flex flex-col gap-2">
                              {device.ecosystems.slice(0, 2).map(eco => (
                                 <Badge key={eco} className="bg-white/10 backdrop-blur-md text-white border-white/10 text-[10px] font-black uppercase tracking-widest">{eco}</Badge>
                              ))}
                           </div>
                        </div>
                        <CardContent className="p-8 flex flex-col flex-1">
                          <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 italic">{device.brand}</div>
                          <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">{device.name}</h3>
                          <p className="text-sm text-muted-foreground mb-8 flex-1 leading-relaxed">{device.description}</p>
                          <div className="flex justify-between items-center pt-6 border-t border-foreground/5">
                            <span className="text-2xl font-black tracking-tighter italic">${device.price}</span>
                            <Button size="icon" className="h-12 w-12 rounded-xl bg-foreground text-background hover:bg-primary hover:text-foreground transition-all">
                              <ShoppingBag className="h-5 w-5" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-96 flex flex-col items-center justify-center text-center space-y-4">
                   <div className="p-6 bg-muted/50 rounded-full">
                      <Search className="h-10 w-10 text-muted-foreground opacity-20" />
                   </div>
                   <h3 className="text-2xl font-bold">No hardware found</h3>
                   <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                   <Button variant="outline" onClick={clearAllFilters} className="rounded-xl mt-4">CLEAR ALL FILTERS</Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}


