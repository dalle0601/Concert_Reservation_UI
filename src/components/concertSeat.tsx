'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

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

const ConcertSeat = ({ concertId }: ConcertSeatProps) => {
    const [seats, setSeats] = useState<Seat[]>([]);
    const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        const fetchSeats = async () => {
            const userId = session?.user?.id || '';

            try {
                console.log(concertId);
                const response = await fetch(`http://localhost:8080/concert/${concertId}/seat`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        userId: userId,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setSeats(data.result.seatList || []);
            } catch (error) {
                setError('Failed to fetch seats');
            } finally {
                setLoading(false);
            }
        };
        fetchSeats();
    }, [concertId]);

    const handleSelectSeat = (seat: Seat) => {
        setSelectedSeat(seat);
    };

    const handleReserveSeat = async () => {
        if (!selectedSeat) return;

        const userId = session?.user?.id || '';
        const reservationData = {
            concertId: parseInt(concertId, 10),
            seatId: selectedSeat.seat_id,
            userId: parseInt(userId, 10),
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Concert Seat</h1>
            <button
                className="mt-4 mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={() => router.back()}
            >
                Back to Concert List
            </button>
            <div className="grid grid-cols-10 gap-4">
                {Array.from({ length: 50 }, (_, i) => {
                    let seatNumber = (i + 1).toString();
                    if (i < 25) {
                        seatNumber = 'A' + (i + 1);
                    } else {
                        seatNumber = 'B' + (i - 24);
                    }
                    const seat = seats.find((s) => s.seat_number === seatNumber);
                    let isAvailable = false;
                    if (seat && seat.seat_status === 'available') {
                        isAvailable = true;
                    }

                    return (
                        <button
                            key={i}
                            className={`p-2 border rounded ${isAvailable ? 'bg-green-500' : 'bg-red-500'} ${
                                seat ? (selectedSeat?.seat_id === seat.seat_id ? 'bg-yellow-500' : '') : 'bg-gray-300'
                            }`}
                            onClick={() => isAvailable && seat && handleSelectSeat(seat)}
                            disabled={!isAvailable}
                        >
                            {seat ? seat.seat_number : seatNumber}
                        </button>
                    );
                })}
            </div>
            {selectedSeat && (
                <div className="mt-4">
                    <p>Selected Seat: {selectedSeat.seat_number}</p>
                    <p>Cost: {selectedSeat.cost}</p>
                    <button
                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                        onClick={handleReserveSeat}
                    >
                        선택좌석 예약하기
                    </button>
                </div>
            )}
        </div>
    );
};

export default ConcertSeat;
