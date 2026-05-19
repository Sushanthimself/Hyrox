/**
 * Progression psychology knobs — variable reward intensity and milestone cadence.
 * Centralized so product can tune "addictiveness" without touching engine logic.
 */
export const progressionPsychology = {
  /** Near-miss band before next rank — surfaces urgency copy in UI. */
  rankNearMissXpThreshold: 120,
  /** Streak milestones trigger stronger celebration tier. */
  streakCelebrationMilestones: [3, 7, 14, 30] as const,
  /** XP popup duration tier multiplier for large gains. */
  xpBurstThresholds: {
    large: 400,
    medium: 200
  },
  /** Achievement rarity → haptic weight mapping in celebration host. */
  rarityPriority: {
    common: 1,
    rare: 2,
    epic: 3,
    legendary: 4
  } as const
} as const;

export function getXpCelebrationTier(amount: number): 'large' | 'medium' | 'small' {
  if (amount >= progressionPsychology.xpBurstThresholds.large) {
    return 'large';
  }

  if (amount >= progressionPsychology.xpBurstThresholds.medium) {
    return 'medium';
  }

  return 'small';
}

export function isRankNearMiss(xpToNextRank: number | null): boolean {
  if (xpToNextRank === null) {
    return false;
  }

  return xpToNextRank <= progressionPsychology.rankNearMissXpThreshold;
}
