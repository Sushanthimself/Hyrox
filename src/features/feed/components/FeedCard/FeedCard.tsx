import { memo, type PropsWithChildren, type ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

import { BlurContainer } from '@/components/ui';
import { cn } from '@/utils';

import { FeedCardHeader } from './FeedCardHeader';

type FeedCardTone = 'accent' | 'danger' | 'neutral' | 'primary' | 'success' | 'warning';

type FeedCardProps = ViewProps &
  PropsWithChildren<{
    actions?: ReactNode;
    footer?: ReactNode;
    header: ReactNode;
    highlight?: boolean;
    tone?: FeedCardTone;
  }>;

const toneBorder: Record<FeedCardTone, string> = {
  accent: 'border-accent/25',
  danger: 'border-danger/25',
  neutral: 'border-border/15',
  primary: 'border-primary/25',
  success: 'border-success/25',
  warning: 'border-warning/25'
};

const toneGlow: Record<FeedCardTone, [string, string]> = {
  accent: ['rgba(182,255,59,0.18)', 'rgba(182,255,59,0)'],
  danger: ['rgba(255,59,92,0.16)', 'rgba(255,59,92,0)'],
  neutral: ['rgba(255,255,255,0.06)', 'rgba(255,255,255,0)'],
  primary: ['rgba(47,128,255,0.2)', 'rgba(47,128,255,0)'],
  success: ['rgba(80,220,120,0.16)', 'rgba(80,220,120,0)'],
  warning: ['rgba(255,176,32,0.16)', 'rgba(255,176,32,0)']
};

function FeedCardRoot({
  actions,
  children,
  className,
  footer,
  header,
  highlight = false,
  tone = 'neutral',
  ...props
}: FeedCardProps) {
  return (
    <View className={cn('overflow-hidden rounded-2xl', className)} {...props}>
      {highlight ? (
        <LinearGradient
          colors={toneGlow[tone]}
          end={{ x: 1, y: 1 }}
          start={{ x: 0, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      <BlurContainer className={cn('border bg-glass/15 p-4', toneBorder[tone])} intensity={32}>
        <View className="gap-3">
          {header}
          {children}
          {footer}
          {actions}
        </View>
      </BlurContainer>
    </View>
  );
}

function FeedCardBody({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <View className={cn('gap-2', className)}>{children}</View>;
}

function FeedCardMetrics({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <View className={cn('flex-row flex-wrap gap-2', className)}>
      {children}
    </View>
  );
}

function FeedCardMetric({ label, value }: { label: string; value: string }) {
  return (
    <View className="min-w-[30%] flex-1 rounded-lg border border-border/10 bg-surface/60 px-3 py-2">
      <FeedCardHeader.Meta tone="muted">{label}</FeedCardHeader.Meta>
      <FeedCardHeader.Meta className="font-bold text-foreground">{value}</FeedCardHeader.Meta>
    </View>
  );
}

export const FeedCard = Object.assign(memo(FeedCardRoot), {
  Body: memo(FeedCardBody),
  Header: FeedCardHeader,
  Metric: memo(FeedCardMetric),
  Metrics: memo(FeedCardMetrics)
});
