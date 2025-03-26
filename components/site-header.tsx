"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold text-black">
          SmartHome
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/devices" className="text-sm font-medium text-black hover:text-primary">
            Devices
          </Link>
          <Link href="/services" className="text-sm font-medium text-black hover:text-primary">
            Services
          </Link>
          <Link href="/blog" className="text-sm font-medium text-black hover:text-primary">
            Blog
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <Button variant="outline" className="rounded-full hidden md:flex">
            Contact Us
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-4 p-4 bg-white border-t">
            <Link
              href="/devices"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Devices
            </Link>
            <Link
              href="/services"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Button variant="outline" className="rounded-full w-full">
              Contact Us
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

