import { memo, useEffect } from 'react';
import { View } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';

import { Badge, Text } from '@/components/ui';

import type { AchievementUnlockedReward } from '../types/progression';

type AchievementToastProps = {
  onDismiss?: () => void;
  reward: AchievementUnlockedReward;
};

const rarityVariant = {
  common: 'neutral',
  rare: 'primary',
  epic: 'accent',
  legendary: 'warning'
} as const;

export const AchievementToast = memo(function AchievementToast({
  onDismiss,
  reward
}: AchievementToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss?.(), 2_800);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <Animated.View
      className="mx-4 rounded-xl border border-border/20 bg-card/95 p-4"
      entering={FadeInUp.duration(280)}
      exiting={FadeOutUp.duration(220)}
    >
      <View className="flex-row items-start gap-3">
        <View className="flex-1 gap-1">
          <Text tone="accent" variant="overline">
            Achievement unlocked
          </Text>
          <Text variant="title">{reward.title}</Text>
          <Text className="leading-5" tone="muted" variant="caption">
            {reward.description}
          </Text>
        </View>
        <Badge label={reward.rarity} variant={rarityVariant[reward.rarity]} />
      </View>
    </Animated.View>
  );
});
