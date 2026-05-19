import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, withSpring, withTiming, type SharedValue } from 'react-native-reanimated';

import { motionSprings } from '../constants/springs';
import { clamp } from '../utils/worklets';

type SwipeDismissConfig = {
  activeOffsetY?: number;
  enabled?: boolean;
  onDismiss: () => void;
  threshold?: number;
  translateY: SharedValue<number>;
};

/**
 * Vertical pan-to-dismiss — modal sheets and overlays.
 */
export function createSwipeDismissGesture({
  activeOffsetY = 12,
  enabled = true,
  onDismiss,
  threshold = 120,
  translateY
}: SwipeDismissConfig) {
  return Gesture.Pan()
    .enabled(enabled)
    .activeOffsetY(activeOffsetY)
    .onUpdate((event) => {
      translateY.value = Math.max(0, event.translationY);
    })
    .onEnd((event) => {
      const shouldDismiss = event.translationY > threshold || event.velocityY > 900;

      if (shouldDismiss) {
        translateY.value = withTiming(480, { duration: 220 }, (finished) => {
          if (finished) {
            runOnJS(onDismiss)();
          }
        });
        return;
      }

      translateY.value = withSpring(0, motionSprings.sheet);
    });
}

type HorizontalSnapConfig = {
  index: SharedValue<number>;
  itemWidth: number;
  onIndexChange?: (index: number) => void;
  startX: SharedValue<number>;
  translateX: SharedValue<number>;
};

export function createHorizontalSnapGesture({
  index,
  itemWidth,
  onIndexChange,
  startX,
  translateX
}: HorizontalSnapConfig) {
  return Gesture.Pan()
    .onBegin(() => {
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
    })
    .onEnd((event) => {
      const projected = translateX.value + event.velocityX * 0.12;
      const nextIndex = clamp(Math.round(-projected / itemWidth), 0, Number.MAX_SAFE_INTEGER);
      index.value = nextIndex;
      translateX.value = withSpring(-nextIndex * itemWidth, motionSprings.subtle);

      if (onIndexChange) {
        runOnJS(onIndexChange)(nextIndex);
      }
    });
}

/** Tap with simultaneous handlers blocked — use on pressables inside scrollables. */
export function createExclusiveTap(onPress: () => void) {
  return Gesture.Tap().onEnd(() => {
    runOnJS(onPress)();
  });
}
