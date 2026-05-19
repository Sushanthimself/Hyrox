import React, { useState, useMemo } from 'react';
import { View, ScrollView, TextInput, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, Trophy, Crown, Sparkles, Flame } from 'lucide-react-native';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';

import { Card, Text } from '@/components/ui';
import { useProgression } from '@/features/progression/hooks/useProgression';
import { cn } from '@/utils';

// Rich set of hybrid athletes in various divisions
const ALL_ATHLETES = [
  { rank: 1, name: 'Hunter McIntyre', score: 982, division: 'Elite', streak: 45, avatar: 'HM', isFriend: false, isCurrentUser: false },
  { rank: 2, name: 'Lauren Weeks', score: 955, division: 'Elite', streak: 32, avatar: 'LW', isFriend: true, isCurrentUser: false },
  { rank: 3, name: 'Alexander Roncevic', score: 918, division: 'Diamond III', streak: 21, avatar: 'AR', isFriend: false, isCurrentUser: false },
  { rank: 4, name: 'Megan Jacoby', score: 885, division: 'Diamond II', streak: 18, avatar: 'MJ', isFriend: false, isCurrentUser: false },
  { rank: 5, name: 'Ryan Kent', score: 842, division: 'Diamond I', streak: 12, avatar: 'RK', isFriend: true, isCurrentUser: false },
  { rank: 6, name: 'Mikaela Norman', score: 799, division: 'Gold III', streak: 9, avatar: 'MN', isFriend: false, isCurrentUser: false },
  { rank: 7, name: 'Tiago Lousa', score: 760, division: 'Gold II', streak: 15, avatar: 'TL', isFriend: true, isCurrentUser: false },
  { rank: 8, name: 'Kris Rugloski', score: 715, division: 'Gold I', streak: 14, avatar: 'KR', isFriend: false, isCurrentUser: false },
  { rank: 9, name: 'Marcus Aurelius', score: 450, division: 'Silver III', streak: 10, avatar: 'MA', isFriend: true, isCurrentUser: false },
  { rank: 10, name: 'Sarah Connor', score: 410, division: 'Silver II', streak: 6, avatar: 'SC', isFriend: false, isCurrentUser: false },
  { rank: 11, name: 'Jack Carter', score: 280, division: 'Bronze III', streak: 8, avatar: 'JC', isFriend: true, isCurrentUser: false },
  { rank: 12, name: 'Emily Vance', score: 180, division: 'Bronze II', streak: 5, avatar: 'EV', isFriend: false, isCurrentUser: false },
];

