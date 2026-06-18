// AetherHub Mobile Design Tokens
// Author: ly + Stitch | 2026-06-17
// Design ref: Poe / ChatGPT / Claude / Gemini

export const colors = {
  obsidian: '#0d0d0c',
  amberGlass: '#1a1a18',
  raisedAmber: '#22221e',
  hoverSurface: '#252522',
  ivory: '#f0eee7',
  warmStone: '#a09d95',
  mutedSand: '#7a7670',
  mist: '#55524d',
  amberGold: '#d4a853',
  amberHover: '#e0b860',
  amberPressed: '#c49a40',
  successGreen: '#3da55c',
  errorCrimson: '#c04040',
  whisperBorder: 'rgba(255,245,230,0.06)',
  standardBorder: 'rgba(255,245,230,0.10)',
  accentBorder: 'rgba(212,168,83,0.30)',
  parchment: '#faf9f5',
  charcoalInk: '#1d1d1b',
  lightStone: '#6b6760',
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24, xxl: 32 } as const;

export const radius = { sm: 8, md: 14, lg: 20, xl: 24, full: 100 } as const;

export const typography = {
  screenTitle: { fontFamily: 'Satoshi-Bold', fontSize: 22, lineHeight: 26.4, letterSpacing: -0.3 },
  sectionHeader: { fontFamily: 'Satoshi-SemiBold', fontSize: 13, lineHeight: 16.9, letterSpacing: 0.5, textTransform: 'uppercase' },
  cardTitle: { fontFamily: 'Satoshi-SemiBold', fontSize: 17, lineHeight: 21.25, letterSpacing: -0.1 },
  body: { fontFamily: 'Satoshi-Regular', fontSize: 15, lineHeight: 22.5 },
  caption: { fontFamily: 'Satoshi-Regular', fontSize: 13, lineHeight: 18.2 },
  micro: { fontFamily: 'Satoshi-Medium', fontSize: 11, lineHeight: 14.85, letterSpacing: 0.3 },
  button: { fontFamily: 'Satoshi-SemiBold', fontSize: 16, lineHeight: 16 },
  input: { fontFamily: 'Satoshi-Regular', fontSize: 16, lineHeight: 16 },
  mono: { fontFamily: 'JetBrainsMono-Regular', fontSize: 13, lineHeight: 18.2 },
} as const;
