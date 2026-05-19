import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotionPressable } from '@/motion/components/MotionPressable';
import { useSlideReveal } from '@/motion';
import { MapPin, Calendar, Edit3, Settings } from 'lucide-react-native';
import { AthleteProfile } from '../types';
import { RANK_DEFINITIONS, UserRank } from '@/features/progression/constants/ranks';

interface AthleteBannerProps {
  profile: AthleteProfile;
  rank: UserRank;
  isCurrentUser?: boolean;
  onEditPress?: () => void;
  onSettingsPress?: () => void;
}

export const AthleteBanner: React.FC<AthleteBannerProps> = ({
  profile,
  rank,
  isCurrentUser,
  onEditPress,
  onSettingsPress
}) => {
  const animatedStyle = useSlideReveal({ direction: 'down', delay: 100 });
  
  // Default placeholder if no avatar
  const avatarSource = profile.avatarUrl 
    ? { uri: profile.avatarUrl } 
    : { uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.displayName)}&background=2f80ff&color=fff&size=200` };

  return (
    <View style={animatedStyle} className="mb-6">
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
            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full items-center justify-center border-2 border-background shadow-sm"
            style={{ backgroundColor: rank.color }}
          >
            <Text className="text-white font-bold text-xs">
              {rank.level}
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

        <View className="flex-row items-center pt-3 border-t border-border">
          <View className="mr-6 flex-row items-baseline">
            <Text className="text-foreground font-bold text-lg mr-1">{profile.followingCount}</Text>
            <Text className="text-muted-foreground text-sm">Following</Text>
          </View>
          <View className="flex-row items-baseline">
            <Text className="text-foreground font-bold text-lg mr-1">{profile.followersCount}</Text>
            <Text className="text-muted-foreground text-sm">Followers</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
