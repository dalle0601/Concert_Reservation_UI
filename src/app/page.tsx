'use client';
import LoginForm from '@/components/loginForm';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkToken } from '@/utils/token';

export default function HomePage() {
    const { data: session } = useSession();
    const [userId, setUserId] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (userId: string) => {
        signIn('credentials', { userId, callbackUrl: '/concert' });
    };

    useEffect(() => {
        const verifyToken = async () => {
            if (session) {
                const userId = session.user.id;
                const tokenValid = await checkToken(userId);

                if (tokenValid) {
                    router.push('/concert');
                } else {
                    router.push('/waiting');
                }
            }
        };

        verifyToken();
    }, [session, router]);

    return <LoginForm handleLogin={handleLogin} />;
}
