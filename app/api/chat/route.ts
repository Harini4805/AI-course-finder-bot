import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const COURSES_DATABASE = {
  python: [
    {
      title: 'Python for Data Science',
      provider: 'Coursera',
      level: 'Intermediate',
      duration: '6 weeks',
      rating: 4.8,
      price: '$39/month',
      url: 'https://www.coursera.org/learn/python-data-analysis',
      description: 'Learn Python fundamentals and data analysis with pandas and NumPy',
      tags: ['Python', 'Data Science', 'Analytics'],
    },
    {
      title: 'Complete Python Bootcamp',
      provider: 'Udemy',
      level: 'Beginner',
      duration: '22 hours',
      rating: 4.6,
      price: '$14.99',
      url: 'https://www.udemy.com/course/complete-python-bootcamp/',
      description: 'Complete Python programming course from basics to advanced',
      tags: ['Python', 'Programming', 'Fundamentals'],
    },
  ],
  webdev: [
    {
      title: 'The Complete JavaScript Course 2024',
      provider: 'Udemy',
      level: 'Beginner',
      duration: '69 hours',
      rating: 4.7,
      price: '$14.99',
      url: 'https://www.udemy.com/course/the-complete-javascript-course/',
      description: 'Master JavaScript, DOM manipulation, and async programming',
      tags: ['JavaScript', 'Web Development', 'Frontend'],
    },
    {
      title: 'React - The Complete Guide',
      provider: 'Udemy',
      level: 'Intermediate',
      duration: '48 hours',
      rating: 4.8,
      price: '$14.99',
      url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
      description: 'Learn React with hooks, Redux, and modern patterns',
      tags: ['React', 'JavaScript', 'Frontend'],
    },
    {
      title: 'Full Stack Web Development Bootcamp',
      provider: 'Coursera',
      level: 'Intermediate',
      duration: '6 months',
      rating: 4.7,
      price: 'Free with certificate option',
      url: 'https://www.coursera.org/professional-certificates/full-stack-web-development',
      description: 'Learn frontend and backend web development from scratch',
      tags: ['Full Stack', 'Web Development', 'Backend'],
    },
  ],
  ai: [
    {
      title: 'Machine Learning Specialization',
      provider: 'Coursera',
      level: 'Intermediate',
      duration: '3 months',
      rating: 4.9,
      price: '$39/month',
      url: 'https://www.coursera.org/specializations/machine-learning-introduction',
      description: 'Learn ML fundamentals with Andrew Ng',
      tags: ['Machine Learning', 'AI', 'Data Science'],
    },
    {
      title: 'Deep Learning Specialization',
      provider: 'Coursera',
      level: 'Advanced',
      duration: '4 months',
      rating: 4.8,
      price: '$39/month',
      url: 'https://www.coursera.org/specializations/deep-learning',
      description: 'Master neural networks and deep learning',
      tags: ['Deep Learning', 'Neural Networks', 'AI'],
    },
    {
      title: 'Generative AI for Everyone',
      provider: 'Coursera',
      level: 'Beginner',
      duration: '1 hour',
      rating: 4.9,
      price: 'Free',
      url: 'https://www.coursera.org/learn/generative-ai-for-everyone',
      description: 'Introduction to generative AI and large language models',
      tags: ['AI', 'Generative AI', 'LLM'],
    },
  ],
  design: [
    {
      title: 'UI/UX Design Specialization',
      provider: 'Coursera',
      level: 'Beginner',
      duration: '3 months',
      rating: 4.8,
      price: '$39/month',
      url: 'https://www.coursera.org/specializations/user-experience-design',
      description: 'Master UI/UX design principles and tools',
      tags: ['Design', 'UI/UX', 'User Experience'],
    },
  ],
  finance: [
    {
      title: 'Finance for Everyone: Smart Tools for Decision-Making',
      provider: 'Coursera',
      level: 'Beginner',
      duration: '4 weeks',
      rating: 4.8,
      price: 'Free',
      url: 'https://www.coursera.org/learn/finance-for-everyone',
      description: 'Learn financial concepts and decision-making',
      tags: ['Finance', 'Business', 'Economics'],
    },
  ],
  default: [
    {
      title: 'Learning How to Learn',
      provider: 'Coursera',
      level: 'Beginner',
      duration: '4 weeks',
      rating: 4.9,
      price: 'Free',
      url: 'https://www.coursera.org/learn/learning-how-to-learn',
      description: 'Master learning techniques and develop effective study habits',
      tags: ['Learning', 'Study Skills', 'Personal Development'],
    },
  ],
}

