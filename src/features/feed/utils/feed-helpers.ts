import type { FeedItem, FeedItemKind } from '../types/feed';

/** Stable height hints for FlashList — tune per card variant for scroll performance. */
export const FEED_ITEM_ESTIMATED_HEIGHT: Record<FeedItemKind, number> = {
  achievement: 212,
  pr_announcement: 228,
  rank_promotion: 248,
  streak_milestone: 188,
  workout_post: 296,
  xp_event: 172
};

export function getFeedItemEstimatedSize(item: FeedItem): number {
  return FEED_ITEM_ESTIMATED_HEIGHT[item.kind];
}

export function formatFeedTimestamp(iso: string): string {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60_000);

  if (minutes < 1) {
    return 'Just now';
  }

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days}d`;
  }

  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}

export function getFeedKindLabel(kind: FeedItemKind): string {
  const labels: Record<FeedItemKind, string> = {
    achievement: 'Achievement',
    pr_announcement: 'Personal record',
    rank_promotion: 'Rank up',
    streak_milestone: 'Streak',
    workout_post: 'Workout',
    xp_event: 'XP gained'
  };

  return labels[kind];
}
