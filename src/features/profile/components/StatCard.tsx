import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useFadeIn } from '@/motion';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { cn } from '@/utils/cn';
import { LucideIcon } from 'lucide-react-native';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  iconColor?: string;
  delay?: number;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-primary',
  delay = 0,
  className
 }) => {
  const { animatedStyle } = useFadeIn({ delayMs: delay });

  return (
    <Animated.View style={animatedStyle} className={className}>
      <Card variant="elevated" className="w-full p-4 items-start min-h-[95px] justify-between">
        <View className="flex-row items-center w-full justify-between mb-1">
          <Text className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            {title}
          </Text>
          {Icon && (
            <View className="bg-surface p-1 rounded-md">
              <Icon size={12} className={iconColor} />
            </View>
          )}
        </View>
        <View className="items-baseline flex-row gap-1 mt-2">
          <Text className="text-2xl font-black text-foreground tabular-nums">
            {value}
          </Text>
          {subtitle && (
            <Text className="text-xs text-muted-foreground font-semibold">
              {subtitle}
            </Text>
          )}
        </View>
      </Card>
    </Animated.View>
  );
};
