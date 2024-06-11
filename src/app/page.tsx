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

    // return <>{!session ? <>hello</> : <LoginForm />}</>;
    // if (!session) {
    return <LoginForm handleLogin={handleLogin} />;
    // }

    // return (
    //     <div>
    //         <h1>콘서트 예매 서비스</h1>
    //         <h2>콘서트 리스트</h2>
    //         <ul>
    //             <li>콘서트 A</li>
    //             <li>콘서트 B</li>
    //             <li>콘서트 C</li>
    //         </ul>
    //         <button onClick={() => signOut()}>로그아웃</button>
    //     </div>
    // );
}
