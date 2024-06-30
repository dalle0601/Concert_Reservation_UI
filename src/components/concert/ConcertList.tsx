'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConditionalWrap } from '../common/ConditionalWrap';
import { ConcertItemCard } from './ConcertItemCard';
import { useFetchData } from '../../hooks/useFetchData';
import { useTokenVerification } from '@/hooks/useTokenVerification';
import useStore from '../../app/store/useStore';

interface ConcertItem {
    concert: Concert;
    availableSeatCount: number;
}

interface Concert {
    concertId: number;
    concertTitle: string;
    concertDate: string;
    createdAt: string;
    concertImage: string;
}

export function ConcertList() {
    const [concerts, setConcerts] = useState<ConcertItem[]>([]);
    const router = useRouter();
    const { setSelectedConcert } = useStore();

    useTokenVerification({
        validURL: '/concert',
        unValidURL: '/wait',
    });

    const { loading, error } = useFetchData('http://localhost:8080/concert/date', setConcerts);

    const handleSelectConcert = (concert: Concert) => {
        setSelectedConcert(concert);
        router.push(`concert/${concert.concertId}`);
    };

    return (
        <div className="p-4 w-full h-full flex flex-col items-center justify-center m-auto">
            <ConditionalWrap isLoading={loading} isError={error} data={concerts}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.isArray(concerts) &&
                        concerts.map((concertItem) => (
                            <ConcertItemCard
                                key={concertItem.concert.concertId}
                                data={concertItem}
                                onClick={() => handleSelectConcert(concertItem.concert)}
                            />
                        ))}
                </div>
            </ConditionalWrap>
        </div>
    );
}
