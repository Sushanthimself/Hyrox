import { useCallback, type ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  type GestureResponderEvent,
  type PressableProps
} from 'react-native';
import * as Haptics from 'expo-haptics';
import Animated from 'react-native-reanimated';

import { useHapticFeedback } from '@/hooks';
import { useTheme } from '@/theme';
import { usePressScale } from '@/motion';
import { cn } from '@/utils';

import { Text } from './Text';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'accent' | 'danger' | 'ghost' | 'primary' | 'secondary';

type ButtonProps = PressableProps & {
  children: ReactNode;
  fullWidth?: boolean;
  haptic?: false | 'impact' | 'selection';
  loading?: boolean;
  size?: ButtonSize;
  textClassName?: string;
  variant?: ButtonVariant;
};

const baseClassName =
  'flex-row items-center justify-center gap-2 rounded-md border active:opacity-90';

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-10 px-3',
  md: 'h-12 px-5',
  lg: 'h-14 px-6'
};

const variantClasses: Record<ButtonVariant, string> = {
  accent: 'border-accent/40 bg-accent',
  danger: 'border-danger/40 bg-danger',
  ghost: 'border-border/15 bg-transparent',
  primary: 'border-primary/40 bg-primary',
  secondary: 'border-secondary/30 bg-secondary/15'
};

const textClasses: Record<ButtonVariant, string> = {
  accent: 'text-accent-foreground',
  danger: 'text-danger-foreground',
  ghost: 'text-foreground',
  primary: 'text-primary-foreground',
  secondary: 'text-secondary'
};

export function Button({
  children,
  className,
  disabled,
  fullWidth,
  haptic = 'selection',
  loading,
  onPress,
  size = 'md',
  textClassName,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const { theme } = useTheme();
  const { impact, selection } = useHapticFeedback();
  const isDisabled = Boolean(disabled || loading);
  const { animatedStyle, onPressIn, onPressOut } = usePressScale({ disabled: isDisabled });
  const indicatorColor = {
    accent: theme.color.accentForeground,
    danger: theme.color.dangerForeground,
    ghost: theme.color.foreground,
    primary: theme.color.primaryForeground,
    secondary: theme.color.secondary
  }[variant];

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (isDisabled) {
        return;
      }

      if (haptic === 'selection') {
        selection();
      }

      if (haptic === 'impact') {
        impact(Haptics.ImpactFeedbackStyle.Light);
      }

      onPress?.(event);
    },
    [haptic, impact, isDisabled, onPress, selection]
  );

  return (
    <AnimatedPressable
      accessibilityRole="button"
      className={cn(
        baseClassName,
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && 'w-full',
        isDisabled && 'opacity-50',
        className
      )}
      disabled={isDisabled}
      onPress={handlePress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={animatedStyle}
      {...props}
    >
      {loading ? <ActivityIndicator color={indicatorColor} /> : null}
      <Text className={cn('font-bold', textClasses[variant], textClassName)}>{children}</Text>
    </AnimatedPressable>
  );
}
