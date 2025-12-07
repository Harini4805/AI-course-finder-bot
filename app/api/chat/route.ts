import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

const COURSES_DATABASE: Record<string, any[]> = {
  jee: [
    {
      title: "JEE Main & Advanced Complete Course",
      provider: "Physics Wallah",
      level: "Intermediate",
      duration: "12 months",
      rating: 4.9,
      price: "₹3,999",
      url: "https://www.pw.live/jee-main-advanced",
      description: "Complete JEE preparation",
      tags: ["JEE", "Engineering"],
    },
    {
      title: "JEE Preparation - Complete Guide",
      provider: "Unacademy",
      level: "Intermediate",
      duration: "10 months",
      rating: 4.7,
      price: "₹4,999",
      url: "https://unacademy.com/goal/jee-main-and-advanced-preparation",
      description: "Expert faculty for JEE",
      tags: ["JEE", "IIT"],
    },
    {
      title: "JEE Mathematics Masterclass",
      provider: "YouTube - Vedantu",
      level: "Intermediate",
      duration: "Free",
      rating: 4.8,
      price: "Free",
      url: "https://www.youtube.com/playlist?list=PLVLoWQNkjipqKwpSCHcL9KZTyJf-YzCFh",
      description: "Free JEE Mathematics",
      tags: ["JEE", "Free"],
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
      description: "Complete NEET preparation",
      tags: ["NEET", "Medical"],
    },
    {
      title: "NEET Biology Complete Course",
      provider: "Unacademy",
      level: "Intermediate",
      duration: "8 months",
      rating: 4.8,
      price: "₹3,500",
      url: "https://unacademy.com/goal/neet-ug",
      description: "Biology for NEET",
      tags: ["NEET", "Biology"],
    },
    {
      title: "NEET Chemistry - YouTube",
      provider: "YouTube - Vedantu NEET",
      level: "Intermediate",
      duration: "Free",
      rating: 4.7,
      price: "Free",
      url: "https://www.youtube.com/c/VedantuNEET",
      description: "Free NEET Chemistry",
      tags: ["NEET", "Free"],
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
      description: "Complete UPSC preparation",
      tags: ["UPSC", "IAS"],
    },
    {
      title: "UPSC Free Lectures",
      provider: "YouTube - StudyIQ",
      level: "Beginner",
      duration: "Free",
      rating: 4.9,
      price: "Free",
      url: "https://www.youtube.com/c/StudyIQEducation",
      description: "Free UPSC preparation",
      tags: ["UPSC", "Free"],
    },
  ],
  tnpsc: [
    {
      title: "TNPSC Group 1, 2, 4 Course",
      provider: "Adda247",
      level: "Intermediate",
      duration: "6 months",
      rating: 4.6,
      price: "₹2,499",
      url: "https://www.adda247.com/tamilnadu/tnpsc",
      description: "Complete TNPSC preparation",
      tags: ["TNPSC", "Tamil Nadu"],
    },
    {
      title: "TNPSC Group 2 Course",
      provider: "Unacademy",
      level: "Intermediate",
      duration: "4 months",
      rating: 4.7,
      price: "₹3,000",
      url: "https://unacademy.com/goal/tnpsc-group-2",
      description: "TNPSC Group 2 exam prep",
      tags: ["TNPSC", "Group 2"],
    },
  ],
  nptel: [
    {
      title: "NPTEL - Data Structures",
      provider: "NPTEL/IIT",
      level: "Intermediate",
      duration: "12 weeks",
      rating: 4.8,
      price: "Free",
      url: "https://nptel.ac.in/courses/106106145",
      description: "IIT DSA course",
      tags: ["NPTEL", "DSA"],
    },
    {
      title: "NPTEL - Machine Learning",
      provider: "NPTEL/IIT Kharagpur",
      level: "Intermediate",
      duration: "8 weeks",
      rating: 4.9,
      price: "Free",
      url: "https://nptel.ac.in/courses/106105152",
      description: "ML course from IIT",
      tags: ["NPTEL", "ML"],
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
      description: "Complete Java programming",
      tags: ["Java", "Programming"],
    },
    {
      title: "Java Full Course",
      provider: "YouTube - Telusko",
      level: "Beginner",
      duration: "Free",
      rating: 4.8,
      price: "Free",
      url: "https://www.youtube.com/playlist?list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5",
      description: "Free Java course",
      tags: ["Java", "Free"],
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
      description: "Python and data analysis",
      tags: ["Python", "Data Science"],
    },
    {
      title: "Complete Python Bootcamp",
      provider: "Udemy",
      level: "Beginner",
      duration: "22 hours",
      rating: 4.6,
      price: "$14.99",
      url: "https://www.udemy.com/course/complete-python-bootcamp/",
      description: "Complete Python course",
      tags: ["Python", "Programming"],
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
      tags: ["Python", "Free"],
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
      description: "Build responsive websites",
      tags: ["HTML", "CSS"],
    },
    {
      title: "HTML Full Course",
      provider: "YouTube - freeCodeCamp",
      level: "Beginner",
      duration: "Free",
      rating: 4.8,
      price: "Free",
      url: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
      description: "Free HTML course",
      tags: ["HTML", "Free"],
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
      description: "Master CSS animations",
      tags: ["CSS", "Sass"],
    },
    {
      title: "CSS Flexbox & Grid",
      provider: "YouTube - Traversy Media",
      level: "Beginner",
      duration: "Free",
      rating: 4.9,
      price: "Free",
      url: "https://www.youtube.com/watch?v=JJSoEo8JSnc",
      description: "CSS layouts guide",
      tags: ["CSS", "Free"],
    },
  ],
  javascript: [
    {
      title: "The Complete JavaScript Course",
      provider: "Udemy",
      level: "Beginner",
      duration: "69 hours",
      rating: 4.7,
      price: "$14.99",
      url: "https://www.udemy.com/course/the-complete-javascript-course/",
      description: "Master JavaScript",
      tags: ["JavaScript", "Frontend"],
    },
    {
      title: "JavaScript Full Course",
      provider: "YouTube - freeCodeCamp",
      level: "Beginner",
      duration: "Free",
      rating: 4.8,
      price: "Free",
      url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
      description: "Free JavaScript tutorial",
      tags: ["JavaScript", "Free"],
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
      description: "React with hooks and Redux",
      tags: ["React", "Frontend"],
    },
    {
      title: "React Full Course 2024",
      provider: "YouTube - freeCodeCamp",
      level: "Beginner",
      duration: "Free",
      rating: 4.9,
      price: "Free",
      url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
      description: "Free React course",
      tags: ["React", "Free"],
    },
  ],
  nodejs: [
    {
      title: "Node.js, Express, MongoDB",
      provider: "Udemy",
      level: "Intermediate",
      duration: "42 hours",
      rating: 4.8,
      price: "$14.99",
      url: "https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/",
      description: "Backend with Node.js",
      tags: ["Node.js", "Backend"],
    },
    {
      title: "Node.js Full Course",
      provider: "YouTube - freeCodeCamp",
      level: "Beginner",
      duration: "Free",
      rating: 4.7,
      price: "Free",
      url: "https://www.youtube.com/watch?v=Oe421EPjeBE",
      description: "Free Node.js tutorial",
      tags: ["Node.js", "Free"],
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
      description: "PHP with MySQL",
      tags: ["PHP", "Backend"],
    },
    {
      title: "PHP Tutorial Full Course",
      provider: "YouTube",
      level: "Beginner",
      duration: "Free",
      rating: 4.7,
      price: "Free",
      url: "https://www.youtube.com/watch?v=OK_JCtrrv-c",
      description: "Free PHP tutorial",
      tags: ["PHP", "Free"],
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
      description: "Complete MySQL course",
      tags: ["MySQL", "Database"],
    },
    {
      title: "MySQL Full Course",
      provider: "YouTube - freeCodeCamp",
      level: "Beginner",
      duration: "Free",
      rating: 4.8,
      price: "Free",
      url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
      description: "Free MySQL tutorial",
      tags: ["MySQL", "Free"],
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
      description: "Master Figma",
      tags: ["Figma", "Design"],
    },
    {
      title: "Figma Tutorial",
      provider: "YouTube - DesignCourse",
      level: "Beginner",
      duration: "Free",
      rating: 4.9,
      price: "Free",
      url: "https://www.youtube.com/watch?v=FTFaQWZBqQ8",
      description: "Free Figma tutorial",
      tags: ["Figma", "Free"],
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
      description: "Google UX certification",
      tags: ["UX", "Google"],
    },
    {
      title: "UI/UX Design Complete Course",
      provider: "YouTube - freeCodeCamp",
      level: "Beginner",
      duration: "Free",
      rating: 4.7,
      price: "Free",
      url: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
      description: "Free UI/UX course",
      tags: ["UI/UX", "Free"],
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
      description: "ML with Andrew Ng",
      tags: ["ML", "AI"],
    },
    {
      title: "AI Full Course",
      provider: "YouTube - freeCodeCamp",
      level: "Beginner",
      duration: "Free",
      rating: 4.8,
      price: "Free",
      url: "https://www.youtube.com/watch?v=mJeNghZXtMo",
      description: "Free AI course",
      tags: ["AI", "Free"],
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
      description: "Complete web development",
      tags: ["Web Dev", "Full Stack"],
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
      description: "Learn stock market",
      tags: ["Stocks", "Finance"],
    },
    {
      title: "Stock Market for Beginners",
      provider: "YouTube - CA Rachana Ranade",
      level: "Beginner",
      duration: "Free",
      rating: 4.9,
      price: "Free",
      url: "https://www.youtube.com/c/CArachanaranade",
      description: "Free stock market lessons",
      tags: ["Stocks", "Free"],
    },
  ],
}

