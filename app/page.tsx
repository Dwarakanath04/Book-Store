"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, ShoppingCart, History, Database, Star, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { products } from "@/lib/data"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.source_url && product.source_url.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative border-b border-border bg-gradient-to-b from-secondary to-background py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <BookOpen className="mx-auto h-16 w-16 mb-6 text-primary" />
          <h1 className="text-5xl font-bold mb-4 text-balance">World of Books</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Discover your next great read from our curated collection of books
          </p>

          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search books by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link href="/books">Browse All Books</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/categories">View Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {searchQuery && (
        <section className="py-8 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold mb-6">Search Results ({filteredProducts.length})</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {filteredProducts.slice(0, 10).map((product) => (
                <Link key={product.id} href={`/books/${product.id}`}>
                  <Card className="hover:border-primary transition-colors h-full">
                    <CardContent className="p-3">
                      <div className="aspect-[3/4] relative mb-2 bg-muted rounded overflow-hidden">
                        <Image
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-xs font-medium line-clamp-2 mb-1">{product.title}</h3>
                      <p className="text-sm font-bold text-primary">
                        {product.currency}
                        {product.price.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            {filteredProducts.length > 10 && (
              <div className="text-center mt-6">
                <Button asChild variant="outline">
                  <Link href="/books">View All Results</Link>
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore Our Store</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/books">
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardContent className="p-6">
                  <BookOpen className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">All Books</h3>
                  <p className="text-muted-foreground">
                    Browse our complete collection of 30+ carefully selected books
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/categories">
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardContent className="p-6">
                  <BookOpen className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Categories</h3>
                  <p className="text-muted-foreground">
                    Explore books by genre: Fiction, Non-Fiction, Science, and more
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/cart">
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardContent className="p-6">
                  <ShoppingCart className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Shopping Cart</h3>
                  <p className="text-muted-foreground">Review and manage items in your shopping cart</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/reviews">
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardContent className="p-6">
                  <Star className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Reviews</h3>
                  <p className="text-muted-foreground">Read customer reviews and ratings for all our books</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/scrape-jobs">
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardContent className="p-6">
                  <Database className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Scrape Jobs</h3>
                  <p className="text-muted-foreground">View data collection status and scraping history</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/history">
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardContent className="p-6">
                  <History className="h-10 w-10 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">View History</h3>
                  <p className="text-muted-foreground">Track your browsing activity and visited pages</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
