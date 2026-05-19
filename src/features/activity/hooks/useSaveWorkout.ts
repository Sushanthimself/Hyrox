import { useMutation, useQueryClient } from '@tanstack/react-query';

import { WORKOUT_QUERY_KEYS } from '../constants/query-keys';
import { workoutDraftStorage } from '../services/workout-draft-storage';
import { workoutService } from '../services/workout-service';
import { useWorkoutLogStore } from '../store/workout-log-store';
import type { WorkoutDraft } from '../types/workout';

export function useSaveWorkout() {
  const queryClient = useQueryClient();
  const clearDraft = useWorkoutLogStore((state) => state.clearDraft);

  return useMutation({
    mutationKey: [...WORKOUT_QUERY_KEYS.all, 'save'],
    mutationFn: (draft: WorkoutDraft) => workoutService.saveWorkout(draft),
    onSuccess: async () => {
      await workoutDraftStorage.clearDraft();
      clearDraft();
      void queryClient.invalidateQueries({ queryKey: WORKOUT_QUERY_KEYS.history });
    }
  });
}
