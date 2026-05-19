import { memo, useEffect, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';

import { Text } from '@/components/ui/Text';
import { gradients } from '@/theme/gradients';
import { cn } from '@/utils';

import { useRankReveal } from '../hooks/useRankReveal';
import { useMotionHaptics } from '../haptics/useMotionHaptics';

type RankRevealProps = {
  children?: ReactNode;
  className?: string;
  playKey?: number | string;
  rankLabel: string;
  subtitle?: string;
};

export const RankReveal = memo(function RankReveal({
  children,
  className,
  playKey,
  rankLabel,
  subtitle
}: RankRevealProps) {
  const { cardStyle, glowStyle, play } = useRankReveal();
  const haptics = useMotionHaptics();

  useEffect(() => {
    if (playKey === undefined) {
      return;
    }

    haptics.rankUp();
    play();
  }, [haptics, play, playKey]);

  return (
    <View className={cn('items-center justify-center', className)}>
      <Animated.View className="absolute h-48 w-48 rounded-full" style={glowStyle}>
        <LinearGradient
          colors={[...gradients.rankGlow]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      <Animated.View className="items-center gap-2 rounded-2xl border border-primary/30 bg-card/80 px-8 py-6" style={cardStyle}>
        <Text tone="muted" variant="overline">
          Rank up
        </Text>
        <Text variant="display">{rankLabel}</Text>
        {subtitle ? (
          <Text className="text-center" tone="muted" variant="caption">
            {subtitle}
          </Text>
        ) : null}
        {children}
      </Animated.View>
    </View>
  );
});
