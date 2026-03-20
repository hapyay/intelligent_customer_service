import { Router } from 'express';
import { processMessage, getOrCreateConversation } from '../agent/index.js';
import { getConversationMessages } from '../services/ticketService.js';

const router = Router();

router.post('/message', async (req, res) => {
  try {
    const { message, conversationId, customerId } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: '消息内容不能为空' });
    }
    
    const convId = getOrCreateConversation(conversationId, customerId);
    
    const result = await processMessage(message, convId, customerId);
    
    res.json(result);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: '处理消息时发生错误',
      reply: '抱歉，系统暂时无法响应，请稍后再试。'
    });
  }
});

router.get('/history/:conversationId', (req, res) => {
  try {
    const { conversationId } = req.params;
    
    const messages = getConversationMessages(conversationId);
    
    res.json({ messages });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: '获取对话历史失败' });
  }
});

export default router;
