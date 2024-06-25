'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { checkToken } from '@/utils/token';

interface ConcertItem {
    concert: Concert;
    availableSeatCount: number;
}

interface Concert {
    imagePath: string | undefined;
    concertId: number;
    concertTitle: string;
    concertDate: string;
    createdAt: string;
    concertImage: string; // 추가: 콘서트 이미지 URL 필드
}

const ConcertList = () => {
    const [concerts, setConcerts] = useState<ConcertItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [tokenValid, setTokenValid] = useState<boolean>(false);
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        const fetchConcerts = async (userId: string) => {
            try {
                const response = await fetch('http://localhost:8080/concert/date', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        userId: userId,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setConcerts(data.result.concertList || []);
            } catch (error) {
                setError('Failed to fetch concerts');
            } finally {
                setLoading(false);
            }
        };

        const verifyToken = async () => {
            if (session) {
                const userId = session.user.id;
                const tokenValid = await checkToken(userId);

                if (tokenValid) {
                    setTokenValid(true);
                    fetchConcerts(userId);
                } else {
                    router.push('/waiting');
                }
            }
        };

        verifyToken();
    }, [session, router]);

    const handleSelectConcert = (concertId: number) => {
        router.push(`concert/${concertId}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!tokenValid) return <p>Waiting for token verification...</p>;

    return (
        <div className="p-4 w-full">
            <h1 className="text-2xl font-bold mb-4">콘서트 둘러보기</h1>

            {concerts.length === 0 ? (
                <p>No concerts available.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {concerts.map((concertItem) => (
                        <div
                            key={concertItem.concert.concertId}
                            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg cursor-pointer"
                            onClick={() => handleSelectConcert(concertItem.concert.concertId)}
                        >
                            <img
                                src={concertItem.concert.imagePath}
                                alt={concertItem.concert.concertTitle}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{concertItem.concert.concertTitle}</h2>
                                <p className="text-gray-600">
                                    날짜: {new Date(concertItem.concert.concertDate).toLocaleString()}
                                </p>
                                <p className="text-gray-600">예약가능 좌석: {concertItem.availableSeatCount}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ConcertList;
