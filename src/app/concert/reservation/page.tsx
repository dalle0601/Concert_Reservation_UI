'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

interface Reservation {
    reservationId: number;
    concertId: number;
    seatId: number;
    userId: number;
    cost: number;
    status: string;
}

const Reservation = () => {
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
            debugger;
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Reservations</h1>
            <div className="grid grid-cols-1 gap-4">
                {reservations.map((reservation) => (
                    <div key={reservation.reservationId} className="p-4 border rounded">
                        <p>Reservation ID: {reservation.reservationId}</p>
                        <p>Concert ID: {reservation.concertId}</p>
                        <p>Seat ID: {reservation.seatId}</p>
                        <p>Cost: {reservation.cost}</p>
                        <p>Status: {reservation.status}</p>
                        {reservation.status !== 'reserved' && (
                            <button
                                className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                                onClick={() => handlePayment(reservation.reservationId)}
                            >
                                Pay
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reservation;
