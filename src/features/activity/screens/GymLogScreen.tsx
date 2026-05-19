import { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useRouter, type Href } from 'expo-router';

import { Button, Input, Screen, Text } from '@/components/ui';
import { ROUTES } from '@/constants';

import { ExerciseBlock, GymVolumeBar } from '../components/gym';
import { LogScreenHeader } from '../components/LogScreenHeader';
import { FormSection } from '../components/forms/FormSection';
import { QuickChip } from '../components/forms/QuickChip';
import { useWorkoutAutosave } from '../hooks/useWorkoutAutosave';
import { useWorkoutDraftHydration } from '../hooks/useWorkoutDraftHydration';
import { gymLogActions, useWorkoutLogStore } from '../store/workout-log-store';
import type { WeightUnit } from '../types/workout';
import { validateGymPayload } from '../utils/validation';

const QUICK_EXERCISES = ['Back Squat', 'Sled Push', 'Row Erg', 'Wall Balls', 'Farmers Carry'];

export function GymLogScreen() {
  const router = useRouter();
  const draft = useWorkoutLogStore((state) => state.draft);
  const updateGym = useWorkoutLogStore((state) => state.updateGym);
  const startDraft = useWorkoutLogStore((state) => state.startDraft);
  const [exerciseName, setExerciseName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useWorkoutDraftHydration();
  useWorkoutAutosave();

  useEffect(() => {
    if (!draft || draft.mode !== 'gym' || !draft.gym) {
      startDraft('gym');
    }
  }, [draft, startDraft]);

  const payload = draft?.gym;
  const unit = payload?.weightUnit ?? 'kg';

  const ensureDraft = useCallback(() => {
    if (draft?.mode === 'gym' && draft.gym) {
      return draft;
    }

    return startDraft('gym');
  }, [draft, startDraft]);

  const handleAddExercise = useCallback(
    (name: string) => {
      const active = ensureDraft();
      if (!active.gym) {
        return;
      }

      updateGym(() => gymLogActions.addExercise(active.gym!, name));
      setExerciseName('');
    },
    [ensureDraft, updateGym]
  );

  const handleReview = useCallback(() => {
    if (!payload) {
      return;
    }

    const validation = validateGymPayload(payload);
    if (Object.keys(validation).length > 0) {
      setErrors(validation as Record<string, string>);
      return;
    }

    setErrors({});
    router.push(ROUTES.log.review as Href);
  }, [payload, router]);

  const lastSavedLabel = useMemo(() => {
    if (!draft?.updatedAt) {
      return 'Autosave ready';
    }

    return `Saved ${new Date(draft.updatedAt).toLocaleTimeString()}`;
  }, [draft?.updatedAt]);

  if (!payload) {
    return null;
  }

  return (
    <Screen
      scroll
      contentClassName="gap-4 pb-8"
      scrollProps={{ keyboardShouldPersistTaps: 'handled' }}
    >
      <LogScreenHeader
        onBack={() => router.back()}
        rightSlot={
          <Text className="text-right" tone="muted" variant="caption">
            {lastSavedLabel}
          </Text>
        }
        subtitle="Tap sets to complete · volume updates live"
        title="Gym log"
      />

      <GymVolumeBar payload={payload} />

      <View className="flex-row gap-2">
        {(['kg', 'lb'] as WeightUnit[]).map((value) => (
          <QuickChip
            active={unit === value}
            key={value}
            label={value.toUpperCase()}
            onPress={() => updateGym((current) => gymLogActions.setWeightUnit(current, value))}
          />
        ))}
      </View>

      <FormSection title="Add exercise">
        <View className="flex-row gap-2">
          <Input
            className="flex-1"
            onChangeText={setExerciseName}
            onSubmitEditing={() => handleAddExercise(exerciseName)}
            placeholder="Exercise name"
            returnKeyType="done"
            value={exerciseName}
          />
          <Button haptic="impact" onPress={() => handleAddExercise(exerciseName)} variant="primary">
            Add
          </Button>
        </View>
        <View className="flex-row flex-wrap gap-2">
          {QUICK_EXERCISES.map((name) => (
            <QuickChip key={name} label={name} onPress={() => handleAddExercise(name)} />
          ))}
        </View>
      </FormSection>

      {errors.exercises ? (
        <Text tone="danger" variant="caption">
          {errors.exercises}
        </Text>
      ) : null}
      {errors.sets ? (
        <Text tone="danger" variant="caption">
          {errors.sets}
        </Text>
      ) : null}

      <View className="gap-3">
        {payload.exercises.map((exercise, index) => (
          <ExerciseBlock
            exercise={exercise}
            index={index}
            key={exercise.id}
            onUpdatePayload={(updater) => updateGym(updater)}
            payload={payload}
            unit={unit}
          />
        ))}
      </View>

      <Button fullWidth className="mt-2" haptic="impact" onPress={handleReview} size="lg">
        Review workout
      </Button>
    </Screen>
  );
}