function getSystemPrompt(language: string): string {
  const prompts: { [key: string]: string } = {
    en: `You are an expert AI course advisor. Help users find the best online courses based on their interests, skill level, and goals. 
    When giving recommendations, be specific about course titles, providers, and why they're suitable.
    Keep responses concise and friendly. Ask clarifying questions if needed.
    Format course recommendations clearly with course name, platform, duration, and why it matches their needs.`,
    es: `Eres un asesor experto en cursos de IA. Ayuda a los usuarios a encontrar los mejores cursos en línea según sus intereses, nivel de habilidad y objetivos.
    Al dar recomendaciones, sé específico sobre títulos de cursos, proveedores y por qué son adecuados.
    Mantén las respuestas concisas y amables. Haz preguntas aclaratorias si es necesario.
    Formatea las recomendaciones de cursos claramente con nombre del curso, plataforma, duración y por qué coincide con sus necesidades.`,
    fr: `Vous êtes un expert en conseil en cours d'IA. Aidez les utilisateurs à trouver les meilleurs cours en ligne en fonction de leurs intérêts, niveau de compétences et objectifs.
    Lors de la formulation de recommandations, soyez précis sur les titres des cours, les fournisseurs et pourquoi ils conviennent.
    Gardez les réponses prägnant et freundlich. Stellen Sie bei Bedarf Klärungsfragen.
    Formatez clairement les recommandations de cours avec le nom du cours, la plateforme, la durée et pourquoi cela correspond à leurs besoins.`,
    de: `Sie sind ein erfahrener KI-Kursberater. Helfen Sie Benutzern, die besten Online-Kurse basierend auf ihren Interessen, Fähigkeitsstand und Zielen zu finden.
    Seien Sie bei Empfehlungen spezifisch bezüglich Kurstitel, Anbieter und warum sie geeignet sind.
    Halten Sie Antworten prägnant und freundlich. Stellen Sie bei Bedarf Klärungsfragen.
    Formatieren Sie Kursempfehlungen klar mit Kursname, Plattform, Dauer und warum sie zu ihren Bedürfnissen passt.`,
    zh: `你是一位专业的人工智能课程顾问。帮助用户根据他们的兴趣、技能水平和目标找到最好的在线课程。
    在提出建议时，要具体说明课程名称、提供者以及为什么它们适合。
    保持回复简洁友好。如有必要，提出澄清问题。
    清晰地格式化课程推荐，包括课程名称、平台、时长以及为什么它符合他们的需求。`,
    ja: `あなたはAIコースアドバイザーの専門家です。ユーザーが関心、スキルレベル、目標に基づいて最適なオンラインコースを見つけるのをお手伝いします。
    推奨する際には、コースのタイトル、プロバイダー、および適切な理由について具体的にしてください。
    簡潔でフレンドリーな対応を心がけましょう。必要に応じて明確化の質問をしてください。
    コース名、プラットフォーム、期間、およびニーズに合う理由を含めて、コース推奨を明確にフォーマットしてください。`,
  }

  return prompts[language] || prompts.en
}

function getCourseRecommendations(userMessage: string): any[] {
  const lowerMessage = userMessage.toLowerCase()
  const courses: any[] = []

  // Python and Data Science
  if (lowerMessage.includes('python') || lowerMessage.includes('data') || lowerMessage.includes('data science')) {
    courses.push(...COURSES_DATABASE.python)
  }

  // Web Development and Frontend
  if (
    lowerMessage.includes('javascript') ||
    lowerMessage.includes('react') ||
    lowerMessage.includes('web') ||
    lowerMessage.includes('frontend') ||
    lowerMessage.includes('html') ||
    lowerMessage.includes('css')
  ) {
    courses.push(...COURSES_DATABASE.webdev)
  }

  // AI and Machine Learning
  if (
    lowerMessage.includes('ai') ||
    lowerMessage.includes('artificial intelligence') ||
    lowerMessage.includes('machine learning') ||
    lowerMessage.includes('deep learning') ||
    lowerMessage.includes('neural')
  ) {
    courses.push(...COURSES_DATABASE.ai)
  }

  // Design
  if (lowerMessage.includes('design') || lowerMessage.includes('ui') || lowerMessage.includes('ux')) {
    courses.push(...COURSES_DATABASE.design)
  }

  // Finance
  if (lowerMessage.includes('finance') || lowerMessage.includes('investment') || lowerMessage.includes('financial')) {
    courses.push(...COURSES_DATABASE.finance)
  }

  // If no specific match, return default courses
  if (courses.length === 0) {
    return COURSES_DATABASE.default
  }

  // Remove duplicates and limit to top 4 recommendations
  const uniqueCourses = Array.from(new Map(courses.map((c) => [c.title, c])).values())
  return uniqueCourses.slice(0, 4)
}

export async function POST(request: Request) {
  try {
    const { message, language = 'en', conversationHistory = [] } = await request.json()

    // Only include user and assistant messages that are part of actual conversation
    const filteredHistory = conversationHistory.filter((msg: any, index: number) => {
      // Skip the first message if it's an assistant greeting
      if (index === 0 && msg.role === 'assistant') {
        console.log('[v0] Filtering out initial assistant greeting')
        return false
      }
      return msg.role && (msg.role === 'user' || msg.role === 'assistant')
    })

    const chatHistory: any[] = filteredHistory.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }))

    console.log('[v0] Formatted chat history:', {
      originalLength: conversationHistory.length,
      filteredLength: filteredHistory.length,
      formattedHistory: chatHistory.map((h) => ({ role: h.role, contentLength: h.parts[0].text.length })),
    })

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
      },
    })

    const systemPrompt = getSystemPrompt(language)
    
    const fullMessage = `${systemPrompt}\n\nUser question: ${message}`
    
    console.log('[v0] Sending message to Gemini with history length:', chatHistory.length)
    const result = await chat.sendMessage(fullMessage)
    const response = await result.response
    const aiResponse = response.text()

    console.log('[v0] Received response from Gemini:', aiResponse.substring(0, 100) + '...')

    // Get course recommendations based on the message
    const courses = getCourseRecommendations(message)

    return Response.json({
      message: aiResponse,
      courses: courses,
    })
  } catch (error) {
    console.error('[v0] Chat API Error:', error)
    return Response.json(
      { 
        message: 'I encountered an error processing your request. Please try again.',
        courses: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
