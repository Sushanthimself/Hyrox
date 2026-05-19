import { motion } from '@/theme';

export const motionSprings = {
  subtle: motion.spring.subtle,
  expressive: motion.spring.expressive,
  /** Snappy press feedback — high stiffness, controlled overshoot. */
  press: {
    damping: 14,
    stiffness: 320,
    mass: 0.6
  },
  /** Rank-up / XP burst — bouncy but settles quickly. */
  celebration: {
    damping: 12,
    stiffness: 200,
    mass: 0.8
  },
  /** Modal sheet entrance. */
  sheet: {
    damping: 20,
    stiffness: 260,
    mass: 0.9
  }
} as const;
