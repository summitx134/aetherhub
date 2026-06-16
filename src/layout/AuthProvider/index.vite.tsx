import { isDesktop } from '@lobechat/const';
import { type PropsWithChildren } from 'react';

import BetterAuth from './BetterAuth';
import Desktop from './Desktop';
import NoAuth from './NoAuth';

const AuthProvider = ({ children }: PropsWithChildren) => {
  // Development mode: skip auth entirely when NO_AUTH=true
  if (!isDesktop && import.meta.env.VITE_NO_AUTH === 'true') {
    return <NoAuth>{children}</NoAuth>;
  }

  if (isDesktop) {
    return <Desktop>{children}</Desktop>;
  }

  return <BetterAuth>{children}</BetterAuth>;
};

export default AuthProvider;
