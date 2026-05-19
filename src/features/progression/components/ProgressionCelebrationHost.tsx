import { memo, useCallback, useEffect } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Text } from '@/components/ui';
import { RankReveal, XpPopup } from '@/motion';

import { useProgressionAnimations } from '../hooks/useProgressionAnimations';
import { useRewardCelebration } from '../hooks/useRewardCelebration';
import type { CelebrationItem } from '../types/progression';
import { AchievementToast } from './AchievementToast';
import { StreakFlameBadge } from './StreakFlameBadge';

export const ProgressionCelebrationHost = memo(function ProgressionCelebrationHost() {
  const { currentCelebration, dismissCurrent } = useRewardCelebration();
  const animations = useProgressionAnimations(currentCelebration);

  const handleDismiss = useCallback(() => {
    dismissCurrent();
  }, [dismissCurrent]);

  if (!currentCelebration) {
    return null;
  }

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <CelebrationLayer celebration={currentCelebration} onDismiss={handleDismiss} pulseKey={animations.pulseKey} />
    </View>
  );
});

type CelebrationLayerProps = {
  celebration: CelebrationItem;
  onDismiss: () => void;
  pulseKey: number;
};

const CelebrationLayer = memo(function CelebrationLayer({
  celebration,
  onDismiss,
  pulseKey
}: CelebrationLayerProps) {
  switch (celebration.kind) {
    case 'xp_gained':
      return (
        <Pressable className="flex-1 items-center justify-center" onPress={onDismiss}>
          <XpPopup amount={celebration.amount} label="XP" triggerKey={`${pulseKey}-${celebration.amount}`} />
          <Text className="mt-24 text-center" tone="muted" variant="caption">
            {celebration.reason}
            {celebration.multiplier > 1 ? ` · ${celebration.multiplier.toFixed(2)}× streak` : ''}
          </Text>
        </Pressable>
      );

    case 'rank_up':
      return (
        <Modal animationType="fade" transparent visible>
          <Pressable className="flex-1 items-center justify-center bg-overlay/80 px-6" onPress={onDismiss}>
            <RankReveal
              playKey={`${pulseKey}-${celebration.newRank.id}`}
              rankLabel={celebration.newRank.label}
              subtitle={`${celebration.previousRank.label} → ${celebration.newRank.label}`}
            />
            <Text className="mt-6 text-center" tone="muted" variant="caption">
              Tap to continue
            </Text>
          </Pressable>
        </Modal>
      );

    case 'streak_updated':
      return <StreakCelebration celebration={celebration} onDismiss={onDismiss} />;

    case 'achievement_unlocked':
      return (
        <View className="flex-1 justify-start pt-16">
          <AchievementToast onDismiss={onDismiss} reward={celebration} />
        </View>
      );

    default:
      return null;
  }
});

const StreakCelebration = memo(function StreakCelebration({
  celebration,
  onDismiss
}: {
  celebration: Extract<CelebrationItem, { kind: 'streak_updated' }>;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, celebration.milestoneHit ? 2_400 : 1_600);
    return () => clearTimeout(timer);
  }, [celebration.milestoneHit, onDismiss]);

  return (
    <View className="flex-1 items-center justify-end pb-28">
      <StreakFlameBadge days={celebration.currentDays} milestone={celebration.milestoneHit} />
    </View>
  );
});
