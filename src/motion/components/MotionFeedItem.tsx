import { memo, type ReactNode } from 'react';
import { type ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';

import { cn } from '@/utils';

import { useStagger } from '../hooks/useStagger';
import { usePressScale } from '../hooks/usePressScale';

type MotionFeedItemProps = ViewProps & {
  children: ReactNode;
  index: number;
  interactive?: boolean;
  staggerMs?: number;
  variant?: 'fadeUp' | 'slideRight';
};

/**
 * Feed row with staggered entrance and optional press depth.
 */
export const MotionFeedItem = memo(function MotionFeedItem({
  children,
  className,
  index,
  interactive = true,
  staggerMs,
  variant = 'fadeUp',
  ...props
}: MotionFeedItemProps) {
  const { entering } = useStagger(index, { staggerMs, variant });
  const { animatedStyle, onPressIn, onPressOut } = usePressScale({ disabled: !interactive });

  return (
    <Animated.View
      className={cn('rounded-xl', className)}
      entering={entering}
      onStartShouldSetResponder={interactive ? () => true : undefined}
      onResponderGrant={interactive ? onPressIn : undefined}
      onResponderRelease={interactive ? onPressOut : undefined}
      style={interactive ? animatedStyle : undefined}
      {...props}
    >
      {children}
    </Animated.View>
  );
});
