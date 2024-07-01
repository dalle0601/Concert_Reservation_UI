import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    if (!token) {
        const url = new URL('/', req.url);
        return NextResponse.redirect(url);
    }

    // userId를 추출하여 백엔드 토큰 유효성 검사
    if (pathname.startsWith('/concert')) {
        const userId = token.id;
        const backendTokenResponse = await fetch(`http://localhost:8080/user/${userId}/token`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.id}`,
            },
        });

        const backendTokenData = await backendTokenResponse.json();

        if (!backendTokenData.token) {
            // 토큰이 유효하지 않으면 대기열 페이지로 리디렉션
            const url = new URL('/wait', req.url);
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/concert/:path*',
        '/wait/:path*',
        // 검사할 경로 추가
    ],
};
