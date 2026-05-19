import { useEffect } from 'react';
import {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
  type WithTimingConfig
} from 'react-native-reanimated';

import { motionPresets } from '../constants/presets';
import { motionEasing } from '../constants/easings';

type UseAnimatedCounterOptions = {
  duration?: number;
  format?: (value: number) => string;
  timing?: WithTimingConfig;
};

/**
 * Drives a numeric label on the UI thread — pair with `AnimatedCounterText`.
 */
export function useAnimatedCounter(target: number, options: UseAnimatedCounterOptions = {}) {
  const duration = options.duration ?? motionPresets.counter.duration;
  const format = options.format ?? ((value: number) => Math.round(value).toLocaleString());

  const value = useSharedValue(0);

  useEffect(() => {
    value.value = withTiming(target, options.timing ?? { duration, easing: motionEasing.emphasized });
  }, [duration, options.timing, target, value]);

  const formatted = useDerivedValue(() => format(value.value));

  const animatedProps = useAnimatedProps(() => ({
    text: formatted.value,
    defaultValue: formatted.value
  }));

  const pulse = () => {
    value.value = withTiming(target, { duration: motionPresets.duration.fast });
  };

  return {
    animatedProps,
    formatted,
    pulse,
    value
  };
}
