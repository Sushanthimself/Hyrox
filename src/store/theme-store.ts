import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ThemePreference } from '@/theme/themes';

type ThemeState = {
  hasHydrated: boolean;
  preference: ThemePreference;
  setHasHydrated: (hasHydrated: boolean) => void;
  setPreference: (preference: ThemePreference) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      preference: 'system',
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      setPreference: (preference) => set({ preference }),
      toggleTheme: () => {
        const { preference } = get();
        set({ preference: preference === 'dark' ? 'light' : 'dark' });
      }
    }),
    {
      name: 'sharksfitness.theme',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({ preference: state.preference }),
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
