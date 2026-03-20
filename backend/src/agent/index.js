import { tools, toolImplementations } from './tools.js';
import { buildMessages } from './prompts.js';
import { callQwen } from '../services/qwen.js';
import { saveTicket, saveMessage } from '../services/ticketService.js';
import db from '../db/database.js';
import { v4 as uuidv4 } from 'uuid';

export async function processMessage(userMessage, conversationId, customerId = '匿名用户') {
  const conversationHistory = getConversationHistory(conversationId);
  
  const messages = buildMessages(conversationHistory, userMessage);
  
  const response = await callQwen(messages, tools);
  
  const assistantMessage = response.choices[0].message;
  
  if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
    const toolCall = assistantMessage.tool_calls[0];
    
    if (toolCall.function.name === 'create_ticket') {
      const args = JSON.parse(toolCall.function.arguments);
      
      const context = { conversationId, customerId };
      let ticket = await toolImplementations.create_ticket(args, context);
      
      ticket = saveTicket(ticket);
      
      const reply = `已为您创建工单 #${ticket.id}，客服将在24小时内处理您的问题。`;
      
      saveMessage(conversationId, 'user', userMessage);
      saveMessage(conversationId, 'assistant', reply, ticket.id);
      
      return {
        reply,
        ticket: {
          id: ticket.id,
          category: ticket.category,
          priority: ticket.priority
        },
        conversationId
      };
    }
  }
  
  const reply = assistantMessage.content;
  
  saveMessage(conversationId, 'user', userMessage);
  saveMessage(conversationId, 'assistant', reply);
  
  return {
    reply,
    conversationId
  };
}

function getConversationHistory(conversationId) {
  const messages = db.prepare(`
    SELECT role, content 
    FROM messages 
    WHERE conversation_id = ? 
    ORDER BY created_at ASC
  `).all(conversationId);
  
  return messages;
}

export function createConversation(customerId = '匿名用户') {
  const id = uuidv4();
  
  db.prepare('INSERT INTO conversations (id, customer_id) VALUES (?, ?)').run(id, customerId);
  
  return id;
}

export function getOrCreateConversation(conversationId, customerId = '匿名用户') {
  if (conversationId) {
    const existing = db.prepare('SELECT * FROM conversations WHERE id = ?').get(conversationId);
    if (existing) {
      return conversationId;
    }
  }
  
  return createConversation(customerId);
}
