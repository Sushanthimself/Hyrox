import AsyncStorage from '@react-native-async-storage/async-storage';

import { PROGRESSION_STORAGE_KEY } from '../constants';
import type { ProgressionState } from '../types/progression';

import { createInitialProgressionState } from './progression-engine';

export const progressionPersistence = {
  async load(): Promise<ProgressionState> {
    const raw = await AsyncStorage.getItem(PROGRESSION_STORAGE_KEY);
    if (!raw) {
      return createInitialProgressionState();
    }

    try {
      return JSON.parse(raw) as ProgressionState;
    } catch {
      return createInitialProgressionState();
    }
  },

  async save(state: ProgressionState): Promise<void> {
    await AsyncStorage.setItem(PROGRESSION_STORAGE_KEY, JSON.stringify(state));
  },

  async reset(): Promise<void> {
    await AsyncStorage.removeItem(PROGRESSION_STORAGE_KEY);
  }
};
