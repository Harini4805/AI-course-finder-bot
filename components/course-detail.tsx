'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Heart, Share2, ExternalLink, Star, Clock, BarChart3 } from 'lucide-react'

interface CourseDetailProps {
  course: any
  onBack: () => void
  onAddToWishlist?: (course: any) => void
  isInWishlist?: boolean
}

export function CourseDetail({ course, onBack, onAddToWishlist, isInWishlist = false }: CourseDetailProps) {
  const [isSaved, setIsSaved] = useState(isInWishlist)

  const handleSaveClick = () => {
    setIsSaved(!isSaved)
    onAddToWishlist?.(course)
  }

  const handleShare = () => {
    const text = `Check out this course: ${course.title} on ${course.provider}`
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: text,
        url: course.url || window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${course.title}\n${course.url || ''}`)
      alert('Course link copied to clipboard!')
    }
  }

  // Alternative courses (mock data)
  const alternativeCourses = [
    {
      title: 'Similar Coursera course',
      provider: 'Coursera',
      price: '$39/month',
      level: 'Intermediate',
      rating: 4.7,
    },
    {
      title: 'Cheaper Udemy version',
      provider: 'Udemy',
      price: '$14.99',
      level: 'Beginner',
      rating: 4.5,
    },
    {
      title: 'Free alternative',
      provider: 'YouTube',
      price: 'Free',
      level: 'Beginner',
      rating: 4.3,
    },
  ]

  const skillOutcomes = [
    'Master core concepts',
    'Build real projects',
    'Industry best practices',
    'Career-ready skills',
  ]

  const courseSyllabus = [
    'Module 1: Introduction & Fundamentals',
    'Module 2: Core Concepts & Theory',
    'Module 3: Practical Implementation',
    'Module 4: Advanced Topics',
    'Module 5: Capstone Project',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl">
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white">{course.title}</h1>
              <p className="mt-2 text-slate-400">{course.provider}</p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleShare}
                variant="outline"
                size="icon"
                className="border-slate-600"
              >
                <Share2 className="h-5 w-5" />
              </Button>
              <Button
                onClick={handleSaveClick}
                className={isSaved ? 'bg-red-600 hover:bg-red-700' : 'border-slate-600'}
                variant={isSaved ? 'default' : 'outline'}
              >
                <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <Card className="border-slate-700 bg-slate-800 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">Course Overview</h2>
              <p className="mb-6 text-slate-300">{course.description}</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-700/50 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <BarChart3 className="h-5 w-5" />
                    <span className="text-sm">Level</span>
                  </div>
                  <p className="mt-2 font-semibold text-white">{course.level}</p>
                </div>
                <div className="rounded-lg bg-slate-700/50 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="h-5 w-5" />
                    <span className="text-sm">Duration</span>
                  </div>
                  <p className="mt-2 font-semibold text-white">{course.duration}</p>
                </div>
                <div className="rounded-lg bg-slate-700/50 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Star className="h-5 w-5" />
                    <span className="text-sm">Rating</span>
                  </div>
                  <p className="mt-2 font-semibold text-white">{course.rating}/5.0</p>
                </div>
                <div className="rounded-lg bg-slate-700/50 p-4">
                  <div className="text-slate-400 text-sm">Price</div>
                  <p className="mt-2 font-semibold text-white">{course.price || 'Contact'}</p>
                </div>
              </div>
            </Card>

            {/* What You'll Learn */}
            <Card className="border-slate-700 bg-slate-800 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">What You Will Learn</h2>
              <ul className="space-y-3">
                {skillOutcomes.map((skill, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Curriculum */}
            <Card className="border-slate-700 bg-slate-800 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">Course Curriculum</h2>
              <div className="space-y-2">
                {courseSyllabus.map((module, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-slate-700 bg-slate-700/30 p-4 hover:bg-slate-700/50 transition"
                  >
                    <p className="text-white">{module}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Instructor Info */}
            <Card className="border-slate-700 bg-slate-800 p-6">
              <h2 className="mb-4 text-xl font-bold text-white">About the Instructor</h2>
              <div className="space-y-4">
                <p className="text-slate-300">
                  Experienced instructor with over 10 years in the industry. Passionate about teaching practical skills and best practices.
                </p>
                <div className="space-y-2 text-sm">
                  <p><span className="text-slate-400">Experience:</span> <span className="text-white">10+ years</span></p>
                  <p><span className="text-slate-400">Students:</span> <span className="text-white">50,000+</span></p>
                  <p><span className="text-slate-400">Rating:</span> <span className="text-white">4.8/5.0</span></p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <Card className="border-slate-700 bg-slate-800 p-6 sticky top-4">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 mb-3">
                <a href={course.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  Enroll Now
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <p className="text-center text-sm text-slate-400">
                {course.price && `${course.price}`}
              </p>
            </Card>

            {/* Alternative Courses */}
            <Card className="border-slate-700 bg-slate-800 p-6">
              <h3 className="mb-4 font-bold text-white">Recommended Alternatives</h3>
              <div className="space-y-3">
                {alternativeCourses.map((alt, idx) => (
                  <div key={idx} className="rounded-lg border border-slate-700 bg-slate-700/30 p-3 hover:bg-slate-700/50 transition cursor-pointer">
                    <p className="font-medium text-white text-sm">{alt.title}</p>
                    <p className="text-xs text-slate-400 mt-1">{alt.provider}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-slate-400">{alt.price}</span>
                      <span className="flex items-center gap-1 text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {alt.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tags */}
            {course.tags && (
              <Card className="border-slate-700 bg-slate-800 p-6">
                <h3 className="mb-3 font-bold text-white">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="rounded-full bg-blue-600/20 px-3 py-1 text-xs text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
