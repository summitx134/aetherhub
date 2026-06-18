# Design System: AetherHub Mobile

> Generated: 2026-06-17 | Target: React Native (Expo SDK 54) | Format: Stitch Semantic Design Language
> Source: AetherHub Web → App Porting Spec v1.0

## 1. Visual Theme & Atmosphere

A restrained, warm, and professionally confident interface for an AI agent community platform. The atmosphere is like a well-lit architecture studio — cream walls, natural light, deep teal accents punctuating the warmth. Not a cold developer tool, not a flashy marketing page.

- **Density**: Daily App Balanced (4/10) — sufficient information without crowding
- **Variance**: Offset Asymmetric (5/10) — rhythmic layout variation across tabs, avoiding repetition
- **Motion**: Fluid Spring Physics (6/10) — spring-driven micro-interactions, hardware-accelerated transforms only

The design speaks in warm neutrals with a single sophisticated accent. Every element occupies its own clean spatial zone — no overlapping, no clutter, no decorative filler.

## 2. Color Palette & Roles

### Base Neutrals

- **Canvas Cream** (#FAF9F5) — Primary background surface. Warm off-white, never cold gray.
- **Pure Surface** (#FFFFFF) — Card and container fill. Clean contrast against cream.
- **Warm Ink** (#141413) — Primary text. Deep warm black, never pure #000000.
- **Muted Warm Gray** (#78716C) — Secondary text, descriptions, metadata, timestamps.
- **Soft Warm Gray** (#A8A29E) — Tertiary text, placeholder copy, disabled labels.
- **Warm Border** (rgba(0,0,0,0.06)) — Card borders, dividers, 1px structural lines.
- **Subtle Divider** (rgba(0,0,0,0.04)) — List item separators, fine lines.

### Accent (SINGLE — max 1 accent, saturation < 80%)

- **Deep Teal** (#0F766E) — Primary accent. CTAs, selected states, links, focus rings, active tab indicators.
  - Pressed state: #0C5D56 (10% darker)
  - Light tint (backgrounds): rgba(15,118,110,0.08)
  - Light tint (borders): rgba(15,118,110,0.15)

### Semantic Colors

- **Warm Coral** (#E5695D) — Danger, error, destructive actions.
  - Light tint: rgba(229,105,93,0.08)
- **Sage Green** (#4A7C59) — Success, confirmation, positive indicators.
  - Light tint: rgba(74,124,89,0.08)
- **Warm Amber** (#D97706) — Warning, offline banner, attention states.
  - Light tint: rgba(217,119,6,0.08)

### Chat Bubble Colors

- **User Bubble** (#141413) — Warm ink background, #FFFFFF text
- **AI Bubble** (#F5F5F0) — Slightly warm off-white, #141413 text

### BANNED Colors

- ❌ Pure black (#000000) — use Warm Ink instead
- ❌ Neon purple/blue gradients
- ❌ Oversaturated accents
- ❌ Golden #D4A017 (tacky)
- ❌ Any glow/outer shadow on colored elements

## 3. Typography Architecture

### Font Stack

- **Primary**: Geist (Vercel) — Modern geometric sans-serif, clean and precise.
- **Mono**: Geist Mono — Code blocks, technical parameters, timestamps, token displays.
- **BANNED**: Inter (overused), Times New Roman, Georgia, Garamond, any generic serif.

### Scale Hierarchy

| Role | Family | Weight | Size | Letter Spacing | Line Height |
|------|--------|--------|------|----------------|-------------|
| H1 — Screen Title | Geist | Bold (700) | 32px | -0.5px | 1.2 (38px) |
| H2 — Section Header | Geist | Semibold (600) | 20px | -0.3px | 1.3 (26px) |
| H3 — Card Title | Geist | Semibold (600) | 16px | -0.2px | 1.4 (22px) |
| Body — Primary | Geist | Regular (400) | 16px | 0 | 1.5 (24px) |
| Body — Small | Geist | Regular (400) | 14px | 0 | 1.5 (21px) |
| Caption — Meta | Geist | Regular (400) | 13px | 0 | 1.4 (18px) |
| Caption — Tiny | Geist | Medium (500) | 11px | 0.2px | 1.3 (14px) |
| Mono — Code | Geist Mono | Regular (400) | 14px | 0 | 1.5 (21px) |

### Typography Rules

- Hierarchy through weight and color, not just size.
- Body text never exceeds 65 characters per line.
- Section group titles (Settings): Geist Semibold, 13px, uppercase tracking +0.5px, Muted Warm Gray.
- Numbers in dense layouts: Geist Mono tabular figures.
- Emoji forbidden — use Phosphor SVG icons instead.

## 4. Spacing System

4px base unit grid: `4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64`

| Context | Value |
|---------|-------|
| Screen horizontal padding | 16px |
| Card internal padding | 16px |
| List item vertical padding | 12px |
| Component group gap | 24px |
| Section vertical gap | 32px |
| Paragraph gap | 12px |
| Icon + label gap | 8px |
| Chip/tag inline padding | 8px 12px |
| Bottom Tab Bar height | 56px + safe area |

## 5. Border Radius System

Seven tiers: `0 / 4 / 8 / 12 / 16 / 24 / 9999`

| Element | Radius | Notes |
|---------|--------|-------|
| Buttons | 9999px | Full pill shape |
| Input fields | 9999px | Full pill shape |
| Cards | 16px | Generously rounded |
| Chat bubble (AI) | 16px | Uniform rounding |
| Chat bubble (User) | 16px 16px 4px 16px | Asymmetric tail |
| Avatars | 9999px | Perfect circle |
| Tags / Chips | 9999px | Full pill |
| Modals / Bottom sheets | 24px | Top corners only |
| Toast / Snackbar | 12px | Compact rounded |

## 6. Shadow System (React Native Compatible)

Eva's Rule: No CSS box-shadow, no backdrop-filter. Use iOS shadowColor + Android elevation.

### Card Elevation

```js
// RN Shadow Style
shadowColor: '#000000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.06,
shadowRadius: 8,
// Android
elevation: 2,
```

### Input Field Inner Shadow

Simulate via nested View layers (no box-shadow):
- Outer container: #FAF9F5 bg, border 1px rgba(0,0,0,0.08)
- Inner shadow effect: inset shadow via negative margin + overflow hidden (or skip — not critical on mobile)

### Floating Action / Bottom Sheet

```js
shadowColor: '#000000',
shadowOffset: { width: 0, height: -2 },
shadowOpacity: 0.08,
shadowRadius: 12,
elevation: 4,
```

## 7. Component Stylings

### Buttons

**Primary (Deep Teal fill)**
- Background: Deep Teal #0F766E
- Text: #FFFFFF, Geist Semibold 16px
- Shape: Pill, 9999px radius, height 48px
- Pressed: background → #0C5D56, opacity 0.95, scale 0.97
- Disabled: opacity 0.4
- Loading: spinner replaces text, background unchanged
- Width: full-width by default (stretch to container)

**Secondary (Outline)**
- Background: transparent
- Border: 1.5px rgba(0,0,0,0.12)
- Text: Warm Ink #141413, Geist Medium 16px
- Shape: Pill, 9999px radius, height 48px
- Pressed: background rgba(0,0,0,0.04)

**Ghost / Text Button**
- Background: transparent
- Text: Deep Teal #0F766E or Warm Ink
- No border, no shadow
- Pressed: opacity 0.6

**Icon Button (Small)**
- Size: 40×40px tap target
- Icon: 20px Phosphor icon
- Shape: circle (9999px)
- Pressed: background rgba(0,0,0,0.06)

### Cards

- Background: Pure Surface #FFFFFF
- Border: 1px Warm Border rgba(0,0,0,0.05)
- Shadow: Card Elevation (see Shadow System)
- Radius: 16px
- Padding: 16px
- Used ONLY when elevation communicates hierarchy. In dense lists, replace cards with border-top dividers.

### Discover Cards (2-column Grid)
- Width: `(screenWidth - 48px) / 2` (16px padding × 2 + 16px gap)
- Height: flexible, min 180px
- Layout: icon top-left → title → description (2 lines max) → tags row → stats bottom
- Skeleton loader: shimmer matching card dimensions

### Input Fields

**Pill Input (Chat Tab)**
- Shape: Pill, 9999px radius, height 48px
- Background: Pure Surface #FFFFFF
- Border: 1px rgba(0,0,0,0.08)
- Left accessory: Paperclip icon button (40px circle)
- Right accessory: Send button (Teal fill, 40px circle)
- Placeholder: "输入消息..." Soft Warm Gray
- Focus: border Deep Teal #0F766E
- Inner shadow: simulated via layered views (optional, RN-compatible approach)

**Search Bar (Discover Tab)**
- Shape: Pill, 9999px radius, height 44px
- Background: Pure Surface #FFFFFF
- Border: 1px rgba(0,0,0,0.06)
- Left icon: MagnifyingGlass, Soft Warm Gray
- Placeholder: "搜索 Agent、Skill..."
- Focus: border Deep Teal

**Form Input (Auth / Settings)**
- Shape: Pill, 9999px radius, height 48px
- Background: rgba(0,0,0,0.03)
- Border: none (background distinguishes)
- Label: above input, Geist Medium 14px, Warm Ink
- Error: Warm Coral border + error text below, Geist Regular 13px
- Focus: border Deep Teal

### Chat Bubbles

**User Message (right-aligned)**
- Background: Warm Ink #141413
- Text: Pure Surface #FFFFFF, Geist Regular 16px
- Radius: 16px 16px 4px 16px
- Max width: 75% of screen
- Padding: 12px 16px
- Timestamp: Geist 11px, rgba(255,255,255,0.5), right-aligned below bubble

**AI Message (left-aligned)**
- Background: #F5F5F0
- Text: Warm Ink #141413, Geist Regular 16px
- Radius: 16px
- Max width: 75% of screen
- Padding: 12px 16px
- Streaming indicator: animated cursor "▊" at end of partial message
- Timestamp: Geist 11px, Soft Warm Gray, left-aligned below bubble

### Tab Bar

- Height: 56px + safe area bottom inset
- Background: rgba(250,249,245,0.92) + backdrop blur (iOS) / solid #FAF9F5 (Android)
- Top border: 0.5px rgba(0,0,0,0.06)
- Tab items: 3 equal-width columns
- Icon: Phosphor 24px, default Soft Warm Gray, active Deep Teal
- Label: Geist 11px Medium, below icon, 4px gap
- Active indicator: none (color change only — clean, not iOS-style fill)

### Segment Control / Sub-tabs (Discover)

- Height: 44px
- Layout: horizontal row, equal-width segments
- Label: Geist Medium 14px, default Soft Warm Gray, active Warm Ink
- Active indicator: 2px Deep Teal underline, width matches text
- Separator: none between segments
- Pressed: opacity 0.6
- Scrollable if 4+ segments

### List Items (Settings)

- Height: 48px min
- Layout: icon (left, 24px) → label (flex) → value/arrow (right)
- Icon color: Warm Ink (not accent — reserved for destructive)
- Label: Geist Regular 16px, Warm Ink
- Value/Secondary: Geist Regular 14px, Soft Warm Gray, right-aligned
- Arrow: CaretRight 16px, Soft Warm Gray
- Divider: 0.5px rgba(0,0,0,0.04), inset (with 56px left padding — aligns with label)
- Pressed: background rgba(0,0,0,0.03)
- Destructive item: label in Warm Coral

### Fission Cards (Settings — Growth Section)

- Layout: horizontal card with icon + title + progress or points
- Background: Pure Surface #FFFFFF
- Border: 1px Warm Border
- Radius: 16px
- Shadow: Card Elevation
- Special accent bar: 3px Deep Teal left border (2px radius on left side)
- Points display: Geist Mono Bold 20px, Deep Teal
- Progress indicator: 4px height track, Deep Teal fill

### Modals / Bottom Sheets

- Background: Pure Surface #FFFFFF
- Top radius: 24px
- Handle: 36px wide, 4px height, rgba(0,0,0,0.15), centered
- Backdrop: rgba(0,0,0,0.4)
- Content padding: 24px top, 16px horizontal, 32px bottom (+ safe area)
- Animation: spring, stiffness 200, damping 25 (react-native-reanimated)

### Toast / Snackbar

- Background: Warm Ink #141413
- Text: Pure Surface #FFFFFF, Geist Regular 14px
- Radius: 12px
- Padding: 12px 16px
- Position: bottom, 16px from Tab Bar
- Icon: left, 16px Phosphor
- Duration: 3s auto-dismiss
- Entry: slide up + fade, spring stiffness 150 damping 18

### Status Indicators

- **Online/Active dot**: 8px circle, Sage Green #4A7C59
- **Offline dot**: 8px circle, Soft Warm Gray #A8A29E
- **Unread badge**: 16px circle, Warm Coral #E5695D, white number Geist Bold 10px
- **Verified check**: Phosphor CheckCircle, Deep Teal, 16px

## 8. Navigation Structure

```
Bottom Tab Bar (fixed, 56px + safe area)
├─ Chat (ChatTeardropDots icon)
├─ Discover (Compass icon)
└─ Settings (Gear icon)

Stack Screens (push from right, spring transition)
├─ AgentDetail — from Discover card tap
├─ ConversationFull — from Chat bubble tap
├─ SkillDetail — from Discover card tap
├─ MCPDetail — from Discover card tap
├─ ModelDetail — from Discover card tap
├─ Notifications — from header bell icon
├─ Auth/Login — modal presentation
└─ Onboarding — full-screen flow (3 steps, swipe)
```

## 9. Screen-by-Screen Layout Specs

### 9.1 Chat Tab

```
┌─────────────────────────────┐
│ [Agent Avatar Row — horizontal scroll] │ ← 56px height, 16px padding
│  ○ Alice  ● Bob  ○ Carol   │   selected: 3px Deep Teal ring
├─────────────────────────────┤
│                             │
│  ┌──────────────────┐      │ ← AI bubble left
│  │ AI response...   │      │
│  └──────────────────┘      │
│        ┌──────────────┐    │ ← User bubble right
│        │ User message │    │
│        └──────────────┘    │
│  ┌──────────────────┐      │
│  │ AI streaming ▊...│      │ ← streaming cursor
│  └──────────────────┘      │
│                             │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │ ← Input area, 16px padding
│ │ 🔗  [_____________]  ➤ │ │   Pill input, paperclip + send
│ └─────────────────────────┘ │
└─────────────────────────────┘
         [Chat Tab Bar]
```

**Empty State**: Centered illustration + "选择一个 Agent 开始对话" (Geist Regular 16px, Soft Warm Gray) + "浏览 Discover" ghost button

**Loading State**: Skeleton chat bubbles — 3 pairs of gray rectangles at varying widths

**Offline State**: Yellow banner "无网络连接" (Warm Amber bg, Warm Ink text, 40px height)

### 9.2 Discover Tab

```
┌─────────────────────────────┐
│ 🔍 搜索 Agent、Skill...     │ ← Search bar, 44px, pill
├─────────────────────────────┤
│ Assistants │ Skills │ MCP │ Models │ ← Segment tabs
├─────────────────────────────┤
│ ┌──────────┐ ┌──────────┐  │
│ │ Icon     │ │ Icon     │  │
│ │ Title    │ │ Title    │  │ ← 2-col card grid
│ │ Desc...  │ │ Desc...  │  │   16px gap between
│ │ ⬇ 1.2k  │ │ ⬇ 856   │  │
│ └──────────┘ └──────────┘  │
│ ┌──────────┐ ┌──────────┐  │
│ │ ...      │ │ ...      │  │
│ └──────────┘ └──────────┘  │
└─────────────────────────────┘
        [Discover Tab Bar]
```

**Empty State (no results)**: "未找到相关结果" + suggested keywords as tappable pills

**Loading State**: 6 skeleton cards (2×3 grid), shimmer animation

### 9.3 Settings Tab

```
┌─────────────────────────────┐
│ PROFILE                     │ ← Section header, uppercase, 13px
│ ┌─────────────────────────┐ │
│ │ 👤 用户名          ›   │ │ ← List item
│ │ 📧 email@...        ›   │ │
│ └─────────────────────────┘ │
│                             │
│ PREFERENCES                 │
│ ┌─────────────────────────┐ │
│ │ 🌐 语言       中文  ›  │ │
│ │ 🎨 外观       浅色  ›  │ │
│ └─────────────────────────┘ │
│                             │
│ GROWTH                      │
│ ┌─────────────────────────┐ │
│ │ ▌📅 每日签到    +5 🔥 │ │ ← Fission card with accent bar
│ │ ▌✅ 任务中心    3/5   │ │
│ │ ▌🎰 积分抽奖    200🏆 │ │
│ └─────────────────────────┘ │
│                             │
│ ABOUT                       │
│ ┌─────────────────────────┐ │
│ │ ℹ️ 版本      v1.0   ›  │ │
│ │ 📄 隐私政策         ›  │ │
│ └─────────────────────────┘ │
│                             │
│        [退出登录]           │ ← Destructive, Warm Coral
└─────────────────────────────┘
        [Settings Tab Bar]
```

### 9.4 Agent Detail (Stack Push)

```
┌─────────────────────────────┐
│ ← 返回                      │ ← Header with back arrow
├─────────────────────────────┤
│        [Agent Avatar]       │ ← 80px circle, centered
│        Agent Name           │ ← H1, centered
│        @author              │ ← Caption, Muted Warm Gray
│        Description text...  │ ← Body, 2-3 lines
│                             │
│   ⬇ 12.5k  │  ★ 4.8  │ v2.1 │ ← Stats row, Mono numbers
│                             │
│ ┌─────────────────────────┐ │
│ │     开始对话             │ │ ← Primary CTA, full-width pill
│ └─────────────────────────┘ │
│                             │
│ 能力                        │ ← Section header
│ [对话] [代码] [搜索] [图像] │ ← Tag chips row
│                             │
│ 配置                        │ ← Section header
│ Temperature: 0.7            │ ← Settings items
│ Max Tokens: 4096            │
└─────────────────────────────┘
```

### 9.5 Auth / Onboarding

**Login Screen**
```
┌─────────────────────────────┐
│                             │
│        [AetherHub Logo]     │ ← 64px, centered
│        AetherHub            │ ← Brand name, H2
│        AI Agent 社区         │ ← Tagline, Caption
│                             │
│ ┌─────────────────────────┐ │
│ │  email@example.com      │ │ ← Email input, pill
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │        继续              │ │ ← Primary CTA
│ └─────────────────────────┘ │
│                             │
│        ── 或 ──             │ ← Divider
│                             │
│ ┌─────────────────────────┐ │
│ │  G  使用 Google 登录    │ │ ← OAuth button, outline
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │    使用 Apple 登录      │ │ ← OAuth button, outline
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

**Onboarding (3 steps, swipeable)**
- Step 1: "选择你的兴趣领域" — interest tag grid (pill chips)
- Step 2: "选择你的第一个 Agent" — agent cards, selectable
- Step 3: "开始对话" — CTA to enter Chat Tab
- Page indicator: 3 dots, Deep Teal active, Warm Border inactive

## 10. Motion & Interaction

### Spring Physics Defaults
- **Standard press**: stiffness 200, damping 22
- **Card entry**: stiffness 100, damping 20
- **Modal/Bottom Sheet**: stiffness 200, damping 25
- **Page transition (Stack push)**: stiffness 150, damping 20, slide from right

### Perpetual Micro-Interactions
- **Streaming cursor**: blink animation, opacity 1→0→1, 800ms loop
- **Skeleton shimmer**: linear gradient translate, 1.5s loop
- **Loading spinner**: rotate 360°, 1s linear infinite
- **Pulse dot (online)**: scale 1→1.3→1, 2s loop

### Staggered Orchestration
- **List items**: cascade delay 50ms per item (30 items)
- **Discover cards**: cascade delay 80ms per card, row by row
- **Tab switch**: instant content swap, no crossfade (fast, deliberate)

### Performance Rules
- Animate ONLY `transform` and `opacity` — never `top`, `left`, `width`, `height`
- Use `useNativeDriver: true` for all animations
- Avoid layout animations on scrollable lists
- `prefers-reduced-motion`: disable all spring physics, use 200ms opacity fade

## 11. Icon System (Phosphor)

All icons from `@phosphor-icons/react-native`. Weight: Regular (default), Fill for active/selected states.

| Usage | Icon Name | Size | Weight |
|-------|-----------|------|--------|
| Chat Tab | `ChatTeardropDots` | 24px | Fill (active) / Regular |
| Discover Tab | `Compass` | 24px | Fill (active) / Regular |
| Settings Tab | `Gear` | 24px | Fill (active) / Regular |
| Search | `MagnifyingGlass` | 20px | Regular |
| Send message | `PaperPlaneTilt` | 20px | Fill |
| Attachment | `Paperclip` | 20px | Regular |
| Back / Close | `CaretLeft` / `X` | 24px | Regular |
| Forward arrow | `CaretRight` | 16px | Regular |
| Notification | `Bell` | 24px | Regular |
| User / Profile | `User` | 24px | Fill |
| Download | `Download` | 16px | Regular |
| Star / Rating | `Star` | 16px | Fill |
| Verified | `CheckCircle` | 16px | Fill |
| Settings cog | `Gear` | 24px | Regular |
| Sign out | `SignOut` | 20px | Regular |
| Add / Create | `Plus` | 24px | Regular |
| Loading | `Spinner` | 20px | Regular |
| More options | `DotsThree` | 24px | Regular |
| Globe / Language | `Globe` | 24px | Regular |
| Palette / Theme | `Palette` | 24px | Regular |
| Check-in / Calendar | `CalendarCheck` | 24px | Regular |
| Tasks | `CheckSquare` | 24px | Regular |
| Lottery | `Ticket` | 24px | Regular |
| Leaderboard | `Trophy` | 24px | Regular |
| Group Recall | `UsersThree` | 24px | Regular |

## 12. Interaction States (ALL screens must cover)

| State | Visual Treatment |
|-------|-----------------|
| **default** | Normal rendering |
| **pressed** | opacity 0.7 + scale 0.97 (spring). Teal buttons: bg darkens to #0C5D56 |
| **disabled** | opacity 0.4, pointer-events: none (RN: `disabled` prop) |
| **loading** | Skeleton shimmer (content area), spinner (button), animated cursor (chat) |
| **error** | Warm Coral border on input, error text below (Geist 13px), toast for global errors |
| **empty** | Centered illustration + guidance text + optional CTA |
| **offline** | Top banner: Warm Amber bg (#FEF3C7), Warm Ink text, 40px height, slide-down entry |

## 13. Anti-Patterns (Strictly BANNED)

### Visual
- ❌ Pure black (#000000) anywhere
- ❌ Neon glow, outer shadow on colored elements
- ❌ CSS `backdrop-filter` (RN incompatible)
- ❌ CSS `box-shadow` (use RN shadow props)
- ❌ `:hover` pseudo-class (mobile has no hover — use pressed)
- ❌ `scroll-snap` (RN incompatible)
- ❌ Oversaturated accent colors (>80% saturation)
- ❌ Golden #D4A017 (tacky, replaced with Deep Teal)

### Typography
- ❌ Inter font (overused)
- ❌ Any serif font (Times New Roman, Georgia, Garamond, etc.)
- ❌ Emoji as icons (use Phosphor SVG)

### Layout
- ❌ Centered hero sections
- ❌ 3-column equal card grids (mobile collapses anyway)
- ❌ Overlapping elements — clean spatial separation always
- ❌ Horizontal scroll on mobile

### Content
- ❌ Fake metrics ("99.99% uptime")
- ❌ Generic placeholder names ("John Doe", "Acme")
- ❌ AI copywriting clichés ("Elevate", "Seamless", "Unleash", "Next-Gen")
- ❌ Filler text ("Scroll to explore", "Swipe down")
- ❌ Decorative SVG illustrations pretending to be product

## 14. Responsive & Platform Rules

### Mobile-First (single column always)
- All multi-column layouts collapse to single column below 375px width
- 2-column grid (Discover): minimum card width 160px
- Typography: H1 scales via `clamp(24px, 8vw, 32px)`

### Touch Targets
- Minimum interactive element: 44×44px
- Icon buttons: 40×40px tap area (with 4px padding)
- List items: 48px minimum height

### Platform Differences
| Feature | iOS | Android |
|---------|-----|---------|
| Status bar | `expo-status-bar` light/dark | same |
| Safe area | `SafeAreaView` | same |
| Tab bar blur | `BlurView` (expo-blur) | solid #FAF9F5 |
| Shadow | `shadowColor` props | `elevation` prop |
| Back gesture | Native swipe back | Native back button |
| Font | Geist OTF via expo-font | same |
| Keyboard | `KeyboardAvoidingView` behavior="padding" | behavior="height" |

## 15. Export Targets

This DESIGN.md serves as:
1. **Stitch input** — paste into Stitch prompt for AI-generated screens
2. **Claude Code input** — alongside PRD for auto-implementation
3. **Developer handoff** — exact values for React Native implementation
4. **Design QA checklist** — verify every screen against these specs

---

*End of Design System. Version 1.0. For questions, refer to the Porting Spec at `docs/web-to-mobile/2026-06-17-porting-spec.md`.*
