import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { ProfileSectionProps } from '../types';
import { cn } from '@/utils/cn';

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  children,
  action,
  className
}) => {
  return (
    <View className={cn('mb-8', className)}>
      <View className="flex-row items-center justify-between mb-4 px-4">
        <Text className="text-xl font-bold text-foreground">{title}</Text>
        {action && (
          <TouchableOpacity 
            className="flex-row items-center" 
            onPress={action.onPress}
            activeOpacity={0.7}
          >
            <Text className="text-sm font-medium text-primary mr-1">
              {action.label}
            </Text>
            <ChevronRight size={16} className="text-primary" />
          </TouchableOpacity>
        )}
      </View>
      <View className="px-4">
        {children}
      </View>
    </View>
  );
};
