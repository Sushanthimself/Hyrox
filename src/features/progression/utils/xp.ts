import type { WorkoutSummary } from '@/features/activity/types/workout';

import { getStreakMultiplier } from './streak';

/** Base XP from workout output — tuned for ~200–600 XP per solid session. */
export function calculateBaseWorkoutXp(summary: WorkoutSummary): number {
  if (summary.mode === 'gym') {
    const volumeXp = summary.totalVolume / 35;
    const setXp = summary.setCount * 14;
    const supersetBonus = summary.supersetGroupCount * 25;
    return Math.round(volumeXp + setXp + supersetBonus);
  }

  const km = summary.distanceMeters / 1000;
  const distanceXp = km * 95;
  const durationXp = summary.durationSeconds / 25;
  const elevationXp = summary.elevationGainMeters * 0.8;
  return Math.round(distanceXp + durationXp + elevationXp);
}

export function calculateXpGain(baseXp: number, streakDays: number): {
  amount: number;
  baseAmount: number;
  multiplier: number;
} {
  const multiplier = getStreakMultiplier(streakDays);
  const amount = Math.round(baseXp * multiplier);

  return {
    amount,
    baseAmount: baseXp,
    multiplier
  };
}
