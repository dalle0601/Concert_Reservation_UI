'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axiosInterceptor';
import useStore from '../store/useStore';

interface LoginFormProps {
    handleLogin: (userId: string) => void;
}

export function LoginForm({ handleLogin }: LoginFormProps) {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const setUserIdStore = useStore((state) => state.setUserId);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loginData = {
            userId: userId,
            password: password,
        };

        try {
            const response = await axiosInstance.post('/login', loginData);

            if (response && response.data) {
                // 로그인 성공 시 JWT 토큰을 로컬 스토리지에 저장
                const token = response.data.accessToken;
                const refreshToken = response.data.refreshToken; // 리프레시 토큰을 응답에서 가져옵니다.

                localStorage.setItem('jwtToken', token);

                // 리프레시 토큰을 쿠키에 저장
                document.cookie = `refresh=${refreshToken}; path=/;`; // HttpOnly 속성 추가

                if (token) {
                    try {
                        const resToken = await axios.post(
                            'http://localhost:8080/user/token',
                            { userId },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    access: token,
                                },
                            }
                        );
                        setUserIdStore(userId);
                        // result에 따라 다른 로직 수행
                        if (
                            resToken.data.message === '유효토큰이 발급되었습니다.' ||
                            resToken.data.message === '이미 유효토큰이 발급되었습니다.'
                        ) {
                            // 성공적인 응답
                            // const data = resToken.data; // 응답 데이터
                            // if (data.success) {
                            //     // 예를 들어, 응답 데이터에 success 필드가 있을 경우
                            //     // 성공 로직
                            handleLogin(userId);
                            // } else {
                            // 실패 로직 (예: 로그인 실패 등)

                            // }
                        } else {
                            // 상태 코드가 200이 아닐 경우의 처리
                            router.push('/wait');
                            alert('대기화면으로 이동합니다.: ' + resToken.data.message);
                        }
                    } catch (e: any) {
                        console.log('Error while fetching user token:', e);
                    }
                } else {
                    alert('로그인에 실패했습니다.');
                }
            }
        } catch (e: any) {
            console.error(e);
        }
    };

    function setChangeLoginForm() {
        router.push('/join');
    }

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
                    로그인
                </button>
                <button
                    type="button"
                    onClick={setChangeLoginForm}
                    className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-indigo-700"
                >
                    회원가입
                </button>
            </form>
        </div>
    );
}
