"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("smarter-home")

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <PageHeader
          title="SERVICES"
          backgroundImage="/placeholder.svg?height=500&width=1200"
          alt="Modern kitchen with smart home features"
        />

        {/* Service Tabs */}
        <section className="container py-8">
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full bg-gray-100 p-1">
              <Button
                variant={activeTab === "diy" ? "secondary" : "ghost"}
                className={`rounded-full ${activeTab === "diy" ? "" : "hover:bg-gray-200"}`}
                onClick={() => setActiveTab("diy")}
              >
                Do-It-Yourself
              </Button>
              <Button
                variant={activeTab === "smarter-home" ? "secondary" : "ghost"}
                className={`rounded-full ${activeTab === "smarter-home" ? "bg-green-200 text-green-800 hover:bg-green-300 hover:text-green-900" : "hover:bg-gray-200"}`}
                onClick={() => setActiveTab("smarter-home")}
              >
                Smarter Home
              </Button>
              <Button
                variant={activeTab === "consultation" ? "secondary" : "ghost"}
                className={`rounded-full ${activeTab === "consultation" ? "" : "hover:bg-gray-200"}`}
                onClick={() => setActiveTab("consultation")}
              >
                Consultation
              </Button>
            </div>
          </div>

          {/* Service Content */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Smarter Home</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Get the device you need whenever you need it. Browse a wide variety of devices we offer, set it up, and
              expand your smart home arsenal
            </p>
          </div>

          {/* Service Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCategory title="Lighting" description="Smart lighting solutions for every room in your home" />
            <ServiceCategory title="Security" description="Keep your home safe with advanced security devices" />
            <ServiceCategory
              title="Climate"
              description="Control temperature and air quality with smart climate devices"
            />
            <ServiceCategory title="Automation" description="Automate routines and tasks throughout your home" />
            <ServiceCategory
              title="Entertainment"
              description="Enhance your entertainment experience with smart devices"
            />
            <ServiceCategory
              title="Appliances"
              description="Upgrade your home with smart appliances for modern living"
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

interface ServiceCategoryProps {
  title: string
  description: string
}

function ServiceCategory({ title, description }: ServiceCategoryProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative bg-gray-100">
        <Image src="/placeholder.svg?height=300&width=300" alt={title} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button variant="outline" className="w-full rounded-full">
          Learn More
        </Button>
      </CardContent>
    </Card>
  )
}

