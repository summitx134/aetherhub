'use client';

import { memo } from 'react';
import CreditsEngine from '@/business/client/features/Fission/CreditsEngine';

const Credits = memo(() => <CreditsEngine />);

Credits.displayName = 'Credits';
export default Credits;
