import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const chatApi = {
  sendMessage: async (message, conversationId = null, customerId = '访客用户') => {
    const response = await api.post('/chat/message', {
      message,
      conversationId,
      customerId
    })
    return response.data
  },
  
  getHistory: async (conversationId) => {
    const response = await api.get(`/chat/history/${conversationId}`)
    return response.data
  }
}

export const ticketApi = {
  getAll: async (status = null) => {
    const params = status ? { status } : {}
    const response = await api.get('/tickets', { params })
    return response.data
  },
  
  getById: async (id) => {
    const response = await api.get(`/tickets/${id}`)
    return response.data
  },
  
  updateStatus: async (id, status) => {
    const response = await api.put(`/tickets/${id}/status`, { status })
    return response.data
  }
}

export const adminApi = {
  getStats: async () => {
    const response = await api.get('/admin/stats')
    return response.data
  }
}

export default api
