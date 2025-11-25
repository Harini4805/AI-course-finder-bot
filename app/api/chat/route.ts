import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

const COURSES_DATABASE = {
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
  ],
  webdev: [
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
      title: "Full Stack Web Development Bootcamp",
      provider: "Coursera",
      level: "Intermediate",
      duration: "6 months",
      rating: 4.7,
      price: "Free with certificate option",
      url: "https://www.coursera.org/professional-certificates/full-stack-web-development",
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
    {
      title: "Generative AI for Everyone",
      provider: "Coursera",
      level: "Beginner",
      duration: "1 hour",
      rating: 4.9,
      price: "Free",
      url: "https://www.coursera.org/learn/generative-ai-for-everyone",
      description: "Introduction to generative AI and large language models",
      tags: ["AI", "Generative AI", "LLM"],
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
  finance: [
    {
      title: "Finance for Everyone: Smart Tools for Decision-Making",
      provider: "Coursera",
      level: "Beginner",
      duration: "4 weeks",
      rating: 4.8,
      price: "Free",
      url: "https://www.coursera.org/learn/finance-for-everyone",
      description: "Learn financial concepts and decision-making",
      tags: ["Finance", "Business", "Economics"],
    },
  ],
  career_development: [
    {
      title: "Career Transition Guide",
      provider: "LinkedIn Learning",
      level: "Beginner",
      duration: "2 hours",
      rating: 4.6,
      price: "$19.99/month",
      url: "https://www.linkedin.com/learning/career-transition-guide",
      description: "Learn how to successfully transition to a new career",
      tags: ["Career", "Development", "Professional"],
    },
    {
      title: "The Job Interview Master Class",
      provider: "Masterclass",
      level: "Beginner",
      duration: "3 hours",
      rating: 4.9,
      price: "$180/year",
      url: "https://www.masterclass.com/classes/gayle-laakmann-mcdowell-teaches-job-interview-preparation",
      description: "Master job interviews with insider secrets",
      tags: ["Job Search", "Interviews", "Career"],
    },
  ],
  hobby_creative: [
    {
      title: "The Complete Photography Course",
      provider: "Udemy",
      level: "Beginner",
      duration: "25 hours",
      rating: 4.7,
      price: "$14.99",
      url: "https://www.udemy.com/course/complete-photography-course/",
      description: "Learn professional photography from basics to advanced",
      tags: ["Photography", "Creative", "Hobby"],
    },
    {
      title: "Oil Painting for Beginners",
      provider: "Skillshare",
      level: "Beginner",
      duration: "1 hour",
      rating: 4.8,
      price: "$32/month",
      url: "https://www.skillshare.com/classes/Oil-Painting-for-Beginners",
      description: "Begin your journey into oil painting with basics",
      tags: ["Art", "Painting", "Hobby"],
    },
    {
      title: "Music Production Fundamentals",
      provider: "Coursera",
      level: "Beginner",
      duration: "4 weeks",
      rating: 4.6,
      price: "Free",
      url: "https://www.coursera.org/learn/music-production",
      description: "Learn music production and sound design",
      tags: ["Music", "Production", "Creative"],
    },
  ],
  business: [
    {
      title: "Business Strategy Course",
      provider: "Coursera",
      level: "Intermediate",
      duration: "5 weeks",
      rating: 4.7,
      price: "$39/month",
      url: "https://www.coursera.org/learn/wharton-business-foundations",
      description: "Learn business fundamentals from Wharton",
      tags: ["Business", "Strategy", "Management"],
    },
    {
      title: "Entrepreneurship 101",
      provider: "Udemy",
      level: "Beginner",
      duration: "8 hours",
      rating: 4.6,
      price: "$14.99",
      url: "https://www.udemy.com/course/entrepreneurship-101/",
      description: "Start your entrepreneurial journey",
      tags: ["Business", "Entrepreneurship", "Startup"],
    },
  ],
  health_wellness: [
    {
      title: "Health Psychology Specialization",
      provider: "Coursera",
      level: "Beginner",
      duration: "3 months",
      rating: 4.8,
      price: "$39/month",
      url: "https://www.coursera.org/specializations/health-psychology",
      description: "Understand the psychology of health and wellness",
      tags: ["Health", "Psychology", "Wellness"],
    },
    {
      title: "Yoga and Meditation for Stress Relief",
      provider: "Skillshare",
      level: "Beginner",
      duration: "45 minutes",
      rating: 4.9,
      price: "$32/month",
      url: "https://www.skillshare.com/classes/Yoga-and-Meditation",
      description: "Learn yoga and meditation techniques",
      tags: ["Wellness", "Yoga", "Mindfulness"],
    },
  ],
  language: [
    {
      title: "Spanish for Beginners",
      provider: "Duolingo",
      level: "Beginner",
      duration: "Self-paced",
      rating: 4.7,
      price: "Free",
      url: "https://www.duolingo.com/",
      description: "Learn Spanish with interactive lessons",
      tags: ["Languages", "Spanish", "Free"],
    },
    {
      title: "Business English: Meetings",
      provider: "Coursera",
      level: "Intermediate",
      duration: "4 weeks",
      rating: 4.8,
      price: "Free",
      url: "https://www.coursera.org/learn/business-english-meetings",
      description: "Improve your business English skills",
      tags: ["English", "Business", "Communication"],
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
      description: "Master learning techniques and develop effective study habits",
      tags: ["Learning", "Study Skills", "Personal Development"],
    },
  ],
}

function getEnhancedSystemPrompt(language: string, userContext?: any): string {
  const prompts: { [key: string]: string } = {
    en: `You are an expert AI course advisor with deep knowledge of online learning platforms and educational content. 
    Your role is to:
    1. Understand user intent deeply - not just keywords but the underlying learning need
    2. Recommend courses intelligently based on skill level, goals, learning style, and career aspirations
    3. Provide context about why specific courses match user needs
    4. For financial topics (stocks, crypto, trading), explain market concepts clearly and recommend both courses and YouTube resources
    5. Support hobbies and creative learning equally to professional development
    6. Be conversational and encouraging
    
    When responding:
    - Be specific with course names, platforms, and URLs
    - Explain why each recommendation matches the user's needs
    - Provide estimated timeframes and skill progression
    - For specialized topics, recommend reputable platforms
    - Always suggest free alternatives when available
    - Format recommendations clearly with course name, platform, duration, and relevance
    ${userContext?.interestAreas ? `\nUser's interests: ${userContext.interestAreas.join(", ")}` : ""}
    ${userContext?.learningGoals ? `\nUser's learning goals: ${userContext.learningGoals.join(", ")}` : ""}`,
    es: `Eres un asesor experto en cursos de IA con profundo conocimiento de plataformas de aprendizaje en línea y contenido educativo.
    Tu rol es: entender la intención del usuario profundamente, recomendar cursos inteligentemente según nivel de habilidad y objetivos,
    proporcionar contexto sobre por qué los cursos específicos coinciden con las necesidades del usuario,
    para temas financieros explicar conceptos de mercado claramente y recomendar cursos y recursos de YouTube,
    apoyar aficiones y aprendizaje creativo por igual al desarrollo profesional.`,
    fr: `Vous êtes un conseiller expert en cours d'IA avec une connaissance approfondie des plateformes d'apprentissage en ligne.
    Votre rôle est de comprendre l'intention de l'utilisateur, recommander des cours intelligemment, et fournir un contexte détaillé.`,
    de: `Sie sind ein erfahrener KI-Kursberater mit tiefem Wissen über Online-Lernplattformen und Bildungsinhalte.
    Ihre Aufgabe ist es, die Absicht des Benutzers zu verstehen und intelligente Empfehlungen zu geben.`,
    zh: `你是一位拥有深厚在线学习平台知识的人工智能课程顾问专家。你的角色是理解用户意图、智能推荐课程并提供详细的背景信息。`,
    ja: `あなたはオンライン学習プラットフォームについて深い知識を持つAIコースアドバイザーの専門家です。ユーザーの意図を理解し、インテリジェントな推奨を提供することが役割です。`,
  }

  return prompts[language] || prompts.en
}

function getCourseRecommendations(userMessage: string): any[] {
  const lowerMessage = userMessage.toLowerCase()
  const courses: any[] = []

  // Python and Data Science
  if (lowerMessage.includes("python") || lowerMessage.includes("data") || lowerMessage.includes("data science")) {
    courses.push(...COURSES_DATABASE.python)
  }

  // Web Development and Frontend
  if (
    lowerMessage.includes("javascript") ||
    lowerMessage.includes("react") ||
    lowerMessage.includes("web") ||
    lowerMessage.includes("frontend") ||
    lowerMessage.includes("html") ||
    lowerMessage.includes("css")
  ) {
    courses.push(...COURSES_DATABASE.webdev)
  }

  // AI and Machine Learning
  if (
    lowerMessage.includes("ai") ||
    lowerMessage.includes("artificial intelligence") ||
    lowerMessage.includes("machine learning") ||
    lowerMessage.includes("deep learning") ||
    lowerMessage.includes("neural")
  ) {
    courses.push(...COURSES_DATABASE.ai)
  }

  // Design
  if (lowerMessage.includes("design") || lowerMessage.includes("ui") || lowerMessage.includes("ux")) {
    courses.push(...COURSES_DATABASE.design)
  }

  // Finance and Stock Market
  if (
    lowerMessage.includes("finance") ||
    lowerMessage.includes("investment") ||
    lowerMessage.includes("financial") ||
    lowerMessage.includes("stock") ||
    lowerMessage.includes("trading") ||
    lowerMessage.includes("crypto")
  ) {
    courses.push(...COURSES_DATABASE.finance)
  }

  // Career Development
  if (
    lowerMessage.includes("career") ||
    lowerMessage.includes("job") ||
    lowerMessage.includes("interview") ||
    lowerMessage.includes("transition")
  ) {
    courses.push(...COURSES_DATABASE.career_development)
  }

  // Hobbies and Creative
  if (
    lowerMessage.includes("photography") ||
    lowerMessage.includes("art") ||
    lowerMessage.includes("music") ||
    lowerMessage.includes("painting") ||
    lowerMessage.includes("hobby") ||
    lowerMessage.includes("creative")
  ) {
    courses.push(...COURSES_DATABASE.hobby_creative)
  }

  // Business
  if (
    lowerMessage.includes("business") ||
    lowerMessage.includes("entrepreneurship") ||
    lowerMessage.includes("management") ||
    lowerMessage.includes("strategy")
  ) {
    courses.push(...COURSES_DATABASE.business)
  }

  // Health and Wellness
  if (
    lowerMessage.includes("health") ||
    lowerMessage.includes("wellness") ||
    lowerMessage.includes("yoga") ||
    lowerMessage.includes("fitness") ||
    lowerMessage.includes("meditation")
  ) {
    courses.push(...COURSES_DATABASE.health_wellness)
  }

  // Language Learning
  if (
    lowerMessage.includes("language") ||
    lowerMessage.includes("spanish") ||
    lowerMessage.includes("french") ||
    lowerMessage.includes("english") ||
    lowerMessage.includes("german") ||
    lowerMessage.includes("learn")
  ) {
    courses.push(...COURSES_DATABASE.language)
  }

  if (courses.length === 0) {
    return [
      ...COURSES_DATABASE.default,
      ...COURSES_DATABASE.python.slice(0, 2),
      ...COURSES_DATABASE.webdev.slice(0, 2),
      ...COURSES_DATABASE.ai.slice(0, 2),
    ].slice(0, 6)
  }

  // Remove duplicates and return all matching courses (not just top 4)
  const uniqueCourses = Array.from(new Map(courses.map((c) => [c.title, c])).values())
  return uniqueCourses
}

function analyzeUserIntent(message: string): { category: string; intent: string } {
  const lowerMessage = message.toLowerCase()

  // Financial/Investment topics
  if (
    lowerMessage.includes("stock") ||
    lowerMessage.includes("trading") ||
    lowerMessage.includes("crypto") ||
    lowerMessage.includes("investing") ||
    lowerMessage.includes("market")
  ) {
    return { category: "finance", intent: "investment_learning" }
  }

  // Professional development
  if (
    lowerMessage.includes("career") ||
    lowerMessage.includes("job") ||
    lowerMessage.includes("promotion") ||
    lowerMessage.includes("skill")
  ) {
    return { category: "professional", intent: "career_growth" }
  }

  // Hobby/Creative
  if (
    lowerMessage.includes("hobby") ||
    lowerMessage.includes("art") ||
    lowerMessage.includes("music") ||
    lowerMessage.includes("photography") ||
    lowerMessage.includes("creative")
  ) {
    return { category: "creative", intent: "hobby_learning" }
  }

  // Technical/Programming
  if (
    lowerMessage.includes("code") ||
    lowerMessage.includes("program") ||
    lowerMessage.includes("javascript") ||
    lowerMessage.includes("python") ||
    lowerMessage.includes("web") ||
    lowerMessage.includes("app")
  ) {
    return { category: "technical", intent: "technical_skill" }
  }

  return { category: "general", intent: "general_inquiry" }
}

export async function POST(request: Request) {
  try {
    const { message, language = "en", conversationHistory = [] } = await request.json()

    const { category, intent } = analyzeUserIntent(message)

    const filteredHistory = conversationHistory.filter((msg: any, index: number) => {
      if (index === 0 && msg.role === "assistant") {
        console.log("[v0] Filtering out initial assistant greeting")
        return false
      }
      return msg.role && (msg.role === "user" || msg.role === "assistant")
    })

    const chatHistory: any[] = filteredHistory.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }))

    console.log("[v0] Formatted chat history:", {
      originalLength: conversationHistory.length,
      filteredLength: filteredHistory.length,
      userIntent: intent,
      category,
    })

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    })

    const systemPrompt = getEnhancedSystemPrompt(language)
    const fullMessage = `${systemPrompt}\n\nUser question: ${message}`

    console.log("[v0] Sending message to Gemini with history length:", chatHistory.length)
    const result = await chat.sendMessage(fullMessage)
    const response = await result.response
    const aiResponse = response.text()

    console.log("[v0] Received response from Gemini:", aiResponse.substring(0, 100) + "...")

    // Get course recommendations based on user intent and message
    const courses = getCourseRecommendations(message)

    return Response.json({
      message: aiResponse,
      courses: courses,
      metadata: { category, intent },
    })
  } catch (error) {
    console.error("[v0] Chat API Error:", error)
    return Response.json(
      {
        message: "I encountered an error processing your request. Please try again.",
        courses: [],
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
