# Database Schema Documentation

## Overview

This document describes the data models used in the World of Books application. While the current implementation uses in-memory TypeScript objects and localStorage, this schema can be used to migrate to a SQL or NoSQL database in the future.

## Entity Relationship Diagram

```
┌─────────────┐       ┌──────────────┐       ┌─────────────────┐
│  Navigation │       │   Category   │       │     Product     │
│             │       │              │       │                 │
│ + id        │       │ + id         │◄──────│ + id            │
│ + title     │       │ + title      │       │ + title         │
│ + slug      │       │ + slug       │       │ + price         │
│ + scraped_at│       │ + parent_id  │       │ + image_url     │
└─────────────┘       │ + product_ct │       │ + source_url    │
                      └──────────────┘       └────────┬────────┘
                                                      │
                      ┌──────────────┐               │
                      │   Review     │               │
                      │              │               │
                      │ + id         │───────────────┘
                      │ + product_id │
                      │ + author     │
                      │ + rating     │
                      │ + text       │
                      │ + created_at │
                      └──────────────┘
                             │
┌──────────────┐             │        ┌─────────────────┐
│  ScrapeJob   │             │        │ ProductDetail   │
│              │             │        │                 │
│ + id         │             └────────│ + product_id    │
│ + target_url │                      │ + description   │
│ + type       │                      │ + specs (json)  │
│ + status     │                      │ + ratings_avg   │
│ + started_at │                      │ + reviews_count │
│ + finished_at│                      └─────────────────┘
│ + error_log  │
└──────────────┘

┌──────────────┐
│ ViewHistory  │
│              │
│ + id         │
│ + user_id    │
│ + session_id │
│ + path_json  │
│ + created_at │
└──────────────┘
```

## Data Models

### 1. Navigation

Represents top-level navigation items.

```typescript
interface Navigation {
  id: number
  title: string
  slug: string
  last_scraped_at: Date
}
```

**Fields:**
- `id` - Primary key, auto-increment
- `title` - Display name (e.g., "Fiction", "Non-Fiction")
- `slug` - URL-friendly identifier
- `last_scraped_at` - Timestamp of last data scrape

**Indexes:**
- PRIMARY KEY (`id`)
- INDEX (`slug`)

---

### 2. Category

Book categories and subcategories with hierarchical structure.

```typescript
interface Category {
  id: number
  navigation_id: number  // Foreign key
  parent_id: number | null
  title: string
  slug: string
  product_count: number
  last_scraped_at: Date
}
```

**Fields:**
- `id` - Primary key, auto-increment
- `navigation_id` - Links to parent navigation
- `parent_id` - Self-referencing for subcategories (NULL for parent categories)
- `title` - Category name
- `slug` - URL-friendly identifier
- `product_count` - Number of products in category
- `last_scraped_at` - Timestamp of last scrape

**Relationships:**
- Many categories belong to one navigation
- Categories can have child categories (self-referencing)

**Indexes:**
- PRIMARY KEY (`id`)
- FOREIGN KEY (`navigation_id`) REFERENCES `navigation(id)`
- FOREIGN KEY (`parent_id`) REFERENCES `category(id)`
- INDEX (`slug`)

---

### 3. Product

Individual book products.

```typescript
interface Product {
  id: number
  source_id: string
  title: string
  price: number
  currency: string
  image_url: string
  source_url: string
  last_scraped_at: Date
}
```

**Fields:**
- `id` - Primary key, auto-increment
- `source_id` - External identifier from source website
- `title` - Book title
- `price` - Decimal price (e.g., 3.49)
- `currency` - Currency code (e.g., "£", "$")
- `image_url` - Path to book cover image
- `source_url` - Original URL from worldofbooks.com
- `last_scraped_at` - Timestamp of last scrape

**Indexes:**
- PRIMARY KEY (`id`)
- UNIQUE (`source_id`, `source_url`)
- INDEX (`last_scraped_at`)

---

### 4. ProductDetail

Extended information about products.

```typescript
interface ProductDetail {
  product_id: number  // Foreign key
  description: string
  specs: {
    author?: string
    isbn?: string
    pages?: number
    publisher?: string
    published?: string
    language?: string
    format?: string
  }
  ratings_avg: number
  reviews_count: number
}
```

