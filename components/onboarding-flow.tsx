"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useAuth, type UserPreferences } from "@/lib/auth-context"
import { ChevronRight, ChevronLeft } from "lucide-react"

interface OnboardingFlowProps {
  onComplete: () => void
}

const EDUCATION_LEVELS = ["School", "Undergraduate", "Postgraduate", "Professional"]
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

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const { updatePreferences } = useAuth()
  const [step, setStep] = useState(0)
  const [preferences, setPreferences] = useState<UserPreferences>({
    educationLevel: null,
    preferredLanguage: "en",
    interestAreas: [],
    learningGoals: [],
    interactionMode: "text", // Set default value, removed from UI
  })

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      updatePreferences(preferences)
      onComplete()
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const toggleInterest = (area: string) => {
    setPreferences((prev) => ({
      ...prev,
      interestAreas: prev.interestAreas.includes(area)
        ? prev.interestAreas.filter((a) => a !== area)
        : [...prev.interestAreas, area],
    }))
  }

  const toggleGoal = (goal: string) => {
    setPreferences((prev) => ({
      ...prev,
      learningGoals: prev.learningGoals.includes(goal)
        ? prev.learningGoals.filter((g) => g !== goal)
        : [...prev.learningGoals, goal],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 py-8 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-sm text-slate-400">
            <span>Step {step + 1} of 4</span>
            <span>{Math.round(((step + 1) / 4) * 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all"
              style={{ width: `${((step + 1) / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-slate-700 bg-slate-800 p-8">
          {step === 0 && (
            <div>
              <h2 className="mb-2 text-3xl font-bold text-white">Educational Level</h2>
              <p className="mb-6 text-slate-400">What's your current education level?</p>
              <div className="space-y-3">
                {EDUCATION_LEVELS.map((level) => (
                  <button
                    key={level}
                    onClick={() =>
                      setPreferences((prev) => ({
                        ...prev,
                        educationLevel: level.toLowerCase().replace(" ", "") as any,
                      }))
                    }
                    className={`w-full rounded-lg border-2 px-4 py-3 text-left font-medium transition ${
                      preferences.educationLevel === level.toLowerCase().replace(" ", "")
                        ? "border-blue-600 bg-blue-600/20 text-white"
                        : "border-slate-600 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="mb-2 text-3xl font-bold text-white">Preferred Language</h2>
              <p className="mb-6 text-slate-400">Choose your preferred language for learning</p>
              <div className="grid grid-cols-2 gap-3">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() =>
                      setPreferences((prev) => ({
                        ...prev,
                        preferredLanguage: lang.code,
                      }))
                    }
                    className={`rounded-lg border-2 px-4 py-3 font-medium transition ${
                      preferences.preferredLanguage === lang.code
                        ? "border-blue-600 bg-blue-600/20 text-white"
                        : "border-slate-600 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="mb-2 text-3xl font-bold text-white">Areas of Interest</h2>
              <p className="mb-6 text-slate-400">Select all that apply (you can choose multiple)</p>
              <div className="grid grid-cols-2 gap-3">
                {INTEREST_AREAS.map((area) => (
                  <button
                    key={area}
                    onClick={() => toggleInterest(area)}
                    className={`rounded-lg border-2 px-4 py-3 text-left font-medium transition ${
                      preferences.interestAreas.includes(area)
                        ? "border-blue-600 bg-blue-600/20 text-white"
                        : "border-slate-600 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="mb-2 text-3xl font-bold text-white">Learning Goals</h2>
              <p className="mb-6 text-slate-400">What are your primary learning goals?</p>
              <div className="space-y-3">
                {LEARNING_GOALS.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => toggleGoal(goal)}
                    className={`w-full rounded-lg border-2 px-4 py-3 text-left font-medium transition ${
                      preferences.learningGoals.includes(goal)
                        ? "border-blue-600 bg-blue-600/20 text-white"
                        : "border-slate-600 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Button
            onClick={handleBack}
            disabled={step === 0}
            variant="outline"
            className="border-slate-600 bg-transparent"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={
              (step === 0 && !preferences.educationLevel) ||
              (step === 2 && preferences.interestAreas.length === 0) ||
              (step === 3 && preferences.learningGoals.length === 0)
            }
            className="bg-blue-600 hover:bg-blue-700"
          >
            {step === 3 ? "Get Started" : "Next"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
