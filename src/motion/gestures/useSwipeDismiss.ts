import { useEffect, useMemo } from 'react';
import { useSharedValue } from 'react-native-reanimated';

import { createSwipeDismissGesture } from './gesture-utils';

type UseSwipeDismissOptions = {
  enabled?: boolean;
  onDismiss: () => void;
  resetKey?: boolean | number | string;
  threshold?: number;
};

export function useSwipeDismiss({
  enabled = true,
  onDismiss,
  resetKey,
  threshold
}: UseSwipeDismissOptions) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = 0;
  }, [resetKey, translateY]);

  const gesture = useMemo(
    () =>
      createSwipeDismissGesture({
        enabled,
        onDismiss,
        threshold,
        translateY
      }),
    [enabled, onDismiss, threshold, translateY]
  );

  return {
    gesture,
    translateY
  };
}
