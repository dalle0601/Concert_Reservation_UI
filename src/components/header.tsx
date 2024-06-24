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

    const handleTitleClick = () => {
        router.push('/concert');
    };

    return (
        <header className="bg-indigo-500 text-white py-4 px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold cursor-pointer" onClick={handleTitleClick}>
                콘서트
            </h1>
            {session && (
                <div className="space-x-4">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleReservationClick}
                    >
                        예약하기
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleMyPageClick}
                    >
                        마이페이지
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
