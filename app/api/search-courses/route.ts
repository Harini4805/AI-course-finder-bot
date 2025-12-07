const COURSES_DATABASE: { [key: string]: any[] } = {
  // Competitive Exams
  jee: [
    {
      title: "JEE Main & Advanced Complete Course",
      provider: "Physics Wallah",
      level: "Intermediate",
      duration: "12 months",
      rating: 4.9,
      price: "₹3,999",
      url: "https://www.pw.live/jee-main-advanced",
      description: "Complete JEE preparation with Physics, Chemistry, and Mathematics",
      tags: ["JEE", "Engineering", "Entrance Exam", "IIT"],
    },
    {
      title: "JEE Preparation - Complete Guide",
      provider: "Unacademy",
      level: "Intermediate",
      duration: "10 months",
      rating: 4.7,
      price: "₹4,999",
      url: "https://unacademy.com/goal/jee-main-and-advanced-preparation",
      description: "Expert faculty for JEE Main and Advanced preparation",
      tags: ["JEE", "IIT", "Engineering"],
    },
    {
      title: "JEE Mathematics Free Course",
      provider: "YouTube - Vedantu",
      level: "Intermediate",
      duration: "Free",
      rating: 4.8,
      price: "Free",
      url: "https://www.youtube.com/playlist?list=PLVLoWQNkjipqKwpSCHcL9KZTyJf-YzCFh",
      description: "Free JEE Mathematics video lectures",
      tags: ["JEE", "Mathematics", "Free", "YouTube"],
    },
  ],
  neet: [
    {
      title: "NEET Complete Course 2024",
      provider: "Physics Wallah",
      level: "Intermediate",
      duration: "12 months",
      rating: 4.9,
      price: "₹2,999",
      url: "https://www.pw.live/neet",
      description: "Complete NEET preparation covering Biology, Physics, Chemistry",
      tags: ["NEET", "Medical", "Entrance Exam"],
    },
    {
      title: "NEET Biology Complete Course",
      provider: "Unacademy",
      level: "Intermediate",
      duration: "8 months",
      rating: 4.8,
      price: "₹3,500",
      url: "https://unacademy.com/goal/neet-ug",
      description: "Comprehensive Biology course for NEET aspirants",
      tags: ["NEET", "Biology", "Medical"],
    },
  ],
  upsc: [
    {
      title: "UPSC CSE Complete Course",
      provider: "Unacademy",
      level: "Advanced",
      duration: "18 months",
      rating: 4.8,
      price: "₹12,000/year",
      url: "https://unacademy.com/goal/upsc-cse-gs",
      description: "Complete UPSC Civil Services preparation",
      tags: ["UPSC", "IAS", "Civil Services"],
    },
    {
      title: "UPSC Free Lectures",
      provider: "YouTube - StudyIQ",
      level: "Beginner",
      duration: "Free",
      rating: 4.9,
      price: "Free",
      url: "https://www.youtube.com/c/StudyIQEducation",
      description: "Free UPSC preparation videos",
      tags: ["UPSC", "Free", "YouTube"],
    },
  ],
  tnpsc: [
    {
      title: "TNPSC Group 1, 2, 4 Complete Course",
      provider: "Adda247",
      level: "Intermediate",
      duration: "6 months",
      rating: 4.6,
      price: "₹2,499",
      url: "https://www.adda247.com/tamilnadu/tnpsc",
      description: "Complete TNPSC preparation in Tamil and English",
      tags: ["TNPSC", "Tamil Nadu", "Government Exam"],
    },
  ],
  nptel: [
    {
      title: "NPTEL - Data Structures and Algorithms",
      provider: "NPTEL/IIT",
      level: "Intermediate",
      duration: "12 weeks",
      rating: 4.8,
      price: "Free",
      url: "https://nptel.ac.in/courses/106106145",
      description: "IIT professor taught DSA course with certification",
      tags: ["NPTEL", "DSA", "IIT", "Free"],
    },
    {
      title: "NPTEL - Machine Learning",
      provider: "NPTEL/IIT Kharagpur",
      level: "Intermediate",
      duration: "8 weeks",
      rating: 4.9,
      price: "Free",
      url: "https://nptel.ac.in/courses/106105152",
      description: "Comprehensive ML course from IIT faculty",
      tags: ["NPTEL", "Machine Learning", "IIT", "Free"],
    },
  ],
  // Programming Languages
  java: [
    {
      title: "Java Programming Masterclass",
      provider: "Udemy",
      level: "Beginner",
      duration: "80 hours",
      rating: 4.6,
      price: "$14.99",
      url: "https://www.udemy.com/course/java-the-complete-java-developer-course/",
      description: "Complete Java programming from basics to advanced",
      tags: ["Java", "Programming", "OOP"],
    },
    {
      title: "Java Full Course",
      provider: "YouTube - Telusko",
      level: "Beginner",
      duration: "Free",
      rating: 4.8,
      price: "Free",
      url: "https://www.youtube.com/playlist?list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5",
      description: "Free complete Java course on YouTube",
      tags: ["Java", "Free", "YouTube"],
    },
  ],
  python: [
    {
      title: "Python for Data Science",
      provider: "Coursera",
      level: "Intermediate",
      duration: "6 weeks",
      rating: 4.8,
      price: "$39/month",
      url: "https://www.coursera.org/learn/python-data-analysis",
      description: "Learn Python fundamentals and data analysis",
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
      description: "Complete Python programming course",
      tags: ["Python", "Programming", "Fundamentals"],
    },
    {
      title: "Python for Everybody",
      provider: "YouTube - freeCodeCamp",
      level: "Beginner",
      duration: "Free",
      rating: 4.9,
      price: "Free",
      url: "https://www.youtube.com/watch?v=8DvywoWv6fI",
      description: "Free 14-hour Python course",
      tags: ["Python", "Free", "YouTube"],
    },
  ],
  html: [
    {
      title: "HTML & CSS Complete Course",
      provider: "Udemy",
      level: "Beginner",
      duration: "37 hours",
      rating: 4.7,
      price: "$14.99",
      url: "https://www.udemy.com/course/design-and-develop-a-killer-website-with-html5-and-css3/",
      description: "Build responsive websites with HTML5 and CSS3",
      tags: ["HTML", "CSS", "Web Development"],
    },
    {
      title: "HTML Full Course",
      provider: "YouTube - freeCodeCamp",
      level: "Beginner",
      duration: "Free",
      rating: 4.8,
      price: "Free",
      url: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
      description: "Free complete HTML course",
      tags: ["HTML", "Free", "YouTube"],
    },
  ],
  css: [
    {
      title: "Advanced CSS and Sass",
      provider: "Udemy",
      level: "Intermediate",
      duration: "28 hours",
      rating: 4.8,
      price: "$14.99",
      url: "https://www.udemy.com/course/advanced-css-and-sass/",
      description: "Master CSS animations, Flexbox, Grid, and Sass",
      tags: ["CSS", "Sass", "Animation"],
    },
    {
      title: "CSS Flexbox & Grid",
      provider: "YouTube - Traversy Media",
      level: "Beginner",
      duration: "Free",
      rating: 4.9,
      price: "Free",
      url: "https://www.youtube.com/watch?v=JJSoEo8JSnc",
      description: "Master CSS layouts",
      tags: ["CSS", "Flexbox", "Grid", "Free"],
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
      description: "Master JavaScript and async programming",
      tags: ["JavaScript", "Web Development", "Frontend"],
    },
    {
      title: "JavaScript Full Course",
      provider: "YouTube - freeCodeCamp",
      level: "Beginner",
      duration: "Free",
      rating: 4.8,
      price: "Free",
      url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
      description: "Free complete JavaScript tutorial",
      tags: ["JavaScript", "Free", "YouTube"],
    },
  ],
  react: [
    {
      title: "React - The Complete Guide",
      provider: "Udemy",
      level: "Intermediate",
      duration: "48 hours",
      rating: 4.8,
      price: "$14.99",
      url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
      description: "Learn React with hooks and Redux",
      tags: ["React", "JavaScript", "Frontend"],
    },
    {
      title: "React Full Course 2024",
      provider: "YouTube - freeCodeCamp",
      level: "Beginner",
      duration: "Free",
      rating: 4.9,
      price: "Free",
      url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
      description: "Free complete React course",
      tags: ["React", "Free", "YouTube"],
    },
  ],
  nodejs: [
    {
      title: "Node.js, Express, MongoDB & More",
      provider: "Udemy",
      level: "Intermediate",
      duration: "42 hours",
      rating: 4.8,
      price: "$14.99",
      url: "https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/",
      description: "Complete backend development with Node.js",
      tags: ["Node.js", "Express", "MongoDB", "Backend"],
    },
    {
      title: "Node.js Full Course",
      provider: "YouTube - freeCodeCamp",
      level: "Beginner",
      duration: "Free",
      rating: 4.7,
      price: "Free",
      url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
      description: "Free Node.js and Express tutorial",
      tags: ["Node.js", "Free", "YouTube"],
    },
  ],
  php: [
    {
      title: "PHP for Beginners",
      provider: "Udemy",
      level: "Beginner",
      duration: "37 hours",
      rating: 4.6,
      price: "$14.99",
      url: "https://www.udemy.com/course/php-for-complete-beginners-includes-msql-object-oriented/",
      description: "Complete PHP programming with MySQL",
      tags: ["PHP", "MySQL", "Backend"],
    },
    {
      title: "PHP Tutorial Full Course",
      provider: "YouTube - Programming with Mosh",
      level: "Beginner",
      duration: "Free",
      rating: 4.7,
      price: "Free",
      url: "https://www.youtube.com/watch?v=OK_JCtrrv-c",
      description: "Free PHP tutorial",
      tags: ["PHP", "Free", "YouTube"],
    },
  ],
  mysql: [
    {
      title: "MySQL Bootcamp",
      provider: "Udemy",
      level: "Beginner",
      duration: "20 hours",
      rating: 4.7,
      price: "$14.99",
      url: "https://www.udemy.com/course/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/",
      description: "Complete MySQL database course",
      tags: ["MySQL", "Database", "SQL"],
    },
    {
      title: "MySQL Full Course",
      provider: "YouTube - freeCodeCamp",
      level: "Beginner",
      duration: "Free",
      rating: 4.8,
      price: "Free",
      url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
      description: "Free complete MySQL tutorial",
      tags: ["MySQL", "Free", "YouTube"],
    },
  ],
  figma: [
    {
      title: "Figma UI/UX Design Essentials",
      provider: "Udemy",
      level: "Beginner",
      duration: "12 hours",
      rating: 4.7,
      price: "$14.99",
      url: "https://www.udemy.com/course/figma-ux-ui-design-user-experience-tutorial-course/",
      description: "Master Figma for UI/UX design",
      tags: ["Figma", "UI/UX", "Design"],
    },
    {
      title: "Figma Tutorial for Beginners",
      provider: "YouTube - DesignCourse",
      level: "Beginner",
      duration: "Free",
      rating: 4.9,
      price: "Free",
      url: "https://www.youtube.com/watch?v=FTFaQWZBqQ8",
      description: "Free Figma tutorial",
      tags: ["Figma", "Free", "YouTube"],
    },
  ],
  uiux: [
    {
      title: "Google UX Design Certificate",
      provider: "Coursera - Google",
      level: "Beginner",
      duration: "6 months",
      rating: 4.8,
      price: "$39/month",
      url: "https://www.coursera.org/professional-certificates/google-ux-design",
      description: "Professional UX design certification from Google",
      tags: ["UX", "Google", "Certification", "Design"],
    },
    {
      title: "UI/UX Design Complete Course",
      provider: "YouTube - freeCodeCamp",
      level: "Beginner",
      duration: "Free",
      rating: 4.7,
      price: "Free",
      url: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
      description: "Free complete UI/UX design course",
      tags: ["UI/UX", "Free", "YouTube"],
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
      title: "AI Full Course",
      provider: "YouTube - freeCodeCamp",
      level: "Beginner",
      duration: "Free",
      rating: 4.8,
      price: "Free",
      url: "https://www.youtube.com/watch?v=mJeNghZXtMo",
      description: "Free artificial intelligence course",
      tags: ["AI", "Free", "YouTube"],
    },
  ],
}

