import { useCallback, useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated';

import { motionPresets } from '../constants/presets';
import { motionSprings } from '../constants/springs';

type UseRankRevealOptions = {
  autoPlay?: boolean;
  delayMs?: number;
};

/**
 * Cinematic rank-up: scale punch, glow pulse, and settle.
 */
export function useRankReveal(options: UseRankRevealOptions = {}) {
  const delayMs = options.delayMs ?? 0;
  const scale = useSharedValue<number>(motionPresets.rankReveal.scaleFrom);
  const opacity = useSharedValue(0);
  const glow = useSharedValue(0);
  const rotate = useSharedValue(-4);

  const play = useCallback(() => {
    opacity.value = withDelay(delayMs, withTiming(1, { duration: motionPresets.duration.base }));
    scale.value = withDelay(
      delayMs,
      withSequence(
        withSpring(1.12, motionSprings.celebration),
        withSpring(1, motionSprings.subtle)
      )
    );
    rotate.value = withDelay(
      delayMs,
      withSequence(withSpring(2, motionSprings.press), withSpring(0, motionSprings.subtle))
    );
    glow.value = withDelay(
      delayMs,
      withRepeat(
        withSequence(
          withTiming(1, { duration: motionPresets.rankReveal.glowPulseMs / 2 }),
          withTiming(0.35, { duration: motionPresets.rankReveal.glowPulseMs / 2 })
        ),
        -1,
        true
      )
    );
  }, [delayMs, glow, opacity, rotate, scale]);

  useEffect(() => {
    if (options.autoPlay) {
      play();
    }
  }, [options.autoPlay, play]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }]
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value * 0.85,
    transform: [{ scale: 1 + glow.value * 0.08 }]
  }));

  const reset = useCallback(() => {
    scale.value = motionPresets.rankReveal.scaleFrom;
    opacity.value = 0;
    glow.value = 0;
    rotate.value = -4;
  }, [glow, opacity, rotate, scale]);

  return {
    cardStyle,
    glowStyle,
    play,
    reset
  };
}
