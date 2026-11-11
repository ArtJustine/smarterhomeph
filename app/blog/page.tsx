import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { JsonLd } from "@/components/json-ld"
import { abs, breadcrumb, graph, webPage } from "@/lib/schema"

const blogPosts = [
  {
    id: 1,
    title: "10 Smart Home Devices That Will Transform Your Living Space",
    excerpt: "Discover the latest smart home innovations that can make your home more comfortable, efficient, and secure.",
    date: "March 20, 2025",
    author: "Emma Johnson",
    category: "Vision",
  },
  {
    id: 2,
    title: "How to Set Up a Smart Home Security System on a Budget",
    excerpt: "Learn how to create an effective home security system without breaking the bank using affordable smart devices.",
    date: "March 15, 2025",
    author: "Michael Chen",
    category: "Security",
  },
  {
    id: 3,
    title: "The Future of Voice Assistants in Smart Homes",
    excerpt: "Explore how voice assistant technology is evolving and what it means for the future of home automation.",
    date: "March 10, 2025",
    author: "Sarah Williams",
    category: "Intelligence",
  },
  {
    id: 4,
    title: "Energy Saving Tips with Smart Home Automation",
    excerpt: "Discover how smart thermostats, lighting, and appliances can help reduce your energy consumption.",
    date: "March 5, 2025",
    author: "David Rodriguez",
    category: "Efficiency",
  },
  {
    id: 5,
    title: "Integrating Smart Home Systems: A Comprehensive Guide",
    excerpt: "Learn how to make different smart home ecosystems work together for a seamless experience.",
    date: "February 28, 2025",
    author: "Lisa Thompson",
    category: "Ecosystems",
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

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <JsonLd
          data={graph(
            webPage({
              type: "Blog",
              path: "/blog",
              name: "Smart Home Guides and Tips",
              description:
                "Practical guides on smart lighting, security, climate control and getting devices from different brands to work together.",
            }),
            breadcrumb([{ name: "Blog", path: "/blog" }]),
            {
              "@type": "ItemList",
              itemListElement: blogPosts.map((post, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: abs(`/blog/${post.id}`),
                name: post.title,
              })),
            },
          )}
        />
        <PageHeader
          eyebrow="Journal"
          title={
            <>
              Smart home guides and <span className="italic text-primary-ink">tips.</span>
            </>
          }
          intro="Guides on lighting, security, climate and keeping it all talking to each other."
        />

        <section className="container py-12 lg:py-20">
          <ul className="border-b">
            {blogPosts.map((post) => (
              <li key={post.id} className="border-t">
                <Link
                  href={`/blog/${post.id}`}
                  className="group grid gap-3 py-8 transition-colors hover:bg-card md:grid-cols-[11rem_1fr_auto] md:gap-10 md:px-2"
                >
                  <div className="eyebrow flex gap-3 md:block md:space-y-2">
                    <p>{post.date}</p>
                    <p className="text-primary-ink">{post.category}</p>
                  </div>
                  <div>
                    <h2 className="max-w-2xl text-3xl leading-tight transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{post.excerpt}</p>
                    <p className="eyebrow mt-4">By {post.author}</p>
                  </div>
                  <ArrowUpRight className="hidden h-6 w-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary-ink md:block" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
