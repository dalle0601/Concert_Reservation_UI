interface ImageCardType {
    data: any;
    onClick: (id: number) => void;
}
export function ImageCard({ data, onClick }: ImageCardType) {
    return (
        <div
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg cursor-pointer"
            onClick={() => onClick(data.concert.concertId)}
        >
            <img src={data.concert.imagePath} alt={data.concert.concertTitle} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-semibold">{data.concert.concertTitle}</h2>
                <p className="text-gray-600">날짜: {new Date(data.concert.concertDate).toLocaleString()}</p>
                <p className="text-gray-600">예약가능 좌석: {data.availableSeatCount}</p>
            </div>
        </div>
    );
}
