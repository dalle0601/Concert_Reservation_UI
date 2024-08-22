'use client';
import { LoginForm } from '@/components/Login/LoginForm';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function HomePage() {
    const router = useRouter();

    const handleLogin = async (userId: string) => {
        // const result = await signIn('credentials', { userId, callbackUrl: '/concert' });
        router.push('/concert');
    };

    return (
        <div className="flex flex-col justify-start items-center bg-gray-100 min-h-screen w-full">
            <div className="flex justify-center items-center w-full flex-1">
                <LoginForm handleLogin={handleLogin} />
            </div>
        </div>
    );
}
