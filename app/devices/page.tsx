"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

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
    image: "/placeholder.svg?height=300&width=300&text=Thermostat",
  },
  {
    id: 2,
    name: "Security Camera 2K",
    description: "HD security with night vision and motion detection",
    price: 89.99,
    brand: "Reolink",
    category: "Security",
    ecosystems: ["Alexa", "Google Home"],
    image: "/placeholder.svg?height=300&width=300&text=Camera",
  },
  {
    id: 3,
    name: "Smart Light Bulb",
    description: "Multicolor LED with voice control",
    price: 24.99,
    brand: "Philips",
    category: "Lighting",
    ecosystems: ["HomeKit", "Alexa", "Google Home", "Matter"],
    image: "/placeholder.svg?height=300&width=300&text=Bulb",
  },
  {
    id: 4,
    name: "Smart Lock Pro",
    description: "Keyless entry with fingerprint and PIN",
    price: 199.99,
    brand: "August",
    category: "Security",
    ecosystems: ["HomeKit", "Alexa"],
    image: "/placeholder.svg?height=300&width=300&text=Lock",
  },
  {
    id: 5,
    name: "Motion Sensor",
    description: "Detect movement and trigger automations",
    price: 39.99,
    brand: "Aqara",
    category: "Sensors",
    ecosystems: ["HomeKit", "Alexa", "Google Home", "Matter"],
    image: "/placeholder.svg?height=300&width=300&text=Sensor",
  },
  {
    id: 6,
    name: "Smart Plug Mini",
    description: "Control any device with scheduling and energy monitoring",
    price: 19.99,
    brand: "TP-Link",
    category: "Power",
    ecosystems: ["Alexa", "Google Home"],
    image: "/placeholder.svg?height=300&width=300&text=Plug",
  },
]

// Filter options
const brands = ["Ecobee", "Reolink", "Philips", "August", "Aqara", "TP-Link"]
const categories = ["Climate", "Security", "Lighting", "Sensors", "Power"]
const ecosystems = ["HomeKit", "Alexa", "Google Home", "Matter"]
const priceRanges = [
  { min: 0, max: 50, label: "Under $50" },
  { min: 50, max: 100, label: "$50 - $100" },
  { min: 100, max: 200, label: "$100 - $200" },
  { min: 200, max: 1000, label: "$200+" },
]

