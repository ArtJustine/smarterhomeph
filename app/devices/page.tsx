"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"

export default function DevicesPage() {
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null)
  
  const toggleFilter = (filter: string) => {
    if (expandedFilter === filter) {
      setExpandedFilter(null)
    } else {
      setExpandedFilter(filter)
    }
  }
  
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="space-y-2">
              <div 
                className="p-4 bg-gray-50 rounded-md flex justify-between items-center cursor-pointer"
                onClick={() => toggleFilter('brand')}
              >
                <h3 className="font-medium">Search By Brand</h3>
                <ChevronDown className={`h-5 w-5 transition-transform ${expandedFilter === 'brand' ? 'rotate-180' : ''}`} />
              </div>
              
              <div 
                className="p-4 bg-gray-50 rounded-md flex justify-between items-center cursor-pointer"
                onClick={() => toggleFilter('category')}
              >
                <h3 className="font-medium">Search By Category</h3>
                <ChevronDown className={`h-5 w-5 transition-transform ${expandedFilter === 'category' ? 'rotate-180' : ''}`} />
              </div>
              
              <div 
                className="p-4 bg-gray-50 rounded-md flex justify-between items-center cursor-pointer"
                onClick={() => toggleFilter('price')}
              >
                <h3 className="font-medium">Search By Price</h3>
                <ChevronDown className={`h-5 w-5 transition-transform ${expandedFilter === 'price' ? 'rotate-180' : ''}`} />
              </div>
              
              <div 
                className="p-4 bg-gray-50 rounded-md flex justify-between items-center cursor-pointer"
                onClick={() => toggleFilter('room')}
              >
                <h3 className="font-medium">Search By Room</h3>
                <ChevronDown className={`h-5 w-5 transition-transform ${expandedFilter === 'room' ? 'rotate-180' : ''}`} />
              </div>
              
              <div 
                className="p-4 bg-gray-50 rounded-md flex justify-between items-center cursor-pointer"
                onClick={() => toggleFilter('zone')}
              >
                <h3 className="font-medium">Search By Zone</h3>
                <ChevronDown className={`h-5 w-5 transition-transform ${expandedFilter === 'zone' ? 'rotate-180' : ''}`} />
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Product Cards */}
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-square relative bg-gray-100">
                    <Image 
                      src="/placeholder.svg?height=300&width=300" 
                      alt="Smart device" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1">Smart Device {index + 1}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Control your home with ease
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">${(49.99 + index * 10).toFixed(2)}</span>
                      <Button variant="outline" size="sm" className="rounded-full">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <SiteFooter />
    </div>
  )
}
