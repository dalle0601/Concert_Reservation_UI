'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
    handleLogin: (userId: string) => void;
}

export default function LoginForm({ handleLogin }: LoginFormProps) {
    const [userId, setUserId] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/user/token', { userId });
            handleLogin(userId);
        } catch (e: any) {
            console.error(e);
        }
    };

    return (
        <div className="flex justify-center items-center bg-gray-100">
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
                <button
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-indigo-700"
                >
                    로그인
                </button>
            </form>
        </div>
    );
}
