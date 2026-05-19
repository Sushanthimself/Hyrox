import { memo, useMemo } from 'react';
import { View } from 'react-native';

import { Input, Text } from '@/components/ui';

import type { RunWorkoutPayload } from '../../types/workout';
import { formatDistance, formatDuration, formatPace } from '../../utils/pace';
import { FormSection } from '../forms/FormSection';
import { NumberStepper } from '../forms/NumberStepper';

type RunMetricsPanelProps = {
  errors?: { distance?: string; duration?: string };
  onChange: (patch: Partial<RunWorkoutPayload>) => void;
  payload: RunWorkoutPayload;
};

export const RunMetricsPanel = memo(function RunMetricsPanel({
  errors,
  onChange,
  payload
}: RunMetricsPanelProps) {
  const distanceKm = useMemo(() => (payload.distanceMeters / 1000).toFixed(2), [payload.distanceMeters]);
  const durationMinutes = useMemo(
    () => (payload.durationSeconds / 60).toFixed(1),
    [payload.durationSeconds]
  );

  return (
    <View className="gap-4">
      <FormSection description="Fast entry — pace updates live." title="Run metrics">
        <View className="flex-row gap-2">
          <View className="flex-1">
            <Input
              error={errors?.distance}
              keyboardType="decimal-pad"
              label="Distance (km)"
              onChangeText={(value) => {
                const parsed = Number.parseFloat(value.replace(',', '.'));
                onChange({
                  distanceMeters: Number.isFinite(parsed) ? Math.round(parsed * 1000) : 0
                });
              }}
              placeholder="5.00"
              value={distanceKm === '0.00' && payload.distanceMeters === 0 ? '' : distanceKm}
            />
          </View>
          <View className="flex-1">
            <Input
              error={errors?.duration}
              keyboardType="decimal-pad"
              label="Duration (min)"
              onChangeText={(value) => {
                const parsed = Number.parseFloat(value.replace(',', '.'));
                onChange({
                  durationSeconds: Number.isFinite(parsed) ? Math.round(parsed * 60) : 0
                });
              }}
              placeholder="24.5"
              value={
                durationMinutes === '0.0' && payload.durationSeconds === 0 ? '' : durationMinutes
              }
            />
          </View>
        </View>

        <NumberStepper
          label="Elevation gain (m)"
          onChange={(elevationGainMeters) => onChange({ elevationGainMeters })}
          step={5}
          value={payload.elevationGainMeters}
        />
      </FormSection>

      <View className="flex-row gap-2 rounded-xl border border-secondary/25 bg-secondary/10 p-3">
        <LiveStat label="Pace" value={formatPace(payload.paceSecondsPerKm)} />
        <LiveStat label="Distance" value={formatDistance(payload.distanceMeters)} />
        <LiveStat label="Time" value={formatDuration(payload.durationSeconds)} />
      </View>
    </View>
  );
});

function LiveStat({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-1 items-center gap-0.5">
      <Text tone="muted" variant="caption">
        {label}
      </Text>
      <Text className="font-bold" variant="bodyStrong">
        {value}
      </Text>
    </View>
  );
}
