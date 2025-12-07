"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Eye, EyeOff, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

interface SplashScreenProps {
  onGetStarted: () => void
}

export function SplashScreen({ onGetStarted }: SplashScreenProps) {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isSignup, setIsSignup] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signup, login } = useAuth()

  const validateForm = () => {
    setError("")

    if (!email.trim()) {
      setError("Email is required")
      return false
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address")
      return false
    }

    if (!password) {
      setError("Password is required")
      return false
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return false
    }

    if (isSignup) {
      if (!name.trim()) {
        setError("Name is required")
        return false
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match")
        return false
      }
    }

    return true
  }

  const handleAuth = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    setError("")

    try {
      if (isSignup) {
        await signup(email, password, name)
      } else {
        await login(email, password)
      }
      onGetStarted()
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const switchMode = () => {
    setIsSignup(!isSignup)
    setError("")
    setPassword("")
    setConfirmPassword("")
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-blue-600/20 p-4 backdrop-blur-sm">
            <Sparkles className="h-12 w-12 text-blue-400" />
          </div>
        </div>

        <h1 className="text-balance bg-gradient-to-r from-white via-blue-200 to-blue-100 bg-clip-text text-4xl sm:text-5xl md:text-6xl font-bold text-transparent">
          Find the Perfect Course
        </h1>

        <p className="mt-6 text-lg text-slate-300 max-w-md mx-auto">
          Discover personalized online courses with AI-powered recommendations for JEE, NEET, UPSC, Programming & more
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            onClick={() => {
              setIsSignup(true)
              setShowAuthModal(true)
            }}
            className="rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            className="rounded-lg border border-slate-600 px-8 py-3 text-slate-300 hover:border-slate-500 hover:bg-slate-800 bg-transparent"
            onClick={() => {
              setIsSignup(false)
              setShowAuthModal(true)
            }}
          >
            Sign In
          </Button>
        </div>

        {/* Auth Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800 p-8">
              <h2 className="mb-6 text-2xl font-bold text-white">{isSignup ? "Create Account" : "Welcome Back"}</h2>

              {error && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-900/30 px-4 py-3 text-sm text-red-300">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-4">
                {isSignup && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 pr-10 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {isSignup && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Confirm Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              <Button
                onClick={handleAuth}
                disabled={isLoading}
                className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? "Please wait..." : isSignup ? "Create Account" : "Sign In"}
              </Button>

              <p className="mt-4 text-center text-sm text-slate-400">
                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                <button onClick={switchMode} className="text-blue-400 hover:underline">
                  {isSignup ? "Sign In" : "Create Account"}
                </button>
              </p>

              <button
                onClick={() => {
                  setShowAuthModal(false)
                  setError("")
                }}
                className="mt-4 w-full text-slate-400 hover:text-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
