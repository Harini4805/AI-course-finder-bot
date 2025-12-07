import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

const COURSES_DATABASE = {
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
      tags: ["JEE", "Engineering", "Entrance Exam"],
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
      title: "JEE Mathematics Masterclass",
      provider: "YouTube - Vedantu",
      level: "Intermediate",
      duration: "Free",
      rating: 4.8,
      price: "Free",
      url: "https://www.youtube.com/playlist?list=PLVLoWQNkjipqKwpSCHcL9KZTyJf-YzCFh",
      description: "Free JEE Mathematics video lectures",
      tags: ["JEE", "Mathematics", "Free"],
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
    {
      title: "NEET Chemistry - YouTube Series",
      provider: "YouTube - Vedantu NEET",
      level: "Intermediate",
      duration: "Free",
      rating: 4.7,
      price: "Free",
      url: "https://www.youtube.com/c/VedantuNEET",
      description: "Free NEET Chemistry video lectures",
      tags: ["NEET", "Chemistry", "Free"],
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
      description: "Complete UPSC Civil Services preparation with top educators",
      tags: ["UPSC", "IAS", "Civil Services"],
    },
    {
      title: "UPSC Prelims & Mains Course",
      provider: "BYJU'S",
      level: "Advanced",
      duration: "24 months",
      rating: 4.7,
      price: "₹75,000",
      url: "https://byjus.com/ias/",
      description: "Comprehensive UPSC preparation program",
      tags: ["UPSC", "IAS", "Government Exam"],
    },
    {
      title: "UPSC Free Lectures",
      provider: "YouTube - StudyIQ",
      level: "Beginner",
      duration: "Free",
      rating: 4.9,
      price: "Free",
      url: "https://www.youtube.com/c/StudyIQEducation",
      description: "Free UPSC preparation videos and current affairs",
      tags: ["UPSC", "Free", "Current Affairs"],
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
    {
      title: "TNPSC Group 2 Course",
      provider: "Unacademy",
      level: "Intermediate",
      duration: "4 months",
      rating: 4.7,
      price: "₹3,000",
      url: "https://unacademy.com/goal/tnpsc-group-2",
      description: "Focused preparation for TNPSC Group 2 exam",
      tags: ["TNPSC", "Group 2", "State Exam"],
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
      tags: ["NPTEL", "DSA", "IIT"],
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
      tags: ["NPTEL", "Machine Learning", "IIT"],
    },
  ],
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
      tags: ["Java", "Free", "Programming"],
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
      description: "Free 14-hour Python course for beginners",
      tags: ["Python", "Free", "Beginner"],
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
      description: "Free complete HTML course for beginners",
      tags: ["HTML", "Free", "Web"],
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
      description: "Master CSS layouts with Flexbox and Grid",
      tags: ["CSS", "Flexbox", "Grid"],
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
      title: "JavaScript Full Course",
      provider: "YouTube - freeCodeCamp",
      level: "Beginner",
      duration: "Free",
      rating: 4.8,
      price: "Free",
      url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
      description: "Free complete JavaScript tutorial",
      tags: ["JavaScript", "Free", "Programming"],
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
      description: "Learn React with hooks, Redux, and modern patterns",
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
      description: "Free complete React course with projects",
      tags: ["React", "Free", "Frontend"],
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
      tags: ["Node.js", "Express", "MongoDB"],
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
      tags: ["Node.js", "Free", "Backend"],
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
      description: "Free PHP tutorial for beginners",
      tags: ["PHP", "Free", "Web"],
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
      tags: ["MySQL", "Free", "Database"],
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
      description: "Free Figma tutorial from basics to advanced",
      tags: ["Figma", "Free", "Design"],
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
      tags: ["UX", "Google", "Certification"],
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
      tags: ["UI/UX", "Free", "Design"],
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
      tags: ["AI", "Free", "Machine Learning"],
    },
  ],
  webdev: [
    {
      title: "The Web Developer Bootcamp",
      provider: "Udemy",
      level: "Beginner",
      duration: "74 hours",
      rating: 4.7,
      price: "$14.99",
      url: "https://www.udemy.com/course/the-web-developer-bootcamp/",
      description: "Complete web development course",
      tags: ["Web Development", "Full Stack", "Bootcamp"],
    },
  ],
  finance: [
    {
      title: "Stock Market Investing",
      provider: "Udemy",
      level: "Beginner",
      duration: "8 hours",
      rating: 4.5,
      price: "$14.99",
      url: "https://www.udemy.com/course/stock-market-investing/",
      description: "Learn stock market basics and investing",
      tags: ["Stocks", "Investing", "Finance"],
    },
  ],
  default: [
    {
      title: "Learning How to Learn",
      provider: "Coursera",
      level: "Beginner",
      duration: "4 weeks",
      rating: 4.9,
      price: "Free",
      url: "https://www.coursera.org/learn/learning-how-to-learn",
      description: "Master learning techniques",
      tags: ["Learning", "Study Skills"],
    },
  ],
}

