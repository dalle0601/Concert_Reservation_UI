import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction } from 'react';

export function useFetchData(url: string, setData: Dispatch<SetStateAction<any>>) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) return;

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
    }, [session]);

    return { loading, error };
}
