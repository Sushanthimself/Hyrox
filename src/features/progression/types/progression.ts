import type { WorkoutSummary } from '@/features/activity/types/workout';

export type RankTierId =
  | 'bronze_iii'
  | 'bronze_ii'
  | 'bronze_i'
  | 'silver_iii'
  | 'silver_ii'
  | 'silver_i'
  | 'gold_iii'
  | 'gold_ii'
  | 'gold_i'
  | 'platinum_iii'
  | 'platinum_ii'
  | 'platinum_i'
  | 'diamond_iii'
  | 'diamond_ii'
  | 'diamond_i'
  | 'champion_i'
  | 'elite';

export type RankTier = {
  division: string;
  id: RankTierId;
  label: string;
  minXp: number;
};

export type StreakState = {
  currentDays: number;
  isActiveToday: boolean;
  lastActivityDate: string | null;
  longestDays: number;
};

export type HybridScoreBreakdown = {
  consistency: number;
  endurance: number;
  strength: number;
  total: number;
};

export type ProgressionState = {
  hybridScore: HybridScoreBreakdown;
  lifetimeWorkouts: number;
  rank: RankTier;
  streak: StreakState;
  totalXp: number;
  unlockedAchievementIds: string[];
  xpIntoCurrentRank: number;
  xpToNextRank: number | null;
};

export type ProgressionEventType = 'daily_check_in' | 'manual_bonus' | 'workout_completed';

export type WorkoutCompletedPayload = {
  summary: WorkoutSummary;
  workoutId: string;
  workoutTitle: string;
};

export type ManualBonusPayload = {
  amount: number;
  reason: string;
};

export type ProgressionEvent = {
  id: string;
  occurredAt: string;
  payload: ManualBonusPayload | WorkoutCompletedPayload;
  type: ProgressionEventType;
};

export type RewardKind =
  | 'achievement_unlocked'
  | 'hybrid_score_updated'
  | 'rank_up'
  | 'streak_updated'
  | 'xp_gained';

export type RewardPresentation = 'overlay' | 'popup' | 'silent' | 'toast';

export type XpGainedReward = {
  amount: number;
  baseAmount: number;
  kind: 'xp_gained';
  multiplier: number;
  presentation: 'popup';
  reason: string;
};

export type StreakUpdatedReward = {
  currentDays: number;
  kind: 'streak_updated';
  milestoneHit: boolean;
  presentation: 'toast' | 'popup';
};

export type RankUpReward = {
  kind: 'rank_up';
  newRank: RankTier;
  previousRank: RankTier;
  presentation: 'overlay';
};

export type AchievementUnlockedReward = {
  achievementId: string;
  description: string;
  kind: 'achievement_unlocked';
  presentation: 'toast';
  rarity: 'common' | 'epic' | 'legendary' | 'rare';
  title: string;
};

export type HybridScoreUpdatedReward = {
  breakdown: HybridScoreBreakdown;
  delta: number;
  kind: 'hybrid_score_updated';
  presentation: 'silent';
};

export type RewardEvent =
  | AchievementUnlockedReward
  | HybridScoreUpdatedReward
  | RankUpReward
  | StreakUpdatedReward
  | XpGainedReward;

export type ProgressionProcessResult = {
  events: ProgressionEvent[];
  rewards: RewardEvent[];
  state: ProgressionState;
};

export type CelebrationItem = RewardEvent & {
  celebrationId: string;
};
