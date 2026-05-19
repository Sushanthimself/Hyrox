import { memo, useEffect } from 'react';
import { View } from 'react-native';
import { Flame } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

import { Text } from '@/components/ui';
import { useTheme } from '@/theme';
import { cn } from '@/utils';

type StreakFlameBadgeProps = {
  className?: string;
  days: number;
  milestone?: boolean;
};

export const StreakFlameBadge = memo(function StreakFlameBadge({
  className,
  days,
  milestone = false
}: StreakFlameBadgeProps) {
  const { theme } = useTheme();
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(withTiming(1.12, { duration: 700 }), withTiming(1, { duration: 700 })),
      -1,
      true
    );
  }, [pulse]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }]
  }));

  return (
    <View
      className={cn(
        'flex-row items-center gap-2 rounded-full border px-3 py-1.5',
        milestone ? 'border-warning/40 bg-warning/15' : 'border-danger/30 bg-danger/10',
        className
      )}
    >
      <Animated.View style={animatedStyle}>
        <Flame color={milestone ? theme.color.warning : theme.color.danger} size={18} />
      </Animated.View>
      <Text className="font-bold tabular-nums" tone={milestone ? 'warning' : 'danger'} variant="caption">
        {days} day streak
      </Text>
    </View>
  );
});
