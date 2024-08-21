'use client';
import { useEffect, useState } from 'react';
import { ConditionalWrap } from '../common/ConditionalWrap';
import { useFetchData } from '../../hooks/useFetchData';
import { useSession } from 'next-auth/react';
import { ReservationCard } from './ReservationCard';
import useStore from '../store/useStore';
import axios from 'axios';

interface Reservation {
    reservationId: number;
    concertId: number;
    seatId: number;
    userId: number;
    cost: number;
    status: string;
}

export function ReservationList() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const userId = useStore((state) => state.userId);

    // const { data: session } = useSession();

    const { loading, error } = useFetchData(`http://localhost:8080/user/${userId}/reservations`, setReservations);

    useEffect(() => {
        const worker = new Worker('/useReservationUpdate.worker.js');

        worker.onmessage = (e) => {
            const reservationData = e.data;
            setReservations(reservationData.result.list);
        };

        if (userId) {
            worker.postMessage({ userId: userId, interval: 3000, token: localStorage.getItem('jwtToken') });
        }

        return () => {
            worker.terminate();
        };
    }, [userId]);

    const handlePayment = async (reservationId: number) => {
        // const userId = session?.user?.id || '';

        const reservationData = {
            reservationId: reservationId,
            userId: userId,
        };

        try {
            const token = localStorage.getItem('jwtToken');

            const response = await axios.post(
                `http://localhost:8080/point/payment`,
                { reservationData },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        access: token,
                    },
                }
            );

            if (response.data.code !== 'SUCCESS') {
                throw new Error('Failed to process payment');
            }

            // const result = await response.json();
            if (response.data.message === '포인트가 부족합니다.') {
                alert('포인트가 부족합니다.');
            } else {
                // 결제 성공 후 예약 상태를 업데이트
                setReservations((prevReservations) =>
                    prevReservations.map((reservation) =>
                        reservation.reservationId === reservationId
                            ? { ...reservation, status: 'reserved' }
                            : reservation
                    )
                );
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col items-center w-full p-4">
            <ConditionalWrap isLoading={loading} isError={error} data={reservations}>
                <div className="grid grid-cols-1 gap-4 w-full">
                    {reservations.map((reservation) => (
                        <ReservationCard
                            key={reservation.reservationId}
                            data={reservation}
                            handlePayment={handlePayment}
                        />
                    ))}
                </div>
            </ConditionalWrap>
        </div>
    );
}
