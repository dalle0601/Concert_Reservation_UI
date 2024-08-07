self.onmessage = async (e) => {
    const { userId, interval } = e.data;

    const fetchReservations = async (userId) => {
        const response = await fetch(`http://localhost:8080/user/${userId}/reservations`);
        const data = await response.json();
        return data;
    };

    const checkInterval = setInterval(async () => {
        const reservationData = await fetchReservations(userId);
        self.postMessage(reservationData);
    }, interval);
};
