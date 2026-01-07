"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { products } from "@/lib/data"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import { ShoppingCart, Search } from "lucide-react"
import Link from "next/link"

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { addToCart } = useCart()
  const { toast } = useToast()

  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase()
    return (
      product.title.toLowerCase().includes(query) ||
      (product.source_url && product.source_url.toLowerCase().includes(query))
    )
  })

  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">All Books</h1>
        <p className="text-muted-foreground mb-6">Browse our complete collection of {products.length} books</p>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {searchQuery && (
          <p className="text-sm text-muted-foreground mt-2">
            Found {filteredProducts.length} book{filteredProducts.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
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
              <Button onClick={() => handleAddToCart(product)} className="w-full" size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No books found matching your search.</p>
        </div>
      )}
    </div>
  )
}
