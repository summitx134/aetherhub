/**
 * AetherHub Mock Data — 演示用完整数据集
 * 提供 Agent、会话、消息、发现页等所有需要的数据
 */

const TS = Date.now();
const day = (offset: number) => new Date(TS + offset * 86400000).toISOString();

// ---- Agent 数据 ----
export const INBOX_AGENT = {
  id: 'inbox',
  slug: 'inbox',
  name: 'Inbox',
  description: '您的默认 AI 助手，可以处理各种任务',
  model: 'gpt-4',
  systemRole: 'You are a helpful assistant.',
  avatar: '😀',
  backgroundColor: '#1677ff',
  createdAt: day(-30),
  updatedAt: day(-1),
};

export const MOCK_AGENTS = [
  INBOX_AGENT,
  {
    id: 'agent-1', slug: 'code-assistant', name: '代码助手', description: '专业的编程助手，支持多种语言',
    model: 'claude-sonnet-4-6', systemRole: 'You are an expert programmer.', avatar: '💻', backgroundColor: '#52c41a',
    createdAt: day(-25), updatedAt: day(-2),
  },
  {
    id: 'agent-2', slug: 'writer', name: '写作助手', description: '帮助你撰写高质量的文章和文案',
    model: 'gpt-5.5', systemRole: 'You are a professional writer.', avatar: '✍️', backgroundColor: '#fa8c16',
    createdAt: day(-20), updatedAt: day(-3),
  },
  {
    id: 'agent-3', slug: 'data-analyst', name: '数据分析师', description: '分析数据、生成报告和可视化',
    model: 'claude-opus-4-8', systemRole: 'You are a data analyst.', avatar: '📊', backgroundColor: '#722ed1',
    createdAt: day(-15), updatedAt: day(-1),
  },
  {
    id: 'agent-4', slug: 'translator', name: '翻译专家', description: '支持 50+ 语言的精准翻译',
    model: 'gpt-5.4-mini', systemRole: 'You are a professional translator.', avatar: '🌐', backgroundColor: '#13c2c2',
    createdAt: day(-10), updatedAt: day(-4),
  },
  {
    id: 'agent-5', slug: 'creative-artist', name: '创意画师', description: '根据文字描述生成精美图片',
    model: 'gpt-image-2', systemRole: 'Create beautiful images.', avatar: '🎨', backgroundColor: '#eb2f96',
    createdAt: day(-5), updatedAt: day(-1),
  },
];

// ---- 会话数据 ----
export const MOCK_SESSIONS = [
  { id: 'sess-1', agentId: 'inbox', title: '关于 AetherHub 的功能介绍', createdAt: day(-1), updatedAt: day(-1), messageCount: 8 },
  { id: 'sess-2', agentId: 'agent-1', title: 'React 组件优化方案', createdAt: day(-2), updatedAt: day(-1), messageCount: 15 },
  { id: 'sess-3', agentId: 'agent-2', title: '产品发布会演讲稿', createdAt: day(-3), updatedAt: day(-2), messageCount: 6 },
  { id: 'sess-4', agentId: 'agent-3', title: 'Q4 销售数据分析', createdAt: day(-5), updatedAt: day(-4), messageCount: 22 },
  { id: 'sess-5', agentId: 'inbox', title: '周末旅行计划', createdAt: day(-7), updatedAt: day(-6), messageCount: 4 },
];

// ---- 消息数据 ----
export const MOCK_MESSAGES: Record<string, any[]> = {
  'sess-1': [
    { id: 'msg-1a', role: 'user', content: '你好！AetherHub 有哪些主要功能？', createdAt: day(-1) },
    { id: 'msg-1b', role: 'assistant', content: '您好！🎉 AetherHub 是一个全面的 AI 工作空间，主要功能包括：\n\n1. **AI 对话** — 支持 30+ 主流模型，实时流式响应\n2. **Agent 创建** — 自定义 AI 助手，配置系统提示词和工具\n3. **知识库** — 上传文档构建专属知识库\n4. **裂变增长** — 邀请好友赚积分、签到抽奖\n5. **多端同步** — Web、桌面端、移动端无缝切换\n\n有什么想深入了解的吗？', createdAt: day(-1) },
    { id: 'msg-1c', role: 'user', content: '裂变增长怎么玩？', createdAt: day(-1) },
    { id: 'msg-1d', role: 'assistant', content: '裂变增长是我们的特色功能，包含：\n\n📋 **每日签到** — 连续签到获得递增积分\n🎰 **积分抽奖** — 50 积分一转，话费/会员等你拿\n👥 **邀请好友** — 邀请返现 + 送会员\n💰 **充值优惠** — 首充双倍 + 阶梯赠送\n🏆 **排行榜** — 每月前 10 名获现金奖励\n\n去 设置 → 裂变增长 试试吧！', createdAt: day(-1) },
  ],
  'sess-2': [
    { id: 'msg-2a', role: 'user', content: 'React 组件渲染太慢了，有什么优化建议？', createdAt: day(-2) },
    { id: 'msg-2b', role: 'assistant', content: 'React 性能优化可以从这几个方面入手：\n\n1. **React.memo** — 避免不必要的重渲染\n2. **useMemo / useCallback** — 缓存计算结果和函数引用\n3. **虚拟列表** — 长列表用 react-virtuoso\n4. **代码分割** — React.lazy + Suspense\n5. **状态管理优化** — Zustand selector 精准订阅\n\n需要我针对你的具体场景给代码示例吗？', createdAt: day(-2) },
  ],
};

