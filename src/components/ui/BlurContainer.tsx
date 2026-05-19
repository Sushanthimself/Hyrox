import { StyleSheet, View, type ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';

import { useTheme } from '@/theme';
import { cn } from '@/utils';

type BlurContainerProps = ViewProps & {
  intensity?: number;
};

export function BlurContainer({
  children,
  className,
  intensity = 28,
  ...props
}: BlurContainerProps) {
  const { isDark } = useTheme();

  return (
    <View
      className={cn('overflow-hidden rounded-xl border border-border/15 bg-glass/10', className)}
      {...props}
    >
      <BlurView
        intensity={intensity}
        style={StyleSheet.absoluteFill}
        tint={isDark ? 'dark' : 'light'}
      />
      <View className="relative">{children}</View>
    </View>
  );
}
