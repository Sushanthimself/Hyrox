import { RANK_LADDER } from '../constants/ranks';
import type { RankTier } from '../types/progression';

export function getRankForXp(totalXp: number): RankTier {
  let current = RANK_LADDER[0];

  for (const tier of RANK_LADDER) {
    if (totalXp >= tier.minXp) {
      current = tier;
    }
  }

  return current;
}

export function getNextRank(current: RankTier): RankTier | null {
  const index = RANK_LADDER.findIndex((tier) => tier.id === current.id);
  if (index < 0 || index >= RANK_LADDER.length - 1) {
    return null;
  }

  return RANK_LADDER[index + 1] ?? null;
}

export function getRankProgress(totalXp: number, rank: RankTier) {
  const next = getNextRank(rank);

  if (!next) {
    return {
      xpIntoCurrentRank: totalXp - rank.minXp,
      xpToNextRank: null
    };
  }

  return {
    xpIntoCurrentRank: totalXp - rank.minXp,
    xpToNextRank: next.minXp - totalXp
  };
}

export function didRankUp(previousXp: number, nextXp: number): {
  rankedUp: boolean;
  newRank: RankTier;
  previousRank: RankTier;
} {
  const previousRank = getRankForXp(previousXp);
  const newRank = getRankForXp(nextXp);

  return {
    rankedUp: newRank.minXp > previousRank.minXp,
    newRank,
    previousRank
  };
}
