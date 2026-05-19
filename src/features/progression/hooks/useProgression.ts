import { useMemo } from 'react';

import { useProgressionStore } from '../store/progression-store';
import { isRankNearMiss } from '../utils/psychology';

export function useProgression() {
  const state = useProgressionStore((store) => store.state);
  const isHydrated = useProgressionStore((store) => store.isHydrated);

  return useMemo(() => {
    if (!state) {
      return {
        isHydrated,
        isReady: false,
        state: null,
        isRankNearMiss: false
      };
    }

    return {
      isHydrated,
      isReady: true,
      state,
      isRankNearMiss: isRankNearMiss(state.xpToNextRank)
    };
  }, [isHydrated, state]);
}
