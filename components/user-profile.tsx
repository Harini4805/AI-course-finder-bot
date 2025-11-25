'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAuth } from '@/lib/auth-context'
import { ArrowLeft, LogOut, Settings } from 'lucide-react'

interface UserProfileProps {
  onBack: () => void
}

const EDUCATION_LEVELS = [
  { id: 'school', label: 'School' },
  { id: 'ug', label: 'Undergraduate' },
  { id: 'pg', label: 'Postgraduate' },
  { id: 'professional', label: 'Professional' },
]

const INTEREST_AREAS = [
  'AI & Machine Learning',
  'Web Development',
  'Finance',
  'Health',
  'Design',
  'Data Science',
  'Cloud Computing',
  'Mobile Development',
]

const LEARNING_GOALS = ['Get a job', 'Skill upgrade', 'Certification', 'Hobby learning']

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Mandarin' },
  { code: 'ja', name: 'Japanese' },
]

export function UserProfile({ onBack }: UserProfileProps) {
  const { user, updateProfile, updatePreferences, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })

  if (!user) return null

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
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Chat
            </button>
            <h1 className="text-2xl font-bold text-white">Profile Settings</h1>
            <div className="w-20" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-6">
          {/* Personal Information */}
          <Card className="border-slate-700 bg-slate-800 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Personal Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
              >
                <Settings className="h-4 w-4" />
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <Button
                  onClick={handleSaveProfile}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-400">Name</p>
                  <p className="text-white">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="text-white">{user.email}</p>
                </div>
                {user.phone && (
                  <div>
                    <p className="text-sm text-slate-400">Phone</p>
                    <p className="text-white">{user.phone}</p>
                  </div>
                )}
              </div>
            )}
          </Card>

          {/* Learning Preferences */}
          <Card className="border-slate-700 bg-slate-800 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">Learning Preferences</h2>

            <div className="space-y-6">
              {/* Education Level */}
              <div>
                <h3 className="mb-3 font-medium text-white">Education Level</h3>
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
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                        user.preferences.educationLevel === level.id
                          ? 'bg-blue-600 text-white'
                          : 'border border-slate-600 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Language */}
              <div>
                <h3 className="mb-3 font-medium text-white">Preferred Language</h3>
                <select
                  value={user.preferences.preferredLanguage}
                  onChange={(e) =>
                    updatePreferences({
                      ...user.preferences,
                      preferredLanguage: e.target.value,
                    })
                  }
                  className="rounded-lg border border-slate-600 bg-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Interest Areas */}
              <div>
                <h3 className="mb-3 font-medium text-white">Areas of Interest</h3>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {INTEREST_AREAS.map((area) => (
                    <button
                      key={area}
                      onClick={() => toggleInterest(area)}
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                        user.preferences.interestAreas.includes(area)
                          ? 'bg-blue-600 text-white'
                          : 'border border-slate-600 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Learning Goals */}
              <div>
                <h3 className="mb-3 font-medium text-white">Learning Goals</h3>
                <div className="space-y-2">
                  {LEARNING_GOALS.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => toggleGoal(goal)}
                      className={`w-full rounded-lg px-4 py-2 text-left font-medium transition ${
                        user.preferences.learningGoals.includes(goal)
                          ? 'bg-blue-600 text-white'
                          : 'border border-slate-600 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interaction Mode */}
              <div>
                <h3 className="mb-3 font-medium text-white">Interaction Mode</h3>
                <div className="space-y-2">
                  {[
                    { id: 'text', label: 'Text-based bot' },
                    { id: 'voice', label: 'Voice-based bot' },
                    { id: 'voice-tts', label: 'AI assistant chat' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() =>
                        updatePreferences({
                          ...user.preferences,
                          interactionMode: mode.id as any,
                        })
                      }
                      className={`w-full rounded-lg px-4 py-2 text-left font-medium transition ${
                        user.preferences.interactionMode === mode.id
                          ? 'bg-blue-600 text-white'
                          : 'border border-slate-600 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Account Actions */}
          <Card className="border-slate-700 bg-slate-800 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">Account</h2>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
