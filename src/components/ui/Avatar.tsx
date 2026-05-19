import { Image, View, type ImageSourcePropType, type ViewProps } from 'react-native';

import { cn } from '@/utils';

import { Text } from './Text';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

type AvatarProps = ViewProps & {
  fallback?: string;
  source?: ImageSourcePropType;
  size?: AvatarSize;
};

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-11 w-11',
  lg: 'h-14 w-14',
  xl: 'h-20 w-20'
};

const textSizeClasses: Record<AvatarSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-md',
  xl: 'text-xl'
};

export function Avatar({ className, fallback = 'SF', source, size = 'md', ...props }: AvatarProps) {
  const fallbackText = fallback.slice(0, 2).toUpperCase();

  return (
    <View
      className={cn(
        'items-center justify-center overflow-hidden rounded-full border border-border/15 bg-muted',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {source ? (
        <Image className="h-full w-full" resizeMode="cover" source={source} />
      ) : (
        <Text className={cn('font-bold', textSizeClasses[size])} tone="muted">
          {fallbackText}
        </Text>
      )}
    </View>
  );
}
