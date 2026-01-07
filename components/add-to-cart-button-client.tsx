"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/data"

export function AddToCartButtonClient({ product }: { product: Product }) {
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
    <Button onClick={handleAddToCart} className="w-full" size="sm">
      <ShoppingCart className="h-4 w-4 mr-2" />
      Add to Cart
    </Button>
  )
}
