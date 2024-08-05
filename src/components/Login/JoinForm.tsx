'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function JoinForm() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const joinData = {
                userId: userId,
                password: password,
            };

            const response = await fetch(`http://localhost:8080/user/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(joinData),
            });
            // handleLogin(userId);
            const result = await response.json();
            console.log(result);
            if (result.result === '이미 존재하는 계정임') {
                alert('이미 존재하는 ID 입니다.');
            } else {
                router.push('/');
            }
        } catch (e: any) {
            console.error(e);
        }
    };

    return (
        <div className="pb-32 flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    placeholder="USER ID"
                    type="text"
                    id="userid"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    required
                />
                <input
                    placeholder="PASSWORD"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-indigo-700"
                >
                    가입하기
                </button>
                <button
                    type="button"
                    onClick={() => router.push('/')}
                    className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-indigo-700"
                >
                    뒤로
                </button>
            </form>
        </div>
    );
}
