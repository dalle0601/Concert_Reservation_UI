'use client';
import { LoginForm } from '@/components/LoginForm';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkToken } from '@/utils/token';

export default function HomePage() {
    const { data: session } = useSession();
    const router = useRouter();

    const handleLogin = async (userId: string) => {
        signIn('credentials', { userId, callbackUrl: '/concert' });
    };

    useEffect(() => {
        const verifyToken = async () => {
            if (session) {
                const userId = session.user.id;
                const tokenValid = await checkToken(userId);

                if (tokenValid.token !== null) {
                    router.push('/concert');
                } else {
                    router.push('/waiting');
                }
            }
        };

        verifyToken();
    }, [session, router]);

    return (
        <div className="flex flex-col justify-start items-center bg-gray-100 min-h-screen w-full">
            <div className="flex justify-center items-center w-full flex-1">
                <LoginForm handleLogin={handleLogin} />
            </div>
        </div>
    );
}
