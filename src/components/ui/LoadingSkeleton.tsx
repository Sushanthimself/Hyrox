import { StyleSheet, View, type ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';

import { useTheme } from '@/theme';
import { useShimmer } from '@/motion';
import { cn } from '@/utils';

type LoadingSkeletonProps = ViewProps & {
  shimmerClassName?: string;
};

export function LoadingSkeleton({ className, shimmerClassName, ...props }: LoadingSkeletonProps) {
  const { theme } = useTheme();
  const { shimmerStyle } = useShimmer();
  const shimmerColors = [
    theme.color.skeletonBase,
    theme.color.skeletonHighlight,
    theme.color.skeletonBase
  ] as [string, string, string];

  return (
    <View
      className={cn('h-4 w-full overflow-hidden rounded-md bg-skeleton/20', className)}
      {...props}
    >
      <Animated.View className={cn('absolute h-full w-1/2', shimmerClassName)} style={shimmerStyle}>
        <LinearGradient
          colors={shimmerColors}
          end={{ x: 1, y: 0 }}
          start={{ x: 0, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}
