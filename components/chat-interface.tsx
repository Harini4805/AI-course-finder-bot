"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { ChatMessage } from "./chat-message"
import { CourseCard } from "./course-card"
import { CourseDetail } from "./course-detail"
import { UserProfile } from "./user-profile"
import { CourseSearch } from "./course-search"
import { WishlistPage } from "./wishlist-page"
import { CareerPaths } from "./career-paths"
import { useAuth } from "@/lib/auth-context"
import { useWishlist } from "@/lib/wishlist-context"
import {
  Mic,
  Send,
  Settings,
  Heart,
  Compass,
  ArrowLeft,
  FileText,
  Plus,
  Trash2,
  VolumeX,
  Volume2,
  Search,
  Archive,
} from "lucide-react"
import { CourseProgress } from "./course-progress"
import { useProgress } from "@/lib/progress-context"

const LANGUAGES = [
  { code: "en", name: "English", speechCode: "en-US" },
  { code: "ta", name: "தமிழ்", speechCode: "ta-IN" },
  { code: "hi", name: "हिंदी", speechCode: "hi-IN" },
  { code: "es", name: "Español", speechCode: "es-ES" },
  { code: "fr", name: "Français", speechCode: "fr-FR" },
  { code: "de", name: "Deutsch", speechCode: "de-DE" },
  { code: "zh", name: "中文", speechCode: "zh-CN" },
  { code: "ja", name: "日本語", speechCode: "ja-JP" },
]

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  courses?: any[]
  timestamp: Date
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  archived?: boolean
}

