"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/data"

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    })
  }

  return (
    <Button onClick={handleAddToCart} size="lg" className="w-full md:w-auto">
      <ShoppingCart className="h-5 w-5 mr-2" />
      Add to Cart
    </Button>
  )
}
