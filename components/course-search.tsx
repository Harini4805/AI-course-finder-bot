"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CourseCard } from "./course-card"
import { ArrowLeft, Search, X } from "lucide-react"

interface Course {
  title: string
  provider: string
  level: string
  duration: string
  rating: number
  price?: string
  url?: string
  description?: string
  tags?: string[]
}

interface CourseSearchProps {
  onBack: () => void
}

const CATEGORIES = ["All", "JEE", "NEET", "UPSC", "Python", "JavaScript", "React", "Java", "UI/UX", "AI/ML", "Node.js"]

export function CourseSearch({ onBack }: CourseSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceFilter, setPriceFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")

  useEffect(() => {
    loadCourses("")
  }, [])

  const loadCourses = async (query: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/search-courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })
      const data = await response.json()
      setCourses(data.courses || [])
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    loadCourses(searchQuery || selectedCategory)
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    loadCourses(category === "All" ? "" : category)
  }

  const filteredCourses = courses.filter((c) => {
    if (priceFilter === "free" && !c.price?.toLowerCase().includes("free")) return false
    if (priceFilter === "paid" && c.price?.toLowerCase().includes("free")) return false
    if (levelFilter !== "all" && c.level.toLowerCase() !== levelFilter) return false
    return true
  })

  const clearFilters = () => {
    setPriceFilter("all")
    setLevelFilter("all")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 px-4 py-4">
        <div className="mx-auto max-w-5xl">
          <button onClick={onBack} className="mb-3 flex items-center gap-2 text-slate-400 hover:text-white text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-white">Browse Courses</h1>
        </div>
      </div>

      {/* Search */}
      <div className="border-b border-slate-700 bg-slate-900/30 px-4 py-4">
        <div className="mx-auto max-w-5xl space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search courses..."
                className="w-full rounded-lg border border-slate-600 bg-slate-800 pl-9 pr-4 py-2.5 text-white text-sm placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700" size="sm">
              Search
            </Button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  selectedCategory === cat ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Filters */}
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Price:</span>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="rounded border border-slate-600 bg-slate-800 px-2 py-1 text-xs text-white"
              >
                <option value="all">All</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Level:</span>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="rounded border border-slate-600 bg-slate-800 px-2 py-1 text-xs text-white"
              >
                <option value="all">All</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            {(priceFilter !== "all" || levelFilter !== "all") && (
              <button onClick={clearFilters} className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                <X className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-5xl px-4 py-6">
        <p className="text-sm text-slate-400 mb-4">{filteredCourses.length} courses found</p>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-blue-600" />
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course, idx) => (
              <CourseCard key={idx} course={course} />
            ))}
          </div>
        ) : (
          <Card className="border-slate-700 bg-slate-800 p-8 text-center">
            <p className="text-slate-400 mb-3">No courses match your filters.</p>
            <Button onClick={clearFilters} variant="outline" size="sm" className="border-slate-600 bg-transparent">
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
