import { ACHIEVEMENT_DEFINITIONS, type AchievementContext } from '../constants/achievements';
import type { AchievementUnlockedReward, ProgressionState } from '../types/progression';

export function evaluateAchievementUnlocks(
  state: ProgressionState,
  context: AchievementContext
): AchievementUnlockedReward[] {
  const rewards: AchievementUnlockedReward[] = [];

  for (const definition of ACHIEVEMENT_DEFINITIONS) {
    if (state.unlockedAchievementIds.includes(definition.id)) {
      continue;
    }

    if (!definition.evaluate(context)) {
      continue;
    }

    rewards.push({
      achievementId: definition.id,
      description: definition.description,
      kind: 'achievement_unlocked',
      presentation: 'toast',
      rarity: definition.rarity,
      title: definition.title
    });
  }

  return rewards;
}
