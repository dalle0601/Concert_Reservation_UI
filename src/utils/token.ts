// src/utils/token.ts
export const checkToken = async (userId: string): Promise<boolean> => {
    try {
        const response = await fetch(`http://localhost:8080/user/${userId}/token`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error('Failed to verify token', error);
        return false;
    }
};
