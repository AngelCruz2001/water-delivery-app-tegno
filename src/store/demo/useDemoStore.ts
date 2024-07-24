import {create} from 'zustand';
import Config from 'react-native-config';

const isDemoActive = Config.IS_DEMO_ACTIVE || false

type DemoState = {
  isDemoActive: boolean;
  setIsDemoActive: (value: boolean) => void;
};

export const useDemoStore = create<DemoState>()((set, get) => ({
  isDemoActive: isDemoActive,
  setIsDemoActive: (value: boolean) => set({isDemoActive: value}),
}));
