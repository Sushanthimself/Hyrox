import { memo } from 'react';
import { Pressable, View } from 'react-native';

import { Text } from '@/components/ui';
import { useMotionHaptics } from '@/motion';
import { cn } from '@/utils';

import type { FeedReactionType } from '../../types/feed';

const REACTIONS: { id: FeedReactionType; emoji: string; label: string }[] = [
  { id: 'fire', emoji: '🔥', label: 'Fire' },
  { id: 'strong', emoji: '💪', label: 'Strong' },
  { id: 'respect', emoji: '🫡', label: 'Respect' },
  { id: 'goat', emoji: '🐐', label: 'GOAT' }
];

type FeedReactionPickerProps = {
  disabled?: boolean;
  onSelect: (reaction: FeedReactionType) => void;
  selected: FeedReactionType | null;
};

/** Reaction row — placeholder UX until realtime reaction sync ships. */
export const FeedReactionPicker = memo(function FeedReactionPicker({
  disabled,
  onSelect,
  selected
}: FeedReactionPickerProps) {
  const haptics = useMotionHaptics();

  return (
    <View className="flex-row flex-wrap gap-2">
      {REACTIONS.map((reaction) => {
        const isActive = selected === reaction.id;

        return (
          <Pressable
            accessibilityLabel={`React with ${reaction.label}`}
            accessibilityRole="button"
            className={cn(
              'flex-row items-center gap-1 rounded-full border px-2.5 py-1',
              isActive ? 'border-accent/40 bg-accent/15' : 'border-border/15 bg-surface/50',
              disabled && 'opacity-50'
            )}
            disabled={disabled}
            key={reaction.id}
            onPress={() => {
              haptics.xpGain();
              onSelect(reaction.id);
            }}
          >
            <Text variant="caption">{reaction.emoji}</Text>
            <Text className="font-semibold" tone={isActive ? 'accent' : 'muted'} variant="caption">
              {reaction.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
});
