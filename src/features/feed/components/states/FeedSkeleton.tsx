import { memo } from 'react';
import { View } from 'react-native';

import { MotionShimmer } from '@/motion';
import { cn } from '@/utils';

type FeedSkeletonProps = {
  className?: string;
  count?: number;
};

function FeedSkeletonRow() {
  return (
    <View className="gap-3 rounded-2xl border border-border/10 bg-surface/40 p-4">
      <View className="flex-row gap-3">
        <MotionShimmer className="h-11 w-11 rounded-full" />
        <View className="flex-1 gap-2">
          <MotionShimmer className="h-4 w-2/5" />
          <MotionShimmer className="h-3 w-1/4" />
        </View>
      </View>
      <MotionShimmer className="h-5 w-4/5" />
      <MotionShimmer className="h-4 w-full" />
      <View className="flex-row gap-2">
        <MotionShimmer className="h-10 flex-1 rounded-lg" />
        <MotionShimmer className="h-10 flex-1 rounded-lg" />
        <MotionShimmer className="h-10 flex-1 rounded-lg" />
      </View>
    </View>
  );
}

export const FeedSkeleton = memo(function FeedSkeleton({ className, count = 4 }: FeedSkeletonProps) {
  return (
    <View className={cn('gap-4', className)}>
      {Array.from({ length: count }, (_, index) => (
        <FeedSkeletonRow key={`feed-skeleton-${index}`} />
      ))}
    </View>
  );
});
