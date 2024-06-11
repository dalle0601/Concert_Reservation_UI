// components/ClientSessionProvider.tsx
'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const SessionProvider = ({ children }: Props) => {
    return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};

export default SessionProvider;
