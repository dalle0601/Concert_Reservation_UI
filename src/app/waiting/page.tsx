'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { checkToken } from '@/utils/token';

const WaitingPage = () => {
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

    return <p>Waiting for token verification...</p>;
};

export default WaitingPage;
