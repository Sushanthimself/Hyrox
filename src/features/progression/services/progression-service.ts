import type { SavedWorkout } from '@/features/activity/types/workout';

import type { ProgressionEvent, ProgressionProcessResult, ProgressionState } from '../types/progression';
import { createWorkoutId } from '@/features/activity/utils/id';

import {
  createInitialProgressionState,
  processProgressionEvent
} from './progression-engine';
import { progressionPersistence } from './progression-persistence';

export const progressionService = {
  async loadState(): Promise<ProgressionState> {
    return progressionPersistence.load();
  },

  async saveState(state: ProgressionState): Promise<void> {
    await progressionPersistence.save(state);
  },

  async resetState(): Promise<ProgressionState> {
    const initial = createInitialProgressionState();
    await progressionPersistence.save(initial);
    return initial;
  },

  processEvent(state: ProgressionState, event: ProgressionEvent): ProgressionProcessResult {
    return processProgressionEvent(state, event);
  },

  buildWorkoutCompletedEvent(workout: SavedWorkout): ProgressionEvent {
    return {
      id: createWorkoutId('prog'),
      type: 'workout_completed',
      occurredAt: workout.completedAt,
      payload: {
        workoutId: workout.id,
        workoutTitle: workout.title,
        summary: workout.summary
      }
    };
  },

  async applyWorkoutCompleted(
    state: ProgressionState,
    workout: SavedWorkout
  ): Promise<ProgressionProcessResult> {
    const event = this.buildWorkoutCompletedEvent(workout);
    const result = this.processEvent(state, event);
    await progressionPersistence.save(result.state);
    return result;
  }
};

export type ProgressionService = typeof progressionService;
