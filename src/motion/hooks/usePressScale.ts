import { useCallback } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  type WithSpringConfig
} from 'react-native-reanimated';

import { motionPresets } from '../constants/presets';
import { motionSprings } from '../constants/springs';

type UsePressScaleOptions = {
  disabled?: boolean;
  opacity?: number;
  scale?: number;
  spring?: WithSpringConfig;
  useSpring?: boolean;
};

/**
 * Tactile press feedback — runs entirely on the UI thread via shared values.
 */
export function usePressScale(options: UsePressScaleOptions = {}) {
  const pressedScale = options.scale ?? motionPresets.pressScale.pressedScale;
  const pressedOpacity = options.opacity ?? motionPresets.pressScale.pressedOpacity;
  const useSpring = options.useSpring ?? true;
  const springConfig = options.spring ?? motionSprings.press;

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }));

  const animateTo = useCallback(
    (targetScale: number, targetOpacity: number) => {
      if (useSpring) {
        scale.value = withSpring(targetScale, springConfig);
        opacity.value = withSpring(targetOpacity, motionSprings.subtle);
        return;
      }

      scale.value = withTiming(targetScale, { duration: motionPresets.pressScale.duration });
      opacity.value = withTiming(targetOpacity, { duration: motionPresets.pressScale.duration });
    },
    [opacity, scale, springConfig, useSpring]
  );

  const onPressIn = useCallback(() => {
    if (options.disabled) {
      return;
    }

    animateTo(pressedScale, pressedOpacity);
  }, [animateTo, options.disabled, pressedOpacity, pressedScale]);

  const onPressOut = useCallback(() => {
    animateTo(1, 1);
  }, [animateTo]);

  return {
    animatedStyle,
    onPressIn,
    onPressOut,
    opacity,
    scale
  };
}
