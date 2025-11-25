import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

// Comprehensive course database
const COURSES_DATABASE: { [key: string]: any[] } = {
  python: [
    {
      title: "Python for Data Science",
      provider: "Coursera",
      level: "Intermediate",
      duration: "6 weeks",
      rating: 4.8,
      price: "$39/month",
      url: "https://www.coursera.org/learn/python-data-analysis",
      description: "Learn Python fundamentals and data analysis with pandas and NumPy",
      tags: ["Python", "Data Science", "Analytics"],
    },
    {
      title: "Complete Python Bootcamp",
      provider: "Udemy",
      level: "Beginner",
      duration: "22 hours",
      rating: 4.6,
      price: "$14.99",
      url: "https://www.udemy.com/course/complete-python-bootcamp/",
      description: "Complete Python programming course from basics to advanced",
      tags: ["Python", "Programming", "Fundamentals"],
    },
    {
      title: "Python for Everybody",
      provider: "Coursera",
      level: "Beginner",
      duration: "8 months",
      rating: 4.7,
      price: "Free",
      url: "https://www.coursera.org/specializations/python",
      description: "Learn Python basics through university-level instruction",
      tags: ["Python", "Programming", "Free"],
    },
  ],
  javascript: [
    {
      title: "The Complete JavaScript Course 2024",
      provider: "Udemy",
      level: "Beginner",
      duration: "69 hours",
      rating: 4.7,
      price: "$14.99",
      url: "https://www.udemy.com/course/the-complete-javascript-course/",
      description: "Master JavaScript, DOM manipulation, and async programming",
      tags: ["JavaScript", "Web Development", "Frontend"],
    },
    {
      title: "JavaScript Algorithms and Data Structures",
      provider: "freeCodeCamp",
      level: "Beginner",
      duration: "300 hours",
      rating: 4.9,
      price: "Free",
      url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
      description: "Learn JavaScript with hands-on projects",
      tags: ["JavaScript", "Algorithms", "Free"],
    },
  ],
  webdev: [
    {
      title: "React - The Complete Guide",
      provider: "Udemy",
      level: "Intermediate",
      duration: "48 hours",
      rating: 4.8,
      price: "$14.99",
      url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
      description: "Learn React with hooks, Redux, and modern patterns",
      tags: ["React", "JavaScript", "Frontend"],
    },
    {
      title: "Full Stack Web Development",
      provider: "Coursera",
      level: "Intermediate",
      duration: "6 months",
      rating: 4.7,
      price: "Free with certificate option",
      url: "https://www.coursera.org/specializations/full-stack-web-development",
      description: "Learn frontend and backend web development from scratch",
      tags: ["Full Stack", "Web Development", "Backend"],
    },
  ],
  ai: [
    {
      title: "Machine Learning Specialization",
      provider: "Coursera",
      level: "Intermediate",
      duration: "3 months",
      rating: 4.9,
      price: "$39/month",
      url: "https://www.coursera.org/specializations/machine-learning-introduction",
      description: "Learn ML fundamentals with Andrew Ng",
      tags: ["Machine Learning", "AI", "Data Science"],
    },
    {
      title: "Deep Learning Specialization",
      provider: "Coursera",
      level: "Advanced",
      duration: "4 months",
      rating: 4.8,
      price: "$39/month",
      url: "https://www.coursera.org/specializations/deep-learning",
      description: "Master neural networks and deep learning",
      tags: ["Deep Learning", "Neural Networks", "AI"],
    },
  ],
  design: [
    {
      title: "UI/UX Design Specialization",
      provider: "Coursera",
      level: "Beginner",
      duration: "3 months",
      rating: 4.8,
      price: "$39/month",
      url: "https://www.coursera.org/specializations/user-experience-design",
      description: "Master UI/UX design principles and tools",
      tags: ["Design", "UI/UX", "User Experience"],
    },
  ],
}

function searchCourses(query: string): any[] {
  const lowerQuery = query.toLowerCase()
  let results: any[] = []
  const relatedResults: any[] = []

  // First pass: exact and strong matches
  Object.values(COURSES_DATABASE).forEach((courses) => {
    courses.forEach((course) => {
      const titleMatch = course.title.toLowerCase().includes(lowerQuery)
      const tagMatch = course.tags?.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
      const descriptionMatch = course.description.toLowerCase().includes(lowerQuery)

      if (titleMatch || (tagMatch && !results.length)) {
        results.push({
          ...course,
          matchScore: titleMatch ? 3 : tagMatch ? 2 : 1,
        })
      } else if (descriptionMatch) {
        relatedResults.push({
          ...course,
          matchScore: 1,
        })
      }
    })
  })

  // If no exact matches, return related courses + fallback popular courses
  if (results.length === 0) {
    results = [
      ...relatedResults,
      ...(COURSES_DATABASE.python || []).map((c) => ({
        ...c,
        matchScore: 0.5,
      })),
      ...(COURSES_DATABASE.javascript || []).map((c) => ({
        ...c,
        matchScore: 0.5,
      })),
      ...(COURSES_DATABASE.webdev || []).map((c) => ({
        ...c,
        matchScore: 0.5,
      })),
    ]
  }

  // Sort by match score and return top results
  return results
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 12)
    .map(({ matchScore, ...course }) => course)
}

export async function POST(request: Request) {
  try {
    const { query } = await request.json()

    if (!query || query.trim().length === 0) {
      return Response.json({ courses: [] })
    }

    // Search courses using keyword matching with fallback
    const courses = searchCourses(query)

    return Response.json({ courses })
  } catch (error) {
    console.error("[v0] Search courses error:", error)
    return Response.json({ courses: [], error: "Failed to search courses" }, { status: 500 })
  }
}
