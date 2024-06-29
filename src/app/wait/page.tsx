'use client';
import { useState } from 'react';
import { useTokenVerification } from '@/hooks/useTokenVerification';
import { ConditionalWrap } from '@/components/common/ConditionalWrap';
import { DotLoader } from 'react-spinners';
import { SectionTitle } from '@/components/common/SectionTitle';

export default function WaitingPage() {
    const [queuePosition, setQueuePosition] = useState<String>('0');

    const { loading, error } = useTokenVerification({
        validURL: '/concert',
        unValidURL: '/wait',
        noti: true,
        notiSet: setQueuePosition,
    });

    return (
        <>
            <SectionTitle title="대기 인원" />
            <div className="p-4 w-full h-full flex flex-col items-center justify-center m-auto">
                <ConditionalWrap isLoading={loading} isError={error} data={[queuePosition]}>
                    <p className="text-5xl">{queuePosition}</p>
                    <DotLoader size={100} color="#6366f1" className="mt-10" />
                </ConditionalWrap>
            </div>
        </>
    );
}
