'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface UserPreferences {
  educationLevel: 'school' | 'ug' | 'pg' | 'professional' | null
  preferredLanguage: string
  interestAreas: string[]
  learningGoals: string[]
  interactionMode: 'text' | 'voice' | 'voice-tts' | null
}

export interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
  preferences: UserPreferences
  createdAt: Date
}

interface AuthContextType {
  user: UserProfile | null
  isAuthenticated: boolean
  isLoading: boolean
  signup: (email: string, password: string, name: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  updatePreferences: (preferences: UserPreferences) => void
  updateProfile: (profile: Partial<UserProfile>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (error) {
        console.error('Failed to parse stored user:', error)
      }
    }
    setIsLoading(false)
  }, [])

  const signup = async (email: string, password: string, name: string) => {
    // Mock signup - in production, call your API
    const newUser: UserProfile = {
      id: Date.now().toString(),
      name,
      email,
      preferences: {
        educationLevel: null,
        preferredLanguage: 'en',
        interestAreas: [],
        learningGoals: [],
        interactionMode: null,
      },
      createdAt: new Date(),
    }
    setUser(newUser)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const login = async (email: string, password: string) => {
    // Mock login - in production, call your API
    const mockUser: UserProfile = {
      id: '1',
      name: 'User',
      email,
      preferences: {
        educationLevel: 'professional',
        preferredLanguage: 'en',
        interestAreas: ['AI', 'Web Development'],
        learningGoals: ['Get a job'],
        interactionMode: 'text',
      },
      createdAt: new Date(),
    }
    setUser(mockUser)
    localStorage.setItem('user', JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updatePreferences = (preferences: UserPreferences) => {
    if (user) {
      const updated = { ...user, preferences }
      setUser(updated)
      localStorage.setItem('user', JSON.stringify(updated))
    }
  }

  const updateProfile = (profile: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...profile }
      setUser(updated)
      localStorage.setItem('user', JSON.stringify(updated))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signup,
        login,
        logout,
        updatePreferences,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
