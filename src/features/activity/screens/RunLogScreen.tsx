import { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useRouter, type Href } from 'expo-router';

import { Button, Screen, Text } from '@/components/ui';
import { ROUTES } from '@/constants';

import { LogScreenHeader } from '../components/LogScreenHeader';
import { RoutePlaceholderCard, RunMetricsPanel } from '../components/run';
import { useWorkoutAutosave } from '../hooks/useWorkoutAutosave';
import { useWorkoutDraftHydration } from '../hooks/useWorkoutDraftHydration';
import { useWorkoutLogStore } from '../store/workout-log-store';
import { validateRunPayload } from '../utils/validation';

export function RunLogScreen() {
  const router = useRouter();
  const draft = useWorkoutLogStore((state) => state.draft);
  const updateRun = useWorkoutLogStore((state) => state.updateRun);
  const startDraft = useWorkoutLogStore((state) => state.startDraft);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useWorkoutDraftHydration();
  useWorkoutAutosave();

  useEffect(() => {
    if (!draft || draft.mode !== 'run' || !draft.run) {
      startDraft('run');
    }
  }, [draft, startDraft]);

  const payload = draft?.run;

  const ensureDraft = useCallback(() => {
    if (draft?.mode === 'run' && draft.run) {
      return draft;
    }

    return startDraft('run');
  }, [draft, startDraft]);

  const handleReview = useCallback(() => {
    if (!payload) {
      return;
    }

    const validation = validateRunPayload(payload);
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
        subtitle="Pace calculates as you type"
        title="Run log"
      />

      <RunMetricsPanel
        errors={errors}
        onChange={(patch) => updateRun((current) => ({ ...current, ...patch }))}
        payload={payload}
      />

      <RoutePlaceholderCard
        onAttachPlaceholder={() =>
          updateRun((current) => ({
            ...current,
            route: {
              ...current.route,
              status: 'pending',
              label: 'Route pending sync'
            }
          }))
        }
        route={payload.route}
      />

      <Button fullWidth className="mt-2" haptic="impact" onPress={handleReview} size="lg">
        Review run
      </Button>
    </Screen>
  );
}