function getCourseRecommendations(userMessage: string): any[] {
  const msg = userMessage.toLowerCase()
  const courses: any[] = []

  const keywords: Record<string, string[]> = {
    jee: ["jee", "iit", "engineering entrance"],
    neet: ["neet", "medical", "mbbs", "doctor"],
    upsc: ["upsc", "ias", "civil services", "government"],
    tnpsc: ["tnpsc", "tamil nadu", "state exam"],
    nptel: ["nptel"],
    java: ["java"],
    python: ["python", "django", "flask"],
    html: ["html", "webpage"],
    css: ["css", "styling", "tailwind"],
    javascript: ["javascript", " js ", "es6"],
    react: ["react", "nextjs", "next.js"],
    nodejs: ["node", "express", "backend"],
    php: ["php", "laravel"],
    mysql: ["mysql", "sql", "database"],
    figma: ["figma", "prototype"],
    uiux: ["ui", "ux", "design", "user interface"],
    ai: ["ai", "machine learning", "ml", "deep learning", "artificial"],
    webdev: ["web development", "full stack", "frontend", "fullstack"],
    finance: ["stock", "finance", "trading", "invest", "market"],
  }

  for (const [key, terms] of Object.entries(keywords)) {
    if (terms.some((term) => msg.includes(term)) && COURSES_DATABASE[key]) {
      courses.push(...COURSES_DATABASE[key])
    }
  }

  // Return unique courses or default recommendations
  if (courses.length === 0) {
    return [
      ...COURSES_DATABASE.python.slice(0, 2),
      ...COURSES_DATABASE.webdev,
      {
        title: "Learning How to Learn",
        provider: "Coursera",
        level: "Beginner",
        duration: "4 weeks",
        rating: 4.9,
        price: "Free",
        url: "https://www.coursera.org/learn/learning-how-to-learn",
        description: "Master learning techniques",
        tags: ["Learning", "Skills"],
      },
    ].slice(0, 5)
  }

  return Array.from(new Map(courses.map((c) => [c.title, c])).values())
}

