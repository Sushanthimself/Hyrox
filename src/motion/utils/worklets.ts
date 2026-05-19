import { runOnJS, runOnUI } from 'react-native-reanimated';

/** Schedule work on the UI thread without crossing unnecessarily. */
export function scheduleOnUI(worklet: () => void) {
  runOnUI(worklet)();
}

/** Bridge a UI-thread completion to JS (e.g. haptics, analytics). */
export function scheduleOnJS<T extends (...args: never[]) => void>(callback: T) {
  return runOnJS(callback);
}

export function clamp(value: number, min: number, max: number) {
  'worklet';
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, progress: number) {
  'worklet';
  return start + (end - start) * progress;
}
