import {create} from 'zustand';

type UIState = {
  isLoading: boolean;
  loadingText: string;

  // Methods
  setIsLoading: (isLoading: boolean) => void;
};

export const useUiStore = create<UIState>()(set => ({
  isLoading: false,
  loadingText: 'Cargando...',

  // Methods
  setIsLoading: (isLoading: boolean) => set(() => ({isLoading})),
}));
