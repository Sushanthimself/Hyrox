import { useEffect, useRef } from 'react';

import { WORKOUT_AUTOSAVE_DEBOUNCE_MS } from '../constants/storage-keys';
import { workoutDraftStorage } from '../services/workout-draft-storage';
import { useWorkoutLogStore } from '../store/workout-log-store';

/**
 * Debounced draft persistence — foundation for background autosave + sync later.
 */
export function useWorkoutAutosave(enabled = true) {
  const draft = useWorkoutLogStore((state) => state.draft);
  const isDirty = useWorkoutLogStore((state) => state.isDirty);
  const markClean = useWorkoutLogStore((state) => state.markClean);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled || !draft || !isDirty) {
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      void workoutDraftStorage.saveDraft(draft).then(() => {
        markClean();
      });
    }, WORKOUT_AUTOSAVE_DEBOUNCE_MS);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [draft, enabled, isDirty, markClean]);
}
