import { useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
  type WithSpringConfig,
  type WithTimingConfig
} from 'react-native-reanimated';

import { motionEasing } from '../constants/easings';
import { motionPresets } from '../constants/presets';
import { motionSprings } from '../constants/springs';

type SlideAxis = 'x' | 'y';

type UseSlideRevealOptions = {
  axis?: SlideAxis;
  delayMs?: number;
  distance?: number;
  duration?: number;
  spring?: WithSpringConfig;
  useSpring?: boolean;
};

export function useSlideReveal(options: UseSlideRevealOptions = {}) {
  const axis = options.axis ?? 'x';
  const delayMs = options.delayMs ?? 0;
  const distance = options.distance ?? motionPresets.slideReveal.offsetX;
  const duration = options.duration ?? motionPresets.slideReveal.duration;
  const useSpring = options.useSpring ?? true;

  const opacity = useSharedValue(0);
  const offset = useSharedValue(axis === 'x' ? distance : motionPresets.cinematicReveal.initialOffset);

  useEffect(() => {
    const timing: WithTimingConfig = { duration, easing: motionEasing.emphasized };

    opacity.value = withDelay(delayMs, withTiming(1, timing));

    if (useSpring) {
      offset.value = withDelay(
        delayMs,
        withSpring(0, options.spring ?? motionSprings.expressive)
      );
      return;
    }

    offset.value = withDelay(delayMs, withTiming(0, timing));
  }, [delayMs, distance, duration, offset, opacity, options.spring, useSpring]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: axis === 'x' ? [{ translateX: offset.value }] : [{ translateY: offset.value }]
  }));

  return { animatedStyle, opacity, offset };
}
