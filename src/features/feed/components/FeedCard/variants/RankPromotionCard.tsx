import { memo } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui';

import type { RankPromotionFeedItem } from '../../../types/feed';
import { FeedCard } from '../FeedCard';

type RankPromotionCardProps = {
  item: RankPromotionFeedItem;
};

export const RankPromotionCard = memo(function RankPromotionCard({ item }: RankPromotionCardProps) {
  const { actor, createdAt, payload } = item;

  return (
    <FeedCard
      header={
        <FeedCard.Header actor={actor} badgeVariant="primary" createdAt={createdAt} kind={item.kind} />
      }
      highlight
      tone="primary"
    >
      <FeedCard.Body>
        <Text tone="muted" variant="overline">
          {payload.season} · {payload.division}
        </Text>
        <View className="flex-row items-center gap-2">
          <Text tone="muted" variant="bodyStrong">
            {payload.previousRank}
          </Text>
          <Text tone="accent" variant="caption">
            →
          </Text>
          <Text variant="heading">{payload.rank}</Text>
        </View>
      </FeedCard.Body>
    </FeedCard>
  );
});
