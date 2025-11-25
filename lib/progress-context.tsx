"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface CourseProgress {
  courseId: string
  courseTitle: string
  provider: string
  enrollmentDate: Date
  completionPercentage: number
  modulesCompleted: number
  totalModules: number
  lastAccessedDate: Date
  status: "in-progress" | "completed" | "not-started"
}

interface ProgressContextType {
  enrolledCourses: CourseProgress[]
  updateProgress: (courseId: string, percentage: number) => void
  enrollCourse: (course: any) => void
  getCourseProgress: (courseId: string) => CourseProgress | undefined
  completeModule: (courseId: string) => void
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [enrolledCourses, setEnrolledCourses] = useState<CourseProgress[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("courseProgress")
    if (stored) {
      setEnrolledCourses(JSON.parse(stored))
    }
  }, [])

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem("courseProgress", JSON.stringify(enrolledCourses))
  }, [enrolledCourses])

  const enrollCourse = (course: any) => {
    const newEnrollment: CourseProgress = {
      courseId: course.title + Date.now(),
      courseTitle: course.title,
      provider: course.provider,
      enrollmentDate: new Date(),
      completionPercentage: 0,
      modulesCompleted: 0,
      totalModules: 4, // Default module count
      lastAccessedDate: new Date(),
      status: "not-started",
    }

    setEnrolledCourses((prev) => {
      const exists = prev.find((c) => c.courseTitle === course.title)
      if (exists) return prev
      return [...prev, newEnrollment]
    })
  }

  const updateProgress = (courseId: string, percentage: number) => {
    setEnrolledCourses((prev) =>
      prev.map((course) =>
        course.courseId === courseId
          ? {
              ...course,
              completionPercentage: Math.min(100, percentage),
              lastAccessedDate: new Date(),
              status: percentage >= 100 ? "completed" : "in-progress",
            }
          : course,
      ),
    )
  }

  const completeModule = (courseId: string) => {
    setEnrolledCourses((prev) =>
      prev.map((course) => {
        if (course.courseId === courseId) {
          const newModulesCompleted = course.modulesCompleted + 1
          const newPercentage = Math.round((newModulesCompleted / course.totalModules) * 100)
          return {
            ...course,
            modulesCompleted: newModulesCompleted,
            completionPercentage: newPercentage,
            status: newPercentage >= 100 ? "completed" : "in-progress",
            lastAccessedDate: new Date(),
          }
        }
        return course
      }),
    )
  }

  const getCourseProgress = (courseId: string) => {
    return enrolledCourses.find((c) => c.courseId === courseId)
  }

  return (
    <ProgressContext.Provider
      value={{
        enrolledCourses,
        updateProgress,
        enrollCourse,
        getCourseProgress,
        completeModule,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider")
  }
  return context
}
