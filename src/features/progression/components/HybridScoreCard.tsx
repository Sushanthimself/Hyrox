import { memo } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui';
import { MotionCard } from '@/motion';

import type { HybridScoreBreakdown } from '../types/progression';

type HybridScoreCardProps = {
  breakdown: HybridScoreBreakdown;
};

export const HybridScoreCard = memo(function HybridScoreCard({ breakdown }: HybridScoreCardProps) {
  return (
    <MotionCard className="border-secondary/25">
      <View className="gap-3">
        <View className="flex-row items-end justify-between">
          <Text variant="title">Hybrid score</Text>
          <Text tone="accent" variant="stat">
            {breakdown.total}
          </Text>
        </View>
        <View className="gap-2">
          <Bar label="Strength" value={breakdown.strength} />
          <Bar label="Endurance" value={breakdown.endurance} />
          <Bar label="Consistency" value={breakdown.consistency} />
        </View>
      </View>
    </MotionCard>
  );
});

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <View className="gap-1">
      <View className="flex-row justify-between">
        <Text tone="muted" variant="caption">
          {label}
        </Text>
        <Text className="font-semibold tabular-nums" variant="caption">
          {value}
        </Text>
      </View>
      <View className="h-2 overflow-hidden rounded-full bg-muted/40">
        <View className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, value)}%` }} />
      </View>
    </View>
  );
}
