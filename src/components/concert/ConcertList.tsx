'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConditionalWrap } from '../common/ConditionalWrap';
import { ConcertItemCard } from './ConcertItemCard';
import { useFetchData } from '../../hooks/useFetchData';
import { SectionTitle } from '../common/SectionTitle';

interface ConcertItem {
    concert: Concert;
    availableSeatCount: number;
}
interface Concert {
    imagePath?: string;
    concertId: number;
    concertTitle: string;
    concertDate: string;
    createdAt: string;
    concertImage: string; // 추가: 콘서트 이미지 URL 필드
}

export function ConcertList() {
    const [concerts, setConcerts] = useState<ConcertItem[]>([]);
    const router = useRouter();
    const { loading, error, tokenValid } = useFetchData('http://localhost:8080/concert/date', setConcerts);

    const handleSelectConcert = (concertId: number) => {
        router.push(`concert/${concertId}`);
    };

    return (
        <div className="p-4 w-full h-full flex flex-col items-center justify-center m-auto ">
            <ConditionalWrap isLoading={loading} isError={error} data={concerts}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {concerts.map((concertItem) => (
                        <ConcertItemCard
                            key={concertItem.concert.concertId}
                            data={concertItem}
                            onClick={handleSelectConcert}
                        />
                    ))}
                </div>
            </ConditionalWrap>
        </div>
    );
}
