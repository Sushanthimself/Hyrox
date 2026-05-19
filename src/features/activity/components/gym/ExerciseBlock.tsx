import { memo } from 'react';
import { Pressable, View } from 'react-native';
import { Link2, Trash2 } from 'lucide-react-native';

import { Input, Text } from '@/components/ui';
import { BlurContainer } from '@/components/ui/BlurContainer';
import { useTheme } from '@/theme';

import type { GymExercise, GymWorkoutPayload, WeightUnit } from '../../types/workout';
import { gymLogActions } from '../../store/workout-log-store';
import { FormSection } from '../forms/FormSection';
import { SetRow } from './SetRow';

type ExerciseBlockProps = {
  exercise: GymExercise;
  index: number;
  onUpdatePayload: (updater: (payload: GymWorkoutPayload) => GymWorkoutPayload) => void;
  payload: GymWorkoutPayload;
  unit: WeightUnit;
};

export const ExerciseBlock = memo(function ExerciseBlock({
  exercise,
  index,
  onUpdatePayload,
  payload,
  unit
}: ExerciseBlockProps) {
  const { theme } = useTheme();
  const isSuperset = Boolean(exercise.supersetGroupId);
  const nextExercise = payload.exercises[index + 1];

  return (
    <BlurContainer
      className={isSuperset ? 'border-accent/30 bg-accent/5' : 'border-border/15'}
      intensity={24}
    >
      <View className="gap-3 p-3">
        <View className="flex-row items-center gap-2">
          <Input
            className="flex-1"
            onChangeText={(name) =>
              onUpdatePayload((current) => ({
                ...current,
                exercises: current.exercises.map((item) =>
                  item.id === exercise.id ? { ...item, name } : item
                )
              }))
            }
            placeholder="Exercise name"
            value={exercise.name}
          />
          <Pressable
            accessibilityLabel="Toggle superset"
            className="h-12 w-12 items-center justify-center rounded-md border border-border/15 bg-surface/60"
            onPress={() =>
              onUpdatePayload((current) =>
                gymLogActions.toggleSuperset(current, exercise.id, nextExercise?.id)
              )
            }
          >
            <Link2 color={isSuperset ? theme.color.accent : theme.color.mutedForeground} size={18} />
          </Pressable>
          <Pressable
            accessibilityLabel="Remove exercise"
            className="h-12 w-12 items-center justify-center rounded-md border border-danger/20 bg-danger/10"
            onPress={() =>
              onUpdatePayload((current) => gymLogActions.removeExercise(current, exercise.id))
            }
          >
            <Trash2 color={theme.color.danger} size={18} />
          </Pressable>
        </View>

        {isSuperset ? (
          <Text tone="accent" variant="caption">
            Superset group · {exercise.supersetGroupId?.slice(-4)}
          </Text>
        ) : null}

        <FormSection title="Sets">
          <View className="gap-2">
            {exercise.sets.map((set, setIndex) => (
              <SetRow
                index={setIndex}
                key={set.id}
                onChange={(patch) =>
                  onUpdatePayload((current) =>
                    gymLogActions.updateSet(current, exercise.id, set.id, patch)
                  )
                }
                set={set}
                unit={unit}
              />
            ))}
          </View>
        </FormSection>

        <Pressable
          className="self-start rounded-md border border-primary/30 bg-primary/10 px-3 py-2"
          onPress={() =>
            onUpdatePayload((current) => gymLogActions.addSet(current, exercise.id))
          }
        >
          <Text className="font-bold" tone="accent" variant="caption">
            + Add set
          </Text>
        </Pressable>
      </View>
    </BlurContainer>
  );
});
