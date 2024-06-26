import { SectionTitle } from '@/components/common/SectionTitle';
import { ReservationList } from '@/components/reservation/ReservationList';
import React from 'react';

const Reservation = () => {
    return (
        <div className="flex flex-col justify-start items-center min-h-screen w-full">
            <SectionTitle title="예약 확인" />
            <ReservationList />
        </div>
    );
};

export default Reservation;
