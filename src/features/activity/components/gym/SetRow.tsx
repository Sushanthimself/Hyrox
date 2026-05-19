import { memo } from 'react';
import { Pressable, View } from 'react-native';
import { Check } from 'lucide-react-native';

import { Text } from '@/components/ui';
import { useTheme } from '@/theme';
import { cn } from '@/utils';

import { NumberStepper } from '../forms/NumberStepper';
import type { GymSet, WeightUnit } from '../../types/workout';

type SetRowProps = {
  index: number;
  onChange: (patch: Partial<GymSet>) => void;
  set: GymSet;
  unit: WeightUnit;
};

export const SetRow = memo(function SetRow({ index, onChange, set, unit }: SetRowProps) {
  const { theme } = useTheme();

  return (
    <View className="flex-row items-center gap-2">
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: set.completed }}
        className={cn(
          'h-9 w-9 items-center justify-center rounded-md border',
          set.completed ? 'border-success/40 bg-success/20' : 'border-border/15 bg-surface/60'
        )}
        onPress={() => onChange({ completed: !set.completed })}
      >
        {set.completed ? <Check color={theme.color.success} size={16} /> : null}
      </Pressable>

      <Text className="w-6 text-center font-bold" tone="muted" variant="caption">
        {index + 1}
      </Text>

      <View className="flex-1 flex-row gap-2">
        <NumberStepper
          className="flex-1"
          label="Reps"
          onChange={(reps) => onChange({ reps })}
          step={1}
          value={set.reps}
        />
        <NumberStepper
          className="flex-1"
          label={unit.toUpperCase()}
          onChange={(weight) => onChange({ weight })}
          step={unit === 'kg' ? 2.5 : 5}
          value={set.weight}
        />
      </View>
    </View>
  );
});
