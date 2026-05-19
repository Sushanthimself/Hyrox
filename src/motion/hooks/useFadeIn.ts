import { useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  type WithTimingConfig
} from 'react-native-reanimated';

import { motionPresets } from '../constants/presets';
import { motionEasing } from '../constants/easings';

type UseFadeInOptions = {
  delayMs?: number;
  duration?: number;
  offsetY?: number;
  timing?: WithTimingConfig;
};

/**
 * Imperative fade + lift — ideal for hero blocks and cards that mount in place.
 * Prefer `entering` layout presets when mounting via list reconciliation.
 */
export function useFadeIn(options: UseFadeInOptions = {}) {
  const delayMs = options.delayMs ?? 0;
  const duration = options.duration ?? motionPresets.fadeIn.duration;
  const offsetY = options.offsetY ?? motionPresets.fadeIn.offsetY;

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(offsetY);

  useEffect(() => {
    const timing: WithTimingConfig = options.timing ?? {
      duration,
      easing: motionEasing.emphasized
    };

    opacity.value = withDelay(delayMs, withTiming(1, timing));
    translateY.value = withDelay(delayMs, withTiming(0, timing));
  }, [delayMs, duration, offsetY, opacity, options.timing, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }]
  }));

  const restart = () => {
    opacity.value = 0;
    translateY.value = offsetY;
    opacity.value = withDelay(delayMs, withTiming(1, { duration, easing: motionEasing.emphasized }));
    translateY.value = withDelay(delayMs, withTiming(0, { duration, easing: motionEasing.emphasized }));
  };

  return { animatedStyle, opacity, restart, translateY };
}
