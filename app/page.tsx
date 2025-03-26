"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  const [activeRoom, setActiveRoom] = useState("living-room")
  const featuresRef = useRef<HTMLDivElement>(null)
  const [isFeatureVisible, setIsFeatureVisible] = useState(false)

  // Room images mapping
  const roomImages = {
    "living-room": "/HeroImage.svg?height=500&width=1200",
    kitchen: "/kitchenImage.svg?height=500&width=1200&text=Kitchen",
    bedroom: "/bedroomImage.svg?height=500&width=1200&text=Bedroom",
    bathroom: "/bathroomImage.svg?height=500&width=1200&text=Bathroom",
  }

  // Room alt text mapping
  const roomAltText = {
    "living-room": "Modern living room with smart home features",
    kitchen: "Smart kitchen with connected appliances",
    bedroom: "Bedroom with smart lighting and climate control",
    bathroom: "Bathroom with smart fixtures and automation",
  }

  // Set up intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsFeatureVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (featuresRef.current) {
      observer.observe(featuresRef.current)
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current)
      }
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with integrated header */}
        <section className="relative">
          <div className="relative h-[350px] sm:h-[450px] md:h-[550px] w-full">
            <Image
              src={roomImages[activeRoom as keyof typeof roomImages] || "/placeholder.svg"}
              alt={roomAltText[activeRoom as keyof typeof roomAltText]}
              fill
              className="object-cover brightness-95"
              priority
            />
            <div className="absolute inset-0 bg-black/5" />
            <SiteHeader />
          </div>

          {/* Room Category Buttons */}
          <div className="container relative -mt-10 sm:-mt-16 flex justify-center">
            <div className="flex flex-wrap gap-2 justify-center px-6 mb-6">
              <Button
                variant={activeRoom === "living-room" ? "secondary" : "outline"}
                className="rounded-full bg-white/90 hover:bg-white text-xs sm:text-sm"
                onClick={() => setActiveRoom("living-room")}
              >
                Living Room
              </Button>
              <Button
                variant={activeRoom === "kitchen" ? "secondary" : "outline"}
                className="rounded-full bg-white/90 hover:bg-white text-xs sm:text-sm"
                onClick={() => setActiveRoom("kitchen")}
              >
                Kitchen
              </Button>
              <Button
                variant={activeRoom === "bedroom" ? "secondary" : "outline"}
                className="rounded-full bg-white/90 hover:bg-white text-xs sm:text-sm"
                onClick={() => setActiveRoom("bedroom")}
              >
                Bedroom
              </Button>
              <Button
                variant={activeRoom === "bathroom" ? "secondary" : "outline"}
                className="rounded-full bg-white/90 hover:bg-white text-xs sm:text-sm"
                onClick={() => setActiveRoom("bathroom")}
              >
                Bathroom
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-8 md:py-12 text-center">
          <Button className="rounded-full bg-green-200 text-green-800 hover:bg-green-300 hover:text-green-900 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-medium">
            GET YOUR FREE QUOTE!
          </Button>

          <div className="mt-8 md:mt-12">
            <p className="text-center text-muted-foreground mb-6 md:mb-8 px-4">
              Partnered with Trusted Brands to Bring You Seamless Smart Home Integrations.
            </p>
            <div className="overflow-hidden">
              <div className="flex items-center gap-6 md:gap-8 lg:gap-12 animate-marquee">
                <Image
                  src="/aqara-logo 1.svg?height=30&width=80"
                  alt="Aqara"
                  width={80}
                  height={30}
                  className="w-16 sm:w-20 md:w-24"
                />
                <Image
                  src="/Govee-Logo 1.svg?height=30&width=80"
                  alt="Govee"
                  width={80}
                  height={30}
                  className="w-16 sm:w-20 md:w-24"
                />
                <Image
                  src="/eve.svg?height=30&width=80"
                  alt="Eve"
                  width={80}
                  height={30}
                  className="w-16 sm:w-20 md:w-24"
                />
                <Image
                  src="/reolink.svg?height=30&width=80"
                  alt="Reolink"
                  width={80}
                  height={30}
                  className="w-16 sm:w-20 md:w-24"
                />
                <Image
                  src="/abode.svg?height=30&width=80"
                  alt="Abode"
                  width={80}
                  height={30}
                  className="w-16 sm:w-20 md:w-24"
                />
                <Image
                  src="/yolink.svg?height=30&width=80"
                  alt="YoLink"
                  width={80}
                  height={30}
                  className="w-16 sm:w-20 md:w-24"
                />
                {/* Duplicate logos for continuous animation */}
                <Image
                  src="/aqara-logo 1.svg?height=30&width=80"
                  alt="Aqara"
                  width={80}
                  height={30}
                  className="w-16 sm:w-20 md:w-24"
                />
                <Image
                  src="/Govee-Logo 1.svg?height=30&width=80"
                  alt="Govee"
                  width={80}
                  height={30}
                  className="w-16 sm:w-20 md:w-24"
                />
                <Image
                  src="/eve.svg?height=30&width=80"
                  alt="Eve"
                  width={80}
                  height={30}
                  className="w-16 sm:w-20 md:w-24"
                />
                <Image
                  src="/reolink.svg?height=30&width=80"
                  alt="Reolink"
                  width={80}
                  height={30}
                  className="w-16 sm:w-20 md:w-24"
                />
                <Image
                  src="/abode.svg?height=30&width=80"
                  alt="Abode"
                  width={80}
                  height={30}
                  className="w-16 sm:w-20 md:w-24"
                />
                <Image
                  src="/yolink.svg?height=30&width=80"
                  alt="YoLink"
                  width={80}
                  height={30}
                  className="w-16 sm:w-20 md:w-24"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="container py-10 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div
              className={`transition-all duration-1000 ${isFeatureVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                Manage and monitor your home from anywhere.
              </h2>
              <p className="text-muted-foreground mb-6">Enhance Your Home Management System</p>

              <Card className="bg-white/80 border-0 backdrop-blur-sm mb-6">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-bold mb-2">Effortless Remote Home Control</h3>
                  <p className="text-sm text-muted-foreground">
                    Enjoy unparalleled convenience with the ability to manage your home from anywhere, putting you in
                    complete control, no matter where life takes you.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div
              className={`relative mt-8 md:mt-0 transition-all duration-1000 delay-300 ${isFeatureVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Image
                src="/iphones.svg?height=600&width=500"
                alt="Smart home mobile app interface"
                width={500}
                height={600}
                className="mx-auto"
              />

              <Card className="bg-white/80 border-0 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Infinite Possibilities Await</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Unlock endless opportunities with our multifunctional smart home ecosystem, designed to adapt and
                    grow with your unique lifestyle.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 border-0 backdrop-blur-sm">
                <CardContent className="p-3 sm:p-6">
                  <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Compatible with Any Ecosystem</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    No matter which smart home platform you use, our devices seamlessly integrate to work perfectly for
                    you.
                  </p>
                </CardContent>
              </Card>

              {/* Mobile-only feature cards */}
              <div className="grid gap-4 mt-6 sm:hidden">
                <Card className="bg-gray-100 border-0">
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1">Infinite Possibilities Await</h3>
                    <p className="text-sm text-muted-foreground">
                      Unlock endless opportunities with our multifunctional smart home ecosystem, designed to adapt and
                      grow with your unique lifestyle.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-100 border-0">
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1">Compatible with Any Ecosystem</h3>
                    <p className="text-sm text-muted-foreground">
                      No matter which smart home platform you use, our devices seamlessly integrate to work perfectly
                      for you.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Effortless Living Section */}
        <section className="relative py-10 md:py-16">
          <div className="relative h-[400px] sm:h-[450px] md:h-[500px] w-full">
            <Image
              src="/effortlessImage.svg?height=500&width=1200"
              alt="Modern smart home exterior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="container px-4 sm:px-6">
            {/* Desktop version */}
            <div className="absolute top-16 left-0 right-0 md:left-10 md:right-auto max-w-md p-6 hidden md:block">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Effortless Living with Smart Automation
              </h2>
              <p className="text-white/80 mb-6">Smarter Home, Seamless Living</p>

              <div className="space-y-4">
                <Card className="bg-white/90 border-0">
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1">Convenience</h3>
                    <p className="text-sm text-muted-foreground">
                      Transform your home with smart automation for ultimate convenience and control.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 border-0">
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1">Comfort</h3>
                    <p className="text-sm text-muted-foreground">
                      Unlock a new level of comfort and efficiency with seamless home automation solutions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 border-0">
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1">Security</h3>
                    <p className="text-sm text-muted-foreground">
                      Enjoy increased security, and energy savings with effortless automation.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Button className="rounded-full bg-green-200 text-green-800 hover:bg-green-300 hover:text-green-900 px-8 py-6 text-lg font-medium w-full">
                  GET YOUR FREE QUOTE!
                </Button>
              </div>
            </div>

            {/* Mobile version - outside of absolute positioning */}
            <div className="md:hidden relative -mt-20 bg-white/95 rounded-t-3xl p-6 pt-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Effortless Living with Smart Automation</h2>
              <p className="text-muted-foreground mb-6">Smarter Home, Seamless Living</p>

              <div className="space-y-4">
                <Card className="bg-gray-100 border-0">
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1">Convenience</h3>
                    <p className="text-sm text-muted-foreground">
                      Transform your home with smart automation for ultimate convenience and control.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-100 border-0">
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1">Comfort</h3>
                    <p className="text-sm text-muted-foreground">
                      Unlock a new level of comfort and efficiency with seamless home automation solutions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-100 border-0">
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-1">Security</h3>
                    <p className="text-sm text-muted-foreground">
                      Enjoy increased security, and energy savings with effortless automation.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Button className="rounded-full bg-green-200 text-green-800 hover:bg-green-300 hover:text-green-900 px-6 py-5 text-base font-medium w-full">
                  GET YOUR FREE QUOTE!
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