export default function DevicesPage() {
  const [expandedFilter, setExpandedFilter] = useState<string | null>("brand")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedEcosystems, setSelectedEcosystems] = useState<string[]>([])
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const toggleFilter = (filter: string) => {
    if (expandedFilter === filter) {
      setExpandedFilter(null)
    } else {
      setExpandedFilter(filter)
    }
  }

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
      setActiveFilters(activeFilters.filter((f) => f !== `Brand: ${brand}`))
    } else {
      setSelectedBrands([...selectedBrands, brand])
      setActiveFilters([...activeFilters, `Brand: ${brand}`])
    }
  }

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
      setActiveFilters(activeFilters.filter((f) => f !== `Category: ${category}`))
    } else {
      setSelectedCategories([...selectedCategories, category])
      setActiveFilters([...activeFilters, `Category: ${category}`])
    }
  }

  const toggleEcosystem = (ecosystem: string) => {
    if (selectedEcosystems.includes(ecosystem)) {
      setSelectedEcosystems(selectedEcosystems.filter((e) => e !== ecosystem))
      setActiveFilters(activeFilters.filter((f) => f !== `Ecosystem: ${ecosystem}`))
    } else {
      setSelectedEcosystems([...selectedEcosystems, ecosystem])
      setActiveFilters([...activeFilters, `Ecosystem: ${ecosystem}`])
    }
  }

  const handlePriceChange = (value: number[]) => {
    const [min, max] = value
    setPriceRange([min, max])

    // Update active filters for price
    const existingPriceFilter = activeFilters.find((f) => f.startsWith("Price:"))
    if (existingPriceFilter) {
      setActiveFilters(activeFilters.filter((f) => !f.startsWith("Price:")))
    }

    setActiveFilters([...activeFilters.filter((f) => !f.startsWith("Price:")), `Price: $${min} - $${max}`])
  }

  const removeFilter = (filter: string) => {
    if (filter.startsWith("Brand:")) {
      const brand = filter.replace("Brand: ", "")
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    } else if (filter.startsWith("Category:")) {
      const category = filter.replace("Category: ", "")
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else if (filter.startsWith("Ecosystem:")) {
      const ecosystem = filter.replace("Ecosystem: ", "")
      setSelectedEcosystems(selectedEcosystems.filter((e) => e !== ecosystem))
    } else if (filter.startsWith("Price:")) {
      setPriceRange([0, 200])
    }

    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  const clearAllFilters = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setSelectedEcosystems([])
    setPriceRange([0, 200])
    setActiveFilters([])
  }

  // Filter devices based on selected filters
  const filteredDevices = sampleDevices.filter((device) => {
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(device.brand)
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(device.category)
    const matchesEcosystem =
      selectedEcosystems.length === 0 || device.ecosystems.some((eco) => selectedEcosystems.includes(eco))
    const matchesPrice = device.price >= priceRange[0] && device.price <= priceRange[1]

    return matchesBrand && matchesCategory && matchesEcosystem && matchesPrice
  })

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <PageHeader
          title="ALL DEVICES"
          backgroundImage="/placeholder.svg?height=500&width=1200"
          alt="Modern living room with smart home features"
        />

        <section className="container py-8 md:py-12">
          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Active Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-sm">
                  Clear All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter) => (
                  <Badge key={filter} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                    {filter}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeFilter(filter)} />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="space-y-2">
              <div
                className="p-4 bg-gray-50 rounded-md flex justify-between items-center cursor-pointer"
                onClick={() => toggleFilter("brand")}
              >
                <h3 className="font-medium">Search By Brand</h3>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${expandedFilter === "brand" ? "rotate-180" : ""}`}
                />
              </div>

              {expandedFilter === "brand" && (
                <div className="p-4 bg-white border rounded-md">
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div
                className="p-4 bg-gray-50 rounded-md flex justify-between items-center cursor-pointer"
                onClick={() => toggleFilter("category")}
              >
                <h3 className="font-medium">Search By Category</h3>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${expandedFilter === "category" ? "rotate-180" : ""}`}
                />
              </div>

              {expandedFilter === "category" && (
                <div className="p-4 bg-white border rounded-md">
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div
                className="p-4 bg-gray-50 rounded-md flex justify-between items-center cursor-pointer"
                onClick={() => toggleFilter("price")}
              >
                <h3 className="font-medium">Search By Price</h3>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${expandedFilter === "price" ? "rotate-180" : ""}`}
                />
              </div>

              {expandedFilter === "price" && (
                <div className="p-4 bg-white border rounded-md">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">${priceRange[0]}</span>
                        <span className="text-sm">${priceRange[1]}</span>
                      </div>
                      <Slider
                        defaultValue={[0, 200]}
                        max={200}
                        step={10}
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        className="my-4"
                      />
                    </div>
                    <div className="space-y-2">
                      {priceRanges.map((range, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox
                            id={`price-${index}`}
                            checked={priceRange[0] === range.min && priceRange[1] === range.max}
                            checked={priceRange[0] === range.min && priceRange[1] === range.max}
                            onCheckedChange={() => handlePriceChange([range.min, range.max])}
                          />
                          <Label htmlFor={`price-${index}`} className="text-sm cursor-pointer">
                            {range.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div
                className="p-4 bg-gray-50 rounded-md flex justify-between items-center cursor-pointer"
                onClick={() => toggleFilter("ecosystem")}
              >
                <h3 className="font-medium">Search By Ecosystem</h3>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${expandedFilter === "ecosystem" ? "rotate-180" : ""}`}
                />
              </div>

              {expandedFilter === "ecosystem" && (
                <div className="p-4 bg-white border rounded-md">
                  <div className="space-y-2">
                    {ecosystems.map((ecosystem) => (
                      <div key={ecosystem} className="flex items-center space-x-2">
                        <Checkbox
                          id={`ecosystem-${ecosystem}`}
                          checked={selectedEcosystems.includes(ecosystem)}
                          onCheckedChange={() => toggleEcosystem(ecosystem)}
                        />
                        <Label htmlFor={`ecosystem-${ecosystem}`} className="text-sm cursor-pointer">
                          {ecosystem}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Product Cards */}
              {filteredDevices.length > 0 ? (
                filteredDevices.map((device) => (
                  <Card key={device.id} className="overflow-hidden">
                    <div className="aspect-square relative bg-gray-100">
                      <Image src={device.image || "/placeholder.svg"} alt={device.name} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">{device.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{device.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {device.ecosystems.map((eco) => (
                          <Badge key={eco} variant="outline" className="text-xs">
                            {eco}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">${device.price.toFixed(2)}</span>
                        <Button variant="outline" size="sm" className="rounded-full">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="md:col-span-3 flex flex-col items-center justify-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">No devices match your current filters</p>
                  <Button variant="outline" onClick={clearAllFilters}>
                    Clear All Filters
                  </Button>
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