function searchCourses(query: string): any[] {
  const lowerQuery = query.toLowerCase()
  const queryWords = lowerQuery.split(/\s+/)
  let results: any[] = []
  const relatedResults: any[] = []

  // Search through all courses
  Object.values(COURSES_DATABASE).forEach((courses) => {
    courses.forEach((course) => {
      const titleLower = course.title.toLowerCase()
      const descLower = course.description.toLowerCase()
      const tagsLower = course.tags?.map((t: string) => t.toLowerCase()) || []

      let matchScore = 0

      // Check for exact query match
      if (titleLower.includes(lowerQuery)) matchScore += 10
      if (tagsLower.some((tag: string) => tag === lowerQuery)) matchScore += 8

      // Check for word matches
      queryWords.forEach((word) => {
        if (word.length > 2) {
          if (titleLower.includes(word)) matchScore += 3
          if (tagsLower.some((tag: string) => tag.includes(word))) matchScore += 2
          if (descLower.includes(word)) matchScore += 1
        }
      })

      if (matchScore > 0) {
        results.push({ ...course, matchScore })
      } else {
        // Add as related if any partial match
        const hasPartialMatch = queryWords.some(
          (word) =>
            word.length > 2 &&
            (titleLower.includes(word.slice(0, 3)) || tagsLower.some((tag: string) => tag.includes(word.slice(0, 3)))),
        )
        if (hasPartialMatch) {
          relatedResults.push({ ...course, matchScore: 0.5 })
        }
      }
    })
  })

  // If no exact matches, return related courses + popular fallback
  if (results.length === 0) {
    const popularCourses = [
      ...COURSES_DATABASE.python,
      ...COURSES_DATABASE.javascript,
      ...COURSES_DATABASE.react,
      ...COURSES_DATABASE.ai,
    ].map((c) => ({ ...c, matchScore: 0.3 }))

    results = [...relatedResults, ...popularCourses]
  }

  // Sort by match score and remove duplicates
  const uniqueResults = Array.from(new Map(results.map((c) => [c.title, c])).values())

  return uniqueResults
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 15)
    .map(({ matchScore, ...course }) => course)
}

export async function POST(request: Request) {
  try {
    const { query } = await request.json()

    if (!query || query.trim().length === 0) {
      const popularCourses = [
        ...COURSES_DATABASE.python,
        ...COURSES_DATABASE.javascript,
        ...COURSES_DATABASE.react,
      ].slice(0, 9)
      return Response.json({ courses: popularCourses })
    }

    const courses = searchCourses(query)

    return Response.json({ courses })
  } catch (error) {
    console.error("[v0] Search courses error:", error)
    return Response.json({ courses: [], error: "Failed to search courses" }, { status: 500 })
  }
}
