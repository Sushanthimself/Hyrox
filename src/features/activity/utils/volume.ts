import type { GymExercise, GymSet, WeightUnit } from '../types/workout';

export function calculateSetVolume(set: GymSet): number {
  if (!set.completed || set.reps <= 0 || set.weight <= 0) {
    return 0;
  }

  return set.reps * set.weight;
}

export function calculateExerciseVolume(exercise: GymExercise): number {
  return exercise.sets.reduce((total, set) => total + calculateSetVolume(set), 0);
}

export function calculateTotalVolume(exercises: GymExercise[]): number {
  return exercises.reduce((total, exercise) => total + calculateExerciseVolume(exercise), 0);
}

export function countCompletedSets(exercises: GymExercise[]): number {
  return exercises.reduce((total, exercise) => total + exercise.sets.filter((set) => set.completed).length, 0);
}

export function countTotalReps(exercises: GymExercise[]): number {
  return exercises.reduce(
    (total, exercise) =>
      total +
      exercise.sets.reduce((setTotal, set) => (set.completed ? setTotal + set.reps : setTotal), 0),
    0
  );
}

export function countSupersetGroups(exercises: GymExercise[]): number {
  const groups = new Set(
    exercises.map((exercise) => exercise.supersetGroupId).filter((id): id is string => Boolean(id))
  );
  return groups.size;
}

export function formatVolume(value: number, unit: WeightUnit): string {
  if (value >= 10_000) {
    return `${(value / 1000).toFixed(1)}k ${unit}`;
  }

  return `${Math.round(value).toLocaleString()} ${unit}`;
}
