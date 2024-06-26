'use client';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { checkToken } from '@/utils/token';
import { ConditionalWrap } from './ConditionalWrap';
import { ImageCard } from './ImageCard';
import useFetchData from './useFetchData';

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

const ConcertList = () => {
    const [concerts, setConcerts] = useState<ConcertItem[]>([]);
    const router = useRouter();
    const { loading, error, tokenValid } = useFetchData('http://localhost:8080/concert/date', setConcerts);

    const handleSelectConcert = (concertId: number) => {
        router.push(`concert/${concertId}`);
    };

    return (
        <div className="p-4 w-full h-full flex flex-col items-center justify-center m-auto ">
            <h1 className="text-2xl font-bold mb-4">콘서트 둘러보기</h1>{' '}
            <ConditionalWrap isLoading={loading} isError={error} data={concerts}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {concerts.map((concertItem) => (
                        <ImageCard
                            key={concertItem.concert.concertId}
                            data={concertItem}
                            onClick={handleSelectConcert}
                        />
                    ))}
                </div>
            </ConditionalWrap>
        </div>
    );
};

export default ConcertList;
