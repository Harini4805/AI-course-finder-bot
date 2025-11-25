import { ExternalLink, Star } from 'lucide-react'

interface CourseCardProps {
  course: {
    title: string
    provider: string
    level: string
    duration: string
    rating: number
    url?: string
    description?: string
  }
  onViewDetails?: (course: any) => void
  onCompare?: (course: any) => void
}

export function CourseCard({ course, onViewDetails, onCompare }: CourseCardProps) {
  return (
    <div className="group rounded-lg border border-slate-700 bg-slate-800/50 p-4 backdrop-blur-sm hover:border-blue-500 hover:bg-slate-800 transition-all hover:shadow-lg hover:shadow-blue-500/20">
      <div className="mb-2 flex items-start justify-between">
        <h3 className="font-semibold text-white line-clamp-2">{course.title}</h3>
        {course.url && (
          <a
            href={course.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex-shrink-0 text-slate-400 hover:text-blue-400"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>

      <p className="mb-3 text-sm text-slate-400">{course.provider}</p>

      {course.description && (
        <p className="mb-3 text-xs text-slate-300 line-clamp-2">
          {course.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-block rounded-full bg-slate-700 px-2.5 py-1 text-xs text-slate-300">
          {course.level}
        </span>
        <span className="inline-block rounded-full bg-slate-700 px-2.5 py-1 text-xs text-slate-300">
          {course.duration}
        </span>
        {course.rating > 0 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-700 px-2.5 py-1 text-xs text-slate-300">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {course.rating.toFixed(1)}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {onViewDetails && (
          <button
            onClick={() => onViewDetails(course)}
            className="flex-1 rounded-lg bg-blue-600 px-3 py-1 text-xs text-white hover:bg-blue-700 transition"
          >
            View Details
          </button>
        )}
        {onCompare && (
          <button
            onClick={() => onCompare(course)}
            className="flex-1 rounded-lg border border-slate-600 px-3 py-1 text-xs text-slate-300 hover:border-slate-500 transition"
          >
            Compare
          </button>
        )}
      </div>
    </div>
  )
}
