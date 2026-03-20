import db from '../db/database.js';
import { v4 as uuidv4 } from 'uuid';

export function saveTicket(ticketData) {
  const stmt = db.prepare(`
    INSERT INTO tickets (id, conversation_id, customer_id, category, priority, description, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(
    ticketData.id,
    ticketData.conversation_id,
    ticketData.customer_id,
    ticketData.category,
    ticketData.priority,
    ticketData.description,
    ticketData.status || '待处理'
  );
  
  return ticketData;
}

export function getTickets(options = {}) {
  const { status, limit = 50, offset = 0 } = options;
  
  let sql = 'SELECT * FROM tickets';
  const params = [];
  
  if (status) {
    sql += ' WHERE status = ?';
    params.push(status);
  }
  
  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(limit, offset);
  
  return db.prepare(sql).all(...params);
}

export function getTicketById(id) {
  const ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(id);
  
  if (!ticket) {
    return null;
  }
  
  const messages = db.prepare(`
    SELECT role, content, created_at 
    FROM messages 
    WHERE conversation_id = ? 
    ORDER BY created_at ASC
  `).all(ticket.conversation_id);
  
  return {
    ...ticket,
    messages
  };
}

export function updateTicketStatus(id, status) {
  const validStatuses = ['待处理', '处理中', '已解决', '已关闭'];
  
  if (!validStatuses.includes(status)) {
    throw new Error(`无效的工单状态: ${status}`);
  }
  
  const stmt = db.prepare('UPDATE tickets SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
  const result = stmt.run(status, id);
  
  return result.changes > 0;
}

export function getStats() {
  const today = new Date().toISOString().split('T')[0];
  
  const todayCount = db.prepare(`
    SELECT COUNT(*) as count FROM tickets 
    WHERE date(created_at) = ?
  `).get(today).count;
  
  const pendingCount = db.prepare(`
    SELECT COUNT(*) as count FROM tickets 
    WHERE status IN ('待处理', '处理中')
  `).get().count;
  
  const resolvedCount = db.prepare(`
    SELECT COUNT(*) as count FROM tickets 
    WHERE status = '已解决'
  `).get().count;
  
  const totalCount = db.prepare('SELECT COUNT(*) as count FROM tickets').get().count;
  
  return {
    todayCount,
    pendingCount,
    resolvedCount,
    totalCount
  };
}

export function saveMessage(conversationId, role, content, ticketId = null) {
  const id = `msg-${uuidv4()}`;
  
  const stmt = db.prepare(`
    INSERT INTO messages (id, conversation_id, role, content, ticket_id)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  stmt.run(id, conversationId, role, content, ticketId);
  
  return { id, conversationId, role, content, ticketId };
}

export function getConversationMessages(conversationId) {
  return db.prepare(`
    SELECT id, role, content, ticket_id, created_at 
    FROM messages 
    WHERE conversation_id = ? 
    ORDER BY created_at ASC
  `).all(conversationId);
}
