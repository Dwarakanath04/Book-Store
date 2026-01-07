"use client"

import Link from "next/link"
import { BookOpen, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"

export function Header() {
  const { cartCount } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">World of Books</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/books" className="text-sm font-medium hover:text-primary transition-colors">
            All Books
          </Link>
          <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
            Categories
          </Link>
          <Link href="/reviews" className="text-sm font-medium hover:text-primary transition-colors">
            Reviews
          </Link>
          <Link href="/scrape-jobs" className="text-sm font-medium hover:text-primary transition-colors">
            Scrape Jobs
          </Link>
        </nav>

        <Button asChild variant="outline" size="sm">
          <Link href="/cart" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Cart ({cartCount})
          </Link>
        </Button>
      </div>
    </header>
  )
}
