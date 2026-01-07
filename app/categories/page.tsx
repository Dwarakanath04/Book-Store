"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { categories } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const mainCategories = categories.filter((c) => c.parent_id === null)

  const filteredCategories = mainCategories.filter((category) => {
    const query = searchQuery.toLowerCase()
    const subcategories = categories.filter((c) => c.parent_id === category.id)
    return (
      category.title.toLowerCase().includes(query) ||
      subcategories.some((sub) => sub.title.toLowerCase().includes(query))
    )
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Book Categories</h1>
      <p className="text-muted-foreground mb-6">Browse books by category</p>

      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredCategories.map((category) => {
          const subcategories = categories.filter((c) => c.parent_id === category.id)

          return (
            <Card key={category.id} className="hover:border-primary transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    <Link href={`/categories/${category.slug}`} className="hover:text-primary">
                      {category.title}
                    </Link>
                  </CardTitle>
                  <Badge variant="secondary">{category.product_count} books</Badge>
                </div>
              </CardHeader>
              {subcategories.length > 0 && (
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {subcategories.map((sub) => (
                      <Link key={sub.id} href={`/categories/${sub.slug}`}>
                        <Badge
                          variant="outline"
                          className="hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {sub.title} ({sub.product_count})
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      {filteredCategories.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No categories found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
