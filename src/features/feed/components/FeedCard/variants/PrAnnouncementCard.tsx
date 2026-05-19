import { memo } from 'react';

import { Badge, Text } from '@/components/ui';

import type { PrAnnouncementFeedItem } from '../../../types/feed';
import { FeedCard } from '../FeedCard';

type PrAnnouncementCardProps = {
  item: PrAnnouncementFeedItem;
};

export const PrAnnouncementCard = memo(function PrAnnouncementCard({ item }: PrAnnouncementCardProps) {
  const { actor, createdAt, payload } = item;

  return (
    <FeedCard
      header={
        <FeedCard.Header
          actor={actor}
          badgeVariant="danger"
          createdAt={createdAt}
          kind={item.kind}
          trailing={<Badge label={payload.improvementLabel} variant="danger" />}
        />
      }
      highlight
      tone="danger"
    >
      <FeedCard.Body>
        <Text variant="title">{payload.eventName}</Text>
        <Text tone="muted" variant="caption">
          Previous · {payload.previousValue}
        </Text>
        <Text tone="accent" variant="stat">
          {payload.value}
        </Text>
      </FeedCard.Body>
    </FeedCard>
  );
});
