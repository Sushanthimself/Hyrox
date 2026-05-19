import { memo, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Text } from '@/components/ui/Text';
import { cn } from '@/utils';

import { useXpPopup } from '../hooks/useXpPopup';
import { useMotionHaptics } from '../haptics/useMotionHaptics';

type XpPopupProps = {
  amount: number;
  className?: string;
  label?: string;
  /** Increment to retrigger the burst. */
  triggerKey?: number | string;
};

export const XpPopup = memo(function XpPopup({
  amount,
  className,
  label = 'XP',
  triggerKey
}: XpPopupProps) {
  const { animatedStyle, trigger } = useXpPopup();
  const haptics = useMotionHaptics();

  useEffect(() => {
    if (triggerKey === undefined) {
      return;
    }

    haptics.xpGain();
    trigger();
  }, [haptics, trigger, triggerKey]);

  return (
    <View className={cn('pointer-events-none items-center justify-center', className)} style={styles.root}>
      <Animated.View className="rounded-full border border-accent/40 bg-accent/15 px-4 py-2" style={animatedStyle}>
        <Text className="font-black tracking-wide" tone="accent" variant="stat">
          +{amount} {label}
        </Text>
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject
  }
});
