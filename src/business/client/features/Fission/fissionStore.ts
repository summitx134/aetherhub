/**
 * AetherHub Fission — Unified localStorage Store
 *
 * 所有裂变模块共享此 store，实现数据联动：
 *   签到 → 钱包余额 → 抽奖消耗 → 排行榜刷新
 */
const KEYS = {
  wallet: 'aetherhub_wallet',
  checkin: 'aetherhub_checkin',
  tasks: 'aetherhub_tasks',
  referral: 'aetherhub_referral',
  lottery: 'aetherhub_lottery',
  firstVisit: 'aetherhub_first_visit',
};

// ---- Wallet ----
export interface WalletState {
  totalPoints: number;
  membershipDays: number;
  isNewUser: boolean;
}

const DEFAULT_WALLET: WalletState = { totalPoints: 500, membershipDays: 0, isNewUser: true };

export const getWallet = (): WalletState => {
  try { return JSON.parse(localStorage.getItem(KEYS.wallet) || 'null') || { ...DEFAULT_WALLET }; } catch { return { ...DEFAULT_WALLET }; }
};
export const saveWallet = (w: WalletState) => { localStorage.setItem(KEYS.wallet, JSON.stringify(w)); };
export const addPoints = (amount: number, reason: string) => {
  const w = getWallet();
  w.totalPoints += amount;
  if (w.isNewUser && amount > 0) w.isNewUser = false;
  saveWallet(w);
  return w;
};
export const spendPoints = (amount: number, reason: string): WalletState | null => {
  const w = getWallet();
  if (w.totalPoints < amount) return null;
  w.totalPoints -= amount;
  saveWallet(w);
  return w;
};

// ---- Checkin (reads wallet) ----
export interface CheckinState {
  streak: number;
  lastDate: string | null;
  today: boolean;
  history: string[];
}
const DEFAULT_CHECKIN: CheckinState = { streak: 0, lastDate: null, today: false, history: [] };
export const getCheckin = (): CheckinState => {
  try { return JSON.parse(localStorage.getItem(KEYS.checkin) || 'null') || { ...DEFAULT_CHECKIN }; } catch { return { ...DEFAULT_CHECKIN }; }
};
export const saveCheckin = (c: CheckinState) => { localStorage.setItem(KEYS.checkin, JSON.stringify(c)); };

// ---- Lottery (reads wallet) ----
export interface LotteryState { todayDraws: number; history: string[]; }
const DEFAULT_LOTTERY: LotteryState = { todayDraws: 0, history: [] };
export const getLottery = (): LotteryState => {
  try { return JSON.parse(localStorage.getItem(KEYS.lottery) || 'null') || { ...DEFAULT_LOTTERY }; } catch { return { ...DEFAULT_LOTTERY }; }
};
export const saveLottery = (l: LotteryState) => { localStorage.setItem(KEYS.lottery, JSON.stringify(l)); };
export const COST_PER_DRAW = 50;

// ---- Referral ----
export interface ReferralState { total: number; active: number; paid: number; }
const DEFAULT_REFERRAL: ReferralState = { total: 3, active: 2, paid: 1 };
export const getReferral = (): ReferralState => {
  try { return JSON.parse(localStorage.getItem(KEYS.referral) || 'null') || { ...DEFAULT_REFERRAL }; } catch { return { ...DEFAULT_REFERRAL }; }
};
export const saveReferral = (r: ReferralState) => { localStorage.setItem(KEYS.referral, JSON.stringify(r)); };

// ---- First Visit ----
export const isFirstVisit = (): boolean => {
  try { return !localStorage.getItem(KEYS.firstVisit); } catch { return false; }
};
export const markVisited = () => { localStorage.setItem(KEYS.firstVisit, '1'); };

// ---- Leaderboard (derived from referral + wallet) ----
export const getLeaderboardData = () => {
  const ref = getReferral();
  const wallet = getWallet();
  return {
    invite: [
      { rank: 1, name: 'DemoUser', count: ref.total, reward: ref.total >= 50 ? '¥300 + 年费' : ref.total >= 10 ? '¥50 + 月卡' : '会员 7 天' },
      { rank: 2, name: 'TestBot', count: Math.max(0, ref.total - 2), reward: '会员 3 天' },
    ],
    consume: [
      { rank: 1, name: 'DemoUser', amount: wallet.totalPoints, reward: wallet.membershipDays > 0 ? '月卡' : '3天会员' },
    ],
  };
};

// ---- Export all keys for debugging ----
export const FISSION_KEYS = KEYS;
