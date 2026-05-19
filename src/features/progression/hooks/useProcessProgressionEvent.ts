import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import type { SavedWorkout } from '@/features/activity/types/workout';

import { PROGRESSION_QUERY_KEYS } from '../constants';
import { progressionEventBus } from '../events/progression-event-bus';
import { progressionService } from '../services/progression-service';
import { useProgressionStore } from '../store/progression-store';
import type { ProgressionEvent } from '../types/progression';

export function useProcessProgressionEvent() {
  const queryClient = useQueryClient();
  const state = useProgressionStore((store) => store.state);
  const setState = useProgressionStore((store) => store.setState);
  const enqueueRewards = useProgressionStore((store) => store.enqueueRewards);

  const processWorkout = useCallback(
    async (workout: SavedWorkout) => {
      const current = state ?? (await progressionService.loadState());
      const result = await progressionService.applyWorkoutCompleted(current, workout);

      setState(result.state);
      enqueueRewards(result.rewards);
      progressionEventBus.emit(result);

      void queryClient.setQueryData(PROGRESSION_QUERY_KEYS.state, result.state);
      return result;
    },
    [enqueueRewards, queryClient, setState, state]
  );

  const processEvent = useCallback(
    async (event: ProgressionEvent) => {
      const current = state ?? (await progressionService.loadState());
      const result = progressionService.processEvent(current, event);

      await progressionService.saveState(result.state);
      setState(result.state);
      enqueueRewards(result.rewards);
      progressionEventBus.emit(result);

      void queryClient.setQueryData(PROGRESSION_QUERY_KEYS.state, result.state);
      return result;
    },
    [enqueueRewards, queryClient, setState, state]
  );

  return {
    processEvent,
    processWorkout
  };
}
