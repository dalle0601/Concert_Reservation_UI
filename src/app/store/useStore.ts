import create from 'zustand';

interface Concert {
    concertId: number;
    concertTitle: string;
    concertDate: string;
    createdAt: string;
    concertImage: string;
}

interface StoreState {
    selectedConcert: Concert | null;
    setSelectedConcert: (concert: Concert) => void;
}

const useStore = create<StoreState>((set) => ({
    selectedConcert: null,
    setSelectedConcert: (concert) => set({ selectedConcert: concert }),
}));

export default useStore;
