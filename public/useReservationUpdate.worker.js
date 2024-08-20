self.onmessage = async (e) => {
    const { userId, interval, token } = e.data;

    const fetchReservations = async (userId) => {
        const response = await fetch(`http://localhost:8080/user/${userId}/reservations`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                access: token,
            },
        });
        const data = await response.json();
        return data;
    };

    const checkInterval = setInterval(async () => {
        try {
            const reservationData = await fetchReservations(userId);
            self.postMessage(reservationData);
        } catch (error) {
            console.error('Error fetching reservations:', error);
            // 필요에 따라 에러 메시지를 전송할 수 있습니다.
            self.postMessage({ error: error.message });
        }
    }, interval);
};
