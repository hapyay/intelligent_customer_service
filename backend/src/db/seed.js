import db from './database.js';
import { v4 as uuidv4 } from 'uuid';

const sampleTickets = [
  {
    id: 'T10001',
    conversation_id: 'conv-001',
    customer_id: '用户A',
    category: '退款问题',
    priority: '高',
    description: '用户购买的商品存在质量问题，申请退款处理。订单号：ORD20240115001',
    status: '待处理'
  },
  {
    id: 'T10002',
    conversation_id: 'conv-002',
    customer_id: '用户B',
    category: '账户问题',
    priority: '中',
    description: '用户忘记登录密码，需要重置密码并绑定新手机号',
    status: '已解决'
  },
  {
    id: 'T10003',
    conversation_id: 'conv-003',
    customer_id: '用户C',
    category: '支付问题',
    priority: '高',
    description: '用户支付时遇到银行卡扣款但订单未生成的情况，需要核实并处理',
    status: '已解决'
  }
];

const sampleConversations = [
  { id: 'conv-001', customer_id: '用户A' },
  { id: 'conv-002', customer_id: '用户B' },
  { id: 'conv-003', customer_id: '用户C' }
];

const sampleMessages = [
  { id: 'msg-001', conversation_id: 'conv-001', role: 'user', content: '我买的商品有质量问题，想退款' },
  { id: 'msg-002', conversation_id: 'conv-001', role: 'assistant', content: '非常抱歉给您带来不便。我来帮您处理退款事宜。请问您的订单号是多少？', ticket_id: null },
  { id: 'msg-003', conversation_id: 'conv-001', role: 'user', content: '订单号是ORD20240115001' },
  { id: 'msg-004', conversation_id: 'conv-001', role: 'assistant', content: '好的，已为您创建工单 #T10001，客服将在24小时内处理您的退款请求。', ticket_id: 'T10001' },
  
  { id: 'msg-005', conversation_id: 'conv-002', role: 'user', content: '我忘记密码了，怎么重置？' },
  { id: 'msg-006', conversation_id: 'conv-002', role: 'assistant', content: '您可以通过登录页面的"忘记密码"功能重置密码。需要我为您创建工单让客服协助处理吗？', ticket_id: null },
  { id: 'msg-007', conversation_id: 'conv-002', role: 'user', content: '好的，请帮我创建工单' },
  { id: 'msg-008', conversation_id: 'conv-002', role: 'assistant', content: '已为您创建工单 #T10002，客服将协助您重置密码并绑定新手机号。', ticket_id: 'T10002' },
  
  { id: 'msg-009', conversation_id: 'conv-003', role: 'user', content: '我付款了但是订单没显示' },
  { id: 'msg-010', conversation_id: 'conv-003', role: 'assistant', content: '这种情况可能是支付系统延迟导致的。请问您使用的是哪种支付方式？扣款金额是多少？', ticket_id: null },
  { id: 'msg-011', conversation_id: 'conv-003', role: 'user', content: '银行卡支付，扣了299元' },
  { id: 'msg-012', conversation_id: 'conv-003', role: 'assistant', content: '已为您创建工单 #T10003，我们会在1-3个工作日内核实并处理您的支付问题。', ticket_id: 'T10003' }
];

function seedDatabase() {
  const count = db.prepare('SELECT COUNT(*) as count FROM tickets').get();
  
  if (count.count > 0) {
    console.log('数据库已有数据，跳过初始化');
    return;
  }

  const insertConversation = db.prepare(
    'INSERT INTO conversations (id, customer_id) VALUES (?, ?)'
  );
  const insertMessage = db.prepare(
    'INSERT INTO messages (id, conversation_id, role, content, ticket_id) VALUES (?, ?, ?, ?, ?)'
  );
  const insertTicket = db.prepare(
    'INSERT INTO tickets (id, conversation_id, customer_id, category, priority, description, status) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );

  const transaction = db.transaction(() => {
    sampleConversations.forEach(conv => {
      insertConversation.run(conv.id, conv.customer_id);
    });

    sampleMessages.forEach(msg => {
      insertMessage.run(msg.id, msg.conversation_id, msg.role, msg.content, msg.ticket_id);
    });

    sampleTickets.forEach(ticket => {
      insertTicket.run(
        ticket.id,
        ticket.conversation_id,
        ticket.customer_id,
        ticket.category,
        ticket.priority,
        ticket.description,
        ticket.status
      );
    });
  });

  transaction();
  console.log('示例数据初始化完成');
}

seedDatabase();

export default seedDatabase;
