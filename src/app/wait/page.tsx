'use client';
import { useState } from 'react';
import { useTokenVerification } from '@/hooks/useTokenVerification';

export default function WaitingPage() {
    const [queuePosition, setQueuePosition] = useState<String>('0');

    const { loading } = useTokenVerification({
        validURL: '/concert',
        unValidURL: '/wait',
        noti: true,
        notiSet: setQueuePosition,
    });

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <p>대기 인원 : {queuePosition}</p>
        </>
    );
}
