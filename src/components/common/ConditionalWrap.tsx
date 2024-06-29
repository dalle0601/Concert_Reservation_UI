import { BeatLoader } from 'react-spinners';

interface ConditionalWrapType {
    isLoading: boolean;
    isError: string | null;
    data: any;
    children: React.ReactNode;
}
export function ConditionalWrap({ isLoading, isError, data, children }: ConditionalWrapType) {
    if (isLoading) return <BeatLoader size={20} color="#6366f1" />;
    if (!!isError) return <p>관리자에게 문의하세요...</p>;
    if (!data?.length) return <div>no data</div>;

    return <>{children} </>;
}
