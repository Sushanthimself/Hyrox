import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';

export function useHapticFeedback() {
  const impact = useCallback(
    (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
      Haptics.impactAsync(style).catch(() => undefined);
    },
    []
  );

  const notification = useCallback((type: Haptics.NotificationFeedbackType) => {
    Haptics.notificationAsync(type).catch(() => undefined);
  }, []);

  const selection = useCallback(() => {
    Haptics.selectionAsync().catch(() => undefined);
  }, []);

  return {
    impact,
    notification,
    selection
  };
}
