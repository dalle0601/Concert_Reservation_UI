'use client';
import { ConcertList } from '@/components/concert/ConcertList';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { checkToken } from '@/utils/token';
import { SectionTitle } from '@/components/common/SectionTitle';

export default function ConcertPage() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const verifyToken = async () => {
            if (session) {
                const userId = session.user.id;
                const tokenValid = await checkToken(userId);

                if (tokenValid.token === null) {
                    router.push('/waiting');
                }
            }
        };

        verifyToken();
    }, [session, router]);

    return (
        <div className="flex flex-col justify-start items-center min-h-screen w-full">
            <SectionTitle title="콘서트 둘러보기" />
            <ConcertList />;
        </div>
    );
}
