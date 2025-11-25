'use client'

import { useState, useEffect } from 'react'
import { SplashScreen } from '@/components/splash-screen'
import { OnboardingFlow } from '@/components/onboarding-flow'
import { ChatInterface } from '@/components/chat-interface'
import { useAuth } from '@/lib/auth-context'

export default function Home() {
  const { isAuthenticated, user, isLoading } = useAuth()
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    if (isAuthenticated && !user?.preferences.educationLevel && !isLoading) {
      setShowOnboarding(true)
    }
  }, [isAuthenticated, user, isLoading])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-blue-600" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <SplashScreen onGetStarted={() => {}} />
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />
  }

  return <ChatInterface />
}
