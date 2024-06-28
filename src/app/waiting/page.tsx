'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { checkToken } from '@/utils/token';

export default function WaitingPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [queuePosition, setQueuePosition] = useState<String>('0');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (session) {
                const userId = session.user.id;
                const tokenValid = await checkToken(userId);
                console.log(tokenValid);
                setQueuePosition(tokenValid.queuePosition);
                if (tokenValid.token !== null) {
                    clearInterval(interval);
                    router.push('/concert');
                }
                setLoading(false);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [session, router]);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <p>대기 인원 : {queuePosition}</p>
        </>
    );
}
