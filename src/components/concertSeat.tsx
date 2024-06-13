'use client';
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

interface ConcertItem {
    concert: Concert;
    availableSeatCount: number;
}

interface ConcertSeatProps {
    concertId: string;
}

const ConcertSeat: React.FC<ConcertSeatProps> = ({ concertId }) => {
    const [seats, setSeats] = useState<Seat[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchSeats = async () => {
            let userId = localStorage.getItem('userId');
            if (userId === null) {
                userId = '';
            }
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
                console.log(data);
                setSeats(data.result.seatList || []);
            } catch (error) {
                setError('Failed to fetch seats');
            } finally {
                setLoading(false);
            }
        };
        fetchSeats();
    }, [concertId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleSelectSeat = async (seat: Seat) => {
        const userId = localStorage.getItem('userId') || '';
        const reservationData = {
            concertId: concertId,
            seatId: seat.seat_id,
            userId: userId,
            cost: seat.cost,
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
            console.log('Reservation successful', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Concert Seat</h1>
            {/* <h2 className="text-xl font-semibold">{concertItem.concert.concertTitle}</h2> */}
            {/* <p>Date: {new Date(concertItem.concert.concertDate).toLocaleString()}</p> */}
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
                                seat ? '' : 'bg-gray-300'
                            }`}
                            onClick={() => isAvailable && seat && handleSelectSeat(seat)}
                            disabled={!isAvailable}
                        >
                            {seat ? seat.seat_number : seatNumber}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ConcertSeat;
