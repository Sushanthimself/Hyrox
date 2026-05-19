import { useMemo } from 'react';
import { FadeInDown, FadeInUp, FadeIn, SlideInRight, type EntryOrExitLayoutType } from 'react-native-reanimated';

import { motionEasing } from '../constants/easings';
import { motionPresets } from '../constants/presets';
import { getStaggerDelay } from '../utils/stagger';

type StaggerVariant = 'fade' | 'fadeDown' | 'fadeUp' | 'slideRight';

type UseStaggerOptions = {
  baseDelayMs?: number;
  staggerMs?: number;
  variant?: StaggerVariant;
};

const variantFactories: Record<StaggerVariant, (delay: number) => EntryOrExitLayoutType> = {
  fade: (delay) => FadeIn.delay(delay).duration(motionPresets.fadeIn.duration).easing(motionEasing.emphasized),
  fadeDown: (delay) =>
    FadeInDown.delay(delay)
      .duration(motionPresets.fadeIn.duration)
      .easing(motionEasing.emphasized),
  fadeUp: (delay) =>
    FadeInUp.delay(delay).duration(motionPresets.fadeIn.duration).easing(motionEasing.emphasized),
  slideRight: (delay) =>
    SlideInRight.delay(delay)
      .duration(motionPresets.slideReveal.duration)
      .easing(motionEasing.emphasized)
};

/**
 * Returns a stable entering animation for a list index — no per-frame JS work.
 */
export function useStagger(index: number, options: UseStaggerOptions = {}) {
  const { baseDelayMs = 0, staggerMs = motionPresets.stagger.delayMs, variant = 'fadeUp' } = options;

  return useMemo(() => {
    const delay = getStaggerDelay({ baseDelayMs, index, staggerMs });
    const entering = variantFactories[variant](delay);
    return { delay, entering };
  }, [baseDelayMs, index, staggerMs, variant]);
}

/**
 * Factory for N items — use when mapping static children in a parent.
 */
export function useStaggerChildren(count: number, options: UseStaggerOptions = {}) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const delay = getStaggerDelay({
          baseDelayMs: options.baseDelayMs,
          index,
          staggerMs: options.staggerMs
        });
        const variant = options.variant ?? 'fadeUp';
        return {
          delay,
          entering: variantFactories[variant](delay),
          index
        };
      }),
    [count, options.baseDelayMs, options.staggerMs, options.variant]
  );
}
