'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'

interface Message {
  id: string
  text: string
  isAI: boolean
  timestamp: Date
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your FastForward AI assistant. I can help you track shipments, answer logistics questions, or guide you through our platform. How can I help you today?",
      isAI: true,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isAI: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = generateAIResponse(input)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isAI: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): string => {
    const lower = userInput.toLowerCase()

    // Tracking queries
    if (lower.includes('track') || lower.includes('tracking')) {
      return "To track your shipment, please provide your tracking number (e.g., FF-2025-001234). You can also use our advanced tracking page for real-time GPS updates and delivery notifications."
    }

    // Pricing queries
    if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) {
      return "We offer two plans:\n\n**Courier Platform** - $34.99/month with 13 features including customer portal, advanced tracking, and unlimited users.\n\n**Warehouse Platform** - $249.99/month with enterprise features like Stripe payments, API integrations, and cloud printing.\n\nBoth include a 14-day free trial!"
    }

    // Features queries
    if (lower.includes('feature') || lower.includes('capability')) {
      return "Our platform includes:\n✓ Real-time GPS tracking\n✓ Customer & Courier portals\n✓ Invoice management\n✓ Automated notifications\n✓ API integrations\n✓ White-label solution\n✓ Advanced analytics\n\nWhat specific feature would you like to know more about?"
    }

    // Demo queries
    if (lower.includes('demo') || lower.includes('try')) {
      return "Great! You can try our platform instantly without signing up. Just visit our onboarding page and select 'Try Demo' to explore with pre-loaded data. Would you like me to guide you through the demo features?"
    }

    // Support queries
    if (lower.includes('help') || lower.includes('support') || lower.includes('contact')) {
      return "I'm here to help! You can:\n• Ask me questions directly here\n• Email: support@fastforward.io\n• Call: 1-800-FASTFWD\n• Live chat: Available 24/7\n\nWhat do you need assistance with?"
    }

    // Integration queries
    if (lower.includes('api') || lower.includes('integrate') || lower.includes('webhook')) {
      return "Our API is RESTful and supports:\n• Shipment creation & tracking\n• Webhook notifications\n• Real-time updates\n• Rate limiting: 1000 req/min\n• Full documentation available\n\nNeed your API keys? Head to your dashboard settings!"
    }

    // Default response
    return "I'm not sure I understood that correctly. I can help you with:\n• Tracking shipments\n• Pricing information\n• Platform features\n• Demo access\n• API integration\n• General support\n\nWhat would you like to know?"
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full shadow-lg hover:shadow-2xl transition flex items-center justify-center group z-50"
        >
          <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition" />
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-orange-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">FastForward AI</h3>
                <div className="flex items-center gap-1 text-purple-100 text-xs">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.isAI ? 'justify-start' : 'justify-end'
                }`}
              >
                {message.isAI && (
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    message.isAI
                      ? 'bg-white border border-gray-200 text-gray-900'
                      : 'bg-gradient-to-r from-purple-600 to-orange-500 text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.isAI ? 'text-gray-500' : 'text-purple-100'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                {!message.isAI && (
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t border-gray-200 flex gap-2 flex-wrap">
            {['Track Shipment', 'Pricing', 'Demo', 'Support'].map((action) => (
              <button
                key={action}
                onClick={() => setInput(action)}
                className="text-xs px-3 py-1 bg-purple-50 text-purple-600 rounded-full hover:bg-purple-100 transition font-semibold"
              >
                {action}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="px-4 py-3 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-xl hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Powered by AI • Instant responses
            </p>
          </div>
        </div>
      )}
    </>
  )
}
