import { memo, type ReactNode } from 'react';
import Animated from 'react-native-reanimated';

import { Card } from '@/components/ui/Card';
import type { ComponentProps } from 'react';

import { enteringPresets } from '../constants/presets';
import { useFadeIn } from '../hooks/useFadeIn';
type MotionCardProps = ComponentProps<typeof Card> & {
  children: ReactNode;
  delayMs?: number;
  entering?: boolean;
  /** Use layout entering instead of imperative fade (lists). */
  useLayoutEntering?: boolean;
};

export const MotionCard = memo(function MotionCard({
  children,
  className,
  delayMs = 0,
  entering = true,
  useLayoutEntering = false,
  ...props
}: MotionCardProps) {
  const { animatedStyle: fadeStyle } = useFadeIn({ delayMs });

  if (useLayoutEntering && entering) {
    return (
      <Animated.View entering={enteringPresets.fadeUp.delay(delayMs)}>
        <Card className={className} {...props}>
          {children}
        </Card>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={entering ? fadeStyle : undefined}>
      <Card className={className} {...props}>
        {children}
      </Card>
    </Animated.View>
  );
});
