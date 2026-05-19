import type { ProgressionState } from '../types/progression';
import type { WorkoutSummary } from '@/features/activity/types/workout';

export type AchievementDefinition = {
  description: string;
  id: string;
  rarity: 'common' | 'epic' | 'legendary' | 'rare';
  title: string;
  evaluate: (ctx: AchievementContext) => boolean;
};

export type AchievementContext = {
  eventType: 'workout_completed' | 'daily_check_in' | 'manual_bonus';
  state: ProgressionState;
  summary?: WorkoutSummary;
  xpGained?: number;
};

export const ACHIEVEMENT_DEFINITIONS: AchievementDefinition[] = [
  {
    id: 'first_blood',
    title: 'First Blood',
    description: 'Log your first workout in the arena.',
    rarity: 'common',
    evaluate: ({ state }) => state.lifetimeWorkouts >= 1
  },
  {
    id: 'streak_7',
    title: 'Week Warrior',
    description: 'Maintain a 7-day training streak.',
    rarity: 'rare',
    evaluate: ({ state }) => state.streak.currentDays >= 7
  },
  {
    id: 'streak_30',
    title: 'Iron Calendar',
    description: 'Hit a 30-day streak — elite consistency.',
    rarity: 'legendary',
    evaluate: ({ state }) => state.streak.currentDays >= 30
  },
  {
    id: 'volume_beast',
    title: 'Volume Beast',
    description: 'Move 10,000+ kg in a single gym session.',
    rarity: 'epic',
    evaluate: ({ summary }) =>
      summary?.mode === 'gym' ? summary.totalVolume >= 10_000 : false
  },
  {
    id: 'road_runner',
    title: 'Road Runner',
    description: 'Log a 10 km run in one session.',
    rarity: 'rare',
    evaluate: ({ summary }) =>
      summary?.mode === 'run' ? summary.distanceMeters >= 10_000 : false
  },
  {
    id: 'hybrid_80',
    title: 'Hybrid Threat',
    description: 'Reach a hybrid score of 80+.',
    rarity: 'epic',
    evaluate: ({ state }) => state.hybridScore.total >= 80
  }
];
