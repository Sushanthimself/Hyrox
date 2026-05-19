import { memo, type ReactNode } from 'react';
import { ActivityIndicator, Pressable, type PressableProps } from 'react-native';
import Animated from 'react-native-reanimated';

import { Text } from '@/components/ui/Text';
import { cn } from '@/utils';

import { usePressScale } from '../hooks/usePressScale';
import { useMotionHaptics, type MotionHapticEvent } from '../haptics/useMotionHaptics';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type MotionButtonProps = PressableProps & {
  children: ReactNode;
  fullWidth?: boolean;
  haptic?: MotionHapticEvent | false;
  loading?: boolean;
  textClassName?: string;
  variantClassName?: string;
};

/**
 * Lightweight animated pressable — use when you need motion without full Button styling.
 */
export const MotionButton = memo(function MotionButton({
  children,
  className,
  disabled,
  fullWidth,
  haptic = 'press',
  loading,
  onPress,
  onPressIn,
  onPressOut,
  textClassName,
  variantClassName,
  ...props
}: MotionButtonProps) {
  const isDisabled = Boolean(disabled || loading);
  const { animatedStyle, onPressIn: scaleIn, onPressOut: scaleOut } = usePressScale({
    disabled: isDisabled
  });
  const haptics = useMotionHaptics();

  return (
    <AnimatedPressable
      accessibilityRole="button"
      className={cn(
        'flex-row items-center justify-center gap-2 rounded-md border px-5 h-12',
        variantClassName,
        fullWidth && 'w-full',
        isDisabled && 'opacity-50',
        className
      )}
      disabled={isDisabled}
      onPress={(event) => {
        if (haptic) {
          haptics.fire(haptic);
        }
        onPress?.(event);
      }}
      onPressIn={(event) => {
        scaleIn();
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        scaleOut();
        onPressOut?.(event);
      }}
      style={animatedStyle}
      {...props}
    >
      {loading ? <ActivityIndicator /> : null}
      <Text className={cn('font-bold', textClassName)}>{children}</Text>
    </AnimatedPressable>
  );
});
