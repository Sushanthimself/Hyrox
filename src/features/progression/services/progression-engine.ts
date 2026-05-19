import type { AchievementContext } from '../constants/achievements';
import type {
  ProgressionEvent,
  ProgressionProcessResult,
  ProgressionState,
  RewardEvent,
  WorkoutCompletedPayload
} from '../types/progression';
import { calculateHybridScore, mergeHybridScore } from '../utils/hybrid-score';
import { didRankUp, getRankForXp, getRankProgress } from '../utils/rank';
import { applyActivityToStreak, isStreakMilestone } from '../utils/streak';
import { calculateBaseWorkoutXp, calculateXpGain } from '../utils/xp';

import { evaluateAchievementUnlocks } from './achievement-triggers';

export function createInitialProgressionState(): ProgressionState {
  const rank = getRankForXp(0);
  const progress = getRankProgress(0, rank);

  return {
    totalXp: 0,
    rank,
    xpIntoCurrentRank: progress.xpIntoCurrentRank,
    xpToNextRank: progress.xpToNextRank,
    streak: {
      currentDays: 0,
      longestDays: 0,
      lastActivityDate: null,
      isActiveToday: false
    },
    hybridScore: {
      strength: 0,
      endurance: 0,
      consistency: 0,
      total: 0
    },
    lifetimeWorkouts: 0,
    unlockedAchievementIds: []
  };
}

function withRankFields(state: ProgressionState, totalXp: number): ProgressionState {
  const rank = getRankForXp(totalXp);
  const progress = getRankProgress(totalXp, rank);

  return {
    ...state,
    totalXp,
    rank,
    xpIntoCurrentRank: progress.xpIntoCurrentRank,
    xpToNextRank: progress.xpToNextRank
  };
}

function processWorkoutCompleted(
  state: ProgressionState,
  event: ProgressionEvent & { payload: WorkoutCompletedPayload }
): ProgressionProcessResult {
  const rewards: RewardEvent[] = [];
  const { payload } = event;
  const previousXp = state.totalXp;

  const nextStreak = applyActivityToStreak(state.streak, event.occurredAt);
  const baseXp = calculateBaseWorkoutXp(payload.summary);
  const xp = calculateXpGain(baseXp, nextStreak.currentDays);
  const nextTotalXp = previousXp + xp.amount;

  let nextState = withRankFields(
    {
      ...state,
      streak: nextStreak,
      lifetimeWorkouts: state.lifetimeWorkouts + 1,
      hybridScore: mergeHybridScore(
        state.hybridScore,
        calculateHybridScore({
          lifetimeWorkouts: state.lifetimeWorkouts + 1,
          streakDays: nextStreak.currentDays,
          summary: payload.summary
        })
      )
    },
    nextTotalXp
  );

  rewards.push({
    kind: 'xp_gained',
    presentation: 'popup',
    amount: xp.amount,
    baseAmount: xp.baseAmount,
    multiplier: xp.multiplier,
    reason: payload.workoutTitle
  });

  rewards.push({
    kind: 'streak_updated',
    presentation: isStreakMilestone(nextStreak.currentDays) ? 'popup' : 'toast',
    currentDays: nextStreak.currentDays,
    milestoneHit: isStreakMilestone(nextStreak.currentDays)
  });

  rewards.push({
    kind: 'hybrid_score_updated',
    presentation: 'silent',
    breakdown: nextState.hybridScore,
    delta: nextState.hybridScore.total - state.hybridScore.total
  });

  const rankChange = didRankUp(previousXp, nextTotalXp);
  if (rankChange.rankedUp) {
    rewards.push({
      kind: 'rank_up',
      presentation: 'overlay',
      previousRank: rankChange.previousRank,
      newRank: rankChange.newRank
    });
    nextState = { ...nextState, rank: rankChange.newRank };
  }

  const achievementContext: AchievementContext = {
    eventType: 'workout_completed',
    state: nextState,
    summary: payload.summary,
    xpGained: xp.amount
  };

  const achievementRewards = evaluateAchievementUnlocks(nextState, achievementContext);
  if (achievementRewards.length > 0) {
    nextState = {
      ...nextState,
      unlockedAchievementIds: [
        ...nextState.unlockedAchievementIds,
        ...achievementRewards.map((reward) => reward.achievementId)
      ]
    };
    rewards.push(...achievementRewards);
  }

  return {
    state: nextState,
    rewards,
    events: [event]
  };
}

export function processProgressionEvent(
  state: ProgressionState,
  event: ProgressionEvent
): ProgressionProcessResult {
  switch (event.type) {
    case 'workout_completed':
      return processWorkoutCompleted(state, event as ProgressionEvent & { payload: WorkoutCompletedPayload });
    case 'daily_check_in':
    case 'manual_bonus':
      return { state, rewards: [], events: [event] };
  }
}
