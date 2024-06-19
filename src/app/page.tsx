'use client';
import LoginForm from '@/components/loginForm';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const { data: session } = useSession();
    const [userId, setUserId] = useState('');
    const router = useRouter();

    const handleLogin = async (userId: string) => {
        signIn('credentials', { userId, callbackUrl: '/concert' });
    };

    useEffect(() => {
        if (session) {
            router.push('/concert');
        }
    }, [session, router]);

    return <LoginForm handleLogin={handleLogin} />;
}
