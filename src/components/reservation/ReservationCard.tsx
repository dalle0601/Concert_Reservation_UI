interface ReservationCardType {
    data: any;
    handlePayment: (id: number) => void;
}

export function ReservationCard({ data, handlePayment }: ReservationCardType) {
    return (
        <div className="p-6 border rounded-lg shadow-md w-full flex flex-col items-start">
            <div className="flex justify-center items-center">
                <div className="mr-10">
                    <img src={data.imagePath} alt={data.concertTitle} className="w-full h-48 object-cover" />
                </div>
                <div>
                    <p className="text-lg font-semibold mb-2">콘서트 ID: {data.concertTitle}</p>
                    <p className="mb-2">예약 번호: {data.reservationId}</p>
                    <p className="mb-2">선택 좌석: {data.seatName}</p>
                    <p className="mb-2">금액: {data.cost}</p>
                    <p className="mb-2">예약 상태: {data.status === 'temporary' ? '임시예약(1분)' : '예약확정'}</p>
                    {data.status !== 'reserved' && (
                        <button
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                            onClick={() => handlePayment(data.reservationId)}
                        >
                            결제하기
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
