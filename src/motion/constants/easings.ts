import { Easing } from 'react-native-reanimated';

/** Cubic-bezier tuples aligned with design tokens. */
export const easingCurves = {
  standard: [0.2, 0, 0, 1] as const,
  emphasized: [0.16, 1, 0.3, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
  overshoot: [0.34, 1.56, 0.64, 1] as const,
  snap: [0.2, 0.8, 0.2, 1] as const
} as const;

export const motionEasing = {
  standard: Easing.bezier(...easingCurves.standard),
  emphasized: Easing.bezier(...easingCurves.emphasized),
  exit: Easing.bezier(...easingCurves.exit),
  overshoot: Easing.bezier(...easingCurves.overshoot),
  snap: Easing.bezier(...easingCurves.snap),
  linear: Easing.linear
} as const;
