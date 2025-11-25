'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useWishlist } from '@/lib/wishlist-context'
import { ArrowLeft, Trash2, Download, Filter, Heart } from 'lucide-react'
import { CourseCard } from './course-card'

interface WishlistPageProps {
  onBack: () => void
}

export function WishlistPage({ onBack }: WishlistPageProps) {
  const { savedCourses, removeCourse, clearWishlist, exportWishlist } = useWishlist()
  const [sortBy, setSortBy] = useState('recent') // recent, alphabetical, rating
  const [filterProvider, setFilterProvider] = useState<string | null>(null)
  const [filterLevel, setFilterLevel] = useState<string | null>(null)

  const sortedCourses = [...savedCourses].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.title.localeCompare(b.title)
      case 'rating':
        return b.rating - a.rating
      case 'recent':
      default:
        return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
    }
  })

  const filteredCourses = sortedCourses.filter((course) => {
    if (filterProvider && course.provider !== filterProvider) return false
    if (filterLevel && course.level !== filterLevel) return false
    return true
  })

  const providers = [...new Set(savedCourses.map((c) => c.provider))]
  const levels = [...new Set(savedCourses.map((c) => c.level))]

  const handleExport = () => {
    const data = exportWishlist()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'wishlist.json'
    a.click()
    URL.revokeObjectURL(url)
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
            Back
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                <Heart className="h-8 w-8 text-red-500 fill-red-500" />
                My Wishlist
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                {savedCourses.length} course{savedCourses.length !== 1 ? 's' : ''} saved
              </p>
            </div>
            {savedCourses.length > 0 && (
              <div className="flex gap-2">
                <Button
                  onClick={handleExport}
                  variant="outline"
                  className="border-slate-600"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button
                  onClick={() => {
                    if (confirm('Clear all saved courses?')) {
                      clearWishlist()
                    }
                  }}
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {savedCourses.length === 0 ? (
          <Card className="border-slate-700 bg-slate-800 p-12 text-center">
            <Heart className="h-12 w-12 mx-auto text-slate-600 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">No Saved Courses Yet</h2>
            <p className="text-slate-400">
              Save courses to your wishlist to keep track of courses you want to take later.
            </p>
          </Card>
        ) : (
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar Filters */}
            <div>
              <Card className="border-slate-700 bg-slate-800 p-4 sticky top-4">
                <h3 className="mb-4 font-bold text-white flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </h3>

                {/* Sort */}
                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-semibold text-slate-300">Sort By</h4>
                  <div className="space-y-2">
                    {[
                      { id: 'recent', label: 'Recently Added' },
                      { id: 'alphabetical', label: 'Alphabetical' },
                      { id: 'rating', label: 'Rating (High to Low)' },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setSortBy(option.id)}
                        className={`w-full rounded px-3 py-2 text-left text-sm transition ${
                          sortBy === option.id
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Provider Filter */}
                {providers.length > 0 && (
                  <div className="mb-6">
                    <h4 className="mb-3 text-sm font-semibold text-slate-300">Platform</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => setFilterProvider(null)}
                        className={`w-full rounded px-3 py-2 text-left text-sm transition ${
                          filterProvider === null
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        All Platforms
                      </button>
                      {providers.map((provider) => (
                        <button
                          key={provider}
                          onClick={() => setFilterProvider(provider)}
                          className={`w-full rounded px-3 py-2 text-left text-sm transition ${
                            filterProvider === provider
                              ? 'bg-blue-600 text-white'
                              : 'text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {provider}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Level Filter */}
                {levels.length > 0 && (
                  <div>
                    <h4 className="mb-3 text-sm font-semibold text-slate-300">Level</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => setFilterLevel(null)}
                        className={`w-full rounded px-3 py-2 text-left text-sm transition ${
                          filterLevel === null
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        All Levels
                      </button>
                      {levels.map((level) => (
                        <button
                          key={level}
                          onClick={() => setFilterLevel(level)}
                          className={`w-full rounded px-3 py-2 text-left text-sm transition ${
                            filterLevel === level
                              ? 'bg-blue-600 text-white'
                              : 'text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Courses Grid */}
            <div className="lg:col-span-3">
              {filteredCourses.length === 0 ? (
                <Card className="border-slate-700 bg-slate-800 p-8 text-center">
                  <p className="text-slate-400">
                    No courses match your filters. Try adjusting them.
                  </p>
                </Card>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredCourses.map((course) => (
                    <div key={course.id} className="relative group">
                      <CourseCard
                        course={{
                          title: course.title,
                          provider: course.provider,
                          level: course.level,
                          duration: course.duration,
                          rating: course.rating,
                          description: course.description,
                          url: course.url,
                        }}
                      />
                      <button
                        onClick={() => removeCourse(course.id)}
                        className="absolute top-2 right-2 rounded-full bg-red-600 p-2 text-white opacity-0 group-hover:opacity-100 transition"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="absolute top-2 left-2 rounded-full bg-red-600 px-2 py-1 text-xs text-white flex items-center gap-1">
                        <Heart className="h-3 w-3 fill-current" />
                        Saved
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
