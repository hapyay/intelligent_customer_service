import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, FileText, ArrowLeft, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import useChatStore from '../stores/chatStore'

const quickQuestions = [
  '如何退款？',
  '账户被盗怎么办？',
  '修改绑定手机',
  '支付遇到问题',
  '如何联系人工客服？'
]

function MessageBubble({ message }) {
  const isUser = message.role === 'user'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-primary-100 dark:bg-primary-900/50' 
          : 'gradient-bg'
      }`}>
        {isUser 
          ? <User className="w-4 h-4 text-primary-600 dark:text-primary-300" />
          : <Bot className="w-4 h-4 text-white" />
        }
      </div>
      
      <div className={`max-w-[70%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block px-4 py-3 rounded-2xl ${
          isUser 
            ? 'bg-primary-600 text-white rounded-tr-sm' 
            : 'glass dark:glass-dark rounded-tl-sm'
        }`}>
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        
        {message.ticket && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs"
          >
            <FileText className="w-3 h-3" />
            工单 #{message.ticket.id} 已创建
          </motion.div>
        )}
        
        <p className="text-xs text-gray-400 mt-1 px-1">
          {new Date(message.timestamp).toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="glass dark:glass-dark px-4 py-3 rounded-2xl rounded-tl-sm">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing" style={{ animationDelay: '0s' }} />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing" style={{ animationDelay: '0.2s' }} />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  
  const { messages, isTyping, sendMessage, reset, currentTicket } = useChatStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isTyping) return
    
    const message = input.trim()
    setInput('')
    await sendMessage(message)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickQuestion = (question) => {
    setInput(question)
    inputRef.current?.focus()
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass dark:glass-dark sticky top-0 z-20 border-b border-white/10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900 dark:text-white">智灵客服</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">模拟体验，对话将生成测试工单</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={reset}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="重新开始"
          >
            <RotateCcw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 flex gap-6">
        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-800/50 rounded-2xl shadow-xl overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  您好，我是智灵客服
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  有什么可以帮助您的吗？
                </p>
              </div>
            )}
            
            <AnimatePresence>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
            </AnimatePresence>
            
            {isTyping && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-100 dark:border-gray-700 p-4">
            <div className="flex gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入您的问题..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 
                         bg-gray-50 dark:bg-gray-700 focus:border-primary-500 
                         focus:ring-2 focus:ring-primary-500/20 outline-none 
                         transition-all duration-200 resize-none text-gray-900 dark:text-white"
                rows="1"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="px-4 py-3 rounded-xl gradient-bg text-white font-medium 
                         shadow-lg shadow-primary-500/30 hover:shadow-xl 
                         disabled:opacity-50 disabled:cursor-not-allowed 
                         transition-all duration-300"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Questions Panel */}
        <div className="hidden lg:block w-72">
          <div className="glass dark:glass-dark rounded-2xl p-6 sticky top-24">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              常见问题
            </h3>
            <div className="space-y-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 
                           hover:bg-primary-50 dark:hover:bg-primary-900/30 
                           text-gray-700 dark:text-gray-300 hover:text-primary-600 
                           dark:hover:text-primary-400 text-sm transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
            
            {currentTicket && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
              >
                <div className="flex items-center gap-2 text-green-700 dark:text-green-300 mb-2">
                  <FileText className="w-4 h-4" />
                  <span className="font-medium text-sm">工单已创建</span>
                </div>
                <p className="text-xs text-green-600 dark:text-green-400">
                  工单号: #{currentTicket.id}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  分类: {currentTicket.category}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">
                  优先级: {currentTicket.priority}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
