import Image from "next/image"
import { notFound } from "next/navigation"
import { products, productDetails } from "@/lib/data"
import { Star } from "lucide-react"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ReviewForm } from "@/components/review-form"
import { ReviewsList } from "@/components/reviews-list"

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = products.find((p) => p.id === Number.parseInt(id))
  const detail = productDetails.find((d) => d.product_id === Number.parseInt(id))

  if (!product || !detail) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="aspect-[3/4] relative bg-muted rounded-lg overflow-hidden">
          <Image src={product.image_url || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl text-muted-foreground mb-4">by {detail.specs.author}</p>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(detail.ratings_avg) ? "fill-primary text-primary" : "text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {detail.ratings_avg} ({detail.reviews_count} reviews)
            </span>
          </div>

          <p className="text-3xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>

          <AddToCartButton product={product} />

          <div className="mt-8 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{detail.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">ISBN</p>
                <p className="font-medium">{detail.specs.isbn}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pages</p>
                <p className="font-medium">{detail.specs.pages}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Publisher</p>
                <p className="font-medium">{detail.specs.publisher}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="font-medium">{detail.specs.published_date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Language</p>
                <p className="font-medium">{detail.specs.language}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
        <ReviewForm productId={Number.parseInt(id)} productTitle={product.title} />
      </div>

      <ReviewsList productId={Number.parseInt(id)} />
    </div>
  )
}
