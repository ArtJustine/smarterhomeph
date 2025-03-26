import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Smart Home Devices That Will Transform Your Living Space",
      excerpt:
        "Discover the latest smart home innovations that can make your home more comfortable, efficient, and secure.",
      date: "March 20, 2025",
      author: "Emma Johnson",
      category: "Smart Living",
    },
    {
      id: 2,
      title: "How to Set Up a Smart Home Security System on a Budget",
      excerpt:
        "Learn how to create an effective home security system without breaking the bank using affordable smart devices.",
      date: "March 15, 2025",
      author: "Michael Chen",
      category: "Security",
    },
    {
      id: 3,
      title: "The Future of Voice Assistants in Smart Homes",
      excerpt:
        "Explore how voice assistant technology is evolving and what it means for the future of home automation.",
      date: "March 10, 2025",
      author: "Sarah Williams",
      category: "Technology Trends",
    },
    {
      id: 4,
      title: "Energy Saving Tips with Smart Home Automation",
      excerpt:
        "Discover how smart thermostats, lighting, and appliances can help reduce your energy consumption and utility bills.",
      date: "March 5, 2025",
      author: "David Rodriguez",
      category: "Energy Efficiency",
    },
    {
      id: 5,
      title: "Integrating Smart Home Systems: A Comprehensive Guide",
      excerpt:
        "Learn how to make different smart home ecosystems work together for a seamless home automation experience.",
      date: "February 28, 2025",
      author: "Lisa Thompson",
      category: "Integration",
    },
    {
      id: 6,
      title: "Smart Home Innovations for Aging in Place",
      excerpt: "How smart technology can help seniors live independently and safely in their homes for longer.",
      date: "February 23, 2025",
      author: "Robert Garcia",
      category: "Accessibility",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <PageHeader title="BLOG" backgroundImage="/placeholder.svg?height=500&width=1200" alt="Smart home blog" />

        <section className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden flex flex-col">
                <div className="aspect-video relative bg-gray-100">
                  <Image
                    src={`/placeholder.svg?height=300&width=600&text=Blog+${post.id}`}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6 flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">{post.category}</span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-3">{post.excerpt}</p>
                  <p className="text-sm text-muted-foreground">By {post.author}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button variant="outline" className="w-full">
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

