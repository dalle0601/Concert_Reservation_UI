const { default: axios } = require('axios');

self.onmessage = async (e) => {
    const { userId, interval } = e.data;

    const fetchReservations = async (userId) => {
        const token = localStorage.getItem('jwtToken');
        const response = await axios(`http://localhost:8080/user/${userId}/reservations`, {
            headers: {
                Authorization: `Bearer ${token}`,
                access: token,
            },
        });
        const data = await response.json();
        return data;
    };

    const checkInterval = setInterval(async () => {
        const reservationData = await fetchReservations(userId);
        self.postMessage(reservationData);
    }, interval);
};
