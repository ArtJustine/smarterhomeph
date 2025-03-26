import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t py-12 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Newsletter Subscription */}
          <div className="md:col-span-5">
            <h3 className="font-bold text-lg italic mb-4">Logo</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates on smart home innovations.
            </p>
            <div className="space-y-2">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Your Email Here" className="rounded-md" />
                <Button type="submit" className="rounded-md">
                  Join
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                By subscribing, you consent to our Privacy Policy and agree to receive updates.
              </p>
            </div>
          </div>

          {/* Empty space for layout */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Connect With Us */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-sm text-muted-foreground hover:text-primary">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">
                  Blog Posts
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-sm text-muted-foreground hover:text-primary">
                  User Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="md:col-span-3">
            <h3 className="font-medium mb-4">Follow Us</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path d="M17.707 9.293a1 1 0 0 0-1.414 0L14 11.586V15h3.414a1 1 0 0 0 .707-1.707l-2.414-2.414z" />
                    <path d="M11 15H8a5 5 0 0 1-5-5 1 1 0 0 0-2 0 7 7 0 0 0 7 7h3v3a1 1 0 0 0 2 0v-3h3a7 7 0 0 0 7-7 1 1 0 0 0-2 0 5 5 0 0 1-5 5h-3v-3" />
                  </svg>
                  X
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Youtube className="h-4 w-4" />
                  YouTube
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SmartHome. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

