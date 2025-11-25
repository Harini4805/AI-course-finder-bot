'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { ChatMessage } from './chat-message'
import { CourseCard } from './course-card'
import { CourseDetail } from './course-detail'
import { UserProfile } from './user-profile'
import { CourseSearch } from './course-search'
import { WishlistPage } from './wishlist-page'
import { CareerPaths } from './career-paths'
import { useAuth } from '@/lib/auth-context'
import { useWishlist } from '@/lib/wishlist-context'
import { Mic, Send, Globe, Settings, Heart, Compass } from 'lucide-react'

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' },
]

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  courses?: any[]
  timestamp: Date
}

export function ChatInterface() {
  const { user, logout } = useAuth()
  const { addCourse, isCoursesSaved } = useWishlist()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI course advisor. Tell me about your learning interests, goals, or skills you want to develop, and I\'ll recommend personalized courses for you.',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [language, setLanguage] = useState(user?.preferences.preferredLanguage || 'en')
  const [recognitionError, setRecognitionError] = useState('')
  const [showProfile, setShowProfile] = useState(false)
  const [showCourseSearch, setShowCourseSearch] = useState(false)
  const [showWishlist, setShowWishlist] = useState(false)
  const [showCareerPaths, setShowCareerPaths] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true

      recognitionRef.current.onstart = () => setIsListening(true)
      recognitionRef.current.onend = () => setIsListening(false)

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            setInput((prev) => prev + transcript)
          } else {
            interimTranscript += transcript
          }
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        setRecognitionError(`Speech recognition error: ${event.error}`)
      }
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setRecognitionError('')
      recognitionRef.current.lang = `${language}-${language === 'en' ? 'US' : language.toUpperCase()}`
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          language,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        courses: data.courses,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveCourse = (course: any) => {
    addCourse({
      title: course.title,
      provider: course.provider,
      level: course.level,
      duration: course.duration,
      rating: course.rating,
      price: course.price,
      url: course.url,
      description: course.description,
      tags: course.tags,
    })
  }

  if (selectedCourse) {
    return (
      <CourseDetail 
        course={selectedCourse} 
        onBack={() => setSelectedCourse(null)} 
        onAddToWishlist={handleSaveCourse}
        isInWishlist={isCoursesSaved(selectedCourse.title)}
      />
    )
  }

  if (showProfile) {
    return <UserProfile onBack={() => setShowProfile(false)} />
  }

  if (showCourseSearch) {
    return <CourseSearch onBack={() => setShowCourseSearch(false)} />
  }

  if (showWishlist) {
    return <WishlistPage onBack={() => setShowWishlist(false)} />
  }

  if (showCareerPaths) {
    return <CareerPaths onBack={() => setShowCareerPaths(false)} />
  }

  return (
    <div className="flex h-screen flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">AI Course Finder</h1>
              <p className="text-sm text-slate-400">Personalized learning recommendations</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-slate-400" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white hover:border-slate-500 focus:border-blue-500 focus:outline-none"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setShowCareerPaths(true)}
                className="rounded-lg border border-slate-600 px-3 py-2 text-slate-400 hover:border-slate-500 hover:text-white flex items-center gap-2 text-sm"
                title="Career Paths"
              >
                <Compass className="h-4 w-4" />
                Paths
              </button>
              <button
                onClick={() => setShowWishlist(true)}
                className="rounded-lg border border-slate-600 px-3 py-2 text-slate-400 hover:border-slate-500 hover:text-white flex items-center gap-2 text-sm"
              >
                <Heart className="h-4 w-4" />
                Wishlist
              </button>
              <button
                onClick={() => setShowCourseSearch(true)}
                className="rounded-lg border border-slate-600 px-3 py-2 text-sm text-slate-400 hover:border-slate-500 hover:text-white"
              >
                Browse
              </button>
              <button
                onClick={() => setShowProfile(true)}
                className="rounded-lg border border-slate-600 p-2 text-slate-400 hover:border-slate-500 hover:text-white"
                title="Profile Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id}>
                <ChatMessage message={message} />
                {message.courses && message.courses.length > 0 && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {message.courses.map((course, idx) => (
                      <div key={idx} className="relative">
                        <div
                          onClick={() => setSelectedCourse(course)}
                          className="cursor-pointer"
                        >
                          <CourseCard course={course} />
                        </div>
                        <button
                          onClick={() => handleSaveCourse(course)}
                          className={`absolute top-2 right-2 rounded-full p-2 transition ${
                            isCoursesSaved(course.title)
                              ? 'bg-red-600 text-white'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          }`}
                          title={isCoursesSaved(course.title) ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          <Heart className={`h-4 w-4 ${isCoursesSaved(course.title) ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-3 rounded-lg bg-slate-800 px-4 py-3">
                  <Spinner />
                  <span className="text-sm text-slate-300">AI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-700 bg-slate-900/50 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl">
          {recognitionError && (
            <div className="mb-3 rounded-lg bg-red-900/30 px-3 py-2 text-sm text-red-300">
              {recognitionError}
            </div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder="Ask about courses, skills, or learning goals..."
              className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              disabled={isLoading}
            />
            <Button
              onClick={isListening ? stopListening : startListening}
              variant="outline"
              size="icon"
              className={`rounded-lg border ${
                isListening
                  ? 'border-red-500 bg-red-500/10 text-red-400 hover:bg-red-500/20'
                  : 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
              }`}
              disabled={isLoading}
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
