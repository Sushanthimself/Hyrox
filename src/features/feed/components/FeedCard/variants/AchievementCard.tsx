import { memo } from 'react';

import { Badge, Text } from '@/components/ui';

import type { AchievementFeedItem } from '../../../types/feed';
import { FeedCard } from '../FeedCard';

const rarityVariant = {
  common: 'neutral',
  rare: 'primary',
  epic: 'accent',
  legendary: 'warning'
} as const;

type AchievementCardProps = {
  item: AchievementFeedItem;
};

export const AchievementCard = memo(function AchievementCard({ item }: AchievementCardProps) {
  const { actor, createdAt, payload } = item;

  return (
    <FeedCard
      header={
        <FeedCard.Header
          actor={actor}
          badgeVariant="success"
          createdAt={createdAt}
          kind={item.kind}
          trailing={<Badge label={payload.rarity} variant={rarityVariant[payload.rarity]} />}
        />
      }
      highlight
      tone="success"
    >
      <FeedCard.Body>
        <Text variant="title">{payload.title}</Text>
        <Text className="leading-5" tone="muted" variant="body">
          {payload.description}
        </Text>
      </FeedCard.Body>
    </FeedCard>
  );
});
