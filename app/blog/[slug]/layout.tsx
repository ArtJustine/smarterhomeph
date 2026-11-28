import type { Metadata } from "next"
import { pageMeta, SITE_NAME } from "@/lib/site"
import { JsonLd } from "@/components/json-ld"
import { blogSeo, blogSlugToId } from "@/lib/blog-seo"
import { BUSINESS_ID, abs, breadcrumb, graph, webPage } from "@/lib/schema"

const published: Record<number, string> = {
  1: "2025-03-20", 2: "2025-03-15", 3: "2025-03-10", 4: "2025-03-05",
  5: "2025-02-28", 6: "2025-02-23", 7: "2026-11-11", 8: "2026-11-28",
}

function getPost(slug: string) {
  const id = blogSlugToId(slug)
  if (!id) return undefined
  const { title, description } = blogSeo[id]
  return { id, title, description, published: published[id] }
}

export const dynamicParams = false

export function generateStaticParams() {
  return Object.values(blogSeo).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: "Post not found", robots: { index: false } }
  return { ...pageMeta(`/blog/${slug}`, post.title, post.description), title: { absolute: `${post.title} | ${SITE_NAME}` } }
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  const path = `/blog/${slug}`

  return (
    <>
      {post && (
        <JsonLd
          data={graph(
            webPage({ path, name: post.title, description: post.description }),
            {
              "@type": "BlogPosting",
              "@id": `${abs(path)}#post`,
              headline: post.title,
              description: post.description,
              datePublished: post.published,
              inLanguage: "en-PH",
              mainEntityOfPage: { "@id": `${abs(path)}#webpage` },
              author: { "@id": BUSINESS_ID },
              publisher: { "@id": BUSINESS_ID },
            },
            breadcrumb([
              { name: "Blog", path: "/blog" },
              { name: post.title, path },
            ]),
          )}
        />
      )}
      {children}
    </>
  )
}
