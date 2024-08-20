import create from 'zustand';

interface Concert {
    concertId: number;
    concertTitle: string;
    concertDate: string;
    createdAt: string;
    imagePath: string;
}

interface StoreState {
    selectedConcert: Concert | null;
    setSelectedConcert: (concert: Concert) => void;
    userId: String | null;
    setUserId: (id: string | null) => void;
}

const useStore = create<StoreState>((set) => ({
    selectedConcert: null,
    setSelectedConcert: (concert) => set({ selectedConcert: concert }),
    userId: null,
    setUserId: (id) => {
        set({ userId: id });
        localStorage.setItem('userId', JSON.stringify(id));
    },
}));

export default useStore;
