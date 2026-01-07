"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import { reviews as staticReviews } from "@/lib/data"

interface Review {
  id: number
  product_id: number
  author: string
  rating: number
  text: string
  created_at: string
}

export function ReviewsList({ productId }: { productId: number }) {
  const [allReviews, setAllReviews] = useState<Review[]>([])

  useEffect(() => {
    // Load reviews from both static data and localStorage
    const loadReviews = () => {
      const staticProductReviews = staticReviews.filter((r) => r.product_id === productId)

      const savedReviews = localStorage.getItem("userReviews")
      const userReviews: Review[] = savedReviews ? JSON.parse(savedReviews) : []
      const userProductReviews = userReviews.filter((r) => r.product_id === productId)

      // Combine and sort by date (newest first)
      const combined = [...staticProductReviews, ...userProductReviews].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )

      setAllReviews(combined)
    }

    loadReviews()

    // Refresh every 2 seconds to show new reviews
    const interval = setInterval(loadReviews, 2000)
    return () => clearInterval(interval)
  }, [productId])

  if (allReviews.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Customer Reviews ({allReviews.length})</h2>
      <div className="space-y-4">
        {allReviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{review.author}</CardTitle>
                <div className="flex items-center">
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
              <p className="text-muted-foreground">{review.text}</p>
              <p className="text-sm text-muted-foreground mt-2">{new Date(review.created_at).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
