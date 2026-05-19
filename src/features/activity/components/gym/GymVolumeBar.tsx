import { memo, useMemo } from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui';

import type { GymWorkoutPayload } from '../../types/workout';
import { calculateTotalVolume, countCompletedSets, countTotalReps, formatVolume } from '../../utils/volume';

type GymVolumeBarProps = {
  payload: GymWorkoutPayload;
};

export const GymVolumeBar = memo(function GymVolumeBar({ payload }: GymVolumeBarProps) {
  const stats = useMemo(
    () => ({
      sets: countCompletedSets(payload.exercises),
      reps: countTotalReps(payload.exercises),
      volume: calculateTotalVolume(payload.exercises)
    }),
    [payload.exercises]
  );

  return (
    <View className="flex-row gap-2 rounded-xl border border-primary/20 bg-primary/10 p-3">
      <Stat label="Volume" value={formatVolume(stats.volume, payload.weightUnit)} />
      <Stat label="Sets" value={String(stats.sets)} />
      <Stat label="Reps" value={String(stats.reps)} />
    </View>
  );
});

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 items-center gap-0.5">
      <Text tone="muted" variant="caption">
        {label}
      </Text>
      <Text className="font-bold tabular-nums" variant="bodyStrong">
        {value}
      </Text>
    </View>
  );
}
