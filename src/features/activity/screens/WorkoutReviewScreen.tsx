import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useRouter, type Href } from 'expo-router';

import { Button, Input, Screen, Text } from '@/components/ui';
import { ROUTES } from '@/constants';

import { LogScreenHeader } from '../components/LogScreenHeader';
import { WorkoutSummaryCard } from '../components/summary/WorkoutSummaryCard';
import { useSaveWorkout } from '../hooks/useSaveWorkout';
import { useProcessProgressionEvent } from '@/features/progression/hooks/useProcessProgressionEvent';
import { useWorkoutLogStore } from '../store/workout-log-store';
import { buildSavedWorkout } from '../utils/summary';
import { validateWorkoutDraft } from '../utils/validation';

export function WorkoutReviewScreen() {
  const router = useRouter();
  const draft = useWorkoutLogStore((state) => state.draft);
  const updateDraft = useWorkoutLogStore((state) => state.updateDraft);
  const saveWorkout = useSaveWorkout();
  const { processWorkout } = useProcessProgressionEvent();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const preview = useMemo(() => (draft ? buildSavedWorkout(draft) : null), [draft]);

  if (!draft || !preview) {
    return null;
  }

  const handleSave = async () => {
    const validation = validateWorkoutDraft(draft);
    if (Object.keys(validation).length > 0) {
      setErrors(validation as Record<string, string>);
      return;
    }

    setErrors({});
    const saved = await saveWorkout.mutateAsync(draft);
    await processWorkout(saved);
    router.replace(ROUTES.tabs.record as Href);
  };

  return (
    <Screen scroll contentClassName="gap-4 pb-8">
      <LogScreenHeader
        onBack={() => router.back()}
        subtitle="Confirm details before posting to your log"
        title="Review"
      />

      <Input
        label="Workout title"
        onChangeText={(title) => updateDraft((current) => ({ ...current, title }))}
        value={draft.title}
      />

      <WorkoutSummaryCard workout={preview} />

      {Object.values(errors).map((message) => (
        <Text key={message} tone="danger" variant="caption">
          {message}
        </Text>
      ))}

      <View className="gap-3 pt-2">
        <Button fullWidth haptic="impact" loading={saveWorkout.isPending} onPress={handleSave} size="lg">
          Save workout
        </Button>
        <Button
          fullWidth
          onPress={() =>
            router.push((draft.mode === 'gym' ? ROUTES.log.gym : ROUTES.log.run) as Href)
          }
          variant="ghost"
        >
          Keep editing
        </Button>
      </View>
    </Screen>
  );
}
