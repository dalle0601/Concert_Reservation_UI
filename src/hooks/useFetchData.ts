import { checkToken } from '@/utils/token';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useFetchData(url: string, setData: Dispatch<SetStateAction<any>>, shouldCheckToken: boolean = true) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [tokenValid, setTokenValid] = useState<boolean>(false);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) return;
        const verifyToken = async () => {
            if (session.user) {
                const userId = session.user.id;
                const tokenValid = await checkToken(userId);
                if (tokenValid.token !== 'null') setTokenValid(true);
                else router.push('/waiting');
            }
        };
        if (shouldCheckToken) verifyToken();
        else setTokenValid(true);
    }, [session, shouldCheckToken]);

    useEffect(() => {
        if (!tokenValid) return;
        const fetchConcerts = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        userId: session?.user.id,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                // setData(data.result.list || []);

                if (data.result) {
                    if (Array.isArray(data.result.list)) {
                        setData(data.result.list);
                    } else {
                        setData(data.result);
                    }
                }
            } catch (error) {
                setError('Failed to fetch concerts');
            } finally {
                setLoading(false);
            }
        };
        fetchConcerts();
    }, [tokenValid]);

    return { loading, error, tokenValid };
}
