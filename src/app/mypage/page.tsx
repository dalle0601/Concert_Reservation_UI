'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import PointRechargeModal from '@/components/pointChargeModal';

interface User {
    userId: string;
    point: number;
}

const MyPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = session?.user?.id || '';
            try {
                const response = await fetch(`http://localhost:8080/point/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setUser({ userId: data.userId, point: data.point });
            } catch (error) {
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [session]);

    const handleRecharge = (newPoint: number) => {
        setUser((prevUser) => prevUser && { ...prevUser, point: newPoint });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">My Page</h1>
            {user && (
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <p className="text-lg mb-2">User ID: {user.userId}</p>
                    <p className="text-lg mb-4">Points: {user.point}</p>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4"
                        onClick={() => setShowModal(true)}
                    >
                        포인트 충전
                    </button>
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                        onClick={() => router.push('/concert/reservation')}
                    >
                        예약 현황 보기
                    </button>
                </div>
            )}
            {showModal && user && (
                <PointRechargeModal
                    userId={user.userId}
                    onClose={() => setShowModal(false)}
                    onRecharge={handleRecharge}
                />
            )}
        </div>
    );
};

export default MyPage;
