import { memo, type ReactNode } from 'react';
import { Pressable, type PressableProps } from 'react-native';

import { Text } from '@/components/ui';
import { useMotionHaptics } from '@/motion';
import { cn } from '@/utils';

type FeedActionButtonProps = PressableProps & {
  active?: boolean;
  count?: number;
  icon: ReactNode;
  label: string;
};

export const FeedActionButton = memo(function FeedActionButton({
  active,
  className,
  count,
  disabled,
  icon,
  label,
  onPress,
  ...props
}: FeedActionButtonProps) {
  const haptics = useMotionHaptics();

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      className={cn(
        'flex-row items-center gap-1.5 rounded-full px-2.5 py-1.5',
        active && 'bg-primary/15',
        disabled && 'opacity-40',
        className
      )}
      disabled={disabled}
      onPress={(event) => {
        haptics.selection();
        onPress?.(event);
      }}
      {...props}
    >
      {icon}
      {typeof count === 'number' ? (
        <Text className="font-semibold tabular-nums" tone={active ? 'accent' : 'muted'} variant="caption">
          {count}
        </Text>
      ) : null}
    </Pressable>
  );
});
