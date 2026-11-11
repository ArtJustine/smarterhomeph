"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, X, Filter, ShoppingBag, Search, Sparkles, SlidersHorizontal, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { BrandLogo } from "@/components/brand-logo"
import { sampleDevices } from "@/lib/devices-data"


const brands = ["Ecobee", "Reolink", "Philips", "August", "Aqara", "TP-Link"]
const categoriesArr = ["Climate", "Security", "Lighting", "Sensors", "Power"]
const ecosystemsArr = ["HomeKit", "Alexa", "Google Home", "Matter"]

function DevicesCatalogContent() {
  const searchParams = useSearchParams()
  const [expandedFilter, setExpandedFilter] = useState<string | null>("brand")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedEcosystems, setSelectedEcosystems] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [quickViewDevice, setQuickViewDevice] = useState<typeof sampleDevices[0] | null>(null)

  // Read URL query parameter for pre-filtering category
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam && categoriesArr.includes(categoryParam)) {
      setSelectedCategories([categoryParam])
    }
    const ecosystemParam = searchParams.get("ecosystem")
    if (ecosystemParam && ecosystemsArr.includes(ecosystemParam)) {
      setSelectedEcosystems([ecosystemParam])
    }
  }, [searchParams])

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
    setSortBy("featured")
  }

  const filteredDevices = useMemo(() => {
    return sampleDevices.filter((device) => {
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(device.brand)
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(device.category)
      const matchesEcosystem = selectedEcosystems.length === 0 || device.ecosystems.some((eco) => selectedEcosystems.includes(eco))
      const matchesPrice = device.price >= priceRange[0] && device.price <= priceRange[1]
      const matchesSearch = 
        device.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        device.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.ecosystems.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesBrand && matchesCategory && matchesEcosystem && matchesPrice && matchesSearch
    })
  }, [selectedBrands, selectedCategories, selectedEcosystems, priceRange, searchQuery])

  const sortedDevices = useMemo(() => {
    const result = [...filteredDevices]
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "brand-asc") {
      result.sort((a, b) => a.brand.localeCompare(b.brand))
    }
    return result
  }, [filteredDevices, sortBy])

  return (
    <div className="flex min-h-screen flex-col bg-background ">
      <SiteHeader />

      <main className="flex-1">
        {/* Simple Page Header */}
        <div className="mb-12 border-b pb-10 pt-14 md:pt-20">
           <div className="container px-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                 <div className="space-y-2">
                    <p className="eyebrow">Catalog</p>
                    <h1 className="text-5xl leading-none sm:text-6xl lg:text-7xl">Smart home devices we <span className="italic text-primary-ink">install.</span></h1>
                 </div>
                 
                 <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    {/* Search Field */}
                    <div className="relative w-full sm:w-80">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <Input 
                         placeholder="Search brand, type or Alexa, HomeKit..." 
                         className="h-12 pl-12 bg-card border rounded-full"
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                       />
                    </div>
                    
                    {/* Sort Selector */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="h-12 bg-card border rounded-full w-full sm:w-56 text-sm text-foreground">
                        <SlidersHorizontal className="h-4 w-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border border-border text-foreground rounded-xl">
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="name-asc">Name: A to Z</SelectItem>
                        <SelectItem value="brand-asc">Brand: A to Z</SelectItem>
                      </SelectContent>
                    </Select>
                 </div>
              </div>
           </div>
        </div>

        <section className="container px-4 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Filters Sidebar */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Filter</p>
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs hover:text-primary-ink">Reset</Button>
              </div>

              <div className="space-y-3">
                {[
                  { id: "brand", label: "Brands", items: brands, state: selectedBrands, setState: setSelectedBrands },
                  { id: "category", label: "Categories", items: categoriesArr, state: selectedCategories, setState: setSelectedCategories },
                  { id: "ecosystem", label: "Ecosystems", items: ecosystemsArr, state: selectedEcosystems, setState: setSelectedEcosystems },
                ].map((sec) => (
                  <div key={sec.id} className="bg-card border rounded-xl overflow-hidden">
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
                                <Label htmlFor={`${sec.id}-${item}`} className="text-sm cursor-pointer hover:text-primary-ink transition-colors">
                                  {sec.id === "brand" ? <BrandLogo name={item} heightClass="h-4" className="text-base" /> : item}
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
                <div className="bg-card border rounded-xl p-5 space-y-4">
                  <h3 className="text-sm   tracking-tight">Price Range</h3>
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
                      <span className="text-xs font-semibold tracking-tight">${priceRange[0]}</span>
                      <span className="text-xs opacity-20">—</span>
                      <span className="text-xs font-semibold tracking-tight">${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {sortedDevices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {sortedDevices.map((device) => (
                    <motion.div
                      layout
                      key={device.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Card className="group bg-card border h-full rounded-xl border-foreground/5 hover:border-primary/50 transition-all duration-500 overflow-hidden flex flex-col">
                        <div className="aspect-[4/5] relative bg-muted overflow-hidden">
                           <Image 
                            src={device.image} 
                            alt={device.name} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                           />
                           
                           {/* Quick View Button overlay on hover */}
                           <div className="absolute inset-0 bg-card opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                             <Button 
                               onClick={() => setQuickViewDevice(device)} 
                               variant="outline" 
                               className="rounded-full border-border text-foreground bg-card hover:bg-primary hover:text-primary-foreground transition-all gap-2"
                             >
                               <Eye className="h-4 w-4" /> Quick View
                             </Button>
                           </div>

                           <div className="absolute top-4 right-4 flex flex-col gap-2">
                              {device.ecosystems.slice(0, 2).map(eco => (
                                 <Badge key={eco} className="bg-secondary  text-foreground border-border text-[10px] font-semibold uppercase tracking-widest">{eco}</Badge>
                              ))}
                           </div>
                        </div>
                        
                        <CardContent className="p-8 flex flex-col flex-1">
                          <div className="mb-3 flex h-6 items-center"><BrandLogo name={device.brand} heightClass="h-5" /></div>
                          <h3 className="text-xl  tracking-tight mb-2 group-hover:text-primary-ink transition-colors">{device.name}</h3>
                          <p className="text-sm text-muted-foreground mb-8 flex-1 leading-relaxed">{device.description}</p>
                          <div className="flex justify-between items-center pt-6 border-t border-foreground/5">
                            <span className="text-2xl font-semibold tracking-tight">${device.price}</span>
                            <div className="flex gap-2">
                              <Link href="/builder">
                                <Button size="sm" variant="outline" className="h-12 rounded-xl text-xs font-bold border-foreground/10 hover:bg-primary/10">
                                  BUILDER
                                </Button>
                              </Link>
                              <Link href="/contact">
                                <Button size="icon" className="h-12 w-12 rounded-xl bg-foreground text-background hover:bg-primary hover:text-foreground transition-all">
                                  <ShoppingBag className="h-5 w-5" />
                                </Button>
                              </Link>
                            </div>
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
                   <h3 className="text-2xl ">No hardware found</h3>
                   <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
                   <Button variant="outline" onClick={clearAllFilters} className="rounded-xl mt-4">Clear all filters</Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Quick View Modal */}
      <Dialog open={!!quickViewDevice} onOpenChange={(open) => !open && setQuickViewDevice(null)}>
        <DialogContent className="bg-card border border-primary/20 text-foreground rounded-xl max-w-2xl overflow-hidden p-0">
          {quickViewDevice && (
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[4/5] md:aspect-auto md:h-full bg-muted min-h-[300px]">
                <Image src={quickViewDevice.image} alt={quickViewDevice.name} fill className="object-cover" />
              </div>
              <div className="p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <div className="mb-3 flex h-7 items-center"><BrandLogo name={quickViewDevice.brand} heightClass="h-6" /></div>
                    <h2 className="text-3xl  tracking-tight  leading-tight">{quickViewDevice.name}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{quickViewDevice.description}</p>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary-ink">Key Specifications:</p>
                    <ul className="grid grid-cols-1 gap-1 text-xs text-muted-foreground">
                      {quickViewDevice.specs?.map((spec, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="h-1 w-1 bg-primary rounded-full" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-border">
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Price</span>
                    <span className="text-3xl font-semibold">${quickViewDevice.price}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/builder" className="w-full">
                      <Button onClick={() => setQuickViewDevice(null)} className="w-full h-12 rounded-xl font-bold">
                        ADD TO BUILDER
                      </Button>
                    </Link>
                    <Button variant="outline" onClick={() => setQuickViewDevice(null)} className="h-12 rounded-xl border-border text-foreground hover:bg-secondary font-bold">
                      CLOSE
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  )
}

export default function DevicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col justify-between ">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center text-foreground">
          <div className="text-center space-y-4">
            <Sparkles className="h-8 w-8 text-primary-ink animate-pulse mx-auto" />
            <p className="eyebrow">Loading catalog...</p>
          </div>
        </div>
        <SiteFooter />
      </div>
    }>
      <DevicesCatalogContent />
    </Suspense>
  )
}
