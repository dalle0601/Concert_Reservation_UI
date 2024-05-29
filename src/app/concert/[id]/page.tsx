'use client';
import React from 'react';
import ConcertSeat from '@/components/concertSeat';
import { useParams } from 'next/navigation';

export default function ConcertSeatPage() {
    const { id } = useParams(); // Get the id from the query parameters

    // id 값이 아직 설정되지 않았을 경우를 처리
    if (!id) {
        return <div>Loading...</div>; // 또는 다른 로딩 인디케이터나 처리 로직
    }

    return (
        <>
            <ConcertSeat concertId={id.toString()} />
        </>
    );
}
