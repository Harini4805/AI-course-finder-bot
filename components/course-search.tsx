'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CourseCard } from './course-card'
import { ArrowLeft, Filter, X } from 'lucide-react'

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
  initialSearchQuery?: string
}

const PROVIDERS = ['Coursera', 'Udemy', 'edX', 'LinkedIn Learning', 'Skillshare']
const LEVELS = ['Beginner', 'Intermediate', 'Advanced']
const CATEGORIES = ['Web Development', 'Python', 'Data Science', 'AI & ML', 'Design', 'Finance']

export function CourseSearch({ onBack, initialSearchQuery = '' }: CourseSearchProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  // Filter state
  const [selectedProviders, setSelectedProviders] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [priceFilter, setPriceFilter] = useState('all') // all, free, paid

  // Search courses
  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    try {
      // Call API to search courses using Gemini
      const response = await fetch('/api/search-courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      })

      const data = await response.json()
      setCourses(data.courses || [])
      setFilteredCourses(data.courses || [])
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Apply filters
  useEffect(() => {
    let filtered = courses

    // Provider filter
    if (selectedProviders.length > 0) {
      filtered = filtered.filter((c) =>
        selectedProviders.some((p) => c.provider.includes(p))
      )
    }

    // Level filter
    if (selectedLevels.length > 0) {
      filtered = filtered.filter((c) => selectedLevels.includes(c.level))
    }

    // Price filter
    if (priceFilter === 'free') {
      filtered = filtered.filter(
        (c) => c.price && (c.price.includes('Free') || c.price.includes('free'))
      )
    } else if (priceFilter === 'paid') {
      filtered = filtered.filter(
        (c) => c.price && !c.price.includes('Free') && !c.price.includes('free')
      )
    }

    setFilteredCourses(filtered)
  }, [courses, selectedProviders, selectedLevels, priceFilter])

  const toggleProvider = (provider: string) => {
    setSelectedProviders((prev) =>
      prev.includes(provider)
        ? prev.filter((p) => p !== provider)
        : [...prev, provider]
    )
  }

  const toggleLevel = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level)
        ? prev.filter((l) => l !== level)
        : [...prev, level]
    )
  }

  const clearFilters = () => {
    setSelectedProviders([])
    setSelectedLevels([])
    setPriceFilter('all')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl">
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Chat
          </button>
          <h1 className="text-3xl font-bold text-white">Course Search</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="border-b border-slate-700 bg-slate-900/30 px-4 py-6 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for courses, skills, or topics..."
              className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="border-slate-600"
            >
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="md:col-span-1">
              <Card className="border-slate-700 bg-slate-800 p-4 sticky top-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold text-white">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-xs text-blue-400 hover:underline"
                  >
                    Clear
                  </button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-semibold text-slate-300">
                    Category
                  </h4>
                  <div className="space-y-2">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full rounded px-3 py-2 text-left text-sm transition ${
                          selectedCategory === category
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Provider Filter */}
                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-semibold text-slate-300">
                    Platform
                  </h4>
                  <div className="space-y-2">
                    {PROVIDERS.map((provider) => (
                      <label
                        key={provider}
                        className="flex items-center gap-2 text-sm text-slate-300"
                      >
                        <input
                          type="checkbox"
                          checked={selectedProviders.includes(provider)}
                          onChange={() => toggleProvider(provider)}
                          className="rounded"
                        />
                        {provider}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Level Filter */}
                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-semibold text-slate-300">
                    Level
                  </h4>
                  <div className="space-y-2">
                    {LEVELS.map((level) => (
                      <label
                        key={level}
                        className="flex items-center gap-2 text-sm text-slate-300"
                      >
                        <input
                          type="checkbox"
                          checked={selectedLevels.includes(level)}
                          onChange={() => toggleLevel(level)}
                          className="rounded"
                        />
                        {level}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-slate-300">
                    Price
                  </h4>
                  <div className="space-y-2">
                    {[
                      { id: 'all', label: 'All Prices' },
                      { id: 'free', label: 'Free' },
                      { id: 'paid', label: 'Paid' },
                    ].map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center gap-2 text-sm text-slate-300"
                      >
                        <input
                          type="radio"
                          name="price"
                          value={option.id}
                          checked={priceFilter === option.id}
                          onChange={() => setPriceFilter(option.id)}
                          className="rounded"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Results */}
          <div className={showFilters ? 'md:col-span-3' : 'md:col-span-4'}>
            {/* Results Summary */}
            {searchQuery && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Showing {filteredCourses.length} course
                  {filteredCourses.length !== 1 ? 's' : ''} for "{searchQuery}"
                </h2>
                <p className="text-sm text-slate-400">
                  {selectedProviders.length > 0 && `Filtered by: ${selectedProviders.join(', ')}`}
                </p>
              </div>
            )}

            {/* Courses Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-blue-600 mx-auto" />
                  <p className="text-slate-400">Searching for courses...</p>
                </div>
              </div>
            ) : filteredCourses.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course, idx) => (
                  <CourseCard key={idx} course={course} />
                ))}
              </div>
            ) : searchQuery ? (
              <Card className="border-slate-700 bg-slate-800 p-12 text-center">
                <p className="text-slate-400">
                  No courses found for "{searchQuery}". Try adjusting your search or filters.
                </p>
              </Card>
            ) : (
              <Card className="border-slate-700 bg-slate-800 p-12 text-center">
                <p className="text-slate-400">
                  Enter a search query to find courses
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
