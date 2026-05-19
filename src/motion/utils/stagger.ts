import { motionPresets } from '../constants/presets';

type StaggerOptions = {
  baseDelayMs?: number;
  index: number;
  staggerMs?: number;
};

/** Deterministic stagger delay — keeps child hooks stable per index. */
export function getStaggerDelay({
  baseDelayMs = 0,
  index,
  staggerMs = motionPresets.stagger.delayMs
}: StaggerOptions): number {
  const delay = baseDelayMs + index * staggerMs;
  return Math.min(delay, motionPresets.stagger.maxDelayMs);
}

export function getStaggerStyleDelay(index: number, staggerMs = motionPresets.stagger.delayMs) {
  return getStaggerDelay({ index, staggerMs });
}
