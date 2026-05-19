import { create } from 'zustand';

import type { CelebrationItem, ProgressionState, RewardEvent } from '../types/progression';
import { createWorkoutId } from '@/features/activity/utils/id';

type ProgressionStoreState = {
  celebrationQueue: CelebrationItem[];
  currentCelebration: CelebrationItem | null;
  isHydrated: boolean;
  state: ProgressionState | null;
};

type ProgressionStoreActions = {
  clearCelebrations: () => void;
  dequeueCelebration: () => void;
  enqueueRewards: (rewards: RewardEvent[]) => void;
  hydrate: (state: ProgressionState) => void;
  setState: (state: ProgressionState) => void;
};

export type ProgressionStore = ProgressionStoreState & ProgressionStoreActions;

export const useProgressionStore = create<ProgressionStore>((set, get) => ({
  celebrationQueue: [],
  currentCelebration: null,
  isHydrated: false,
  state: null,

  hydrate: (state) => set({ state, isHydrated: true }),

  setState: (state) => set({ state }),

  enqueueRewards: (rewards) => {
    const celebrations: CelebrationItem[] = rewards
      .filter((reward) => reward.presentation !== 'silent')
      .map((reward) => ({
        ...reward,
        celebrationId: createWorkoutId('cel')
      }));

    if (celebrations.length === 0) {
      return;
    }

    const { celebrationQueue, currentCelebration } = get();

    if (!currentCelebration) {
      const [first, ...rest] = celebrations;
      set({
        currentCelebration: first ?? null,
        celebrationQueue: rest
      });
      return;
    }

    set({ celebrationQueue: [...celebrationQueue, ...celebrations] });
  },

  dequeueCelebration: () => {
    const { celebrationQueue } = get();
    const [next, ...rest] = celebrationQueue;
    set({
      currentCelebration: next ?? null,
      celebrationQueue: rest
    });
  },

  clearCelebrations: () => set({ celebrationQueue: [], currentCelebration: null })
}));
