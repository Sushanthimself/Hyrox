import AsyncStorage from '@react-native-async-storage/async-storage';

import { WORKOUT_STORAGE_KEYS } from '../constants/storage-keys';
import type { WorkoutDraft } from '../types/workout';

export const workoutDraftStorage = {
  async loadDraft(): Promise<WorkoutDraft | null> {
    const raw = await AsyncStorage.getItem(WORKOUT_STORAGE_KEYS.activeDraft);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as WorkoutDraft;
    } catch {
      return null;
    }
  },

  async saveDraft(draft: WorkoutDraft): Promise<void> {
    await AsyncStorage.setItem(WORKOUT_STORAGE_KEYS.activeDraft, JSON.stringify(draft));
  },

  async clearDraft(): Promise<void> {
    await AsyncStorage.removeItem(WORKOUT_STORAGE_KEYS.activeDraft);
  }
};
