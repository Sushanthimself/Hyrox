import { memo } from 'react';
import { View } from 'react-native';
import { Trophy } from 'lucide-react-native';

import { Button, Text } from '@/components/ui';
import { useTheme } from '@/theme';

type FeedEmptyStateProps = {
  onRefresh?: () => void;
};

export const FeedEmptyState = memo(function FeedEmptyState({ onRefresh }: FeedEmptyStateProps) {
  const { theme } = useTheme();

  return (
    <View className="items-center justify-center gap-4 px-6 py-16">
      <View className="rounded-full border border-primary/30 bg-primary/10 p-5">
        <Trophy color={theme.color.primary} size={32} />
      </View>
      <Text className="text-center" variant="heading">
        The arena is quiet
      </Text>
      <Text className="max-w-[88%] text-center leading-6" tone="muted" variant="body">
        When athletes in your network train, rank up, and hit PRs, the pulse shows up here. Be the
        first to log today.
      </Text>
      {onRefresh ? (
        <Button haptic="impact" onPress={onRefresh} variant="secondary">
          Refresh feed
        </Button>
      ) : null}
    </View>
  );
});
