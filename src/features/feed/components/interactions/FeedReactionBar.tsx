import { memo } from 'react';
import { View } from 'react-native';
import { Heart, MessageCircle, Repeat2, Sparkles } from 'lucide-react-native';

import { Text } from '@/components/ui';
import { useTheme } from '@/theme';

import {
  useFeedCommentPlaceholder,
  useFeedRepostPlaceholder,
  useSetFeedReaction,
  useToggleFeedLike
} from '../../hooks/useFeedInteractions';
import type { FeedItem, FeedReactionType } from '../../types/feed';
import { FeedActionButton } from './FeedActionButton';
import { FeedReactionPicker } from './FeedReactionPicker';

type FeedReactionBarProps = {
  item: FeedItem;
};

export const FeedReactionBar = memo(function FeedReactionBar({ item }: FeedReactionBarProps) {
  const { theme } = useTheme();
  const toggleLike = useToggleFeedLike();
  const setReaction = useSetFeedReaction();
  const { openComments } = useFeedCommentPlaceholder();
  const { repost } = useFeedRepostPlaceholder();

  const { interactions } = item;
  const isLiked = interactions.viewerHasLiked;

  const handleLike = () => {
    toggleLike.mutate({ itemId: item.id, liked: !isLiked });
  };

  const handleReaction = (reaction: FeedReactionType) => {
    const next = interactions.viewerReaction === reaction ? null : reaction;
    setReaction.mutate({ itemId: item.id, reaction: next });
  };

  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1">
          <FeedActionButton
            active={isLiked}
            count={interactions.likeCount}
            icon={
              <Heart
                color={isLiked ? theme.color.danger : theme.color.mutedForeground}
                fill={isLiked ? theme.color.danger : 'transparent'}
                size={18}
              />
            }
            label="Like"
            onPress={handleLike}
          />
          <FeedActionButton
            count={interactions.commentCount}
            icon={<MessageCircle color={theme.color.mutedForeground} size={18} />}
            label="Comment"
            onPress={() => openComments(item.id)}
          />
          <FeedActionButton
            count={interactions.repostCount}
            icon={<Repeat2 color={theme.color.mutedForeground} size={18} />}
            label="Repost"
            onPress={() => repost(item.id)}
          />
        </View>

        {interactions.reactionCount > 0 ? (
          <View className="flex-row items-center gap-1 rounded-full bg-accent/10 px-2 py-1">
            <Sparkles color={theme.color.accent} size={14} />
            <Text className="font-semibold tabular-nums" tone="accent" variant="caption">
              {interactions.reactionCount}
            </Text>
          </View>
        ) : null}
      </View>

      <FeedReactionPicker
        disabled={setReaction.isPending}
        onSelect={handleReaction}
        selected={interactions.viewerReaction}
      />
    </View>
  );
});
