import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  RefreshCw, Sun, Moon, FileText, Clock, CheckCircle, 
  AlertCircle, User, Tag, MessageSquare, ChevronRight,
  Bot, ArrowLeft
} from 'lucide-react'
import { Link } from 'react-router-dom'
import useTicketStore from '../stores/ticketStore'

const statusColors = {
  '待处理': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  '处理中': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  '已解决': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  '已关闭': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
}

const priorityColors = {
  '高': 'text-red-600 dark:text-red-400',
  '中': 'text-yellow-600 dark:text-yellow-400',
  '低': 'text-green-600 dark:text-green-400'
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="glass dark:glass-dark rounded-xl p-4 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  )
}

function TicketItem({ ticket, isSelected, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
        isSelected 
          ? 'bg-primary-50 dark:bg-primary-900/30 border-2 border-primary-500' 
          : 'bg-white/50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent'
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-sm text-primary-600 dark:text-primary-400">
          #{ticket.id}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[ticket.status]}`}>
          {ticket.status}
        </span>
      </div>
      <p className="text-sm text-gray-900 dark:text-white font-medium truncate mb-1">
        {ticket.description}
      </p>
      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <User className="w-3 h-3" />
          {ticket.customer_id}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {new Date(ticket.created_at).toLocaleDateString('zh-CN')}
        </span>
      </div>
    </motion.button>
  )
}

function TicketDetail({ ticket, onUpdateStatus }) {
  const [updating, setUpdating] = useState(false)

  const handleStatusChange = async (newStatus) => {
    setUpdating(true)
    await onUpdateStatus(ticket.id, newStatus)
    setUpdating(false)
  }

  if (!ticket) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
        <div className="text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>选择一个工单查看详情</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            工单 #{ticket.id}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            创建于 {new Date(ticket.created_at).toLocaleString('zh-CN')}
          </p>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${statusColors[ticket.status]}`}>
          {ticket.status}
        </span>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
            <User className="w-4 h-4" />
            <span className="text-xs">客户ID</span>
          </div>
          <p className="font-medium text-gray-900 dark:text-white">{ticket.customer_id}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
            <Tag className="w-4 h-4" />
            <span className="text-xs">问题分类</span>
          </div>
          <p className="font-medium text-gray-900 dark:text-white">{ticket.category}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs">优先级</span>
          </div>
          <p className={`font-medium ${priorityColors[ticket.priority]}`}>{ticket.priority}</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs">更新时间</span>
          </div>
          <p className="font-medium text-gray-900 dark:text-white text-sm">
            {new Date(ticket.updated_at).toLocaleDateString('zh-CN')}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">工单描述</h3>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
          <p className="text-gray-900 dark:text-white">{ticket.description}</p>
        </div>
      </div>

      {/* Conversation History */}
      {ticket.messages && ticket.messages.length > 0 && (
        <div className="flex-1 mb-6 overflow-hidden flex flex-col">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">对话记录</h3>
          <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-3">
            {ticket.messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status Actions */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">更新状态</h3>
        <div className="flex gap-2 flex-wrap">
          {['待处理', '处理中', '已解决', '已关闭'].map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              disabled={updating || ticket.status === status}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                ticket.status === status
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              } disabled:opacity-50`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function AdminPage() {
  const [isDark, setIsDark] = useState(false)
  const { 
    tickets, 
    selectedTicket, 
    stats, 
    loading,
    fetchTickets, 
    fetchTicketById, 
    fetchStats, 
    updateTicketStatus,
    selectTicket 
  } = useTicketStore()

  useEffect(() => {
    fetchTickets()
    fetchStats()
  }, [fetchTickets, fetchStats])

  useEffect(() => {
    const dark = localStorage.getItem('theme') === 'dark'
    setIsDark(dark)
  }, [])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    localStorage.setItem('theme', newDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', newDark)
  }

  const handleRefresh = () => {
    fetchTickets()
    fetchStats()
  }

  const handleSelectTicket = async (ticket) => {
    selectTicket(ticket)
    await fetchTicketById(ticket.id)
  }

  const handleUpdateStatus = async (id, status) => {
    await updateTicketStatus(id, status)
    fetchStats()
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
              <h1 className="font-semibold text-gray-900 dark:text-white">后台管理</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-5 h-5 text-gray-600 dark:text-gray-300 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            icon={FileText} 
            label="今日工单" 
            value={stats.todayCount}
            color="bg-blue-500"
          />
          <StatCard 
            icon={Clock} 
            label="待处理" 
            value={stats.pendingCount}
            color="bg-yellow-500"
          />
          <StatCard 
            icon={CheckCircle} 
            label="已解决" 
            value={stats.resolvedCount}
            color="bg-green-500"
          />
          <StatCard 
            icon={MessageSquare} 
            label="总工单" 
            value={stats.totalCount}
            color="bg-purple-500"
          />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Ticket List */}
          <div className="lg:col-span-1">
            <div className="glass dark:glass-dark rounded-2xl p-4">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4">工单列表</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                <AnimatePresence>
                  {tickets.map((ticket) => (
                    <TicketItem
                      key={ticket.id}
                      ticket={ticket}
                      isSelected={selectedTicket?.id === ticket.id}
                      onClick={() => handleSelectTicket(ticket)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Ticket Detail */}
          <div className="lg:col-span-2">
            <div className="glass dark:glass-dark rounded-2xl p-6 h-full min-h-[600px]">
              <TicketDetail 
                ticket={selectedTicket} 
                onUpdateStatus={handleUpdateStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
