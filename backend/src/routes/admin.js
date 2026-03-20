import { Router } from 'express';
import { getStats } from '../services/ticketService.js';

const router = Router();

router.get('/stats', (req, res) => {
  try {
    const stats = getStats();
    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: '获取统计数据失败' });
  }
});

export default router;