**Fields:**
- `product_id` - Foreign key to product
- `description` - Long text description
- `specs` - JSON object with book specifications
- `ratings_avg` - Average rating (0-5)
- `reviews_count` - Total number of reviews

**Relationships:**
- One-to-one with Product

**Indexes:**
- PRIMARY KEY (`product_id`)
- FOREIGN KEY (`product_id`) REFERENCES `product(id)`

---

### 5. Review

Customer reviews for products.

```typescript
interface Review {
  id: number
  product_id: number  // Foreign key
  author: string
  rating: number
  text: string
  created_at: Date
}
```

**Fields:**
- `id` - Primary key, auto-increment
- `product_id` - Foreign key to product
- `author` - Reviewer name
- `rating` - Star rating (1-5)
- `text` - Review content
- `created_at` - Review timestamp

**Relationships:**
- Many reviews belong to one product

**Indexes:**
- PRIMARY KEY (`id`)
- FOREIGN KEY (`product_id`) REFERENCES `product(id)`
- INDEX (`product_id`, `created_at`)

---

### 6. ScrapeJob

Tracks web scraping operations.

```typescript
interface ScrapeJob {
  id: number
  target_url: string
  target_type: "category" | "product" | "review"
  status: "pending" | "running" | "completed" | "failed"
  started_at: Date | null
  finished_at: Date | null
  error_log: string | null
}
```

**Fields:**
- `id` - Primary key, auto-increment
- `target_url` - URL to scrape
- `target_type` - Type of scrape operation
- `status` - Current job status
- `started_at` - Job start timestamp
- `finished_at` - Job completion timestamp
- `error_log` - Error message if failed

**Indexes:**
- PRIMARY KEY (`id`)
- INDEX (`status`)
- INDEX (`started_at`)

---

### 7. ViewHistory

User navigation tracking for analytics.

```typescript
interface ViewHistory {
  id: number
  user_id: string | null  // Optional user identifier
  session_id: string
  path_json: string[]  // JSON array of page paths
  created_at: Date
}
```

**Fields:**
- `id` - Primary key, auto-increment
- `user_id` - Optional authenticated user ID
- `session_id` - Browser session identifier
- `path_json` - JSON array storing navigation path
- `created_at` - Session timestamp

**Indexes:**
- PRIMARY KEY (`id`)
- INDEX (`session_id`)
- INDEX (`created_at`)

---

## Sample Data

### Categories Hierarchy

```
Fiction (Parent)
  ├── Classic Literature
  ├── Mystery
  └── Romance

Non-Fiction (Parent)
  ├── Biography
  ├── History
  └── Self-Help

Fantasy (Parent)
  ├── Epic Fantasy
  └── Urban Fantasy

Science Fiction (Parent)
  └── Space Opera

Children's Books (Parent)
  ├── Picture Books
  └── Young Adult
```

### Product Example

```json
{
  "id": 1,
  "title": "To Kill a Mockingbird",
  "price": 3.49,
  "currency": "£",
  "image_url": "/to-kill-a-mockingbird-cover.png",
  "details": {
    "author": "Harper Lee",
    "isbn": "978-0061120084",
    "pages": 324,
    "publisher": "Harper Perennial",
    "published": "1960",
    "description": "A gripping tale of racial injustice...",
    "ratings_avg": 4.8,
    "reviews_count": 127
  }
}
```

## Migration to Database

### PostgreSQL Schema

```sql
-- See scripts/seed-data.sql for complete schema
CREATE TABLE navigation (...);
CREATE TABLE category (...);
CREATE TABLE product (...);
CREATE TABLE product_detail (...);
CREATE TABLE review (...);
CREATE TABLE scrape_job (...);
CREATE TABLE view_history (...);
```

### MongoDB Schema

```javascript
// Collections would map directly to interfaces
db.createCollection("products")
db.createCollection("categories")
db.createCollection("reviews")
// ... etc
```

## Performance Considerations

- **Indexes** on foreign keys and frequently queried fields
- **Denormalization** of product_count in categories
- **JSON columns** for flexible specs data
- **Caching** of aggregated ratings/reviews
