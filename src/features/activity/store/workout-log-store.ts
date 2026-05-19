import { create } from 'zustand';

import type { GymExercise, GymSet, GymWorkoutPayload, RunWorkoutPayload, WeightUnit, WorkoutDraft, WorkoutMode } from '../types/workout';
import { createWorkoutId } from '../utils/id';
import { calculatePaceSecondsPerKm } from '../utils/pace';

type WorkoutLogState = {
  draft: WorkoutDraft | null;
  isDirty: boolean;
  isHydrated: boolean;
  lastSavedAt: string | null;
};

type WorkoutLogActions = {
  clearDraft: () => void;
  hydrateDraft: (draft: WorkoutDraft | null) => void;
  markClean: () => void;
  startDraft: (mode: WorkoutMode, title?: string) => WorkoutDraft;
  updateDraft: (updater: (draft: WorkoutDraft) => WorkoutDraft) => void;
  updateGym: (updater: (payload: GymWorkoutPayload) => GymWorkoutPayload) => void;
  updateRun: (updater: (payload: RunWorkoutPayload) => RunWorkoutPayload) => void;
};

export type WorkoutLogStore = WorkoutLogState & WorkoutLogActions;

const createEmptyGymPayload = (): GymWorkoutPayload => ({
  exercises: [],
  weightUnit: 'kg'
});

const createEmptyRunPayload = (): RunWorkoutPayload => ({
  distanceMeters: 0,
  durationSeconds: 0,
  elevationGainMeters: 0,
  paceSecondsPerKm: 0,
  route: {
    label: 'Route sync coming soon',
    routeId: null,
    status: 'pending'
  }
});

function stampDraft(draft: WorkoutDraft): WorkoutDraft {
  return {
    ...draft,
    updatedAt: new Date().toISOString()
  };
}

export const useWorkoutLogStore = create<WorkoutLogStore>((set, get) => ({
  draft: null,
  isDirty: false,
  isHydrated: false,
  lastSavedAt: null,

  clearDraft: () => {
    set({ draft: null, isDirty: false, lastSavedAt: null });
  },

  hydrateDraft: (draft) => {
    set({ draft, isDirty: false, isHydrated: true, lastSavedAt: draft?.updatedAt ?? null });
  },

  markClean: () => {
    const draft = get().draft;
    set({ isDirty: false, lastSavedAt: draft?.updatedAt ?? null });
  },

  startDraft: (mode, title) => {
    const now = new Date().toISOString();
    const draft: WorkoutDraft = stampDraft({
      id: createWorkoutId(),
      mode,
      title: title ?? (mode === 'gym' ? 'Gym session' : 'Run'),
      startedAt: now,
      updatedAt: now,
      gym: mode === 'gym' ? createEmptyGymPayload() : undefined,
      run: mode === 'run' ? createEmptyRunPayload() : undefined
    });

    set({ draft, isDirty: true, isHydrated: true });
    return draft;
  },

  updateDraft: (updater) => {
    const current = get().draft;
    if (!current) {
      return;
    }

    set({ draft: stampDraft(updater(current)), isDirty: true });
  },

  updateGym: (updater) => {
    get().updateDraft((draft) => {
      if (!draft.gym) {
        return draft;
      }

      return {
        ...draft,
        gym: updater(draft.gym)
      };
    });
  },

  updateRun: (updater) => {
    get().updateDraft((draft) => {
      if (!draft.run) {
        return draft;
      }

      const next = updater(draft.run);
      const paceSecondsPerKm = calculatePaceSecondsPerKm(next.distanceMeters, next.durationSeconds);

      return {
        ...draft,
        run: {
          ...next,
          paceSecondsPerKm
        }
      };
    });
  }
}));

/** Gym mutation helpers — keep components thin. */
export const gymLogActions = {
  addExercise(payload: GymWorkoutPayload, name: string): GymWorkoutPayload {
    const exercise: GymExercise = {
      id: createWorkoutId('ex'),
      name: name.trim() || 'Exercise',
      supersetGroupId: null,
      sets: [
        {
          id: createWorkoutId('set'),
          reps: 8,
          weight: 0,
          completed: false
        }
      ]
    };

    return {
      ...payload,
      exercises: [...payload.exercises, exercise]
    };
  },

  removeExercise(payload: GymWorkoutPayload, exerciseId: string): GymWorkoutPayload {
    return {
      ...payload,
      exercises: payload.exercises.filter((exercise) => exercise.id !== exerciseId)
    };
  },

  addSet(payload: GymWorkoutPayload, exerciseId: string): GymWorkoutPayload {
    return {
      ...payload,
      exercises: payload.exercises.map((exercise) => {
        if (exercise.id !== exerciseId) {
          return exercise;
        }

        const last = exercise.sets[exercise.sets.length - 1];
        const nextSet: GymSet = {
          id: createWorkoutId('set'),
          reps: last?.reps ?? 8,
          weight: last?.weight ?? 0,
          completed: false
        };

        return {
          ...exercise,
          sets: [...exercise.sets, nextSet]
        };
      })
    };
  },

  updateSet(
    payload: GymWorkoutPayload,
    exerciseId: string,
    setId: string,
    patch: Partial<GymSet>
  ): GymWorkoutPayload {
    return {
      ...payload,
      exercises: payload.exercises.map((exercise) =>
        exercise.id !== exerciseId
          ? exercise
          : {
              ...exercise,
              sets: exercise.sets.map((set) => (set.id === setId ? { ...set, ...patch } : set))
            }
      )
    };
  },

  toggleSuperset(
    payload: GymWorkoutPayload,
    exerciseId: string,
    partnerExerciseId?: string
  ): GymWorkoutPayload {
    const target = payload.exercises.find((exercise) => exercise.id === exerciseId);
    if (!target) {
      return payload;
    }

    if (target.supersetGroupId) {
      const groupId = target.supersetGroupId;
      return {
        ...payload,
        exercises: payload.exercises.map((exercise) =>
          exercise.supersetGroupId === groupId
            ? { ...exercise, supersetGroupId: null }
            : exercise
        )
      };
    }

    const groupId = createWorkoutId('ss');
    return {
      ...payload,
      exercises: payload.exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return { ...exercise, supersetGroupId: groupId };
        }

        if (partnerExerciseId && exercise.id === partnerExerciseId) {
          return { ...exercise, supersetGroupId: groupId };
        }

        return exercise;
      })
    };
  },

  setWeightUnit(payload: GymWorkoutPayload, unit: WeightUnit): GymWorkoutPayload {
    return { ...payload, weightUnit: unit };
  }
};
