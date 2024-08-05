import { JoinForm } from '@/components/Login/JoinForm';
import React from 'react';

const Reservation = () => {
    return (
        <div className="flex flex-col justify-start items-center bg-gray-100 min-h-screen w-full">
            <div className="flex justify-center items-center w-full flex-1">
                <JoinForm />
            </div>
        </div>
    );
};

export default Reservation;
