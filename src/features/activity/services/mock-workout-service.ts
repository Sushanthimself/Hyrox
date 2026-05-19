import type { SavedWorkout, WorkoutDraft } from '../types/workout';
import { buildSavedWorkout } from '../utils/summary';

const LATENCY_MS = 360;

const savedWorkouts: SavedWorkout[] = [];

function delay(ms = LATENCY_MS) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const mockWorkoutService = {
  async saveWorkout(draft: WorkoutDraft): Promise<SavedWorkout> {
    await delay();

    const saved = buildSavedWorkout(draft);
    if (!saved) {
      throw new Error('Unable to build workout summary.');
    }

    savedWorkouts.unshift(saved);
    return saved;
  },

  async listHistory(): Promise<SavedWorkout[]> {
    await delay(200);
    return [...savedWorkouts];
  }
};
