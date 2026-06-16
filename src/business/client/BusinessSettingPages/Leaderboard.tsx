'use client';

import { memo } from 'react';
import LeaderboardComponent from '@/business/client/features/Fission/Leaderboard';

const Leaderboard = memo(() => <LeaderboardComponent />);
Leaderboard.displayName = 'Leaderboard';
export default Leaderboard;
