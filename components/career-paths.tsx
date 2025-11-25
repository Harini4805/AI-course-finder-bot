'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, CheckCircle, Clock, Zap, Target, BookOpen } from 'lucide-react'

interface CareerPathProps {
  onBack: () => void
}

interface CareerPath {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  duration: string
  difficulty: string
  salary: string
  modules: Module[]
  requiredSkills: string[]
  jobTitles: string[]
  demand: string
}

interface Module {
  id: number
  title: string
  courses: string[]
  skills: string[]
  duration: string
}

const CAREER_PATHS: CareerPath[] = [
  {
    id: 'fullstack',
    title: 'Full-Stack Developer',
    description: 'Build complete web applications from frontend to backend',
    icon: <Zap className="h-8 w-8" />,
    duration: '6-12 months',
    difficulty: 'Intermediate',
    salary: '$80,000 - $150,000/year',
    demand: 'Very High',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'Databases', 'APIs', 'Git'],
    jobTitles: ['Full-Stack Developer', 'Web Developer', 'Software Engineer'],
    modules: [
      {
        id: 1,
        title: 'Frontend Fundamentals',
        courses: ['HTML/CSS Basics', 'JavaScript Essentials', 'React Fundamentals'],
        skills: ['DOM Manipulation', 'State Management', 'Component Design'],
        duration: '2-3 months',
      },
      {
        id: 2,
        title: 'Backend Development',
        courses: ['Node.js & Express', 'RESTful APIs', 'Authentication & Security'],
        skills: ['Server Development', 'Database Design', 'API Development'],
        duration: '2-3 months',
      },
      {
        id: 3,
        title: 'Databases & DevOps',
        courses: ['SQL & NoSQL', 'Docker & Deployment', 'CI/CD Pipelines'],
        skills: ['Database Management', 'Cloud Deployment', 'DevOps Basics'],
        duration: '1-2 months',
      },
      {
        id: 4,
        title: 'Real-World Projects',
        courses: ['Build 3-5 complete projects', 'Open Source Contributions', 'Portfolio Building'],
        skills: ['Problem Solving', 'Code Review', 'Collaboration'],
        duration: '2-3 months',
      },
    ],
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Transform data into actionable insights for business decisions',
    icon: <Target className="h-8 w-8" />,
    duration: '4-8 months',
    difficulty: 'Intermediate',
    salary: '$60,000 - $120,000/year',
    demand: 'Very High',
    requiredSkills: ['SQL', 'Python/R', 'Statistics', 'Tableau', 'Excel', 'Data Visualization'],
    jobTitles: ['Data Analyst', 'Business Analyst', 'Analytics Engineer'],
    modules: [
      {
        id: 1,
        title: 'SQL Mastery',
        courses: ['SQL Fundamentals', 'Complex Queries', 'Database Design'],
        skills: ['Query Writing', 'Data Extraction', 'Performance Optimization'],
        duration: '1-2 months',
      },
      {
        id: 2,
        title: 'Programming for Analytics',
        courses: ['Python for Data Analysis', 'Pandas & NumPy', 'Data Cleaning'],
        skills: ['Data Processing', 'Automation', 'Scripting'],
        duration: '1-2 months',
      },
      {
        id: 3,
        title: 'Statistics & Visualization',
        courses: ['Statistics Fundamentals', 'Tableau/Power BI', 'Dashboard Creation'],
        skills: ['Statistical Analysis', 'Visualization', 'Storytelling'],
        duration: '1-2 months',
      },
      {
        id: 4,
        title: 'Real Analytics Projects',
        courses: ['Case Studies', 'Real Datasets', 'Business Intelligence'],
        skills: ['Business Acumen', 'Communication', 'Decision Support'],
        duration: '1-2 months',
      },
    ],
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning Engineer',
    description: 'Build intelligent systems and predictive models',
    icon: <BookOpen className="h-8 w-8" />,
    duration: '8-12 months',
    difficulty: 'Advanced',
    salary: '$100,000 - $200,000/year',
    demand: 'High',
    requiredSkills: ['Python', 'Statistics', 'Mathematics', 'TensorFlow', 'Deep Learning', 'SQL'],
    jobTitles: ['ML Engineer', 'Data Scientist', 'AI Engineer'],
    modules: [
      {
        id: 1,
        title: 'Python & Mathematics',
        courses: ['Advanced Python', 'Linear Algebra', 'Calculus & Statistics'],
        skills: ['Mathematical Programming', 'Algorithm Analysis', 'Data Structures'],
        duration: '2 months',
      },
      {
        id: 2,
        title: 'Machine Learning Basics',
        courses: ['Supervised Learning', 'Unsupervised Learning', 'Feature Engineering'],
        skills: ['Model Development', 'Data Preprocessing', 'Hyperparameter Tuning'],
        duration: '2-3 months',
      },
      {
        id: 3,
        title: 'Deep Learning',
        courses: ['Neural Networks', 'CNNs & RNNs', 'Computer Vision', 'NLP'],
        skills: ['Deep Learning Architecture', 'Transfer Learning', 'Advanced Techniques'],
        duration: '2-3 months',
      },
      {
        id: 4,
        title: 'Production & Deployment',
        courses: ['MLOps', 'Model Deployment', 'Cloud Platforms'],
        skills: ['Model Serving', 'Monitoring', 'Scalability'],
        duration: '1-2 months',
      },
    ],
  },
  {
    id: 'ui-ux-designer',
    title: 'UI/UX Designer',
    description: 'Create user-centered digital experiences and interfaces',
    icon: <Zap className="h-8 w-8" />,
    duration: '4-6 months',
    difficulty: 'Beginner to Intermediate',
    salary: '$70,000 - $130,000/year',
    demand: 'High',
    requiredSkills: ['Figma', 'Design Thinking', 'Prototyping', 'User Research', 'Wireframing'],
    jobTitles: ['UI Designer', 'UX Designer', 'Product Designer'],
    modules: [
      {
        id: 1,
        title: 'Design Fundamentals',
        courses: ['Design Principles', 'Color Theory', 'Typography', 'Layout'],
        skills: ['Visual Design', 'Composition', 'Design Systems'],
        duration: '1-2 months',
      },
      {
        id: 2,
        title: 'User Experience',
        courses: ['User Research', 'Wireframing', 'User Journey Mapping', 'Usability Testing'],
        skills: ['Empathy Mapping', 'Personas', 'User Testing'],
        duration: '1-2 months',
      },
      {
        id: 3,
        title: 'Tools & Prototyping',
        courses: ['Figma Mastery', 'Prototyping', 'Interaction Design'],
        skills: ['Tool Proficiency', 'Prototyping', 'Animation Basics'],
        duration: '1 month',
      },
      {
        id: 4,
        title: 'Portfolio & Projects',
        courses: ['Case Study Creation', 'Portfolio Building', 'Real Projects'],
        skills: ['Communication', 'Storytelling', 'Presentation'],
        duration: '1-2 months',
      },
    ],
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    description: 'Design and manage cloud infrastructure and services',
    icon: <Cloud className="h-8 w-8" />,
    duration: '6-12 months',
    difficulty: 'Intermediate to Advanced',
    salary: '$90,000 - $180,000/year',
    demand: 'Very High',
    requiredSkills: ['AWS/Azure/GCP', 'Linux', 'Docker', 'Kubernetes', 'Networking', 'Security'],
    jobTitles: ['Cloud Engineer', 'DevOps Engineer', 'Infrastructure Engineer'],
    modules: [
      {
        id: 1,
        title: 'Linux & Networking',
        courses: ['Linux Fundamentals', 'Networking Basics', 'Security Fundamentals'],
        skills: ['Command Line', 'Network Administration', 'Security Practices'],
        duration: '1-2 months',
      },
      {
        id: 2,
        title: 'Cloud Platforms',
        courses: ['AWS Core Services', 'Azure Fundamentals', 'Cloud Architecture'],
        skills: ['Cloud Services', 'Infrastructure Design', 'Cost Optimization'],
        duration: '2-3 months',
      },
      {
        id: 3,
        title: 'Containerization & Orchestration',
        courses: ['Docker', 'Kubernetes', 'Container Deployment'],
        skills: ['Container Management', 'Orchestration', 'Microservices'],
        duration: '1-2 months',
      },
      {
        id: 4,
        title: 'DevOps & Automation',
        courses: ['CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring'],
        skills: ['Automation', 'Monitoring', 'Troubleshooting'],
        duration: '1-2 months',
      },
    ],
  },
]

