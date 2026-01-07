import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { categories, getProductsByCategory } from "@/lib/data"
import { AddToCartButtonClient } from "@/components/add-to-cart-button-client"

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }

  const products = getProductsByCategory(slug)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{category.title}</h1>
        <p className="text-muted-foreground">{products.length} books in this category</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <Link href={`/books/${product.id}`}>
              <CardContent className="p-4">
                <div className="aspect-[3/4] relative mb-4 bg-muted rounded-md overflow-hidden">
                  <Image
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">{product.title}</h3>
                <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
              </CardContent>
            </Link>
            <CardFooter className="p-4 pt-0 mt-auto">
              <AddToCartButtonClient product={product} />
            </CardFooter>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No books found in this category.</p>
        </div>
      )}
    </div>
  )
}
