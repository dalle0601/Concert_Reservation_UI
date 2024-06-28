// hooks/useTokenVerification.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { checkToken } from '@/utils/token';

export function useTokenVerification(redirectPaths = { valid: '/concert', invalid: '/waiting' }) {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const verifyToken = async () => {
            if (session) {
                const userId = session.user.id;
                const tokenValid = await checkToken(userId);

                if (tokenValid.token !== null) {
                    router.push(redirectPaths.valid);
                } else {
                    router.push(redirectPaths.invalid);
                }
            }
        };

        verifyToken();
    }, [session, router, redirectPaths]);
}
