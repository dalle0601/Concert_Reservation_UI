self.onmessage = async (e) => {
    const { userId, interval } = e.data;

    const checkToken = async (userId) => {
        const response = await fetch(`http://localhost:8080/user/${userId}/token`);
        const data = await response.json();
        return data;
    };

    const checkInterval = setInterval(async () => {
        const tokenValid = await checkToken(userId);
        self.postMessage(tokenValid);

        if (tokenValid.token !== null) {
            clearInterval(checkInterval);
        }
    }, interval);
};
