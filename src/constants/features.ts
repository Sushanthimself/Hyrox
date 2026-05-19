export const FEATURE_KEYS = {
  achievements: 'achievements',
  activity: 'activity',
  auth: 'auth',
  feed: 'feed',
  notifications: 'notifications',
  profile: 'profile',
  progression: 'progression',
  rankings: 'rankings'
} as const;

export type FeatureKey = (typeof FEATURE_KEYS)[keyof typeof FEATURE_KEYS];
