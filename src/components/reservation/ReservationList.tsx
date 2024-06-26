'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConditionalWrap } from '../common/ConditionalWrap';
import useFetchData from '../useFetchData';
import { SectionTitle } from '../common/SectionTitle';
import { useSession } from 'next-auth/react';
import { ReservationCard } from './ReservationCard';

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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchReservations = async () => {
            const userId = session?.user?.id || '';
            try {
                const response = await fetch(`http://localhost:8080/user/${userId}/reservations`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if (Array.isArray(data.result.reservation)) {
                    setReservations(data.result.reservation);
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (error) {
                setError('Failed to fetch reservations');
            } finally {
                setLoading(false);
            }
        };
        fetchReservations();
    }, []);

    const handlePayment = async (reservationId: number) => {
        const userId = session?.user?.id || '';

        const reservationData = {
            reservationId: reservationId,
            userId: parseInt(userId, 10),
        };

        try {
            const response = await fetch(`http://localhost:8080/point/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData),
            });

            if (!response.ok) {
                throw new Error('Failed to process payment');
            }

            const result = await response.json();
            console.log('Payment successful', result);
            if (result.message === '포인트가 부족합니다.') {
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