function Cloud({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 14a6 6 0 0 0-8.5-5.5 5 5 0 0 0-9.8 1.3A4.5 4.5 0 0 0 20 14z"/></svg>
}

export function CareerPaths({ onBack }: CareerPathProps) {
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null)
  const [expandedModule, setExpandedModule] = useState<number | null>(null)

  if (selectedPath) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
        {/* Header */}
        <div className="border-b border-slate-700 bg-slate-900/50 px-4 py-4 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl">
            <button
              onClick={() => setSelectedPath(null)}
              className="mb-4 flex items-center gap-2 text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Paths
            </button>
            <div className="flex items-center gap-4">
              <div className="text-4xl">{selectedPath.icon}</div>
              <div>
                <h1 className="text-3xl font-bold text-white">{selectedPath.title}</h1>
                <p className="text-slate-400 mt-1">{selectedPath.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-4 py-8">
          {/* Overview Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="border-slate-700 bg-slate-800 p-4">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Clock className="h-5 w-5" />
                <span className="text-sm">Duration</span>
              </div>
              <p className="font-semibold text-white">{selectedPath.duration}</p>
            </Card>
            <Card className="border-slate-700 bg-slate-800 p-4">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Zap className="h-5 w-5" />
                <span className="text-sm">Difficulty</span>
              </div>
              <p className="font-semibold text-white">{selectedPath.difficulty}</p>
            </Card>
            <Card className="border-slate-700 bg-slate-800 p-4">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Target className="h-5 w-5" />
                <span className="text-sm">Average Salary</span>
              </div>
              <p className="font-semibold text-white">{selectedPath.salary}</p>
            </Card>
          </div>

          {/* Quick Stats */}
          <Card className="border-slate-700 bg-slate-800 p-6 mb-8">
            <h2 className="mb-4 text-xl font-bold text-white">Career Overview</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <h3 className="font-semibold text-white mb-3">Job Titles</h3>
                <ul className="space-y-2">
                  {selectedPath.jobTitles.map((title, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {title}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPath.requiredSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-blue-600/20 px-3 py-1 text-xs text-blue-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-3">Market Demand</h3>
                <div className="space-y-2">
                  <p className="text-sm text-slate-300">Job Demand: <span className="font-semibold text-green-400">{selectedPath.demand}</span></p>
                  <p className="text-xs text-slate-400">Growing rapidly across industries</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Learning Path */}
          <Card className="border-slate-700 bg-slate-800 p-6">
            <h2 className="mb-6 text-xl font-bold text-white">Learning Path</h2>
            <div className="space-y-4">
              {selectedPath.modules.map((module, idx) => (
                <div key={module.id} className="border border-slate-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedModule(expandedModule === idx ? null : idx)}
                    className="w-full p-4 bg-slate-700/50 hover:bg-slate-700 transition flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-semibold">
                        {module.id}
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-white">{module.title}</h3>
                        <p className="text-xs text-slate-400">{module.duration}</p>
                      </div>
                    </div>
                    <span className={`transition ${expandedModule === idx ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  {expandedModule === idx && (
                    <div className="p-4 bg-slate-800 space-y-4">
                      <div>
                        <h4 className="font-semibold text-white mb-2">Courses</h4>
                        <ul className="space-y-1">
                          {module.courses.map((course, cidx) => (
                            <li key={cidx} className="flex items-center gap-2 text-slate-300 text-sm">
                              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                              {course}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">Skills You'll Gain</h4>
                        <div className="flex flex-wrap gap-2">
                          {module.skills.map((skill, sidx) => (
                            <span
                              key={sidx}
                              className="rounded-full bg-green-600/20 px-2.5 py-1 text-xs text-green-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* CTA */}
          <div className="mt-8 flex gap-4">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-lg py-6">
              Start This Path
            </Button>
            <Button
              onClick={() => setSelectedPath(null)}
              variant="outline"
              className="flex-1 border-slate-600 text-lg py-6"
            >
              Compare Paths
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 px-4 py-4 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl">
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-white">Career Path Recommendations</h1>
          <p className="text-slate-400 mt-2">Choose a learning path tailored to your career goals</p>
        </div>
      </div>

      {/* Career Paths Grid */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CAREER_PATHS.map((path) => (
            <Card
              key={path.id}
              className="border-slate-700 bg-slate-800 p-6 hover:border-blue-500 transition cursor-pointer group"
              onClick={() => setSelectedPath(path)}
            >
              <div className="mb-4 text-4xl text-blue-400 group-hover:scale-110 transition">
                {path.icon}
              </div>
              <h2 className="mb-2 text-xl font-bold text-white">{path.title}</h2>
              <p className="mb-4 text-sm text-slate-400">{path.description}</p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Duration:</span>
                  <span className="text-white font-semibold">{path.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Salary Range:</span>
                  <span className="text-green-400 font-semibold">{path.salary}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Demand:</span>
                  <span className="text-blue-400 font-semibold">{path.demand}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-slate-400 mb-2">Top Skills</p>
                <div className="flex flex-wrap gap-2">
                  {path.requiredSkills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-blue-600/20 px-2 py-1 text-xs text-blue-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                View Details
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
