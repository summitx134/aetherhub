# AetherHub Mobile — React Native 精确开发规格

> 基于 DESIGN.md + HTML Mockup 验证 | 2026-06-17 | ly 产出
> 目标: Expo SDK 54 + expo-router + NativeWind v4

---

## 一、Design Tokens 常量文件

### `apps/mobile/src/constants/tokens.ts`

```ts
// ====== COLOR PALETTE ======
export const colors = {
  // Base Neutrals
  canvasCream: '#FAF9F5',       // 主背景
  pureSurface: '#FFFFFF',        // 卡片/容器
  warmInk: '#141413',            // 主文字
  mutedWarmGray: '#78716C',      // 次要文字
  softWarmGray: '#A8A29E',       // 辅助/placeholder

  // Accent (唯一强调色)
  deepTeal: '#0F766E',           // CTA/选中态/链接
  deepTealPressed: '#0C5D56',    // pressed 加深
  deepTealTint: 'rgba(15,118,110,0.08)',   // 浅色背景
  deepTealBorder: 'rgba(15,118,110,0.15)', // 浅色边框

  // Semantic
  warmCoral: '#E5695D',          // 错误/危险
  sageGreen: '#4A7C59',          // 成功
  warmAmber: '#D97706',          // 警告/离线

  // Chat Bubbles
  userBubble: '#141413',
  aiBubble: '#F5F5F0',

  // Borders
  warmBorder: 'rgba(0,0,0,0.06)',
  subtleDivider: 'rgba(0,0,0,0.04)',
} as const;

// ====== SPACING (4px base) ======
// ⚠️ NativeWind v4: 使用 Tailwind 类名，不用 JS 常量
// 映射: p-1=4px, p-2=8px, p-3=12px, p-4=16px, p-5=20px, p-6=24px, p-8=32px
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
  // Screen horizontal padding
  screenH: 16,
} as const;

// ====== BORDER RADIUS ======
// NativeWind v4: rounded-sm=4, rounded-md=8, rounded-lg=12, rounded-xl=16, rounded-2xl=24
// rounded-full=9999
export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

// ====== TYPOGRAPHY ======
// ⚠️ NativeWind v4: 使用 Tailwind 类名
// text-3xl=32px, text-xl=20px, text-base=16px, text-sm=14px, text-xs=13px, text-[11px]
export const typography = {
  h1: { fontFamily: 'Geist-Bold', fontSize: 32, letterSpacing: -0.5, lineHeight: 38 },
  h2: { fontFamily: 'Geist-SemiBold', fontSize: 20, letterSpacing: -0.3, lineHeight: 26 },
  h3: { fontFamily: 'Geist-SemiBold', fontSize: 16, letterSpacing: -0.2, lineHeight: 22 },
  body: { fontFamily: 'Geist-Regular', fontSize: 16, lineHeight: 24 },
  bodySm: { fontFamily: 'Geist-Regular', fontSize: 14, lineHeight: 21 },
  caption: { fontFamily: 'Geist-Regular', fontSize: 13, lineHeight: 18 },
  tiny: { fontFamily: 'Geist-Medium', fontSize: 11, letterSpacing: 0.2, lineHeight: 14 },
  mono: { fontFamily: 'GeistMono-Regular', fontSize: 14, lineHeight: 21 },
  sectionHeader: { fontFamily: 'Geist-SemiBold', fontSize: 13, letterSpacing: 0.5, lineHeight: 18 },
} as const;

// ====== SHADOWS (React Native 兼容) ======
// ⚠️ Eva Warning: 不用 CSS box-shadow / backdrop-filter / :hover / scroll-snap
export const shadows = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2, // Android
  },
  bottomSheet: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  none: {
    shadowOpacity: 0,
    elevation: 0,
  },
} as const;
```

### `apps/mobile/src/constants/tokens.ts` — NativeWind v4 配置补充

```ts
// tailwind.config.js 中扩展:
// colors: {
//   canvas: '#FAF9F5',
//   ink: '#141413',
//   muted: '#78716C',
//   soft: '#A8A29E',
//   accent: '#0F766E',
//   'accent-pressed': '#0C5D56',
//   coral: '#E5695D',
//   sage: '#4A7C59',
//   'bubble-ai': '#F5F5F0',
// }
```

---

## 二、全局组件规格

