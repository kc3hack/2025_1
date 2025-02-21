import { create } from 'zustand';

interface ModalState {
    showCompletionModal: boolean;
    setShowCompletionModal: (show: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
    showCompletionModal: false,
    setShowCompletionModal: (show) => set({ showCompletionModal: show }),
})); 