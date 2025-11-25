'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

interface SplashScreenProps {
  onGetStarted: () => void
}

export function SplashScreen({ onGetStarted }: SplashScreenProps) {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isSignup, setIsSignup] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { signup, login } = useAuth()

  const handleAuth = async () => {
    try {
      if (isSignup) {
        await signup(email, password, name)
      } else {
        await login(email, password)
      }
      onGetStarted()
    } catch (error) {
      console.error('Auth error:', error)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />
      </div>

      <div className="relative z-10 text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-blue-600/20 p-4 backdrop-blur-sm">
            <Sparkles className="h-12 w-12 text-blue-400" />
          </div>
        </div>

        <h1 className="text-balance bg-gradient-to-r from-white via-blue-200 to-blue-100 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
          Find the Perfect Course
        </h1>

        <p className="mt-6 text-lg text-slate-300">
          Discover personalized online courses with AI-powered recommendations
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            onClick={() => setShowAuthModal(true)}
            className="rounded-lg bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            className="rounded-lg border border-slate-600 px-8 py-3 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-800 p-8">
              <h2 className="mb-6 text-2xl font-bold text-white">
                {isSignup ? 'Create Account' : 'Sign In'}
              </h2>

              <div className="space-y-4">
                {isSignup && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                  />
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <Button
                onClick={handleAuth}
                className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
              >
                {isSignup ? 'Create Account' : 'Sign In'}
              </Button>

              <p className="mt-4 text-center text-sm text-slate-400">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-blue-400 hover:underline"
                >
                  {isSignup ? 'Sign In' : 'Create Account'}
                </button>
              </p>

              <button
                onClick={() => setShowAuthModal(false)}
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