function generateFallbackResponse(message: string, language: string, courses: any[]): string {
  const msg = message.toLowerCase()

  const responses: Record<string, Record<string, string>> = {
    greeting: {
      en: "Hello! I'm your **course advisor**. What would you like to learn today?",
      ta: "வணக்கம்! நான் உங்கள் **பாட ஆலோசகர்**. இன்று என்ன கற்க விரும்புகிறீர்கள்?",
      hi: "नमस्ते! मैं आपका **कोर्स सलाहकार** हूं। आज क्या सीखना चाहेंगे?",
    },
    courses: {
      en: `Here are **${courses.length} courses** I found for you. Check the cards below!`,
      ta: `உங்களுக்காக **${courses.length} பாடங்கள்** கண்டுபிடித்தேன். கீழே உள்ள அட்டைகளைப் பாருங்கள்!`,
      hi: `आपके लिए **${courses.length} कोर्स** मिले। नीचे कार्ड देखें!`,
    },
    help: {
      en: "I can help you find courses in **programming**, **design**, **finance**, or **competitive exams** like JEE, NEET, UPSC.",
      ta: "**புரோகிராமிங்**, **வடிவமைப்பு**, **நிதி** அல்லது JEE, NEET, UPSC போன்ற **போட்டித் தேர்வுகளில்** பாடங்களைக் கண்டறிய உதவ முடியும்.",
      hi: "मैं **प्रोग्रामिंग**, **डिजाइन**, **फाइनेंस** या JEE, NEET, UPSC जैसी **प्रतियोगी परीक्षाओं** में कोर्स खोजने में मदद कर सकता हूं।",
    },
  }

  // Detect intent
  if (msg.match(/^(hi|hello|hey|hii|vanakkam|namaste)/)) {
    return responses.greeting[language] || responses.greeting.en
  }

  if (courses.length > 0) {
    return responses.courses[language] || responses.courses.en
  }

  return responses.help[language] || responses.help.en
}

