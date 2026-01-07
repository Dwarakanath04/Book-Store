"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import { useRouter } from "next/navigation"

interface ReviewFormProps {
  productId: number
  productTitle: string
}

export function ReviewForm({ productId, productTitle }: ReviewFormProps) {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [author, setAuthor] = useState("")
  const [reviewText, setReviewText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!rating || !author.trim() || !reviewText.trim()) {
      alert("Please fill in all fields and select a rating")
      return
    }

    setIsSubmitting(true)

    // Get existing reviews from localStorage
    const savedReviews = localStorage.getItem("userReviews")
    const userReviews = savedReviews ? JSON.parse(savedReviews) : []

    // Create new review
    const newReview = {
      id: Date.now(),
      product_id: productId,
      author: author.trim(),
      rating,
      text: reviewText.trim(),
      created_at: new Date().toISOString(),
    }

    // Add to localStorage
    userReviews.push(newReview)
    localStorage.setItem("userReviews", JSON.stringify(userReviews))

    // Show success message
    setShowSuccess(true)

    // Reset form
    setTimeout(() => {
      setRating(0)
      setAuthor("")
      setReviewText("")
      setIsSubmitting(false)
      setShowSuccess(false)
      router.refresh()
    }, 2000)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {showSuccess ? (
          <div className="text-center py-8">
            <div className="text-2xl mb-2">✓</div>
            <p className="text-lg font-semibold text-primary">Thank you for your review!</p>
            <p className="text-sm text-muted-foreground mt-2">Your review has been submitted successfully</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="author">Your Name</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter your name"
                required
                maxLength={100}
              />
            </div>

            <div>
              <Label>Rating</Label>
              <div className="flex items-center gap-2 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRating(i + 1)}
                    onMouseEnter={() => setHoveredRating(i + 1)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        i < (hoveredRating || rating) ? "fill-primary text-primary" : "text-muted"
                      }`}
                    />
                  </button>
                ))}
                {rating > 0 && <span className="ml-2 text-sm text-muted-foreground">{rating} out of 5 stars</span>}
              </div>
            </div>

            <div>
              <Label htmlFor="review">Your Review</Label>
              <Textarea
                id="review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder={`Share your thoughts about ${productTitle}...`}
                required
                rows={6}
                maxLength={1000}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">{reviewText.length}/1000 characters</p>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
