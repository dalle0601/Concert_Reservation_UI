'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

interface ConcertItem {
    concert: Concert;
    availableSeatCount: number;
}

interface Concert {
    concertId: number;
    concertTitle: string;
    concertDate: string;
    createdAt: string;
}

const ConcertList = () => {
    const [concerts, setConcerts] = useState<ConcertItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        const fetchConcerts = async () => {
            const userId = session?.user?.id || '';

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
                console.log(data);
                setConcerts(data.result.concertList || []);
            } catch (error) {
                setError('Failed to fetch concerts');
            } finally {
                setLoading(false);
            }
        };

        if (session) {
            fetchConcerts();
        }
    }, [session]);

    const handleSelectConcert = (concertId: number) => {
        router.push(`concert/${concertId}`);
    };

    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Available Concerts</h1>
            <button onClick={handleLogout}>로그아웃</button>

            {concerts.length === 0 ? (
                <p>No concerts available.</p>
            ) : (
                <ul className="space-y-4">
                    {concerts.map((concertItem) => (
                        <li key={concertItem.concert.concertId} className="p-4 border rounded shadow">
                            <h2 className="text-xl font-semibold">{concertItem.concert.concertTitle}</h2>
                            <p>Date: {new Date(concertItem.concert.concertDate).toLocaleString()}</p>
                            <p>Available Seats: {concertItem.availableSeatCount}</p>
                            <p>Created At: {new Date(concertItem.concert.createdAt).toLocaleString()}</p>
                            <button onClick={() => handleSelectConcert(concertItem.concert.concertId)}>선택</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ConcertList;
