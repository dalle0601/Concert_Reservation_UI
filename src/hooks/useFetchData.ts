import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import useStore from '@/components/store/useStore';

export function useFetchData(url: string, setData: Dispatch<SetStateAction<any>>) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const userId = useStore((state) => state.userId);

    // const { data: session } = useSession();
    useEffect(() => {
        // if (!session) return;

        const fetchConcerts = async () => {
            try {
                const token = localStorage.getItem('jwtToken');

                const response = await axios.get(url, {
                    headers: {
                        // 'Content-Type': 'application/json',
                        userId: userId?.toString(),
                        Authorization: `Bearer ${token}`,
                        access: token,
                    },
                });

                if (response.data.code !== 'SUCCESS') {
                    throw new Error('Network response was not ok');
                }

                // const data = await response.json();

                if (response.data.result) {
                    if (Array.isArray(response.data.result.list)) {
                        setData(response.data.result.list);
                    } else {
                        setData(response.data.result);
                    }
                }
            } catch (error) {
                setError('Failed to fetch concerts');
            } finally {
                setLoading(false);
            }
        };

        fetchConcerts();
        // }, [session]);
    }, []);

    return { loading, error };
}
