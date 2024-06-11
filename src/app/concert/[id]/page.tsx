'use client';
import React from 'react';
import ConcertSeat from '@/components/concertSeat';
import { useParams } from 'next/navigation';

export default function ConcertSeatPage() {
    const params = useParams();
    const id = params?.id;

    // id 값이 아직 설정되지 않았을 경우를 처리
    if (!id || (Array.isArray(id) && id.length === 0)) {
        return <div>Loading...</div>;
    }

    const concertId = Array.isArray(id) ? id[0] : id;

    return (
        <>
            <ConcertSeat concertId={concertId} />
        </>
    );
}
