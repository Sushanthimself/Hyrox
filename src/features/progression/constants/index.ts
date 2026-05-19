export * from './achievements';
export * from './ranks';

export const PROGRESSION_QUERY_KEYS = {
  all: ['progression'] as const,
  state: ['progression', 'state'] as const
} as const;

export const PROGRESSION_STORAGE_KEY = 'hyrox_progression_state_v1';

export const STREAK_MILESTONES = [3, 7, 14, 30] as const;