export function RankingsScreen() {
  const { state, isReady } = useProgression();
  const [activeTab, setActiveTab] = useState<'global' | 'division' | 'friends'>('global');
  const [searchQuery, setSearchQuery] = useState('');

  // Assemble dynamic leaderboard incorporating current user's actual progression state
  const leaderboardData = useMemo(() => {
    if (!isReady || !state) return ALL_ATHLETES.map((a, i) => ({ ...a, rank: i + 1, isCurrentUser: false }));

    const userScore = state.hybridScore.total;
    const userDivision = state.rank.label; // e.g. "Bronze III"
    const userStreak = state.streak.currentDays;

    const currentUserEntry = {
      name: 'Alex Mercer', // Match profile state
      score: userScore,
      division: userDivision,
      streak: userStreak,
      isCurrentUser: true,
      avatar: 'AM',
      isFriend: false
    };

    // Merge and sort based on total Hybrid Score
    const merged = [...ALL_ATHLETES, currentUserEntry].sort((a, b) => b.score - a.score);

    // Apply ranking numbers
    return merged.map((athlete, index) => ({
      ...athlete,
      rank: index + 1
    }));
  }, [state, isReady]);

  // Extract user's division name (e.g. "Bronze", "Silver", "Gold", "Elite")
  const userDivisionCategory = useMemo(() => {
    if (!isReady || !state) return 'Elite';
    return state.rank.label.split(' ')[0]; // extracts "Bronze"
  }, [state, isReady]);

  // Tab Filtering & Search
  const filteredLeaderboard = useMemo(() => {
    let result = leaderboardData;

    // 1. Tab Filtering
    if (activeTab === 'division') {
      result = result.filter(athlete => 
        athlete.division.toLowerCase().includes(userDivisionCategory.toLowerCase())
      );
    } else if (activeTab === 'friends') {
      result = result.filter(athlete => athlete.isFriend || athlete.isCurrentUser);
    }

    // 2. Search Query Filtering
    if (searchQuery.trim() !== '') {
      result = result.filter(athlete => 
        athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        athlete.division.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 3. Re-assign ranks based on filtered view if we are on a filtered tab
    if (activeTab !== 'global') {
      return result.map((athlete, index) => ({
        ...athlete,
        filteredRank: index + 1
      }));
    }

    return result.map(athlete => ({ ...athlete, filteredRank: athlete.rank }));
  }, [leaderboardData, activeTab, searchQuery, userDivisionCategory]);

  // Top 3 Podium Athletes (computed only for Global view)
  const podium = useMemo(() => {
    return leaderboardData.slice(0, 3);
  }, [leaderboardData]);

  // Remaining list below podium (if global, omit top 3; if division/friends, show all filtered)
  const scrollList = useMemo(() => {
    if (activeTab === 'global' && searchQuery === '') {
      return filteredLeaderboard.filter(a => a.rank > 3);
    }
    return filteredLeaderboard;
  }, [filteredLeaderboard, activeTab, searchQuery]);

  const insets = useSafeAreaInsets();

  if (!isReady || !state) {
    return (
      <View className="flex-1 bg-background justify-center items-center" style={{ paddingTop: insets.top }}>
        <Text tone="muted" variant="body">Loading rankings...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background" style={{ paddingTop: insets.top }}>
      <View className="px-4 pt-2 pb-1 gap-3">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text tone="accent" variant="overline">Hyrox League</Text>
            <Text variant="heading" className="text-2xl font-black">Standings</Text>
          </View>
          <View 
            className="p-2 rounded-full border"
            style={{ backgroundColor: 'rgba(47, 128, 255, 0.1)', borderColor: 'rgba(47, 128, 255, 0.2)' }}
          >
            <Trophy color="#2f80ff" size={20} />
          </View>
        </View>

        {/* Search Input */}
        <View 
          className="flex-row items-center bg-surface border rounded-xl px-3 py-2.5"
          style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          <Search size={16} className="text-muted-foreground mr-2" />
          <TextInput
            placeholder="Search hybrid athletes..."
            placeholderTextColor="#8a8a8a"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-foreground text-sm font-medium py-0"
          />
        </View>

        {/* Custom Premium Tabs */}
        <View 
          className="flex-row p-1 rounded-xl border"
          style={{ backgroundColor: 'rgba(28, 28, 30, 0.5)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
        >
          {(['global', 'division', 'friends'] as const).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={cn(
                'flex-1 py-2 items-center rounded-lg',
                activeTab === tab ? 'bg-primary' : 'bg-transparent'
              )}
            >
              <Text 
                className={cn(
                  'font-bold text-xs uppercase tracking-wider',
                  activeTab === tab ? 'text-white' : 'text-muted-foreground'
                )}
              >
                {tab === 'division' ? `${userDivisionCategory}` : tab}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
      >
        {/* Top 3 Visual Podium Section (Only in Global Tab and without Search) */}
        {activeTab === 'global' && searchQuery === '' && podium.length >= 3 ? (
          <View className="flex-row items-end justify-center mt-6 mb-8 gap-4">
            {/* 2nd Place */}
            <View className="items-center w-[28%]">
              <View className="relative">
                <View className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-400 items-center justify-center">
                  <Text className="text-slate-200 font-black text-sm">{podium[1].avatar}</Text>
                </View>
                <View className="absolute -bottom-2 self-center bg-slate-400 rounded-full px-2 py-0.5 border border-slate-600">
                  <Text className="text-[10px] font-black text-slate-900">#2</Text>
                </View>
              </View>
              <Text className="text-xs font-bold text-slate-200 mt-3 text-center" numberOfLines={1}>
                {podium[1].name.split(' ')[0]}
              </Text>
              <Text className="text-[10px] text-primary font-black mt-0.5">{podium[1].score} pts</Text>
            </View>

            {/* 1st Place - CROWNED */}
            <View className="items-center w-[34%] -translate-y-2">
              <View className="relative">
                <View className="absolute -top-6 self-center -rotate-12">
                  <Crown color="#ffd700" size={24} fill="#ffd700" />
                </View>
                <View 
                  className="w-18 h-18 rounded-full border-4 border-yellow-500 items-center justify-center"
                  style={{ backgroundColor: 'rgba(120, 53, 4, 0.2)', shadowColor: '#eab308', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } }}
                >
                  <Text className="text-yellow-400 font-black text-lg">{podium[0].avatar}</Text>
                </View>
                <View className="absolute -bottom-2 self-center bg-yellow-500 rounded-full px-2.5 py-0.5 border border-yellow-700">
                  <Text className="text-[10px] font-black text-yellow-950">#1</Text>
                </View>
              </View>
              <Text className="text-sm font-extrabold text-foreground mt-3 text-center" numberOfLines={1}>
                {podium[0].name.split(' ')[0]}
              </Text>
              <View className="flex-row items-center gap-0.5 mt-0.5">
                <Sparkles size={10} color="#ffd700" />
                <Text className="text-xs text-yellow-500 font-black">{podium[0].score} pts</Text>
              </View>
            </View>

            {/* 3rd Place */}
            <View className="items-center w-[28%]">
              <View className="relative">
                <View 
                  className="w-14 h-14 rounded-full border-2 border-amber-600 items-center justify-center"
                  style={{ backgroundColor: 'rgba(120, 53, 4, 0.1)' }}
                >
                  <Text className="text-amber-500 font-black text-sm">{podium[2].avatar}</Text>
                </View>
                <View className="absolute -bottom-2 self-center bg-amber-600 rounded-full px-2 py-0.5 border border-amber-800">
                  <Text className="text-[10px] font-black text-amber-950">#3</Text>
                </View>
              </View>
              <Text className="text-xs font-bold text-slate-300 mt-3 text-center" numberOfLines={1}>
                {podium[2].name.split(' ')[0]}
              </Text>
              <Text className="text-[10px] text-primary font-black mt-0.5">{podium[2].score} pts</Text>
            </View>
          </View>
        ) : null}

        {/* Leaderboard Entries List */}
        <Animated.View layout={Layout.springify()} className={cn("gap-2.5", activeTab !== 'global' && "mt-6")}>
          {scrollList.length === 0 ? (
            <View 
              className="py-12 items-center justify-center border border-dashed rounded-2xl bg-card"
              style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
            >
              <Text tone="muted" variant="body">No athletes in this view yet.</Text>
            </View>
          ) : (
            scrollList.map((athlete) => (
              <Animated.View
                entering={FadeInUp}
                key={athlete.name}
                className={cn(
                  'flex-row items-center justify-between p-3.5 rounded-xl border',
                  athlete.isCurrentUser ? '' : 'bg-card'
                )}
                style={athlete.isCurrentUser ? {
                  backgroundColor: 'rgba(47, 128, 255, 0.1)',
                  borderColor: 'rgba(47, 128, 255, 0.45)',
                  shadowColor: '#2f80ff',
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  shadowOffset: { width: 0, height: 1 }
                } : {
                  borderColor: 'rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Left Side: Rank, Avatar, Name */}
                <View className="flex-row items-center gap-3 flex-1 mr-2">
                  <View className="w-6 items-center">
                    <Text className={cn(
                      'font-black text-sm',
                      athlete.isCurrentUser ? 'text-primary' : 'text-muted-foreground'
                    )}>
                      {athlete.filteredRank}
                    </Text>
                  </View>

                  {/* Avatar Bubble */}
                  <View 
                    className={cn(
                      'w-9 h-9 rounded-full items-center justify-center',
                      athlete.isCurrentUser ? 'bg-primary' : 'bg-surface border'
                    )}
                    style={athlete.isCurrentUser ? {} : { borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <Text className={cn(
                      'text-xs font-bold',
                      athlete.isCurrentUser ? 'text-white' : 'text-foreground'
                    )}>
                      {athlete.avatar}
                    </Text>
                  </View>

                  {/* Name and League Division */}
                  <View className="flex-1">
                    <View className="flex-row items-center gap-1.5">
                      <Text className="font-bold text-foreground text-sm" numberOfLines={1}>
                        {athlete.name}
                      </Text>
                      {athlete.isCurrentUser ? (
                        <View 
                          className="px-1.5 py-0.5 rounded-md"
                          style={{ backgroundColor: 'rgba(47, 128, 255, 0.2)' }}
                        >
                          <Text className="text-primary font-extrabold text-[8px] uppercase tracking-wider">YOU</Text>
                        </View>
                      ) : null}
                    </View>
                    <Text className="text-[10px] text-muted-foreground font-semibold mt-0.5">
                      {athlete.division}
                    </Text>
                  </View>
                </View>

                {/* Right Side: Streak & Score */}
                <View className="flex-row items-center gap-4">
                  {athlete.streak > 0 ? (
                    <View 
                      className="flex-row items-center gap-0.5 px-1.5 py-0.5 rounded-full border"
                      style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.1)' }}
                    >
                      <Flame color="#ef4444" size={10} />
                      <Text className="text-[10px] font-bold text-danger">{athlete.streak}</Text>
                    </View>
                  ) : null}
                  <View className="items-end">
                    <Text className={cn(
                      'font-black text-sm',
                      athlete.isCurrentUser ? 'text-primary' : 'text-foreground'
                    )}>
                      {athlete.score}
                    </Text>
                    <Text className="text-[8px] text-muted-foreground uppercase font-bold tracking-wider">PTS</Text>
                  </View>
                </View>
              </Animated.View>
            ))
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}
