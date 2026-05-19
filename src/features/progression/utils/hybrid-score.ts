import type { HybridScoreBreakdown } from '../types/progression';
import type { WorkoutSummary } from '@/features/activity/types/workout';

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function normalizeGymStrength(summary: Extract<WorkoutSummary, { mode: 'gym' }>): number {
  const volumeScore = clamp((summary.totalVolume / 12_000) * 100);
  const setScore = clamp((summary.setCount / 24) * 100);
  return volumeScore * 0.65 + setScore * 0.35;
}

function normalizeRunEndurance(summary: Extract<WorkoutSummary, { mode: 'run' }>): number {
  const distanceScore = clamp((summary.distanceMeters / 15_000) * 100);
  const durationScore = clamp((summary.durationSeconds / 4_800) * 100);
  const elevationScore = clamp((summary.elevationGainMeters / 400) * 100);
  return distanceScore * 0.5 + durationScore * 0.35 + elevationScore * 0.15;
}

export function calculateHybridScore(input: {
  lifetimeWorkouts: number;
  streakDays: number;
  summary: WorkoutSummary;
}): HybridScoreBreakdown {
  const strength =
    input.summary.mode === 'gym' ? normalizeGymStrength(input.summary) : 0;
  const endurance =
    input.summary.mode === 'run' ? normalizeRunEndurance(input.summary) : 0;

  const consistency = clamp(
    (input.streakDays / 30) * 70 + Math.min(input.lifetimeWorkouts, 50) * 0.6
  );

  const hasDualDiscipline = input.lifetimeWorkouts >= 5;
  const blendStrength = input.summary.mode === 'gym' ? strength : strength * 0.85;
  const blendEndurance = input.summary.mode === 'run' ? endurance : endurance * 0.85;

  const total = clamp(
    blendStrength * 0.4 +
      blendEndurance * 0.35 +
      consistency * 0.25 +
      (hasDualDiscipline ? 4 : 0)
  );

  return {
    strength: Math.round(blendStrength),
    endurance: Math.round(blendEndurance),
    consistency: Math.round(consistency),
    total: Math.round(total)
  };
}

export function mergeHybridScore(
  current: HybridScoreBreakdown,
  incoming: HybridScoreBreakdown
): HybridScoreBreakdown {
  const weight = 0.35;
  const blend = (a: number, b: number) => Math.round(a * (1 - weight) + b * weight);

  return {
    strength: blend(current.strength, incoming.strength),
    endurance: blend(current.endurance, incoming.endurance),
    consistency: blend(current.consistency, incoming.consistency),
    total: blend(current.total, incoming.total)
  };
}
