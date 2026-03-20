import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

import chatRouter from './routes/chat.js';
import ticketRouter from './routes/ticket.js';
import adminRouter from './routes/admin.js';
import errorHandler from './middleware/errorHandler.js';

import './db/seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataDir = join(__dirname, '../data');
try {
  mkdirSync(dataDir, { recursive: true });
} catch (e) {
  // 目录已存在
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/chat', chatRouter);
app.use('/api/tickets', ticketRouter);
app.use('/api/admin', adminRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 智灵客服后端服务已启动`);
  console.log(`📍 地址: http://localhost:${PORT}`);
  console.log(`🔧 环境: ${process.env.NODE_ENV || 'development'}`);
});
