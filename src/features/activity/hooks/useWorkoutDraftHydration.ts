import { useEffect } from 'react';

import { workoutDraftStorage } from '../services/workout-draft-storage';
import { useWorkoutLogStore } from '../store/workout-log-store';

export function useWorkoutDraftHydration() {
  const hydrateDraft = useWorkoutLogStore((state) => state.hydrateDraft);
  const isHydrated = useWorkoutLogStore((state) => state.isHydrated);

  useEffect(() => {
    const hydrate = async () => {
      const draft = await workoutDraftStorage.loadDraft();
      hydrateDraft(draft);
    };

    if (!isHydrated) {
      void hydrate();
    }
  }, [hydrateDraft, isHydrated]);

  return { isHydrated };
}
