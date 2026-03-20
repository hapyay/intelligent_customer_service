import { Router } from 'express';
import { getTickets, getTicketById, updateTicketStatus } from '../services/ticketService.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    const { status, limit, offset } = req.query;
    
    const tickets = getTickets({
      status,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined
    });
    
    res.json({ tickets });
  } catch (error) {
    console.error('Get tickets error:', error);
    res.status(500).json({ error: '获取工单列表失败' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const ticket = getTicketById(id);
    
    if (!ticket) {
      return res.status(404).json({ error: '工单不存在' });
    }
    
    res.json({ ticket });
  } catch (error) {
    console.error('Get ticket error:', error);
    res.status(500).json({ error: '获取工单详情失败' });
  }
});

router.put('/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ error: '状态不能为空' });
    }
    
    const success = updateTicketStatus(id, status);
    
    if (!success) {
      return res.status(404).json({ error: '工单不存在' });
    }
    
    res.json({ success: true, message: '状态更新成功' });
  } catch (error) {
    console.error('Update ticket error:', error);
    res.status(500).json({ error: '更新工单状态失败' });
  }
});

export default router;
