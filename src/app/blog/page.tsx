import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAllBlogPosts } from "@/lib/sanity-queries"

export const metadata: Metadata = {
  title: "Blog | Djaouli Entertainment",
  description: "Latest news, event recaps, and entertainment insights from Djaouli Entertainment",
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card key={post._id} className="overflow-hidden flex flex-col h-full">
            <div className="relative h-60">
              <Image
                src={post.mainImage?.url || "/placeholder.svg?height=400&width=600"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="text-sm text-muted-foreground mb-2">
                {new Date(post.publishedAt).toLocaleDateString()}
              </div>
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
              <Button variant="outline" asChild className="mt-auto">
                <Link href={`/blog/${post.slug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

