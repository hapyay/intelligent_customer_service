import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle, FileText, MessagesSquare, Sparkles, ChevronRight, Bot } from 'lucide-react'

const features = [
  {
    icon: MessageCircle,
    title: '智能问答',
    description: '基于大语言模型，理解用户意图，提供精准回答',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: FileText,
    title: '自动工单',
    description: 'AI自动识别问题类型，一键生成标准化工单',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: MessagesSquare,
    title: '多轮对话',
    description: '支持上下文理解，实现流畅的多轮交互体验',
    color: 'from-orange-500 to-red-500'
  }
]

const floatingBubbles = [
  { text: '您好！有什么可以帮您？', delay: 0, x: -60, y: -40 },
  { text: '退款问题', delay: 0.5, x: 70, y: -20 },
  { text: '账户安全', delay: 1, x: -50, y: 50 },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative z-10">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">智灵客服</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/admin" 
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              后台管理
            </Link>
            <Link 
              to="/chat" 
              className="btn-primary text-sm"
            >
              立即体验
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI驱动的智能客服解决方案
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="gradient-text">智灵客服</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl">7x24小时智能响应</span>
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0">
              基于先进的大语言模型技术，为您提供智能问答、自动工单生成、多轮对话等一站式客服解决方案
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/chat" className="btn-primary inline-flex items-center justify-center gap-2 text-lg">
                立即体验
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link to="/admin" className="btn-secondary inline-flex items-center justify-center gap-2 text-lg">
                查看后台
              </Link>
            </div>
          </motion.div>

          {/* Right Content - 3D Robot */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/30 to-accent-500/30 blur-3xl animate-pulse-slow" />
              
              {/* Robot Container */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full h-full flex items-center justify-center"
              >
                <div className="relative">
                  {/* Robot Body */}
                  <div className="w-48 h-56 md:w-56 md:h-64 rounded-[2rem] gradient-bg shadow-2xl shadow-primary-500/30 relative overflow-hidden">
                    {/* Face */}
                    <div className="absolute top-8 left-0 right-0 flex justify-center gap-6">
                      <motion.div 
                        animate={{ scaleY: [1, 0.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                        className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-inner"
                      />
                      <motion.div 
                        animate={{ scaleY: [1, 0.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, delay: 0.1 }}
                        className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-inner"
                      />
                    </div>
                    
                    {/* Mouth */}
                    <motion.div 
                      animate={{ scaleX: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-24 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/80 rounded-full"
                    />
                    
                    {/* Antenna */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-2 h-8 bg-white/50 rounded-full">
                      <motion.div 
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-400 shadow-lg shadow-accent-400/50"
                      />
                    </div>
                    
                    {/* Arms */}
                    <motion.div 
                      animate={{ rotate: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-20 -left-4 w-4 h-16 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full"
                    />
                    <motion.div 
                      animate={{ rotate: [5, -5, 5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-20 -right-4 w-4 h-16 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Floating Bubbles */}
              {floatingBubbles.map((bubble, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1, 1, 0.8],
                    x: bubble.x,
                    y: bubble.y
                  }}
                  transition={{ 
                    duration: 4,
                    delay: bubble.delay,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  className="absolute top-1/2 left-1/2 glass px-4 py-2 rounded-2xl text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap z-20"
                >
                  {bubble.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            核心功能
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="glass rounded-2xl p-8 card-hover group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="container mx-auto px-6 text-center text-gray-500 dark:text-gray-400">
          <p>© 2024 智灵客服 - 智能客服解决方案</p>
        </div>
      </footer>
    </div>
  )
}
