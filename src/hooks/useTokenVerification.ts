import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { checkToken } from '@/utils/token';

interface useTokenVerificationType {
    validURL: string;
    unValidURL?: string;
    noti?: boolean;
    notiSet?: React.Dispatch<React.SetStateAction<String>>;
}

export function useTokenVerification({ validURL, unValidURL, noti = false, notiSet }: useTokenVerificationType) {
    const { data: session } = useSession();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const verifyToken = async () => {
            try {
                if (session) {
                    const userId = session.user.id;
                    const tokenValid = await checkToken(userId);

                    if (tokenValid.token === null) {
                        if (unValidURL) router.push(unValidURL);
                    } else {
                        router.push(validURL);
                    }
                }
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

            if (session) {
                worker.postMessage({ userId: session.user.id, interval: 3000 });
            }

            return () => {
                worker.terminate();
            };
        } else {
            verifyToken();
        }
    }, [session, router]);

    return { loading, error };
}
