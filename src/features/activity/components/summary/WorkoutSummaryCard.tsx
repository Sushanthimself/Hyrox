import { memo } from 'react';
import { View } from 'react-native';

import { Badge, Text } from '@/components/ui';
import { MotionCard } from '@/motion';

import type { SavedWorkout, WorkoutSummary } from '../../types/workout';
import { formatDistance, formatDuration } from '../../utils/pace';
import { formatVolume } from '../../utils/volume';

type WorkoutSummaryCardProps = {
  title?: string;
  workout: SavedWorkout | { summary: WorkoutSummary; title: string; xpEarned?: number };
};

export const WorkoutSummaryCard = memo(function WorkoutSummaryCard({
  title,
  workout
}: WorkoutSummaryCardProps) {
  const { summary } = workout;

  return (
    <MotionCard className="border-primary/20" useLayoutEntering>
      <View className="gap-3">
        <View className="flex-row items-center justify-between gap-2">
          <Text variant="title">{title ?? workout.title}</Text>
          <Badge
            label={summary.mode === 'gym' ? 'Gym' : 'Run'}
            variant={summary.mode === 'gym' ? 'primary' : 'accent'}
          />
        </View>

        {summary.mode === 'gym' ? (
          <View className="flex-row flex-wrap gap-2">
            <Metric label="Volume" value={formatVolume(summary.totalVolume, summary.weightUnit)} />
            <Metric label="Sets" value={String(summary.setCount)} />
            <Metric label="Reps" value={String(summary.totalReps)} />
            {summary.supersetGroupCount > 0 ? (
              <Metric label="Supersets" value={String(summary.supersetGroupCount)} />
            ) : null}
          </View>
        ) : (
          <View className="flex-row flex-wrap gap-2">
            <Metric label="Distance" value={formatDistance(summary.distanceMeters)} />
            <Metric label="Duration" value={formatDuration(summary.durationSeconds)} />
            <Metric label="Pace" value={summary.paceLabel} />
            <Metric label="Elev." value={`${summary.elevationGainMeters} m`} />
          </View>
        )}

        {'xpEarned' in workout && workout.xpEarned ? (
          <Text className="font-bold" tone="accent" variant="bodyStrong">
            +{workout.xpEarned} XP earned
          </Text>
        ) : null}
      </View>
    </MotionCard>
  );
});

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View className="min-w-[44%] flex-1 rounded-lg border border-border/10 bg-surface/50 px-3 py-2">
      <Text tone="muted" variant="caption">
        {label}
      </Text>
      <Text className="font-bold" variant="bodyStrong">
        {value}
      </Text>
    </View>
  );
}
