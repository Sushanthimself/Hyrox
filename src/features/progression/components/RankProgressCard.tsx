import { memo } from 'react';
import { View } from 'react-native';

import { Badge, Text } from '@/components/ui';
import { MotionCard } from '@/motion';
import { cn } from '@/utils';

import type { ProgressionState } from '../types/progression';
import { isRankNearMiss } from '../utils/psychology';

type RankProgressCardProps = {
  state: ProgressionState;
};

export const RankProgressCard = memo(function RankProgressCard({ state }: RankProgressCardProps) {
  const nearMiss = isRankNearMiss(state.xpToNextRank);
  const progressPercent =
    state.xpToNextRank === null
      ? 100
      : Math.min(
          100,
          (state.xpIntoCurrentRank / (state.xpIntoCurrentRank + state.xpToNextRank)) * 100
        );

  return (
    <MotionCard className={cn(nearMiss && 'border-accent/35')}>
      <View className="gap-3">
        <View className="flex-row items-center justify-between gap-2">
          <View className="gap-1">
            <Text tone="muted" variant="overline">
              Current rank
            </Text>
            <Text variant="heading">{state.rank.label}</Text>
            <Text tone="muted" variant="caption">
              {state.rank.division} · {state.totalXp.toLocaleString()} XP
            </Text>
          </View>
          {nearMiss ? <Badge label="Almost there" variant="accent" /> : null}
        </View>

        <View className="h-2 overflow-hidden rounded-full bg-muted/40">
          <View className="h-full rounded-full bg-primary" style={{ width: `${progressPercent}%` }} />
        </View>

        {state.xpToNextRank !== null ? (
          <Text tone="muted" variant="caption">
            {state.xpToNextRank} XP to next rank
          </Text>
        ) : (
          <Text tone="accent" variant="caption">
            Max rank reached — defend your position
          </Text>
        )}
      </View>
    </MotionCard>
  );
});
