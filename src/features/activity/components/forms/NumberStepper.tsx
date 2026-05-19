import { memo } from 'react';
import { Pressable, View } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';

import { Text } from '@/components/ui';
import { useMotionHaptics } from '@/motion';
import { useTheme } from '@/theme';
import { cn } from '@/utils';

type NumberStepperProps = {
  className?: string;
  label?: string;
  onChange: (value: number) => void;
  step?: number;
  suffix?: string;
  value: number;
};

export const NumberStepper = memo(function NumberStepper({
  className,
  label,
  onChange,
  step = 1,
  suffix,
  value
}: NumberStepperProps) {
  const { theme } = useTheme();
  const haptics = useMotionHaptics();

  const adjust = (delta: number) => {
    haptics.selection();
    onChange(Math.max(0, value + delta));
  };

  return (
    <View className={cn('gap-1', className)}>
      {label ? (
        <Text tone="muted" variant="caption">
          {label}
        </Text>
      ) : null}
      <View className="flex-row items-center justify-between rounded-lg border border-border/15 bg-surface/70 px-2 py-1">
        <Pressable
          accessibilityLabel={`Decrease ${label ?? 'value'}`}
          className="h-9 w-9 items-center justify-center rounded-md bg-muted/40"
          onPress={() => adjust(-step)}
        >
          <Minus color={theme.color.foreground} size={16} />
        </Pressable>
        <Text className="min-w-12 text-center font-bold tabular-nums" variant="bodyStrong">
          {value}
          {suffix ? ` ${suffix}` : ''}
        </Text>
        <Pressable
          accessibilityLabel={`Increase ${label ?? 'value'}`}
          className="h-9 w-9 items-center justify-center rounded-md bg-primary/20"
          onPress={() => adjust(step)}
        >
          <Plus color={theme.color.primary} size={16} />
        </Pressable>
      </View>
    </View>
  );
});
