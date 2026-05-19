import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotionPressable } from '@/motion/components/MotionPressable';
import { useSlideReveal } from '@/motion';
import { MapPin, Calendar, Edit3, Settings } from 'lucide-react-native';
import Animated from 'react-native-reanimated';
import { AthleteProfile } from '../types';
import { RankTier } from '@/features/progression/types/progression';
import { StreakFlameBadge } from '@/features/progression/components/StreakFlameBadge';

interface AthleteBannerProps {
  profile: AthleteProfile;
  rank: RankTier;
  streakDays: number;
  isCurrentUser?: boolean;
  onEditPress?: () => void;
  onSettingsPress?: () => void;
}

const RANK_COLORS: Record<string, string> = {
  Open: '#B87333',
  Pro: '#C0C7D1',
  Elite: '#FFD166',
  Champion: '#FF3B5C'
};

export const AthleteBanner: React.FC<AthleteBannerProps> = ({
  profile,
  rank,
  streakDays,
  isCurrentUser,
  onEditPress,
  onSettingsPress
}) => {
  const { animatedStyle } = useSlideReveal({ axis: 'y', delayMs: 100 });
  
  // Default placeholder if no avatar
  const avatarSource = profile.avatarUrl 
    ? { uri: profile.avatarUrl } 
    : { uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.displayName)}&background=2f80ff&color=fff&size=200` };

  return (
    <Animated.View style={animatedStyle as any} className="mb-6">
      {/* Cover Image Area */}
      <View className="h-32 w-full bg-surface relative overflow-hidden rounded-b-3xl">
        {profile.coverUrl ? (
          <Image 
            source={{ uri: profile.coverUrl }} 
            className="w-full h-full opacity-60"
            resizeMode="cover"
          />
        ) : (
          <LinearGradient
            colors={['rgba(47,128,255,0.4)', 'rgba(10,10,10,1)']}
            className="w-full h-full"
          />
        )}
        
        {/* Settings button if current user */}
        {isCurrentUser && (
          <MotionPressable 
            className="absolute top-12 right-4 bg-black/40 p-2 rounded-full border border-white/10"
            onPress={onSettingsPress}
          >
            <Settings size={20} className="text-white" />
          </MotionPressable>
        )}
      </View>

      <View className="px-4 -mt-12 flex-row items-end justify-between">
        {/* Avatar */}
        <View className="relative">
          <View className="w-24 h-24 rounded-full border-4 border-background overflow-hidden bg-surface shadow-md">
            <Image 
              source={avatarSource}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          {/* Rank Badge Indicator */}
          <View 
            className="absolute -bottom-2 -right-4 min-w-[32px] w-auto px-2 h-8 rounded-full items-center justify-center border-2 border-background shadow-sm"
            style={{ backgroundColor: RANK_COLORS[rank.division] || '#2f80ff' }}
          >
            <Text className="text-white font-bold text-xs">
              {rank.label.split(' ')[0]}
            </Text>
          </View>
        </View>

        {/* Action Button */}
        {isCurrentUser ? (
          <MotionPressable 
            className="bg-surface border border-border px-4 py-2 rounded-full flex-row items-center mb-2"
            onPress={onEditPress}
          >
            <Edit3 size={16} className="text-foreground mr-2" />
            <Text className="text-foreground font-medium text-sm">Edit Profile</Text>
          </MotionPressable>
        ) : (
          <MotionPressable className="bg-primary px-6 py-2 rounded-full mb-2">
            <Text className="text-white font-bold text-sm">Follow</Text>
          </MotionPressable>
        )}
      </View>

      <View className="px-4 mt-3">
        <View className="flex-row items-center">
          <Text className="text-2xl font-bold text-foreground mr-2">
            {profile.displayName}
          </Text>
        </View>
        <Text className="text-muted-foreground text-sm font-medium mb-3">
          @{profile.username}
        </Text>

        {profile.bio && (
          <Text className="text-foreground text-sm mb-4 leading-5">
            {profile.bio}
          </Text>
        )}

        <View className="flex-row items-center flex-wrap gap-y-2 mb-4">
          {profile.location && (
            <View className="flex-row items-center mr-4">
              <MapPin size={14} className="text-muted-foreground mr-1" />
              <Text className="text-muted-foreground text-xs">{profile.location}</Text>
            </View>
          )}
          <View className="flex-row items-center">
            <Calendar size={14} className="text-muted-foreground mr-1" />
            <Text className="text-muted-foreground text-xs">Joined {profile.joinDate}</Text>
          </View>
        </View>

        {/* Stats & Streak Row */}
        <View className="flex-row items-center justify-between mt-4 border-t border-border/10 pt-4 mb-2">
          <View className="flex-row gap-6">
            <View className="flex-row gap-1">
              <Text className="text-foreground font-bold">{profile.followingCount}</Text>
              <Text className="text-muted-foreground">Following</Text>
            </View>
            <View className="flex-row gap-1">
              <Text className="text-foreground font-bold">{profile.followersCount}</Text>
              <Text className="text-muted-foreground">Followers</Text>
            </View>
          </View>
          <StreakFlameBadge days={streakDays} />
        </View>
      </View>
    </Animated.View>
  );
};
