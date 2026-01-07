"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getScrapeManager } from "@/lib/scrape-manager"
import type { ScrapeJob } from "@/lib/data"
import { Database, Clock, CheckCircle2, XCircle, Loader2, Plus, Trash2, RefreshCw } from "lucide-react"

const statusConfig = {
  pending: { icon: Clock, color: "bg-yellow-500 text-white", label: "Pending" },
  running: { icon: Loader2, color: "bg-blue-500 text-white", label: "Running" },
  completed: { icon: CheckCircle2, color: "bg-green-500 text-white", label: "Completed" },
  failed: { icon: XCircle, color: "bg-red-500 text-white", label: "Failed" },
}

const targetTypes = [
  { value: "category", label: "Category" },
  { value: "product", label: "Product" },
  { value: "review", label: "Review" },
]

export default function ScrapeJobsPage() {
  const [jobs, setJobs] = useState<ScrapeJob[]>([])
  const [targetUrl, setTargetUrl] = useState("")
  const [targetType, setTargetType] = useState("category")
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const manager = getScrapeManager()
    setJobs(manager.getJobs())

    const unsubscribe = manager.subscribe(() => {
      setJobs(manager.getJobs())
    })

    return unsubscribe
  }, [])

  const handleCreateJob = () => {
    if (!targetUrl.trim()) return

    const manager = getScrapeManager()
    manager.createJob(targetUrl, targetType)
    setTargetUrl("")
    setShowForm(false)
  }

  const handleDeleteJob = (jobId: number) => {
    const manager = getScrapeManager()
    manager.deleteJob(jobId)
  }

  const handleRetryJob = (jobId: number) => {
    const manager = getScrapeManager()
    manager.retryJob(jobId)
  }

  const runningCount = jobs.filter((j) => j.status === "running").length
  const completedCount = jobs.filter((j) => j.status === "completed").length
  const failedCount = jobs.filter((j) => j.status === "failed").length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Database className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Scrape Jobs</h1>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            New Job
          </Button>
        </div>
        <p className="text-muted-foreground mb-4">Track data collection and scraping operations</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{jobs.length}</div>
              <div className="text-sm text-muted-foreground">Total Jobs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-500">{runningCount}</div>
              <div className="text-sm text-muted-foreground">Running</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-500">{completedCount}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-500">{failedCount}</div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </CardContent>
          </Card>
        </div>

        {/* Create Job Form */}
        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Scrape Job</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="target-url">Target URL</Label>
                  <Input
                    id="target-url"
                    placeholder="https://worldofbooks.com/category/fiction"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="target-type">Target Type</Label>
                  <select
                    id="target-type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={targetType}
                    onChange={(e) => setTargetType(e.target.value)}
                  >
                    {targetTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleCreateJob}>Create Job</Button>
                  <Button variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Jobs List */}
      <div className="grid gap-4">
        {jobs.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No scrape jobs yet. Click "New Job" to create one.
            </CardContent>
          </Card>
        )}
        {jobs.map((job) => {
          const config = statusConfig[job.status]
          const StatusIcon = config.icon

          return (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{job.target_url}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline">{job.target_type}</Badge>
                      <span>Job #{job.id}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={config.color}>
                      <StatusIcon className={`h-3 w-3 mr-1 ${job.status === "running" ? "animate-spin" : ""}`} />
                      {config.label}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground mb-1">Started</p>
                    <p className="font-medium">{new Date(job.started_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Finished</p>
                    <p className="font-medium">
                      {job.finished_at ? new Date(job.finished_at).toLocaleString() : "In progress"}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Duration</p>
                    <p className="font-medium">
                      {job.finished_at
                        ? `${Math.round((new Date(job.finished_at).getTime() - new Date(job.started_at).getTime()) / 1000)} sec`
                        : job.status === "running"
                          ? "Running..."
                          : "Pending..."}
                    </p>
                  </div>
                </div>
                {job.error_log && (
                  <div className="mb-4 p-3 bg-destructive/10 rounded-md">
                    <p className="text-sm font-medium text-destructive mb-1">Error Log:</p>
                    <p className="text-sm text-muted-foreground">{job.error_log}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  {job.status === "failed" && (
                    <Button size="sm" variant="outline" onClick={() => handleRetryJob(job.id)}>
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Retry
                    </Button>
                  )}
                  {job.status !== "running" && (
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteJob(job.id)}>
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
