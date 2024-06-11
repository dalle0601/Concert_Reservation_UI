'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface LoginFormProps {
    handleLogin: (userId: string) => void;
}

export default function LoginForm({ handleLogin }: LoginFormProps) {
    const [userId, setUserId] = useState('');
    const { data: session } = useSession();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/user/token', { userId });
            handleLogin(userId);
            // router.push('/concert');
        } catch (e: any) {
            console.log(e);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="userid" className="block text-gray-700 font-bold mb-2">
                            User ID
                        </label>
                        <input
                            type="number"
                            id="userid"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                    >
                        로그인
                    </button>
                </form>
            </div>
        </div>
    );
}
