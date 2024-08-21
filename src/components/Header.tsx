'use client';
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import axios from 'axios';

export function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const isRootPath = pathname === '/' || pathname === '/join';

    const handleMyPageClick = () => {
        router.push('/mypage');
    };

    const handleReservationClick = () => {
        router.push('/concert/reservation');
    };

    const handleTitleClick = () => {
        router.push('/concert');
    };

    const handleLogout = async () => {
        // signOut({ callbackUrl: '/' });
        try {
            const response = await axios.post('http://localhost:8080/logout', {}, { withCredentials: true });
            if (response.status === 200) {
                // 로그아웃 성공 처리
                console.log('로그아웃 성공');
                router.push('/');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('로그아웃 실패:', error.response?.data);
            } else {
                console.error('로그아웃 실패:', error);
            }
        }
    };

    return (
        <header className="bg-indigo-500 text-white py-4 px-6 fixed top-0 left-0 right-0 shadow-md h-[70px]">
            <div className="container mx-auto flex justify-between items-center h-full">
                <h1 className="text-2xl font-bold cursor-pointer" onClick={handleTitleClick}>
                    콘서트
                </h1>
                {!isRootPath && (
                    <div className="space-x-4 flex items-center">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
                            onClick={handleReservationClick}
                        >
                            예약확인
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                            onClick={handleMyPageClick}
                        >
                            마이페이지
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                        >
                            로그아웃
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
