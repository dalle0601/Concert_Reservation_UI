export const checkToken = async (
    userId: string | null,
    jwtToken: string
): Promise<{ message: string; token: string; expiredTime: string; queuePosition: string }> => {
    try {
        const response = await fetch(`http://localhost:8080/user/${userId}/token`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                access: jwtToken,
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('토큰 확인에 실패했습니다.', error);
        return { message: '토큰 확인 실패', token: 'null', expiredTime: 'null', queuePosition: 'null' };
    }
};
