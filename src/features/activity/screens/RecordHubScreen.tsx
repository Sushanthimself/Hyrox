import { useCallback } from 'react';
import { View } from 'react-native';
import { useRouter, type Href } from 'expo-router';
import { Dumbbell, Footprints } from 'lucide-react-native';

import { Button, Screen, Text } from '@/components/ui';
import { ROUTES } from '@/constants';
import { useTheme } from '@/theme';

import { WorkoutModeCard } from '../components/WorkoutModeCard';
import { useWorkoutDraftHydration } from '../hooks/useWorkoutDraftHydration';
import { useWorkoutLogStore } from '../store/workout-log-store';

export function RecordHubScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { isHydrated } = useWorkoutDraftHydration();
  const draft = useWorkoutLogStore((state) => state.draft);
  const startDraft = useWorkoutLogStore((state) => state.startDraft);

  const resumeDraft = useCallback(() => {
    if (!draft) {
      return;
    }

    if (draft.mode === 'gym') {
      router.push(ROUTES.log.gym as Href);
      return;
    }

    router.push(ROUTES.log.run as Href);
  }, [draft, router]);

  const startGym = useCallback(() => {
    startDraft('gym');
    router.push(ROUTES.log.gym as Href);
  }, [router, startDraft]);

  const startRun = useCallback(() => {
    startDraft('run');
    router.push(ROUTES.log.run as Href);
  }, [router, startDraft]);

  return (
    <Screen scroll contentClassName="gap-5 pb-8">
      <View className="gap-2 pt-2">
        <Text tone="accent" variant="overline">
          Record
        </Text>
        <Text variant="heading">Log it fast</Text>
        <Text className="leading-6" tone="muted" variant="body">
          Gym sets or outdoor runs — optimized for speed between stations.
        </Text>
      </View>

      {isHydrated && draft ? (
        <View className="gap-3 rounded-xl border border-warning/30 bg-warning/10 p-4">
          <Text variant="bodyStrong">Draft in progress</Text>
          <Text tone="muted" variant="caption">
            {draft.title} · last updated {new Date(draft.updatedAt).toLocaleTimeString()}
          </Text>
          <Button fullWidth onPress={resumeDraft} variant="secondary">
            Resume draft
          </Button>
        </View>
      ) : null}

      <WorkoutModeCard
        description="Exercises, sets, reps, weight, and supersets with live volume."
        icon={<Dumbbell color={theme.color.primary} size={24} />}
        onPress={startGym}
        title="Gym session"
      />
      <WorkoutModeCard
        description="Distance, duration, pace, elevation — route sync coming later."
        icon={<Footprints color={theme.color.accent} size={24} />}
        onPress={startRun}
        title="Run"
      />
    </Screen>
  );
}
