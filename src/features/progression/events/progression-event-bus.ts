import type { ProgressionProcessResult } from '../types/progression';

type ProgressionListener = (result: ProgressionProcessResult) => void;

const listeners = new Set<ProgressionListener>();

export const progressionEventBus = {
  emit(result: ProgressionProcessResult) {
    listeners.forEach((listener) => listener(result));
  },

  subscribe(listener: ProgressionListener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};
