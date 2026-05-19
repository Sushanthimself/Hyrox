import { useMutation, useQueryClient } from '@tanstack/react-query';

import { FEED_QUERY_KEYS } from '../constants/query-keys';
import { feedService } from '../services/feed-service';
import type { FeedReactionType } from '../types/feed';
import { toggleFeedLikeInCache, type FeedInfiniteData } from '../utils/optimistic';

export function useToggleFeedLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...FEED_QUERY_KEYS.all, 'toggle-like'],
    mutationFn: ({ itemId, liked }: { itemId: string; liked: boolean }) =>
      feedService.toggleLike({ itemId, liked }),
    onMutate: async ({ itemId, liked }) => {
      await queryClient.cancelQueries({ queryKey: FEED_QUERY_KEYS.infinite });
      const previous = queryClient.getQueryData<FeedInfiniteData>(FEED_QUERY_KEYS.infinite);

      if (previous) {
        queryClient.setQueryData<FeedInfiniteData>(
          FEED_QUERY_KEYS.infinite,
          toggleFeedLikeInCache(previous, itemId, liked)
        );
      }

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(FEED_QUERY_KEYS.infinite, context.previous);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: FEED_QUERY_KEYS.infinite, refetchType: 'none' });
    }
  });
}

export function useSetFeedReaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...FEED_QUERY_KEYS.all, 'set-reaction'],
    mutationFn: ({
      itemId,
      reaction
    }: {
      itemId: string;
      reaction: FeedReactionType | null;
    }) => feedService.setReaction({ itemId, reaction }),
    onMutate: async ({ itemId, reaction }) => {
      await queryClient.cancelQueries({ queryKey: FEED_QUERY_KEYS.infinite });
      const previous = queryClient.getQueryData<FeedInfiniteData>(FEED_QUERY_KEYS.infinite);

      if (previous) {
        queryClient.setQueryData<FeedInfiniteData>(FEED_QUERY_KEYS.infinite, (current) => {
          if (!current) {
            return current;
          }

          return {
            ...current,
            pages: current.pages.map((page) => ({
              ...page,
              items: page.items.map((item) => {
                if (item.id !== itemId) {
                  return item;
                }

                const hadReaction = Boolean(item.interactions.viewerReaction);
                const hasReaction = Boolean(reaction);
                const reactionDelta =
                  hasReaction && !hadReaction ? 1 : !hasReaction && hadReaction ? -1 : 0;

                return {
                  ...item,
                  interactions: {
                    ...item.interactions,
                    viewerReaction: reaction,
                    reactionCount: Math.max(0, item.interactions.reactionCount + reactionDelta)
                  }
                };
              })
            }))
          };
        });
      }

      return { previous };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(FEED_QUERY_KEYS.infinite, context.previous);
      }
    }
  });
}

/** Placeholder — opens comment sheet when built. */
export function useFeedCommentPlaceholder() {
  return {
    openComments: (_itemId: string) => undefined
  };
}

/** Placeholder — repost flow when built. */
export function useFeedRepostPlaceholder() {
  return {
    repost: (_itemId: string) => undefined
  };
}