export async function POST(request: Request) {
  try {
    const { message, language = "en", conversationHistory = [] } = await request.json()

    // Get course recommendations first
    const courses = getCourseRecommendations(message)

    // Try Gemini API
    try {
      const filteredHistory = conversationHistory.filter((msg: any, index: number) => {
        if (index === 0 && msg.role === "assistant") return false
        return msg.role && (msg.role === "user" || msg.role === "assistant")
      })

      const chatHistory = filteredHistory.map((msg: any) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }))

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

      const systemPrompt = `You are a concise course advisor. Keep responses SHORT (2-3 sentences). Use **bold** for course names. Reply in ${language === "ta" ? "Tamil" : language === "hi" ? "Hindi" : "English"}.`

      const chat = model.startChat({
        history: chatHistory,
        generationConfig: { maxOutputTokens: 256, temperature: 0.7 },
      })

      const result = await chat.sendMessage(`${systemPrompt}\n\nUser: ${message}`)
      const response = await result.response
      const aiResponse = response.text()

      return Response.json({ message: aiResponse, courses })
    } catch (apiError: any) {
      console.error("[v0] Gemini API Error:", apiError.message)

      // Generate intelligent fallback response
      const fallbackMessage = generateFallbackResponse(message, language, courses)

      return Response.json({
        message: fallbackMessage,
        courses,
        fallback: true,
      })
    }
  } catch (error) {
    console.error("[v0] Chat API Error:", error)
    return Response.json(
      {
        message: "I found some courses for you! Check the recommendations below.",
        courses: getCourseRecommendations("popular"),
        error: String(error),
      },
      { status: 200 }, // Return 200 so UI doesn't show error
    )
  }
}
