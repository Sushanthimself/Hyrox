import { memo, type ReactNode } from 'react';
import { Pressable, type PressableProps } from 'react-native';
import Animated from 'react-native-reanimated';

import { usePressScale } from '../hooks/usePressScale';
import { useMotionHaptics, type MotionHapticEvent } from '../haptics/useMotionHaptics';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type MotionPressableProps = PressableProps & {
  children: ReactNode;
  haptic?: MotionHapticEvent | false;
};

export const MotionPressable = memo(function MotionPressable({
  children,
  disabled,
  haptic = 'press',
  onPress,
  onPressIn,
  onPressOut,
  ...props
}: MotionPressableProps) {
  const { animatedStyle, onPressIn: animateIn, onPressOut: animateOut } = usePressScale({
    disabled: Boolean(disabled)
  });
  const haptics = useMotionHaptics();

  return (
    <AnimatedPressable
      disabled={disabled}
      onPress={(event) => {
        if (haptic) {
          haptics.fire(haptic);
        }
        onPress?.(event);
      }}
      onPressIn={(event) => {
        animateIn();
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        animateOut();
        onPressOut?.(event);
      }}
      style={animatedStyle}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
});
