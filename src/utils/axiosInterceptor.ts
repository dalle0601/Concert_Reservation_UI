import axios from 'axios';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // 기본 URL 설정
});

// 응답 인터셉터 추가
axiosInstance.interceptors.response.use(
    (response) => {
        // 성공적인 응답 처리
        if (response.config.url === '/login') {
            const jwtToken = response.data.token; // 응답에서 토큰 가져오기
            localStorage.setItem('jwtToken', jwtToken); // 로컬 스토리지에 저장
        }
        return response;
    },
    (error) => {
        // 오류 응답 처리
        return Promise.reject(error);
    }
);

export default axiosInstance;
