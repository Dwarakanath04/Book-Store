"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-24 w-24 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some books to get started!</p>
          <Button asChild>
            <Link href="/books">Browse Books</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Shopping Cart</h1>
        <Button variant="outline" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Link href={`/books/${item.id}`} className="flex-shrink-0">
                    <div className="w-24 h-32 relative bg-muted rounded overflow-hidden">
                      <Image
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link href={`/books/${item.id}`}>
                      <h3 className="font-semibold mb-1 hover:text-primary transition-colors">{item.title}</h3>
                    </Link>
                    <p className="text-lg font-bold text-primary mb-4">${item.price.toFixed(2)}</p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                          className="w-16 text-center"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
