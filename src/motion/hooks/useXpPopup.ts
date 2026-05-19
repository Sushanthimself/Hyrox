import { useCallback } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated';

import { motionEasing } from '../constants/easings';
import { motionPresets } from '../constants/presets';
import { motionSprings } from '../constants/springs';

/**
 * Burst animation for "+XP" overlays — call `trigger()` on gain events.
 */
export function useXpPopup() {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.6);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }]
  }));

  const trigger = useCallback(() => {
    opacity.value = 0;
    scale.value = 0.6;
    translateY.value = 0;

    opacity.value = withSequence(
      withTiming(1, { duration: motionPresets.duration.fast }),
      withTiming(0, { duration: motionPresets.duration.slow, easing: motionEasing.exit })
    );

    scale.value = withSequence(
      withSpring(motionPresets.xpPopup.scalePeak, motionSprings.celebration),
      withTiming(1, { duration: motionPresets.duration.base })
    );

    translateY.value = withTiming(motionPresets.xpPopup.rise, {
      duration: motionPresets.xpPopup.duration,
      easing: motionEasing.emphasized
    });
  }, [opacity, scale, translateY]);

  return { animatedStyle, opacity, scale, trigger, translateY };
}
