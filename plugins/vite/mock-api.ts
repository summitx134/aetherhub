/**
 * AetherHub Mock API — Vite Plugin
 * 拦截关键 API/tRPC 调用，返回演示用数据。上线时删除 vite.config.ts 中引用即可。
 */
import type { PluginOption } from 'vite';
import {
  INBOX_AGENT, MOCK_AGENTS, MOCK_SESSIONS, MOCK_MESSAGES,
  MOCK_DISCOVER_AGENTS, MOCK_DISCOVER_SKILLS, MOCK_DISCOVER_MODELS,
  MOCK_USER_STATS, MOCK_HOME_DATA, MOCK_NOTIFICATIONS,
  MOCK_MCP_LIST, MOCK_PROVIDER_LIST,
} from './mock-data';

const handlers: Record<string, () => any> = {
  '/api/auth/get-session': () => ({
    user: { id: 'u1', username: 'demo', email: 'demo@aetherhub.local', avatar: '😀', isSignedIn: true, isLoaded: true },
    session: { expires: new Date(Date.now() + 864e5).toISOString() },
  }),
};

// 补全策略：所有已知查询过程返回数据（空数组或 mock 数据），未列出的走 batch → 放过
const trpcProcs: Record<string, () => any> = {
  // === 配置 / 用户（启动必需）===
  'config.getGlobalConfig': () => ({ serverConfig: { enableBusinessFeatures: true, enableKlavis: true, enableUploadFileToServer: true, enableMarketTrustedClient: true, telemetry: {}, aiProvider: {} }, featureFlags: { showProvider: true, showApiKeyManage: true, hideDocs: false }, enabledOAuthSSOProviders: [] }),
  'config.getDefaultAgentConfig': () => ({}),
  'user.getUserState': () => ({ avatar: '😀', email: 'demo@aetherhub.local', isSignedIn: true, membershipDays: 30, credits: 1500, username: 'demo', preference: { guide: {}, telemetry: null }, settings: { languageModel: {}, tts: {}, defaultAgent: {} } }),
  'user.getUserRegistrationDuration': () => ({ days: 30 }),
  'user.getUserSSOProviders': () => [],
  'user.getUserSettings': () => ({}),
  'user.getStats': () => MOCK_USER_STATS,
  'user.getOrCreateOnboardingState': () => ({ completed: true, step: 'done' }),
  'user.getOnboardingBootstrapState': () => ({}),
  'user.getOnboardingAgentContext': () => ({}),
  'user.readOnboardingDocument': () => null,
  'userMemory.getPersona': () => ({}),
  'userMemory.getIdentities': () => [], 'userMemory.getContexts': () => [], 'userMemory.getActivities': () => [], 'userMemory.getExperiences': () => [], 'userMemory.getPreferences': () => [],

  // === Agent ===
  'agent.getBuiltinAgent': () => INBOX_AGENT,
  'agent.getAgentConfig': () => ({ model: 'gpt-4', systemRole: 'You are helpful.', params: {} }),
  'agent.getAgentConfigById': () => ({ model: 'gpt-4', systemRole: '', params: {} }),
  'agent.queryAgents': () => ({ items: MOCK_AGENTS, total: MOCK_AGENTS.length }),
  'agent.rankAgents': () => MOCK_AGENTS.slice(0, 3),
  'agent.countAgents': () => MOCK_AGENTS.length,

  // === 首页 / 最近 / 简报 ===
  'home.getSidebarAgentList': () => MOCK_AGENTS,
  'home.getDailyBrief': () => ({ items: [], hasNew: false }),
  'home.searchAgents': () => MOCK_AGENTS.slice(0, 3),
  'recent.getAll': () => MOCK_SESSIONS.slice(0, 5).map((s: any) => ({ ...s, agentAvatar: '😀', agentName: 'Inbox', lastMessage: 'Hello' })),
  'brief.list': () => [], 'brief.listUnresolved': () => [{ id: 'b1', title: '每日 AI 简报', content: '今日社区新增 5 个 Agent，3 个 Skill 上线', createdAt: new Date().toISOString() }], 'brief.find': () => null,

  // === 会话 / 消息 / 话题 / 线程 ===
  'session.getSessions': () => MOCK_SESSIONS,
  'session.getGroupedSessions': () => [],
  'session.countSessions': () => MOCK_SESSIONS.length,
  'session.searchSessions': () => MOCK_SESSIONS,
  'message.getMessages': () => MOCK_MESSAGES['sess-1'] || [],
  'message.count': () => 1280, 'message.countWords': () => 45000,
  'topic.getTopics': () => [], 'topic.getAllTopics': () => [], 'topic.recentTopics': () => [], 'topic.countTopics': () => 0, 'topic.rankTopics': () => [],
  'thread.getThreads': () => [],

  // === 通知 ===
  'notification.list': () => MOCK_NOTIFICATIONS, 'notification.unreadCount': () => 2,

  // === 发现/市场 ===
  'discover.list': () => ({ agents: MOCK_DISCOVER_AGENTS, skills: MOCK_DISCOVER_SKILLS, models: MOCK_DISCOVER_MODELS }),
  'market.getAssistantList': () => ({ items: MOCK_DISCOVER_AGENTS, total: 6 }),
  'market.getPluginList': () => ({ items: MOCK_DISCOVER_SKILLS, total: 4 }),
  'market.getModelList': () => ({ items: MOCK_DISCOVER_MODELS, total: 5 }),
  'market.getProviderList': () => ({ items: MOCK_PROVIDER_LIST, total: MOCK_PROVIDER_LIST.length }),
  'market.getMcpList': () => ({ items: MOCK_MCP_LIST, total: MOCK_MCP_LIST.length }),
  'market.getSkillList': () => ({ items: MOCK_DISCOVER_SKILLS, total: 4 }),
  'market.getSkillCategories': () => [{ id: 'dev', name: '开发' }, { id: 'design', name: '设计' }, { id: 'office', name: '办公' }],
  'market.getMcpCategories': () => [{ id: 'tools', name: '工具' }, { id: 'data', name: '数据' }, { id: 'media', name: '媒体' }],
  'market.getModelCategories': () => [{ id: 'llm', name: '大语言模型' }, { id: 'image', name: '图像生成' }, { id: 'audio', name: '语音' }, { id: 'video', name: '视频' }],
  'market.registerClientInMarketplace': () => ({ success: true, clientId: 'mock-aetherhub-001', clientSecret: 'mock-secret-' + Date.now() }),
  'market.registerM2MToken': () => ({ success: true, token: 'mock-m2m-token', expiresAt: Date.now() + 86400000 }),
  'market.agent.getOnboardingFull': () => ({}),

  // === 列表型（防 undefined.filter 崩溃）===
  'plugin.getPlugins': () => [], 'connector.list': () => [], 'agentSkills.list': () => [], 'device.listDevices': () => [],
  'task.list': () => [], 'document.queryDocuments': () => [],
  'file.recentFiles': () => [], 'file.recentPages': () => [], 'file.getKnowledgeItems': () => [],
  'ragEval.list': () => [], 'desktopRelease.list': () => [],
  'aiProvider.getAiProviderRuntimeState': () => ({ enabledProviders: [], defaultProvider: '' }),
  'aiProvider.getAiProviderList': () => [], 'aiModel.getAiProviderModelList': () => [],
  'messenger.availablePlatforms': () => [], 'messenger.listMyLinks': () => [], 'messenger.listMyInstallations': () => [],
  'search.query': () => [], 'usage.findByMonth': () => [], 'usage.findAndGroupByDay': () => [],
  'taskTemplate.listDailyRecommend': () => [],
  'group.getGroups': () => [], 'agentBotProvider.listPlatforms': () => [],
  'knowledgeBase.getKnowledgeBases': () => [], 'agentEval.listBenchmarks': () => [],

  // === 写操作 → null ===
  'agent.createAgent': () => null, 'session.createSession': () => null,
  'document.createDocument': () => null, 'user.updatePreference': () => null,
  'plugin.createOrInstallPlugin': () => null, 'plugin.removePlugin': () => null,
  'topic.createTopic': () => null, 'task.create': () => null,
};

