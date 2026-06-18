# AetherHub Web → App 还原书

> 版本: 1.0 | 日期: 2026-06-17 | 作者: 守言

## 一、还原范围

### 1.1 必须还原（P0 — 核心体验）

| # | 功能 | Web 源 | App 目标 | 复杂度 |
|---|------|--------|---------|:--:|
| 1 | AI 对话 | `/home` → `/agent` | Chat Tab — 模型选择 + 流式对话 + 多轮 | 高 |
| 2 | Agent 市场 | `/community/agent` | Discover Tab — 列表 + 搜索 + 分类 | 中 |
| 3 | Skills 市场 | `/community/skill` | Discover Tab — 技能列表 + 安装 | 中 |
| 4 | MCP 工具 | `/community/mcp` | Discover Tab — MCP 工具列表 | 低 |
| 5 | 模型市场 | `/community/model` | Discover Tab — 模型列表 + 详情 | 低 |
| 6 | 个人设置 | `/settings/profile` | Settings — 头像/昵称/偏好 | 低 |
| 7 | LLM 设置 | `/settings/llm` → `service-model` | Settings — 默认模型分配 | 低 |
| 8 | 登录/注册 | `/signin` `/signup` | Auth Screen — Better Auth | 中 |
| 9 | 引导流程 | `/onboarding` | Onboarding flow | 中 |

### 1.2 应该还原（P1 — 增长引擎）

| # | 功能 | Web 源 | App 目标 | 复杂度 |
|---|------|--------|---------|:--:|
| 10 | 每日签到 | `/settings/checkin` | Fission Card → 日历签到 | 低 |
| 11 | 任务中心 | `/settings/tasks` | Fission Card → 任务列表 | 低 |
| 12 | 积分抽奖 | `/settings/lottery` | Fission Card → 转盘 | 中 |
| 13 | 排行榜 | `/settings/leaderboard` | Fission Card → 榜单 | 低 |
| 14 | 拼团召回 | `/settings/group-recall` | Fission Card → 拼团列表 | 低 |
| 15 | Agent 详情 | `/agent/profile` | Stack Screen → 详情 | 中 |
| 16 | 通知 | `/notification` | 顶栏 + Inbox | 低 |

### 1.3 可延后（P2 — 非核心）

| # | 功能 | Web 源 | 说明 |
|---|------|--------|------|
| 17 | 服务商配置 | `/settings/provider` | 高级功能，先跳过 |
| 18 | 工作区/任务 | `/task`, `/task-workspace` | P2 |
| 19 | 创建 Agent | `/(create)` | P2 |
| 20 | 资源/记忆 | `/resource`, `/memory` | P2 |
| 21 | 深色模式 | theme toggle | P2 |

---

## 二、导航结构

```
Tab: Chat          Tab: Discover        Tab: Settings
├─ Agent 列表      ├─ Assistants        ├─ Profile
├─ 模型选择        ├─ Skills            ├─ Service Model
├─ 多轮对话        ├─ MCP               ├─ Appearance
├─ 消息历史        ├─ Models            ├─ 【裂变增长】
│                  │                    │  ├─ 每日签到
│                  │                    │  ├─ 任务中心
│                  │                    │  ├─ 积分抽奖
│                  │                    │  ├─ 排行榜
│                  │                    │  └─ 拼团召回
│                  │                    └─ About
│                  │
Stack Screens (推入):
├─ Agent 详情       ├─ Skill 详情        ├─ 通知
├─ 对话详情         ├─ MCP 详情           └─ 引导流程
└─ 创建 Agent       └─ 模型详情
```

---

## 三、数据层映射

| Web 源 | App 目标 | 复用 |
|------|------|:--:|
| `src/services/discover.ts` | `apps/mobile/src/services/api.ts` | ✅ tRPC client |
| `src/store/` (Zustand) | `apps/mobile/src/store/` | ✅ 逻辑复用 |
| `src/business/client/features/Fission/` | `apps/mobile/src/features/fission/` | ✅ 纯逻辑，完全复用 |
| `locales/` (18 languages) | `apps/mobile/src/i18n/` | ✅ 已复制 |
| `packages/business/const/src/branding.ts` | `apps/mobile/src/constants/tokens.ts` | ✅ 已复制 |
| `packages/trpc/src/client/lambda.ts` | `apps/mobile/src/services/trpc.ts` | ✅ 路径适配 |

