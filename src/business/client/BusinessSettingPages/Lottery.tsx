'use client';

import { memo } from 'react';
import LotteryEngine from '@/business/client/features/Fission/LotteryEngine';

const Lottery = memo(() => <LotteryEngine />);
Lottery.displayName = 'Lottery';
export default Lottery;
