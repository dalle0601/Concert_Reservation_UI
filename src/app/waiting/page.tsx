'use client';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { checkToken } from '@/utils/token';

export default function WaitingPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (session) {
                const userId = session.user.id;
                const tokenValid = await checkToken(userId);

                if (tokenValid) {
                    clearInterval(interval);
                    router.push('/concert');
                }
                setLoading(false);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [session, router]);

    if (loading) return <p>Loading...</p>;

    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
    };

    return (
        <>
            <button onClick={handleLogout}>로그아웃</button>

            <p>Waiting for token verification...</p>
        </>
    );
}
