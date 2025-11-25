"use client"

import { useProgress } from "@/lib/progress-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Clock } from "lucide-react"

interface CourseProgressProps {
  onBack: () => void
}

export function CourseProgress({ onBack }: CourseProgressProps) {
  const { enrolledCourses, completeModule, updateProgress } = useProgress()

  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return "bg-green-600"
    if (percentage >= 50) return "bg-blue-600"
    if (percentage >= 25) return "bg-yellow-600"
    return "bg-slate-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl">
          <button onClick={onBack} className="mb-4 flex items-center gap-2 text-slate-400 hover:text-white">
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-white">My Learning Progress</h1>
          <p className="text-slate-400 mt-2">Track your course completion</p>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        {enrolledCourses.length > 0 ? (
          <div className="space-y-4">
            {enrolledCourses.map((course) => (
              <Card key={course.courseId} className="border-slate-700 bg-slate-800 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white text-lg">{course.courseTitle}</h3>
                    <p className="text-sm text-slate-400">{course.provider}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{course.completionPercentage}%</div>
                    <p className="text-xs text-slate-400">Complete</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getProgressColor(course.completionPercentage)} transition-all duration-500`}
                      style={{
                        width: `${course.completionPercentage}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Module Progress */}
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm">
                      {course.modulesCompleted} of {course.totalModules} modules
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <Clock className="h-4 w-4" />
                    Last accessed: {new Date(course.lastAccessedDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Status Badge and Action */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      course.status === "completed"
                        ? "bg-green-600/20 text-green-300"
                        : course.status === "in-progress"
                          ? "bg-blue-600/20 text-blue-300"
                          : "bg-slate-600/20 text-slate-300"
                    }`}
                  >
                    {course.status.replace("-", " ").charAt(0).toUpperCase() +
                      course.status.replace("-", " ").slice(1).toLowerCase()}
                  </span>
                  {course.status !== "completed" && (
                    <Button
                      onClick={() => completeModule(course.courseId)}
                      className="bg-blue-600 hover:bg-blue-700 text-sm"
                    >
                      Complete Module
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-slate-700 bg-slate-800 p-12 text-center">
            <p className="text-slate-400 mb-4">You haven't enrolled in any courses yet</p>
            <p className="text-slate-500 text-sm">Find and enroll in courses to start tracking your progress</p>
          </Card>
        )}
      </div>
    </div>
  )
}
