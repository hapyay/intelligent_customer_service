export const tools = [
  {
    type: 'function',
    function: {
      name: 'create_ticket',
      description: '当用户问题需要人工跟进或无法直接解决时，创建工单',
      parameters: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            enum: ['账户问题', '支付问题', '退款问题', '功能咨询', '投诉建议', '其他'],
            description: '问题分类'
          },
          priority: {
            type: 'string',
            enum: ['高', '中', '低'],
            description: '优先级'
          },
          description: {
            type: 'string',
            description: '工单描述，简要概括用户问题'
          },
          customer_id: {
            type: 'string',
            description: '客户ID，如果用户未提供则填"匿名用户"'
          }
        },
        required: ['category', 'priority', 'description']
      }
    }
  }
];

export const toolImplementations = {
  create_ticket: async (args, context) => {
    const { category, priority, description, customer_id = '匿名用户' } = args;
    
    const ticket = {
      id: `T${Date.now().toString().slice(-5)}`,
      conversation_id: context.conversationId,
      customer_id,
      category,
      priority,
      description,
      status: '待处理',
      created_at: new Date().toISOString()
    };

    return ticket;
  }
};
