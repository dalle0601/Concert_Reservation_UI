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

const loadState = () => {
    const savedUserId = localStorage.getItem('userId');
    const savedSelectedConcert = localStorage.getItem('selectedConcert');

    return {
        userId: savedUserId ? JSON.parse(savedUserId) : null,
        selectedConcert: savedSelectedConcert ? JSON.parse(savedSelectedConcert) : null,
    };
};

const saveState = (userId: string | null, selectedConcert: Concert | null) => {
    localStorage.setItem('userId', JSON.stringify(userId));
    localStorage.setItem('selectedConcert', JSON.stringify(selectedConcert));
};

const initialState = loadState();

const useStore = create<StoreState>((set) => ({
    ...initialState,
    setSelectedConcert: (concert) => {
        set({ selectedConcert: concert });
        localStorage.setItem('selectedConcert', JSON.stringify(concert));
    },
    setUserId: (id) => {
        set({ userId: id });
        saveState(id, null);
    },
}));

export default useStore;
