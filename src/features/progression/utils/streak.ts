import { STREAK_MILESTONES } from '../constants';
import type { StreakState } from '../types/progression';

function toDateKey(iso: string): string {
  return iso.slice(0, 10);
}

export function applyActivityToStreak(streak: StreakState, occurredAt: string): StreakState {
  const today = toDateKey(occurredAt);
  const last = streak.lastActivityDate;

  if (last === today) {
    return {
      ...streak,
      isActiveToday: true
    };
  }

  if (!last) {
    return {
      currentDays: 1,
      isActiveToday: true,
      lastActivityDate: today,
      longestDays: Math.max(1, streak.longestDays)
    };
  }

  const lastDate = new Date(`${last}T00:00:00`);
  const todayDate = new Date(`${today}T00:00:00`);
  const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / 86_400_000);

  if (diffDays === 1) {
    const currentDays = streak.currentDays + 1;
    return {
      currentDays,
      isActiveToday: true,
      lastActivityDate: today,
      longestDays: Math.max(currentDays, streak.longestDays)
    };
  }

  return {
    currentDays: 1,
    isActiveToday: true,
    lastActivityDate: today,
    longestDays: Math.max(1, streak.longestDays)
  };
}

export function isStreakMilestone(days: number): boolean {
  return STREAK_MILESTONES.includes(days as (typeof STREAK_MILESTONES)[number]);
}

export function getStreakMultiplier(currentDays: number): number {
  const capped = Math.min(currentDays, 14);
  return 1 + capped * 0.04;
}
