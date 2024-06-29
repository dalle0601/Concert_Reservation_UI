import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { checkToken } from '@/utils/token';

interface useTokenVerificationType {
    validURL: string;
    unValidURL: string;
    noti?: boolean;
    notiSet?: React.Dispatch<React.SetStateAction<String>>;
}

export function useTokenVerification({ validURL, unValidURL, noti = false, notiSet }: useTokenVerificationType) {
    const { data: session } = useSession();
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const verifyToken = async () => {
            if (session) {
                const userId = session.user.id;
                console.log(`Verifying token for user ${userId}`);
                const tokenValid = await checkToken(userId);
                console.log('Token valid:', tokenValid);

                if (tokenValid.token === null) {
                    console.log('Token is invalid, redirecting to', unValidURL);
                    router.push(unValidURL);
                } else {
                    console.log('Token is valid, redirecting to', validURL);
                    router.push(validURL);
                }
            }
            setLoading(false);
        };

        if (noti && notiSet) {
            const interval = setInterval(async () => {
                if (session) {
                    const userId = session.user.id;
                    const tokenValid = await checkToken(userId);
                    notiSet(tokenValid.queuePosition);
                    if (tokenValid.token !== null) {
                        clearInterval(interval);
                        await verifyToken();
                    }
                    setLoading(false);
                }
            }, 3000);

            return () => clearInterval(interval);
        } else {
            verifyToken();
        }
    }, [session, router]);

    return { loading };
}
