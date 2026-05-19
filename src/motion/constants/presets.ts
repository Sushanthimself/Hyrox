import { FadeIn, FadeInDown, FadeInUp, FadeOut, SlideInDown, SlideInRight, ZoomIn } from 'react-native-reanimated';

import { motion } from '@/theme';

import { motionEasing } from './easings';
import { motionSprings } from './springs';

export const motionPresets = {
  duration: motion.duration,
  easing: motionEasing,
  spring: motionSprings,

  fadeIn: {
    duration: motion.duration.base,
    offsetY: 10
  },
  slideReveal: {
    duration: motion.duration.slow,
    offsetX: 24,
    offsetY: 0
  },
  pressScale: {
    pressedScale: 0.96,
    pressedOpacity: 0.88,
    duration: motion.duration.fast
  },
  stagger: {
    delayMs: 56,
    maxDelayMs: 480
  },
  shimmer: {
    duration: motion.duration.cinematic * 2,
    travel: 320
  },
  xpPopup: {
    rise: -72,
    duration: motion.duration.slow,
    scalePeak: 1.18
  },
  rankReveal: {
    duration: motion.duration.cinematic,
    glowPulseMs: 2400,
    scaleFrom: 0.72
  },
  counter: {
    duration: motion.duration.cinematic
  },
  cinematicReveal: {
    duration: motion.duration.cinematic,
    initialOffset: 16
  }
} as const;

/** Layout entering presets — use on Animated.View for list / feed mounts. */
export const enteringPresets = {
  fade: FadeIn.duration(motionPresets.fadeIn.duration).easing(motionEasing.emphasized),
  fadeUp: FadeInUp.duration(motionPresets.fadeIn.duration)
    .easing(motionEasing.emphasized)
    .springify()
    .damping(motionSprings.subtle.damping)
    .stiffness(motionSprings.subtle.stiffness),
  fadeDown: FadeInDown.duration(motionPresets.fadeIn.duration).easing(motionEasing.emphasized),
  slideRight: SlideInRight.duration(motionPresets.slideReveal.duration).easing(
    motionEasing.emphasized
  ),
  slideUp: SlideInDown.duration(motionPresets.slideReveal.duration)
    .springify()
    .damping(motionSprings.sheet.damping)
    .stiffness(motionSprings.sheet.stiffness),
  zoom: ZoomIn.duration(motionPresets.rankReveal.duration).easing(motionEasing.overshoot),
  exitFade: FadeOut.duration(motion.duration.fast).easing(motionEasing.exit)
} as const;

export type MotionPresetName = keyof typeof motionPresets;
