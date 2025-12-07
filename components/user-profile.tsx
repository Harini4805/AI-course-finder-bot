"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { ArrowLeft, LogOut, Settings, Camera, BookOpen, History } from "lucide-react"

interface UserProfileProps {
  onBack: () => void
}

const EDUCATION_LEVELS = [
  { id: "school", label: "School" },
  { id: "ug", label: "Undergraduate" },
  { id: "pg", label: "Postgraduate" },
  { id: "professional", label: "Professional" },
]

const INTEREST_AREAS = [
  "AI & Machine Learning",
  "Web Development",
  "Finance",
  "Health",
  "Design",
  "Data Science",
  "Cloud Computing",
  "Mobile Development",
  "Competitive Exams (JEE/NEET)",
  "Government Exams (UPSC/TNPSC)",
]

const LEARNING_GOALS = ["Get a job", "Skill upgrade", "Certification", "Hobby learning", "Exam preparation"]

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "hi", name: "हिंदी (Hindi)" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
]

export function UserProfile({ onBack }: UserProfileProps) {
  const { user, updateProfile, updatePreferences, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })

  const [searchHistory] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("searchHistory")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const [completedCourses] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("courseProgress")
      if (saved) {
        const progress = JSON.parse(saved)
        return progress.filter((c: any) => c.progress >= 100)
      }
    }
    return []
  })

  if (!user) return null

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        updateProfile({ profilePhoto: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    })
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    onBack()
  }

  const toggleInterest = (area: string) => {
    const updated = user.preferences.interestAreas.includes(area)
      ? user.preferences.interestAreas.filter((a) => a !== area)
      : [...user.preferences.interestAreas, area]
    updatePreferences({
      ...user.preferences,
      interestAreas: updated,
    })
  }

  const toggleGoal = (goal: string) => {
    const updated = user.preferences.learningGoals.includes(goal)
      ? user.preferences.learningGoals.filter((g) => g !== goal)
      : [...user.preferences.learningGoals, goal]
    updatePreferences({
      ...user.preferences,
      learningGoals: updated,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
              Back
            </button>
            <h1 className="text-xl font-bold text-white">Settings</h1>
            <div className="w-16" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="space-y-5">
          <Card className="border-slate-700 bg-slate-800 p-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden border-2 border-slate-600">
                  {user.profilePhoto ? (
                    <img
                      src={user.profilePhoto || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-slate-400 text-3xl">{user.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700">
                  <Camera className="h-3.5 w-3.5 text-white" />
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <p className="text-slate-400">{user.email}</p>
                {user.phone && <p className="text-slate-500 text-sm">{user.phone}</p>}
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm"
              >
                <Settings className="h-4 w-4" />
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            {isEditing && (
              <div className="mt-4 pt-4 border-t border-slate-700 space-y-3">
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-3 py-2 text-white text-sm"
                  />
                </div>
                <Button onClick={handleSaveProfile} className="w-full bg-blue-600 hover:bg-blue-700" size="sm">
                  Save
                </Button>
              </div>
            )}
          </Card>

          <Card className="border-slate-700 bg-slate-800 p-5">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-green-400" />
              <h2 className="text-lg font-bold text-white">Completed Courses</h2>
            </div>
            {completedCourses.length > 0 ? (
              <div className="space-y-2">
                {completedCourses.map((course, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div>
                      <p className="text-white text-sm font-medium">{course.title}</p>
                      <p className="text-slate-400 text-xs">{course.provider}</p>
                    </div>
                    <span className="text-green-400 text-xs">Completed</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No completed courses yet</p>
            )}
          </Card>

          <Card className="border-slate-700 bg-slate-800 p-5">
            <div className="flex items-center gap-2 mb-4">
              <History className="h-5 w-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white">Recent Searches</h2>
            </div>
            {searchHistory.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {searchHistory.slice(0, 10).map((term, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">
                    {term}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">No search history</p>
            )}
          </Card>

          {/* Learning Preferences */}
          <Card className="border-slate-700 bg-slate-800 p-5">
            <h2 className="mb-4 text-lg font-bold text-white">Learning Preferences</h2>

            <div className="space-y-5">
              <div>
                <h3 className="mb-2 text-sm font-medium text-white">Education Level</h3>
                <div className="flex flex-wrap gap-2">
                  {EDUCATION_LEVELS.map((level) => (
                    <button
                      key={level.id}
                      onClick={() =>
                        updatePreferences({
                          ...user.preferences,
                          educationLevel: level.id as any,
                        })
                      }
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                        user.preferences.educationLevel === level.id
                          ? "bg-blue-600 text-white"
                          : "border border-slate-600 text-slate-300"
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium text-white">Language</h3>
                <select
                  value={user.preferences.preferredLanguage}
                  onChange={(e) =>
                    updatePreferences({
                      ...user.preferences,
                      preferredLanguage: e.target.value,
                    })
                  }
                  className="rounded-lg border border-slate-600 bg-slate-700 px-3 py-1.5 text-sm text-white"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium text-white">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {INTEREST_AREAS.map((area) => (
                    <button
                      key={area}
                      onClick={() => toggleInterest(area)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                        user.preferences.interestAreas.includes(area)
                          ? "bg-blue-600 text-white"
                          : "border border-slate-600 text-slate-300"
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium text-white">Goals</h3>
                <div className="flex flex-wrap gap-2">
                  {LEARNING_GOALS.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => toggleGoal(goal)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                        user.preferences.learningGoals.includes(goal)
                          ? "bg-blue-600 text-white"
                          : "border border-slate-600 text-slate-300"
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Sign Out */}
          <Card className="border-slate-700 bg-slate-800 p-5">
            <Button onClick={handleLogout} variant="destructive" className="w-full" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
