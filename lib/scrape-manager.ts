"use client"

import type { ScrapeJob, Product, ProductDetail } from "./data"
import { products, productDetails } from "./data"

function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

function isWorldOfBooksUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString)
    return url.hostname.includes("worldofbooks.com")
  } catch {
    return false
  }
}

function extractBookDataFromUrl(url: string): Partial<Product> | null {
  try {
    // Extract book title from URL
    const urlParts = url.split("/").filter(Boolean)
    const lastPart = urlParts[urlParts.length - 1]

    // Convert slug to title (e.g., "harry-potter-1" -> "Harry Potter And The Philosopher's Stone")
    const titleFromSlug = lastPart
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    return {
      title: titleFromSlug,
      price: Math.floor(Math.random() * 8) + 2.49, // Random price £2.49-£9.99
      currency: "GBP",
      source_url: url,
      last_scraped_at: new Date().toISOString(),
    }
  } catch {
    return null
  }
}

// Simulated scrape job manager with live updates
class ScrapeJobManager {
  private jobs: ScrapeJob[] = []
  private listeners: Set<() => void> = new Set()
  private nextId = 6
  private runningJobs: Map<number, NodeJS.Timeout> = new Map()

  constructor() {
    // Load initial jobs from localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("scrapeJobs")
      if (stored) {
        this.jobs = JSON.parse(stored)
        this.nextId = Math.max(...this.jobs.map((j) => j.id), 5) + 1
        // Restore running jobs to completed if page was refreshed
        this.jobs.forEach((job) => {
          if (job.status === "running") {
            job.status = "completed"
            job.finished_at = new Date().toISOString()
          }
        })
        this.persist()
      } else {
        // Initialize with default jobs
        this.jobs = [
          {
            id: 1,
            target_url: "https://worldofbooks.com/category/fiction",
            target_type: "category",
            status: "completed",
            started_at: "2026-01-07T09:00:00Z",
            finished_at: "2026-01-07T09:15:00Z",
            error_log: null,
          },
          {
            id: 2,
            target_url: "https://worldofbooks.com/category/non-fiction",
            target_type: "category",
            status: "completed",
            started_at: "2026-01-07T09:15:00Z",
            finished_at: "2026-01-07T09:30:00Z",
            error_log: null,
          },
          {
            id: 3,
            target_url: "https://worldofbooks.com/products/all",
            target_type: "product",
            status: "completed",
            started_at: "2026-01-07T09:30:00Z",
            finished_at: "2026-01-07T11:00:00Z",
            error_log: null,
          },
          {
            id: 4,
            target_url: "https://worldofbooks.com/category/science",
            target_type: "category",
            status: "failed",
            started_at: "2026-01-07T08:00:00Z",
            finished_at: "2026-01-07T08:05:00Z",
            error_log: "Connection timeout after 5 seconds",
          },
          {
            id: 5,
            target_url: "https://worldofbooks.com/reviews/recent",
            target_type: "review",
            status: "completed",
            started_at: "2026-01-07T11:00:00Z",
            finished_at: "2026-01-07T11:45:00Z",
            error_log: null,
          },
        ]
        this.persist()
      }
    }
  }

  private persist() {
    if (typeof window !== "undefined") {
      localStorage.setItem("scrapeJobs", JSON.stringify(this.jobs))
    }
  }

  private persistProducts(newProducts: Product[]) {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("scrapedProducts")
      const existing = stored ? JSON.parse(stored) : []
      const combined = [...existing, ...newProducts]
      localStorage.setItem("scrapedProducts", JSON.stringify(combined))

      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent("productsUpdated"))
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener())
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  getJobs(): ScrapeJob[] {
    return [...this.jobs].sort((a, b) => b.id - a.id)
  }

  createJob(targetUrl: string, targetType: string): ScrapeJob {
    const job: ScrapeJob = {
      id: this.nextId++,
      target_url: targetUrl,
      target_type: targetType,
      status: "pending",
      started_at: new Date().toISOString(),
      finished_at: null,
      error_log: null,
    }

    this.jobs.push(job)
    this.persist()
    this.notify()

    // Start the job after a short delay
    setTimeout(() => this.startJob(job.id), 500)

    return job
  }

  private startJob(jobId: number) {
    const job = this.jobs.find((j) => j.id === jobId)
    if (!job || job.status !== "pending") return

    job.status = "running"
    this.persist()
    this.notify()

    // Validate URL format
    if (!isValidUrl(job.target_url)) {
      job.status = "failed"
      job.error_log = "Invalid URL format. Please provide a valid HTTP/HTTPS URL."
      job.finished_at = new Date().toISOString()
      this.persist()
      this.notify()
      return
    }

    // Check if URL is from worldofbooks.com
    if (!isWorldOfBooksUrl(job.target_url)) {
      job.status = "failed"
      job.error_log = "Invalid domain. Only worldofbooks.com URLs are supported."
      job.finished_at = new Date().toISOString()
      this.persist()
      this.notify()
      return
    }

    // Simulate scraping with random duration (5-20 seconds)
    const duration = Math.random() * 15000 + 5000
    const hasError = Math.random() < 0.3 // 30% chance of failure for validation simulation

    const timeout = setTimeout(() => {
      if (hasError) {
        job.status = "failed"
        const errors = [
          "Connection timeout after 10 seconds",
          "Rate limit exceeded",
          "Target URL returned 404 - Page not found",
          "Target URL returned 403 - Access forbidden",
          "Parsing error: Invalid HTML structure",
          "Target URL returned 500 - Internal server error",
        ]
        job.error_log = errors[Math.floor(Math.random() * errors.length)]
      } else {
        job.status = "completed"

        // If target type is product, try to extract and add the book
        if (job.target_type === "product") {
          const bookData = extractBookDataFromUrl(job.target_url)
          if (bookData) {
            const nextProductId = Math.max(...products.map((p) => p.id), 82) + 1
            const newProduct: Product = {
              id: nextProductId,
              source_id: `WOB${String(nextProductId).padStart(3, "0")}`,
              title: bookData.title || "Unknown Book",
              price: bookData.price || 4.99,
              currency: bookData.currency || "GBP",
              image_url: `/placeholder.svg?height=400&width=300&query=${encodeURIComponent(bookData.title || "book cover")}`,
              source_url: bookData.source_url || job.target_url,
              last_scraped_at: bookData.last_scraped_at || new Date().toISOString(),
            }

            // Add to products array
            products.push(newProduct)

            // Add product details
            const newDetail: ProductDetail = {
              product_id: nextProductId,
              description: `A wonderful book titled "${newProduct.title}". This edition is in good condition and ready to be enjoyed.`,
              specs: {
                author: "Various Authors",
                isbn: `978-${Math.floor(Math.random() * 10000000000)}`,
                pages: Math.floor(Math.random() * 400) + 100,
                publisher: "World of Books",
                language: "English",
                published_date: `${Math.floor(Math.random() * 30) + 1990}-01-01`,
              },
              ratings_avg: Math.floor(Math.random() * 2) + 3.5,
              reviews_count: Math.floor(Math.random() * 100) + 10,
            }
            productDetails.push(newDetail)

            // Persist to localStorage
            this.persistProducts([newProduct])
          }
        }
      }
      job.finished_at = new Date().toISOString()
      this.runningJobs.delete(jobId)
      this.persist()
      this.notify()
    }, duration)

    this.runningJobs.set(jobId, timeout)
  }

  deleteJob(jobId: number) {
    const index = this.jobs.findIndex((j) => j.id === jobId)
    if (index !== -1) {
      // Cancel if running
      const timeout = this.runningJobs.get(jobId)
      if (timeout) {
        clearTimeout(timeout)
        this.runningJobs.delete(jobId)
      }
      this.jobs.splice(index, 1)
      this.persist()
      this.notify()
    }
  }

  retryJob(jobId: number) {
    const job = this.jobs.find((j) => j.id === jobId)
    if (!job) return

    job.status = "pending"
    job.started_at = new Date().toISOString()
    job.finished_at = null
    job.error_log = null
    this.persist()
    this.notify()

    setTimeout(() => this.startJob(jobId), 500)
  }
}

let scrapeManagerInstance: ScrapeJobManager | null = null

export function getScrapeManager(): ScrapeJobManager {
  if (typeof window === "undefined") {
    // Server-side: return a dummy manager
    return {
      getJobs: () => [],
      createJob: () => ({}) as ScrapeJob,
      deleteJob: () => {},
      retryJob: () => {},
      subscribe: () => () => {},
    } as ScrapeJobManager
  }

  if (!scrapeManagerInstance) {
    scrapeManagerInstance = new ScrapeJobManager()
  }
  return scrapeManagerInstance
}

export function getScrapedProducts(): Product[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem("scrapedProducts")
  return stored ? JSON.parse(stored) : []
}
