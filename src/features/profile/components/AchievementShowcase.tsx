import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { MotionCard } from '@/motion/components/MotionCard';
import { cn } from '@/utils/cn';
import { Award, Zap, Flame, Target, Star, TrendingUp } from 'lucide-react-native';
import { ACHIEVEMENT_DEFINITIONS } from '@/features/progression/constants/achievements';

interface AchievementShowcaseProps {
  unlockedIds: string[];
  className?: string;
}

const RARITY_COLORS = {
  common: 'text-zinc-400',
  rare: 'text-blue-400',
  epic: 'text-purple-400',
  legendary: 'text-yellow-400'
};

const RARITY_BG = {
  common: 'bg-zinc-500/10 border-zinc-500/20',
  rare: 'bg-blue-500/10 border-blue-500/20',
  epic: 'bg-purple-500/10 border-purple-500/20',
  legendary: 'bg-yellow-500/10 border-yellow-500/20'
};

const getIconForAchievement = (id: string) => {
  if (id.includes('streak')) return Flame;
  if (id.includes('blood')) return Target;
  if (id.includes('hybrid')) return Zap;
  if (id.includes('volume')) return TrendingUp;
  if (id.includes('road')) return Award;
  return Star;
};

export const AchievementShowcase: React.FC<AchievementShowcaseProps> = ({
  unlockedIds,
  className
}) => {


  if (unlockedIds.length === 0) {
    return (
      <View className="items-center justify-center py-6 bg-surface rounded-xl border border-border mx-4">
        <Award size={32} className="text-muted-foreground mb-2 opacity-50" />
        <Text className="text-muted-foreground font-medium">No achievements yet.</Text>
      </View>
    );
  }

  const unlockedAchievements = unlockedIds
    .map(id => ACHIEVEMENT_DEFINITIONS.find(a => a.id === id))
    .filter(Boolean) as typeof ACHIEVEMENT_DEFINITIONS;

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
      className={className}
    >
      {unlockedAchievements.map((achievement, index) => {
        const Icon = getIconForAchievement(achievement.id);
        const colorClass = RARITY_COLORS[achievement.rarity];
        const bgClass = RARITY_BG[achievement.rarity];

        return (
          <MotionCard 
            key={achievement.id}
            delayMs={index * 100 + 200}
            className={cn('w-40 p-4 items-center justify-center border', bgClass)}
          >
            <View className={cn("p-3 rounded-full bg-background/50 mb-3", colorClass)}>
              <Icon size={24} className={colorClass} />
            </View>
            <Text className="text-foreground font-bold text-center mb-1 text-sm">
              {achievement.title}
            </Text>
            <Text 
              className="text-muted-foreground text-center text-xs"
              numberOfLines={2}
            >
              {achievement.description}
            </Text>
          </MotionCard>
        );
      })}
    </ScrollView>
  );
};
