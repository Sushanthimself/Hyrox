import { useEffect, useMemo, useState } from 'react';
import { useRankReveal, useXpPopup } from '@/motion';
import { useMotionHaptics } from '@/motion/haptics';

import type { CelebrationItem } from '../types/progression';
import { getXpCelebrationTier } from '../utils/psychology';

/**
 * Binds motion primitives to the active celebration item.
 */
export function useProgressionAnimations(celebration: CelebrationItem | null) {
  const haptics = useMotionHaptics();
  const xp = useXpPopup();
  const rank = useRankReveal();
  const [pulseKey, setPulseKey] = useState(0);

  const xpTier = useMemo(() => {
    if (celebration?.kind !== 'xp_gained') {
      return 'small';
    }

    return getXpCelebrationTier(celebration.amount);
  }, [celebration]);

  useEffect(() => {
    if (!celebration) {
      return;
    }

    setPulseKey((value) => value + 1);

    switch (celebration.kind) {
      case 'xp_gained':
        haptics.xpGain();
        xp.trigger();
        break;
      case 'rank_up':
        haptics.rankUp();
        rank.play();
        break;
      case 'streak_updated':
        haptics.success();
        break;
      case 'achievement_unlocked':
        if (celebration.rarity === 'legendary') {
          haptics.success();
        } else {
          haptics.xpGain();
        }
        break;
      default:
        break;
    }
  }, [celebration, haptics, rank, xp]);

  return {
    pulseKey,
    rank,
    xp,
    xpAnimatedStyle: xp.animatedStyle,
    rankCardStyle: rank.cardStyle,
    rankGlowStyle: rank.glowStyle,
    xpTier
  };
}
