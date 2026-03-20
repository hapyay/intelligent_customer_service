import { create } from 'zustand'
import { chatApi } from '../services/api'

const useChatStore = create((set, get) => ({
  messages: [],
  conversationId: null,
  isTyping: false,
  currentTicket: null,

  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, {
        id: Date.now().toString(),
        ...message,
        timestamp: new Date().toISOString()
      }]
    }))
  },

  sendMessage: async (content) => {
    const { conversationId, addMessage } = get()
    
    addMessage({ role: 'user', content })
    
    set({ isTyping: true, currentTicket: null })
    
    try {
      const response = await chatApi.sendMessage(content, conversationId)
      
      set({ conversationId: response.conversationId })
      
      addMessage({ 
        role: 'assistant', 
        content: response.reply,
        ticket: response.ticket
      })
      
      if (response.ticket) {
        set({ currentTicket: response.ticket })
      }
    } catch (error) {
      console.error('发送消息失败:', error)
      addMessage({ 
        role: 'assistant', 
        content: '抱歉，系统暂时无法响应，请稍后再试。' 
      })
    } finally {
      set({ isTyping: false })
    }
  },

  loadHistory: async (convId) => {
    if (!convId) return
    
    try {
      const { messages } = await chatApi.getHistory(convId)
      set({ 
        messages: messages.map(m => ({
          id: m.id,
          role: m.role,
          content: m.content,
          timestamp: m.created_at
        })),
        conversationId: convId
      })
    } catch (error) {
      console.error('加载历史记录失败:', error)
    }
  },

  reset: () => {
    set({
      messages: [],
      conversationId: null,
      isTyping: false,
      currentTicket: null
    })
  }
}))

export default useChatStore
