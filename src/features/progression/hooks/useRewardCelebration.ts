import { useCallback } from 'react';

import { useProgressionStore } from '../store/progression-store';

export function useRewardCelebration() {
  const currentCelebration = useProgressionStore((store) => store.currentCelebration);
  const queueLength = useProgressionStore((store) => store.celebrationQueue.length);
  const dequeueCelebration = useProgressionStore((store) => store.dequeueCelebration);
  const clearCelebrations = useProgressionStore((store) => store.clearCelebrations);

  const dismissCurrent = useCallback(() => {
    dequeueCelebration();
  }, [dequeueCelebration]);

  return {
    clearCelebrations,
    currentCelebration,
    dismissCurrent,
    hasCelebration: Boolean(currentCelebration),
    queueLength
  };
}
