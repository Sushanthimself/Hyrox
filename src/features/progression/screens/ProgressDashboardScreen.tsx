import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui';

import { HybridScoreCard, RankProgressCard, StreakFlameBadge } from '../components';
import { useProgression } from '../hooks/useProgression';

export function ProgressDashboardScreen() {
  const { isReady, state } = useProgression();

  const insets = useSafeAreaInsets();

  if (!isReady || !state) {
    return (
      <View className="flex-1 bg-background justify-center items-center" style={{ paddingTop: insets.top }}>
        <Text tone="muted" variant="body">
          Loading progression…
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 120 }}
      >
        <View className="gap-2 pt-2 mb-6">
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

        <View 
          className="rounded-xl border p-4 mt-6"
          style={{ borderColor: 'rgba(255, 255, 255, 0.15)', backgroundColor: 'rgba(28, 28, 30, 0.5)' }}
        >
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
      </ScrollView>
    </View>
  );
}
