"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useChatbot } from "@/hooks/use-chatbot"

interface ChatbotProps {
  className?: string
}

export default function Chatbot({ className }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  const { messages, isTyping, sendMessage } = useChatbot()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputValue.trim()
    if (!text) return

    sendMessage(text)
    setInputValue("")
  }

  const handleQuickReply = (suggestion: string) => {
    sendMessage(suggestion)
  }

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setIsMinimized(false)
    }
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "mb-4 w-80 sm:w-96",
              isMinimized && "w-64"
            )}
          >
            <Card className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-slate-200 dark:border-slate-700 shadow-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Research Assistant
                      </CardTitle>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Ask about Dr. Cuadros' work
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    >
                      {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 p-0 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {!isMinimized && (
                <CardContent className="pt-0">
                  <ScrollArea className="h-80 pr-3">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={cn(
                            "flex gap-2",
                            message.sender === "user" ? "justify-end" : "justify-start"
                          )}
                        >
                          {message.sender === "bot" && (
                            <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-1">
                              <Bot className="h-3 w-3 text-white" />
                            </div>
                          )}
                          <div
                            className={cn(
                              "max-w-[75%] rounded-lg px-3 py-2 text-sm",
                              message.sender === "user"
                                ? "bg-teal-500 text-white"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                            )}
                          >
                            <p>{message.content}</p>
                            
                            {message.links && message.links.length > 0 && (
                              <div className="mt-2 space-y-1">
                                {message.links.map((link, index) => (
                                  <a
                                    key={index}
                                    href={link.href}
                                    className="block text-xs text-teal-600 dark:text-teal-400 hover:underline"
                                  >
                                    → {link.text}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                          {message.sender === "user" && (
                            <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center flex-shrink-0 mt-1">
                              <User className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex gap-2 justify-start">
                          <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="h-3 w-3 text-white" />
                          </div>
                          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Quick Reply Suggestions */}
                      {messages.length > 0 && messages[messages.length - 1].suggestions && !isTyping && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {messages[messages.length - 1].suggestions?.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuickReply(suggestion)}
                              className="text-xs h-7 px-2 text-teal-600 border-teal-300 hover:bg-teal-50 dark:text-teal-400 dark:border-teal-600 dark:hover:bg-teal-950"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div ref={messagesEndRef} />
                  </ScrollArea>

                  <div className="flex gap-2 mt-4">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Ask about research, publications..."
                      className="flex-1 text-sm"
                    />
                    <Button
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim()}
                      size="sm"
                      className="bg-teal-500 hover:bg-teal-600 text-white px-3"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Toggle Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3"
      >
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg border border-slate-200 dark:border-slate-600"
          >
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
              Ask about me
            </span>
          </motion.div>
        )}
        <Button
          onClick={toggleChatbot}
          className={cn(
            "h-12 w-12 rounded-full shadow-lg bg-teal-500 hover:bg-teal-600 text-white border-2 border-white dark:border-slate-800",
            isOpen && "bg-slate-600 hover:bg-slate-700"
          )}
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <MessageCircle className="h-5 w-5" />
          )}
        </Button>
      </motion.div>

      {/* Notification Badge for new users */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
        >
          <Sparkles className="h-2 w-2 text-white" />
        </motion.div>
      )}
    </div>
  )
} 