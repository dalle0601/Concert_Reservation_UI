'use client';
import ConcertList from '@/components/ConcertList';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { checkToken } from '@/utils/token';

export default function ConcertPage() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const verifyToken = async () => {
            if (session) {
                const userId = session.user.id;
                const tokenValid = await checkToken(userId);

                if (!tokenValid) {
                    router.push('/waiting');
                }
            }
        };

        verifyToken();
    }, [session, router]);

    return <ConcertList />;
}
