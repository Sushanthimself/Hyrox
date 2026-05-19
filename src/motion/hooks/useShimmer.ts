import { useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';

import { motionPresets } from '../constants/presets';
import { motionEasing } from '../constants/easings';

type UseShimmerOptions = {
  duration?: number;
  travel?: number;
};

/**
 * Horizontal shimmer sweep — runs on UI thread, zero React rerenders.
 */
export function useShimmer(options: UseShimmerOptions = {}) {
  const duration = options.duration ?? motionPresets.shimmer.duration;
  const travel = options.travel ?? motionPresets.shimmer.travel;
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration, easing: motionEasing.linear }),
      -1,
      false
    );
  }, [duration, progress]);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, [0, 1], [-travel, travel], Extrapolation.CLAMP)
      }
    ]
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.5, 1], [0.35, 1, 0.35], Extrapolation.CLAMP)
  }));

  return { opacityStyle, progress, shimmerStyle };
}
