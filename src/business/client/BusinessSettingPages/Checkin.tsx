'use client';

import { memo } from 'react';
import CheckinEngine from '@/business/client/features/Fission/CheckinEngine';

const Checkin = memo(() => <CheckinEngine />);
Checkin.displayName = 'Checkin';
export default Checkin;