function getEnhancedSystemPrompt(language: string): string {
  const basePrompt = `You are a concise AI course advisor.

RULES:
- Keep responses SHORT (2-3 sentences max)
- Use **bold** for course names and platforms
- Be direct and helpful
- Format: **Course** from **Platform** - reason`

  const langInstructions: Record<string, string> = {
    en: "Reply in English briefly.",
    ta: "தமிழில் சுருக்கமாக பதிலளிக்கவும்.",
    hi: "हिंदी में संक्षेप में जवाब दें।",
    es: "Responde brevemente en Español.",
    fr: "Répondez brièvement en Français.",
    de: "Antworten Sie kurz auf Deutsch.",
    zh: "简短中文回复。",
    ja: "簡潔に日本語で。",
  }

  return `${basePrompt}\n\n${langInstructions[language] || langInstructions.en}`
}

function getCourseRecommendations(userMessage: string): any[] {
  const msg = userMessage.toLowerCase()
  const courses: any[] = []

  if (msg.includes("jee") || msg.includes("iit")) courses.push(...COURSES_DATABASE.jee)
  if (msg.includes("neet") || msg.includes("medical")) courses.push(...COURSES_DATABASE.neet)
  if (msg.includes("upsc") || msg.includes("ias")) courses.push(...COURSES_DATABASE.upsc)
  if (msg.includes("tnpsc")) courses.push(...COURSES_DATABASE.tnpsc)
  if (msg.includes("nptel")) courses.push(...COURSES_DATABASE.nptel)
  if (msg.includes("java") && !msg.includes("javascript")) courses.push(...COURSES_DATABASE.java)
  if (msg.includes("python")) courses.push(...COURSES_DATABASE.python)
  if (msg.includes("html")) courses.push(...COURSES_DATABASE.html)
  if (msg.includes("css")) courses.push(...COURSES_DATABASE.css)
  if (msg.includes("javascript") || msg.includes(" js")) courses.push(...COURSES_DATABASE.javascript)
  if (msg.includes("react")) courses.push(...COURSES_DATABASE.react)
  if (msg.includes("node")) courses.push(...COURSES_DATABASE.nodejs)
  if (msg.includes("php")) courses.push(...COURSES_DATABASE.php)
  if (msg.includes("mysql") || msg.includes("sql")) courses.push(...COURSES_DATABASE.mysql)
  if (msg.includes("figma")) courses.push(...COURSES_DATABASE.figma)
  if (msg.includes("ui") || msg.includes("ux") || msg.includes("design")) courses.push(...COURSES_DATABASE.uiux)
  if (msg.includes("ai") || msg.includes("machine learning") || msg.includes("ml")) courses.push(...COURSES_DATABASE.ai)
  if (msg.includes("web") || msg.includes("frontend")) courses.push(...COURSES_DATABASE.webdev)
  if (msg.includes("stock") || msg.includes("finance") || msg.includes("trading"))
    courses.push(...COURSES_DATABASE.finance)

  if (courses.length === 0) {
    return [...COURSES_DATABASE.python.slice(0, 2), ...COURSES_DATABASE.webdev, ...COURSES_DATABASE.default].slice(0, 5)
  }

  return Array.from(new Map(courses.map((c) => [c.title, c])).values())
}

export async function POST(request: Request) {
  try {
    const { message, language = "en", conversationHistory = [] } = await request.json()

    const filteredHistory = conversationHistory.filter((msg: any, index: number) => {
      if (index === 0 && msg.role === "assistant") return false
      return msg.role && (msg.role === "user" || msg.role === "assistant")
    })

    const chatHistory = filteredHistory.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }))

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
    })

    const systemPrompt = getEnhancedSystemPrompt(language)
    const result = await chat.sendMessage(`${systemPrompt}\n\nUser: ${message}`)
    const response = await result.response
    const aiResponse = response.text()

    const courses = getCourseRecommendations(message)

    return Response.json({ message: aiResponse, courses })
  } catch (error) {
    console.error("[v0] Chat API Error:", error)
    return Response.json(
      { message: "Something went wrong. Please try again.", courses: [], error: String(error) },
      { status: 500 },
    )
  }
}
