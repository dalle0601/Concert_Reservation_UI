'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ConditionalWrap } from '../common/ConditionalWrap';
import { SeatStatus } from '../common/SeatStatus';
import { useFetchData } from '../../hooks/useFetchData';

interface Seat {
    seat_id: number;
    seat_number: string;
    cost: number;
    seat_status: string;
}

interface Concert {
    concertId: number;
    concertTitle: string;
    concertDate: string;
    createdAt: string;
}

interface ConcertSeatProps {
    concertId: string;
}

export function ConcertSeat({ concertId }: ConcertSeatProps) {
    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
    const router = useRouter();
    const { data: session } = useSession();
    const { loading, error } = useFetchData(`http://localhost:8080/concert/${concertId}/seat`, setSeats);

    const handleFindSeat = (seatName: string) => {
        return seats.find((s) => s.seat_number === seatName);
    };

    const handleSelectSeat = (seatName: string) => {
        const seat: any = handleFindSeat(seatName);
        setSelectedSeat(seat);
    };

    const handleReserveSeat = async () => {
        if (!selectedSeat) return;

        const userId = session?.user?.id || '';
        const reservationData = {
            concertId: concertId,
            seatId: selectedSeat.seat_id,
            userId: userId,
            cost: selectedSeat.cost,
        };

        try {
            const response = await fetch('http://localhost:8080/reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData),
            });

            if (!response.ok) {
                throw new Error('Failed to reserve seat');
            }

            const result = await response.json();
            router.push('/concert/reservation');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const setSeatName = (index: number) => {
        if (index < 25) {
            return `A${index + 1}`;
        } else {
            return `B${index - 24}`;
        }
    };

    const setIsAvaliable = (index: number) => {
        const seat = handleFindSeat(setSeatName(index));
        if (!seat || seat.seat_status !== 'available') return false;
        else return true;
    };

    return (
        <div className="flex-1 flex flex-col justify-start items-center p-4 h-full">
            <ConditionalWrap isLoading={loading} isError={error} data={[0]}>
                <div className="grid grid-cols-10 gap-4 w-full h-3/4">
                    {Array.from({ length: 50 }, (_, index) => (
                        <SeatStatus
                            key={index}
                            seatName={setSeatName(index)}
                            isAvailable={setIsAvaliable(index)}
                            isSelected={selectedSeat?.seat_number === setSeatName(index)}
                            onClick={handleSelectSeat}
                        />
                    ))}
                </div>
            </ConditionalWrap>
            <div className="pt-20">
                {selectedSeat ? (
                    <>
                        <p>선택된 좌석: {selectedSeat.seat_number}</p>
                        <p>가격: {selectedSeat.cost.toLocaleString()}</p>
                        <button
                            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                            onClick={handleReserveSeat}
                        >
                            선택좌석 예약하기
                        </button>
                    </>
                ) : (
                    <p>좌석을 선택하세요.</p>
                )}
            </div>
        </div>
    );
}