const wrapResult = (data: any) => ({ result: { data } });

function getProcName(pathname: string): string | null {
  const m = pathname.match(/\/trpc\/\w+\/([^?]+)/);
  return m ? m[1] : null;
}
function getBatchProcNames(url: URL): string[] | null {
  if (url.searchParams.get('batch') !== '1') return null;
  // tRPC batch sends procedure names in the 'input' query param as JSON
  // e.g. input={"0":"market.getAssistantList","1":"market.getMcpList"}
  const inputParam = url.searchParams.get('input');
  if (inputParam) {
    try {
      const parsed = JSON.parse(inputParam);
      if (parsed && typeof parsed === 'object') {
        const names = Object.values(parsed).filter((v): v is string => typeof v === 'string');
        if (names.length > 0) return names;
      }
    } catch { /* fall through */ }
  }
  const n = getProcName(url.pathname);
  return n ? n.split(',') : null;
}

export function aetherhubMockApi(): PluginOption {
  return {
    name: 'aetherhub-mock-api',
    apply: 'serve', enforce: 'pre',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || '/', `http://${req.headers.host}`);
        const path = url.pathname;

        if (handlers[path]) { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(handlers[path]())); return; }

        if (path.startsWith('/trpc/')) {
          const batchNames = getBatchProcNames(url);
          if (batchNames) {
            // 宽松策略：已知过程返回 mock 数据，未知过程返回 []（安全默认值）
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(batchNames.map((n) =>
              trpcProcs[n] ? wrapResult(trpcProcs[n]()) : wrapResult([])
            )));
            return;
          }
          const procName = getProcName(url.pathname);
          if (procName && trpcProcs[procName]) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(wrapResult(trpcProcs[procName]())));
            return;
          }
          next(); return;
        }
        next();
      });
    },
  };
}
