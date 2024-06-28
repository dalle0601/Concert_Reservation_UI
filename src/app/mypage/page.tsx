import React from 'react';
import MyPageInfo from '@/components/mypage/MyPageInfo';
import { SectionTitle } from '@/components/common/SectionTitle';

export default function MyPage() {
    return (
        <div className="flex flex-col justify-start items-center min-h-screen w-full">
            <SectionTitle title="마이페이지" />
            <MyPageInfo />
        </div>
    );
}
