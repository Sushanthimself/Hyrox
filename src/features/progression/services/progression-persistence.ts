import AsyncStorage from '@react-native-async-storage/async-storage';

import { PROGRESSION_STORAGE_KEY } from '../constants';
import type { ProgressionState } from '../types/progression';

import { createInitialProgressionState } from './progression-engine';

export const progressionPersistence = {
  async load(): Promise<ProgressionState> {
    const raw = await AsyncStorage.getItem(PROGRESSION_STORAGE_KEY);
    const defaults = createInitialProgressionState();
    if (!raw) {
      return defaults;
    }

    try {
      const parsed = JSON.parse(raw);
      return {
        ...defaults,
        ...parsed,
        streak: {
          ...defaults.streak,
          ...(parsed?.streak || {})
        },
        hybridScore: {
          ...defaults.hybridScore,
          ...(parsed?.hybridScore || {})
        },
        rank: parsed?.rank || defaults.rank,
        unlockedAchievementIds: parsed?.unlockedAchievementIds || []
      } as ProgressionState;
    } catch {
      return defaults;
    }
  },

  async save(state: ProgressionState): Promise<void> {
    await AsyncStorage.setItem(PROGRESSION_STORAGE_KEY, JSON.stringify(state));
  },

  async reset(): Promise<void> {
    await AsyncStorage.removeItem(PROGRESSION_STORAGE_KEY);
  }
};
