import React, { useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProgression } from '@/features/progression/hooks/useProgression';
import { HybridScoreCard } from '@/features/progression/components/HybridScoreCard';
import { RankProgressCard } from '@/features/progression/components/RankProgressCard';
import { StreakFlameBadge } from '@/features/progression/components/StreakFlameBadge';
import { Dumbbell, Activity, Timer } from 'lucide-react-native';

import { AthleteBanner, StatCard, ProfileSection, AchievementShowcase, EditProfileModal } from '../components';
import { AthleteProfile } from '../types';

// Mock data for initial presentation
const INITIAL_PROFILE: AthleteProfile = {
  id: 'current-user',
  username: 'hybrid_beast',
  displayName: 'Alex Mercer',
  bio: 'Building the ultimate hybrid engine. Run fast, lift heavy.',
  joinDate: 'Jan 2024',
  location: 'London, UK',
  totalWorkouts: 142,
  totalDistance: 450, // km
  followersCount: 1042,
  followingCount: 315,
  strongestLifts: [
    { id: '1', exerciseId: 'dl', exerciseName: 'Deadlift', weight: 180, unit: 'kg', dateAchieved: '2024-03-15' },
    { id: '2', exerciseId: 'sq', exerciseName: 'Squat', weight: 150, unit: 'kg', dateAchieved: '2024-02-10' }
  ]
};

export interface ProfileScreenProps {
  onSettingsPress?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onSettingsPress }) => {
  const insets = useSafeAreaInsets();
  const { state, isReady } = useProgression();
  const [profile, setProfile] = useState<AthleteProfile>(INITIAL_PROFILE);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  if (!isReady || !state) return null; // In production: Loading Skeleton

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2f80ff" />
        }
      >
        <AthleteBanner 
          profile={profile} 
          rank={state.rank as any} 
          isCurrentUser
          onEditPress={() => setIsEditModalVisible(true)}
          onSettingsPress={onSettingsPress}
        />

        <View className="px-4 flex-row items-center justify-between mb-8">
          <View className="flex-1 mr-4">
            <StreakFlameBadge 
              days={state.streak.currentDays}
            />
          </View>
          <View className="flex-1">
            <HybridScoreCard breakdown={state.hybridScore} />
          </View>
        </View>

        <ProfileSection title="Rank Progress" className="mb-6">
          <RankProgressCard 
            state={state} 
          />
        </ProfileSection>

        <ProfileSection title="Lifetime Stats">
          <View className="flex-row flex-wrap gap-4">
            <StatCard 
              title="Workouts"
              value={state.lifetimeWorkouts}
              subtitle="completed"
              icon={Activity}
              delay={100}
            />
            <StatCard 
              title="Distance"
              value={profile.totalDistance}
              subtitle="km"
              icon={Timer}
              iconColor="text-blue-500"
              delay={200}
            />
          </View>
          <View className="flex-row flex-wrap gap-4 mt-4">
            <StatCard 
              title="Max Deadlift"
              value={profile.strongestLifts[0].weight}
              subtitle={profile.strongestLifts[0].unit}
              icon={Dumbbell}
              iconColor="text-purple-500"
              delay={300}
            />
            <StatCard 
              title="Total XP"
              value={state.totalXp.toLocaleString()}
              icon={Activity}
              iconColor="text-yellow-500"
              delay={400}
            />
          </View>
        </ProfileSection>

        <ProfileSection title="Trophy Cabinet">
          <AchievementShowcase 
            unlockedIds={state.unlockedAchievementIds} 
          />
        </ProfileSection>
      </ScrollView>

      <EditProfileModal 
        visible={isEditModalVisible}
        profile={profile}
        onClose={() => setIsEditModalVisible(false)}
        onSave={(updates) => setProfile({ ...profile, ...updates })}
      />
    </View>
  );
};
