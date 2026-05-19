import React from 'react';
import { View, Text } from 'react-native';
import { MotionCard } from '@/motion/components/MotionCard';
import { useFadeIn } from '@/motion';
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
  const animatedStyle = useFadeIn({ delay });

  return (
    <MotionCard 
      style={animatedStyle}
      variant="elevated" 
      className={cn('flex-1 p-4 items-start', className)}
    >
      <View className="flex-row items-center mb-2 w-full justify-between">
        <Text className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </Text>
        {Icon && (
          <View className="bg-surface p-1.5 rounded-md">
            <Icon size={14} className={iconColor} />
          </View>
        )}
      </View>
      <View className="items-baseline flex-row gap-1">
        <Text className="text-2xl font-bold text-foreground">
          {value}
        </Text>
        {subtitle && (
          <Text className="text-xs text-muted-foreground font-medium">
            {subtitle}
          </Text>
        )}
      </View>
    </MotionCard>
  );
};
