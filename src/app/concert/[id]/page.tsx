'use client';
import React from 'react';
import { ConcertSeat } from '@/components/concert/ConcertSeat';
import { useParams } from 'next/navigation';
import { SectionTitle } from '@/components/common/SectionTitle';
import { ConcertDetail } from '@/components/concert/ConcertDetail';

export default function ConcertSeatPage() {
    const params = useParams();
    const id = params?.id;

    if (!id || (Array.isArray(id) && id.length === 0)) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    const concertId = Array.isArray(id) ? id[0] : id;

    return (
        <div className="flex flex-col justify-start items-center min-h-screen w-full">
            <div>
                <SectionTitle title="좌석 확인" />
            </div>
            <div className="flex">
                <ConcertDetail />
                <ConcertSeat concertId={concertId} />
            </div>
        </div>
    );
}
