import { View, type ViewProps, type ViewStyle } from 'react-native';

import { getElevationStyle, type ElevationToken } from '@/theme';
import { cn } from '@/utils';

type CardVariant = 'elevated' | 'glass' | 'outlined' | 'surface';

type CardProps = ViewProps & {
  elevation?: ElevationToken;
  variant?: CardVariant;
};

const variantClasses: Record<CardVariant, string> = {
  elevated: 'border border-border/10 bg-card',
  glass: 'border border-border/15 bg-glass/10',
  outlined: 'border border-border/15 bg-transparent',
  surface: 'border border-border/10 bg-surface'
};

export function Card({
  children,
  className,
  elevation = 'md',
  style,
  variant = 'surface',
  ...props
}: CardProps) {
  return (
    <View
      className={cn('rounded-xl p-4', variantClasses[variant], className)}
      style={[getElevationStyle(elevation), style as ViewStyle]}
      {...props}
    >
      {children}
    </View>
  );
}
