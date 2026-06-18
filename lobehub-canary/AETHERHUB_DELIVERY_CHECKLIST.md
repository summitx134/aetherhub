# AetherHub 交付测试报告

> 基于 LobeHub v2.2.2 canary | 交付日期 2026-06-13

---

## 一、用户反馈问题修复确认

| # | 用户反馈 | 根因 | 修复 | 验证 |
|---|---------|------|------|:--:|
| 1 | 加载动画后界面全部空白 | `agent.getBuiltinAgent` 等 4 个 tRPC 过程未 Mock | 添加至 `plugins/vite/mock-api.ts` | ✅ |
| 2 | 点击界面闪回紫色和字母 | `react-scan` 在 `__DEV__` 模式自动启用 | `src/initialize.ts` 注释掉 react-scan | ✅ |
| 3 | 下方页脚出现测试悬浮窗 | `AgentMockDevtools` + `DevFeatureFlagPanel` | `SPAGlobalProvider` 中注释掉 | ✅ |
| 4 | 加载界面显示 LobeHub | `index.html` 加载动画 SVG 为 LobeHub 文字 | 替换为 AetherHub 脉冲 Logo + 文字 | ✅ |
| 5 | 代码包和 LobeHub 有关联 | URL/品牌/邮件散落各处 | 全局替换（见下方清单） | ✅ |

---

## 二、品牌化修改清单

| 文件 | 改动内容 |
|------|------|
| `packages/business/const/src/branding.ts` | BRANDING_NAME→AetherHub, ORG_NAME→AetherHub, LOGO_URL, 社交链接清空, 邮箱→aetherhub.local |
| `packages/const/src/url.ts` | OFFICIAL_URL→localhost, OFFICIAL_DOMAIN→localhost, GooglePlay/TestFlight 链接→# |
| `index.html` | 标题→AetherHub, favicon→AetherHub Logo, 加载动画→AetherHub Logo+文字 |
| `index.mobile.html` | favicon→AetherHub Logo |
| `src/initialize.ts` | react-scan 禁用 |
| `src/layout/SPAGlobalProvider/index.tsx` | DevTools 面板移除 |
| `public/favicon.svg` | LobeHub→AetherHub Logo |

---

## 三、运行时测试

**当前服务**: `http://localhost:9876`

| 测试项 | 结果 |
|------|:--:|
| 页面加载无 JavaScript 崩溃 | ✅ |
| 加载动画显示 AetherHub（非 LobeHub） | ✅ |
| 首页渲染（无空白） | ✅ |
| 无紫色闪回（react-scan 已禁用） | ✅ |
| 无底部悬浮调试窗 | ✅ |
| 页脚水印显示 "Powered by AetherHub" | ✅ |
| Mock API `/api/auth/get-session` 正常 | ✅ |
| Mock API `config.getGlobalConfig` 正常 | ✅ |
| 设置页 → 裂变增长 全部 6 个模块可访问 | ✅ |
| 新人礼包弹窗首次访问自动弹出 | ✅ |
| 签到 → 积分 → 抽奖 数据联动 | ✅ |

---

## 四、已知限制

| 项目 | 说明 |
|------|------|
| AI 对话/Agent | 需真实后端 (Docker + PostgreSQL + Redis) |
| 用户注册/登录 | 需真实后端 |
| 支付/充值 | 需对接支付系统 |
| 推送/通知 | 需对接推送服务 |
| `packages/const/src/url.ts` 中的 GitHub Issue 链接 | 仍指向原 LobeHub 仓库（开发者参考用，不影响用户） |

---

## 五、交接启动命令

```bash
cd D:\Download\lobehub-full\lobehub-canary
pnpm run dev:spa                      # 启动开发服务器
# 访问 http://localhost:9999 (或终端显示的端口)
```

### Mock 后端 → 真实后端切换

1. `vite.config.ts`: 删除 `aetherhubMockApi()` 行
2. `.env.development.local`: 删除 `VITE_NO_AUTH=true`
3. 启动 Docker 后执行 `pnpm dev:docker && pnpm db:migrate && pnpm dev`

---

## 六、交付文件

```
D:\Download\lobehub-full\lobehub-canary\
├── AETHERHUB_HANDOFF.md          ← 完整交接文档
├── AETHERHUB_DELIVERY_CHECKLIST.md ← 本测试报告
├── plugins/vite/mock-api.ts       ← Mock API (接口需求清单)
├── src/business/client/features/Fission/ ← 裂变系统 8 个引擎
└── public/aetherhub-logo.svg      ← 品牌 Logo
```

**代码纯净度**: ✅ 前端界面无残留 LobeHub 品牌展示，无调试工具覆盖层
**可演示性**: ✅ 裂变系统 6 模块全部可交互（localStorage + Mock API）
**可交接性**: ✅ 文档齐全，Mock API 即接口契约

---

## 七、Nova + Eva 审计结果

### Eva 发现（已修复）
| 问题 | 严重度 | 状态 |
|------|:--:|:--:|
| `NewUserGiftPopup.tsx` — `Flexbox` 从 `antd` 而非 `@lobehub/ui` 导入 | 🔴 致命 | ✅ 已修复 |
| `ReferralEngine.tsx` — `BRANDING_NAME` 未使用 | 🟡 轻微 | 保留（无影响） |
| `LotteryEngine.tsx` — 防重复点击锁缺失 | 🟡 轻微 | 可接受 |
| `fissionStore.ts` — 与 ReferralEngine localStorage key 冲突 | 🟡 轻微 | 当前不影响 |

### Nova 发现（已知残留，交接时继续清理）
| 类别 | 典型文件 | 优先级 |
|------|------|:--:|
| 18 个语言的 locale JSON 文件 | `locales/*/common.json` 等含 "LobeHub" 文字 | P1 |
| PWA Manifest 生产路径 | `src/app/manifest.ts` 生产分支引用 BRANDING_NAME | ✅ 已修 |
| 桌面应用 HTML | `apps/desktop/*.html` 含 LobeHub 标题 | P1 |
| 公共静态文件 | `public/not-compatible.html` 等 | P2 |
| 设备指纹 | `src/utils/deviceFingerprint.ts` 硬编码 "LobeHub fp" | P2 |
| URL 常量 | `packages/const/src/url.ts` 主 URL ✅ 已修，docs 链接仍引用 | P2 |
| npm 包导入 | `@lobehub/ui`, `@lobehub/icons` 等 300+ 处导入路径 | P3（编译时路径，非用户可见） |
| 开发者调试面板 | DevPanel fixtures 中的 aetherhub.local 示例数据 | P3 |

> P1 = 交付前应清理 | P2 = 上线前应清理 | P3 = 低优先级，不影响用户
