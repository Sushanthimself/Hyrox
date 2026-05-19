/** Discriminated feed item kinds — extend union when adding new activity types. */
export type FeedItemKind =
  | 'achievement'
  | 'pr_announcement'
  | 'rank_promotion'
  | 'streak_milestone'
  | 'workout_post'
  | 'xp_event';

export type FeedActor = {
  avatarUrl?: string;
  displayName: string;
  handle: string;
  id: string;
  rankLabel?: string;
};

export type FeedReactionType = 'fire' | 'goat' | 'respect' | 'strong';

export type FeedInteractions = {
  commentCount: number;
  likeCount: number;
  reactionCount: number;
  repostCount: number;
  viewerHasLiked: boolean;
  viewerReaction: FeedReactionType | null;
};

type FeedItemBase = {
  actor: FeedActor;
  createdAt: string;
  id: string;
  interactions: FeedInteractions;
  kind: FeedItemKind;
};

export type WorkoutPostPayload = {
  caloriesBurned: number;
  durationMinutes: number;
  highlight?: string;
  title: string;
  workoutType: string;
  xpEarned: number;
};

export type XpEventPayload = {
  delta: number;
  reason: string;
  totalXp: number;
};

export type StreakMilestonePayload = {
  days: number;
  label: string;
};

export type AchievementPayload = {
  achievementId: string;
  description: string;
  rarity: 'common' | 'epic' | 'legendary' | 'rare';
  title: string;
};

export type PrAnnouncementPayload = {
  eventName: string;
  improvementLabel: string;
  previousValue: string;
  value: string;
};

export type RankPromotionPayload = {
  division: string;
  previousRank: string;
  rank: string;
  season: string;
};

export type WorkoutPostFeedItem = FeedItemBase & {
  kind: 'workout_post';
  payload: WorkoutPostPayload;
};

export type XpEventFeedItem = FeedItemBase & {
  kind: 'xp_event';
  payload: XpEventPayload;
};

export type StreakMilestoneFeedItem = FeedItemBase & {
  kind: 'streak_milestone';
  payload: StreakMilestonePayload;
};

export type AchievementFeedItem = FeedItemBase & {
  kind: 'achievement';
  payload: AchievementPayload;
};

export type PrAnnouncementFeedItem = FeedItemBase & {
  kind: 'pr_announcement';
  payload: PrAnnouncementPayload;
};

export type RankPromotionFeedItem = FeedItemBase & {
  kind: 'rank_promotion';
  payload: RankPromotionPayload;
};

export type FeedItem =
  | AchievementFeedItem
  | PrAnnouncementFeedItem
  | RankPromotionFeedItem
  | StreakMilestoneFeedItem
  | WorkoutPostFeedItem
  | XpEventFeedItem;

export type FeedPageCursor = string | null;

export type FeedPage = {
  hasMore: boolean;
  items: FeedItem[];
  nextCursor: FeedPageCursor;
};

export type FetchFeedPageInput = {
  cursor?: FeedPageCursor;
  limit?: number;
};

export type ToggleFeedLikeInput = {
  itemId: string;
  liked: boolean;
};

export type SetFeedReactionInput = {
  itemId: string;
  reaction: FeedReactionType | null;
};
