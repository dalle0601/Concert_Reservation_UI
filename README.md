# 🎬 Concert Reservation UI

콘서트 예약 서비스로, 사용자가 콘서트를 예약할 수 있는 기능을 제공하는 웹 애플리케이션입니다.
이 시스템은 두 가지 주요 부분으로 구성됩니다

-   [Concert_Reservation_UI, 프론트엔드](https://github.com/dalle0601/Concert_Reservation_UI)
-   [Concert_Reservation_API. 백엔드](https://github.com/dalle0601/Concert_Reservation_API)

Concert Reservation UI 프로젝트는 프론트엔드 부분으로, 백엔드와 상호작용하여 예약 시스템을 제공합니다.

콘서트 이미지 출처 ([인터파크](https://tickets.interpark.com/))

---

## 기술적 아키텍처

### 프론트엔드

-   ![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=fff&style=for-the-badge)<br/>
    React 기반의 프레임워크로 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 지원하여 성능 향상과 SEO 최적화를 제공합니다.
-   ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)<br/>
    정적 타입 체크를 통해 코드의 안정성과 유지보수성을 높입니다.
-   ![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)<br/>
    유틸리티-퍼스트 CSS 프레임워크로 빠르고 효율적인 스타일링을 지원합니다.
-   ![Zustand](https://img.shields.io/badge/Zustand-000?style=for-the-badge&logo=zustand&logoColor=white)<br/>
    간단하고 가벼운 상태 관리 라이브러리로, React의 상태를 효율적으로 관리합니다.
-   ![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000?style=for-the-badge&logo=nextauth.js&logoColor=white)<br/>
    인증을 위한 라이브러리로, 다양한 인증 제공자와 쉽게 통합할 수 있습니다.

### 백엔드 (Concert_Reservation_API)

-   **Spring Boot**: 강력한 엔터프라이즈급 애플리케이션을 빠르게 개발할 수 있게 해주는 프레임워크입니다.
-   **MySQL**: 안정적이고 확장 가능한 데이터베이스로 사용자 및 예약 데이터를 저장합니다.

---

## 주요 기능

### 로그인

사용자는 간단히 UserId를 입력하여 로그인할 수 있습니다. NextAuth를 통해 세션이 관리되며, 기존 세션이 존재할 경우 자동으로 `/concert` 페이지로 이동합니다. 세션이 없는 경우 로그인 페이지에 머물러 로그인을 유도합니다.

-   [page.tsx](https://github.com/dalle0601/Concert_Reservation_UI/blob/main/src/app/page.tsx)
-   [LoginForm.tsx](https://github.com/dalle0601/Concert_Reservation_UI/blob/main/src/components/LoginForm.tsx)

<img width="500" alt="1" src="https://github.com/dalle0601/Concert_Reservation_UI/assets/33375877/57117776-bda3-46c4-9d81-f9621d4b1cba">

### 콘서트 리스트 및 좌석 선택

로그인 후 사용자는 콘서트 목록을 볼 수 있으며, 특정 콘서트를 선택하여 좌석을 예약할 수 있습니다. 이 과정에서 Zustand를 이용해 상태를 관리합니다.

-   [concert/page.tsx](https://github.com/dalle0601/Concert_Reservation_UI/blob/main/src/app/concert/page.tsx)
-   [ConcertList.tsx](https://github.com/dalle0601/Concert_Reservation_UI/blob/main/src/components/concert/ConcertList.tsx)
-   [ConcertItemCard.tsx](https://github.com/dalle0601/Concert_Reservation_UI/blob/main/src/components/concert/ConcertItemCard.tsx)
-   [ConcertDetail.tsx](https://github.com/dalle0601/Concert_Reservation_UI/blob/main/src/components/concert/ConcertDetail.tsx)
-   [ConcertSeat.tsx](https://github.com/dalle0601/Concert_Reservation_UI/blob/main/src/components/concert/ConcertSeat.tsx)

<img width="500" alt="2 콘서트 목록" src="https://github.com/dalle0601/Concert_Reservation_UI/assets/33375877/74941b2b-409b-42c2-a38d-6fa6f5812a5e">
<img width="500" alt="3 좌석 확인" src="https://github.com/dalle0601/Concert_Reservation_UI/assets/33375877/5d51406f-2622-4d26-85f9-010ab4366c3a">

### 좌석 예약 및 결제

사용자는 좌석을 예약(임시점유)하고, 일정 시간 내에 결제해야 합니다. 그렇지 않으면 임시점유가 해제됩니다. WebWorker를 이용해 예약 상태를 주기적으로 확인합니다.

-   [useReservationUpdate.worker.js](https://github.com/dalle0601/Concert_Reservation_UI/blob/main/public/useReservationUpdate.worker.js)
-   [reservation/page.tsx](https://github.com/dalle0601/Concert_Reservation_UI/blob/main/src/app/concert/reservation/page.tsx)
-   [ReservationList.tsx](https://github.com/dalle0601/Concert_Reservation_UI/blob/main/src/components/reservation/ReservationList.tsx)
-   [ReservationCard.tsx](https://github.com/dalle0601/Concert_Reservation_UI/blob/main/src/components/reservation/ReservationCard.tsx)

<img width="500" alt="4 예약 확인" src="https://github.com/dalle0601/Concert_Reservation_UI/assets/33375877/8516a73c-e446-40fc-a167-2b05c1c0ccfb">
<img width="500" alt="4 예약 확인" src="https://github.com/dalle0601/Concert_Reservation_UI/assets/33375877/6a7a9019-97bf-490e-b4e3-409c81826d9b">

### 마이페이지 포인트 확인 및 충전

사용자는 마이페이지에서 포인트를 확인하고 충전할 수 있습니다.

-   [mypage/page.tsx](https://github.com/dalle0601/Concert_Reservation_UI/blob/main/src/app/mypage/page.tsx)
-   [MyPageInfo.tsx](https://github.com/dalle0601/Concert_Reservation_UI/blob/main/src/components/mypage/MyPageInfo.tsx)
-   [PointChargeModal.tsx](https://github.com/dalle0601/Concert_Reservation_UI/blob/main/src/components/mypage/PointChargeModal.tsx)

<img width="200" alt="5 마이페이지" src="https://github.com/dalle0601/Concert_Reservation_UI/assets/33375877/896b7524-b291-48b1-a916-8820ec9ba0ef">
<img width="200" alt="5 포인트 충전" src="https://github.com/dalle0601/Concert_Reservation_UI/assets/33375877/e1e4bd6d-aa48-49f5-b217-b4858807a6c9">
<img width="200" alt="5 포인트 충전 완료" src="https://github.com/dalle0601/Concert_Reservation_UI/assets/33375877/545d3f07-1f2b-4cdb-a591-98a59dbec252">

### 대기열 시스템

로그인 시 사용자의 토큰을 확인하여 유효하지 않은 경우 대기열에 포함시킵니다. 대기열에 포함된 사용자는 `/wait` 페이지로 이동하여 대기 순번을 확인할 수 있습니다. WebWorker를 이용해 대기열 상태를 주기적으로 확인합니다.

-   [useTokenVerification.worker.js](https://github.com/dalle0601/Concert_Reservation_UI/blob/main/public/useTokenVerification.worker.js)
-   [wait/page.tsx](https://github.com/dalle0601/Concert_Reservation_UI/blob/main/src/app/wait/page.tsx)

<img width="500" alt="6 대기열 1" src="https://github.com/dalle0601/Concert_Reservation_UI/assets/33375877/65385f99-a246-451c-8e44-ce3c47049b17">
<img width="500" alt="6 대기열 2" src="https://github.com/dalle0601/Concert_Reservation_UI/assets/33375877/efc87387-68fc-4862-9f6f-1f778fce4860">

## 결론

이 프로젝트는 사용자가 콘서트를 예약하고 관리할 수 있는 완전한 솔루션을 제공합니다. 최신 웹 기술과 견고한 백엔드 시스템을 통해 높은 성능과 사용성을 제공합니다.
