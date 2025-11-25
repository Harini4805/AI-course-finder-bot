'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, X, Check } from 'lucide-react'

interface Course {
  title: string
  provider: string
  level: string
  duration: string
  rating: number
  price?: string
  description?: string
  url?: string
}

interface CourseComparisonProps {
  onBack: () => void
  initialCourses?: Course[]
}

export function CourseComparison({ onBack, initialCourses = [] }: CourseComparisonProps) {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>(initialCourses)
  const [allCourses] = useState<Course[]>([
    {
      title: 'The Complete JavaScript Course',
      provider: 'Udemy',
      level: 'Beginner',
      duration: '69 hours',
      rating: 4.7,
      price: '$14.99',
      description: 'Learn JavaScript from scratch',
    },
    {
      title: 'React - The Complete Guide',
      provider: 'Udemy',
      level: 'Intermediate',
      duration: '48 hours',
      rating: 4.8,
      price: '$14.99',
      description: 'Master React and Redux',
    },
    {
      title: 'Full Stack Web Development',
      provider: 'Coursera',
      level: 'Intermediate',
      duration: '6 months',
      rating: 4.7,
      price: '$39/month',
      description: 'Learn full-stack development',
    },
  ])

  const comparisonMetrics = [
    { label: 'Price', key: 'price' },
    { label: 'Duration', key: 'duration' },
    { label: 'Level', key: 'level' },
    { label: 'Rating', key: 'rating' },
    { label: 'Provider', key: 'provider' },
    { label: 'Description', key: 'description' },
  ]

  const toggleCourse = (course: Course) => {
    if (selectedCourses.some((c) => c.title === course.title)) {
      setSelectedCourses(selectedCourses.filter((c) => c.title !== course.title))
    } else if (selectedCourses.length < 4) {
      setSelectedCourses([...selectedCourses, course])
    }
  }

  const removeCourse = (course: Course) => {
    setSelectedCourses(selectedCourses.filter((c) => c.title !== course.title))
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
          <h1 className="text-3xl font-bold text-white">Compare Courses</h1>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Course Selector */}
          <div>
            <Card className="border-slate-700 bg-slate-800 p-4 sticky top-4">
              <h2 className="mb-4 font-bold text-white">Select Courses to Compare</h2>
              <p className="mb-4 text-sm text-slate-400">
                Choose up to 4 courses to compare side by side
              </p>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {allCourses.map((course, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleCourse(course)}
                    disabled={
                      selectedCourses.length >= 4 &&
                      !selectedCourses.some((c) => c.title === course.title)
                    }
                    className={`w-full rounded-lg border-2 px-3 py-2 text-left text-sm transition ${
                      selectedCourses.some((c) => c.title === course.title)
                        ? 'border-blue-600 bg-blue-600/20 text-white'
                        : 'border-slate-600 text-slate-300 hover:border-slate-500'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <p className="font-medium line-clamp-2">{course.title}</p>
                    <p className="text-xs text-slate-400 mt-1">{course.provider}</p>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Comparison Table */}
          <div className="lg:col-span-3">
            {selectedCourses.length === 0 ? (
              <Card className="border-slate-700 bg-slate-800 p-12 text-center">
                <p className="text-slate-400">
                  Select courses from the left panel to start comparing
                </p>
              </Card>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {/* Course Header Row */}
                    <tr>
                      <td className="w-32 bg-slate-900 p-4 border-b border-slate-700" />
                      {selectedCourses.map((course, idx) => (
                        <td
                          key={idx}
                          className="bg-slate-800 p-4 border-b border-slate-700 border-l border-slate-700 relative"
                        >
                          <button
                            onClick={() => removeCourse(course)}
                            className="absolute top-2 right-2 text-slate-400 hover:text-white"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <h3 className="font-bold text-white text-sm pr-6">{course.title}</h3>
                        </td>
                      ))}
                    </tr>

                    {/* Comparison Rows */}
                    {comparisonMetrics.map((metric, metricIdx) => (
                      <tr key={metricIdx} className={metricIdx % 2 === 0 ? 'bg-slate-900/50' : ''}>
                        <td className="bg-slate-900 p-4 border-b border-slate-700 font-semibold text-slate-300 text-sm">
                          {metric.label}
                        </td>
                        {selectedCourses.map((course, courseIdx) => (
                          <td
                            key={courseIdx}
                            className="p-4 border-b border-slate-700 border-l border-slate-700 text-white text-sm"
                          >
                            {metric.key === 'rating' ? (
                              <div className="flex items-center gap-1">
                                {course[metric.key as keyof Course]}
                                <span className="text-yellow-400">★</span>
                              </div>
                            ) : (
                              String(course[metric.key as keyof Course] || '-')
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}

                    {/* Action Row */}
                    <tr>
                      <td className="bg-slate-900 p-4 border-t border-slate-700" />
                      {selectedCourses.map((course, idx) => (
                        <td
                          key={idx}
                          className="p-4 border-t border-slate-700 border-l border-slate-700"
                        >
                          <Button
                            asChild
                            className="w-full bg-blue-600 hover:bg-blue-700 text-sm"
                          >
                            <a href={course.url || '#'} target="_blank" rel="noopener noreferrer">
                              Enroll
                            </a>
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
