import { memo } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui';

import type { XpEventFeedItem } from '../../../types/feed';
import { FeedCard } from '../FeedCard';

type XpEventCardProps = {
  item: XpEventFeedItem;
};

export const XpEventCard = memo(function XpEventCard({ item }: XpEventCardProps) {
  const { actor, createdAt, payload } = item;

  return (
    <FeedCard
      header={
        <FeedCard.Header actor={actor} badgeVariant="accent" createdAt={createdAt} kind={item.kind} />
      }
      highlight
      tone="accent"
    >
      <View className="flex-row items-end justify-between gap-3">
        <FeedCard.Body className="flex-1">
          <Text tone="muted" variant="caption">
            {payload.reason}
          </Text>
        </FeedCard.Body>
        <Text tone="accent" variant="stat">
          +{payload.delta}
        </Text>
      </View>
      <FeedCard.Header.Meta tone="muted">Total XP · {payload.totalXp.toLocaleString()}</FeedCard.Header.Meta>
    </FeedCard>
  );
});
