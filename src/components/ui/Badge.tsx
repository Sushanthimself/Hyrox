import { View, type ViewProps } from 'react-native';

import { cn } from '@/utils';

import { Text } from './Text';

type BadgeVariant = 'accent' | 'danger' | 'neutral' | 'primary' | 'success' | 'warning';

type BadgeProps = ViewProps & {
  label: string;
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  accent: 'border-accent/25 bg-accent/15',
  danger: 'border-danger/25 bg-danger/15',
  neutral: 'border-border/15 bg-muted',
  primary: 'border-primary/25 bg-primary/15',
  success: 'border-success/25 bg-success/15',
  warning: 'border-warning/25 bg-warning/15'
};

const textClasses: Record<BadgeVariant, string> = {
  accent: 'text-accent',
  danger: 'text-danger',
  neutral: 'text-muted-foreground',
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning'
};

export function Badge({ className, label, variant = 'neutral', ...props }: BadgeProps) {
  return (
    <View
      className={cn(
        'self-start rounded-full border px-2.5 py-1',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <Text className={cn('text-xs font-semibold uppercase', textClasses[variant])}>{label}</Text>
    </View>
  );
}
