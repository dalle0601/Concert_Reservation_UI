import React from 'react';
import useStore from '../../app/store/useStore';

export function ConcertDetail() {
    const { selectedConcert } = useStore();

    return (
        <div className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg w-80 mx-auto">
            {' '}
            {/* 고정된 너비 설정 */}
            <div className="flex flex-col items-center">
                <div className="w-full aspect-w-16 aspect-h-9 overflow-hidden">
                    <img
                        src={selectedConcert?.imagePath}
                        alt={selectedConcert?.concertTitle}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full p-4">
                    <h2 className="text-xl font-semibold mb-2">{selectedConcert?.concertTitle}</h2>
                    <p className="text-gray-600">
                        날짜:{' '}
                        {selectedConcert?.concertDate
                            ? new Date(selectedConcert.concertDate).toLocaleString('ko-KR', {
                                  dateStyle: 'medium',
                                  timeStyle: 'short',
                              })
                            : ''}
                    </p>
                    {/* <p className="text-gray-600 mt-2">추가설명란</p> */}
                </div>
            </div>
        </div>
    );
}
