import axios from 'axios';
import React, { useState } from 'react';

interface PointChargeModalProps {
    userId: string;
    onClose: () => void;
    onRecharge: (newPoint: number) => void;
}

export function PointChargeModal({ userId, onClose, onRecharge }: PointChargeModalProps) {
    const [point, setPoint] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleRecharge = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('jwtToken');

            const response = await axios.patch(
                'http://localhost:8080/point/charge',
                { userId: userId, point },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        access: token,
                    },
                }
            );
            if (response.data.code !== 'SUCCESS') {
                throw new Error('Failed to recharge points');
            }

            // const result = await response.json();
            if (response.data.result.message === '포인트 충전 성공') {
                onRecharge(response.data.result.pointHistory.point);
            } else {
                alert('포인트 충전에 실패했습니다.');
            }

            onClose();
        } catch (error) {
            setError('Failed to recharge points');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
                <h2 className="text-2xl font-bold mb-4">포인트 충전</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                    type="number"
                    className="w-full p-2 border rounded mb-4"
                    placeholder="충전할 포인트 입력"
                    value={point}
                    onChange={(e) => setPoint(e.target.value)}
                />
                <div className="flex justify-end">
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded mr-2 hover:bg-gray-700"
                        onClick={onClose}
                    >
                        취소
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        onClick={handleRecharge}
                        disabled={loading}
                    >
                        {loading ? '충전 중...' : '충전하기'}
                    </button>
                </div>
            </div>
        </div>
    );
}
