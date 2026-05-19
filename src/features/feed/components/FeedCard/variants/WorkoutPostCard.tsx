import { memo } from 'react';

import { Text } from '@/components/ui';

import type { WorkoutPostFeedItem } from '../../../types/feed';
import { FeedCard } from '../FeedCard';

type WorkoutPostCardProps = {
  item: WorkoutPostFeedItem;
};

export const WorkoutPostCard = memo(function WorkoutPostCard({ item }: WorkoutPostCardProps) {
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
        <Text variant="title">{payload.title}</Text>
        <Text tone="muted" variant="caption">
          {payload.workoutType}
        </Text>
        {payload.highlight ? (
          <Text className="leading-5" tone="accent" variant="body">
            {payload.highlight}
          </Text>
        ) : null}
      </FeedCard.Body>
      <FeedCard.Metrics>
        <FeedCard.Metric label="Duration" value={`${payload.durationMinutes} min`} />
        <FeedCard.Metric label="Calories" value={`${payload.caloriesBurned}`} />
        <FeedCard.Metric label="XP" value={`+${payload.xpEarned}`} />
      </FeedCard.Metrics>
    </FeedCard>
  );
});
