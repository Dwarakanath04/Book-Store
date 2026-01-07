"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { reviews, products, productDetails } from "@/lib/data"
import { Star, Search } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredReviews = reviews.filter((review) => {
    const product = products.find((p) => p.id === review.product_id)
    const query = searchQuery.toLowerCase()
    return (
      product?.title.toLowerCase().includes(query) ||
      review.author.toLowerCase().includes(query) ||
      review.text.toLowerCase().includes(query)
    )
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Customer Reviews</h1>
      <p className="text-muted-foreground mb-6">Read what our customers have to say about our books</p>

      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search reviews by book, author, or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {filteredReviews.map((review) => {
            const product = products.find((p) => p.id === review.product_id)
            if (!product) return null

            return (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Link href={`/books/${product.id}`}>
                        <CardTitle className="text-lg hover:text-primary transition-colors">{product.title}</CardTitle>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">by {review.author}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{review.text}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(review.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </CardContent>
              </Card>
            )
          })}
          {filteredReviews.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No reviews found matching your search.</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Top Rated Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productDetails
                  .sort((a, b) => b.ratings_avg - a.ratings_avg)
                  .slice(0, 5)
                  .map((detail) => {
                    const product = products.find((p) => p.id === detail.product_id)
                    if (!product) return null

                    return (
                      <Link
                        key={product.id}
                        href={`/books/${product.id}`}
                        className="block hover:bg-accent rounded-md p-2 -m-2 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-sm line-clamp-1">{product.title}</p>
                          <Badge variant="secondary" className="ml-2">
                            {detail.ratings_avg}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{detail.reviews_count} reviews</p>
                      </Link>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
