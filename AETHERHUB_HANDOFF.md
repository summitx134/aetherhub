# AetherHub 交接文档

> 基于 LobeHub v2.2.2 (canary) 开源代码 | 日期 2026-06-13

---

## 一、做了什么

### 1. 品牌化
- App 名称: `LobeHub` → `AetherHub`
- Logo: 替换为 AetherHub 金色脉冲 Logo（暗底金圈）
- 加载界面: LobeHub SVG → AetherHub Logo + 文字

### 2. 裂变增长系统（7 大模块）
| 模块 | 功能 |
|------|------|
| 推荐引擎 | 邀请返现(阶梯现金) + 送会员(阶梯天数) + 师徒系统(消费佣金) |
| 签到系统 | 每日签到积分 + 连续签到周奖励 + 30/100 天里程碑 |
| 任务中心 | 新手任务 + 每日任务 + 成长任务 |
| 积分中心 | 充值赠送 + 首充双倍 + 话费兑换 + 新人限时折扣 |
| 大转盘 | 50 积分/抽 + 10 种奖品 + 每日上限 |
| 排行榜 | 邀请榜 + 消费榜（每月结算） |
| 召回&拼团 | 7/30 天未登录召回 + 3 人拼团折扣 + 增长漏斗 |

### 3. 数据联动
```
签到积分 ──→ 共享钱包 ←── 新人礼包
                │
                ↓
           大转盘消耗 ←── 排行榜展示
```
所有模块通过 `fissionStore.ts` 共享 localStorage，余额跨模块同步。

### 4. Mock 后端
`plugins/vite/mock-api.ts` 拦截 API 调用返回模拟数据，无需数据库即可运行。

---

## 二、新增/修改文件清单

### 新增文件（在 `src/business/client/` 下）
```
features/Fission/
  fissionStore.ts          ← 统一数据 store（钱包/签到/抽奖/推荐）
  NewUserGiftPopup.tsx     ← 新人礼包自动弹窗
  ReferralEngine.tsx       ← 推荐裂变引擎
  CheckinEngine.tsx        ← 签到引擎
  TaskCenter.tsx           ← 任务中心
  CreditsEngine.tsx        ← 积分 + 话费引擎
  LotteryEngine.tsx        ← 大转盘引擎
  Leaderboard.tsx          ← 排行榜
  RecallAndGroupBuy.tsx    ← 召回 + 拼团

BusinessSettingPages/
  Checkin.tsx, Tasks.tsx, Lottery.tsx,
  Leaderboard.tsx, GroupBuy.tsx           ← 新建设置页入口
```

### 新增文件（其他）
```
plugins/vite/mock-api.ts                 ← Mock API 插件
public/aetherhub-logo.svg                ← AetherHub 品牌 Logo
```

### 修改文件
| 文件 | 改动 |
|------|------|
| `packages/business/const/src/branding.ts` | BRANDING_NAME → AetherHub |
| `vite.config.ts` | 注册 mock-api 插件 |
| `index.html` | 标题 + favicon + 加载动画 → AetherHub |
| `index.mobile.html` | favicon → AetherHub Logo |
| `src/store/global/initialState.ts` | +5 SettingsTabs 枚举值 |
| `src/store/tool/slices/plugin/action.ts` | `data\|\|[]` 防御崩溃 |
| `src/routes/.../componentMap.ts` | 注册 5 个裂变页面路由 |
| `src/routes/.../useCategory.tsx` | 新增"裂变增长"侧边栏 |
| `src/routes/.../Body/index.tsx` | 裂变分组默认展开 |
| `src/layout/AuthProvider/index.vite.tsx` | VITE_NO_AUTH 免登录 |
| `src/layout/SPAGlobalProvider/index.tsx` | 注册 NewUserGiftPopup |
| `package.json` | 移除 ffmpeg-static |
| `public/favicon.svg` | 替换为 AetherHub Logo |

---

## 三、本地开发

### 启动
```bash
cd D:\Download\lobehub-full\lobehub-canary
pnpm run dev:spa        # SPA 模式 (Vite, port 9876)
```

### 访问
```
http://localhost:9876                    ← 本地（裂变+品牌全部可见）
```

### Mock 后端
开发时自动启用，模拟以下接口：
- `/api/auth/get-session` — 用户认证
- tRPC: `config.getGlobalConfig`, `user.getUserState`, `plugin.getPlugins`, 等 15+ 过程

---

## 四、上线切换

### 步骤 1：删除 Mock 插件
在 `vite.config.ts` 中删除：
```typescript
isDev && aetherhubMockApi(),  // ← 删除此行
```

### 步骤 2：删除 NoAuth 环境变量
删除 `.env.development.local` 中的 `VITE_NO_AUTH=true`

### 步骤 3：启动全栈后端
```bash
pnpm dev:docker        # 启动 PostgreSQL + Redis + S3
pnpm db:migrate        # 初始化数据库
pnpm dev               # 全栈（Next.js + Vite）
```

### 步骤 4：实现真实裂变后端
参考 `plugins/vite/mock-api.ts` 中 Mock 的接口格式，在 `apps/server/src/services/` 下实现：
- 签到服务
- 任务服务
- 推荐/积分服务
- 抽奖服务
- 排行榜服务

### 步骤 5：构建部署
```bash
pnpm build             # 生产构建
```

---

## 五、关键设计决策

1. **裂变系统在 `business/` 层** — 利用 LobeHub 的白标覆写机制，不修改核心代码
2. **共享 wallet store** — `fissionStore.ts` 通过 localStorage 实现跨模块数据同步
3. **前端独立演示** — Mock API + localStorage 让裂变系统可在无后端情况下完整演示
4. **防御性修复** — `action.ts` 中的 `data || []` 防止后端不可用时 store 崩溃

---

## 六、后续待办

| 优先级 | 任务 | 依赖 |
|--------|------|------|
| P0 | Docker 环境搭建 (PostgreSQL + Redis) | 装 Docker |
| P1 | 裂变后端接口实现 | P0 完成 |
| P1 | 前端对接真实后端（替换 localStorage） | P1 完成 |
| P2 | 支付系统集成 | P1 完成 |
| P2 | 推送/通知系统 | P0 完成 |
| P3 | 部署上线 | P2 完成 |
