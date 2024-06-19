'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const Header = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleMyPageClick = () => {
        router.push('/mypage');
    };

    const handleReservationClick = () => {
        router.push('/concert/reservation');
    };
    return (
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold">콘서트</h1>
            {session && (
                <div className="flex space-x-4">
                    <button
                        className="px-4 py-2 bg-green-500 rounded hover:bg-green-700"
                        onClick={handleReservationClick}
                    >
                        예약하기
                    </button>
                    <button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700" onClick={handleMyPageClick}>
                        마이페이지
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
