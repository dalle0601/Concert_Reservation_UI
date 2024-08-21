import { useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import axios, { AxiosError } from 'axios';
import useStore from '@/components/store/useStore';

export function useFetchData(url: string, setData: Dispatch<SetStateAction<any>>) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const userId = useStore((state) => state.userId);

    useEffect(() => {
        const fetchConcerts = async (retry = false) => {
            try {
                const token = localStorage.getItem('jwtToken');

                const response = await axios.get(url, {
                    headers: {
                        userId: userId?.toString(),
                        Authorization: `Bearer ${token}`,
                        access: token,
                    },
                });

                if (response.data.code !== 'SUCCESS') {
                    throw new Error('Network response was not ok');
                }

                if (response.data.result) {
                    if (Array.isArray(response.data.result.list)) {
                        setData(response.data.result.list);
                    } else {
                        setData(response.data.result);
                    }
                }
            } catch (error) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.status === 403 && !retry) {
                    // 엑세스 토큰이 만료된 경우 리프레시 토큰 요청
                    try {
                        const refreshResponse = await axios.post(
                            'http://localhost:8080/reissue',
                            {},
                            {
                                withCredentials: true, // 쿠키를 포함하여 요청
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            }
                        );

                        // 새 엑세스 토큰을 응답 헤더에서 가져오기
                        const newToken = refreshResponse.headers.access; // 수정된 부분
                        localStorage.setItem('jwtToken', newToken);

                        // 새로운 엑세스 토큰으로 다시 시도
                        await fetchConcerts(true);
                    } catch (refreshError) {
                        setError('Failed to refresh token or fetch concerts');
                    }
                } else {
                    setError('Failed to fetch concerts');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchConcerts();
    }, []);

    return { loading, error };
}
