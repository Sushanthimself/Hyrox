import { useMemo } from 'react';

import { useProgressionStore } from '../store/progression-store';
import { isRankNearMiss } from '../utils/psychology';
import type { ProgressionState } from '../types/progression';

export function useProgression() {
  const storeState = useProgressionStore((store) => store.state);
  const isHydrated = useProgressionStore((store) => store.isHydrated);

  return useMemo(() => {
    if (!storeState) {
      return {
        isHydrated,
        isReady: false,
        state: null,
        isRankNearMiss: false
      };
    }

    // Bulletproof schema fallback to guarantee no undefined/null crashes
    const state: ProgressionState = {
      totalXp: storeState.totalXp ?? 0,
      xpIntoCurrentRank: storeState.xpIntoCurrentRank ?? 0,
      xpToNextRank: storeState.xpToNextRank ?? null,
      lifetimeWorkouts: storeState.lifetimeWorkouts ?? 0,
      unlockedAchievementIds: storeState.unlockedAchievementIds ?? [],
      rank: storeState.rank || {
        division: 'bronze',
        id: 'bronze_iii',
        label: 'Bronze III',
        minXp: 0
      },
      streak: storeState.streak || {
        currentDays: 0,
        longestDays: 0,
        lastActivityDate: null,
        isActiveToday: false
      },
      hybridScore: storeState.hybridScore || {
        strength: 0,
        endurance: 0,
        consistency: 0,
        total: 0
      }
    };

    return {
      isHydrated,
      isReady: true,
      state,
      isRankNearMiss: isRankNearMiss(state.xpToNextRank)
    };
  }, [isHydrated, storeState]);
}
