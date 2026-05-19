import { memo } from 'react';
import { Pressable } from 'react-native';

import { Text } from '@/components/ui';
import { useMotionHaptics } from '@/motion';
import { cn } from '@/utils';

type QuickChipProps = {
  active?: boolean;
  label: string;
  onPress: () => void;
};

export const QuickChip = memo(function QuickChip({ active, label, onPress }: QuickChipProps) {
  const haptics = useMotionHaptics();

  return (
    <Pressable
      className={cn(
        'rounded-full border px-3 py-1.5',
        active ? 'border-accent/40 bg-accent/15' : 'border-border/15 bg-surface/50'
      )}
      onPress={() => {
        haptics.selection();
        onPress();
      }}
    >
      <Text className="font-semibold" tone={active ? 'accent' : 'muted'} variant="caption">
        {label}
      </Text>
    </Pressable>
  );
});
