/** Core workout modes — extend union when adding HYROX race simulations, etc. */
export type WorkoutMode = 'gym' | 'run';

export type WeightUnit = 'kg' | 'lb';

export type GymSet = {
  id: string;
  completed: boolean;
  reps: number;
  restSeconds?: number;
  weight: number;
};

export type GymExercise = {
  id: string;
  name: string;
  sets: GymSet[];
  /** Exercises sharing a group id are rendered and logged as a superset. */
  supersetGroupId: string | null;
};

export type GymWorkoutPayload = {
  exercises: GymExercise[];
  notes?: string;
  weightUnit: WeightUnit;
};

export type RunRoutePlaceholder = {
  label: string;
  routeId: string | null;
  status: 'none' | 'pending' | 'attached';
};

export type RunWorkoutPayload = {
  distanceMeters: number;
  durationSeconds: number;
  elevationGainMeters: number;
  notes?: string;
  /** Derived — stored for summary display and API handoff. */
  paceSecondsPerKm: number;
  route: RunRoutePlaceholder;
};

export type WorkoutDraft = {
  completedAt?: string;
  gym?: GymWorkoutPayload;
  id: string;
  mode: WorkoutMode;
  run?: RunWorkoutPayload;
  startedAt: string;
  title: string;
  updatedAt: string;
};

export type GymWorkoutSummary = {
  exerciseCount: number;
  mode: 'gym';
  setCount: number;
  supersetGroupCount: number;
  totalReps: number;
  totalVolume: number;
  weightUnit: WeightUnit;
};

export type RunWorkoutSummary = {
  distanceMeters: number;
  durationSeconds: number;
  elevationGainMeters: number;
  mode: 'run';
  paceLabel: string;
  paceSecondsPerKm: number;
};

export type WorkoutSummary = GymWorkoutSummary | RunWorkoutSummary;

export type SavedWorkout = WorkoutDraft & {
  completedAt: string;
  summary: WorkoutSummary;
  xpEarned: number;
};

export type SaveWorkoutInput = {
  draft: WorkoutDraft;
};
