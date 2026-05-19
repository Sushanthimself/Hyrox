import type { FieldErrors } from '@/features/auth/utils/validation';

import type { GymWorkoutPayload, RunWorkoutPayload, WorkoutDraft } from '../types/workout';
import { countCompletedSets } from './volume';

export type GymValidationFields = 'exercises' | 'sets';
export type RunValidationFields = 'distance' | 'duration';

export function validateGymPayload(payload: GymWorkoutPayload): FieldErrors<GymValidationFields> {
  const errors: FieldErrors<GymValidationFields> = {};

  if (payload.exercises.length === 0) {
    errors.exercises = 'Add at least one exercise.';
    return errors;
  }

  const completedSets = countCompletedSets(payload.exercises);
  if (completedSets === 0) {
    errors.sets = 'Mark at least one set complete.';
  }

  return errors;
}

export function validateRunPayload(payload: RunWorkoutPayload): FieldErrors<RunValidationFields> {
  const errors: FieldErrors<RunValidationFields> = {};

  if (payload.distanceMeters <= 0) {
    errors.distance = 'Enter distance.';
  }

  if (payload.durationSeconds <= 0) {
    errors.duration = 'Enter duration.';
  }

  return errors;
}

export function validateWorkoutDraft(draft: WorkoutDraft): FieldErrors<string> {
  if (draft.mode === 'gym' && draft.gym) {
    return validateGymPayload(draft.gym);
  }

  if (draft.mode === 'run' && draft.run) {
    return validateRunPayload(draft.run);
  }

  return { exercises: 'Workout data is missing.' };
}