### 2.1 Button — Primary (Deep Teal 填充)

```
组件层次:
<TouchableOpacity
  className="h-12 rounded-full bg-accent items-center justify-center px-6"
  activeOpacity={0.95}
  // pressed scale 用 Animated.spring
>
  <Text className="text-white font-geist-semibold text-base">
    {label}
  </Text>
</TouchableOpacity>
```

| 属性 | 值 |
|------|-----|
| 高度 | 48px (`h-12`) |
| 圆角 | 9999px (`rounded-full`) |
| 背景 | `#0F766E` (`bg-accent`) |
| 文字 | Geist SemiBold 16px, `#FFFFFF` |
| Pressed | `bg-accent-pressed`(#0C5D56), scale 0.97, opacity 0.95 |
| Disabled | opacity 0.4, `pointerEvents="none"` |
| Loading | ActivityIndicator(#FFFFFF) 替换文字 |

### 2.2 Button — Secondary (Outline)

| 属性 | 值 |
|------|-----|
| 高度 | 48px |
| 圆角 | 9999px |
| 背景 | transparent |
| 边框 | `border border-[rgba(0,0,0,0.12)]` width 1.5px |
| 文字 | Geist Medium 16px, `#141413` |
| Pressed | `bg-[rgba(0,0,0,0.04)]` |

### 2.3 Button — Icon

| 属性 | 值 |
|------|-----|
| 尺寸 | 40×40px tap area, 20px icon |
| 圆角 | 9999px |
| Pressed | `bg-[rgba(0,0,0,0.06)]`, scale 0.92 |

### 2.4 Card

```
组件层次:
<View className="bg-white rounded-xl border border-[rgba(0,0,0,0.05)] p-4"
  style={shadows.card}>
  {children}
</View>
```

### 2.5 Pill Input

```
组件层次:
<View className="flex-row items-center bg-white rounded-full h-12 px-1
  border border-[rgba(0,0,0,0.08)]">
  {/* left accessory */}
  <TouchableOpacity className="w-10 h-10 rounded-full items-center justify-center">
    <PhosphorIcon name="Paperclip" size={20} color="#78716C" />
  </TouchableOpacity>
  <TextInput
    className="flex-1 h-full px-2 text-base font-geist-regular text-ink"
    placeholder="输入消息..."
    placeholderTextColor="#A8A29E"
    // ⚠️ Eva: 聚焦态通过 onFocus/onBlur 切换 borderColor
    onFocus={() => setFocused(true)}
    onBlur={() => setFocused(false)}
    style={focused && { borderColor: colors.deepTeal }}
  />
  {/* right: send button */}
  <TouchableOpacity className="w-10 h-10 rounded-full bg-accent items-center justify-center">
    <PhosphorIcon name="PaperPlaneTilt" size={18} color="#FFFFFF" weight="fill" />
  </TouchableOpacity>
</View>
```

### 2.6 Search Bar

| 属性 | 值 |
|------|-----|
| 高度 | 44px (`h-11`) |
| 圆角 | 9999px |
| 背景 | `#FFFFFF` |
| 边框 | `border border-[rgba(0,0,0,0.06)]` |
| 左侧图标 | MagnifyingGlass, 20px, `#A8A29E` |
| Placeholder | `"搜索 Agent、Skill..."`, `#A8A29E` |

### 2.7 Chat Bubble — User (right)

```
<View className="self-end max-w-[75%]">
  <View className="bg-ink rounded-[16px_16px_4px_16px] px-4 py-3">
    <Text className="text-white font-geist-regular text-base">{message}</Text>
  </View>
  <Text className="text-right text-[11px] text-white/50 mt-1 px-1">{time}</Text>
</View>
```

### 2.8 Chat Bubble — AI (left)

```
<View className="self-start max-w-[75%]">
  <View className="bg-bubble-ai rounded-2xl px-4 py-3">
    <Text className="text-ink font-geist-regular text-base">
      {message}
      {streaming && <StreamingCursor />}
    </Text>
  </View>
  <Text className="text-left text-[11px] text-soft mt-1 px-1">{time}</Text>
</View>
```

### 2.9 Streaming Cursor

```tsx
// ⚠️ Eva: 用 react-native-reanimated 做 opacity 闪烁
const opacity = useSharedValue(1);
useEffect(() => {
  opacity.value = withRepeat(withSequence(
    withTiming(0, { duration: 400 }),
    withTiming(1, { duration: 400 }),
  ), -1);
}, []);
// render: <Animated.View className="w-0.5 h-4 bg-accent inline-block ml-0.5" style={{ opacity }} />
```

### 2.10 Agent Selector Chip

```
<TouchableOpacity
  className="flex-col items-center gap-1.5 min-w-[56] flex-shrink-0"
  activeOpacity={0.7}  // ⚠️ 不用 :hover，用 activeOpacity
>
  <View className={`w-12 h-12 rounded-full items-center justify-center
    ${selected ? 'border-[3px] border-accent scale-110' : ''}`}
    style={{ backgroundColor: agent.color }}>
    <Text className="text-white font-geist-bold text-xl">{agent.emoji}</Text>
  </View>
  <Text className={`text-[11px] font-medium ${selected ? 'text-accent font-semibold' : 'text-muted'}`}>
    {agent.name}
  </Text>
</TouchableOpacity>
```

### 2.11 Discover Card (2-column grid)

```
<View className="w-[calc(50%-6px)]"> {/* NativeWind: w-[48%] 或具体计算 */}
  <TouchableOpacity
    className="bg-white rounded-xl border border-[rgba(0,0,0,0.05)] p-3.5 gap-2"
    style={shadows.card}
    activeOpacity={0.9}
  >
    <View className="w-10 h-10 rounded-lg items-center justify-center"
      style={{ backgroundColor: item.color }}>
      <Text className="text-white font-bold text-lg">{item.icon}</Text>
    </View>
    <Text className="text-sm font-semibold text-ink" numberOfLines={1}>{item.title}</Text>
    <Text className="text-xs text-muted leading-[1.4]" numberOfLines={2}>{item.desc}</Text>
    <View className="flex-row items-center gap-2 mt-auto">
      <PhosphorIcon name="Download" size={14} color="#A8A29E" />
      <Text className="text-[11px] text-soft">{item.downloads}</Text>
      <PhosphorIcon name="Star" size={14} color="#A8A29E" weight="fill" />
      <Text className="text-[11px] text-soft">{item.rating}</Text>
    </View>
  </TouchableOpacity>
</View>
```

### 2.12 Settings List Item

```
<TouchableOpacity
  className="flex-row items-center px-4 py-3.5 gap-3"
  activeOpacity={0.7}
>
  <PhosphorIcon name={icon} size={22} color={colors.warmInk} className="w-7 text-center" />
  <Text className="flex-1 text-base text-ink font-geist-regular">{label}</Text>
  {value && <Text className="text-sm text-soft">{value}</Text>}
  <PhosphorIcon name="CaretRight" size={16} color="#A8A29E" />
</TouchableOpacity>
```

### 2.13 Settings Group Container

```
<View className="bg-white rounded-xl border border-[rgba(0,0,0,0.06)] overflow-hidden">
  {items.map((item, i) => (
    <React.Fragment key={i}>
      <SettingsItem {...item} />
      {i < items.length - 1 && <View className="h-[0.5px] bg-[rgba(0,0,0,0.04)] ml-[56px]" />}
    </React.Fragment>
  ))}
</View>
```

### 2.14 Section Header

```
<Text className="text-xs font-geist-semibold text-muted uppercase tracking-[0.5px] px-1 pb-2">
  {title}
</Text>
```

### 2.15 Fission Card (裂变增长)

```
<TouchableOpacity
  className="flex-row items-center gap-3 bg-white rounded-xl
    border border-[rgba(0,0,0,0.05)] border-l-[3px] border-l-accent p-3.5 mb-2"
  style={shadows.card}
  activeOpacity={0.8}
>
  <View className="w-9 h-9 rounded-full bg-[rgba(15,118,110,0.08)] items-center justify-center">
    <PhosphorIcon name={icon} size={18} color="#0F766E" />
  </View>
  <View className="flex-1">
    <Text className="text-sm font-semibold text-ink">{title}</Text>
    <Text className="text-xs text-muted mt-0.5">{subtitle}</Text>
  </View>
  <Text className="text-lg font-geistmono-bold text-accent">{points}</Text>
</TouchableOpacity>
```

### 2.16 Sub-Tab Bar (Discover)

```
<View className="flex-row border-b border-[rgba(0,0,0,0.04)]">
  {tabs.map(tab => (
    <TouchableOpacity
      key={tab.id}
      className={`flex-1 items-center py-2.5 border-b-2
        ${active ? 'border-accent' : 'border-transparent'}`}
    >
      <Text className={`text-sm font-medium
        ${active ? 'text-ink' : 'text-soft'}`}>
        {tab.label}
      </Text>
    </TouchableOpacity>
  ))}
</View>
```

### 2.17 Toast / Snackbar

```
<View className="absolute bottom-20 left-4 right-4 bg-ink rounded-xl px-4 py-3 flex-row items-center gap-2"
  style={shadows.bottomSheet}>
  <PhosphorIcon name={icon} size={16} color="#FFFFFF" />
  <Text className="text-white font-geist-regular text-sm">{message}</Text>
</View>
// ⚠️ Eva: 用 react-native-reanimated 做 slide-up+fade entry
// 3s 后 auto-dismiss
```

### 2.18 Offline Banner

```
<View className="bg-[#FEF3C7] py-2 px-4 items-center">
  <Text className="text-ink font-geist-medium text-[13px]">
    <PhosphorIcon name="Warning" size={14} color="#141413" /> 无网络连接
  </Text>
</View>
// ⚠️ Eva: slide-down entry via translateY animation
```

### 2.19 Status Bar / Badge

```
// Online dot: <View className="w-2 h-2 rounded-full bg-sage" />
// Unread badge: <View className="w-4 h-4 rounded-full bg-coral items-center justify-center">
//   <Text className="text-white font-geist-bold text-[10px]">{count}</Text>
// </View>
// Verified: <PhosphorIcon name="CheckCircle" size={16} color="#0F766E" weight="fill" />
```

---

## 三、屏幕实现规格

### 3.1 Chat Tab — `app/(tabs)/chat.tsx`

```
Screen Layout:
┌─ SafeAreaView (flex:1, bg-canvas) ──────────┐
│ StatusBar (dark-content)                      │
├─ AgentSelector (horizontal FlatList)          │ ← h-[56px], px-4
│   agentChips with 12px gap                    │
├─ ChatMessages (FlatList, inverted)            │ ← flex:1, px-4, pt-4
│   user bubble: self-end, max-w-[75%]         │
│   ai bubble: self-start, max-w-[75%]          │
│   keyExtractor: message.id                     │
├─ ChatInputArea                                │ ← p-2 px-4 pb-4
│   PillInput with paperclip + send             │
└──────────────────────────────────────────────┘

States:
- Empty: centered <EmptyState icon={ChatTeardropDots} text="选择一个 Agent 开始对话" />
- Loading: 3 skeleton bubble pairs (SkeletonView, varying widths)
- Offline: <OfflineBanner /> above AgentSelector
- Error: toast "发送失败"

⚠️ Eva: SSE 流式对话用 EventSource polyfill (RN 无 ReadableStream)
  接收 chunk → append 到消息末尾 → FlatList scrollToEnd
```

### 3.2 Discover Tab — `app/(tabs)/discover.tsx`

```
Screen Layout:
┌─ SafeAreaView (flex:1, bg-canvas) ──────────┐
├─ SearchBar                                    │ ← m-3 mx-4 h-11
├─ SubTabBar (Assistants|Skills|MCP|Models)    │ ← h-11
├─ DiscoverGrid (FlatList, numColumns=2)       │ ← px-4, gap-3
│   2-column cards, min-h-[180px]              │
└──────────────────────────────────────────────┘

States:
- Loading: 6 skeleton cards (2×3 grid), shimmer animation
- Empty (no results): centered "未找到相关结果" + tappable keyword pills
- Error: toast

⚠️ Eva: numColumns 在 FlatList 中可能触发 layout warning
  备选: 用 ScrollView + flexWrap 手动排版
```

### 3.3 Settings Tab — `app/(tabs)/settings.tsx`

```
Screen Layout:
┌─ SafeAreaView (flex:1, bg-canvas) ──────────┐
├─ ScrollView (px-4, pt-3, pb-8)              │
│   SectionHeader "PROFILE"                     │
│   ├─ SettingsGroup (用户名, 邮箱)            │
│   SectionHeader "PREFERENCES"                 │
│   ├─ SettingsGroup (语言, 外观)              │
│   SectionHeader "GROWTH"                      │
│   ├─ FissionCard ×5 (签到/任务/抽奖/排行/拼团)│
│   SectionHeader "ABOUT"                       │
│   ├─ SettingsGroup (版本, 隐私政策)          │
│   DestructiveButton "退出登录" (Warm Coral)   │
└──────────────────────────────────────────────┘

⚠️ Eva: Fission 数据从 Zustand fissionStore (AsyncStorage) 获取
  Web→RN 映射: localStorage → AsyncStorage adapter
```

### 3.4 Agent Detail — `app/agent/[id].tsx` (Stack 推入)

```
Screen Layout:
┌─ SafeAreaView (flex:1, bg-canvas) ──────────┐
│ StackHeader: < back button + "Agent 详情"    │
├─ ScrollView (px-4, pt-5)                     │
│   AgentHeroAvatar (80px circle, centered)    │ ← mb-3
│   AgentHeroName (H2, centered)               │
│   AgentHeroAuthor (@name · ✓, centered)     │
│   AgentHeroDesc (body, muted, max-w-[320])   │
│   StatsRow: 安装数 | 评分 | 版本             │ ← my-5
│     (font-mono, 18px bold)                   │
│   CTA Button: "开始对话" (full-width pill)   │
│   SectionHeader "能力"                        │
│   TagRow (flexWrap, gap-2, centered)         │
│   SectionHeader "配置"                        │
│   ConfigItems (Temperature, Max Tokens, etc) │
└──────────────────────────────────────────────┘

⚠️ Eva: Stack 推入用 expo-router 的 router.push()
  返回手势: iOS 原生 swipe-back, Android 硬件返回键
```

### 3.5 Auth — `app/auth.tsx` (Modal 呈现)

```
Screen Layout:
┌─ View (flex:1, bg-canvas, items-center justify-center) ┐
│   AuthLogo (56×56, rounded-xl, bg-accent)              │
│   "AetherHub" (H2) + "AI Agent 社区" (caption)        │
│   EmailInput (pill, full-width, max-w-[320])           │
│   CTA Button "继续" (full-width pill)                  │
│   Divider "—— 或 ——"                                   │
│   Google OAuth Button (outline, full-width)             │
│   Apple OAuth Button (outline, full-width)              │
└─────────────────────────────────────────────────────────┘

⚠️ Eva: OAuth 用 Better Auth + ASWebAuthenticationSession
  Token 持久化用 expo-secure-store (比 AsyncStorage 安全)
```

### 3.6 Conversation Full — `app/conversation/[id].tsx`

```
与 Chat Tab 相同布局，但：
- 无 Agent Selector（已锁定 Agent）
- Header 显示 Agent 名称 + 返回按钮
- 键盘避让: KeyboardAvoidingView behavior="padding" (iOS) / "height" (Android)
```

### 3.7 Fission Sub-pages (5 pages)

```
每页结构:
┌─ SafeAreaView ───────────────────────────────┐
│ StackHeader: < back + 页面标题                │
├─ 内容 (各页面独立)                            │
│   签到: 日历 Grid + 签到按钮                   │
│   任务: 任务列表 + 进度条                      │
│   抽奖: 转盘组件                                │
│   排行: FlatList 排行列表                      │
│   拼团: 卡片列表 + 参与按钮                    │
└──────────────────────────────────────────────┘

⚠️ Eva: Fission 纯逻辑层从 Web 完全复用
  fissionStore.ts → AsyncStorage 适配 (替换 localStorage)
```

---

## 四、动效规格 (react-native-reanimated)

### 4.1 全局 Spring 参数

```ts
// ⚠️ Eva: 所有动效用 transform + opacity (硬件加速)
const springConfig = { stiffness: 100, damping: 20 };   // 标准入场
const pressConfig = { stiffness: 200, damping: 22 };     // 按压反馈
const modalConfig = { stiffness: 200, damping: 25 };     // Modal/BottomSheet
```

### 4.2 按压反馈 (全局)

```tsx
const scale = useSharedValue(1);
const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));
// onPressIn: scale.value = withSpring(0.97, pressConfig)
// onPressOut: scale.value = withSpring(1, pressConfig)
```

### 4.3 Staggered 列表入场

```tsx
// FlatList item: 每项 50ms 延迟
const entering = FadeInUp.duration(300)
  .delay(index * 50)
  .springify()
  .withInitialValues({ transform: [{ translateY: 12 }, { scale: 0.96 }] });
```

### 4.4 Streaming Cursor

```tsx
const opacity = useSharedValue(1);
useEffect(() => {
  opacity.value = withRepeat(
    withSequence(
      withTiming(0, { duration: 400 }),
      withTiming(1, { duration: 400 }),
    ), -1, false
  );
}, []);
```

### 4.5 Skeleton Shimmer

```tsx
const translateX = useSharedValue(-200);
useEffect(() => {
  translateX.value = withRepeat(
    withTiming(200, { duration: 1500, easing: Easing.linear }),
    -1
  );
}, []);
// <Animated.View style={[skeletonBase, { transform: [{ translateX }] }]} />
```

---

## 五、Eva 风险提示 (RN 不兼容 CSS)

| Web CSS | RN 替代方案 | 影响范围 |
|---------|-----------|---------|
| `box-shadow` | iOS: `shadowColor/shadowOffset/shadowOpacity/shadowRadius`; Android: `elevation` | 全部卡片、对话框、底部栏 |
| `backdrop-filter: blur()` | iOS: `expo-blur` BlurView; Android: 纯色背景替代 | Tab Bar 模糊底 |
| `:hover` | `onPressIn`/`onPressOut` + `activeOpacity` | 全部按钮和交互元素 |
| `scroll-snap` | `FlatList` 的 `snapToInterval` / paging | 引导页滑动 |
| `@keyframes` 闪烁 | `react-native-reanimated` `withRepeat` | streaming cursor |
| `linear-gradient` 骨架屏 | `expo-linear-gradient` 或 shimmer reanimated | 加载骨架屏 |
| `::placeholder` | `placeholderTextColor` prop | 全部输入框 |

---

## 六、文件清单

| 文件 | 用途 |
|------|------|
| `docs/web-to-mobile/DESIGN.md` | Stitch 语义设计系统（可直接导入 Stitch） |
| `docs/web-to-mobile/aetherhub-mockup.html` | 交互式 HTML Mockup（浏览器预览） |
| `docs/web-to-mobile/2026-06-17-porting-spec.md` | Web→App 还原书（功能清单+技术决策） |
| `apps/mobile/src/constants/tokens.ts` | 设计 token 常量（颜色/间距/阴影/字体） |
| `apps/mobile/src/components/ui/` | 全局组件目录（Button, Card, Input, etc） |
| `apps/mobile/src/components/chat/` | Chat 专属组件（Bubble, AgentChip, StreamCursor） |
| `apps/mobile/src/components/discover/` | Discover 专属组件（DiscoverCard, SubTabBar） |
| `apps/mobile/src/components/settings/` | Settings 专属组件（SettingsItem, FissionCard） |
| `app/(tabs)/chat.tsx` | Chat Tab 页面 |
| `app/(tabs)/discover.tsx` | Discover Tab 页面 |
| `app/(tabs)/settings.tsx` | Settings Tab 页面 |
| `app/agent/[id].tsx` | Agent Detail Stack 页面 |
| `app/auth.tsx` | Auth Modal 页面 |
| `app/conversation/[id].tsx` | 全屏对话页面 |

---

## 七、验收检查清单

- [ ] 所有色值与 DESIGN.md 一致（无纯黑 #000000，无金色 #D4A017）
- [ ] 所有阴影用 RN 兼容参数（无 box-shadow）
- [ ] 所有按钮 Pressed 状态（无 :hover）
- [ ] 所有交互元素 ≥ 44px 触摸目标
- [ ] 字体 Geist 通过 expo-font 加载
- [ ] 图标使用 @phosphor-icons/react-native（无 emoji）
- [ ] Auth 独立 Phase，在其他页面之前完成
- [ ] Zustand Store localStorage → AsyncStorage 适配
- [ ] Fission 逻辑层从 Web 完全复用
- [ ] KeyboardAvoidingView 在 Chat 和 Auth 页面正确配置
- [ ] SafeAreaView 覆盖所有页面（刘海屏兼容）
- [ ] Tab Bar iOS blur (expo-blur) / Android solid bg
- [ ] 空状态/加载态/错误态/离线态 全部覆盖
