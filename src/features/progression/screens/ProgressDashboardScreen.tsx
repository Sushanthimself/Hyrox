import { View } from 'react-native';

import { Screen, Text } from '@/components/ui';

import { HybridScoreCard, RankProgressCard, StreakFlameBadge } from '../components';
import { useProgression } from '../hooks/useProgression';

export function ProgressDashboardScreen() {
  const { isReady, state } = useProgression();

  if (!isReady || !state) {
    return (
      <Screen>
        <Text tone="muted" variant="body">
          Loading progression…
        </Text>
      </Screen>
    );
  }

  return (
    <Screen scroll contentClassName="gap-4 pb-8">
      <View className="gap-2 pt-2">
        <Text tone="accent" variant="overline">
          Progression
        </Text>
        <Text variant="heading">Your competitive arc</Text>
        <Text className="leading-6" tone="muted" variant="body">
          XP, streaks, rank, and hybrid score — every session pushes the ladder.
        </Text>
      </View>

      <RankProgressCard state={state} />
      <StreakFlameBadge days={state.streak.currentDays} milestone={state.streak.currentDays >= 7} />
      <HybridScoreCard breakdown={state.hybridScore} />

      <View className="rounded-xl border border-border/15 bg-surface/50 p-4">
        <Text className="font-semibold" variant="bodyStrong">
          Achievements
        </Text>
        <Text className="mt-1" tone="muted" variant="caption">
          {state.unlockedAchievementIds.length} unlocked
        </Text>
        <Text className="mt-3 leading-5" tone="muted" variant="caption">
          {state.unlockedAchievementIds.length > 0
            ? state.unlockedAchievementIds.join(' · ')
            : 'Complete workouts to unlock your first badge.'}
        </Text>
      </View>
    </Screen>
  );
}
