export const WORKOUT_QUERY_KEYS = {
  all: ['workout'] as const,
  history: ['workout', 'history'] as const,
  draft: ['workout', 'draft'] as const
} as const;
