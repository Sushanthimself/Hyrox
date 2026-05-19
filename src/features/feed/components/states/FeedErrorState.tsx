import { memo } from 'react';
import { View } from 'react-native';

import { Button, Text } from '@/components/ui';

type FeedErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export const FeedErrorState = memo(function FeedErrorState({
  message = 'Unable to load the feed right now.',
  onRetry
}: FeedErrorStateProps) {
  return (
    <View className="items-center justify-center gap-4 px-6 py-16">
      <Text className="text-center" tone="danger" variant="title">
        Connection dropped
      </Text>
      <Text className="max-w-[90%] text-center leading-6" tone="muted" variant="body">
        {message}
      </Text>
      {onRetry ? (
        <Button haptic="impact" onPress={onRetry} variant="primary">
          Try again
        </Button>
      ) : null}
    </View>
  );
});
