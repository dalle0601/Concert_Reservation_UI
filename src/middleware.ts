import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    // const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // const { pathname } = req.nextUrl;
    // if (!session && pathname !== '/') {
    //     const url = new URL('/', req.url);
    //     return NextResponse.redirect(url);
    // }
    // if (session) {
    //     if (pathname === '/') {
    //         const url = new URL('/concert', req.url);
    //         return NextResponse.redirect(url);
    //     }
    //     if (pathname.startsWith('/concert')) {
    //         const userId = session.id;
    //         const backendTokenResponse = await fetch(`http://localhost:8080/user/${userId}/token`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${session.id}`,
    //             },
    //         });
    //         const backendTokenData = await backendTokenResponse.json();
    //         if (!backendTokenData.token) {
    //             // 토큰이 유효하지 않으면 대기열 페이지로 리디렉션
    //             const url = new URL('/wait', req.url);
    //             return NextResponse.redirect(url);
    //         }
    //     }
    //     return NextResponse.next();
    // }
}

export const config = {
    matcher: [
        // '/',
        // '/mypage/:path*',
        // '/concert/:path*',
        // '/wait/:path*',
        // 검사할 경로 추가
    ],
};
