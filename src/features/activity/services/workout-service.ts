import type { SavedWorkout, WorkoutDraft } from '../types/workout';

import { mockWorkoutService } from './mock-workout-service';

/** Facade — point at API client when backend is ready. */
export const workoutService = {
  saveWorkout: (draft: WorkoutDraft): Promise<SavedWorkout> => mockWorkoutService.saveWorkout(draft),
  listHistory: (): Promise<SavedWorkout[]> => mockWorkoutService.listHistory()
};

export type WorkoutService = typeof workoutService;
