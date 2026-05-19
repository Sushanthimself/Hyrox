import type { FeedInteractions, FeedItem } from '../types/feed';

const now = Date.now();

function minutesAgo(minutes: number) {
  return new Date(now - minutes * 60_000).toISOString();
}

const baseInteractions: FeedInteractions = {
  commentCount: 0,
  likeCount: 0,
  reactionCount: 0,
  repostCount: 0,
  viewerHasLiked: false,
  viewerReaction: null
};

export const MOCK_FEED_ITEMS: FeedItem[] = [
  {
    id: 'feed-1',
    kind: 'rank_promotion',
    createdAt: minutesAgo(8),
    actor: {
      id: 'u-1',
      displayName: 'Maya Chen',
      handle: 'mayac',
      rankLabel: 'Elite'
    },
    interactions: { ...baseInteractions, likeCount: 142, commentCount: 28, reactionCount: 56 },
    payload: {
      season: '2026 Q2',
      division: 'Women Pro',
      previousRank: 'Diamond II',
      rank: 'Champion I'
    }
  },
  {
    id: 'feed-2',
    kind: 'workout_post',
    createdAt: minutesAgo(22),
    actor: {
      id: 'u-2',
      displayName: 'Jonah Price',
      handle: 'jprice',
      rankLabel: 'Gold III'
    },
    interactions: { ...baseInteractions, likeCount: 89, commentCount: 14 },
    payload: {
      title: 'HYROX Simulation — Full Send',
      workoutType: 'Race Prep',
      durationMinutes: 74,
      caloriesBurned: 812,
      xpEarned: 420,
      highlight: 'Negative split on sled push finisher'
    }
  },
  {
    id: 'feed-3',
    kind: 'xp_event',
    createdAt: minutesAgo(35),
    actor: {
      id: 'u-3',
      displayName: 'Sofia Alvarez',
      handle: 'sofalv',
      rankLabel: 'Platinum I'
    },
    interactions: { ...baseInteractions, likeCount: 34, reactionCount: 12 },
    payload: {
      delta: 180,
      totalXp: 12_480,
      reason: 'Completed weekly volume target'
    }
  },
  {
    id: 'feed-4',
    kind: 'streak_milestone',
    createdAt: minutesAgo(48),
    actor: {
      id: 'u-4',
      displayName: 'Ethan Brooks',
      handle: 'ebrooks',
      rankLabel: 'Silver II'
    },
    interactions: { ...baseInteractions, likeCount: 61, commentCount: 9 },
    payload: {
      days: 30,
      label: '30-day training streak'
    }
  },
  {
    id: 'feed-5',
    kind: 'pr_announcement',
    createdAt: minutesAgo(62),
    actor: {
      id: 'u-5',
      displayName: 'Lena Ortiz',
      handle: 'lenaortiz',
      rankLabel: 'Diamond I'
    },
    interactions: { ...baseInteractions, likeCount: 201, commentCount: 41, repostCount: 6 },
    payload: {
      eventName: '5K Row',
      value: '18:42',
      previousValue: '19:08',
      improvementLabel: '-26s PR'
    }
  },
  {
    id: 'feed-6',
    kind: 'achievement',
    createdAt: minutesAgo(75),
    actor: {
      id: 'u-6',
      displayName: 'Marcus Reid',
      handle: 'mreid',
      rankLabel: 'Champion II'
    },
    interactions: { ...baseInteractions, likeCount: 118, reactionCount: 44 },
    payload: {
      achievementId: 'ach-iron-lung',
      title: 'Iron Lung',
      description: 'Held sub-2:00 pace across 3 endurance blocks in one session.',
      rarity: 'legendary'
    }
  },
  {
    id: 'feed-7',
    kind: 'workout_post',
    createdAt: minutesAgo(95),
    actor: {
      id: 'u-7',
      displayName: 'Ava Nguyen',
      handle: 'avanguyen',
      rankLabel: 'Gold I'
    },
    interactions: { ...baseInteractions, likeCount: 47, commentCount: 6 },
    payload: {
      title: 'Engine Builder — AMRAP 40',
      workoutType: 'Conditioning',
      durationMinutes: 52,
      caloriesBurned: 540,
      xpEarned: 260
    }
  },
  {
    id: 'feed-8',
    kind: 'xp_event',
    createdAt: minutesAgo(110),
    actor: {
      id: 'u-8',
      displayName: 'Chris Dalton',
      handle: 'cdalton',
      rankLabel: 'Bronze III'
    },
    interactions: { ...baseInteractions, likeCount: 19 },
    payload: {
      delta: 95,
      totalXp: 3_220,
      reason: 'First podium in weekly challenge'
    }
  },
  {
    id: 'feed-9',
    kind: 'rank_promotion',
    createdAt: minutesAgo(140),
    actor: {
      id: 'u-9',
      displayName: 'Priya Shah',
      handle: 'priyashah',
      rankLabel: 'Platinum II'
    },
    interactions: { ...baseInteractions, likeCount: 76, commentCount: 11 },
    payload: {
      season: '2026 Q2',
      division: 'Open',
      previousRank: 'Platinum I',
      rank: 'Platinum II'
    }
  },
  {
    id: 'feed-10',
    kind: 'streak_milestone',
    createdAt: minutesAgo(180),
    actor: {
      id: 'u-10',
      displayName: 'Noah Kim',
      handle: 'noahk',
      rankLabel: 'Gold II'
    },
    interactions: { ...baseInteractions, likeCount: 52 },
    payload: {
      days: 7,
      label: '7-day streak unlocked'
    }
  },
  {
    id: 'feed-11',
    kind: 'pr_announcement',
    createdAt: minutesAgo(210),
    actor: {
      id: 'u-11',
      displayName: 'Zoe Martin',
      handle: 'zoem',
      rankLabel: 'Elite'
    },
    interactions: { ...baseInteractions, likeCount: 164, commentCount: 22 },
    payload: {
      eventName: 'Sled Push 50m',
      value: '1:38',
      previousValue: '1:45',
      improvementLabel: '-7s PR'
    }
  },
  {
    id: 'feed-12',
    kind: 'achievement',
    createdAt: minutesAgo(260),
    actor: {
      id: 'u-12',
      displayName: 'Tyler Moss',
      handle: 'tylermoss',
      rankLabel: 'Silver I'
    },
    interactions: { ...baseInteractions, likeCount: 38 },
    payload: {
      achievementId: 'ach-sandstorm',
      title: 'Sandstorm',
      description: 'Logged 5 outdoor sessions in heat conditions.',
      rarity: 'rare'
    }
  },
  {
    id: 'feed-13',
    kind: 'workout_post',
    createdAt: minutesAgo(300),
    actor: {
      id: 'u-13',
      displayName: 'Iris Bloom',
      handle: 'irisb',
      rankLabel: 'Diamond III'
    },
    interactions: { ...baseInteractions, likeCount: 93, commentCount: 17 },
    payload: {
      title: 'Legs + Carry — Championship Block',
      workoutType: 'Strength',
      durationMinutes: 68,
      caloriesBurned: 690,
      xpEarned: 380,
      highlight: 'Top 3% output in division'
    }
  },
  {
    id: 'feed-14',
    kind: 'xp_event',
    createdAt: minutesAgo(340),
    actor: {
      id: 'u-14',
      displayName: 'Felix Grant',
      handle: 'felixg',
      rankLabel: 'Platinum III'
    },
    interactions: { ...baseInteractions, likeCount: 27, reactionCount: 8 },
    payload: {
      delta: 240,
      totalXp: 9_870,
      reason: 'Squad challenge MVP bonus'
    }
  },
  {
    id: 'feed-15',
    kind: 'workout_post',
    createdAt: minutesAgo(400),
    actor: {
      id: 'u-15',
      displayName: 'Hannah Cole',
      handle: 'hcole',
      rankLabel: 'Champion I'
    },
    interactions: { ...baseInteractions, likeCount: 210, commentCount: 35, repostCount: 4 },
    payload: {
      title: 'Race Pace Intervals',
      workoutType: 'Track',
      durationMinutes: 45,
      caloriesBurned: 480,
      xpEarned: 310
    }
  },
  {
    id: 'feed-16',
    kind: 'rank_promotion',
    createdAt: minutesAgo(480),
    actor: {
      id: 'u-16',
      displayName: 'Omar Haddad',
      handle: 'omarh',
      rankLabel: 'Gold III'
    },
    interactions: { ...baseInteractions, likeCount: 67 },
    payload: {
      season: '2026 Q2',
      division: 'Masters',
      previousRank: 'Gold II',
      rank: 'Gold III'
    }
  },
  {
    id: 'feed-17',
    kind: 'achievement',
    createdAt: minutesAgo(520),
    actor: {
      id: 'u-17',
      displayName: 'Ella Park',
      handle: 'ellapark',
      rankLabel: 'Platinum I'
    },
    interactions: { ...baseInteractions, likeCount: 44 },
    payload: {
      achievementId: 'ach-wall-breaker',
      title: 'Wall Breaker',
      description: 'Broke through a 4-week plateau on benchmark WOD.',
      rarity: 'epic'
    }
  },
  {
    id: 'feed-18',
    kind: 'streak_milestone',
    createdAt: minutesAgo(600),
    actor: {
      id: 'u-18',
      displayName: 'Ryan Vo',
      handle: 'ryanvo',
      rankLabel: 'Bronze I'
    },
    interactions: { ...baseInteractions, likeCount: 31 },
    payload: {
      days: 14,
      label: '14-day consistency streak'
    }
  },
  {
    id: 'feed-19',
    kind: 'pr_announcement',
    createdAt: minutesAgo(720),
    actor: {
      id: 'u-19',
      displayName: 'Nina Costa',
      handle: 'ninacosta',
      rankLabel: 'Elite'
    },
    interactions: { ...baseInteractions, likeCount: 188, commentCount: 29 },
    payload: {
      eventName: 'Wall Balls 100',
      value: '6:12',
      previousValue: '6:34',
      improvementLabel: '-22s PR'
    }
  },
  {
    id: 'feed-20',
    kind: 'workout_post',
    createdAt: minutesAgo(840),
    actor: {
      id: 'u-20',
      displayName: 'Leo Hart',
      handle: 'leohart',
      rankLabel: 'Silver III'
    },
    interactions: { ...baseInteractions, likeCount: 41 },
    payload: {
      title: 'Recovery Flush Ride',
      workoutType: 'Active Recovery',
      durationMinutes: 35,
      caloriesBurned: 280,
      xpEarned: 90
    }
  }
];
