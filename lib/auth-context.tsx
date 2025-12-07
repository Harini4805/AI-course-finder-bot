"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface UserPreferences {
  educationLevel: "school" | "ug" | "pg" | "professional" | null
  preferredLanguage: string
  interestAreas: string[]
  learningGoals: string[]
  interactionMode: "text" | "voice" | "voice-tts" | null
}

export interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
  profilePhoto?: string // Added profile photo support
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
    const stored = localStorage.getItem("user")
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
      }
    }
    setIsLoading(false)
  }, [])

  const signup = async (email: string, password: string, name: string) => {
    if (!email || !password || !name) {
      throw new Error("All fields are required")
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters")
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    if (existingUsers.find((u: any) => u.email === email)) {
      throw new Error("An account with this email already exists")
    }

    const newUser: UserProfile = {
      id: Date.now().toString(),
      name,
      email,
      preferences: {
        educationLevel: null,
        preferredLanguage: "en",
        interestAreas: [],
        learningGoals: [],
        interactionMode: "text",
      },
      createdAt: new Date(),
    }

    // Save to registered users
    existingUsers.push({ email, password, userId: newUser.id })
    localStorage.setItem("registeredUsers", JSON.stringify(existingUsers))

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error("Email and password are required")
    }

    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    const foundUser = existingUsers.find((u: any) => u.email === email && u.password === password)

    if (!foundUser) {
      throw new Error("Invalid email or password")
    }

    // Try to get existing user data
    const storedUser = localStorage.getItem(`user_${foundUser.userId}`)
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      localStorage.setItem("user", JSON.stringify(parsedUser))
    } else {
      // Create basic user profile for existing account
      const userProfile: UserProfile = {
        id: foundUser.userId,
        name: email.split("@")[0],
        email,
        preferences: {
          educationLevel: "professional",
          preferredLanguage: "en",
          interestAreas: [],
          learningGoals: [],
          interactionMode: "text",
        },
        createdAt: new Date(),
      }
      setUser(userProfile)
      localStorage.setItem("user", JSON.stringify(userProfile))
    }
  }

  const logout = () => {
    if (user) {
      // Save user data before logout
      localStorage.setItem(`user_${user.id}`, JSON.stringify(user))
    }
    setUser(null)
    localStorage.removeItem("user")
  }

  const updatePreferences = (preferences: UserPreferences) => {
    if (user) {
      const updated = { ...user, preferences }
      setUser(updated)
      localStorage.setItem("user", JSON.stringify(updated))
      localStorage.setItem(`user_${user.id}`, JSON.stringify(updated))
    }
  }

  const updateProfile = (profile: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...profile }
      setUser(updated)
      localStorage.setItem("user", JSON.stringify(updated))
      localStorage.setItem(`user_${user.id}`, JSON.stringify(updated))
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
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
