'use client';
import { useRouter } from 'next/navigation';
import { ConditionalWrap } from '../common/ConditionalWrap';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { PointChargeModal } from './PointChargeModal';
import { useFetchData } from '@/hooks/useFetchData';

interface User {
    message: string;
    userId: string;
    point: number;
}

const MyPageInfo = () => {
    const [user, setUser] = useState<User | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const { data: session } = useSession();
    const router = useRouter();

    const { loading, error } = useFetchData(`http://localhost:8080/point/${session?.user.id}`, setUser);

    const handleRecharge = (newPoint: number) => {
        setUser((prevUser) => prevUser && { ...prevUser, point: newPoint });
    };

    return (
        <>
            <ConditionalWrap isLoading={loading} isError={error} data={[user]}>
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <p className="text-lg mb-2">User ID: {user?.userId}</p>
                    <p className="text-lg mb-4">Points: {(user?.point || 0).toLocaleString()}</p>
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
                {showModal && user && (
                    <PointChargeModal
                        userId={user.userId}
                        onClose={() => setShowModal(false)}
                        onRecharge={handleRecharge}
                    />
                )}
            </ConditionalWrap>
        </>
    );
};

export default MyPageInfo;
