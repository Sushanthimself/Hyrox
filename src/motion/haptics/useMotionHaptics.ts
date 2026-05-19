import { useCallback, useMemo } from 'react';
import * as Haptics from 'expo-haptics';

import { useHapticFeedback } from '@/hooks/useHapticFeedback';

export type MotionHapticEvent =
  | 'press'
  | 'success'
  | 'warning'
  | 'error'
  | 'selection'
  | 'rankUp'
  | 'xpGain'
  | 'modalOpen'
  | 'modalClose';

const noop = () => undefined;

/**
 * Semantic haptics mapped to motion events — keeps UI code declarative.
 */
export function useMotionHaptics() {
  const { impact, notification, selection } = useHapticFeedback();

  const fire = useCallback(
    (event: MotionHapticEvent) => {
      switch (event) {
        case 'press':
          impact(Haptics.ImpactFeedbackStyle.Light);
          break;
        case 'selection':
          selection();
          break;
        case 'success':
          notification(Haptics.NotificationFeedbackType.Success);
          break;
        case 'warning':
          notification(Haptics.NotificationFeedbackType.Warning);
          break;
        case 'error':
          notification(Haptics.NotificationFeedbackType.Error);
          break;
        case 'rankUp':
          impact(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        case 'xpGain':
          impact(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'modalOpen':
          impact(Haptics.ImpactFeedbackStyle.Soft);
          break;
        case 'modalClose':
          selection();
          break;
        default:
          break;
      }
    },
    [impact, notification, selection]
  );

  return useMemo(
    () => ({
      fire,
      press: () => fire('press'),
      rankUp: () => fire('rankUp'),
      selection: () => fire('selection'),
      success: () => fire('success'),
      xpGain: () => fire('xpGain'),
      modalOpen: () => fire('modalOpen'),
      modalClose: () => fire('modalClose'),
      /** Safe no-op for SSR / unsupported devices */
      safe: typeof impact === 'function' ? fire : (noop as typeof fire)
    }),
    [fire, impact]
  );
}
