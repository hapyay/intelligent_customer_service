import { create } from 'zustand'
import { ticketApi, adminApi } from '../services/api'

const useTicketStore = create((set, get) => ({
  tickets: [],
  selectedTicket: null,
  stats: {
    todayCount: 0,
    pendingCount: 0,
    resolvedCount: 0,
    totalCount: 0
  },
  loading: false,
  error: null,

  fetchTickets: async (status = null) => {
    set({ loading: true, error: null })
    try {
      const { tickets } = await ticketApi.getAll(status)
      set({ tickets, loading: false })
    } catch (error) {
      set({ error: '获取工单列表失败', loading: false })
    }
  },

  fetchTicketById: async (id) => {
    set({ loading: true, error: null })
    try {
      const { ticket } = await ticketApi.getById(id)
      set({ selectedTicket: ticket, loading: false })
    } catch (error) {
      set({ error: '获取工单详情失败', loading: false })
    }
  },

  updateTicketStatus: async (id, status) => {
    try {
      await ticketApi.updateStatus(id, status)
      const { tickets, selectedTicket } = get()
      
      set({
        tickets: tickets.map(t => 
          t.id === id ? { ...t, status } : t
        ),
        selectedTicket: selectedTicket?.id === id 
          ? { ...selectedTicket, status } 
          : selectedTicket
      })
      
      return true
    } catch (error) {
      set({ error: '更新工单状态失败' })
      return false
    }
  },

  fetchStats: async () => {
    try {
      const stats = await adminApi.getStats()
      set({ stats })
    } catch (error) {
      console.error('获取统计数据失败:', error)
    }
  },

  selectTicket: (ticket) => {
    set({ selectedTicket: ticket })
  },

  clearSelection: () => {
    set({ selectedTicket: null })
  }
}))

export default useTicketStore
