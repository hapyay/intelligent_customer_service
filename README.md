# 智灵客服 - 智能客服系统

一个基于 AI 的智能客服系统，支持智能问答、自动工单生成、多轮对话等功能。

## 功能特性

- **智能问答** - 基于大语言模型，理解用户意图，提供精准回答
- **自动工单** - AI 自动识别问题类型，一键生成标准化工单
- **多轮对话** - 支持上下文理解，实现流畅的多轮交互体验
- **后台管理** - 工单管理、状态跟踪、数据统计

## 技术栈

### 前端
- React 18 + Vite
- Tailwind CSS
- Framer Motion (动画)
- Zustand (状态管理)
- Axios (HTTP 客户端)

### 后端
- Node.js + Express
- SQLite (better-sqlite3)
- DeepSeek API (大语言模型)
- Function Calling (结构化输出)

## 项目结构

```
intelligent_customer_service/
├── frontend/                    # 前端项目
│   ├── src/
│   │   ├── pages/               # 页面组件
│   │   │   ├── HomePage.jsx     # 展示页
│   │   │   ├── ChatPage.jsx     # 对话页
│   │   │   └── AdminPage.jsx    # 后台管理页
│   │   ├── stores/              # 状态管理
│   │   ├── services/            # API 服务
│   │   └── styles/              # 样式文件
│   └── ...
│
├── backend/                     # 后端项目
│   ├── src/
│   │   ├── agent/               # Agent 核心逻辑
│   │   │   ├── tools.js         # Function Calling 工具定义
│   │   │   ├── prompts.js       # Prompt 模板
│   │   │   └── index.js         # Agent 主入口
│   │   ├── routes/              # API 路由
│   │   ├── services/            # 业务服务
│   │   └── db/                  # 数据库
│   └── ...
│
└── README.md
```

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
# 安装后端依赖
cd backend
npm install

# 安装前端依赖
cd ../frontend
npm install
```

### 配置环境变量

1. 复制环境变量模板：
```bash
cd backend
cp .env.example .env
```

2. 编辑 `.env` 文件，填入你的 API Key：
```env
DEEPSEEK_API_KEY=your_api_key_here
PORT=3000
NODE_ENV=development
```

> 获取 DeepSeek API Key: https://platform.deepseek.com/

### 启动项目

```bash
# 启动后端服务 (在 backend 目录)
npm start

# 启动前端服务 (在 frontend 目录，新终端)
npm run dev
```

### 访问地址

- 前端页面: http://localhost:5173
- 后端 API: http://localhost:3000

## 页面说明

### 1. 展示页 (/)
- 品牌展示区
- 3D 动画机器人形象
- 核心功能卡片
- CTA 按钮

### 2. 对话页 (/chat)
- AI 客服对话窗口
- 快捷问题面板
- 实时消息气泡
- 工单创建提示

### 3. 后台管理页 (/admin)
- 工单列表
- 工单详情
- 对话记录查看
- 统计数据展示
- 深色/浅色主题切换

## API 接口

### 对话 API

```
POST /api/chat/message
请求: { "message": "如何退款？", "conversationId": "xxx" }
响应: { "reply": "...", "ticket": {...}, "conversationId": "xxx" }
```

### 工单 API

```
GET /api/tickets          # 获取工单列表
GET /api/tickets/:id      # 获取工单详情
PUT /api/tickets/:id/status  # 更新工单状态
```

### 统计 API

```
GET /api/admin/stats      # 获取统计数据
```

## 核心设计

### Agent 工作流程

```
用户输入 → 构建对话上下文 → 调用大模型 API (带 Function Calling)
    → 判断响应类型
    → 如果是工具调用 → 执行 create_ticket → 返回确认消息
    → 如果是文本回复 → 直接返回
```

### Function Calling 工具定义

系统定义了 `create_ticket` 工具，用于自动创建工单：

```javascript
{
  name: 'create_ticket',
  description: '当用户问题需要人工跟进或无法直接解决时，创建工单',
  parameters: {
    category: '问题分类',
    priority: '优先级',
    description: '工单描述'
  }
}
```

## 求职展示亮点

1. **现代化技术栈** - React 18 + Vite + Tailwind
2. **AI 能力集成** - Function Calling 实现结构化输出
3. **完整业务闭环** - 对话 → 工单 → 管理
4. **良好代码组织** - 模块化、可维护

## 扩展方向

- [ ] 多模型支持（支持切换不同大模型）
- [ ] 知识库接入（RAG 增强回答质量）
- [ ] 用户认证系统
- [ ] WebSocket 实时通知
- [ ] 数据分析面板

## License

MIT