---

## 四、技术决策

| 决策 | 选择 | 理由 |
|------|------|------|
| 框架 | Expo SDK 54 + expo-router | 跨平台，file-based routing |
| 样式 | NativeWind v4 | Tailwind → React Native 最平滑 |
| 状态 | Zustand + AsyncStorage | 与 Web 共用 store 逻辑 |
| 图标 | Phosphor React Native | 专业 SVG 图标，非 emoji |
| 字体 | Geist (Vercel) | 现代几何无衬线，与 AI 工具体验匹配 |
| 动效 | react-native-reanimated | 60fps 声明式动画 |
| 流式对话 | expo fetch polyfill + EventSource | RN 无 ReadableStream，需验证 SSE 兼容 |
| Auth | Better Auth + ASWebAuthenticationSession | iOS/Android OAuth 跳转 + Token 持久化 |

### 4.2 UI 组件映射（antd → RN）

| Web (antd) | RN 替代 | 说明 |
|------|------|------|
| `antd Modal` | `react-native-reusables` Dialog | 或 @gorhom/bottom-sheet |
| `antd Drawer` | `zeego` Drawer / `@gorhom/bottom-sheet` | |
| `antd Card` | 自定义 View + NativeWind | 已在 tokens.ts 中定义 |
| `antd Table` | `react-native-reusables` Table | 或无表格——移动端用卡片列表 |
| `antd message` | `react-native-reusables` Toast | |
| `antd Tooltip` | `zeego` Tooltip | |
| `antd Button` | 自定义 TouchableOpacity + NativeWind | 已在设计中 |
| `antd Input` | RN TextInput + NativeWind | |

### 4.3 Zustand Store DOM 依赖审计（待执行）

以下 store 已知依赖 `localStorage` / `window` / `document`，迁移时需适配：

| Store | DOM 依赖 | 适配方案 |
|------|------|------|
| `src/store/user/` | `localStorage` (persist) | AsyncStorage adapter |
| `src/store/global/` | `localStorage` | AsyncStorage adapter |
| `src/business/client/features/Fission/fissionStore.ts` | `localStorage` 全部 | AsyncStorage 替换 |
| 其他 ~27 stores | 待审计 | `grep -r "localStorage\|window\.\|document\."` 逐项确认 |

### 4.4 Auth 前置条件

Auth（登录/注册/Token 持久化）是 Chat Tab 的前置依赖——用户未登录无法调 API。**Auth 必须作为独立 Phase 在所有功能页面之前完成。**

---

## 五、设计约束（传递给 ly + stitch）

1. **配色**: 暖奶油底 `#faf9f5` + 深暖黑文字 `#141413` → accent 色由 ly 重新选定（当前 #D4A017 金色过于俗气）
2. **间距**: 4px 基准系统 (4/8/12/16/20/24/32)
3. **圆角**: 0/4/8/12/16/24/9999px 七级
4. **字体**: 标题 32/800/-0.5ls | 正文 16/400 | 辅助 13/400
5. **卡片**: 白底 + `rgba(0,0,0,0.06)` 阴影 + `rgba(0,0,0,0.05)` 边框
6. **输入框**: Pill 形状 + 内阴影 + 附件按钮 + 发送按钮
7. **图标**: Phosphor `@phosphor-icons/react-native` — 不可以用 emoji
8. **参考**: Poe 的 bot 切换器 + ChatGPT 的克制感 + Claude 的暖色调 + Gemini 的输入框

---

## 六、ly + stitch 需要产出的设计规格

每个页面包含：
- 布局线框图
- 精确色值（HEX + RGBA）
- 间距值（px）
- 圆角值（px）
- 阴影参数
- 字体层级
- 图标名称（Phosphor icon name）
- 组件层次结构
- 交互状态（**移动端专属**: default/pressed/disabled/loading/error/empty/offline）

### 页面清单（按设计优先级）

1. **Chat Tab** — 首页（Agent 列表 + 对话界面 + 输入框）
2. **Discover Tab** — 社区（4 个子标签 + 卡片列表 + 搜索）
3. **Settings Tab** — 设置列表 + 裂变模块
4. **Agent Detail** — 推入页
5. **Auth** — 登录/注册/引导
6. **Conversation** — 全屏对话
7. **Fission Cards** (5 pages) — 签到/任务/抽奖/排行/拼团
