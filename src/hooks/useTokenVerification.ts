import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { checkToken } from '@/utils/token';
import useStore from '@/components/store/useStore';

interface useTokenVerificationType {
    validURL: string;
    unValidURL?: string;
    noti?: boolean;
    notiSet?: React.Dispatch<React.SetStateAction<string>>;
}

export function useTokenVerification({ validURL, unValidURL, noti = false, notiSet }: useTokenVerificationType) {
    // const { data: session } = useSession();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const userId = useStore((state) => state.userId);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                // if (session) {
                //     const userId = session.user.id;
                const jwtToken = localStorage.getItem('jwtToken') || 'null';
                const tokenValid = await checkToken(userId, jwtToken);

                if (tokenValid.token === null) {
                    if (unValidURL) router.push(unValidURL);
                } else {
                    router.push(validURL);
                }
                // }
            } catch (error) {
                setError('토큰 검증에 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        if (noti && notiSet) {
            const worker = new Worker('/useTokenVerification.worker.js');

            worker.onmessage = async (e) => {
                const tokenValid = e.data;
                notiSet(tokenValid.queuePosition);

                if (tokenValid.token !== null) {
                    worker.terminate();
                    await verifyToken();
                }

                setLoading(false);
            };

            // if (session) {
            worker.postMessage({ userId: userId, interval: 3000, token: localStorage.getItem('jwtToken') });
            // }

            return () => {
                worker.terminate();
            };
        } else {
            verifyToken();
        }
    }, [userId, router]);

    return { loading, error };
}
