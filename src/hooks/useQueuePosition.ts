// hooks/useQueuePosition.js
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { checkToken } from '@/utils/token';

export function useQueuePosition() {
    const { data: session } = useSession();
    const [queuePosition, setQueuePosition] = useState('0');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session) return;

        const interval = setInterval(async () => {
            const userId = session.user.id;
            const tokenValid = await checkToken(userId);
            setQueuePosition(tokenValid.queuePosition);

            if (tokenValid.token !== null) {
                clearInterval(interval);
                setLoading(false);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [session]);

    return { queuePosition, loading };
}
