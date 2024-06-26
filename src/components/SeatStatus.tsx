import { useState } from 'react';

interface SeatStatusType {
    seatName: string;
    isAvailable: boolean;
    isSelected: boolean;
    onClick: (item: string) => void;
}

export function SeatStatus({ seatName, isAvailable, isSelected, onClick }: SeatStatusType) {
    const handleClickSeat = () => {
        if (!isAvailable) return;
        onClick(seatName);
    };

    const setSeatStyle = () => {
        if (isSelected) return 'bg-yellow-500';
        if (isAvailable) return 'bg-green-500';
        if (!isAvailable) return 'bg-red-500';
        return 'bg-gray-300';
    };

    return (
        <button className={`p-2 border rounded ${setSeatStyle()} `} onClick={handleClickSeat} disabled={!isAvailable}>
            {seatName}
        </button>
    );
}
