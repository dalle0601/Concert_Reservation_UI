import { ConcertList } from '@/components/concert/ConcertList';
import { SectionTitle } from '@/components/common/SectionTitle';

export default function ConcertPage() {
    return (
        <div className="flex flex-col justify-start items-center min-h-screen w-full">
            <SectionTitle title="콘서트 둘러보기" />
            <ConcertList />;
        </div>
    );
}
