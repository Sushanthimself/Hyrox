import { memo, type ReactNode } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui';
import { MotionPressable } from '@/motion';

type WorkoutModeCardProps = {
  description: string;
  icon: ReactNode;
  onPress: () => void;
  title: string;
};

export const WorkoutModeCard = memo(function WorkoutModeCard({
  description,
  icon,
  onPress,
  title
}: WorkoutModeCardProps) {
  return (
    <MotionPressable
      className="overflow-hidden rounded-2xl border border-border/15 bg-surface/60 p-4"
      haptic="press"
      onPress={onPress}
    >
      <View className="flex-row items-center gap-4">
        <View className="rounded-xl border border-primary/25 bg-primary/10 p-3">{icon}</View>
        <View className="flex-1 gap-1">
          <Text variant="title">{title}</Text>
          <Text className="leading-5" tone="muted" variant="caption">
            {description}
          </Text>
        </View>
        <Text tone="accent" variant="bodyStrong">
          →
        </Text>
      </View>
    </MotionPressable>
  );
});
