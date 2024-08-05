'use client';
import { LoginForm } from '@/components/Login/LoginForm';
import { signIn } from 'next-auth/react';
import { useTokenVerification } from '@/hooks/useTokenVerification';

export default function HomePage() {
    const handleLogin = async (userId: string) => {
        signIn('credentials', { userId, callbackUrl: '/concert' });
    };

    // useTokenVerification({
    //     validURL: '/concert',
    // });

    return (
        <div className="flex flex-col justify-start items-center bg-gray-100 min-h-screen w-full">
            <div className="flex justify-center items-center w-full flex-1">
                <LoginForm handleLogin={handleLogin} />
            </div>
        </div>
    );
}
