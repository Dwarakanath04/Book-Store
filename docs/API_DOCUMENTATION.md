# API Documentation

## Overview

This document describes the client-side APIs, functions, and component interfaces used in the World of Books application.

## Table of Contents

1. [Data Management](#data-management)
2. [Cart Management](#cart-management)
3. [Scrape Manager](#scrape-manager)
4. [Component APIs](#component-apis)
5. [Hooks](#hooks)

---

## Data Management

### Location: `lib/data.ts`

Core data structures and collections for the application.

#### Products Array

```typescript
export const products: Product[]
```

**Description:** Array of 82 book products with complete details.

**Example:**
```typescript
const book = products[0]
// {
//   id: 1,
//   title: "To Kill a Mockingbird",
//   price: 3.49,
//   currency: "£",
//   image_url: "/to-kill-a-mockingbird-cover.png",
//   ...
// }
```

#### Categories Array

```typescript
export const categories: Category[]
```

**Description:** Hierarchical category structure with parent-child relationships.

**Example:**
```typescript
const category = categories.find(c => c.slug === 'fiction')
// {
//   id: 1,
//   title: "Fiction",
//   slug: "fiction",
//   parent_id: null,
//   subcategories: [...]
// }
```

#### Product Details Map

```typescript
export const productDetails: Map<number, ProductDetail>
```

**Description:** Extended product information including descriptions, specs, and ratings.

**Example:**
```typescript
const details = productDetails.get(1)
// {
//   product_id: 1,
//   description: "A gripping tale...",
//   specs: { author: "Harper Lee", isbn: "978-0061120084", ... },
//   ratings_avg: 4.8,
//   reviews_count: 127
// }
```

#### Reviews Array

```typescript
export const reviews: Review[]
```

**Description:** Customer reviews for all products.

**Example:**
```typescript
const productReviews = reviews.filter(r => r.product_id === 1)
```

---

## Cart Management

### Location: `components/cart-provider.tsx`

React Context for global cart state management.

#### CartContext

```typescript
interface CartContextType {
  items: CartItem[]
  addItem: (productId: number) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}
```

**Usage:**
```typescript
import { useCart } from '@/components/cart-provider'

function MyComponent() {
  const { items, addItem, total } = useCart()
  
  return (
    <button onClick={() => addItem(1)}>
      Add to Cart (Total: £{total.toFixed(2)})
    </button>
  )
}
```

#### Methods

**addItem(productId: number)**
- Adds product to cart or increments quantity
- Persists to localStorage
- Shows toast notification

**removeItem(productId: number)**
- Removes product from cart entirely
- Updates localStorage

**updateQuantity(productId: number, quantity: number)**
- Sets specific quantity for product
- Removes item if quantity is 0

**clearCart()**
- Empties entire cart
- Clears localStorage

---

## Scrape Manager

### Location: `lib/scrape-manager.ts`

Manages web scraping operations and job tracking.

#### ScrapeJobManager Class

```typescript
class ScrapeJobManager {
  createJob(url: string, type: string): ScrapeJob
  startJob(jobId: number): Promise<void>
  getJobs(): ScrapeJob[]
  getJobById(id: number): ScrapeJob | undefined
  deleteJob(jobId: number): void
}
```

**Singleton Instance:**
```typescript
export const scrapeManager = ScrapeJobManager.getInstance()
```

#### Methods

**createJob(url: string, type: "category" | "product" | "review"): ScrapeJob**

Creates a new scrape job and validates the URL.

```typescript
const job = scrapeManager.createJob(
  'https://www.worldofbooks.com/en-gb/books/author/book-title',
  'product'
)
// Returns: { id: 1, target_url: "...", status: "pending", ... }
```

**startJob(jobId: number): Promise<void>**

Executes the scraping operation asynchronously.

```typescript
await scrapeManager.startJob(1)
// Job status transitions: pending → running → completed/failed
```

**getJobs(): ScrapeJob[]**

Returns all jobs sorted by creation date (newest first).

```typescript
const allJobs = scrapeManager.getJobs()
```

**deleteJob(jobId: number): void**

Removes a completed or failed job.

```typescript
scrapeManager.deleteJob(5)
```

#### Job Lifecycle

```
pending → running → completed
                  → failed
```

**Status Transitions:**
- `pending`: Job created, not started
- `running`: Currently scraping
- `completed`: Successfully finished
- `failed`: Error occurred during scraping

---

## Component APIs

### AddToCartButton

```typescript
interface AddToCartButtonProps {
  productId: number
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}
```

**Example:**
```tsx
<AddToCartButton productId={1} size="lg" />
```

### ReviewForm

```typescript
interface ReviewFormProps {
  productId: number
  onReviewSubmitted?: () => void
}
```

**Example:**
```tsx
<ReviewForm 
  productId={1} 
  onReviewSubmitted={() => console.log('Review added!')}
/>
```

### ReviewsList

```typescript
interface ReviewsListProps {
  productId: number
  limit?: number
}
```

**Example:**
```tsx
<ReviewsList productId={1} limit={5} />
```

---

## Hooks

### useCart

Access cart context.

```typescript
const {
  items,        // CartItem[]
  addItem,      // (productId: number) => void
  removeItem,   // (productId: number) => void
  updateQuantity, // (productId: number, qty: number) => void
  clearCart,    // () => void
  total,        // number
  itemCount     // number
} = useCart()
```

### useMobile

Detect mobile viewport.

```typescript
const isMobile = useMobile() // boolean
```

**Breakpoint:** 768px

### useToast

Display toast notifications.

```typescript
const { toast } = useToast()

toast({
  title: "Success!",
  description: "Item added to cart",
  variant: "default" // or "destructive"
})
```

---

## Storage APIs

### localStorage Keys

```typescript
// Cart storage
localStorage.getItem('cart') // CartItem[]

// Reviews storage
localStorage.getItem('reviews') // Review[]

// Scrape jobs storage
localStorage.getItem('scrapeJobs') // ScrapeJob[]

// Scraped products storage
localStorage.getItem('scrapedProducts') // Product[]
```

### Data Format Examples

**Cart Item:**
```json
{
  "productId": 1,
  "quantity": 2,
  "addedAt": "2024-01-15T10:30:00Z"
}
```

**Review:**
```json
{
  "id": 150,
  "product_id": 1,
  "author": "John Doe",
  "rating": 5,
  "text": "Excellent book!",
  "created_at": "2024-01-15T14:20:00Z"
}
```

---

## Error Handling

All async operations include error handling:

```typescript
try {
  await scrapeManager.startJob(jobId)
} catch (error) {
  console.error('Scrape job failed:', error)
  // Error is logged to job.error_log
}
```

Toast notifications are shown for user-facing errors:

```typescript
addItem(productId) {
  try {
    // Add item logic
    toast({ title: "Added to cart" })
  } catch (error) {
    toast({ 
      title: "Error", 
      description: "Failed to add item",
      variant: "destructive"
    })
  }
}
```

---

## Type Definitions

### Core Types

typescript
interface Product {
  id: number
  source_id?: string
  title: string
  price: number
  currency: string
  image_url: string
  source_url?: string
  last_scraped_at?: Date
}

interface ProductDetail {
  product_id: number
  description: string
  specs: {
    author?: string
    isbn?: string
    pages?: number
    publisher?: string
    published?: string
  }
  ratings_avg: number
  reviews_count: number
}

interface Category {
  id: number
  navigation_id?: number
  parent_id?: number | null
  title: string
  slug: string
  product_count: number
  subcategories?: Category[]
}

interface Review {
  id: number
  product_id: number
  author: string
  rating: number
  text: string
  created_at: Date
}

interface ScrapeJob {
  id: number
  target_url: string
  target_type: "category" | "product" | "review"
  status: "pending" | "running" | "completed" | "failed"
  started_at: Date | null
  finished_at: Date | null
  error_log: string | null
}

interface CartItem {
  productId: number
  quantity: number
  addedAt: Date
}
