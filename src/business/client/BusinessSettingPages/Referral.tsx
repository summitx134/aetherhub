'use client';

import { memo } from 'react';
import ReferralEngine from '@/business/client/features/Fission/ReferralEngine';

const Referral = memo(() => <ReferralEngine />);

Referral.displayName = 'Referral';
export default Referral;
