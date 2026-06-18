# AetherHub Web → Mobile Migration Plan

> Created: 2026-06-17 | Tool: WebToMobile Plugin + Claude Code
> Source: https://github.com/summitx134/aetherhub (local: D:/Download/lobehub-full/lobehub-canary)
> Target: **Expo React Native** (iOS + Android)

## Capabilities & Limits

| Capability | Status |
|-----------|--------|
| Source access | ✅ Full (local repo + GitHub) |
| Framework | Next.js 16.2 + React 19 + Vite 8 |
| Rendering | Client SPA + external tRPC API |
| Auth | Better Auth (OAuth/OIDC) + NoAuth (dev) |
| Backend | Next.js API routes + tRPC lambda |
| Database | PostgreSQL (Drizzle ORM) |
| Mobile routes exist | ✅ `src/routes/(mobile)/` — responsive web, not native |

## Stack Decision

**Expo React Native (SDK 54+)** — default stack.

- Cross-platform iOS + Android from single codebase
- `expo-router` maps cleanly to Next.js file-based routing
- NativeWind v4 for Tailwind → mobile styling
- EAS Build for cloud IPA/APK generation

## Reusable Code `[from-code]`

1. **TypeScript types & Zod schemas** — All `src/types/`, `packages/*/src/` types port directly
2. **tRPC client** — `packages/trpc/src/client/lambda.ts` reuses as API layer
3. **Zustand stores** — `src/store/` ports with minor DOM adaptations (localStorage → AsyncStorage)
4. **Business logic** — Fission engines (`src/business/client/features/Fission/`) are pure logic, fully reusable
5. **API clients** — `src/services/` external API calls work unchanged
6. **i18n** — 18 language JSON files port directly
7. **Branding constants** — `packages/business/const/src/branding.ts` unchanged

## Rewrite-Required Code

| Web Component | Mobile Replacement | Difficulty |
|------|------|:--:|
| `next/link`, `next/router` | `expo-router` | ⚡ config |
| `next/image` | `expo-image` | ⚡ config |
| `next/font` | `expo-font` + `useFonts` | ⚡ config |
| Next.js Server Components | Regular React + SWR/React Query | 🔧 rewrite |
| `middleware.ts` (auth guard) | Navigation-level auth check | 🔧 rewrite |
| `antd` UI components | React Native primitives + custom | 🔨 full rewrite |
| CSS Modules / `antd-style` | NativeWind v4 | 🔧 rewrite |
| `localStorage` | `AsyncStorage` | ⚡ config |
| DOM-dependent components | RN equivalents | 🔨 full rewrite |
| `react-router-dom` (SPA) | Not needed — expo-router handles | ⚡ config |

## API Needs

**No blockers.** AetherHub already has tRPC API endpoints (`/trpc/lambda/*`) served by Next.js backend. Mobile app calls same API. Backend stays unchanged.

## Unknowns & Blockers

1. **[assumption]** antd components (Modal, Drawer, Card, Table) — no RN equivalent. Must rebuild with RN primitives or `react-native-reusables`.
2. **[assumption]** Electron desktop app — out of scope for this migration. Keep as separate project.
3. **[assumption]** `apps/server/` backend code — stays on server. Mobile app is client-only.
4. **[inferred]** Mobile routes in `src/routes/(mobile)/` are responsive web, not native. Need full rewrite for RN.

## Implementation Checklist

### Phase 1: Foundation (Day 1)
- [ ] Scaffold Expo project with `npx create-expo-app@latest aetherhub-mobile` `[inferred]`
- [ ] Install dependencies: `expo-router`, `nativewind`, `@tanstack/react-query`, `zustand`, `async-storage` `[from-code]`
- [ ] Configure NativeWind (`tailwind.config.js` + Babel plugin) `[inferred]`
- [ ] Copy i18n JSON files → `mobile/locales/` `[from-code]`
- [ ] Port TypeScript types → `mobile/src/types/` `[from-code]`
- [ ] Port branding constants → `mobile/src/constants/branding.ts` `[from-code]`

### Phase 2: Navigation & Auth (Day 2)
- [ ] Map web routes → mobile navigation (Tab: Home/Chat/Community/Settings) `[inferred]`
- [ ] Implement auth flow with existing Better Auth endpoints `[from-code]`
- [ ] Port Zustand user store → AsyncStorage persistence `[from-code]`
- [ ] Implement auth guard at navigation level `[inferred]`

### Phase 3: Core Pages (Day 3-5)
- [ ] Home/Chat page — port chat input, model selector, message list `[from-code]` `[rewrite]`
- [ ] Community page — port assistant/skills/MCP/model lists `[from-code]` `[rewrite]`
- [ ] Settings page — port profile, LLM, provider settings `[from-code]` `[rewrite]`
- [ ] Fission pages — port checkin, tasks, lottery, leaderboard, group-buy (pure logic) `[from-code]`

### Phase 4: Integration & Polish (Day 6-7)
- [ ] Wire tRPC client to mobile API layer `[from-code]`
- [ ] Replace antd components with RN equivalents `[rewrite]`
- [ ] NativeWind styling pass on all screens `[rewrite]`
- [ ] EAS Build configuration `[inferred]`
- [ ] IPA/APK build test `[inferred]`

## Human Sign-Off Required

- [ ] Auth: review mobile auth flow against backend requirements
- [ ] API: confirm tRPC endpoints accessible from mobile client
- [ ] Brand: review mobile branding against AetherHub design
- [ ] Legal: confirm App Store / Google Play readiness
- [ ] Store credentials: App Store Connect + Google Play Console access

## Verification

Run `mobile-qa-release` after build to verify:
- [ ] Lint + typecheck pass
- [ ] Expo build succeeds (iOS + Android)
- [ ] Key flows work: sign in → chat → community → settings → fission
- [ ] Performance: no jank on scroll, images load correctly
