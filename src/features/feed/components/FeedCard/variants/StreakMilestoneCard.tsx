import { memo } from 'react';

import { Text } from '@/components/ui';

import type { StreakMilestoneFeedItem } from '../../../types/feed';
import { FeedCard } from '../FeedCard';

type StreakMilestoneCardProps = {
  item: StreakMilestoneFeedItem;
};

export const StreakMilestoneCard = memo(function StreakMilestoneCard({ item }: StreakMilestoneCardProps) {
  const { actor, createdAt, payload } = item;

  return (
    <FeedCard
      header={
        <FeedCard.Header actor={actor} badgeVariant="warning" createdAt={createdAt} kind={item.kind} />
      }
      highlight
      tone="warning"
    >
      <FeedCard.Body>
        <Text variant="heading">{payload.days} days</Text>
        <Text tone="muted" variant="body">
          {payload.label}
        </Text>
      </FeedCard.Body>
    </FeedCard>
  );
});
