import { memo } from 'react';
import { View } from 'react-native';

import { FeedReactionBar } from '../interactions/FeedReactionBar';
import type { FeedItem } from '../../types/feed';
import {
  AchievementCard,
  PrAnnouncementCard,
  RankPromotionCard,
  StreakMilestoneCard,
  WorkoutPostCard,
  XpEventCard
} from './variants';

type FeedCardRendererProps = {
  item: FeedItem;
};

function renderVariant(item: FeedItem) {
  switch (item.kind) {
    case 'workout_post':
      return <WorkoutPostCard item={item} />;
    case 'xp_event':
      return <XpEventCard item={item} />;
    case 'streak_milestone':
      return <StreakMilestoneCard item={item} />;
    case 'achievement':
      return <AchievementCard item={item} />;
    case 'pr_announcement':
      return <PrAnnouncementCard item={item} />;
    case 'rank_promotion':
      return <RankPromotionCard item={item} />;
    default: {
      const _exhaustive: never = item;
      return _exhaustive;
    }
  }
}

export const FeedCardRenderer = memo(function FeedCardRenderer({ item }: FeedCardRendererProps) {
  return (
    <View className="gap-3">
      {renderVariant(item)}
      <FeedReactionBar item={item} />
    </View>
  );
});
