'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface SavedCourse {
  id: string
  title: string
  provider: string
  level: string
  duration: string
  rating: number
  price?: string
  url?: string
  description?: string
  tags?: string[]
  savedAt: Date
}

interface WishlistContextType {
  savedCourses: SavedCourse[]
  addCourse: (course: Omit<SavedCourse, 'id' | 'savedAt'>) => void
  removeCourse: (courseId: string) => void
  isCoursesSaved: (title: string) => boolean
  clearWishlist: () => void
  exportWishlist: () => string
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [savedCourses, setSavedCourses] = useState<SavedCourse[]>([])

  // Initialize from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('wishlist')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setSavedCourses(
          parsed.map((course: any) => ({
            ...course,
            savedAt: new Date(course.savedAt),
          }))
        )
      } catch (error) {
        console.error('Failed to parse wishlist:', error)
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(savedCourses))
  }, [savedCourses])

  const addCourse = (course: Omit<SavedCourse, 'id' | 'savedAt'>) => {
    const newCourse: SavedCourse = {
      ...course,
      id: Date.now().toString(),
      savedAt: new Date(),
    }
    setSavedCourses((prev) => [newCourse, ...prev])
  }

  const removeCourse = (courseId: string) => {
    setSavedCourses((prev) => prev.filter((c) => c.id !== courseId))
  }

  const isCoursesSaved = (title: string) => {
    return savedCourses.some((c) => c.title === title)
  }

  const clearWishlist = () => {
    setSavedCourses([])
  }

  const exportWishlist = () => {
    return JSON.stringify(savedCourses, null, 2)
  }

  return (
    <WishlistContext.Provider
      value={{
        savedCourses,
        addCourse,
        removeCourse,
        isCoursesSaved,
        clearWishlist,
        exportWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}
