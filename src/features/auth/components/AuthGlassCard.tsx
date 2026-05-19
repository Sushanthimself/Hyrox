import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { BlurContainer } from '@/components/ui';
import { cn } from '@/utils';

type AuthGlassCardProps = PropsWithChildren<{
  className?: string;
}>;

export function AuthGlassCard({ children, className }: AuthGlassCardProps) {
  return (
    <Animated.View entering={FadeIn.duration(420).delay(220)}>
      <BlurContainer className={cn('border-border/20 bg-glass/20 p-5', className)} intensity={36}>
        <View className="gap-5">{children}</View>
      </BlurContainer>
    </Animated.View>
  );
}
