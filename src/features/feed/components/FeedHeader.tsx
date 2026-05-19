import { memo } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui';

export const FeedHeader = memo(function FeedHeader() {
  return (
    <View className="gap-1 pb-4 pt-2">
      <Text tone="accent" variant="overline">
        Arena pulse
      </Text>
      <Text variant="heading">Live from your network</Text>
      <Text tone="muted" variant="caption">
        Workouts, rank-ups, PRs, and streaks — ranked by competitive momentum.
      </Text>
    </View>
  );
});
