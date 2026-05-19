import { calculateBaseWorkoutXp } from '@/features/progression/utils/xp';

import type {
  GymWorkoutPayload,
  GymWorkoutSummary,
  RunWorkoutPayload,
  RunWorkoutSummary,
  SavedWorkout,
  WorkoutDraft,
  WorkoutSummary
} from '../types/workout';
import { formatPace } from './pace';
import {
  calculateTotalVolume,
  countCompletedSets,
  countSupersetGroups,
  countTotalReps
} from './volume';

export function buildGymSummary(payload: GymWorkoutPayload): GymWorkoutSummary {
  return {
    mode: 'gym',
    exerciseCount: payload.exercises.length,
    setCount: countCompletedSets(payload.exercises),
    supersetGroupCount: countSupersetGroups(payload.exercises),
    totalReps: countTotalReps(payload.exercises),
    totalVolume: calculateTotalVolume(payload.exercises),
    weightUnit: payload.weightUnit
  };
}

export function buildRunSummary(payload: RunWorkoutPayload): RunWorkoutSummary {
  return {
    mode: 'run',
    distanceMeters: payload.distanceMeters,
    durationSeconds: payload.durationSeconds,
    elevationGainMeters: payload.elevationGainMeters,
    paceSecondsPerKm: payload.paceSecondsPerKm,
    paceLabel: formatPace(payload.paceSecondsPerKm)
  };
}

export function buildWorkoutSummary(draft: WorkoutDraft): WorkoutSummary | null {
  if (draft.mode === 'gym' && draft.gym) {
    return buildGymSummary(draft.gym);
  }

  if (draft.mode === 'run' && draft.run) {
    return buildRunSummary(draft.run);
  }

  return null;
}

/** Preview XP on review — streak multipliers apply in progression engine on save. */
export function estimateWorkoutXp(summary: WorkoutSummary): number {
  return calculateBaseWorkoutXp(summary);
}

export function buildSavedWorkout(draft: WorkoutDraft): SavedWorkout | null {
  const summary = buildWorkoutSummary(draft);
  if (!summary) {
    return null;
  }

  const completedAt = new Date().toISOString();

  return {
    ...draft,
    completedAt,
    summary,
    xpEarned: estimateWorkoutXp(summary),
    updatedAt: completedAt
  };
}
