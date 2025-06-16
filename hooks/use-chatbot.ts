import { useState, useCallback } from "react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "quick-reply" | "link"
  suggestions?: string[]
  links?: { text: string; href: string }[]
}

interface ChatbotResponse {
  response: string
  links?: { text: string; href: string }[]
  suggestions?: string[]
}

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm here to help you learn about Dr. Diego F. Cuadros' research, publications, and expertise. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
      type: "quick-reply",
      suggestions: ["Research Overview", "Publications", "Contact Info", "Expertise & Services"]
    }
  ])
  const [isTyping, setIsTyping] = useState(false)

  const generateResponse = useCallback((userMessage: string): ChatbotResponse => {
    const message = userMessage.toLowerCase()
    
    // Enhanced knowledge base with more specific responses
    const responses: Record<string, ChatbotResponse> = {
      research: {
        response: "Dr. Cuadros conducts cutting-edge research in spatial epidemiology and global health, with particular focus on HIV/AIDS dynamics, infectious disease modeling, and health disparities across Sub-Saharan Africa, North America, and other regions.",
        links: [
          { text: "View Research Themes", href: "/research/themes" },
          { text: "See Current Projects", href: "/research/projects" }
        ],
        suggestions: ["Tell me about publications", "What about global reach?", "Show expertise services"]
      },
      publications: {
        response: "Dr. Cuadros has published 42+ research articles in top-tier journals including Science, Nature Communications, Nature Medicine, and BMJ Global Health. His work spans HIV hotspots, COVID-19 genomic surveillance, and methodological innovations.",
        links: [
          { text: "Browse All Publications", href: "/publications" },
          { text: "Research Themes", href: "/research/themes" }
        ],
        suggestions: ["Contact information", "Research collaborations", "Teaching opportunities"]
      },
      contact: {
        response: "You can reach Dr. Cuadros through the contact page or email. He's always open to collaborations and discussions about global health research.",
        links: [
          { text: "Contact Page", href: "/contact" },
          { text: "About Dr. Cuadros", href: "/about" }
        ],
        suggestions: ["Learn about expertise", "View publications", "See global research"]
      },
      expertise: {
        response: "Dr. Cuadros offers expertise in spatial epidemiology, GIS applications in health, infectious disease modeling, and global health program evaluation. He provides consulting services and collaborative research opportunities.",
        links: [
          { text: "Expertise & Services", href: "/expertise-services" },
          { text: "Research Collaborations", href: "/research" }
        ],
        suggestions: ["Contact for collaboration", "View recent publications", "Teaching opportunities"]
      },
      teaching: {
        response: "Dr. Cuadros is passionate about mentoring the next generation of global health researchers. He offers teaching in spatial epidemiology, GIS applications, and infectious disease modeling.",
        links: [
          { text: "Teaching & Mentoring", href: "/teaching-mentoring" },
          { text: "Lab Members & Openings", href: "/research/lab-members" }
        ],
        suggestions: ["Research opportunities", "Contact information", "View expertise"]
      },
      global: {
        response: "Dr. Cuadros' research spans globally with significant work in Sub-Saharan Africa, North America, South America, and Asia. His spatial epidemiology approach provides insights into disease patterns worldwide.",
        links: [
          { text: "Explore Global Reach", href: "/global-reach" },
          { text: "View Research Map", href: "/research" }
        ],
        suggestions: ["Learn about specific studies", "View publications by region", "Contact for collaborations"]
      },
      hiv: {
        response: "Dr. Cuadros is a leading researcher in HIV/AIDS epidemiology, with extensive work on transmission dynamics, care access, co-infections, and achieving UNAIDS 95-95-95 targets across multiple countries.",
        links: [
          { text: "HIV Research Publications", href: "/publications" },
          { text: "Research Themes", href: "/research/themes" }
        ],
        suggestions: ["COVID-19 research", "Spatial methods", "Global health impact"]
      },
      covid: {
        response: "Dr. Cuadros has conducted important research on COVID-19 transmission dynamics, genomic surveillance, and vaccination strategies, contributing to pandemic response efforts.",
        links: [
          { text: "COVID-19 Publications", href: "/publications" },
          { text: "Research Projects", href: "/research/projects" }
        ],
        suggestions: ["HIV research", "Global health work", "Methodology innovations"]
      },
      greeting: {
        response: "Hello! Welcome to Dr. Diego F. Cuadros' research website. I'm here to help you explore his work in spatial epidemiology and global health. What interests you most?",
        suggestions: ["Research overview", "Latest publications", "Global research locations", "Contact information"]
      }
    }

    // Match user input to responses
    for (const [key, responseData] of Object.entries(responses)) {
      if (message.includes(key) || 
          (key === "research" && (message.includes("study") || message.includes("work"))) ||
          (key === "publications" && (message.includes("paper") || message.includes("article"))) ||
          (key === "contact" && (message.includes("email") || message.includes("reach"))) ||
          (key === "expertise" && (message.includes("service") || message.includes("consulting"))) ||
          (key === "teaching" && (message.includes("mentor") || message.includes("student"))) ||
          (key === "global" && (message.includes("location") || message.includes("world") || message.includes("map"))) ||
          (key === "hiv" && message.includes("aids")) ||
          (key === "covid" && message.includes("pandemic")) ||
          (key === "greeting" && (message.includes("hello") || message.includes("hi") || message.includes("hey")))) {
        return responseData
      }
    }

    // Default response
    return {
      response: "I'd be happy to help you learn more about Dr. Cuadros' work! You can ask me about his research, publications, expertise, or how to get in touch.",
      suggestions: ["Tell me about Dr. Cuadros' research", "What are his latest publications?", "How can I contact him?", "What expertise does he offer?"]
    }
  }, [])

  const addMessage = useCallback((message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
    return newMessage
  }, [])

  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return

    // Add user message
    addMessage({
      content,
      sender: "user"
    })

    setIsTyping(true)

    // Simulate typing delay and generate response
    setTimeout(() => {
      const { response, links, suggestions } = generateResponse(content)
      
      addMessage({
        content: response,
        sender: "bot",
        type: links && links.length > 0 ? "link" : "text",
        links,
        suggestions
      })
      
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }, [addMessage, generateResponse])

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        content: "Hello! I'm here to help you learn about Dr. Diego F. Cuadros' research, publications, and expertise. What would you like to know?",
        sender: "bot",
        timestamp: new Date(),
        type: "quick-reply",
        suggestions: ["Research Overview", "Publications", "Contact Info", "Expertise & Services"]
      }
    ])
  }, [])

  return {
    messages,
    isTyping,
    sendMessage,
    clearMessages
  }
} 