export function ChatInterface() {
  const { user, logout } = useAuth()
  const { addCourse, isCoursesSaved } = useWishlist()
  const { enrolledCourses } = useProgress()

  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chatSessions")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [showArchivedChats, setShowArchivedChats] = useState(false)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your AI course advisor. What do you want to learn today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [language, setLanguage] = useState(user?.preferences.preferredLanguage || "en")
  const [recognitionError, setRecognitionError] = useState("")
  const [showProfile, setShowProfile] = useState(false)
  const [showCourseSearch, setShowCourseSearch] = useState(false)
  const [showWishlist, setShowWishlist] = useState(false)
  const [showCareerPaths, setShowCareerPaths] = useState(false)
  const [showChatHistory, setShowChatHistory] = useState(false)
  const [showProgress, setShowProgress] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (chatSessions.length > 0) {
      localStorage.setItem("chatSessions", JSON.stringify(chatSessions))
    }
  }, [chatSessions])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (typeof window === "undefined") return

    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true

      recognitionRef.current.onstart = () => {
        setIsListening(true)
        setRecognitionError("")
      }
      recognitionRef.current.onend = () => setIsListening(false)

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          }
        }
        if (finalTranscript) {
          setInput((prev) => prev + finalTranscript)
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("[v0] Speech recognition error:", event.error)
        if (event.error === "not-allowed") {
          setRecognitionError("Microphone access denied. Please allow microphone in browser settings.")
        } else if (event.error === "no-speech") {
          setRecognitionError("No speech detected. Try again.")
        } else if (event.error === "network") {
          setRecognitionError("Network error. Check your connection.")
        } else if (event.error === "aborted") {
          // User stopped, no error message needed
        } else {
          setRecognitionError(`Speech error: ${event.error}`)
        }
        setIsListening(false)
      }
    }
  }, [])

  const startListening = async () => {
    setRecognitionError("")

    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setRecognitionError("Speech recognition not supported. Use Chrome or Edge browser.")
      return
    }

    // Request microphone permission first
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch (err) {
      setRecognitionError("Microphone access denied. Please allow microphone access.")
      return
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true

      recognitionRef.current.onstart = () => {
        setIsListening(true)
        setRecognitionError("")
      }
      recognitionRef.current.onend = () => setIsListening(false)

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = ""
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          }
        }
        if (finalTranscript) {
          setInput((prev) => prev + finalTranscript)
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        if (event.error !== "aborted") {
          setRecognitionError(`Speech error: ${event.error}`)
        }
        setIsListening(false)
      }
    }

    if (!isListening) {
      const langConfig = LANGUAGES.find((l) => l.code === language)
      recognitionRef.current.lang = langConfig?.speechCode || "en-US"
      try {
        recognitionRef.current.start()
      } catch (error) {
        setRecognitionError("Failed to start speech recognition. Try again.")
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        role: "assistant",
        content: data.message,
        courses: data.courses,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (data.courses && data.courses.length > 0) {
        const courseNames = data.courses
          .slice(0, 2)
          .map((c: any) => c.title)
          .join(" and ")
        speakMessage(`${data.message.split(".")[0]}. Found ${data.courses.length} courses including ${courseNames}.`)
      } else {
        speakMessage(data.message.split(".").slice(0, 2).join("."))
      }
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const speakMessage = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      const langConfig = LANGUAGES.find((l) => l.code === language)
      utterance.lang = langConfig?.speechCode || "en-US"
      utterance.rate = 0.95
      utterance.pitch = 1

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)

      synthRef.current = utterance
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    }
  }

  const startNewChat = () => {
    if (messages.length > 1) {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: messages.find((m) => m.role === "user")?.content.slice(0, 40) || "New Chat",
        messages: [...messages],
        createdAt: new Date(),
        archived: false,
      }
      setChatSessions((prev) => [newSession, ...prev])
    }

    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Hi! I'm your AI course advisor. What do you want to learn today?",
        timestamp: new Date(),
      },
    ])
    setCurrentSessionId(null)
  }

  const loadChatSession = (session: ChatSession) => {
    setMessages(
      session.messages.map((m) => ({
        ...m,
        timestamp: new Date(m.timestamp),
      })),
    )
    setCurrentSessionId(session.id)
    setShowChatHistory(false)
  }

  const deleteChatSession = (sessionId: string) => {
    setChatSessions((prev) => prev.filter((s) => s.id !== sessionId))
  }

  const archiveChatSession = (sessionId: string) => {
    setChatSessions((prev) => prev.map((s) => (s.id === sessionId ? { ...s, archived: true } : s)))
  }

  const unarchiveChatSession = (sessionId: string) => {
    setChatSessions((prev) => prev.map((s) => (s.id === sessionId ? { ...s, archived: false } : s)))
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

  if (showProgress) {
    return <CourseProgress onBack={() => setShowProgress(false)} />
  }

  if (showChatHistory) {
    const activeSessions = chatSessions.filter((s) => !s.archived)
    const archivedSessions = chatSessions.filter((s) => s.archived)
    const displaySessions = showArchivedChats ? archivedSessions : activeSessions

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="border-b border-slate-700 bg-slate-900/50 px-4 py-4 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl">
            <button
              onClick={() => setShowChatHistory(false)}
              className="mb-4 flex items-center gap-2 text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </button>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">Chat History</h1>
              <button
                onClick={() => setShowArchivedChats(!showArchivedChats)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                  showArchivedChats ? "bg-amber-600/20 text-amber-400" : "bg-slate-700 text-slate-300"
                }`}
              >
                <Archive className="h-4 w-4" />
                {showArchivedChats ? "Show Active" : "Show Archived"}
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-8">
          {displaySessions.length > 0 ? (
            <div className="space-y-3">
              {displaySessions.map((session) => (
                <Card
                  key={session.id}
                  className="border-slate-700 bg-slate-800/50 p-4 hover:bg-slate-800 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div onClick={() => loadChatSession(session)} className="flex-1">
                      <h3 className="text-white font-medium truncate">{session.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(session.createdAt).toLocaleDateString()} · {session.messages.length} messages
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {showArchivedChats ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            unarchiveChatSession(session.id)
                          }}
                          className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-400/10 rounded"
                          title="Unarchive"
                        >
                          <Archive className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            archiveChatSession(session.id)
                          }}
                          className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded"
                          title="Archive"
                        >
                          <Archive className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteChatSession(session.id)
                        }}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">{showArchivedChats ? "No archived chats" : "No chat history yet"}</p>
            </div>
          )}
        </div>
      </div>
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
      <div className="border-b border-slate-700 bg-slate-900/50 px-4 py-3 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">AI Course Finder</h1>
            </div>
            <div className="flex items-center gap-1.5">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="rounded-lg border border-slate-600 bg-slate-800 px-2 py-1.5 text-xs text-white"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <button
                onClick={startNewChat}
                className="rounded-lg border border-slate-600 px-2 py-1.5 text-slate-400 hover:border-blue-500 hover:text-blue-400 flex items-center gap-1 text-xs"
              >
                <Plus className="h-3.5 w-3.5" />
                New
              </button>
              <button
                onClick={() => setShowChatHistory(true)}
                className="rounded-lg border border-slate-600 px-2 py-1.5 text-slate-400 hover:border-slate-500 hover:text-white flex items-center gap-1 text-xs"
              >
                <FileText className="h-3.5 w-3.5" />
                History
              </button>
              <button
                onClick={() => setShowCareerPaths(true)}
                className="rounded-lg border border-slate-600 px-2 py-1.5 text-slate-400 hover:border-slate-500 hover:text-white flex items-center gap-1 text-xs"
              >
                <Compass className="h-3.5 w-3.5" />
                Paths
              </button>
              <button
                onClick={() => setShowWishlist(true)}
                className="rounded-lg border border-slate-600 px-2 py-1.5 text-slate-400 hover:border-slate-500 hover:text-white flex items-center gap-1 text-xs"
              >
                <Heart className="h-3.5 w-3.5" />
                Wishlist
              </button>
              <button
                onClick={() => setShowCourseSearch(true)}
                className="rounded-lg border border-slate-600 px-2 py-1.5 text-slate-400 hover:border-slate-500 hover:text-white flex items-center gap-1 text-xs"
              >
                <Search className="h-3.5 w-3.5" />
                Browse
              </button>
              <button
                onClick={() => setShowProfile(true)}
                className="rounded-lg border border-slate-600 p-1.5 text-slate-400 hover:border-slate-500 hover:text-white"
              >
                <Settings className="h-4 w-4" />
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
                {message.role === "assistant" && (
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => speakMessage(message.content)}
                      disabled={isSpeaking}
                      className="text-xs px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 transition flex items-center gap-1"
                    >
                      <Volume2 className="h-3 w-3" />
                      Speak
                    </button>
                    {isSpeaking && (
                      <button
                        onClick={stopSpeaking}
                        className="text-xs px-2 py-1 rounded bg-red-600/20 hover:bg-red-600/30 text-red-400 transition flex items-center gap-1"
                      >
                        <VolumeX className="h-3 w-3" />
                        Stop
                      </button>
                    )}
                  </div>
                )}
                {message.courses && message.courses.length > 0 && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {message.courses.map((course, idx) => (
                      <div key={idx} className="relative">
                        <div onClick={() => setSelectedCourse(course)} className="cursor-pointer">
                          <CourseCard course={course} />
                        </div>
                        <button
                          onClick={() => handleSaveCourse(course)}
                          className={`absolute top-2 right-2 rounded-full p-2 transition ${
                            isCoursesSaved(course.title)
                              ? "bg-red-600 text-white"
                              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${isCoursesSaved(course.title) ? "fill-current" : ""}`} />
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
                  <span className="text-sm text-slate-300">Thinking...</span>
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
            <div className="mb-3 rounded-lg bg-red-900/30 px-3 py-2 text-sm text-red-300">{recognitionError}</div>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
              placeholder="Ask about courses, skills, or learning goals..."
              className="flex-1 rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              disabled={isLoading}
            />
            <Button
              onClick={isListening ? stopListening : startListening}
              variant="outline"
              size="icon"
              className={`rounded-lg border ${
                isListening
                  ? "border-red-500 bg-red-500/10 text-red-400"
                  : "border-slate-600 text-slate-400 hover:border-slate-500"
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