// ---- 发现页数据 ----
export const MOCK_DISCOVER_AGENTS = [
  { id: 'da-1', name: 'Claude Code 助手', author: 'AetherHub', avatar: '🤖', description: '辅助 Claude Code 开发的最佳 Agent', stars: 1280, tags: ['开发', 'Claude'] },
  { id: 'da-2', name: 'PPT 生成器', author: 'Community', avatar: '📽️', description: '一键生成精美演示文稿', stars: 956, tags: ['办公', 'PPT'] },
  { id: 'da-3', name: '英语口语教练', author: 'AetherHub', avatar: '🗣️', description: 'AI 驱动的英语口语陪练', stars: 2341, tags: ['教育', '语言'] },
  { id: 'da-4', name: 'SEO 文章优化', author: 'Community', avatar: '📝', description: '优化你的文章提升搜索排名', stars: 567, tags: ['营销', 'SEO'] },
  { id: 'da-5', name: '股票分析助手', author: 'AetherHub', avatar: '📈', description: '实时股票数据分析和预测', stars: 1890, tags: ['金融', '数据分析'] },
  { id: 'da-6', name: '旅行规划师', author: 'Community', avatar: '✈️', description: '根据预算和偏好制定旅行计划', stars: 723, tags: ['生活', '旅行'] },
];

export const MOCK_DISCOVER_SKILLS = [
  { id: 'sk-1', name: '网页搜索', author: 'AetherHub', avatar: '🔍', description: '实时联网搜索最新信息', installs: 15000 },
  { id: 'sk-2', name: '图片生成', author: 'AetherHub', avatar: '🖼️', description: 'AI 图片生成与编辑', installs: 12000 },
  { id: 'sk-3', name: 'PDF 解析', author: 'Community', avatar: '📄', description: '提取和分析 PDF 内容', installs: 8900 },
  { id: 'sk-4', name: '代码执行', author: 'AetherHub', avatar: '⚡', description: '安全的 Python/JS 代码沙箱', installs: 6700 },
];

export const MOCK_DISCOVER_MODELS = [
  { id: 'm-1', name: 'GPT-5.5', provider: 'OpenAI', contextWindow: '1M', pricing: '¥5/M input' },
  { id: 'm-2', name: 'Claude Opus 4.8', provider: 'Anthropic', contextWindow: '200K', pricing: '¥5/M input' },
  { id: 'm-3', name: 'Gemini 3.1 Pro', provider: 'Google', contextWindow: '2M', pricing: '¥2/M input' },
  { id: 'm-4', name: 'DeepSeek V4 Pro', provider: 'DeepSeek', contextWindow: '1M', pricing: '¥0.4/M input' },
  { id: 'm-5', name: 'Qwen 3.7 Max', provider: 'Alibaba', contextWindow: '1M', pricing: '¥2.5/M input' },
];

// ---- 用户 Stats ----
export const MOCK_USER_STATS = {
  totalMessages: 1280,
  totalTokens: 4500000,
  totalAgents: 6,
  totalSessions: 5,
  activeDays: 28,
  weeklyActivity: [
    { day: 'Mon', count: 45 },
    { day: 'Tue', count: 62 },
    { day: 'Wed', count: 38 },
    { day: 'Thu', count: 55 },
    { day: 'Fri', count: 72 },
    { day: 'Sat', count: 25 },
    { day: 'Sun', count: 18 },
  ],
};

// ---- Home 页数据 ----
export const MOCK_HOME_DATA = {
  agents: MOCK_AGENTS.slice(0, 4),
  groups: [],
  recent: MOCK_SESSIONS.slice(0, 5).map((s) => ({
    ...s,
    agentName: MOCK_AGENTS.find((a) => a.id === s.agentId)?.name || 'Inbox',
  })),
};

// ---- 通知 ----
export const MOCK_NOTIFICATIONS = [
  { id: 'n-1', type: 'system', title: '欢迎来到 AetherHub！', content: '新人礼包已自动发放到您的账户', time: day(-1), read: false },
  { id: 'n-2', type: 'reward', title: '签到奖励', content: '连续签到 5 天，获得 20 积分', time: day(-1), read: false },
  { id: 'n-3', type: 'referral', title: '推荐成功', content: '您推荐的用户已完成付费，获得 3 元返利', time: day(-3), read: true },
];

// ---- 社区/市场 ----
export const MOCK_MCP_LIST = [
  { id: 'mcp-1', name: 'GitHub Tools', description: '仓库管理、Issue、PR 操作', category: 'tools', author: 'AetherHub', stars: 1280, icon: '🔧' },
  { id: 'mcp-2', name: 'Database Explorer', description: 'SQL 查询与数据可视化', category: 'data', author: 'AetherHub', stars: 850, icon: '🗄️' },
  { id: 'mcp-3', name: 'Web Scraper', description: '智能网页内容提取', category: 'tools', author: 'Community', stars: 420, icon: '🌐' },
];

export const MOCK_PROVIDER_LIST = [
  { id: 'openai', name: 'OpenAI', models: 12, enabled: true, icon: '🤖' },
  { id: 'deepseek', name: 'DeepSeek', models: 8, enabled: true, icon: '🔍' },
  { id: 'anthropic', name: 'Anthropic', models: 6, enabled: false, icon: '🧠' },
  { id: 'google', name: 'Google AI', models: 10, enabled: false, icon: '🌐' },
  { id: 'local', name: 'Ollama Local', models: 20, enabled: true, icon: '💻' },
];
