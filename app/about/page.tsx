import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <PageHeader title="ABOUT US" backgroundImage="/placeholder.svg?height=500&width=1200" alt="Smart home team" />

        <section className="container py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8">
              At SmartHome, we're dedicated to transforming houses into intelligent, responsive living spaces that
              enhance comfort, security, and efficiency. Our mission is to make smart home technology accessible,
              intuitive, and seamlessly integrated into everyday life.
            </p>

            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Founded in 2015, SmartHome began with a simple idea: that technology should work for people, not the other
              way around. Our team of engineers, designers, and home automation enthusiasts came together with a shared
              vision of creating smart home solutions that are both powerful and easy to use.
            </p>

            <h2 className="text-3xl font-bold mb-6">Our Approach</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We believe in a holistic approach to smart home technology. Rather than offering isolated gadgets, we
              create ecosystems where devices work together seamlessly. Our solutions are designed to be flexible,
              scalable, and compatible with the leading smart home platforms.
            </p>

            <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
            <p className="text-lg text-muted-foreground">
              Customer satisfaction is at the heart of everything we do. We're committed to providing exceptional
              service, reliable products, and ongoing support to ensure your smart home experience exceeds expectations.
              We continuously innovate and improve our offerings based on customer feedback and emerging technologies.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

